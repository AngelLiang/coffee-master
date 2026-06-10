from llama_cpp import Llama

def main():
    llm = Llama.from_pretrained(
        repo_id="ynanxiu/qwen25-15b-coffee-v5-gguf",
        filename="qwen25_15b_coffee_v5_q4_k_m.gguf",
        chat_format="chatml", 
    )

    output = llm.create_chat_completion(
        messages=[
            {'role': 'system', 'content': '你是一位深耕精品咖啡行业8年的独立咖啡馆金牌咖啡师'},
            {"role": "user", "content": "咖啡太苦了怎么办？"}
        ],
        max_tokens=512,       # 最大回复长度
        temperature=0.7,      # 随机性 (0-1，越高越有创意)
        top_p=0.9,            # nucleus sampling
        top_k=40,             # top-k sampling
    )
    import json
    print("=== 完整返回结构 ===")
    print(json.dumps(output, indent=2, ensure_ascii=False))
    print("\n=== 模型回复 ===")
    print(output["choices"][0]["message"]["content"])


if __name__ == "__main__":
    main()
