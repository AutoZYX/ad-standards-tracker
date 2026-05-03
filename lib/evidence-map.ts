export interface EvidenceMap {
  slug: string;
  title_en: string;
  title_cn: string;
  desc_en: string;
  desc_cn: string;
  decision_en: string;
  decision_cn: string;
  record_ids: string[];
}

export const EVIDENCE_MAPS: EvidenceMap[] = [
  {
    slug: "l2-and-below-driver-assistance",
    title_en: "L2-and-Below Driver Assistance and Misuse Control",
    title_cn: "L2 及以下驾驶辅助与误用控制",
    desc_en:
      "Mandatory GB drafts, assisted-driving NCAP protocols, consumer assessment rules, and crash-reporting orders that shape ADAS/L2 safety baselines.",
    desc_cn:
      "把 ADAS、L2/NOA、主动安全 NCAP 测评规程和事故报告规则放在一起看，避免把所有 NCAP 都硬归入 L2。",
    decision_en:
      "Use this map for DMS, HMI, misuse prevention, ODD communication, assisted-driving assessment, and product release gates.",
    decision_cn:
      "适用于 DMS、人机交互、误用防护、ODD 告知、辅助驾驶测评和产品放行门槛分析。",
    record_ids: [
      "STD-SAE-2022-001",
      "STD-SAC-2024-001",
      "STD-MIIT-2026-001",
      "STD-CATARC-2026-001",
      "STD-ENCAP-2026-001",
      "STD-NCAP-2023-001",
      "STD-JNCAP-2026-001",
      "INT-KNCAP-2026-001",
      "STD-CICAP-2025-001",
      "STD-CAERI-2025-001",
      "STD-CAERI-2024-001",
      "STD-NHTSA-2025-003",
    ],
  },
  {
    slug: "ads-type-approval",
    title_en: "ADS Type Approval and In-Use Regulation",
    title_cn: "ADS 准入认证与在用监管",
    desc_en:
      "UN, EU, UK, Germany, China, and Korea regulatory paths for L3/L4 ADS authorization, operation, monitoring, and compliance.",
    desc_cn:
      "梳理 UN、欧盟、英国、德国、中国和韩国面向 L3/L4 ADS 的准入、运营、监测与合规路径。",
    decision_en:
      "Use this map when comparing market-entry obligations, authorization timing, safety-management systems, and post-deployment duties.",
    decision_cn:
      "适用于比较不同市场的准入义务、授权节奏、安全管理体系和部署后监管责任。",
    record_ids: [
      "STD-UNECE-2022-001",
      "STD-UNECE-2026-001",
      "STD-EC-2022-001",
      "STD-EC-2026-001",
      "STD-UK-2024-001",
      "INT-UK-2025-002",
      "STD-DE-2022-001",
      "STD-KMOLIT-2025-002",
      "STD-MIIT-2026-002",
    ],
  },
  {
    slug: "scenario-based-testing",
    title_en: "Scenario-Based Testing Toolchain",
    title_cn: "场景驱动测试工具链",
    desc_en:
      "ISO scenario taxonomy, ASAM scenario formats, NCAP scenarios, and UNECE NATM-style validation evidence.",
    desc_cn:
      "串联 ISO 场景分类、ASAM 场景格式、NCAP 场景和 UNECE NATM 风格验证证据。",
    decision_en:
      "Use this map to design ODD decomposition, logical/concrete scenarios, simulation interfaces, and coverage evidence.",
    decision_cn:
      "适用于设计 ODD 分解、逻辑/具体场景、仿真接口和场景覆盖证据。",
    record_ids: [
      "STD-ISO-2023-001",
      "STD-ISO-2023-003",
      "STD-ISO-2024-002",
      "STD-ISO-2025-001",
      "STD-ISO-2026-001",
      "STD-ASAM-2006-001",
      "STD-ASAM-2019-001",
      "STD-ASAM-2026-001",
      "STD-ASAM-2026-002",
      "INT-UNECE-2024-001",
      "INT-JAMA-2025-001",
    ],
  },
  {
    slug: "safety-development-standards",
    title_en: "Safety Development Series Standards",
    title_cn: "安全开发系列标准",
    desc_en:
      "Numbered standards for functional safety, SOTIF, AI safety, scenario-based evaluation, ODD taxonomy, and ADS test execution.",
    desc_cn:
      "以 ISO 26262、ISO 21448、ISO/PAS 8800 和 ISO 3450x 系列为主线，整理安全开发与测试验证的核心编号标准。",
    decision_en:
      "Use this map to structure the safety lifecycle, AI-safety work products, SOTIF analysis, ODD definition, and scenario-test evidence.",
    decision_cn:
      "适用于搭建安全生命周期、AI 安全工作产品、SOTIF 分析、ODD 定义和场景测试证据链。",
    record_ids: [
      "STD-ISO-2018-001",
      "STD-ISO-2022-003",
      "STD-ISO-2024-003",
      "STD-ISO-2023-001",
      "STD-ISO-2023-003",
      "STD-ISO-2024-002",
      "STD-ISO-2025-001",
      "STD-ISO-2026-001",
      "STD-SAE-2023-001",
    ],
  },
  {
    slug: "safety-case-and-behavior-models",
    title_en: "Safety Case, Behavioral Safety Models, and Validation Evidence",
    title_cn: "安全论证、行为安全模型与验证证据",
    desc_en:
      "Goal-based safety case standards, behavior-assumption standards, and official validation guidance used to argue that an ADS is acceptably safe.",
    desc_cn:
      "把目标导向安全案例、道路使用者行为假设模型和官方验证方法建议分开呈现，不再与安全开发流程标准混在一起。",
    decision_en:
      "Use this map when building a safety case, defining behavioral assumptions, choosing validation metrics, or explaining residual risk.",
    decision_cn:
      "适用于构建安全案例、定义行为假设、选择验证指标和解释剩余风险。",
    record_ids: [
      "STD-UL-2023-001",
      "STD-IEEE-2022-001",
      "STD-IEEE-2025-001",
      "STD-SAE-2025-001",
      "INT-JAMA-2025-001",
      "INT-UNECE-2024-001",
    ],
  },
  {
    slug: "remote-assistance-and-operation-boundary",
    title_en: "Remote Assistance and Remote Operation Boundary",
    title_cn: "远程协助与远程操作边界",
    desc_en:
      "Definitions, draft technical requirements, and connectivity guidance that distinguish remote assistance, remote operation, and remote supervision.",
    desc_cn:
      "聚焦远程协助、远程操作、远程监督的术语边界和技术要求，不再混入一般运营监管记录。",
    decision_en:
      "Use this map to decide whether a use case is remote guidance, remote driving, operational supervision, or connectivity support.",
    decision_cn:
      "适用于区分远程指导、远程驾驶、运营监督和通信支撑，尤其适合 ROAM 类事件分析。",
    record_ids: [
      "STD-SAE-2022-003",
      "STD-SAC-2024-001",
      "STD-SAC-2025-001",
      "STD-UNECE-2024-001",
      "STD-5GAA-2020-001",
    ],
  },
  {
    slug: "l4-operational-safety-and-incident-governance",
    title_en: "L4 Operational Safety and Incident Governance",
    title_cn: "L4 运营安全与事件治理",
    desc_en:
      "Operational permits, remote-supervision duties, disengagement reporting, incident reporting, and post-deployment safety controls for driverless services.",
    desc_cn:
      "面向无人化服务的运营许可、远程监督责任、脱离报告、事故报告和部署后安全治理。",
    decision_en:
      "Use this map for Robotaxi operations, post-incident governance, safety-driver removal, reporting duties, and operator responsibility models.",
    decision_cn:
      "适用于 Robotaxi 运营、事故后治理、去安全员、报告义务和运营方责任模型分析。",
    record_ids: [
      "STD-DE-2021-001",
      "STD-DE-2022-001",
      "STD-NPA-2022-001",
      "STD-UK-2024-001",
      "INT-UK-2025-001",
      "STD-KMOLIT-2025-001",
      "STD-KMOLIT-2025-002",
      "STD-CA-DMV-2025-001",
      "STD-CA-DMV-2026-002",
      "STD-BJHAD-2022-001",
      "STD-MOT-2025-001",
      "STD-NHTSA-2025-003",
    ],
  },
];
