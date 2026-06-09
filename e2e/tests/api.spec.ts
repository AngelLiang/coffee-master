import { test, expect } from "@playwright/test";

test.describe("后端 API", () => {
  const API_BASE = process.env.API_BASE || "http://localhost:8000/api";

  test("健康检查端点返回正确", async ({ request }) => {
    const response = await request.get(`${API_BASE}/health`);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body).toHaveProperty("status");
    expect(body).toHaveProperty("model_name");
    expect(["ok", "loading"]).toContain(body.status);
  });

  test("聊天端点接受 POST 请求", async ({ request }) => {
    const response = await request.post(`${API_BASE}/chat`, {
      data: { message: "你好" },
    });
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("text/event-stream");
  });

  test("重置对话端点返回成功", async ({ request }) => {
    const response = await request.post(`${API_BASE}/chat/reset`);
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body).toHaveProperty("message");
  });
});
