#!/usr/bin/env python3
"""Benchmark script for evaluating LLM generation speed and latency.

Usage:
    python benchmark.py --help
    python benchmark.py                          # Run with default prompts
    python benchmark.py --warmup --rounds 5      # Warmup + 5 rounds averaging
    python benchmark.py --prompt "咖啡推荐"         # Custom prompt
"""

import argparse
import json
import time
import statistics
from dataclasses import dataclass, asdict
from typing import List

from llama_cpp import Llama


@dataclass
class BenchmarkResult:
    """Holds metrics for a single benchmark run."""
    prompt: str
    prompt_tokens: int
    output_tokens: int
    ttft_ms: float          # Time to First Token in milliseconds
    total_ms: float         # Total time in milliseconds
    tps: float              # Tokens per second (after first token)
    total_tps: float        # Tokens per second (including TTFT)


def load_model():
    """Load the model (same as main.py)."""
    print("Loading model...")
    llm = Llama.from_pretrained(
        repo_id="ynanxiu/qwen25-15b-coffee-v5-gguf",
        filename="qwen25_15b_coffee_v5_q4_k_m.gguf",
        chat_format="chatml",
        verbose=False,
    )
    return llm


def run_benchmark(
    llm: Llama,
    prompt: str,
    system_prompt: str = "你是一位深耕精品咖啡行业8年的独立咖啡馆金牌咖啡师",
    max_tokens: int = 512,
) -> BenchmarkResult:
    """Run a single benchmark and return metrics."""
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": prompt},
    ]

    start_time = time.perf_counter()
    first_token_time = None
    output_tokens = 0
    content_parts = []

    stream = llm.create_chat_completion(
        messages=messages,
        max_tokens=max_tokens,
        temperature=0.7,
        top_p=0.9,
        top_k=40,
        stream=True,
    )

    for chunk in stream:
        if first_token_time is None:
            first_token_time = time.perf_counter()

        delta = chunk["choices"][0].get("delta", {})
        text = delta.get("content", "")
        if text:
            content_parts.append(text)
            output_tokens += 1

    end_time = time.perf_counter()

    total_time = end_time - start_time
    ttft = first_token_time - start_time if first_token_time else total_time
    generation_time = end_time - first_token_time if first_token_time else 0

    # Calculate TPS (excluding TTFT for pure generation speed)
    tps = output_tokens / generation_time if generation_time > 0 else 0
    # Total TPS (including TTFT)
    total_tps = output_tokens / total_time if total_time > 0 else 0

    # Estimate prompt tokens (rough estimate: ~1.5 tokens per Chinese char, ~4 per English word)
    # llama.cpp doesn't expose token count easily, so we use a heuristic
    prompt_tokens = len(prompt)  # rough estimate

    return BenchmarkResult(
        prompt=prompt[:50] + "..." if len(prompt) > 50 else prompt,
        prompt_tokens=prompt_tokens,
        output_tokens=output_tokens,
        ttft_ms=ttft * 1000,
        total_ms=total_time * 1000,
        tps=tps,
        total_tps=total_tps,
    )


def run_warmup(llm: Llama):
    """Run a short warmup to initialize caches."""
    print("  Warming up...", end="", flush=True)
    _ = run_benchmark(llm, "你好", max_tokens=50)
    print(" done")


def print_header(title: str):
    print(f"\n{'=' * 60}")
    print(f"  {title}")
    print(f"{'=' * 60}")


def print_result(result: BenchmarkResult):
    print(f"\n  Prompt: {result.prompt}")
    print(f"  Output Tokens: {result.output_tokens}")
    print(f"  TTFT (ms):     {result.ttft_ms:>10.2f}")
    print(f"  Total Time (ms): {result.total_ms:>8.2f}")
    print(f"  Generation TPS: {result.tps:>9.2f}")
    print(f"  Overall TPS:    {result.total_tps:>9.2f}")


def print_summary(results: List[BenchmarkResult]):
    if not results:
        return

    print(f"\n{'=' * 60}")
    print("  SUMMARY STATISTICS")
    print(f"{'=' * 60}")

    def fmt(values, unit=""):
        if not values:
            return "N/A"
        return f"{statistics.mean(values):.2f} ± {statistics.stdev(values):.2f} {unit}" if len(values) > 1 else f"{values[0]:.2f} {unit}"

    ttfts = [r.ttft_ms for r in results]
    totals = [r.total_ms for r in results]
    tpss = [r.tps for r in results]
    total_tpss = [r.total_tps for r in results]
    tokens = [r.output_tokens for r in results]

    print(f"  Rounds:        {len(results)}")
    print(f"  Output Tokens: {fmt(tokens)}")
    print(f"  TTFT (ms):     {fmt(ttfts, 'ms')}")
    print(f"  Total Time:    {fmt(totals, 'ms')}")
    print(f"  Generation TPS:{fmt(tpss)}")
    print(f"  Overall TPS:   {fmt(total_tpss)}")


def main():
    parser = argparse.ArgumentParser(description="Benchmark LLM generation speed")
    parser.add_argument("--prompt", action="append", help="Prompt to test (can specify multiple)")
    parser.add_argument("--prompts-file", help="File with prompts, one per line")
    parser.add_argument("--rounds", type=int, default=1, help="Number of benchmark rounds (default: 1)")
    parser.add_argument("--warmup", action="store_true", help="Run a warmup before benchmarking")
    parser.add_argument("--max-tokens", type=int, default=512, help="Max tokens to generate (default: 512)")
    parser.add_argument("--json", action="store_true", help="Output results as JSON")
    args = parser.parse_args()

    # Determine prompt list
    if args.prompts_file:
        with open(args.prompts_file, "r", encoding="utf-8") as f:
            prompts = [line.strip() for line in f if line.strip()]
    elif args.prompt:
        prompts = args.prompt
    else:
        # Default diversified prompts to avoid cache effects
        prompts = [
            "咖啡太苦了怎么办",
            "推荐一款适合手冲的咖啡豆",
            "什么是日晒和水洗处理法",
            "新手如何挑选第一台咖啡磨豆机",
            "浅烘焙和深烘焙的风味区别是什么",
            "拿铁和卡布奇诺有什么区别",
            "瑰夏为什么那么贵",
            "咖啡的产区对风味有什么影响",
            "冷萃咖啡怎么做最好喝",
            "家用意式机选购建议",
        ]

    llm = load_model()

    if args.warmup:
        run_warmup(llm)

    results: List[BenchmarkResult] = []

    print_header(f"BENCHMARK — {args.rounds} Round(s)")

    for i in range(args.rounds):
        prompt = prompts[i % len(prompts)]
        if args.rounds > 1:
            print(f"\n  Round {i + 1}/{args.rounds} — Prompt: {prompt[:40]}...")
        result = run_benchmark(llm, prompt, max_tokens=args.max_tokens)
        results.append(result)
        if args.rounds > 1:
            print_result(result)
        else:
            print_result(result)

    if args.rounds > 1:
        print_summary(results)
    elif args.rounds == 1:
        # Still print single result nicely
        pass

    if args.json:
        print("\n" + json.dumps([asdict(r) for r in results], indent=2, ensure_ascii=False))

    # Save results to file for later analysis
    import os
    os.makedirs("results", exist_ok=True)
    timestamp = time.strftime("%Y%m%d_%H%M%S")
    output_file = os.path.join("results", f"benchmark_{timestamp}.json")
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump([asdict(r) for r in results], f, indent=2, ensure_ascii=False)
    print(f"\n  Results saved to: {output_file}")


if __name__ == "__main__":
    main()
