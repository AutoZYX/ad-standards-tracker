"""
Seed v3 — adds industry standard organization records (VDA/ASAM/AUTOSAR/5GAA)
and a C-NCAP 2024 baseline + a couple interpretation records.

All URLs verified via curl/WebSearch before inclusion.
"""
from __future__ import annotations

from pathlib import Path
import yaml

OUT = Path(__file__).resolve().parent.parent / "standards"
TODAY = "2026-04-16"

NEW_RECORDS = [
    # ---- ASAM OpenSCENARIO ----
    {
        "id": "STD-ASAM-2019-001",
        "date": "2019-03-01",
        "org": "ASAM",
        "org_full": "ASAM e.V. (Association for Standardisation of Automation and Measuring Systems)",
        "jurisdiction": "industry_org",
        "type": "standard",
        "status": "in_force",
        "title_en": "ASAM OpenSCENARIO 1.0 — Dynamic Content Description for Driving Scenarios",
        "title_cn": "ASAM OpenSCENARIO 1.0 — 驾驶场景动态内容描述标准",
        "url": "https://www.asam.net/standards/detail/openscenario/",
        "automation_level": ["L1", "L2", "L3", "L4", "L5"],
        "topics": ["testing", "sotif", "scenario_description"],
        "summary_en": "First industry standard for dynamic content description in driving scenarios. Works together with ASAM OpenDRIVE (static road network) to enable scenario-based ADAS/AD simulation. De-facto global standard for scenario exchange.",
        "summary_cn": "首个行业级驾驶场景动态内容描述标准。与 OpenDRIVE（静态路网）配合，支撑基于场景的 ADAS/AD 仿真。事实上的全球场景交换标准。",
        "impact_note": "用于 CARLA、VTD、Prescan、LGSVL 等主流仿真器。OpenSCENARIO 2.0 已进入 DSL 架构，更适合大规模逻辑场景生成。与 ISO 34503 ODD 分类和 ISO 34502 场景框架协同。",
        "related_standards": ["ASAM OpenDRIVE", "ASAM OpenCRG", "ISO 34502", "ISO 34503"],
        "last_updated": TODAY,
    },
    # ---- ASAM OpenDRIVE ----
    {
        "id": "STD-ASAM-2006-001",
        "date": "2006-01-31",
        "org": "ASAM",
        "jurisdiction": "industry_org",
        "type": "standard",
        "status": "in_force",
        "title_en": "ASAM OpenDRIVE — Road Network Description Standard (latest: 1.8)",
        "title_cn": "ASAM OpenDRIVE — 道路网络描述标准（当前 1.8 版）",
        "url": "https://www.asam.net/standards/detail/opendrive/",
        "automation_level": ["L1", "L2", "L3", "L4", "L5"],
        "topics": ["testing", "scenario_description"],
        "summary_en": "XML-based format for logical description of road networks. Includes road geometry, lane topology, signals, objects. Underpins virtually all AD simulation tools and HD map conversion pipelines. Originally released 2006, continuously evolving.",
        "summary_cn": "基于 XML 的逻辑路网描述格式。涵盖道路几何、车道拓扑、信号、对象等。几乎所有 AD 仿真工具和 HD 地图转换流水线的基础。2006 年首发，持续演进。",
        "impact_note": "与 OpenSCENARIO 配合构成场景仿真的静态 + 动态两大支柱。OpenDRIVE 1.8（2023）扩展了驾驶员辅助相关元素（如限制区域、车道类型）。",
        "related_standards": ["ASAM OpenSCENARIO", "ASAM OpenCRG", "NDS (Navigation Data Standard)"],
        "last_updated": TODAY,
    },
    # ---- ASAM OSI ----
    {
        "id": "STD-ASAM-2017-001",
        "date": "2017-06-01",
        "org": "ASAM",
        "jurisdiction": "industry_org",
        "type": "standard",
        "status": "in_force",
        "title_en": "ASAM OSI (Open Simulation Interface) — Sensor Model Interface Standard",
        "title_cn": "ASAM OSI（开放仿真接口）— 传感器模型接口标准",
        "url": "https://www.asam.net/standards/detail/osi/",
        "automation_level": ["L2", "L3", "L4"],
        "topics": ["testing", "perception", "scenario_description"],
        "summary_en": "Protobuf-based interface between sensor models, environment models, and HAD functions in simulation. Enables plug-and-play integration of perception simulators from different vendors. Originated as BMW OSI, transferred to ASAM in 2019.",
        "summary_cn": "基于 Protobuf 的仿真内接口标准，连接传感器模型、环境模型和高度自动驾驶功能。支持不同厂商感知仿真器的即插即用集成。起源于宝马 OSI，2019 年移交 ASAM。",
        "impact_note": "PEGASUS 项目的关键基础设施之一。与 OpenSCENARIO/OpenDRIVE 形成开放仿真生态。",
        "related_standards": ["ASAM OpenSCENARIO", "ASAM OpenDRIVE", "PEGASUS"],
        "last_updated": TODAY,
    },
    # ---- VDA TISAX ----
    {
        "id": "STD-VDA-2017-001",
        "date": "2017-01-01",
        "org": "VDA",
        "org_full": "Verband der Automobilindustrie (German Association of the Automotive Industry)",
        "jurisdiction": "industry_org",
        "type": "standard",
        "status": "in_force",
        "title_en": "VDA ISA / TISAX — Trusted Information Security Assessment Exchange",
        "title_cn": "VDA ISA / TISAX — 可信信息安全评估交换",
        "url": "https://www.vda.de/en/topics/environment-and-climate/digitalisation-and-cybersecurity/tisax",
        "automation_level": ["L0", "L1", "L2", "L3", "L4", "L5"],
        "topics": ["cybersecurity", "privacy"],
        "summary_en": "De-facto info-security assessment standard for automotive supply chain. Based on ISO/IEC 27001 but tailored for automotive needs (prototype protection, data handling for connected vehicles). Managed by ENX Association.",
        "summary_cn": "汽车供应链信息安全事实评估标准。基于 ISO/IEC 27001 但针对汽车行业定制（原型保护、网联车辆数据处理）。由 ENX 协会管理。",
        "impact_note": "大多数 OEM 要求 Tier 1/2 供应商达到 TISAX 认证。与 ISO/SAE 21434 cybersecurity engineering 互为补充（一个是过程认证，一个是工程过程）。",
        "related_standards": ["ISO/IEC 27001", "ISO/SAE 21434", "UN-R155"],
        "last_updated": TODAY,
    },
    # ---- AUTOSAR Adaptive Platform ----
    {
        "id": "STD-AUTOSAR-2017-001",
        "date": "2017-03-01",
        "org": "AUTOSAR",
        "org_full": "AUTOSAR Development Partnership",
        "jurisdiction": "industry_org",
        "type": "standard",
        "status": "in_force",
        "title_en": "AUTOSAR Adaptive Platform — POSIX-based SOA for High-Performance Computing ECUs",
        "title_cn": "AUTOSAR Adaptive Platform — 面向高性能计算 ECU 的 POSIX SOA 架构",
        "url": "https://www.autosar.org/standards/adaptive-platform",
        "automation_level": ["L3", "L4", "L5"],
        "topics": ["functional_safety", "cybersecurity"],
        "summary_en": "AUTOSAR's solution for high-performance ECUs supporting L3+ automated driving. Built on POSIX OS (typically Linux/PikeOS), Service-Oriented Architecture (SOA), dynamic binding. Classic Platform handles real-time ECUs (engine, brake), Adaptive handles compute-intensive functions (perception, planning).",
        "summary_cn": "AUTOSAR 面向 L3+ 自动驾驶高性能 ECU 的解决方案。基于 POSIX 操作系统（通常 Linux/PikeOS）、面向服务架构（SOA）、动态绑定。Classic 平台处理实时 ECU（发动机、制动），Adaptive 处理计算密集型功能（感知、规划）。",
        "impact_note": "中国主机厂（蔚来、小鹏、理想、比亚迪）几乎均在 Adaptive Platform 基础上搭建自研中央计算平台。与 ISO 26262 功能安全、ISO/SAE 21434 cybersecurity 要求协同。",
        "related_standards": ["ISO 26262", "ISO/SAE 21434", "AUTOSAR Classic"],
        "last_updated": TODAY,
    },
    # ---- 5GAA ----
    {
        "id": "STD-5GAA-2020-001",
        "date": "2020-03-01",
        "org": "5GAA",
        "org_full": "5G Automotive Association",
        "jurisdiction": "industry_org",
        "type": "white_paper",
        "status": "published",
        "title_en": "5GAA C-V2X Use Cases and Service Level Requirements (White Paper)",
        "title_cn": "5GAA C-V2X 用例与服务等级要求（白皮书）",
        "url": "https://5gaa.org/content/uploads/2020/12/5GAA_T-200111_TR_C-V2X_Use_Cases_and_Service_Level_Requirements_Vol_I-V2-clean.pdf",
        "automation_level": ["L2", "L3", "L4"],
        "topics": ["v2x", "operations"],
        "summary_en": "Key 5GAA reference document defining C-V2X use cases (cooperative awareness, intersection, VRU, platooning, cooperative maneuvers, teleoperation) with corresponding latency/reliability/throughput requirements. Input to 3GPP C-V2X specs.",
        "summary_cn": "5GAA 核心参考文档，定义 C-V2X 用例（协作感知、交叉口、VRU、编队、协作策略、远程操控）及对应延迟/可靠性/吞吐量要求。3GPP C-V2X 规范的输入。",
        "impact_note": "Teleoperation 章节直接对应中国国标与 IEEE 远程操控标准制定的技术参考。Volume II/III 后续扩展覆盖 5G NR C-V2X。",
        "related_standards": ["3GPP TS 22.186", "IEEE 1609"],
        "last_updated": TODAY,
    },
    # ---- C-NCAP 2024 baseline ----
    {
        "id": "STD-CATARC-2024-001",
        "date": "2024-01-01",
        "org": "CATARC",
        "org_full": "China Automotive Technology and Research Center (C-NCAP Management Center)",
        "jurisdiction": "china",
        "type": "standard",
        "status": "in_force",
        "title_en": "C-NCAP Management Rules (2024 Edition)",
        "title_cn": "C-NCAP 管理规则（2024 年版）",
        "url": "https://www.c-ncap.org.cn/article-detail/1706952133057822722?type=2",
        "effective_date": "2024-07-01",
        "automation_level": ["L0", "L1", "L2"],
        "topics": ["testing", "perception", "hmi"],
        "summary_en": "Current C-NCAP edition (in force). Triennial revision from 2021. Expanded active safety (AEB C2C/VRU, ELK curve, LSS), added cabin monitoring (DMS, OMS). Foundation replaced by C-NCAP 2027 which shifts to scenario-driven paradigm.",
        "summary_cn": "C-NCAP 现行版（2021 版三年更新）。扩展主动安全（车车/VRU AEB、弯道 ELK、车道支持系统），新增座舱监控（DMS、OMS）。被 C-NCAP 2027 迭代，2027 版转向场景驱动范式。",
        "impact_note": "中国所有新车上市前的事实门槛之一。连接 GB 强标与更高阶场景测评的中间层。",
        "related_standards": ["C-NCAP 2027 (draft)", "GB AEB (upcoming mandatory)", "Euro NCAP Protocol"],
        "last_updated": TODAY,
    },
    # ---- Zhihu interpretation of MIIT draft ----
    {
        "id": "INT-ZHIHU-2025-001",
        "date": "2025-09-20",
        "org": "Zhihu Community",
        "org_full": "Zhihu (知乎) Industry Analyst Community",
        "jurisdiction": "china",
        "type": "interpretation",
        "status": "published",
        "title_en": "Analysis — MIIT Draft Standard on Combined Driving Assistance System Safety Requirements (Zhihu)",
        "title_cn": "《智能网联汽车 组合驾驶辅助系统安全要求》征求意见稿的解析（知乎）",
        "url": "https://zhuanlan.zhihu.com/p/1953399316858271723",
        "automation_level": ["L2"],
        "topics": ["functional_safety", "hmi", "sotif"],
        "summary_en": "Industry-side detailed analysis of MIIT's 2025-09 draft for combined driving assistance safety requirements. Breaks down the three system classifications, HMI requirements, driver state monitoring thresholds, and compliance challenges for OEMs.",
        "summary_cn": "对工信部 2025-09 组合驾驶辅助安全要求征求意见稿的行业视角详细解读。拆解三类系统分类、HMI 要求、驾驶员状态监测阈值，以及 OEM 的合规挑战。",
        "impact_note": "独立第三方视角，便于理解监管意图与产品层面的影响。⚠️[知乎文章，非官方解读]",
        "related_standards": ["MIIT 2025-09-17 征求意见稿", "MIIT 2026-04-16 报批稿"],
        "last_updated": TODAY,
    },
    # ---- CATARC C-NCAP 2027 interpretation ----
    {
        "id": "INT-CATARC-2026-001",
        "date": "2026-04-10",
        "org": "CATARC Tech",
        "org_full": "CATARC Technology (中汽研科技)",
        "jurisdiction": "china",
        "type": "interpretation",
        "status": "published",
        "title_en": "Interpretation — C-NCAP 2027 Appendix Q AEB Extension Scenarios",
        "title_cn": "2027 版 C-NCAP 征求意见稿附录 Q AEB 拓展场景解析",
        "url": "https://www.catarc.tech/xwzxDetail/34a685e123ff4846a1655577577d24b4",
        "automation_level": ["L1", "L2"],
        "topics": ["testing", "perception", "sotif"],
        "summary_en": "Official CATARC interpretation of the 9 AEB extension scenarios in C-NCAP 2027 Appendix Q. Explains test rationale, target objects (agricultural three-wheeler, shared bicycles, crouching children), and nighttime VRU scenarios.",
        "summary_cn": "中汽研科技对 C-NCAP 2027 附录 Q 的 9 项 AEB 拓展场景的官方解读。解释测试动机、目标物（农用三轮车、共享单车、蹲姿儿童）和夜间 VRU 场景。",
        "impact_note": "由 C-NCAP 归口单位中汽研撰写，解读权威性强。OEM 产品规划与场景库建设的直接参考。",
        "related_standards": ["C-NCAP 2027 (draft)", "GB AEB"],
        "last_updated": TODAY,
    },
    # ---- Euro NCAP 2026 Roadmap interpretation ----
    {
        "id": "INT-ENCAP-2023-001",
        "date": "2023-09-07",
        "org": "Euro NCAP",
        "jurisdiction": "eu",
        "type": "interpretation",
        "status": "published",
        "title_en": "Euro NCAP Vision 2030 Roadmap — Assisted & Automated Driving",
        "title_cn": "Euro NCAP Vision 2030 路线图 — 辅助与自动驾驶",
        "url": "https://www.euroncap.com/en/press-media/press-releases/new-euro-ncap-safety-requirements-launched-today/",
        "automation_level": ["L0", "L1", "L2", "L3"],
        "topics": ["testing", "hmi", "sotif"],
        "summary_en": "Euro NCAP's long-term roadmap document explaining the progression from 2026 to 2030 protocols. Covers how assisted driving grading, cabin monitoring, and L3 readiness evaluations will evolve.",
        "summary_cn": "Euro NCAP 的长期路线图文件，解释 2026 到 2030 测评规程的演进。涵盖辅助驾驶测评、座舱监控、L3 就绪评估的演变方向。",
        "impact_note": "Vision 2030 是 OEM 平台规划的关键参考，每年更新年度测评规程都据此推进。",
        "related_standards": ["Euro NCAP Assisted Driving Grading", "C-NCAP 2027"],
        "last_updated": TODAY,
    },
]


def main() -> int:
    written = 0
    skipped = 0
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
    print(f"\nDone. {written} new, {skipped} skipped.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
