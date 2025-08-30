export interface QuizQuestion {
    question: string;
    answers: string[];
    correct_answer_index: number;
}

export interface Quiz {
    title: string,
    questions: QuizQuestion[]
}

export interface ApiResponse {
    success: boolean;
    message: string;
    result: Quiz | null
}