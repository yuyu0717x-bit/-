"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock3, RotateCcw } from "lucide-react";
import { useState } from "react";
import { AppShell, PageHeader, SectionTitle } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { formatRecordDate, readProgress } from "@/lib/progress";
import { buildTaskPool } from "@/lib/recommendations";
import type { AppProgress } from "@/lib/types";

export function TasksPage() {
  const [progress] = useState<AppProgress>(() => readProgress());
  const [done, setDone] = useState<string[]>([]);
  const tasks = buildTaskPool(progress);

  return <AppShell><div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12"><PageHeader eyebrow="任务池" title="现在可以做什么？" description="这里是可选的下一步，不是必须完成的每日计划。任务根据当前知识点、练习结果和复习状态生成。" /><div className="mb-8 rounded-2xl bg-mint p-5"><p className="text-sm font-bold">任务池原则</p><p className="mt-2 text-sm leading-6 text-emerald-900/70">跳过不会扣分，今天不学习也不会产生逾期。下次回来时，任务会根据你的记录重新出现。</p></div><SectionTitle title="推荐任务" /><div className="space-y-3">{tasks.map((task) => { const Icon = task.kind === "review" ? RotateCcw : task.kind === "practice" ? CheckCircle2 : BookOpen; return <div key={task.id} className={`flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 sm:flex-row sm:items-center ${done.includes(task.id) ? "opacity-60" : ""}`}><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky"><Icon size={19} /></span><span className="min-w-0 flex-1"><span className="block text-sm font-bold">{task.title}</span><span className="mt-1 block text-sm leading-6 text-muted">{task.detail}</span><span className="mt-1 block text-xs text-muted">推荐原因：{task.reason}</span></span>{done.includes(task.id) ? <span className="text-sm font-semibold text-emerald-700">已完成</span> : <div className="flex gap-2"><Button asChild><Link href={task.href}>开始 <ArrowRight size={15} /></Link></Button><Button variant="ghost" onClick={() => setDone([...done, task.id])}>稍后再做</Button></div>}</div>; })}</div></div></AppShell>;
}

export function HistoryPage() {
  const [progress] = useState<AppProgress>(() => readProgress());
  return <AppShell><div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12"><PageHeader eyebrow="学习记录" title="最近发生了什么？" description="记录不是考核，而是帮助你下次回来时找到方向。" />{progress.records.length === 0 ? <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center"><Clock3 className="mx-auto text-muted" size={24} /><p className="mt-4 font-bold">还没有记录</p><p className="mt-2 text-sm text-muted">完成一个数学知识点或复习一个单词后，记录会显示在这里。</p></div> : <div className="rounded-2xl border border-line bg-white p-5 sm:p-7">{progress.records.map((record) => <div key={record.id} className="flex items-start gap-4 border-b border-line py-4 first:pt-0 last:border-0"><span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-mint"><CheckCircle2 size={17} /></span><div><p className="text-sm font-bold">{record.title}</p><p className="mt-1 text-sm text-muted">{record.subject} · {record.action}</p><p className="mt-1 text-xs text-muted">{formatRecordDate(record.createdAt)}</p></div></div>)}</div>} </div></AppShell>;
}

