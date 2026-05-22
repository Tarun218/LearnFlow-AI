export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tarunsingodia-learnflow-ai-backend.hf.space";

export async function parseJsonResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    const detail = (data as { detail?: string | { msg?: string }[] }).detail;

    const message =
      typeof detail === "string"
        ? detail
        : Array.isArray(detail)
          ? detail.map((item) => item.msg ?? String(item)).join(", ")
          : (data as { error?: string }).error ?? "Request failed";

    throw new Error(message);
  }

  return data as T;
}

// production rebuild trigger