# AD Standards Tracker — 技术交接

最后更新: 2026-05-03
状态: 已上线，已完成全库可信度字段补齐、URL 健康治理、数据源分类重整和剩余弱证据记录核实
仓库: https://github.com/AutoZYX-Labs/ad-standards-tracker
生产站: https://standards.autozyx.com
本地路径: /Users/zyx/Desktop/WorkToDo/ad-standards-tracker/

## 当前生产状态

- 最新应用提交: 358999b Switch ask API to DeepSeek
- 最新生产部署: dpl_D9u8Aw9h51TsHw6TNKape5QUJHEy
- Vercel 临时地址: https://ad-standards-tracker-e3umvwvxm-auto-zyx.vercel.app
- 正式域名: https://standards.autozyx.com
- 本地生产构建: 通过，Next.js 生成 123 个页面
- 线上冒烟: `/standards/STD-UNECE-2026-001`、`/standards/STD-BJHAD-2022-001`、`/standards/STD-SH-2022-001` 均返回 200；删除的旧记录返回 404；`/api/ask` 返回 DeepSeek 非兜底答案并带服务端 citation
- Ask API: 已切换到 DeepSeek V4 Pro；DeepSeek 不可用时自动降级到本地数据库检索，并返回服务端 citation

## 数据状态

- 总记录数: 111
- 唯一 ID: 111
- trust 字段完整度: 111/111
- evidence_level 分布: A 61，B 48，C 2，D 0
- source_status 分布: verified 73，paywalled 19，blocked 19，broken 0，unverified 0
- legal_force 分布: guidance 20，voluntary 29，binding 25，rating_protocol 9，informational 22，best_practice 6
- URL 检查: `URL_CHECK_TIMEOUT_MS=12000 pnpm check:urls` 通过 111 条；被政府站或平台反爬挡住但人工核验过的链接按 `blocked` 跳过

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
- 核实剩余 Evidence C 记录：UNECE ADS GTR 已替换为 UNECE 官方 wiki PDF 并升为 A；北京/上海示范区记录已替换为新华社、北京市发改委、上海市政府官方源并升为 A/B；知乎解读已删除。
- 当前仅保留 2 条 Evidence C：MIIT 组合驾驶辅助报批稿和 KNCAP 2026 动态。两者均经 2026-05-03 复核仍未找到稳定主管部门原文链接，已在 `source_note` 明确标注不可当作正式 GB 或正式 KNCAP 规程。
- 把本地残留的重复/冲突未跟踪文件移入 `.local-quarantine/2026-05-03-untracked/`，并通过 `.gitignore` 排除，避免污染 YAML 数据加载。
- 更新 README、DATA_SCHEMA、CONTRIBUTING，补充 trust 字段治理和回填脚本说明。

## 验证命令

```bash
pnpm validate:data
pnpm lint
URL_CHECK_TIMEOUT_MS=12000 pnpm check:urls
pnpm build
```

当前结果:

- `pnpm validate:data`: 通过，111 records，111 unique ids
- `pnpm lint`: 通过
- `pnpm check:urls`: 通过，111 URLs
- `pnpm build`: 通过，123 pages

## 关键架构

| 文件 | 作用 | 运行边界 |
| --- | --- | --- |
| `lib/types.ts` | 全局类型，含 `StandardRecord`、`DashboardStats`、trust 字段枚举 | 共享 |
| `lib/data.ts` | YAML 加载、统计聚合，使用 `fs` | 仅服务端 |
| `lib/filter.ts` | 标准库客户端过滤逻辑 | 客户端安全 |
| `components/standards-filters.tsx` | 标准库筛选 UI，支持 query 参数初始化 | 客户端 |
| `components/dashboard-content.tsx` | 首页统计、Data Health、最近更新 | 客户端 |
| `app/api/ask/route.ts` | DeepSeek 问答、服务端 citation、本地检索兜底 | 服务端 |
| `tools/validate-data.mjs` | YAML schema 和枚举校验 | CLI |
| `tools/check-urls.mjs` | 链接健康检查 | CLI |
| `tools/backfill-trust-fields.mjs` | 历史记录 trust 字段回填 | CLI |

## 不要踩的坑

1. `lib/data.ts` 使用 Node `fs`，任何 `"use client"` 文件都不能 import 它，即使只是 `import type` 也不要这样做。
2. 客户端需要类型时，从 `lib/types.ts` import；客户端需要过滤逻辑时，从 `lib/filter.ts` import。
3. `source_status: blocked` 不等于坏链。它表示官方源可人工访问，但自动化检查被反爬、地理区域或 TLS 策略挡住。
4. `.local-quarantine/` 是本地隔离区，保存未跟踪重复文件，不要提交，也不要在不了解内容时删除。
5. Evidence C 不等于待办。当前 2 条 Evidence C 是经核实后刻意保留的二级源动态，不进入正式标准/法规/测评规程证据链。

## 当前边界

1. Ask 已使用 DeepSeek V4 Pro，生产环境变量为 `DEEPSEEK_API_KEY`、`DEEPSEEK_MODEL=deepseek-v4-pro`、`DEEPSEEK_REASONING_EFFORT=max`。
2. MIIT 报批稿和 KNCAP 2026 保留为 Evidence C，是因为公开稳定原始链接尚不可得；项目内已明确警示其不能作为正式标准或正式规程引用。
3. 订阅接口仍是轻量 stub；不影响标准库准确性。

## 恢复工作流

新会话可直接使用:

```text
你好，继续 ad-standards-tracker。
请先读 /Users/zyx/Desktop/WorkToDo/ad-standards-tracker/HANDOFF.md，
然后告诉我当前状态，并继续处理用户指定任务。
```

常用本地命令:

```bash
cd /Users/zyx/Desktop/WorkToDo/ad-standards-tracker
pnpm dev --port 3003
pnpm validate:data
URL_CHECK_TIMEOUT_MS=12000 pnpm check:urls
pnpm build
```
