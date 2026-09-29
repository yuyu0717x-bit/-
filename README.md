# 学习系统 V0.1

一个手机优先的个人学习系统早期可运行版本。它先把最重要的闭环跑通：

`首页 → 数学知识点 → 学习 → 练习 → 完成 → 本地记录 → 首页看到变化`

## 启动

需要 Node.js 20.9+。当前开发环境使用 Node.js 24 和 npm。

```bash
npm install
npm run dev
```

然后打开 http://localhost:3000。

## 检查

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

V0.1 使用浏览器 `localStorage` 保存进度，不需要 Supabase 环境变量。Supabase migration/seed 目录和 `.env.example` 已预留，后续 Phase 2 再接入真实账号与云端数据库。
