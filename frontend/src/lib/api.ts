export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://tarunsingodia-learnflow-ai-backend.hf.space";

function formatApiError(
  data: unknown,
  fallback: string
): string {
  if (!data || typeof data !== "object") {
    return fallback;
  }

  const detail = (data as { detail?: string | { msg?: string }[] }).detail;

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg ?? String(item)).join(", ");
  }

  const error = (data as { error?: string }).error;
  if (error) {
    return error;
  }

  return fallback;
}

export async function parseJsonResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  let data: unknown = null;

  if (text) {
    try {
      data = JSON.parse(text) as unknown;
    } catch {
      if (!response.ok) {
        throw new Error(text.trim() || `Request failed (${response.status})`);
      }
      throw new Error("Invalid JSON response from server");
    }
  }

  if (!response.ok) {
    throw new Error(
      formatApiError(data, text.trim() || `Request failed (${response.status})`)
    );
  }

  const apiError =
    data && typeof data === "object"
      ? (data as { error?: string }).error
      : undefined;
  if (apiError) {
    throw new Error(apiError);
  }

  return data as T;
}