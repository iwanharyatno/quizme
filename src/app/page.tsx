"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import QuizPlayer from "./components/QuizPlayer";
import { Quiz } from "@/lib/types";
import { generateQuiz } from "./api";
import { Textarea } from "@/components/ui/textarea";

export default function QuizSection() {
  const [prompt, setPrompt] = useState("");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);

  const fetchQuiz = async (prompt: string) => {
    setLoading(true);
    try {
      const data = await generateQuiz(prompt);
      setQuiz(data.result ?? null);
      setPlaying(true);
    } finally {
      setLoading(false);
    }
  };

  const onRestart = (clear: boolean) => {
    if (!clear) return;
    setQuiz(null);
    setPrompt("");
    setLoading(false);
    setPlaying(false);
  }

  return (
    <div className="min-h-screen relative w-full">
      {/* Azure Depths */}
      <div
        className="fixed top-0 left-0 w-full inset-0 -z-10"
        style={{
          background: "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        }}
      />
      <section className="min-h-screen flex flex-col items-center justify-start py-12 z-20 px-4 text-white">
        {!playing ? (
          <>
            <div className="text-center space-y-2 mb-8">
              <h1 className="text-4xl font-bold drop-shadow-lg">QuizMe</h1>
              <p className="text-lg text-gray-300"><em>Create a quiz for me</em></p>
            </div>
            <div className="w-full max-w-xl space-y-4 backdrop-blur-lg bg-white/10 rounded-2xl shadow-xl p-6 border border-white/20">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Deskripsikan kuis anda disini. Sertakan jumlah soal jika ingin lebih dari 5 soal..."
                className="bg-white/20 border-none placeholder:text-gray-300 text-white focus:ring-2 focus:ring-purple-400"
              />
              <Button
                onClick={() => fetchQuiz(prompt)}
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition"
              >
                {loading ? "Membuat..." : "Buat Kuis"}
              </Button>
            </div>
          </>
        ) : (
          <div className="w-full max-w-2xl mt-12 space-y-6">
            <h2 className="text-2xl text-white text-center">{quiz?.title ?? '---'}</h2>
            <QuizPlayer questions={quiz?.questions ?? []} onRestart={(clear) => onRestart(clear)} />
          </div>
        )}
      </section>
    </div>
  );
}
