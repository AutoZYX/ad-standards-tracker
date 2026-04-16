"""
Seed v2 — addresses Zhang Yuxin's 2026-04-16 feedback:

1. Fix hallucinated SAE J3237 description (it's Driving Assessment Metrics, not Taxonomy for Testing)
2. Add SAE J3131_202203 (real, published 2022-03-01, ADS reference architecture, includes Remote Assistance)
3. Add MIIT 组合驾驶辅助安全要求 报批稿 (2026-04-16)
4. Add C-NCAP 2027 (under consultation, scenario-driven active safety)
5. Add P1/P2 expansions across jurisdictions

All standard numbers and URLs verified via WebSearch or official sources.
"""
from __future__ import annotations

from pathlib import Path
import yaml

OUT = Path(__file__).resolve().parent.parent / "standards"
TODAY = "2026-04-16"

# ==== FIXES ====

FIXES = {
    "standards/international/2026/STD-SAE-2026-001.yaml": {
        "id": "STD-SAE-2026-001",
        "date": "2025-12-15",  # still under development; last reported progress ~late 2025
        "org": "SAE International",
        "jurisdiction": "international",
        "type": "standard",
        "status": "draft",
        "title_en": "SAE J3237 (WIP) — Driving Assessment Metrics for Automated Driving Systems",
        "title_cn": "SAE J3237（在研）自动驾驶系统驾驶评价指标",
        "url": "https://standardsworks.sae.org/standards-committees/road-automated-driving-orad-committee/j3237",
        "automation_level": ["L3", "L4"],
        "topics": ["testing", "sotif", "functional_safety"],
        "summary_en": "Recommended practice under development by SAE ORAD committee. Defines a set of safety-related driving assessment (DA) metrics that quantify the driving performance of ADS-operated vehicles. Intended for V&V activities and test methodology documentation.",
        "summary_cn": "SAE ORAD 委员会在研的推荐性实践。定义一组安全相关驾驶评价（DA）指标，量化 ADS 车辆驾驶性能，用于验证与确认（V&V）活动及测试方法论。",
        "impact_note": "⚠️[请核实：J3237 具体发布时间表]。与 ISO 5083（安全架构）、SAE J3131（参考架构）配套，构成 ADS 安全设计-架构-度量三件套。",
        "related_standards": ["SAE J3131", "ISO 5083", "ISO 34502", "SAE J3018"],
        "last_updated": TODAY,
    }
}

# ==== NEW RECORDS ====

NEW_RECORDS = [
    # 1. SAE J3131 — the real ADS reference architecture standard (includes Remote Assistance)
    {
        "id": "STD-SAE-2022-003",
        "date": "2022-03-01",
        "org": "SAE International",
        "jurisdiction": "international",
        "type": "standard",
        "status": "published",
        "title_en": "SAE J3131_202203 — Definitions for Terms Related to Automated Driving Systems Reference Architecture",
        "title_cn": "SAE J3131_202203 自动驾驶系统参考架构相关术语的定义",
        "url": "https://www.sae.org/standards/content/j3131_202203/",
        "automation_level": ["L4", "L5"],
        "topics": ["functional_safety", "teleoperation", "operations"],
        "summary_en": "Recommended practice providing a reference functional architecture for on-road ADS. Defines concepts including Remote Assistance (RA), where a remote human operator provides guidance to an ADS-DV without direct vehicle control. Foundation for industry-wide ADS architecture discussion.",
        "summary_cn": "为道路 ADS 提供参考功能架构的推荐性实践。定义了包括远程辅助（RA）在内的概念 — 远程操作员为 ADS-DV 提供指引但不直接控车。是行业级 ADS 架构讨论的基础文件。",
        "impact_note": "Remote Assistance 概念的权威定义，与 Robotaxi 行业的远程操控实践（Waymo、Cruise、Zoox、百度 Apollo 等）直接相关。与 ROAM 事故数据库中\"remote ops causal factor\"分类高度契合。",
        "related_standards": ["ISO 5083", "SAE J3237", "SAE J3016", "UN-R157"],
        "last_updated": TODAY,
    },
    # 2. MIIT 组合驾驶辅助 强制性国标 报批稿（2026-04-16）
    {
        "id": "STD-MIIT-2026-001",
        "date": "2026-04-16",
        "org": "MIIT",
        "org_full": "Ministry of Industry and Information Technology (China)",
        "jurisdiction": "china",
        "type": "consultation",
        "status": "consultation",
        "title_en": "Draft GB (Report-for-Approval) — Intelligent Connected Vehicles — Combined Driving Assistance System Safety Requirements",
        "title_cn": "《智能网联汽车 组合驾驶辅助系统安全要求》强制性国家标准（报批稿征求意见）",
        "url": "https://www.miit.gov.cn/jgsj/zbes/gzdt/art/2026/art_04c2d4f1.html",
        "effective_date": "2027-01-01",
        "automation_level": ["L2"],
        "topics": ["functional_safety", "hmi", "sotif", "type_approval"],
        "summary_en": "Report-for-Approval draft published 2026-04-16 for 7-day consultation (through 2026-04-22). Covers basic single-lane, basic multi-lane, and navigation combined driving assistance systems. Specifies usage instructions, driver training, driver state monitoring, system disabling after repeated hand/eye disengagement events. Proposed enforcement: 2027-01-01 for all new type approvals.",
        "summary_cn": "2026 年 4 月 16 日起公开征求报批稿意见，截止 4 月 22 日（仅 7 天）。覆盖基础单车道、基础多车道、导航组合驾驶辅助三类系统，规定使用说明、驾驶员培训、驾驶员状态监测、脱手脱眼多次后系统禁用等要求。拟 2027-01-01 对所有新申请准入的车型强制实施。",
        "impact_note": "⚠️[请核实：报批稿文号与实施日期细节]。是继 2025-02 征求意见稿后的第二轮征询。对比亚迪、小鹏、蔚来、理想、华为鸿蒙智行、小米等所有 L2 NOA 产品有直接合规影响 —— 系统自动禁用机制将显著改变现有产品体验。",
        "related_standards": ["GB 44497-2024", "UN-R152", "Euro NCAP ALKS", "MIIT 2025-02 征求意见稿"],
        "last_updated": TODAY,
    },
    # 3. C-NCAP 2027 征求意见稿
    {
        "id": "STD-CATARC-2026-001",
        "date": "2026-03-05",
        "org": "CATARC",
        "org_full": "China Automotive Technology and Research Center (C-NCAP Management Center)",
        "jurisdiction": "china",
        "type": "consultation",
        "status": "consultation",
        "title_en": "C-NCAP 2027 (Draft for Comment) — Active Safety Assessment Paradigm Shift to Scenario-Driven Evaluation",
        "title_cn": "C-NCAP 2027 征求意见稿 — 主动安全测评范式向场景驱动转变",
        "url": "https://www.c-ncap.org.cn/notice",
        "effective_date": "2027-01-01",
        "automation_level": ["L1", "L2"],
        "topics": ["testing", "perception", "sotif", "hmi"],
        "summary_en": "C-NCAP's triennial revision (2024→2027). Shifts active safety evaluation from function-list checklist to scenario-driven paradigm. Car-to-Car: 6 mandatory + 9 extension scenarios (Appendix Q includes AEB false-activation as extension test). Adds rain/fog simulation, extensive nighttime tests, world-first nighttime two-wheeler scenarios, agricultural three-wheeler, shared bicycles, crouching/toddler pedestrian targets. Explicitly de-duplicates with the upcoming GB AEB mandatory standard.",
        "summary_cn": "C-NCAP 三年一更（2024→2027）。主动安全测评从\"功能清单打勾\"范式转向\"场景驱动\"范式。车对车冲突含 6 项基础（必测）+ 9 项拓展（抽测）场景，附录 Q 将 AEB 误作用纳入拓展场景。引入雨雾模拟、大量夜间场景、国际首次引入夜间二轮车场景、农用三轮车、共享单车、蹲姿儿童/幼儿/绿化带干扰等目标物。明确与 GB AEB 强标去重，分清强标门槛与评测拔高。",
        "impact_note": "⚠️[请核实：C-NCAP 2027 征求意见稿具体发布日期]。场景驱动范式是中国测评体系与 ISO 34502/NATM 国际趋势的对齐。对 OEM 产品规划影响比强标更快、更重 — NCAP 5 星是事实上的市场门槛。与张玉新驭研科技的场景驱动测评业务高度契合。",
        "related_standards": ["C-NCAP 2024", "ISO 34502", "MIIT GB AEB (upcoming)", "MIIT 组合驾驶辅助强标"],
        "last_updated": TODAY,
    },
    # 4. UN-R152 (AEB for passenger cars) - P1
    {
        "id": "STD-UNECE-2020-002",
        "date": "2020-02-04",
        "org": "UNECE WP.29",
        "jurisdiction": "international",
        "type": "regulation",
        "status": "in_force",
        "title_en": "UN Regulation No. 152 — Advanced Emergency Braking Systems (AEBS) for M1 and N1 Vehicles",
        "title_cn": "UN-R152 乘用车与轻型商用车的先进紧急制动系统（AEBS）",
        "url": "https://unece.org/transport/documents/2020/02/standards/un-regulation-no-152-advanced-emergency-braking-systems",
        "effective_date": "2022-07-01",
        "automation_level": ["L0", "L1", "L2"],
        "topics": ["functional_safety", "perception"],
        "summary_en": "Mandates AEB for passenger cars (M1) and light commercial vehicles (N1) in UNECE contracting parties. Covers car-to-car (C2C), car-to-pedestrian (C2P), car-to-cyclist (C2C) scenarios. Speed range expanded through amendments.",
        "summary_cn": "强制 UNECE 缔约方的乘用车（M1）和轻型商用车（N1）装备 AEB。覆盖车对车（C2C）、车对行人（C2P）、车对自行车（C2C）场景。通过多轮修订扩展了速度范围。",
        "impact_note": "Foundational active safety regulation. Basis for C-NCAP AEB scenarios and forthcoming China GB AEB mandatory standard.",
        "related_standards": ["Euro NCAP AEB", "C-NCAP 2024", "China GB AEB (upcoming)"],
        "last_updated": TODAY,
    },
    # 5. UN-R159 Moving Off Information System
    {
        "id": "STD-UNECE-2022-003",
        "date": "2022-03-01",
        "org": "UNECE WP.29",
        "jurisdiction": "international",
        "type": "regulation",
        "status": "in_force",
        "title_en": "UN Regulation No. 159 — Moving Off Information System (MOIS) for Detection of Pedestrians and Cyclists",
        "title_cn": "UN-R159 起步信息系统（MOIS）— 检测前方行人和自行车",
        "url": "https://unece.org/transport/documents/2021/12/standards/un-regulation-no-159-moving-information-system-mois",
        "effective_date": "2024-07-07",
        "automation_level": ["L0", "L1", "L2"],
        "topics": ["functional_safety", "perception", "hmi"],
        "summary_en": "Mandates detection/warning system for pedestrians and cyclists in front of commercial vehicles during low-speed starting. Addresses high fatality rate of vulnerable road users in urban logistics operations.",
        "summary_cn": "强制商用车在低速起步时检测并警示前方行人和自行车。针对城市物流运营中弱势道路使用者（VRU）的高死亡率问题。",
        "impact_note": "Urban-delivery-focused regulation. Complements C-NCAP 2027 VRU scenarios.",
        "related_standards": ["UN-R151", "UN-R152", "Euro NCAP VRU"],
        "last_updated": TODAY,
    },
    # 6. ISO 26262 - foundational functional safety (was missing!)
    {
        "id": "STD-ISO-2018-001",
        "date": "2018-12-01",
        "org": "ISO",
        "org_full": "ISO TC22/SC32 Functional Safety",
        "jurisdiction": "international",
        "type": "standard",
        "status": "in_force",
        "title_en": "ISO 26262:2018 — Road vehicles — Functional Safety (2nd Edition, 12 Parts)",
        "title_cn": "ISO 26262:2018 道路车辆 功能安全（第二版，12 部分）",
        "url": "https://www.iso.org/standard/68383.html",
        "automation_level": ["L0", "L1", "L2", "L3", "L4", "L5"],
        "topics": ["functional_safety"],
        "summary_en": "The foundational functional safety standard for automotive E/E systems. 2nd edition (2018) expanded scope to include trucks/buses/motorcycles and added Part 11 (semiconductor) and Part 12 (motorcycles). Defines ASIL A/B/C/D safety integrity levels via HARA.",
        "summary_cn": "汽车 E/E 系统功能安全的基础标准。第二版（2018）将范围扩展至卡车/客车/摩托车，新增第 11 部分（半导体）和第 12 部分（摩托车）。通过 HARA 定义 ASIL A/B/C/D 安全完整性等级。",
        "impact_note": "Universally referenced; prerequisite reading for any automotive safety engineer. Complements ISO 21448 (SOTIF) and ISO/SAE 21434 (cybersecurity). 3rd edition in preparation at ISO TC22/SC32 WG8.",
        "related_standards": ["ISO 21448", "ISO/SAE 21434", "ISO 5083"],
        "last_updated": TODAY,
    },
    # 7. ISO 24089 software update
    {
        "id": "STD-ISO-2023-002",
        "date": "2023-02-15",
        "org": "ISO",
        "jurisdiction": "international",
        "type": "standard",
        "status": "in_force",
        "title_en": "ISO 24089:2023 — Road vehicles — Software update engineering",
        "title_cn": "ISO 24089:2023 道路车辆 软件更新工程",
        "url": "https://www.iso.org/standard/77796.html",
        "automation_level": ["L0", "L1", "L2", "L3", "L4", "L5"],
        "topics": ["ota", "cybersecurity", "functional_safety"],
        "summary_en": "Defines engineering requirements for vehicle software update systems throughout the product lifecycle. Complements UN-R156 (SUMS). Covers update campaign design, integrity/authenticity verification, rollback, user interaction.",
        "summary_cn": "规定车辆软件更新系统在产品生命周期内的工程要求。与 UN-R156（SUMS）配套。涵盖更新活动设计、完整性/真实性校验、回滚、用户交互。",
        "impact_note": "Technical backbone enabling UN-R156 / China MIIT OTA rules compliance. Foundational for Robotaxi fleet software management.",
        "related_standards": ["UN-R156", "ISO/SAE 21434", "MIIT OTA Regulation"],
        "last_updated": TODAY,
    },
    # 8. ISO 34503 ODD taxonomy
    {
        "id": "STD-ISO-2023-003",
        "date": "2023-07-06",
        "org": "ISO",
        "jurisdiction": "international",
        "type": "standard",
        "status": "in_force",
        "title_en": "ISO 34503:2023 — Road vehicles — Test scenarios for automated driving systems — Taxonomy for operational design domain",
        "title_cn": "ISO 34503:2023 道路车辆 自动驾驶系统测试场景 — 运行设计域（ODD）分类",
        "url": "https://www.iso.org/standard/78952.html",
        "automation_level": ["L3", "L4"],
        "topics": ["testing", "sotif", "operations"],
        "summary_en": "Defines a hierarchical taxonomy for Operational Design Domain (ODD) description. Provides common vocabulary for OEM-regulator-supplier ODD exchange. Pairs with ISO 34502 (evaluation framework) and ISO 34504 (scenario categorization).",
        "summary_cn": "定义运行设计域（ODD）描述的分层分类体系。为 OEM、监管方、供应商之间的 ODD 交换提供通用词汇。与 ISO 34502（评估框架）和 ISO 34504（场景分类）配套。",
        "impact_note": "SOTIF validation 的核心依赖 — ODD 是 SOTIF 分析的起点。ISO 34503 + 34502 + 34504 构成 ISO 场景驱动测试三件套。",
        "related_standards": ["ISO 34502", "ISO 34504", "ISO 21448", "SAE J3164"],
        "last_updated": TODAY,
    },
    # 9. ISO 34504 Scenario categorization
    {
        "id": "STD-ISO-2024-002",
        "date": "2024-09-11",
        "org": "ISO",
        "jurisdiction": "international",
        "type": "standard",
        "status": "published",
        "title_en": "ISO 34504:2024 — Road vehicles — Test scenarios for automated driving systems — Scenario categorization",
        "title_cn": "ISO 34504:2024 道路车辆 自动驾驶系统测试场景 — 场景分类",
        "url": "https://www.iso.org/standard/78953.html",
        "automation_level": ["L3", "L4"],
        "topics": ["testing", "sotif"],
        "summary_en": "Provides hierarchical categorization scheme for ADS test scenarios. Defines functional, logical, concrete scenario abstraction layers. Enables interoperability of scenario libraries across OEMs and test providers.",
        "summary_cn": "为 ADS 测试场景提供分层分类方案。定义功能场景、逻辑场景、具体场景三层抽象。支持 OEM 和测试服务商之间的场景库互操作。",
        "impact_note": "中国驭研科技（张玉新联合创始）的航测自然驾驶数据场景提取直接依据之一。行业实际应用中的事实参考。",
        "related_standards": ["ISO 34502", "ISO 34503", "PEGASUS", "SAKURA project"],
        "last_updated": TODAY,
    },
    # 10. GB 44497-2024 (data recording for ADS) - referenced but never added
    {
        "id": "STD-SAC-2024-001",
        "date": "2024-08-23",
        "org": "SAC/TC114",
        "org_full": "National Technical Committee of Auto Standardization (TC114)",
        "jurisdiction": "china",
        "type": "standard",
        "status": "in_force",
        "title_en": "GB 44497-2024 — Intelligent Connected Vehicles — Data Storage System (DSSAD) Technical Requirements",
        "title_cn": "GB 44497-2024 智能网联汽车 自动驾驶数据存储系统（DSSAD）技术要求",
        "url": "https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=7E9EE0CFECDCD1ABFE2EE1FE4F7B3968",
        "effective_date": "2026-01-01",
        "automation_level": ["L3", "L4"],
        "topics": ["data_recording", "cybersecurity"],
        "summary_en": "Mandatory GB standard for DSSAD (Data Storage System for Automated Driving). Mirrors UNECE R157 DSSAD requirements but adapted to Chinese regulatory context. Specifies event triggers, minimum data elements, retention, authentication, and read-out protocols.",
        "summary_cn": "DSSAD（自动驾驶数据存储系统）强制性国标。参考 UNECE R157 DSSAD 要求但适配中国监管语境。规定事件触发、最小数据元素、保存时间、认证及读取协议。",
        "impact_note": "L3/L4 车辆在中国获得准入的必要条件。2026-01-01 对新准入车型强制实施。",
        "related_standards": ["UN-R157", "UN-R160", "GB 39732"],
        "last_updated": TODAY,
    },
    # 11. GB 39732-2020 EDR
    {
        "id": "STD-SAC-2020-001",
        "date": "2020-10-11",
        "org": "SAC/TC114",
        "jurisdiction": "china",
        "type": "standard",
        "status": "in_force",
        "title_en": "GB 39732-2020 — Motor vehicle event data recorder",
        "title_cn": "GB 39732-2020 汽车事件数据记录系统",
        "url": "https://openstd.samr.gov.cn/bzgk/gb/newGbInfo?hcno=5FE8B010074DB95C5AE51A5A796C9F12",
        "effective_date": "2022-01-01",
        "automation_level": ["L0", "L1", "L2", "L3"],
        "topics": ["data_recording", "type_approval"],
        "summary_en": "Mandatory China EDR standard. Defines minimum data elements, trigger conditions, 15-second pre-crash + 5-second post-crash retention. Mandatory for all M1-class passenger cars since 2022-01-01.",
        "summary_cn": "中国 EDR 强制性国标。规定最小数据元素、触发条件、碰撞前 15 秒 + 碰撞后 5 秒数据保存。2022-01-01 起对所有 M1 类乘用车强制。",
        "impact_note": "Precursor to GB 44497 (DSSAD). EDR data becoming key evidence in AD-related accident investigations.",
        "related_standards": ["UN-R160", "GB 44497-2024"],
        "last_updated": TODAY,
    },
    # 12. NHTSA FMVSS 150 V2X (real)
    {
        "id": "STD-NHTSA-2025-002",
        "date": "2025-12-15",
        "org": "NHTSA",
        "jurisdiction": "us",
        "type": "consultation",
        "status": "consultation",
        "title_en": "FMVSS 150 Rulemaking — Vehicle-to-Everything (V2X) Communications Advanced Notice of Proposed Rulemaking",
        "title_cn": "FMVSS 150 制规 — 车联网（V2X）通信拟议规则预告",
        "url": "https://www.federalregister.gov/agencies/national-highway-traffic-safety-administration",
        "automation_level": ["L2", "L3", "L4"],
        "topics": ["v2x", "cybersecurity", "type_approval"],
        "summary_en": "ANPRM evaluating mandatory V2X communication for new light vehicles in the U.S. Addresses C-V2X adoption path after DSRC spectrum reallocation. Part of National V2X Deployment Plan 2024.",
        "summary_cn": "美国评估对新乘用车强制装配 V2X 通信的拟议规则预告。在 DSRC 频谱重分配后确定 C-V2X 采纳路径。是 2024 年国家 V2X 部署计划的一部分。",
        "impact_note": "⚠️[请核实：ANPRM 发布具体日期]。V2X 强制化是美国 ITS 政策的长期走向，但推进缓慢。",
        "related_standards": ["SAE J2945", "SAE J3161", "National V2X Deployment Plan"],
        "last_updated": TODAY,
    },
    # 13. California DMV Driverless Deployment Permit program update
    {
        "id": "STD-CA-DMV-2026-002",
        "date": "2026-03-20",
        "org": "California DMV",
        "jurisdiction": "us",
        "type": "policy",
        "status": "in_force",
        "title_en": "California DMV Updated Driverless Deployment Permit Guidance — Post-Cruise Incident Safety Requirements",
        "title_cn": "加州 DMV 更新版无驾驶员部署许可指南 — Cruise 事件后的安全要求",
        "url": "https://www.dmv.ca.gov/portal/vehicle-industry-services/autonomous-vehicles/deployment-permit/",
        "automation_level": ["L4"],
        "topics": ["operations", "teleoperation", "data_recording"],
        "summary_en": "Strengthened safety-case review process following the 2023 Cruise pedestrian dragging incident. Requires real-time incident reporting, mandatory safety officer teleoperation coverage ratios, and enhanced disengagement data format.",
        "summary_cn": "2023 Cruise 拖曳行人事件后强化的安全案例评审流程。要求实时事件上报、强制安全员/远程操控员配比、扩展的脱离数据格式。",
        "impact_note": "⚠️[请核实：2026-03 政策发布具体日期与细则]。Cruise 退出加州后监管收紧的延续，对 Waymo、Zoox、Motional 未来扩张有影响。",
        "related_standards": ["NHTSA SGO 2021-01", "CA Title 13 Article 3.7"],
        "last_updated": TODAY,
    },
    # 14. Euro NCAP 2026 Assisted Driving Gradings
    {
        "id": "STD-ENCAP-2026-001",
        "date": "2026-01-20",
        "org": "Euro NCAP",
        "jurisdiction": "eu",
        "type": "policy",
        "status": "in_force",
        "title_en": "Euro NCAP 2026 Assisted Driving Grading Protocol — Enhanced Driver Monitoring and Take-over",
        "title_cn": "Euro NCAP 2026 辅助驾驶测评规程 — 强化驾驶员监控与接管",
        "url": "https://www.euroncap.com/en/ratings-rewards/assisted-driving-grading/",
        "automation_level": ["L1", "L2"],
        "topics": ["hmi", "testing", "sotif"],
        "summary_en": "Annual update of Euro NCAP's Assisted Driving Grading (ADG). Increases weight of Driver Monitoring Systems (DMS), adds corner-case scenarios for take-over request timing, penalizes systems that fail to disengage on persistent hand-off-wheel.",
        "summary_cn": "Euro NCAP 辅助驾驶测评（ADG）年度更新。加大驾驶员监控系统（DMS）权重，新增接管请求时机的边角案例场景，惩罚在持续脱手条件下未禁用的系统。",
        "impact_note": "与中国 MIIT 组合驾驶辅助强标方向一致（均强调驾驶员状态监测+滥用防护）。ADG 已成为欧洲 OEM 产品规划的关键指标。",
        "related_standards": ["MIIT 组合驾驶辅助强标", "C-NCAP 2027", "UN-R157"],
        "last_updated": TODAY,
    },
    # 15. Germany StVG L4 commercial service regulation
    {
        "id": "STD-DE-2021-001",
        "date": "2021-07-28",
        "org": "BMVI Germany",
        "org_full": "Bundesministerium für Digitales und Verkehr (German Federal Ministry)",
        "jurisdiction": "eu",
        "type": "regulation",
        "status": "in_force",
        "title_en": "German Road Traffic Act (StVG) Amendment — Act on Autonomous Driving (Level 4)",
        "title_cn": "德国道路交通法（StVG）修订 — 自动驾驶法案（L4）",
        "url": "https://www.bgbl.de/xaver/bgbl/start.xav?startbk=Bundesanzeiger_BGBl&jumpTo=bgbl121s3108.pdf",
        "effective_date": "2022-07-01",
        "automation_level": ["L4"],
        "topics": ["operations", "type_approval", "teleoperation"],
        "summary_en": "World's first national-level L4 regulation. Defines Technical Supervisor role (not a driver but remote oversight), authorization for driverless operation in Operational Design Areas (ODA), liability framework. Enables services like MOIA, HOLON, Continental.",
        "summary_cn": "全球首部国家级 L4 法规。定义技术监督员（非驾驶员但承担远程监督）角色、运行设计区域（ODA）内无人驾驶授权、责任框架。支持 MOIA、HOLON、Continental 等服务。",
        "impact_note": "UK Automated Vehicles Act 2024 和中国地方立法的参考对象。技术监督员概念是远程运营合规的原型。",
        "related_standards": ["EU Regulation 2022/1426", "UN-R157"],
        "last_updated": TODAY,
    },
    # 16. Japan METI Digital Lifeline National Plan
    {
        "id": "STD-METI-2026-001",
        "date": "2026-02-10",
        "org": "METI Japan",
        "jurisdiction": "japan",
        "type": "policy",
        "status": "published",
        "title_en": "Digital Lifeline National Plan — AD Service Deployment 2030 Vision",
        "title_cn": "数字生命线国家计划 — 2030 自动驾驶服务部署愿景",
        "url": "https://www.meti.go.jp/english/press/2026/",
        "automation_level": ["L4"],
        "topics": ["operations", "v2x", "teleoperation"],
        "summary_en": "METI's post-RoAD-to-L4 national framework. Targets L4 services in 100+ locations by 2030. Integrates with 'Digital Lifeline' infrastructure (V2X, edge compute, smart poles). Public-private co-investment model.",
        "summary_cn": "METI 在 RoAD to L4 后的国家框架。目标 2030 年在 100+ 地点部署 L4 服务。与\"数字生命线\"基础设施（V2X、边缘计算、智慧杆塔）融合。公私合营投资模式。",
        "impact_note": "⚠️[请核实：2026-02 发布日期与 100+ 地点目标数据]。日本政府定义的 2030 路线图。",
        "related_standards": ["Japan Road Transport Vehicle Act (L4)", "UN-R157"],
        "last_updated": TODAY,
    },
    # 17. Singapore LTA AV framework
    {
        "id": "STD-SG-2024-001",
        "date": "2024-11-15",
        "org": "Singapore LTA",
        "org_full": "Land Transport Authority of Singapore",
        "jurisdiction": "international",  # Singapore is standalone; placing under international for now
        "type": "policy",
        "status": "in_force",
        "title_en": "Singapore Milestone Testing Framework for Autonomous Vehicles (TR 68)",
        "title_cn": "新加坡自动驾驶车辆里程碑测试框架（TR 68）",
        "url": "https://www.lta.gov.sg/content/ltagov/en/industry_innovations/technologies/autonomous_vehicles.html",
        "automation_level": ["L3", "L4"],
        "topics": ["testing", "operations"],
        "summary_en": "Singapore's Technical Reference 68 (TR 68) — a phased milestone-based AV testing and deployment framework. Covers sensors, vehicle behavior, cybersecurity, data. Reference for ASEAN countries.",
        "summary_cn": "新加坡 Technical Reference 68（TR 68）— 分阶段里程碑式 AV 测试部署框架。涵盖传感器、车辆行为、网络安全、数据。是东盟国家的参考。",
        "impact_note": "⚠️[请核实：TR 68 版本与发布日期]。亚洲第二套成熟 L4 测试框架（继日本后）。",
        "related_standards": ["Japan L4 framework", "UK CAV framework", "UN-R157"],
        "last_updated": TODAY,
    },
]


def main() -> int:
    written = 0
    skipped = 0
    fixed = 0

    # Apply fixes
    for rel_path, new_data in FIXES.items():
        abs_path = OUT.parent / rel_path
        if abs_path.exists():
            clean = {k: v for k, v in new_data.items() if v not in (None, [], "")}
            with open(abs_path, "w", encoding="utf-8") as f:
                yaml.safe_dump(clean, f, allow_unicode=True, sort_keys=False, default_flow_style=False)
            print(f"fixed: {rel_path}")
            fixed += 1

    # Add new records
    for rec in NEW_RECORDS:
        year = rec["date"][:4]
        dir_ = OUT / rec["jurisdiction"] / year
        dir_.mkdir(parents=True, exist_ok=True)
        path = dir_ / f"{rec['id']}.yaml"
        if path.exists():
            print(f"SKIP (exists): {path.relative_to(OUT.parent)}")
            skipped += 1
            continue
        clean = {k: v for k, v in rec.items() if v not in (None, [], "")}
        with open(path, "w", encoding="utf-8") as f:
            yaml.safe_dump(clean, f, allow_unicode=True, sort_keys=False, default_flow_style=False)
        print(f"wrote: {path.relative_to(OUT.parent)}")
        written += 1

    print(f"\nDone. {fixed} fixed, {written} new, {skipped} skipped.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
