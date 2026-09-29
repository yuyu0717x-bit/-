import { vocabulary } from "@/lib/content";
import type { AppProgress, DailyVocabularySession, VocabularyTestRecord, VocabularyTestType } from "@/lib/types";

export const DAILY_WORD_LIMIT = 20;

export function getTodayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function daySeed(dateKey: string) {
  return dateKey.split("-").reduce((total, part) => total + Number(part), 0);
}

export function createDailyVocabularySession(date = getTodayKey()): DailyVocabularySession {
  const offset = daySeed(date) % vocabulary.length;
  const rotated = [...vocabulary.slice(offset), ...vocabulary.slice(0, offset)];
  const wordIds = rotated.slice(0, Math.min(DAILY_WORD_LIMIT, vocabulary.length)).map((word) => word.id);
  return { date, wordIds, queue: [...wordIds], seenWordIds: [], testedWordIds: [], masteredWordIds: [], attempts: 0 };
}

export function ensureDailyVocabularySession(progress: AppProgress, date = getTodayKey()): AppProgress {
  if (progress.dailyVocabularySession?.date === date) return progress;
  return { ...progress, dailyVocabularySession: createDailyVocabularySession(date) };
}

export function markVocabularyWordSeen(progress: AppProgress, wordId: string): AppProgress {
  const session = progress.dailyVocabularySession;
  if (!session || session.seenWordIds.includes(wordId)) return progress;
  return { ...progress, dailyVocabularySession: { ...session, seenWordIds: [...session.seenWordIds, wordId] } };
}

export function recordVocabularyTest(
  progress: AppProgress,
  wordId: string,
  testType: VocabularyTestType,
  userAnswer: string,
  correctAnswer: string,
  isCorrect: boolean,
  timestamp = new Date().toISOString(),
): AppProgress {
  const session = progress.dailyVocabularySession;
  if (!session || session.queue[0] !== wordId) return progress;
  const record: VocabularyTestRecord = { wordId, testType, userAnswer, correctAnswer, isCorrect, timestamp, sessionDate: session.date };
  const testedWordIds = session.testedWordIds.includes(wordId) ? session.testedWordIds : [...session.testedWordIds, wordId];
  const masteredWordIds = isCorrect
    ? session.masteredWordIds.includes(wordId) ? session.masteredWordIds : [...session.masteredWordIds, wordId]
    : session.masteredWordIds.filter((id) => id !== wordId);
  const remainingQueue = session.queue.slice(1);
  if (isCorrect) {
    const nextSession = { ...session, queue: remainingQueue, testedWordIds, masteredWordIds, attempts: session.attempts + 1 };
    const mastered = progress.vocabularyMastered.includes(wordId) ? progress.vocabularyMastered : [...progress.vocabularyMastered, wordId];
    return { ...progress, vocabularyMastered: mastered, dailyVocabularySession: nextSession, vocabularyTestRecords: [...progress.vocabularyTestRecords, record].slice(-200) };
  }
  const retryIndex = Math.min(4, remainingQueue.length);
  const retryQueue = [...remainingQueue];
  retryQueue.splice(retryIndex, 0, wordId);
  const nextSession = { ...session, queue: retryQueue, testedWordIds, masteredWordIds, attempts: session.attempts + 1 };
  return { ...progress, dailyVocabularySession: nextSession, vocabularyTestRecords: [...progress.vocabularyTestRecords, record].slice(-200) };
}

export function isDailyVocabularyComplete(progress: AppProgress, date = getTodayKey()) {
  const session = progress.dailyVocabularySession;
  if (!session || session.date !== date || session.wordIds.length === 0) return false;
  return session.wordIds.every((wordId) => session.seenWordIds.includes(wordId) && session.testedWordIds.includes(wordId) && session.masteredWordIds.includes(wordId));
}

export function getDailyStats(progress: AppProgress, date = getTodayKey()) {
  const records = progress.vocabularyTestRecords.filter((record) => record.sessionDate === date);
  const correct = records.filter((record) => record.isCorrect).length;
  return { attempts: records.length, correct, accuracy: records.length ? Math.round((correct / records.length) * 100) : 0 };
}

