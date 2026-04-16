import type { SourceInfo } from "./types";

export const SOURCES: SourceInfo[] = [
  // === International ===
  {
    id: "unece-grva",
    name_en: "UNECE WP.29 / GRVA",
    name_cn: "联合国 WP.29 自动/网联车工作组",
    short: "UNECE",
    url: "https://unece.org/transport/road-transport/working-party-automatedautonomous-and-connected-vehicles-introduction",
    jurisdiction: "international",
    language: "EN",
    description_en:
      "Working Party on Automated/Autonomous and Connected Vehicles under UNECE WP.29. Drafts UN Regulations (UN-R155/156/157 etc.) for type approval harmonization across 63 contracting parties.",
    description_cn:
      "联合国欧经会汽车法规协调论坛 WP.29 下属自动/网联车工作组。起草 UN-R155/156/157 等联合国法规，在 63 个缔约方之间协调型式认证要求。",
    crawl_difficulty: "medium",
  },
  {
    id: "iso-tc22-sc33",
    name_en: "ISO TC22 / SC33",
    name_cn: "ISO 道路车辆技术委员会",
    short: "ISO",
    url: "https://www.iso.org/committee/46706.html",
    jurisdiction: "international",
    language: "EN",
    description_en:
      "ISO Technical Committee 22 Subcommittee 33 — Vehicle Dynamics and Chassis Components. Publishes ISO 21448 (SOTIF), ISO 26262 (functional safety), ISO 34502 (scenario-based safety).",
    description_cn:
      "ISO 道路车辆技术委员会 TC22 的 SC33 分委会。发布 ISO 21448（SOTIF 预期功能安全）、ISO 26262（功能安全）、ISO 34502（基于场景的安全保证）等标准。",
    crawl_difficulty: "hard",
  },
  {
    id: "iso-sae-21434",
    name_en: "ISO/SAE 21434",
    name_cn: "ISO/SAE 21434 联合标准",
    short: "ISO/SAE",
    url: "https://www.iso.org/standard/70918.html",
    jurisdiction: "international",
    language: "EN",
    description_en:
      "Joint ISO/SAE standard for Road vehicles — Cybersecurity engineering. Defines process-based cybersecurity risk management throughout the vehicle lifecycle.",
    description_cn:
      "ISO 与 SAE 联合发布的道路车辆网络安全工程标准，规定贯穿车辆全生命周期的过程化网络安全风险管理要求。",
    crawl_difficulty: "medium",
  },

  // === China ===
  {
    id: "sac",
    name_en: "Standardization Administration of China (SAC)",
    name_cn: "国家标准化管理委员会",
    short: "SAC",
    url: "https://www.sac.gov.cn/",
    jurisdiction: "china",
    language: "CN",
    description_en:
      "China's national standards authority. Publishes GB and GB/T national standards and approves implementation dates.",
    description_cn:
      "中国国家标准化主管部门，发布 GB 强制性国家标准和 GB/T 推荐性国家标准，审批实施日期。",
    crawl_difficulty: "easy",
  },
  {
    id: "sac-tc114",
    name_en: "SAC/TC114 National Technical Committee of Auto Standardization",
    name_cn: "全国汽车标准化技术委员会",
    short: "TC114",
    url: "http://www.catarc.org.cn/",
    jurisdiction: "china",
    language: "CN",
    description_en:
      "National Technical Committee on Auto Standardization, responsible for drafting and managing all automotive national standards in China.",
    description_cn:
      "负责起草和管理中国所有汽车相关国家标准的全国性技术委员会，秘书处设在中汽中心。",
    crawl_difficulty: "medium",
  },
  {
    id: "sac-tc114-sc34",
    name_en: "SAC/TC114/SC34 ICV Subcommittee",
    name_cn: "全国汽标委智能网联汽车分技术委员会",
    short: "SC34",
    url: "http://www.catarc.org.cn/",
    jurisdiction: "china",
    language: "CN",
    description_en:
      "Intelligent Connected Vehicle subcommittee under SAC/TC114. Leading body for ADS/ICV national standards, including the 2026 Safety Events Data Interaction draft.",
    description_cn:
      "全国汽标委下属智能网联汽车分技术委员会，主导自动驾驶与智能网联汽车国标起草，含 2026 年《安全事件数据交互与管理系统技术规范》草案。",
    crawl_difficulty: "medium",
  },
  {
    id: "miit",
    name_en: "MIIT Equipment Industry Dept. I",
    name_cn: "工信部装备工业一司",
    short: "MIIT",
    url: "https://www.miit.gov.cn/",
    jurisdiction: "china",
    language: "CN",
    description_en:
      "Ministry of Industry and Information Technology, Equipment Industry Department I. Primary regulator for automotive industry policy and ICV market access.",
    description_cn:
      "工业和信息化部装备工业一司，负责汽车产业政策制定和智能网联汽车市场准入监管。",
    crawl_difficulty: "easy",
  },
  {
    id: "samr",
    name_en: "SAMR Standards Technical Management",
    name_cn: "国家市场监督管理总局标准技术管理司",
    short: "SAMR",
    url: "https://www.samr.gov.cn/",
    jurisdiction: "china",
    language: "CN",
    description_en:
      "State Administration for Market Regulation, Standards Management Department. Approves and issues GB national standards.",
    description_cn:
      "国家市场监督管理总局标准技术管理司，负责 GB 国家标准的批准发布。",
    crawl_difficulty: "easy",
  },
  {
    id: "mot",
    name_en: "Ministry of Transport",
    name_cn: "交通运输部",
    short: "MoT",
    url: "https://www.mot.gov.cn/",
    jurisdiction: "china",
    language: "CN",
    description_en:
      "Ministry of Transport. Regulates Robotaxi commercial operations, autonomous bus/truck pilots, and road transport licensing.",
    description_cn:
      "交通运输部，监管 Robotaxi 商业运营、自动驾驶客车与卡车试点、道路运输许可。",
    crawl_difficulty: "easy",
  },
  {
    id: "catarc",
    name_en: "CATARC China Automotive Technology and Research Center",
    name_cn: "中国汽车技术研究中心",
    short: "CATARC",
    url: "https://www.catarc.com/",
    jurisdiction: "china",
    language: "CN",
    description_en:
      "State-owned automotive R&D institute. Leads China's automotive standardization, type approval testing, and C-NCAP consumer safety assessment.",
    description_cn:
      "中央直属汽车行业研发与测试机构。主导中国汽车标准化、型式认证测试、C-NCAP 消费者安全测评。",
    crawl_difficulty: "medium",
  },
  {
    id: "caeri",
    name_en: "CAERI China Automotive Engineering Research Institute",
    name_cn: "中国汽车工程研究院",
    short: "CAERI",
    url: "https://www.caeri.com.cn/",
    jurisdiction: "china",
    language: "CN",
    description_en:
      "Chongqing-based automotive engineering research institute. Specializes in ADAS/ADS testing, i-VISTA ICV assessment system, and scenario-based evaluation.",
    description_cn:
      "中国汽研，位于重庆。专长于 ADAS/ADS 测试、i-VISTA 智能网联汽车测评体系、场景化评估。",
    crawl_difficulty: "medium",
  },
  {
    id: "cmc",
    name_en: "CMC Merchants Automobile Research",
    name_cn: "招商车研",
    short: "CMC",
    url: "https://www.cmcresearch.com/",
    jurisdiction: "china",
    language: "CN",
    description_en:
      "Automotive testing and assessment organization. Provides third-party ICV evaluation, particularly around L2+ consumer assessment.",
    description_cn:
      "第三方汽车检测与评估机构，提供智能网联汽车评估服务，尤其在 L2+ 消费者评价方面。",
    crawl_difficulty: "hard",
  },
  {
    id: "beijing-hadzone",
    name_en: "Beijing High-Level AD Demonstration Zone",
    name_cn: "北京市高级别自动驾驶示范区",
    short: "Beijing-HAD",
    url: "https://www.bjcapedz.cn/",
    jurisdiction: "china",
    language: "CN",
    description_en:
      "Beijing Yizhuang high-level autonomous driving demonstration zone. Issues Robotaxi operating permits and supports commercial pilot programs for Baidu Apollo, Pony.ai, and others.",
    description_cn:
      "北京亦庄高级别自动驾驶示范区，发放 Robotaxi 运营许可，支持百度 Apollo、小马智行等企业的商业化试点。",
    crawl_difficulty: "medium",
  },
  {
    id: "shanghai-icv",
    name_en: "Shanghai ICV Demonstration Zone",
    name_cn: "上海市智能网联汽车示范区（临港/嘉定）",
    short: "Shanghai-ICV",
    url: "https://www.shcaeri.com/",
    jurisdiction: "china",
    language: "CN",
    description_en:
      "Shanghai's dual-site ICV demonstration zones in Lingang New Area and Jiading. Supports L3/L4 testing and operation for SAIC, NIO, IM Motors, and AutoX.",
    description_cn:
      "上海临港与嘉定双基地智能网联汽车示范区，支持上汽、蔚来、智己、AutoX 等企业的 L3/L4 测试与运营。",
    crawl_difficulty: "medium",
  },
  {
    id: "shenzhen-icv",
    name_en: "Shenzhen ICV Regulation",
    name_cn: "深圳市智能网联汽车管理条例",
    short: "SZ-ICV",
    url: "http://www.szrd.gov.cn/",
    jurisdiction: "china",
    language: "CN",
    description_en:
      "China's first local regulation (effective Aug 2022) explicitly permitting fully driverless L3/L4 operation in designated zones and clarifying liability for collisions.",
    description_cn:
      "中国首个允许全无人 L3/L4 在指定区域运营的地方性法规（2022 年 8 月施行），明确事故责任划分。",
    crawl_difficulty: "medium",
  },

  // === US ===
  {
    id: "nhtsa",
    name_en: "NHTSA",
    name_cn: "美国国家公路交通安全管理局",
    short: "NHTSA",
    url: "https://www.nhtsa.gov/",
    jurisdiction: "us",
    language: "EN",
    description_en:
      "National Highway Traffic Safety Administration. Publishes FMVSS regulations, Standing General Order on crash reporting, ADS policy guidance, and enforces recalls.",
    description_cn:
      "美国联邦汽车安全监管机构，发布 FMVSS 法规、SGO 碰撞强制报告令、ADS 政策指南，执行召回。",
    crawl_difficulty: "easy",
  },
  {
    id: "ca-dmv",
    name_en: "California DMV Autonomous Vehicles",
    name_cn: "加州车管局自动驾驶部门",
    short: "CA-DMV",
    url: "https://www.dmv.ca.gov/portal/vehicle-industry-services/autonomous-vehicles/",
    jurisdiction: "us",
    language: "EN",
    description_en:
      "California DMV's autonomous vehicle program. Issues testing and deployment permits, publishes annual disengagement reports and all AV crash reports (OL 316).",
    description_cn:
      "加州车管局自动驾驶项目，发放测试与部署许可，公布年度脱离报告和所有 AV 碰撞报告（OL 316 表单）。",
    crawl_difficulty: "easy",
  },
  {
    id: "sae",
    name_en: "SAE International",
    name_cn: "SAE 国际（美国汽车工程师学会）",
    short: "SAE",
    url: "https://www.sae.org/standards/",
    jurisdiction: "us",
    language: "EN",
    description_en:
      "Publishes J3016 (driving automation levels), J3018, J3131 (ADS architecture), J3164, J3206 (safety principles), J3237 (operational safety metrics), J3247.",
    description_cn:
      "发布 J3016（驾驶自动化分级）、J3018、J3131（ADS 参考架构）、J3164、J3206（安全原则）、J3237（运行安全指标）、J3247 等。",
    crawl_difficulty: "medium",
  },
  {
    id: "ul",
    name_en: "UL Standards & Engagement",
    name_cn: "UL 标准及参与组织",
    short: "UL",
    url: "https://ulse.org/focus-areas/travel-safety/autonomous-vehicles/",
    jurisdiction: "us",
    language: "EN",
    description_en:
      "Publishes UL 4600 — Standard for Safety for the Evaluation of Autonomous Products. Edition 3 (2023) adds autonomous trucking coverage.",
    description_cn:
      "发布 UL 4600《自动驾驶产品安全评估标准》，第三版（2023）增加自动驾驶卡车相关内容。",
    crawl_difficulty: "easy",
  },
  {
    id: "ieee-sa",
    name_en: "IEEE Standards Association",
    name_cn: "IEEE 标准协会",
    short: "IEEE",
    url: "https://standards.ieee.org/",
    jurisdiction: "us",
    language: "EN",
    description_en:
      "Publishes IEEE 2846 (Assumptions for models in safety-related automated vehicle behavior), and develops IEEE 2848, P3128 for V&V and teleoperation.",
    description_cn:
      "发布 IEEE 2846（自动驾驶安全相关模型假设），开发中的 IEEE 2848、P3128 覆盖 V&V 与遥控操作。",
    crawl_difficulty: "medium",
  },

  // === EU ===
  {
    id: "eu-commission",
    name_en: "European Commission DG GROW / DG MOVE",
    name_cn: "欧盟委员会工商业与交通总司",
    short: "EC",
    url: "https://transport.ec.europa.eu/",
    jurisdiction: "eu",
    language: "EN",
    description_en:
      "Europe's regulatory body publishing Type Approval regulations (2019/2144, 2022/1426 for ADS) and the horizontal AI Act impacting automotive AI components.",
    description_cn:
      "欧盟监管机构，发布整车型式认证法规（2019/2144、2022/1426 针对 ADS）以及影响汽车 AI 组件的 AI Act 横向法规。",
    crawl_difficulty: "medium",
  },
  {
    id: "euro-ncap",
    name_en: "Euro NCAP",
    name_cn: "欧洲新车安全评鉴协会",
    short: "Euro NCAP",
    url: "https://www.euroncap.com/",
    jurisdiction: "eu",
    language: "EN",
    description_en:
      "European new car assessment program. Consumer-facing safety assessment with significant market influence. Published Assisted Driving Test protocol and 2026 roadmap including AD assessment.",
    description_cn:
      "欧洲新车消费者安全评估项目，市场影响力巨大。发布辅助驾驶测评方案及包含 AD 测评的 2026 路线图。",
    crawl_difficulty: "easy",
  },
  {
    id: "uk-ccav",
    name_en: "UK CCAV Centre for Connected and Autonomous Vehicles",
    name_cn: "英国互联与自动驾驶汽车中心",
    short: "CCAV",
    url: "https://www.gov.uk/government/organisations/centre-for-connected-and-autonomous-vehicles",
    jurisdiction: "uk",
    language: "EN",
    description_en:
      "UK government cross-departmental unit. Led the UK Automated Vehicles Act 2024, which creates liability framework for self-driving vehicles and Authorised Self-Driving Entity (ASDE).",
    description_cn:
      "英国政府跨部门机构，主导 2024 年《自动驾驶汽车法案》的立法，确立自动驾驶责任框架和 ASDE 授权实体制度。",
    crawl_difficulty: "easy",
  },

  // === Japan ===
  {
    id: "meti-jp",
    name_en: "METI Japan",
    name_cn: "日本经济产业省",
    short: "METI",
    url: "https://www.meti.go.jp/english/",
    jurisdiction: "japan",
    language: "EN/JP",
    description_en:
      "Ministry of Economy, Trade and Industry. Co-leads the RoAD to L4 project and publishes annual Mobility Roadmap (2024, 2025) outlining Japan's AD commercialization strategy.",
    description_cn:
      "日本经济产业省，与国土交通省联合推进 RoAD to L4 项目，发布年度《交通出行路线图》（2024、2025）规划日本自动驾驶商业化战略。",
    crawl_difficulty: "medium",
  },
  {
    id: "mlit-jp",
    name_en: "MLIT Japan",
    name_cn: "日本国土交通省",
    short: "MLIT",
    url: "https://www.mlit.go.jp/en/",
    jurisdiction: "japan",
    language: "EN/JP",
    description_en:
      "Ministry of Land, Infrastructure, Transport and Tourism. Regulates type approval and issued the June 2024 safety assurance guidelines for Level 4 passenger/goods services.",
    description_cn:
      "日本国土交通省，负责型式认证，于 2024 年 6 月发布针对 Level 4 载人/载货服务的安全保证指南。",
    crawl_difficulty: "medium",
  },
];

export const SOURCE_BY_ID: Record<string, SourceInfo> = Object.fromEntries(
  SOURCES.map((s) => [s.id, s])
);
