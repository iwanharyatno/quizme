"use client";
import { useState, useEffect } from "react";
import type { QuizQuestion } from "@/lib/types";
import { Button } from "@/components/ui/button";

type QuizPlayerProps = {
    questions: QuizQuestion[],
    onRestart: (clear: boolean) => void
};

export default function QuizPlayer({ questions, onRestart }: QuizPlayerProps) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [showResult, setShowResult] = useState(false);

    const total = questions.length;

    // Timer countdown
    useEffect(() => {
        if (timeLeft <= 0) {
            handleNext(); // auto next if time runs out
            return;
        }
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleAnswer = (i: number) => {
        if (selected != null) return;
        setSelected(i);
        if (i === questions[current].correct_answer_index) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        setSelected(null);
        setTimeLeft(30); // reset timer
        if (current + 1 < total) {
            setCurrent(current + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleRestart = (clear: boolean) => {
        onRestart(clear);
        setShowResult(false);
        setCurrent(0);
        setSelected(null);
        setScore(0);
    }

    const progress = ((current + 1) / total) * 100;

    if (showResult) {
        const percentage = Math.round((score / questions.length) * 100);
        let color = "text-red-500";
        if (percentage >= 70) color = "text-green-500";
        else if (percentage >= 40) color = "text-yellow-400";

        return (
            <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-4">Quiz Finished!</h2>
                <p className={`text-4xl font-extrabold ${color}`}>{percentage}%</p>
                <p className="mt-2 text-gray-300 mb-6">
                    You got {score} out of {questions.length} correct
                </p>
                <div className="mt-4 flex gap-5 justify-center">
                    <button
                        onClick={() => handleRestart(false)}
                        className="mt-2 px-6 py-2 rounded-xl bg-purple-500/80 hover:bg-purple-600 text-white font-semibold transition"
                    >
                        Ulang Kuis
                    </button>
                    <button
                        onClick={() => handleRestart(true)}
                        className="mt-2 px-6 py-2 rounded-xl bg-amber-700/80 hover:bg-amber-800 text-white font-semibold transition"
                    >
                        Hapus Kuis
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-lg w-full max-w-xl mx-auto">
            {/* Progress bar */}
            <div className="w-full bg-white/20 h-2 rounded-full mb-4">
                <div
                    className="h-2 rounded-full bg-green-400 transition-all"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Timer */}
            <p className="text-right text-sm text-gray-200 mb-2">
                ⏳ {timeLeft}s
            </p>

            {/* Question */}
            <h2 className="text-lg font-semibold mb-4 text-white">
                {questions[current].question}
            </h2>

            {/* Answers */}
            <ul className="space-y-2">
                {questions[current].answers.map((ans, i) => (
                    <li key={i}>
                        <Button
                            onClick={() => handleAnswer(i)}
                            variant={selected === i ? "secondary" : "outline"}
                            disabled={selected !== null} // biar setelah pilih, ga bisa klik lagi
                            className={`cursor-pointer p-3 rounded-xl border w-full transition
                                ${selected !== null
                                    ? i === questions[current].correct_answer_index
                                        ? "bg-green-500/60 border-green-400" // highlight jawaban benar
                                        : selected === i
                                            ? "bg-red-500/60 border-red-400" // jawaban salah yang dipilih
                                            : "bg-white/5 border-white/20" // jawaban lain tetap normal
                                    : "bg-white/5 hover:bg-white/20 border-white/20"
                                }`}
                        >
                            {ans}
                        </Button>
                    </li>
                ))}
            </ul>

            {/* Next button */}
            {selected !== null && (
                <button
                    onClick={handleNext}
                    className="mt-4 w-full py-2 rounded-xl bg-blue-500/70 hover:bg-blue-600 text-white font-semibold"
                >
                    {current + 1 === questions.length ? "Finish" : "Next"}
                </button>
            )}
        </div>
    );
}
