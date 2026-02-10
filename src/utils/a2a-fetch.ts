/**
 * Custom fetch that rewrites Mastra's A2A URLs and body to Agno format.
 *
 * Mastra agent card:  /.well-known/{agentId}/agent-card.json
 * Agno agent card:    /a2a/agents/{agentId}/.well-known/agent-card.json
 *
 * Mastra message/task: POST /a2a/{agentId} with { method, params }
 * Agno:                POST /a2a/agents/{agentId}/v1/message:send with JSON-RPC 2.0 body
 */
export const createA2AFetch = (baseUrl: string): typeof fetch => {
  const base = baseUrl.replace(/\/$/, "");
  return async (input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : input.url;

    // Rewrite agent card: /.well-known/{agentId}/agent-card.json
    const cardMatch = url.match(/\.well-known\/([^/]+)\/agent-card\.json/);
    if (cardMatch) {
      const agentId = cardMatch[1];
      const rewritten = `${base}/a2a/agents/${agentId}/.well-known/agent-card.json`;
      return fetch(rewritten, init);
    }

    // Rewrite message/task: POST /a2a/{agentId} -> /a2a/agents/{agentId}/v1/message:send|stream
    const a2aMatch = url.match(/\/a2a\/([^/]+)(?:\?|$|\/)/);
    if (
      a2aMatch &&
      !url.includes("/a2a/agents/") &&
      init?.method === "POST" &&
      init?.body
    ) {
      const agentId = a2aMatch[1];
      let body: Record<string, unknown>;
      try {
        body =
          typeof init.body === "string"
            ? (JSON.parse(init.body) as Record<string, unknown>)
            : (init.body as unknown as Record<string, unknown>);
      } catch {
        return fetch(input, init);
      }

      const method = body.method as string;
      const params = (body.params as Record<string, unknown>) || {};

      // Map Mastra method to Agno REST path
      let pathSuffix = "";
      if (method === "message/send") {
        pathSuffix = "/v1/message:send";
      } else if (method === "message/stream") {
        pathSuffix = "/v1/message:stream";
      } else {
        // tasks/get, tasks/cancel - Agno doesn't support, but rewrite URL anyway
        return fetch(input, init);
      }

      const rewrittenUrl = `${base}/a2a/agents/${agentId}${pathSuffix}`;

      // Ensure JSON-RPC 2.0 envelope
      const jsonRpcBody = {
        jsonrpc: "2.0",
        id:
          body.id ??
          `req-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        method,
        params: transformParamsToA2A(params),
      };

      return fetch(rewrittenUrl, {
        ...init,
        body: JSON.stringify(jsonRpcBody),
      });
    }

    return fetch(input, init);
  };
};

/**
 * Transform Mastra's simplified params (e.g. { content }) to A2A spec format.
 */
function transformParamsToA2A(
  params: Record<string, unknown>,
): Record<string, unknown> {
  if (params.message && typeof params.message === "object") {
    return params;
  }
  const content = params.content ?? params.text ?? "";
  const text = typeof content === "string" ? content : JSON.stringify(content);
  const message: Record<string, unknown> = {
    messageId:
      params.messageId ??
      `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    role: params.role ?? "user",
    parts: [{ kind: "text", text }],
  };
  if (params.contextId !== undefined) message.contextId = params.contextId;
  if (params.taskId !== undefined) message.taskId = params.taskId;

  return {
    ...params,
    message,
    metadata: params.metadata ?? {},
  };
}
