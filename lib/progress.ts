import type { AppProgress, LearningRecord, Subject } from "@/lib/types";

export const STORAGE_KEY = "study-system-v01";

export const emptyProgress: AppProgress = {
  completedKnowledgePoints: [],
  exerciseResults: {},
  currentKnowledgePointId: "function-basics",
  records: [],
  vocabularyMastered: [],
  vocabularyTestRecords: [],
  dailyVocabularySession: null,
};

export function readProgress(): AppProgress {
  if (typeof window === "undefined") return emptyProgress;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...emptyProgress, ...JSON.parse(raw) } : emptyProgress;
  } catch {
    return emptyProgress;
  }
}

export function saveProgress(progress: AppProgress) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function addRecord(progress: AppProgress, subject: Subject, title: string, action: string): AppProgress {
  const record: LearningRecord = { id: crypto.randomUUID(), subject, title, action, createdAt: new Date().toISOString() };
  return { ...progress, records: [record, ...progress.records].slice(0, 10) };
}

export function formatRecordDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}
