const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("API_URL environment variable is not defined");
}

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  const result = (await response.json()) as ApiResponse<T>;

  if (!result.success) {
    throw new Error(result.message || "API request failed");
  }

  return result.data;
}
