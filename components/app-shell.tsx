"use client";

import Link from "next/link";
import { BookOpen, CheckSquare, Home, Languages, Menu, NotebookPen, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "首页", icon: Home },
  { href: "/math", label: "数学", icon: BookOpen },
  { href: "/english", label: "英语", icon: Languages },
  { href: "/tasks", label: "任务池", icon: CheckSquare },
  { href: "/history", label: "记录", icon: NotebookPen },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-paper">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-line bg-white px-5 py-7 lg:block">
        <Link href="/" className="mb-12 flex items-center gap-3 px-2" aria-label="回到首页">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-lg font-bold text-white">学</span>
          <span><span className="block text-base font-bold">学习系统</span><span className="text-xs text-muted">从下一步开始</span></span>
        </Link>
        <nav className="space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted transition hover:bg-paper hover:text-ink"><Icon size={18} strokeWidth={1.8} />{label}</Link>)}
        </nav>
        <div className="absolute bottom-7 left-5 right-5 rounded-2xl bg-mint p-4"><p className="text-xs font-semibold text-emerald-900">今天不学习，也没关系</p><p className="mt-1 text-xs leading-5 text-emerald-800/70">回来时，我们从真实状态继续。</p></div>
      </aside>
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-white/90 px-4 backdrop-blur lg:hidden">
        <Link href="/" className="flex items-center gap-2 font-bold"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ink text-sm text-white">学</span>学习系统</Link>
        <button className="rounded-xl p-2 text-muted hover:bg-paper" onClick={() => setOpen(!open)} aria-label={open ? "关闭菜单" : "打开菜单"}>{open ? <X size={21} /> : <Menu size={21} />}</button>
      </header>
      {open && <div className="fixed inset-x-0 top-16 z-20 border-b border-line bg-white p-3 shadow-soft lg:hidden">{navItems.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted hover:bg-paper"><Icon size={18} />{label}</Link>)}</div>}
      <main className="pb-24 lg:ml-64 lg:pb-10">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-line bg-white/95 px-2 py-2 backdrop-blur lg:hidden">{navItems.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="flex flex-col items-center gap-1 rounded-xl py-1 text-[11px] text-muted hover:bg-paper hover:text-ink"><Icon size={18} strokeWidth={1.8} />{label}</Link>)}</nav>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return <div className="mb-8"><p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-muted">{eyebrow ?? "学习空间"}</p><h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h1>{description && <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{description}</p>}</div>;
}

export function SectionTitle({ title, action }: { title: string; action?: React.ReactNode }) { return <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold text-ink">{title}</h2>{action}</div>; }
