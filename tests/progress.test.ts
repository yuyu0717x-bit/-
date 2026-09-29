import { describe, expect, it } from "vitest";
import { emptyProgress, addRecord } from "@/lib/progress";
import { buildTaskPool, getPointStatus } from "@/lib/recommendations";
import { filmEnglish, listening, mathKnowledgePoints, vocabulary } from "@/lib/content";
import { isAnswerCorrect, isSpellingCorrect, normalizeAnswer } from "@/lib/answer-checking";
import { createDailyVocabularySession, isDailyVocabularyComplete, markVocabularyWordSeen, recordVocabularyTest } from "@/lib/vocabulary";
import type { AppProgress } from "@/lib/types";

describe("local progress adapter", () => {
  it("adds a recent learning record without mutating the original", () => {
    const next = addRecord(emptyProgress, "数学", "函数基础", "完成学习");
    expect(emptyProgress.records).toHaveLength(0);
    expect(next.records[0]).toMatchObject({ subject: "数学", title: "函数基础", action: "完成学习" });
  });

  it("exposes a prerequisite-aware math path", () => {
    expect(mathKnowledgePoints.map((point) => point.id)).toEqual([
      "function-basics",
      "limits-intro",
      "derivative-intro",
      "integral-intro",
    ]);
    expect(getPointStatus(mathKnowledgePoints[1], emptyProgress)).toBe("locked");
    expect(getPointStatus(mathKnowledgePoints[0], emptyProgress)).toBe("current");
  });

  it("builds explainable tasks from current state", () => {
    const tasks = buildTaskPool(emptyProgress);
    expect(tasks[0]).toMatchObject({ id: "continue-math", kind: "continue" });
    expect(tasks.some((task) => task.reason.length > 0)).toBe(true);
  });

  it("keeps concrete video resources available and linkable", () => {
    expect(mathKnowledgePoints).toHaveLength(4);
    expect(mathKnowledgePoints.reduce((total, point) => total + point.exercises.length, 0)).toBe(40);
    expect(vocabulary.length).toBeGreaterThanOrEqual(50);
    for (const point of mathKnowledgePoints) {
      const resource = point.resources[0];
      expect(resource.type).toBe("video");
      expect(resource.availability).toBe("available");
      expect(resource.url).toMatch(/^https:\/\/www\.bilibili\.com\/video\/BV/);
    }
    expect(filmEnglish[0].resource.availability).toBe("available");
    expect(filmEnglish[0].resource.url).toContain("BV1qt411W7eu");
    expect(listening.resource.availability).toBe("available");
    expect(listening.resource.url).toContain("BV1sbhdzfEqf");
  });

  it("normalizes math answers by question type", () => {
    expect(normalizeAnswer(" 1.0 ", "numeric")).toBe(1);
    expect(isAnswerCorrect("1", 1, "numeric")).toBe(true);
    expect(isAnswerCorrect("1.0", 1, "numeric")).toBe(true);
    expect(isAnswerCorrect(" A ", "a", "choice")).toBe(true);
    expect(isAnswerCorrect(" YES ", "yes", "text")).toBe(true);
    expect(isAnswerCorrect("", 1, "numeric")).toBe(false);
    expect(isAnswerCorrect("2", 1, "numeric")).toBe(false);
    expect(isSpellingCorrect(" ENVIRonment ", "environment")).toBe(true);
    expect(isSpellingCorrect("enviroment", "environment")).toBe(false);
  });

  it("does not complete daily vocabulary from browsing alone and retries wrong words", () => {
    const session = createDailyVocabularySession("2026-09-22");
    let progress: AppProgress = { ...emptyProgress, dailyVocabularySession: session, vocabularyTestRecords: [] };
    const firstWord = session.wordIds[0];
    progress = markVocabularyWordSeen(progress, firstWord);
    expect(isDailyVocabularyComplete(progress)).toBe(false);
    progress = recordVocabularyTest(progress, firstWord, "zh-to-en", "wrong", "environment", false, "2026-09-22T10:00:00.000Z");
    expect(progress.dailyVocabularySession?.queue).toContain(firstWord);
    expect(progress.vocabularyTestRecords[0].isCorrect).toBe(false);
    const queueWord = progress.dailyVocabularySession?.queue[0];
    expect(queueWord).not.toBe(firstWord);
  });
});
