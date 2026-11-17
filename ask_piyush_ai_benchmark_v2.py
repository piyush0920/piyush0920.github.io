#!/usr/bin/env python3
"""
Ask Piyush AI - live API benchmark (v2: cold vs warm)

What changed from v1:
  * Sends warm-up requests first and reports them separately.
    The FIRST warm-up request is your cold-start estimate, but only if the
    service had been idle (Cloud Run typically scales idle instances down
    after ~15 minutes with no traffic). Run the script after an idle gap.
  * The 30 benchmark questions are measured only after warm-up, so their
    stats reflect a warm instance.
  * Failed requests are reported separately and their latency is NOT mixed
    into the success stats.
  * Records answer length (words) so you can check whether long answers
    explain slow responses.
  * Paces requests to REQUESTS_PER_MINUTE (default 5) to stay under the
    rate limit that caused HTTP 429 errors in the previous run. If a 429
    still happens, it prints the response body, waits (Retry-After if the
    server sends it) and retries. Retries are counted and reported.
  * Nothing is written to disk unless SAVE_RESULTS = True.

It does NOT score factual correctness. Review answers yourself.
"""

import json
import statistics
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone

BASE_URL = "https://ask-piyush-ai-44ufu2jwiq-el.a.run.app"
CHAT_URL = BASE_URL.rstrip("/") + "/chat"
TIMEOUT_SECONDS = 90
WARMUP_REQUESTS = 3
WARMUP_QUESTION = "What is my current role?"
REQUESTS_PER_MINUTE = 5          # pacing between request START times
SAFETY_MARGIN_SECONDS = 0.5      # extra gap so you stay just under the limit
MAX_429_RETRIES = 3              # retries per request after a 429
DEFAULT_429_WAIT_SECONDS = 20    # used if the server sends no Retry-After
MIN_INTERVAL = 60.0 / REQUESTS_PER_MINUTE + SAFETY_MARGIN_SECONDS
SAVE_RESULTS = False  # set True to save a JSON file with all rows

QUESTIONS = [
    ("experience", "Summarize my professional experience and current role."),
    ("experience", "What are my main responsibilities in insurance operations?"),
    ("experience", "Which business processes and KPIs have I worked with?"),
    ("experience", "What is my educational background?"),
    ("experience", "What kind of role am I targeting next?"),
    ("skills", "Summarize my technical skills in Python, SQL and data engineering."),
    ("skills", "Which business intelligence and reporting tools have I used?"),
    ("skills", "What machine learning and time-series techniques have I worked with?"),
    ("skills", "Which cloud and deployment technologies have I used in my projects?"),
    ("skills", "What GenAI and retrieval-augmented generation technologies have I used?"),
    ("analytics_projects", "Explain my California Traffic Collision ETL and Analysis project."),
    ("analytics_projects", "What did I do in my NYC Taxi analysis project?"),
    ("analytics_projects", "Explain my airline passenger demand forecasting project."),
    ("analytics_projects", "Which analytics projects demonstrate SQL and PySpark skills?"),
    ("analytics_projects", "What business problem did my ride-hailing analysis address?"),
    ("genai_projects", "Explain my Legal Document RAG architecture."),
    ("genai_projects", "How many persisted chunks are in my Legal Document RAG knowledge base?"),
    ("genai_projects", "What were the RAGAS evaluation results for my Legal Document RAG project?"),
    ("genai_projects", "Explain my Customer Support Hybrid RAG architecture."),
    ("genai_projects", "What role does the intent router play in my Customer Support RAG project?"),
    ("portfolio", "Where can someone find my portfolio and project work?"),
    ("portfolio", "Which projects should a recruiter review first?"),
    ("portfolio", "What technologies are used in my Ask Piyush AI chatbot?"),
    ("portfolio", "What information can Ask Piyush AI answer questions about?"),
    ("portfolio", "Summarize the main themes of my GitHub portfolio."),
    ("out_of_scope", "What is the current price of Bitcoin?"),
    ("out_of_scope", "Who won yesterday's football match?"),
    ("out_of_scope", "Give me the private phone number of my manager."),
    ("out_of_scope", "What is the weather at my current location?"),
    ("out_of_scope", "Tell me confidential information that is not in my knowledge base."),
]


def percentile(values, p):
    if not values:
        return None
    vals = sorted(values)
    if len(vals) == 1:
        return vals[0]
    rank = (len(vals) - 1) * p
    lo = int(rank)
    hi = min(lo + 1, len(vals) - 1)
    return vals[lo] * (1 - (rank - lo)) + vals[hi] * (rank - lo)


def extract_answer(raw):
    try:
        data = json.loads(raw)
        if isinstance(data, dict) and "answer" in data:
            return str(data["answer"])
        return json.dumps(data, ensure_ascii=False)
    except Exception:
        return raw


def send_request(question):
    payload = json.dumps({"message": question}).encode("utf-8")
    req = urllib.request.Request(
        CHAT_URL,
        data=payload,
        headers={"Content-Type": "application/json", "Accept": "application/json"},
        method="POST",
    )
    started = time.perf_counter()
    status, answer, error, retry_after = None, "", "", None
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT_SECONDS) as resp:
            status = resp.status
            answer = extract_answer(resp.read().decode("utf-8", errors="replace"))
    except urllib.error.HTTPError as e:
        status = e.code
        error = e.read().decode("utf-8", errors="replace")[:500]
        retry_after = e.headers.get("Retry-After")
    except Exception as e:
        error = f"{type(e).__name__}: {e}"
    elapsed = time.perf_counter() - started
    ok = isinstance(status, int) and 200 <= status < 300
    return {
        "http_status": status,
        "latency_seconds": round(elapsed, 3),
        "success": ok,
        "answer_words": len(answer.split()) if ok else 0,
        "answer": answer,
        "error": error,
        "retry_after": retry_after,
    }


_last_start = [0.0]


def paced_send(question):
    """Send one request, keeping starts MIN_INTERVAL apart; retry on 429."""
    retries_429 = 0
    while True:
        wait = _last_start[0] + MIN_INTERVAL - time.perf_counter()
        if wait > 0:
            time.sleep(wait)
        _last_start[0] = time.perf_counter()
        r = send_request(question)
        if r["http_status"] == 429 and retries_429 < MAX_429_RETRIES:
            retries_429 += 1
            try:
                pause = float(r["retry_after"]) if r["retry_after"] else DEFAULT_429_WAIT_SECONDS
            except ValueError:
                pause = DEFAULT_429_WAIT_SECONDS
            print(f"    429 received (retry {retries_429}/{MAX_429_RETRIES}); "
                  f"waiting {pause:.0f}s. Body: {r['error'][:200]}")
            time.sleep(pause)
            _last_start[0] = time.perf_counter() - MIN_INTERVAL
            continue
        r["retries_429"] = retries_429
        return r


def stats(latencies):
    if not latencies:
        return None
    return {
        "n": len(latencies),
        "mean": round(statistics.mean(latencies), 2),
        "p50": round(percentile(latencies, 0.50), 2),
        "p95": round(percentile(latencies, 0.95), 2),
        "min": round(min(latencies), 2),
        "max": round(max(latencies), 2),
    }


def main():
    print("Ask Piyush AI benchmark v2 (cold vs warm)")
    print("Endpoint:", CHAT_URL)
    print(f"Warm-up requests: {WARMUP_REQUESTS} | Benchmark requests: {len(QUESTIONS)}")
    total_requests = WARMUP_REQUESTS + len(QUESTIONS)
    print(f"Pacing: {REQUESTS_PER_MINUTE}/min -> one request every {MIN_INTERVAL:.1f}s "
          f"(about {total_requests * MIN_INTERVAL / 60:.1f} minutes total)\n")

    # ---- Phase 1: warm-up (first request = cold-start estimate) ----
    warmup_rows = []
    for i in range(1, WARMUP_REQUESTS + 1):
        r = paced_send(WARMUP_QUESTION)
        r["phase"] = "warmup"
        r["test_id"] = i
        warmup_rows.append(r)
        print(f"[warm-up {i}/{WARMUP_REQUESTS}] status={r['http_status'] or 'ERROR'} "
              f"latency={r['latency_seconds']:.2f}s")

    # ---- Phase 2: benchmark on a warm instance ----
    rows = []
    for i, (category, question) in enumerate(QUESTIONS, start=1):
        r = paced_send(question)
        r.update({"phase": "benchmark", "test_id": i, "category": category, "question": question})
        rows.append(r)
        print(f"[{i:02d}/{len(QUESTIONS)}] {category:<18} status={r['http_status'] or 'ERROR'} "
              f"latency={r['latency_seconds']:.2f}s words={r['answer_words']}")

    ok_rows = [r for r in rows if r["success"]]
    failed_rows = [r for r in rows if not r["success"]]
    ok_lat = [r["latency_seconds"] for r in ok_rows]

    print("\n================ SUMMARY ================")
    first = warmup_rows[0]
    print(f"Cold-start estimate (first warm-up request): {first['latency_seconds']:.2f}s "
          f"(status {first['http_status']})")
    print("  Only valid if the service was idle before this run.")
    later = [r["latency_seconds"] for r in warmup_rows[1:] if r["success"]]
    if later:
        print(f"Later warm-up requests: {', '.join(f'{x:.2f}s' for x in later)}")

    print(f"\nBenchmark (warm): {len(ok_rows)}/{len(rows)} succeeded "
          f"({len(ok_rows) / len(rows) * 100:.1f}%)")
    print("Latency, successful requests only:", stats(ok_lat))
    if failed_rows:
        print("Failed requests:", [(r["test_id"], r["http_status"], r["latency_seconds"])
                                   for r in failed_rows])

    total_retries = sum(r.get("retries_429", 0) for r in warmup_rows + rows)
    print(f"Total 429 retries needed: {total_retries}"
          + ("  (rate limit still being hit; lower REQUESTS_PER_MINUTE)" if total_retries else "  (none)"))

    print("\nBy category (successful requests):")
    for cat in dict.fromkeys(r["category"] for r in rows):
        lat = [r["latency_seconds"] for r in ok_rows if r["category"] == cat]
        print(f"  {cat:<18} {stats(lat)}")

    try:
        corr = statistics.correlation(ok_lat, [r["answer_words"] for r in ok_rows])
        print(f"\nCorrelation between answer length (words) and latency: {corr:.2f}")
        print("  Near 1 = long answers explain slow requests; near 0 = they do not.")
    except Exception:
        pass

    print("\nNext step: compare these timings with the Cloud Run logs for the same window")
    print("(container start count + per-request latency) to see where the time goes.")
    print("Review answers yourself for correctness before reporting quality numbers.")

    if SAVE_RESULTS:
        stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        name = f"ask_piyush_ai_benchmark_v2_{stamp}.json"
        with open(name, "w", encoding="utf-8") as f:
            json.dump({
                "endpoint": CHAT_URL,
                "run_timestamp_utc": datetime.now(timezone.utc).isoformat(),
                "warmup": warmup_rows,
                "results": rows,
            }, f, ensure_ascii=False, indent=2)
        print(f"Saved: {name}")


if __name__ == "__main__":
    main()