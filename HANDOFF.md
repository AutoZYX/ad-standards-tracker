# AD Standards Tracker — 技术交接

最后更新: 2026-05-04
状态: 已上线，已完成全库可信度字段补齐、URL 健康治理、数据准确性审计，并开始把标准详情页升级为带工程 know-how 的安全知识库
仓库: https://github.com/AutoZYX-Labs/ad-standards-tracker
生产站: https://standards.autozyx.com
本地路径: /Users/zyx/Desktop/WorkToDo/ad-standards-tracker/

## 当前生产状态

- 最新应用提交: abe0ce1 Enrich type approval and assessment protocol records
- 最新生产部署: dpl_4CtGZVwHQAcjTHH9L41xGpgniCEt
- Vercel 临时地址: https://ad-standards-tracker-gvhzcajvk-auto-zyx.vercel.app
- 正式域名: https://standards.autozyx.com
- 本地生产构建: 通过，Next.js 生成 105 个页面
- 线上冒烟: 首页显示 36/93 专业解读进度；EU 2022/1426、Euro NCAP 2026-2028、JNCAP 官方动态详情页均出现新知识字段；`/standards/STD-SAC-2025-001` 返回 404；正式域名已 alias 到新部署
- Ask API: 已切换到 DeepSeek V4 Pro；DeepSeek 不可用时自动降级到本地数据库检索，并返回服务端 citation；服务端会清洗模型输出中的 `**`

## 数据状态

- 总记录数: 93
- 唯一 ID: 93
- trust 字段完整度: 93/93
- evidence_level 分布: A 56，B 35，C 2，D 0
- source_status 分布: verified 54，paywalled 18，blocked 21，broken 0，unverified 0
- legal_force 分布: guidance 16，voluntary 27，binding 26，rating_protocol 5，informational 13，best_practice 6
- 已扩充 know-how 字段记录: 36/93
- URL 检查: `URL_CHECK_TIMEOUT_MS=12000 pnpm check:urls` 通过 93 条；被政府站或平台反爬挡住但人工核验过的链接按 `blocked` 跳过

## 2026-05-04 已完成

- 将 `StandardRecord` 增加可选知识字段：`scope_en/cn`、`exclusions_en/cn`、`engineering_use_en/cn`、`expert_note_en/cn`。
- 详情页新增“覆盖范围 / 标准边界”“不覆盖内容 / 注意边界”“工程使用方式”“专家判断”四个栏目。
- Ask AD Standards 的系统上下文和本地兜底检索已读取上述知识字段，回答不再只依赖摘要和 impact_note。
- README、DATA_SCHEMA、关于页已写入新的三层知识机制：证据层、边界层、工程层。
- 先扩充 14 条高优先级记录：ISO 26262、ISO 21448、ISO 34502、ISO/PAS 8800、ISO 22133、ISO/DIS 25135、SAE J3016、IEEE 2846、IEEE 3321、UN-R157、UL 4600 第三版、C-NCAP 2027、MIIT L2 组合驾驶辅助报批稿、MIIT ADS 安全要求征求意见稿。
- 修正 ISO 34502 日期和目录位置：官方 ISO 目录显示发布日期为 2022-11-02，记录已从 `standards/international/2023/` 移至 `standards/international/2022/`。
- 修正 UL 4600 当前主记录：第三版官方商品页标题为 `UL 4600 Edition 3 — Standard for Evaluation of Autonomous Products`，记录已改用官方商品页并标注 2023-03-17 发布及 ANSI approved；2020 第一版记录标为被 `STD-UL-2023-001` 替代。
- `tools/validate-data.mjs` 增加知识字段类型校验，避免 YAML 冒号等格式问题把列表项解析成对象。
- 本地验证通过：`pnpm validate:data`、`pnpm lint`、`pnpm build`、12 条重点 URL 定向检查。
- 生产部署完成：`dpl_AHbtgKgpvGunVBPXeFm3qHTFVVrm`，已 alias 到 https://standards.autozyx.com。
- 第二批扩充 14 条高影响记录：ISO/SAE 21434、UN-R155、UN-R156、ISO 24089、GB 39732、GB/T 44373、GB 44497、ISO 34503、ISO 34504、ISO 34505、ASAM OpenDRIVE、ASAM OSI、ASAM OpenSCENARIO DSL、ASAM OpenSCENARIO XML。
- 首页 Data Health 新增“专业解读已扩充 / Knowledge fields enriched”指标，当前为 28/93，用来公开暴露知识库深度，而不是只展示记录数量。
- 修正 ISO 24089 官方发布日期为 2023-02-08；修正 ISO 34503、ISO 34504、ISO 34505 的官方标题、发布日期和 source_note。
- 场景测试工具链条目已补充 ASAM 静态道路、运行接口、逻辑场景、具体场景四层边界说明；网络安全、软件更新、数据记录相关条目已补充工程证据链解释。
- 第二批本地验证通过：`pnpm validate:data`、`pnpm lint`、`pnpm build`、14 条重点 URL 定向检查。
- 第二批生产部署完成：`dpl_7GPpp8AXbGRNLL4DDNCbZ9mMi65Z`，已 alias 到 https://standards.autozyx.com。
- 第三批扩充 8 条高影响记录：EU 2022/1426、EU 2026/481、UK Automated Vehicles Act 2024、FMVSS 127、NHTSA 第三次修订 SGO 2021-01、Euro NCAP 2026-2028 protocols、C-ICAP 1.1、JNCAP FY2025 官方动态。
- 将 JNCAP FY2025 记录从“测评规程/标准”边界改为 official update/informational，明确不能当作完整 JNCAP 技术规程引用。
- 修正 Euro NCAP 2026 记录，改为官方 2026-2028 protocols 页面和更准确的“安全驾驶、驾驶员参与、车辆辅助”测评框架，不再使用未经证实的 DMS 权重/接管细节描述。
- 核实 C-ICAP 页面标题为 `C-ICAP(1.1版)管理规则`，并补充附录 A/B/C 的工程边界。
- 全量 URL 检查重新通过：`URL_CHECK_TIMEOUT_MS=12000 pnpm check:urls` 返回 93 URLs passed；IEEE 2846、IEEE 3321、NHTSA SGO PDF 的自动化受阻状态已改为 `blocked`，避免把反爬/Cloudflare/Akamai 误判成坏链。
- 第三批生产部署完成：`dpl_4CtGZVwHQAcjTHH9L41xGpgniCEt`，已 alias 到 https://standards.autozyx.com。

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
- 新增 `STD-ISO-2024-003`，按 ISO 官方目录记录为 ISO/PAS 8800:2024，而不是 ISO/SAE 8800。
- 重整 `/maps` 专题地图：将首个专题改为 L2 及以下驾驶辅助与误用控制；把安全开发系列标准从安全论证/行为模型中拆出；把远程协助与远程操作边界从 L4 运营安全与事件治理中拆出。
- `pnpm validate:data` 现在会校验 `lib/evidence-map.ts` 中引用的记录 ID，避免专题地图出现悬空记录。
- 完成数据准确性止血审计，删除 19 条无法用原始链接或可靠来源证明的记录，详见 `audits/2026-05-03-data-accuracy-audit.md`。
- 删除用户指出的 `STD-SAC-2025-001` 远程操作征求意见稿记录；该记录原 URL 只是 CATARC 首页，具体技术指标没有证据支撑。
- 修正 MIIT 2023/2024/2025 记录链接，改用工信部原始页面；修正 GB 39732-2020、GB 44497-2024 的 `legal_force` 为 binding。
- 校验规则升级：A/B 证据记录不能使用官网首页、栏目首页或泛化咨询页；强制 GB 不能标为 voluntary。

## 验证命令

```bash
pnpm validate:data
pnpm lint
URL_CHECK_TIMEOUT_MS=12000 pnpm check:urls
pnpm build
```

当前结果:

- `pnpm validate:data`: 通过，93 records，93 unique ids
- `pnpm lint`: 通过
- `pnpm check:urls`: 通过，93 URLs
- `pnpm build`: 通过，105 pages

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
