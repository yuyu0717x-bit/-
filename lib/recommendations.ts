import { mathKnowledgePoints, vocabulary } from "@/lib/content";
import type { AppProgress, KnowledgePoint } from "@/lib/types";

export type KnowledgePointStatus = "completed" | "current" | "available" | "locked" | "needs-review";

export type LearningTask = {
  id: string;
  title: string;
  detail: string;
  reason: string;
  href: string;
  kind: "continue" | "review" | "practice" | "prerequisite";
};

export function getPointMastery(point: KnowledgePoint, progress: AppProgress) {
  if (point.exercises.length === 0) return 0;
  const correct = point.exercises.filter((exercise) => progress.exerciseResults[exercise.id]).length;
  return Math.round((correct / point.exercises.length) * 100);
}

export function getPointStatus(point: KnowledgePoint, progress: AppProgress): KnowledgePointStatus {
  const completed = progress.completedKnowledgePoints.includes(point.id);
  if (completed && getPointMastery(point, progress) < 70) return "needs-review";
  if (completed) return "completed";
  if (point.id === progress.currentKnowledgePointId) return "current";
  if (point.prerequisites.some((id) => !progress.completedKnowledgePoints.includes(id))) return "locked";
  return "available";
}

export function getNextRecommendedPoint(progress: AppProgress) {
  const current = mathKnowledgePoints.find((point) => point.id === progress.currentKnowledgePointId);
  if (current && getPointStatus(current, progress) !== "completed") return current;
  if (current?.nextKnowledgePointId) {
    const next = mathKnowledgePoints.find((point) => point.id === current.nextKnowledgePointId);
    if (next && next.prerequisites.every((id) => progress.completedKnowledgePoints.includes(id))) return next;
  }
  return mathKnowledgePoints.find((point) => ["current", "available", "needs-review"].includes(getPointStatus(point, progress))) ?? mathKnowledgePoints[0];
}

export function buildTaskPool(progress: AppProgress): LearningTask[] {
  const current = getNextRecommendedPoint(progress);
  const tasks: LearningTask[] = [];
  const currentMastery = getPointMastery(current, progress);
  const currentComplete = progress.completedKnowledgePoints.includes(current.id);

  if (!currentComplete) {
    tasks.push({ id: "continue-math", title: `继续学习：${current.title}`, detail: current.summary, reason: "根据你当前的学习位置，先完成这个知识点。", href: `/math/${current.id}`, kind: "continue" });
  }

  const failedExercise = current.exercises.some((exercise) => progress.exerciseResults[exercise.id] === false);
  if (failedExercise || (currentComplete && currentMastery < 70)) {
    tasks.push({ id: "practice-math", title: `复习练习：${current.title}`, detail: `当前练习掌握度 ${currentMastery}%`, reason: "最近练习中有需要再看一遍的题目。", href: `/math/${current.id}#practice`, kind: "practice" });
  } else if (currentComplete && current.nextKnowledgePointId) {
    tasks.push({ id: "next-math", title: `进入下一步：${mathKnowledgePoints.find((point) => point.id === current.nextKnowledgePointId)?.title ?? "下一知识点"}`, detail: "前置知识已完成，可以继续向前。", reason: "当前知识点已经完成，下一节点满足前置条件。", href: `/math/${current.nextKnowledgePointId}`, kind: "continue" });
  }

  const incompletePrerequisite = current.prerequisites.find((id) => !progress.completedKnowledgePoints.includes(id));
  if (incompletePrerequisite) {
    const prerequisite = mathKnowledgePoints.find((point) => point.id === incompletePrerequisite);
    if (prerequisite) tasks.push({ id: "prerequisite", title: `补上前置：${prerequisite.title}`, detail: prerequisite.summary, reason: "当前知识点依赖这个前置内容。", href: `/math/${prerequisite.id}`, kind: "prerequisite" });
  }

  if (progress.vocabularyMastered.length < vocabulary.length) {
    tasks.push({ id: "vocabulary-review", title: "复习英语单词", detail: `${vocabulary.length - progress.vocabularyMastered.length} 个示例词汇待复习`, reason: "词汇复习是英语空间中可随时完成的小任务。", href: "/english/vocabulary/review", kind: "review" });
  }

  return tasks.slice(0, 4);
}

