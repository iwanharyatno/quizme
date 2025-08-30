export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function fetcher<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const { body, headers, ...rest } = options;

  const finalOptions: RequestInit = {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    // kalau body berupa object, auto stringify
    body:
      body && typeof body === "object" && !(body instanceof FormData)
        ? JSON.stringify(body)
        : (body as BodyInit),
  };

  const res = await fetch(`${API_URL}${url}`, finalOptions);

  if (!res.ok) {
    let message = "";
    try {
      const errorJson = await res.json();
      message = errorJson?.message || res.statusText;
    } catch {
      message = res.statusText;
    }
    throw new Error(`Error ${res.status}: ${message}`);
  }

  return res.json();
}

export async function fetcherPlain(
  url: string,
  options: RequestInit = {}
): Promise<string> {
  const { body, headers, ...rest } = options;

  const finalOptions: RequestInit = {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    // kalau body berupa object, auto stringify
    body:
      body && typeof body === "object" && !(body instanceof FormData)
        ? JSON.stringify(body)
        : (body as BodyInit),
  };

  const res = await fetch(`${API_URL}${url}`, finalOptions);

  if (!res.ok) {
    let message = "";
    try {
      const errorJson = await res.json();
      message = errorJson?.message || res.statusText;
    } catch {
      message = res.statusText;
    }
    throw new Error(`Error ${res.status}: ${message}`);
  }

  return res.text();
}