"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Check, Circle, ExternalLink, Lock, PlayCircle, RotateCcw, Target } from "lucide-react";
import { useState } from "react";
import { AppShell, PageHeader, SectionTitle } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { isAnswerCorrect } from "@/lib/answer-checking";
import { mathKnowledgePoints, mathPath } from "@/lib/content";
import { addRecord, readProgress, saveProgress } from "@/lib/progress";
import { getPointMastery, getPointStatus } from "@/lib/recommendations";
import type { AppProgress, MathQuestion, Resource } from "@/lib/types";

const statusLabel = { completed: "已完成", current: "当前学习", available: "可以开始", locked: "等待前置", "needs-review": "需要复习" } as const;

export function MathCourse() {
  const [progress] = useState<AppProgress>(() => readProgress());
  const completed = mathKnowledgePoints.filter((point) => progress.completedKnowledgePoints.includes(point.id)).length;
  return <AppShell><div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12"><PageHeader eyebrow="数学" title="数学学习路径" description="先理解当前知识点，再沿着前置和后续关系继续向前。路径会根据你的完成状态显示下一步。" /><section className="mb-8 rounded-2xl bg-sky p-5 sm:p-6"><div className="flex items-end justify-between gap-4"><div><p className="text-sm font-bold">{mathPath.title}</p><p className="mt-1 text-xs text-muted">{mathPath.description}</p></div><span className="text-2xl font-bold">{Math.round((completed / mathKnowledgePoints.length) * 100)}%</span></div><Progress value={(completed / mathKnowledgePoints.length) * 100} className="mt-4 bg-white/70" /></section><SectionTitle title="知识路径" /><div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted"><span className="font-semibold text-ink">函数</span><ArrowRight size={15} /><span>极限</span><ArrowRight size={15} /><span>导数</span><ArrowRight size={15} /><span>积分</span></div><div className="space-y-3">{mathKnowledgePoints.map((point, index) => { const status = getPointStatus(point, progress); const locked = status === "locked"; return <Link key={point.id} href={locked ? "#" : `/math/${point.id}`} aria-disabled={locked} onClick={(event) => locked && event.preventDefault()} className={`group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition sm:p-5 ${locked ? "cursor-not-allowed opacity-60" : "hover:-translate-y-0.5 hover:shadow-soft"}`}><span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${status === "completed" ? "bg-mint text-emerald-700" : status === "needs-review" ? "bg-peach text-orange-700" : status === "current" ? "bg-ink text-white" : "bg-paper text-muted"}`}>{status === "completed" ? <Check size={20} /> : locked ? <Lock size={17} /> : status === "needs-review" ? <RotateCcw size={18} /> : <span className="text-sm font-bold">0{index + 1}</span>}</span><span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2 text-sm font-bold text-ink">{point.title}<span className="rounded-full bg-paper px-2 py-0.5 text-[10px] font-semibold text-muted">{statusLabel[status]}</span></span><span className="mt-1 block text-xs leading-5 text-muted">{point.summary}</span></span>{!locked && <ArrowRight size={18} className="shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-ink" />}</Link>; })}</div><div className="mt-8 rounded-2xl border border-dashed border-line p-5"><p className="text-sm font-bold">路径怎么继续</p><p className="mt-2 text-sm leading-6 text-muted">完成当前知识点并检查练习后，下一节点会自动变成可继续学习的内容。遇到低分练习时，系统会优先提示复习，而不是直接跳过。</p></div></div></AppShell>;
}

export function MathCoursePage({ id }: { id: string }) {
  const point = mathKnowledgePoints.find((item) => item.id === id) ?? mathKnowledgePoints[0];
  const [progress, setProgress] = useState<AppProgress>(() => readProgress());
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const status = getPointStatus(point, progress);
  const mastery = getPointMastery(point, progress);
  const next = point.nextKnowledgePointId ? mathKnowledgePoints.find((item) => item.id === point.nextKnowledgePointId) : null;
  const directResources = point.resources.filter((resource) => resource.availability === "available");
  const unavailableResources = point.resources.filter((resource) => resource.availability === "unavailable");
  const complete = progress.completedKnowledgePoints.includes(point.id);
  const question = point.exercises[practiceIndex];

  function finish() {
    const shouldAdvance = getPointMastery(point, progress) >= 70;
    const nextId = shouldAdvance && point.nextKnowledgePointId ? point.nextKnowledgePointId : point.id;
    const updated = addRecord({ ...progress, completedKnowledgePoints: complete ? progress.completedKnowledgePoints : [...progress.completedKnowledgePoints, point.id], currentKnowledgePointId: nextId }, "数学", point.title, "完成学习");
    saveProgress(updated);
    setProgress(updated);
  }

  function submitAnswer() {
    const correct = isAnswerCorrect(answer, question.correctAnswer, question.type);
    const updated = addRecord({ ...progress, exerciseResults: { ...progress.exerciseResults, [question.id]: correct } }, "数学", point.title, correct ? "练习答对" : "练习答错");
    saveProgress(updated);
    setProgress(updated);
    setSubmitted(true);
  }

  function nextQuestion() {
    setPracticeIndex((current) => (current + 1) % point.exercises.length);
    setAnswer("");
    setSubmitted(false);
  }

  return <AppShell><div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12"><Link href="/math" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink">← 返回数学路径</Link><PageHeader eyebrow={`数学路径 / ${statusLabel[status]}`} title={point.title} description={point.summary} /><div className="mb-6 grid gap-3 sm:grid-cols-3"><InfoStat label="当前状态" value={statusLabel[status]} /><InfoStat label="练习掌握度" value={`${mastery}%`} /><InfoStat label="题目数量" value={`${point.exercises.length} 道`} /></div><div className="grid gap-6 lg:grid-cols-[1fr_290px]"><article className="space-y-6"><section id="learn" className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-7"><div className="mb-5 flex items-center gap-2 text-sm font-bold"><BookOpen size={18} />为什么学习</div><p className="leading-7 text-muted">{point.whyLearn}</p><div className="mt-6 rounded-xl bg-sky p-4"><div className="flex items-center gap-2 text-sm font-bold"><Target size={17} />学习目标</div><ul className="mt-3 space-y-2 text-sm leading-6 text-muted">{point.learningGoals.map((goal) => <li key={goal}>· {goal}</li>)}</ul></div><div className="mt-6 space-y-4 prose-lite">{point.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section><ResourceSection resources={directResources} title="推荐学习资源" />{unavailableResources.length > 0 && <section className="rounded-2xl border border-dashed border-line p-5"><p className="text-sm font-bold">暂不可用的资源</p><div className="mt-3 space-y-2">{unavailableResources.map((resource) => <ResourceRow key={resource.id} resource={resource} />)}</div></section>}<PracticeSection question={question} index={practiceIndex} total={point.exercises.length} answer={answer} submitted={submitted} onAnswer={setAnswer} onSubmit={submitAnswer} onNext={nextQuestion} result={progress.exerciseResults[question.id]} /></article><aside className="h-fit space-y-4 lg:sticky lg:top-24"><section className="rounded-2xl border border-line bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-muted">学习动作</p><p className="mt-3 text-lg font-bold">{complete ? "这个知识点已完成" : "准备好开始了吗？"}</p><p className="mt-2 text-sm leading-6 text-muted">完成学习后，系统会根据练习掌握度决定是否推进到下一步。</p><Button onClick={finish} variant={complete ? "secondary" : "primary"} className="mt-5 w-full">{complete ? "再次记录学习" : "完成学习"}</Button></section><section className="rounded-2xl border border-line bg-white p-5"><p className="text-xs font-bold uppercase tracking-wider text-muted">下一步建议</p>{next ? <><p className="mt-3 font-bold">{next.title}</p><p className="mt-2 text-sm leading-6 text-muted">{next.summary}</p><Link href={`/math/${next.id}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink">查看下一知识点 <ArrowRight size={15} /></Link></> : <p className="mt-3 text-sm leading-6 text-muted">这是当前示例路径的最后一个节点，之后可以根据练习结果回到需要复习的内容。</p>}</section></aside></div></div></AppShell>;
}

function PracticeSection({ question, index, total, answer, submitted, result, onAnswer, onSubmit, onNext }: { question: MathQuestion; index: number; total: number; answer: string; submitted: boolean; result?: boolean; onAnswer: (value: string) => void; onSubmit: () => void; onNext: () => void }) {
  const shownAnswer = question.type === "choice" ? question.options?.find((option) => option.startsWith(String(question.correctAnswer))) ?? String(question.correctAnswer) : String(question.correctAnswer);
  return <section id="practice" className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-7"><div className="mb-5 flex items-center justify-between gap-4"><div className="flex items-center gap-2 text-sm font-bold"><Circle size={18} />数学练习</div><span className="text-xs font-semibold text-muted">第 {index + 1} / {total} 题</span></div><p className="mb-5 text-base font-semibold leading-7 text-ink">{question.question}</p>{question.type === "choice" && question.options ? <div className="space-y-2">{question.options.map((option) => { const value = option.slice(0, 1); return <button key={option} type="button" onClick={() => onAnswer(value)} className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${answer === value ? "border-ink bg-sky" : "border-line bg-paper hover:bg-sky/60"}`}>{option}</button>; })}</div> : <input value={answer} onChange={(event) => onAnswer(event.target.value)} className="h-11 w-full rounded-xl border border-line bg-paper px-3 text-sm outline-none focus:border-ink" placeholder={question.type === "numeric" ? "输入数字答案" : "写下你的答案"} onKeyDown={(event) => event.key === "Enter" && !submitted && onSubmit()} />}{submitted && <div className={`mt-5 rounded-xl p-4 ${result ? "bg-mint" : "bg-rose-50"}`}><p className={`text-sm font-bold ${result ? "text-emerald-800" : "text-rose-700"}`}>{result ? "✓ 正确" : "✗ 错误"}</p><p className="mt-2 text-xs text-muted">你的答案：{answer || "未作答"}</p><p className="mt-1 text-xs text-muted">正确答案：{shownAnswer}</p><p className="mt-3 text-sm leading-6 text-ink"><span className="font-semibold">本题解析：</span>{question.explanation}</p><p className="mt-2 text-sm leading-6 text-muted"><span className="font-semibold text-ink">题型讲解：</span>{question.typeExplanation}</p></div>}<div className="mt-6 flex flex-wrap gap-2"><Button onClick={onSubmit} disabled={submitted}>提交答案</Button>{submitted && <Button variant="secondary" onClick={onNext}>{index + 1 === total ? "再做第一题" : "下一题"} <ArrowRight size={15} /></Button>}</div></section>;
}

function InfoStat({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-line bg-white p-4"><p className="text-xs text-muted">{label}</p><p className="mt-2 text-sm font-bold text-ink">{value}</p></div>; }

function ResourceSection({ resources, title }: { resources: Resource[]; title: string }) { return <section className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-7"><SectionTitle title={title} /><div className="space-y-3">{resources.length ? resources.map((resource) => <ResourceRow key={resource.id} resource={resource} />) : <p className="text-sm text-muted">暂时没有可直接访问的资源。</p>}</div></section>; }

function ResourceRow({ resource }: { resource: Resource }) { const nextTitle = resource.relatedNextStep ? mathKnowledgePoints.find((point) => point.id === resource.relatedNextStep)?.title : null; return <div className="rounded-xl border border-line p-4 hover:bg-paper"><div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky"><PlayCircle size={18} /></span><div className="min-w-0 flex-1"><p className="text-sm font-bold">{resource.title}</p><div className="mt-2 flex flex-wrap gap-2 text-[11px] text-muted"><span className="rounded-full bg-sky px-2 py-1">{resource.source}</span><span className="rounded-full bg-paper px-2 py-1">{resource.difficulty}</span><span className="rounded-full bg-mint px-2 py-1">中文讲解</span></div><p className="mt-3 text-xs leading-5 text-muted"><span className="font-semibold text-ink">为什么推荐：</span>{resource.description}</p>{nextTitle && <p className="mt-2 text-xs text-muted">看完之后：做当前练习，掌握后进入 {nextTitle}</p>}</div></div>{resource.availability === "available" && resource.url ? <a href={resource.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-ink px-3 py-2 text-xs font-semibold text-white hover:bg-ink/90">直接观看 <ExternalLink size={14} /></a> : <p className="mt-4 text-xs font-semibold text-muted">暂不可用，未提供可验证的访问地址</p>}</div>; }

