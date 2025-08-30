import { fetcher } from "@/lib/fetcher";
import { ApiResponse } from "@/lib/types";

export async function generateQuiz(prompt: string): Promise<ApiResponse> {
  const res = await fetcher<ApiResponse>("/quiz/generate", {
    method: 'POST',
    body: JSON.stringify({ prompt })
  })
  if (!res) throw new Error("Failed to generate quiz");
  return res;
}