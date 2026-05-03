# AD Standards Tracker — 技术交接

最后更新: 2026-05-03
状态: 已上线，已完成第一轮全库可信度字段补齐、URL 健康治理、数据源分类重整和弱证据记录清理
仓库: https://github.com/AutoZYX-Labs/ad-standards-tracker
生产站: https://standards.autozyx.com
本地路径: /Users/zyx/Desktop/WorkToDo/ad-standards-tracker/

## 当前生产状态

- 最新提交: 13aa1ef Clean up weak evidence records
- 最新生产部署: dpl_5Ne5BJuhMPt724bjPrX4XMqhcAYc
- Vercel 临时地址: https://ad-standards-tracker-krkmc66ec-auto-zyx.vercel.app
- 正式域名: https://standards.autozyx.com
- 本地生产构建: 通过，Next.js 生成 126 个页面
- 线上冒烟: `/`、`/sources`、`/standards?sourceStatus=blocked`、`/standards/INT-ENCAP-2024-001`、`/standards/INT-SAE-2026-001` 均返回 200
- Ask API: 可用；Anthropic 余额不足时自动降级到本地数据库检索，并返回服务端 citation

## 数据状态

- 总记录数: 112
- 唯一 ID: 112
- trust 字段完整度: 112/112
- evidence_level 分布: A 58，B 47，C 7，D 0
- source_status 分布: verified 70，paywalled 19，blocked 23，broken 0，unverified 0
- legal_force 分布: guidance 20，voluntary 29，binding 25，rating_protocol 9，informational 22，best_practice 7
- URL 检查: `URL_CHECK_TIMEOUT_MS=12000 pnpm check:urls` 通过 112 条；被政府站或平台反爬挡住但人工核验过的链接按 `blocked` 跳过

## 2026-05-03 已完成

- 补齐 85 条旧记录的 `legal_force`、`source_type`、`evidence_level`、`verified_at`、`source_status`、`source_note`。
- 新增 `tools/backfill-trust-fields.mjs` 和 `pnpm backfill:trust`，用于保守回填历史记录的 trust 字段。
- 修正多条关键坏链或错误来源:
  - MIIT 组合驾驶辅助相关记录从 2022 修正为 2021 年工信部通装 103 号正式通知。
  - MoT 自动驾驶运输服务指南从 2022 修正为 2020 年交通运输部正式指南。
  - Japan L4 记录从 MLIT 修正为 NPA Japan 的 Road Traffic Act / Specified Automated Operation System。
  - Euro NCAP 2026 Roadmap、VDA TISAX、5GAA C-V2X PDF、深圳法规、上海浦东法规等链接已修正或标注自动化访问状态。
- 首页新增 Data Health 面板，展示 trust 完整度、证据等级结构和链接健康状态。
- `/standards` 支持从 URL query 初始化筛选条件，例如 `/standards?sourceStatus=blocked`。
- `/sources` 数据源页重整为国家/国际标准制定组织、行业标准组织、政府监管机构、测评与评级机构、试点与示范区；补充 CEN-CENELEC、ANSI、BSI、JISC/JSAE、VDA/DIN 等源头机构。
- 清理 Euro NCAP 弱证据重复记录，将 2024 Vision 2030 合并为 `INT-ENCAP-2024-001`，删除两个基于泛化 press index 的 2025 重复记录。
- 将 SAE J3329 和 CATARC C-NCAP 附录 Q 解读从 Evidence C 升为 Evidence B，并补充说明其证据边界。
- 把本地残留的重复/冲突未跟踪文件移入 `.local-quarantine/2026-05-03-untracked/`，并通过 `.gitignore` 排除，避免污染 YAML 数据加载。
- 更新 README、DATA_SCHEMA、CONTRIBUTING，补充 trust 字段治理和回填脚本说明。

## 验证命令

```bash
pnpm validate:data
pnpm lint
URL_CHECK_TIMEOUT_MS=8000 pnpm check:urls
pnpm build
```

当前结果:

- `pnpm validate:data`: 通过，112 records，112 unique ids
- `pnpm lint`: 通过
- `pnpm check:urls`: 通过，112 URLs
- `pnpm build`: 通过，124 pages

## 关键架构

| 文件 | 作用 | 运行边界 |
| --- | --- | --- |
| `lib/types.ts` | 全局类型，含 `StandardRecord`、`DashboardStats`、trust 字段枚举 | 共享 |
| `lib/data.ts` | YAML 加载、统计聚合，使用 `fs` | 仅服务端 |
| `lib/filter.ts` | 标准库客户端过滤逻辑 | 客户端安全 |
| `components/standards-filters.tsx` | 标准库筛选 UI，支持 query 参数初始化 | 客户端 |
| `components/dashboard-content.tsx` | 首页统计、Data Health、最近更新 | 客户端 |
| `app/api/ask/route.ts` | Claude 问答、服务端 citation、本地检索兜底 | 服务端 |
| `tools/validate-data.mjs` | YAML schema 和枚举校验 | CLI |
| `tools/check-urls.mjs` | 链接健康检查 | CLI |
| `tools/backfill-trust-fields.mjs` | 历史记录 trust 字段回填 | CLI |

## 不要踩的坑

1. `lib/data.ts` 使用 Node `fs`，任何 `"use client"` 文件都不能 import 它，即使只是 `import type` 也不要这样做。
2. 客户端需要类型时，从 `lib/types.ts` import；客户端需要过滤逻辑时，从 `lib/filter.ts` import。
3. `source_status: blocked` 不等于坏链。它表示官方源可人工访问，但自动化检查被反爬、地理区域或 TLS 策略挡住。
4. `.local-quarantine/` 是本地隔离区，保存未跟踪重复文件，不要提交，也不要在不了解内容时删除。
5. 公开推广前，Evidence C 条目仍需要专家复核，尤其是非英文/非中文官方站、新闻源动态和国家级法规转译记录。

## 仍需推进

1. Anthropic API 余额充值后，复测 `/api/ask` 的 Claude 智能回答路径。
2. 对剩余 Evidence C 的 7 条记录做专家复核，能升为 A/B 的补官方链接，不能确认的降级为“最新动态”或移出核心标准库。
3. 给 `/maps` 增加按证据等级和法律效力的可视化汇总。
4. 实现第一批自动化源监测，优先级建议为 NHTSA、GOV.UK、Euro NCAP、EUR-Lex、ISO、UNECE、SAC。
5. 发布前准备公众号和 Blog 深度文章，建议主题为“自动驾驶标准不是清单，而是安全证据地图”。
6. 订阅接口仍是轻量 stub，可接 Resend、Loops 或飞书表格。

## 恢复工作流

新会话可直接使用:

```text
你好，继续 ad-standards-tracker。
请先读 /Users/zyx/Desktop/WorkToDo/ad-standards-tracker/HANDOFF.md，
然后告诉我当前状态，并继续处理下一批优化。
```

常用本地命令:

```bash
cd /Users/zyx/Desktop/WorkToDo/ad-standards-tracker
pnpm dev --port 3003
pnpm validate:data
URL_CHECK_TIMEOUT_MS=8000 pnpm check:urls
pnpm build
```
