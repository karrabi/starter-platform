const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("API_URL environment variable is not defined");
}

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
type ApiGetOptions = {
  revalidate?: number;
  tags?: string[];
};

export async function apiGet<T>(
  path: string,
  options: ApiGetOptions = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      Accept: "application/json",
    },

    next: {
      revalidate: options.revalidate,
      tags: options.tags,
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
