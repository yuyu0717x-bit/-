import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function ProgressCard({ subject, subtitle, value, href, tone }: { subject: string; subtitle: string; value: number; href: string; tone: "sky" | "peach" }) {
  return <Link href={href} className={`group rounded-2xl border border-line p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg ${tone === "sky" ? "bg-sky" : "bg-peach"}`}><div className="flex items-start justify-between"><div><p className="text-sm font-bold text-ink">{subject}</p><p className="mt-1 text-xs text-muted">{subtitle}</p></div><ArrowUpRight className="text-muted transition group-hover:text-ink" size={18} /></div><div className="mt-6 flex items-end justify-between"><span className="text-3xl font-bold text-ink">{value}%</span><span className="text-xs text-muted">学习进度</span></div><Progress value={value} className="mt-3 bg-white/70" /></Link>;
}
