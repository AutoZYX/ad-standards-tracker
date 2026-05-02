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
    slug: "l2-combined-driving-assistance",
    title_en: "L2 Combined Driving Assistance and ADAS Misuse Control",
    title_cn: "L2 组合驾驶辅助与误用控制",
    desc_en:
      "Mandatory GB drafts, NCAP protocols, and crash-reporting rules that shape L2/NOA product safety baselines.",
    desc_cn:
      "把 L2/NOA 产品安全基线相关的强制国标草案、NCAP 测评规程和事故报告规则放在一起看。",
    decision_en:
      "Use this map for DMS, HMI, misuse prevention, ODD communication, L2 incident reporting, and product release gates.",
    decision_cn:
      "适用于 DMS、人机交互、误用防护、ODD 告知、L2 事故报告和产品放行门槛分析。",
    record_ids: [
      "STD-MIIT-2026-001",
      "STD-CATARC-2026-001",
      "STD-ENCAP-2026-001",
      "STD-NHTSA-2025-003",
      "STD-NHTSA-2021-001",
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
      "STD-ISO-2025-001",
      "STD-ASAM-2006-001",
      "STD-ASAM-2019-001",
      "STD-ASAM-2026-001",
      "STD-ASAM-2026-002",
      "INT-UNECE-2024-001",
      "INT-JAMA-2025-001",
    ],
  },
  {
    slug: "safety-case-best-practice",
    title_en: "SOTIF, Safety Case, and Behavioral Safety Models",
    title_cn: "SOTIF、安全案例与行为安全模型",
    desc_en:
      "Core standards and best practices for arguing that an ADS is acceptably safe despite functional insufficiencies and foreseeable misuse.",
    desc_cn:
      "围绕功能不足、可预见误用和 ADS 可接受安全论证的核心标准与最佳实践。",
    decision_en:
      "Use this map for SOTIF process design, safety case structure, behavioral model assumptions, and validation argumentation.",
    decision_cn:
      "适用于 SOTIF 流程设计、安全案例结构、行为模型假设和验证论证。",
    record_ids: [
      "STD-ISO-2018-001",
      "STD-ISO-2022-003",
      "STD-UL-2023-001",
      "STD-IEEE-2022-001",
      "STD-IEEE-2025-001",
      "INT-JAMA-2025-001",
      "INT-UNECE-2024-001",
    ],
  },
  {
    slug: "teleoperation-and-remote-assistance",
    title_en: "Teleoperation and Remote Assistance",
    title_cn: "远程操控与远程协助",
    desc_en:
      "Records that matter to remote assistance, remote operation concepts, operational control, and ROAM-style event analysis.",
    desc_cn:
      "聚焦远程协助、远程操作概念、运营控制和 ROAM 式事件分析相关记录。",
    decision_en:
      "Use this map to separate remote assistance, remote driving, operational fallback, incident reporting, and ADS operator obligations.",
    decision_cn:
      "适用于区分远程协助、远程驾驶、运营降级、事故报告和 ADS 运营方义务。",
    record_ids: [
      "STD-SAE-2022-003",
      "STD-SAE-2023-001",
      "STD-UK-2024-001",
      "INT-UK-2025-001",
      "STD-NHTSA-2025-003",
      "STD-KMOLIT-2025-002",
    ],
  },
];
