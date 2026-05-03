import type { SourceInfo, SourceCategory } from "./types";

export const SOURCES: SourceInfo[] = [
  // ===================================================================
  // 国家/国际标准制定组织 / National & International SDOs
  // ===================================================================
  {
    id: "unece-grva",
    name_en: "UNECE WP.29 / GRVA",
    name_cn: "联合国 WP.29 自动/网联车工作组",
    short: "UNECE",
    url: "https://unece.org/transport/vehicle-regulations/wp29/introduction",
    jurisdiction: "international",
    category: "sdo",
    language: "EN",
    description_en:
      "Working Party on Automated/Autonomous and Connected Vehicles under UNECE WP.29. Drafts UN Regulations (UN-R155/156/157/160 etc.) for type approval harmonization across 63 contracting parties.",
    description_cn:
      "联合国欧经会汽车法规协调论坛 WP.29 下属自动/网联车工作组（GRVA）。起草 UN-R155/156/157/160 等联合国法规，在 63 个缔约方之间协调型式认证要求。",
    crawl_difficulty: "medium",
  },
  {
    id: "iso-tc22-sc33",
    name_en: "ISO TC22 / SC33",
    name_cn: "ISO 道路车辆技术委员会",
    short: "ISO",
    url: "https://www.iso.org/committee/5383568.html",
    jurisdiction: "international",
    category: "sdo",
    language: "EN",
    description_en:
      "ISO Technical Committee 22 — Road Vehicles. Includes SC33 (Vehicle Dynamics), SC32 (Electrical and Electronic Components). Publishes ISO 26262 (FuSa), ISO 21448 (SOTIF), ISO 34502/34503/34504 (scenario testing), ISO 24089 (software update).",
    description_cn:
      "ISO 道路车辆技术委员会 TC22，含 SC33（车辆动力学）和 SC32（电气电子组件）。发布 ISO 26262（功能安全）、ISO 21448（SOTIF）、ISO 34502/34503/34504（场景测试）、ISO 24089（软件更新）。",
    crawl_difficulty: "hard",
  },
  {
    id: "cen-cenelec",
    name_en: "CEN-CENELEC",
    name_cn: "欧洲标准化委员会 / 欧洲电工标准化委员会",
    short: "CEN-CENELEC",
    url: "https://www.cencenelec.eu/",
    jurisdiction: "eu",
    category: "sdo",
    language: "EN/FR/DE",
    description_en:
      "European standards organizations recognized by the EU. Relevant for harmonized standards and European positions that interact with vehicle type approval, cybersecurity, AI, connectivity, and intelligent transport systems.",
    description_cn:
      "欧盟认可的欧洲标准化组织。与协调标准、欧洲型式认证、网络安全、AI、车联网和智能交通系统标准体系相关。",
    crawl_difficulty: "medium",
  },
  {
    id: "sac-tc114",
    name_en: "SAC/TC114 National Technical Committee of Auto Standardization",
    name_cn: "全国汽车标准化技术委员会（汽标委）",
    short: "SAC/TC114",
    url: "http://www.catarc.org.cn/",
    jurisdiction: "china",
    category: "sdo",
    language: "CN",
    description_en:
      "National Technical Committee on Auto Standardization (汽标委). Drafts and manages all automotive national standards (GB, GB/T) in China. Secretariat at CATARC. Includes SC34 ICV Subcommittee (智能网联汽车分委会).",
    description_cn:
      "全国汽车标准化技术委员会（汽标委），负责起草和管理中国所有汽车相关国家标准（GB、GB/T）。秘书处设在中汽中心。下辖 SC34 智能网联汽车分技术委员会（智能网联汽车分委会）。",
    crawl_difficulty: "medium",
  },
  {
    id: "samr",
    name_en: "SAMR Standards Technical Management",
    name_cn: "国家市场监督管理总局标准技术管理司",
    short: "SAMR",
    url: "https://std.samr.gov.cn/",
    jurisdiction: "china",
    category: "sdo",
    language: "CN",
    description_en:
      "State Administration for Market Regulation, Standards Management Department. Approves and issues GB national standards. Operates 全国标准信息公共服务平台 (std.samr.gov.cn) — the authoritative standard archive.",
    description_cn:
      "国家市场监督管理总局标准技术管理司。批准发布 GB 国家标准，运营全国标准信息公共服务平台（std.samr.gov.cn），权威标准档案。",
    crawl_difficulty: "easy",
  },
  {
    id: "ansi",
    name_en: "ANSI — American National Standards Institute",
    name_cn: "美国国家标准协会",
    short: "ANSI",
    url: "https://www.ansi.org/",
    jurisdiction: "us",
    category: "sdo",
    language: "EN",
    description_en:
      "US national standards coordinator and ANSI-accredited standards system gateway. Relevant for American National Standards and cross-SDO coordination, even though many AD-specific technical standards are developed by SAE, IEEE, UL, and other industry-led bodies.",
    description_cn:
      "美国国家标准体系协调机构和 ANSI 认可标准体系入口。自动驾驶具体技术标准多由 SAE、IEEE、UL 等行业组织制定，但 ANSI 是美国国家标准体系的重要源头。",
    crawl_difficulty: "medium",
  },
  {
    id: "bsi",
    name_en: "BSI — British Standards Institution",
    name_cn: "英国标准协会",
    short: "BSI",
    url: "https://www.bsigroup.com/en-GB/products-and-services/standards/",
    jurisdiction: "uk",
    category: "sdo",
    language: "EN",
    description_en:
      "UK national standards body. Publishes and maintains British Standards and PAS documents, including connected and automated mobility guidance that complements the UK's AV regulatory programme.",
    description_cn:
      "英国国家标准组织，发布英国标准和 PAS 文件。其互联与自动驾驶相关标准和指南是英国自动驾驶监管体系的重要补充。",
    crawl_difficulty: "medium",
  },
  {
    id: "kats-kr",
    name_en: "Korea Agency for Technology and Standards",
    name_cn: "韩国技术标准院",
    short: "KATS",
    url: "https://www.kats.go.kr/eng/",
    jurisdiction: "korea",
    category: "sdo",
    language: "EN",
    description_en:
      "Korea's national standards body. Adopts ISO/IEC standards as KS national standards (e.g., KS R ISO 21448 for SOTIF).",
    description_cn:
      "韩国国家标准主管机构。将 ISO/IEC 标准采纳为 KS 国家标准（如 KS R ISO 21448 SOTIF）。",
    crawl_difficulty: "medium",
  },
  {
    id: "jisc-jsae",
    name_en: "JISC / JSAE Automotive Standardization",
    name_cn: "日本工业标准调查会 / 日本汽车工程学会标准体系",
    short: "JISC/JSAE",
    url: "https://www.jisc.go.jp/eng/",
    jurisdiction: "japan",
    category: "sdo",
    language: "EN/JP",
    description_en:
      "Japan's national industrial standards system and automotive engineering society interface. Relevant for JIS/JASO automotive standards and Japan's technical input to ISO TC22 work.",
    description_cn:
      "日本国家工业标准体系与汽车工程学会标准接口。与 JIS/JASO 汽车标准，以及日本向 ISO TC22 输入的汽车技术标准立场相关。",
    crawl_difficulty: "medium",
  },
  {
    id: "jasic",
    name_en: "JASIC — Japan Automobile Standards Internationalization Center",
    name_cn: "日本汽车标准国际化中心",
    short: "JASIC",
    url: "https://www.jasic.org/e/",
    jurisdiction: "japan",
    category: "sdo",
    language: "EN/JP",
    description_en:
      "Japan's coordinating body for automobile standardization and international harmonization (especially UN WP.29). Central reference for JIS automotive standards and Japan's positions at GRVA/GRPE.",
    description_cn:
      "日本汽车标准化及国际协调（尤其是 UN WP.29）的协调机构。负责 JIS 汽车标准和日本在 GRVA/GRPE 的立场协调。",
    crawl_difficulty: "medium",
  },
  {
    id: "din-vda",
    name_en: "VDA / DIN NAAutomobil",
    name_cn: "德国汽车工业协会 VDA / DIN 汽车标准委员会",
    short: "VDA/DIN",
    url: "https://www.vda.de/en",
    jurisdiction: "germany",
    category: "sdo",
    language: "EN/DE",
    description_en:
      "German automotive standardization source. VDA coordinates automotive industry positions and works with DIN's automotive standards committee, feeding German positions into ISO TC22, CEN, and UNECE WP.29 processes.",
    description_cn:
      "德国汽车标准化的重要源头。VDA 协调德国汽车工业立场，并与 DIN 汽车标准委员会协作，将德国汽车技术立场输入 ISO TC22、CEN 和 UNECE WP.29 等体系。",
    crawl_difficulty: "medium",
  },

  // ===================================================================
  // 行业标准组织 / Industry Standard Organizations
  // Per user feedback 2026-04-16: SAE/IEEE/UL are industry-led consortia,
  // not official national SDOs — reclassified here.
  // ===================================================================
  {
    id: "sae",
    name_en: "SAE International",
    name_cn: "SAE 国际（国际汽车工程师学会）",
    short: "SAE",
    url: "https://www.sae.org/standards/",
    jurisdiction: "international",
    category: "industry_org",
    language: "EN",
    description_en:
      "SAE International — industry-led SDO (originally Society of Automotive Engineers, now global). Publishes globally-referenced standards: J3016 (driving automation levels), J3018 (on-road test safety), J3131 (ADS reference architecture incl. Remote Assistance), J3237 (driving assessment metrics, WIP).",
    description_cn:
      "SAE 国际（原美国汽车工程师学会，已改名为国际汽车工程师学会）— 行业主导的标准组织。发布全球性标准：J3016（驾驶自动化分级）、J3018（路测安全）、J3131（ADS 参考架构，含远程辅助定义）、J3237（驾驶评价指标，在研）。",
    crawl_difficulty: "medium",
  },
  {
    id: "ieee-sa",
    name_en: "IEEE Standards Association",
    name_cn: "IEEE 标准协会",
    short: "IEEE",
    url: "https://standards.ieee.org/",
    jurisdiction: "international",
    category: "industry_org",
    language: "EN",
    description_en:
      "IEEE Standards Association — industry-led SDO focused on electrotechnology. Publishes IEEE 2846-2022 (Safety-related Model Assumptions for ADS), IEEE 2848 (V&V for ADS). Also develops communication standards (IEEE 802.11bd, IEEE 1609 for DSRC/V2X).",
    description_cn:
      "IEEE 标准协会 — 以电工技术为主的行业标准组织。发布 IEEE 2846-2022（ADS 安全相关模型假设）、IEEE 2848（ADS 验证确认），以及 IEEE 802.11bd、IEEE 1609（DSRC/V2X）通信标准。",
    crawl_difficulty: "medium",
  },
  {
    id: "ul",
    name_en: "UL Standards & Engagement",
    name_cn: "UL 标准及参与组织",
    short: "UL",
    url: "https://ulse.org/focus-areas/travel-safety/autonomous-vehicles/",
    jurisdiction: "international",
    category: "industry_org",
    language: "EN",
    description_en:
      "Industry-led safety science organization. Publishes UL 4600 — Standard for Safety for the Evaluation of Autonomous Products. First goal-based safety case standard designed for fully autonomous operation.",
    description_cn:
      "行业主导的安全科学组织。发布 UL 4600《自动驾驶产品安全评估标准》，首个面向完全无人驾驶场景的目标导向式安全案例标准。",
    crawl_difficulty: "easy",
  },
  {
    id: "asam",
    name_en: "ASAM e.V.",
    name_cn: "ASAM 自动化与测量系统标准协会",
    short: "ASAM",
    url: "https://www.asam.net/standards/",
    jurisdiction: "international",
    category: "industry_org",
    language: "EN/DE",
    description_en:
      "German-headquartered, globally active industry association. Publishes OpenSCENARIO (scenario description), OpenDRIVE (road network), OpenCRG (road surface), OSI (Open Simulation Interface), OpenLABEL (data annotation) — the de-facto foundation for AD simulation and scenario-based testing.",
    description_cn:
      "总部德国、全球活跃的行业标准组织。发布 OpenSCENARIO（场景描述）、OpenDRIVE（道路网络）、OpenCRG（路面）、OSI（开放仿真接口）、OpenLABEL（数据标注）等标准 — 自动驾驶仿真与场景化测试的事实基础。",
    crawl_difficulty: "easy",
  },
  {
    id: "autosar",
    name_en: "AUTOSAR Partnership",
    name_cn: "AUTOSAR 开发合作组织",
    short: "AUTOSAR",
    url: "https://www.autosar.org/standards",
    jurisdiction: "international",
    category: "industry_org",
    language: "EN",
    description_en:
      "AUTomotive Open System ARchitecture. Founded 2003 by OEMs + Tier 1s + semiconductor companies. Defines Classic Platform (real-time ECUs) and Adaptive Platform (POSIX-based, for L3+ high-performance computing, SOA architecture).",
    description_cn:
      "汽车开放系统架构，2003 年由 OEM、Tier 1、半导体公司联合成立。定义 Classic Platform（实时性 ECU）和 Adaptive Platform（基于 POSIX，面向 L3+ 高性能计算，SOA 架构）。",
    crawl_difficulty: "medium",
  },
  {
    id: "3gpp",
    name_en: "3GPP — 3rd Generation Partnership Project",
    name_cn: "3GPP 国际移动通信标准化组织",
    short: "3GPP",
    url: "https://www.3gpp.org/specifications-technologies",
    jurisdiction: "international",
    category: "industry_org",
    language: "EN",
    description_en:
      "Global partnership of seven telecom SDOs (ATIS, ARIB, CCSA, ETSI, TSDSI, TTA, TTC). Develops C-V2X specifications (TS 22.186 service requirements, TS 23.285 architecture, TR 36.885 LTE-V2X, TR 37.885 5G NR V2X) foundational to connected autonomous driving.",
    description_cn:
      "由 7 个电信标准组织（ATIS、ARIB、CCSA、ETSI、TSDSI、TTA、TTC）组成的全球合作项目。制定 C-V2X 规范（TS 22.186、TS 23.285、TR 36.885、TR 37.885 等），网联自动驾驶的基础标准。",
    crawl_difficulty: "medium",
  },
  {
    id: "5gaa",
    name_en: "5G Automotive Association",
    name_cn: "5G 汽车联盟",
    short: "5GAA",
    url: "https://5gaa.org/",
    jurisdiction: "international",
    category: "industry_org",
    language: "EN",
    description_en:
      "Cross-industry association (auto + telecom) founded 2016. Develops specifications and white papers for C-V2X use cases, connected AD, teleoperation. Primary industry body feeding requirements to 3GPP.",
    description_cn:
      "跨行业（汽车 + 电信）联盟，2016 年成立。制定 C-V2X 用例、网联自动驾驶、远程操控的技术规范和白皮书，是向 3GPP 输送需求的主要行业机构。",
    crawl_difficulty: "easy",
  },
  {
    id: "pegasus-sakura",
    name_en: "PEGASUS / SAKURA / SET Level",
    name_cn: "PEGASUS / SAKURA / SET Level 项目联盟",
    short: "PEGASUS",
    url: "https://www.pegasusprojekt.de/en/home",
    jurisdiction: "international",
    category: "industry_org",
    language: "EN/DE/JP",
    description_en:
      "Government-funded research consortia establishing scenario-based testing methodology: PEGASUS (Germany, 2016-2019) → SET Level (2019-2023) → SAKURA (Japan). Methods from these projects underpin ISO 34502 scenario framework and Euro NCAP protocols.",
    description_cn:
      "政府资助的场景驱动测试研究项目：PEGASUS（德国，2016-2019）→ SET Level（2019-2023）→ SAKURA（日本）。这些项目的方法论是 ISO 34502 场景框架和 Euro NCAP 测试规程的基础。",
    crawl_difficulty: "medium",
  },

  // ===================================================================
  // 测评机构 / Assessment Bodies
  // ===================================================================
  {
    id: "euro-ncap",
    name_en: "Euro NCAP",
    name_cn: "欧洲新车安全评鉴协会",
    short: "Euro NCAP",
    url: "https://www.euroncap.com/",
    jurisdiction: "eu",
    category: "assessment",
    language: "EN",
    description_en:
      "European consumer safety assessment program. Publishes Assisted Driving Grading (ADG) and Vision 2030 roadmap. 5-star rating is de-facto EU market-access indicator.",
    description_cn:
      "欧洲消费者安全测评项目。发布辅助驾驶测评（ADG）和 Vision 2030 路线图。5 星评级是欧洲事实上的市场准入门槛。",
    crawl_difficulty: "easy",
  },
  {
    id: "catarc-cncap",
    name_en: "CATARC / C-NCAP Management Center",
    name_cn: "中国汽车技术研究中心 / C-NCAP 管理中心",
    short: "CATARC / C-NCAP",
    url: "https://www.c-ncap.org.cn/",
    jurisdiction: "china",
    category: "assessment",
    language: "CN",
    description_en:
      "CATARC operates C-NCAP (consumer crash/active safety), C-IASI (insurance-style claim safety), and C-ICAP (Intelligent Connected Vehicle test protocol). C-NCAP 2027 brings scenario-driven active safety paradigm shift.",
    description_cn:
      "中汽中心运营 C-NCAP（消费者碰撞与主动安全）、C-IASI（保险行业索赔式安全测评）、C-ICAP（智能网联测试规程）。C-NCAP 2027 将带来场景驱动主动安全范式转变。",
    crawl_difficulty: "easy",
  },
  {
    id: "caeri-ivista",
    name_en: "CAERI / i-VISTA",
    name_cn: "中国汽车工程研究院 / i-VISTA",
    short: "CAERI / i-VISTA",
    url: "http://www.i-vista.org/",
    jurisdiction: "china",
    category: "assessment",
    language: "CN",
    description_en:
      "Chongqing-based. i-VISTA is CAERI's ICV assessment system. Adds highway pilot, memory parking, voice-controlled cabin, V2X tests. Benchmarks against Euro NCAP AD tests.",
    description_cn:
      "重庆的中国汽研。i-VISTA 是中国汽研的智能网联汽车测评体系。新增高速领航、记忆泊车、语音控制座舱、V2X 测试，对标 Euro NCAP AD 测试。",
    crawl_difficulty: "medium",
  },

  // ===================================================================
  // 中国政府与标准组织 / China Government & SDOs
  // ===================================================================
  {
    id: "miit",
    name_en: "MIIT Equipment Industry Dept. I",
    name_cn: "工信部装备工业一司",
    short: "MIIT",
    url: "https://www.miit.gov.cn/",
    jurisdiction: "china",
    category: "government",
    language: "CN",
    description_en:
      "Ministry of Industry and Information Technology, Equipment Industry Department I. Primary regulator for automotive industry policy and ICV market access. Issues mandatory GB standards with SAMR.",
    description_cn:
      "工业和信息化部装备工业一司。汽车产业政策和智能网联汽车市场准入的主管部门，与国家市场监管总局联合发布 GB 强制性国标。",
    crawl_difficulty: "easy",
  },
  {
    id: "mot",
    name_en: "Ministry of Transport",
    name_cn: "交通运输部",
    short: "MoT",
    url: "https://www.mot.gov.cn/",
    jurisdiction: "china",
    category: "government",
    language: "CN",
    description_en:
      "Ministry of Transport. Regulates Robotaxi commercial operations, autonomous bus/truck pilots, and road transport licensing.",
    description_cn:
      "交通运输部。监管 Robotaxi 商业运营、自动驾驶客车与卡车试点、道路运输许可。",
    crawl_difficulty: "easy",
  },
  {
    id: "beijing-hadzone",
    name_en: "Beijing High-Level AD Demonstration Zone",
    name_cn: "北京市高级别自动驾驶示范区",
    short: "Beijing-HAD",
    url: "https://www.bjcapedz.cn/",
    jurisdiction: "china",
    category: "demonstration",
    language: "CN",
    description_en:
      "Beijing Yizhuang + surrounding areas. Issues Robotaxi operating permits. Supports commercial pilots for Baidu Apollo, Pony.ai, others. Policy Pilot Zone 3.0 covers 600 km².",
    description_cn:
      "北京亦庄及周边高级别自动驾驶示范区。发放 Robotaxi 运营许可，支持百度 Apollo、小马智行等企业商业化。政策 3.0 覆盖 600 平方公里。",
    crawl_difficulty: "medium",
  },
  {
    id: "shanghai-icv",
    name_en: "Shanghai ICV Demonstration Zone",
    name_cn: "上海市智能网联汽车示范区（临港/嘉定/浦东）",
    short: "Shanghai-ICV",
    url: "https://www.shpcpd.gov.cn/",
    jurisdiction: "china",
    category: "demonstration",
    language: "CN",
    description_en:
      "Shanghai's multi-site ICV zones: Lingang, Jiading, Pudong (driverless). Supports L3/L4 for SAIC, NIO, AutoX, WeRide. Pudong 2024 regulation enables true driverless operation.",
    description_cn:
      "上海多基地智能网联汽车示范区：临港、嘉定、浦东（无人驾驶）。支持上汽、蔚来、AutoX、WeRide 等 L3/L4 运营。浦东 2024 年条例允许真正无人驾驶。",
    crawl_difficulty: "medium",
  },
  {
    id: "shenzhen-icv",
    name_en: "Shenzhen ICV Regulation",
    name_cn: "深圳市智能网联汽车管理条例",
    short: "SZ-ICV",
    url: "http://www.szrd.gov.cn/",
    jurisdiction: "china",
    category: "demonstration",
    language: "CN",
    description_en:
      "China's first local regulation (effective Aug 2022) explicitly permitting fully driverless L3/L4 operation in designated zones and clarifying liability for collisions.",
    description_cn:
      "中国首个允许全无人 L3/L4 在指定区域运营的地方性法规（2022 年 8 月施行），明确事故责任划分。",
    crawl_difficulty: "medium",
  },

  // ===================================================================
  // 美国政府 / US Government
  // ===================================================================
  {
    id: "nhtsa",
    name_en: "NHTSA",
    name_cn: "美国国家公路交通安全管理局",
    short: "NHTSA",
    url: "https://www.nhtsa.gov/",
    jurisdiction: "us",
    category: "government",
    language: "EN",
    description_en:
      "National Highway Traffic Safety Administration. Publishes FMVSS regulations, Standing General Order on crash reporting (SGO 2021-01), ADS policy guidance, and enforces recalls.",
    description_cn:
      "美国联邦汽车安全监管机构。发布 FMVSS 法规、SGO 碰撞强制报告令、ADS 政策指南，执行召回。",
    crawl_difficulty: "easy",
  },
  {
    id: "ca-dmv",
    name_en: "California DMV Autonomous Vehicles",
    name_cn: "加州车管局自动驾驶部门",
    short: "CA-DMV",
    url: "https://www.dmv.ca.gov/portal/vehicle-industry-services/autonomous-vehicles/",
    jurisdiction: "us",
    category: "government",
    language: "EN",
    description_en:
      "California DMV's autonomous vehicle program. Issues testing and deployment permits, publishes annual disengagement reports and all AV crash reports (OL 316).",
    description_cn:
      "加州车管局自动驾驶项目。发放测试与部署许可，公布年度脱离报告和所有 AV 碰撞报告（OL 316 表单）。",
    crawl_difficulty: "easy",
  },

  // ===================================================================
  // 欧洲政府 / EU & UK Government
  // ===================================================================
  {
    id: "eu-commission",
    name_en: "European Commission DG GROW / DG MOVE",
    name_cn: "欧盟委员会工商业与交通总司",
    short: "EC",
    url: "https://transport.ec.europa.eu/",
    jurisdiction: "eu",
    category: "government",
    language: "EN",
    description_en:
      "Europe's regulatory body publishing Type Approval regulations (2019/2144, 2022/1426 for ADS) and the horizontal AI Act (2024/1689) impacting automotive AI components.",
    description_cn:
      "欧盟监管机构。发布整车型式认证法规（2019/2144、2022/1426）和影响汽车 AI 组件的 AI Act 横向法规（2024/1689）。",
    crawl_difficulty: "medium",
  },
  {
    id: "uk-ccav",
    name_en: "UK CCAV Centre for Connected and Autonomous Vehicles",
    name_cn: "英国互联与自动驾驶汽车中心",
    short: "CCAV",
    url: "https://www.gov.uk/government/organisations/centre-for-connected-and-autonomous-vehicles",
    jurisdiction: "uk",
    category: "government",
    language: "EN",
    description_en:
      "UK government cross-departmental unit. Led the UK Automated Vehicles Act 2024, which creates liability framework and Authorised Self-Driving Entity (ASDE).",
    description_cn:
      "英国政府跨部门机构。主导 2024 年《自动驾驶汽车法案》，确立责任框架和 ASDE 授权实体制度。",
    crawl_difficulty: "easy",
  },
  {
    id: "bmvi-de",
    name_en: "BMVI / BMDV Germany",
    name_cn: "德国联邦数字与交通部",
    short: "BMVI",
    url: "https://bmdv.bund.de/",
    jurisdiction: "germany",
    category: "government",
    language: "EN/DE",
    description_en:
      "German Federal Ministry for Digital and Transport. Drafted the world-first national L4 regulation (StVG amendment 2021) enabling Technical Supervisor framework for driverless operation.",
    description_cn:
      "德国联邦数字与交通部。起草全球首部国家级 L4 法规（2021 年 StVG 修订），确立技术监督员制度支持无人驾驶运营。",
    crawl_difficulty: "medium",
  },

  // ===================================================================
  // 日本 / Japan
  // ===================================================================
  {
    id: "meti-jp",
    name_en: "METI Japan",
    name_cn: "日本经济产业省",
    short: "METI",
    url: "https://www.meti.go.jp/english/",
    jurisdiction: "japan",
    category: "government",
    language: "EN/JP",
    description_en:
      "Ministry of Economy, Trade and Industry. Co-leads the RoAD to L4 project. Publishes Mobility DX Strategy (2024, 2025 update) with 30% global SDV target for 2030.",
    description_cn:
      "日本经济产业省。与国土交通省联合推进 RoAD to L4 项目。发布《出行 DX 战略》（2024 首发、2025 更新），目标 2030 年全球 SDV 份额 30%。",
    crawl_difficulty: "medium",
  },
  {
    id: "mlit-jp",
    name_en: "MLIT Japan",
    name_cn: "日本国土交通省",
    short: "MLIT",
    url: "https://www.mlit.go.jp/en/",
    jurisdiction: "japan",
    category: "government",
    language: "EN/JP",
    description_en:
      "Ministry of Land, Infrastructure, Transport and Tourism. Regulates type approval and issued safety assurance guidelines for Level 4 services. Amended Road Transport Vehicle Act enables L4 deployment.",
    description_cn:
      "日本国土交通省。负责型式认证，发布 L4 服务安全保证指南。修订《道路运输车辆法》支持 L4 服务落地。",
    crawl_difficulty: "medium",
  },

  // ===================================================================
  // 韩国 / Korea & Singapore
  // ===================================================================
  {
    id: "molit-kr",
    name_en: "Korea MOLIT",
    name_cn: "韩国国土交通部",
    short: "MOLIT",
    url: "https://www.molit.go.kr/english/",
    jurisdiction: "korea",
    category: "government",
    language: "EN",
    description_en:
      "Ministry of Land, Infrastructure and Transport. Established Act on AV Commercialization (2020) — Korea's first AV-specific law. Oversees K-City test bed and L4 pilot permits.",
    description_cn:
      "韩国国土交通部。2020 年制定《自动驾驶汽车商业化促进及支援法》— 韩国首部 AV 专项立法。监管 K-City 测试场和 L4 试点许可。",
    crawl_difficulty: "medium",
  },
  {
    id: "lta-sg",
    name_en: "Singapore Land Transport Authority",
    name_cn: "新加坡陆路交通管理局",
    short: "LTA",
    url: "https://www.lta.gov.sg/content/ltagov/en/industry_innovations/technologies/autonomous_vehicles.html",
    jurisdiction: "singapore",
    category: "government",
    language: "EN",
    description_en:
      "Singapore LTA. Published Technical Reference 68 (TR 68) — phased milestone-based AV testing/deployment framework. Reference for ASEAN countries.",
    description_cn:
      "新加坡陆路交通管理局。发布 Technical Reference 68（TR 68）— 分阶段里程碑式 AV 测试部署框架。东盟国家参考范本。",
    crawl_difficulty: "medium",
  },
];

export const SOURCE_BY_ID: Record<string, SourceInfo> = Object.fromEntries(
  SOURCES.map((s) => [s.id, s])
);

export const SOURCE_CATEGORY_META: Record<
  SourceCategory,
  { code: string; key_en: string; key_cn: string; desc_en: string; desc_cn: string }
> = {
  sdo: {
    code: "SDO",
    key_en: "National / International Standards Bodies",
    key_cn: "国家/国际标准制定组织",
    desc_en:
      "Official national, regional, and international standards bodies that develop or coordinate formal standards.",
    desc_cn:
      "制定或协调正式标准的国家级、区域级和国际标准组织，包括 ISO、UNECE、SAC、ANSI、BSI、JISC/JSAE、VDA/DIN 等。",
  },
  industry_org: {
    code: "IND",
    key_en: "Industry Standard Organizations",
    key_cn: "行业标准组织",
    desc_en:
      "Industry-led consortia and professional associations defining technical standards, recommended practices, and de-facto engineering interfaces.",
    desc_cn:
      "行业主导的联盟、专业协会和工程组织，定义技术标准、推荐实践和事实工程接口，如 SAE、IEEE、UL、ASAM、AUTOSAR、3GPP、5GAA。",
  },
  government: {
    code: "REG",
    key_en: "Government Regulators",
    key_cn: "政府监管机构",
    desc_en: "National, local, or supranational regulatory authorities that issue laws, rules, type-approval requirements, permits, and policy guidance.",
    desc_cn: "发布法律法规、型式认证要求、运营许可和政策指南的国家、地方或超国家监管机构。",
  },
  assessment: {
    code: "NCAP",
    key_en: "Assessment & Rating Bodies",
    key_cn: "测评与评级机构",
    desc_en:
      "Consumer-facing assessment and rating programs, including NCAP-family protocols and regional intelligent-vehicle evaluation systems.",
    desc_cn:
      "面向消费者和行业的测评评级体系，包括各国 NCAP 及智能网联汽车测试评价规程。",
  },
  demonstration: {
    code: "PILOT",
    key_en: "Pilot & Demonstration Zones",
    key_cn: "试点与示范区",
    desc_en: "Local government demonstration zones that issue operating permits.",
    desc_cn: "发放运营许可的地方政府示范区。",
  },
};
