import type { MathQuestionType } from "@/lib/types";

function normalizedText(value: unknown) {
  return String(value ?? "").trim().toLocaleLowerCase();
}

export function normalizeAnswer(value: unknown, type: MathQuestionType): string | number | null {
  if (value === null || value === undefined || String(value).trim() === "") return null;
  const text = String(value).trim();
  if (type === "numeric" || type === "fill") {
    const numeric = Number(text);
    if (Number.isFinite(numeric)) return numeric;
  }
  if (type === "choice") return text.toUpperCase();
  return normalizedText(text);
}

export function isAnswerCorrect(userAnswer: unknown, correctAnswer: unknown, type: MathQuestionType) {
  const normalizedUser = normalizeAnswer(userAnswer, type);
  const normalizedCorrect = normalizeAnswer(correctAnswer, type);
  if (normalizedUser === null || normalizedCorrect === null) return false;
  return normalizedUser === normalizedCorrect;
}

export function normalizeSpelling(value: unknown) {
  return normalizedText(value).replace(/\s+/g, "");
}

export function isSpellingCorrect(userAnswer: unknown, correctAnswer: string) {
  const normalizedUser = normalizeSpelling(userAnswer);
  return normalizedUser.length > 0 && normalizedUser === normalizeSpelling(correctAnswer);
}

