# AD Standards Tracker — 技术交接（项目内）

**最后更新**: 2026-05-02（数据可信度层与 P0 标准更新）
**配套文档**: `/Users/zyx/Desktop/WorkToDo/session_handoff_standards_tracker.md`（面向用户的状态/待办清单）

## 项目概况

全球自动驾驶/SOTIF 标准追踪站（Next.js 16 + Turbopack + Tailwind 4 + i18n）。
脚手架复制自 `../roam-explorer`，复用 shared 组件（nav/footer/subscribe/i18n/register-gate）。

- **仓库**: https://github.com/AutoZYX-Labs/ad-standards-tracker （public, Apache 2.0）
- **生产**: https://standards.autozyx.com
- **本地**: `/Users/zyx/Desktop/WorkToDo/ad-standards-tracker/`
- **端口**: 3003（见 `WorkToDo/.claude/launch.json`）
- **启动**: `pnpm dev --port 3003`（或 `preview_start name="ad-standards-tracker"`）

## 当前状态（已跑通 + 已部署）

- ✅ **108 条记录** 覆盖 international / industry_org / china / us / eu / uk / germany / japan / korea / singapore
- ✅ 新增数据可信度层：`legal_force`、`source_type`、`evidence_level`、`verified_at`、`source_status`
- ✅ `pnpm validate:data` 通过：108 条记录、108 个唯一 ID；仍有 85 条旧记录缺少质量字段，作为渐进式修复债务
- ✅ `pnpm lint` 通过
- ✅ `pnpm build` 通过，生成 119 个静态页面
- ✅ 详情页和卡片展示法律效力、证据等级、来源类型；标准库增加法律效力/来源类型/证据等级/链接状态筛选

## 架构（关键文件）

| 文件 | 作用 | 服务端/客户端 |
|------|------|-------------|
| `lib/types.ts` | 所有 TS 类型（含 `DashboardStats`、`StandardRecord`、`SourceInfo`、`Jurisdiction` 等） | 共享 |
| `lib/data.ts` | YAML 加载器（用 `fs`），导出 `getAllStandards`/`getStandardById`/`getDashboardStats` | **仅服务端** |
| `lib/filter.ts` | 纯函数 `filterStandards`（运行时过滤） | **客户端安全** |
| `tools/validate-data.mjs` | YAML/schema 校验，检查 ID、路径、日期、URL、枚举与重复项 | CLI |
| `lib/sources.ts` | 数据源注册表 | 共享 |
| `lib/i18n.tsx` | i18n Provider + `useI18n` hook | 客户端 |
| `components/standards-filters.tsx` | 客户端过滤器组件 | `"use client"` |
| `components/dashboard-content.tsx` | 首页 Dashboard | `"use client"` |
| `components/standard-card.tsx` | 标准卡片 | 共享 |
| `app/page.tsx` | 首页（`getDashboardStats` + `getAllStandards`） | 服务端 |
| `app/standards/page.tsx` | 标准列表页 | 服务端 |
| `app/standards/[id]/page.tsx` | 详情页 | 服务端 |

## 关键约束（别踩坑）

1. **`lib/data.ts` 用了 `fs`，只能在服务端 import**
   - 任何 `"use client"` 组件**禁止** `import ... from "@/lib/data"`（即使是 `import type` 也要迁到 `lib/types.ts`）
   - 客户端要用过滤逻辑 → `import { filterStandards } from "@/lib/filter"`

2. **新增类型必须放 `lib/types.ts`**
   - 避免客户端组件为了拿一个 type 把 `data.ts` 的 fs 依赖拖进 client bundle

3. **YAML schema**
   - 字段见 `StandardRecord`（`lib/types.ts`）
   - 必填：`id`、`date`、`org`、`jurisdiction`、`type`、`status`、`title_en`、`url`
   - 高优先级条目应补齐：`legal_force`、`source_type`、`evidence_level`、`verified_at`、`source_status`
   - 可选：`title_cn`、`automation_level[]`、`topics[]`、`summary_en/cn`、`impact_note`、`related_standards[]`、`supersedes[]` 等
   - 运行 `pnpm validate:data` 做基础校验；旧记录缺质量字段会 warning，但不会阻塞

## 未完成/待办

根据上一会话的 todos：
- [x] Phase 1: 脚手架
- [x] Phase 2: 50+ YAML 种子数据
- [x] Phase 3: 页面构建
- [x] **P0 数据可信度层**：关键国际法规、EU/UK/Germany/US/China/ASAM/JAMA/TR68 已开始标注法律效力与证据等级
- [ ] **旧记录质量字段补齐**：当前 85 条旧记录缺 `legal_force/source_type/evidence_level/verified_at/source_status`
- [ ] **数据扩充**：继续增加标准条目（重点补齐 JNCAP/KNCAP、UK SoSP、NHTSA 第三修订 SGO、IEEE 3321、Korea L4 性能认证）
- [ ] **`scripts/seed-data.py` 优化**：目前是一次性脚本，考虑改成可追加的 generator
- [ ] **详情页增强**：related_standards 的双向链接、时间线视图
- [ ] **Dashboard 图表**：按年份/辖区的堆叠柱图（已有 recharts 依赖）
- [ ] **数据源爬虫**：`tools/` 目录下的自动化抓取（UNECE、SAC、NHTSA、GOV.UK 等）
- [ ] **部署**：Cloudflare Pages / Vercel
- [ ] **订阅功能**：`/subscribe` 页面当前是静态，需接 Resend/Loops 等
- [ ] **中文内容补齐**：约一半条目 `title_cn`/`summary_cn` 为空

## 恢复工作流（新会话模板）

```
你好，我要继续 ad-standards-tracker 的开发。

请：
1. 读 /Users/zyx/Desktop/WorkToDo/ad-standards-tracker/HANDOFF.md 获取完整上下文
2. 用 preview_start name="ad-standards-tracker" 启动服务器
3. 告诉我当前状态后，等我指令

下一步我想做：[具体任务]
```

## 上次会话解决的关键 bug

**现象**: `next build` 报错 `./lib/data.ts:1:1` —— fs 模块被拖进客户端 bundle
**根因**: `components/standards-filters.tsx`（`"use client"`）误 import `filterStandards` from `@/lib/data`，且 `dashboard-content.tsx` 还 `import type { DashboardStats } from "@/lib/data"`
**修复**:
1. `standards-filters.tsx`: `@/lib/data` → `@/lib/filter`
2. `DashboardStats` interface 从 `lib/data.ts` 迁移到 `lib/types.ts`
3. `dashboard-content.tsx`: 类型 import 合并到 `@/lib/types`
4. `lib/data.ts` 保留 `export type { DashboardStats } from "./types"` 向后兼容

**教训**: 以后 `"use client"` 组件**永远不要** import 任何 `lib/data`，哪怕是 `import type`。
