#!/usr/bin/env python3
"""Seed initial YAML records across 25 P0 sources.

Writes standards/{jurisdiction}/{year}/{id}.yaml based on a
curated dataset of real standards and regulatory events.
"""
import os
import yaml
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "standards"

CONTRIBUTOR = "AD Standards Tracker Seed / Zhang Yuxin"
LAST_UPDATED = "2026-04-16"

# Flat list; file paths derived from jurisdiction/year/id
RECORDS = [
    # === US NHTSA ===
    {
        "id": "STD-NHTSA-2021-001",
        "date": "2021-06-29",
        "org": "NHTSA",
        "org_full": "National Highway Traffic Safety Administration",
        "jurisdiction": "us",
        "type": "policy",
        "status": "in_force",
        "title_en": "Standing General Order 2021-01 — Crash Reporting for Level 2 ADAS and ADS Vehicles",
        "title_cn": "NHTSA Standing General Order 2021-01 对 L2 辅助驾驶和自动驾驶系统车辆的碰撞强制报告令",
        "url": "https://www.nhtsa.gov/laws-regulations/standing-general-order-crash-reporting",
        "effective_date": "2021-06-29",
        "automation_level": ["L2", "L3", "L4"],
        "topics": ["data_recording", "operations"],
        "summary_en": "Requires manufacturers and operators to report crashes within 1-10 days when an ADS or Level 2 ADAS was engaged within 30 seconds of the crash. Source of NHTSA's public crash data on Tesla Autopilot and Robotaxi incidents.",
        "summary_cn": "要求制造商和运营商在事故发生前 30 秒内有 ADS 或 L2 辅助驾驶介入的情况下，于 1-10 日内报告碰撞。是 NHTSA 关于特斯拉 Autopilot 和 Robotaxi 事故的公开数据来源。",
        "impact_note": "Feeds much of ROAM's Tier 2 data. First systematic US federal reporting requirement for ADS incidents.",
        "related_standards": ["FMVSS 127", "49 CFR 579"],
    },
    {
        "id": "STD-NHTSA-2024-001",
        "date": "2024-04-17",
        "org": "NHTSA",
        "org_full": "National Highway Traffic Safety Administration",
        "jurisdiction": "us",
        "type": "regulation",
        "status": "in_force",
        "title_en": "FMVSS 127 — Automatic Emergency Braking Systems for Light Vehicles",
        "title_cn": "FMVSS 127 轻型车自动紧急制动系统",
        "url": "https://www.federalregister.gov/documents/2024/05/09/2024-09379/federal-motor-vehicle-safety-standards-automatic-emergency-braking",
        "effective_date": "2029-09-01",
        "automation_level": ["L0", "L1", "L2"],
        "topics": ["functional_safety", "perception"],
        "summary_en": "Final rule mandating AEB with pedestrian detection on all new light vehicles in the US, with aggressive performance requirements (up to 62 mph in vehicle-to-vehicle, 45 mph pedestrian detection at night). Effective September 2029.",
        "summary_cn": "强制所有在美销售的新轻型车配备含行人检测功能的 AEB，性能要求严格（车对车最高 62 mph，夜间行人检测 45 mph）。2029 年 9 月生效。",
        "impact_note": "Most aggressive AEB mandate globally. Affects all OEMs selling in US, including Chinese brands entering US market.",
        "related_standards": ["Euro NCAP AEB", "ISO 22733"],
    },
    {
        "id": "STD-NHTSA-2025-001",
        "date": "2025-07-01",
        "org": "NHTSA",
        "org_full": "National Highway Traffic Safety Administration",
        "jurisdiction": "us",
        "type": "research",
        "status": "published",
        "title_en": "Report to Congress — NHTSA Research and Rulemaking on Automated Driving Systems (July 2025)",
        "title_cn": "NHTSA 提交国会报告：自动驾驶系统研究与规则制定（2025 年 7 月）",
        "url": "https://www.nhtsa.gov/sites/nhtsa.gov/files/2025-07/report-congress-research-rulemaking-automated-driving-systems-july-2025-tag.pdf",
        "automation_level": ["L3", "L4"],
        "topics": ["testing", "type_approval", "operations"],
        "summary_en": "Congressional report outlining NHTSA's ongoing research and regulatory roadmap for ADS: third-generation exemption program for non-traditional ADS-only vehicles, automated driving framework, operational design domain regulations.",
        "summary_cn": "NHTSA 向美国国会的报告，概述自动驾驶系统研究与监管路线图：无传统驾驶位的第三代 ADS 车辆豁免计划、自动驾驶监管框架、运行设计域规则。",
        "impact_note": "Signals direction of US federal ADS regulation through 2027-2028.",
    },

    # === California DMV ===
    {
        "id": "STD-CA-DMV-2024-001",
        "date": "2024-10-15",
        "org": "California DMV",
        "org_full": "California Department of Motor Vehicles — Autonomous Vehicles Branch",
        "jurisdiction": "us",
        "type": "regulation",
        "status": "consultation",
        "title_en": "Proposed Amendments to Deployment Regulations for Autonomous Heavy-Duty Vehicles",
        "title_cn": "加州自动驾驶重型车部署规则修订草案（征求意见）",
        "url": "https://www.dmv.ca.gov/portal/vehicle-industry-services/autonomous-vehicles/",
        "automation_level": ["L4"],
        "topics": ["operations", "type_approval"],
        "summary_en": "California's proposed framework for permitting autonomous trucks (Class 8) on public roads. Defines testing requirements, insurance thresholds, operational design domain restrictions.",
        "summary_cn": "加州对 8 级自动驾驶卡车在公开道路测试部署的提议框架，定义测试要求、保险门槛、运行设计域限制。",
        "impact_note": "Opens California to autonomous trucking (previously excluded). Affects Kodiak, Waymo Via, Aurora, TuSimple.",
    },
    {
        "id": "STD-CA-DMV-2025-001",
        "date": "2025-03-01",
        "org": "California DMV",
        "org_full": "California Department of Motor Vehicles — Autonomous Vehicles Branch",
        "jurisdiction": "us",
        "type": "policy",
        "status": "in_force",
        "title_en": "Updated Disengagement Reporting Requirements — Annual filings FY2024-2025",
        "title_cn": "加州自动驾驶脱离报告要求更新 FY2024-2025 年度申报",
        "url": "https://www.dmv.ca.gov/portal/vehicle-industry-services/autonomous-vehicles/disengagement-reports/",
        "automation_level": ["L3", "L4"],
        "topics": ["data_recording", "operations"],
        "summary_en": "Annual disengagement report covering Dec 2024 - Nov 2025. Waymo, Cruise (partial), Zoox, Apollo, Pony.ai, WeRide, AutoX all reported miles driven, disengagement counts, and categorized causes.",
        "summary_cn": "覆盖 2024 年 12 月至 2025 年 11 月的年度脱离报告。Waymo、Cruise（部分）、Zoox、Apollo、小马智行、文远知行、AutoX 均提交了里程数、脱离次数和分类原因。",
        "impact_note": "Only publicly available global dataset comparing ADS performance across operators. Heavily cited in academia.",
    },

    # === SAE ===
    {
        "id": "STD-SAE-2021-001",
        "date": "2021-05-03",
        "org": "SAE International",
        "org_full": "SAE International",
        "jurisdiction": "us",
        "type": "standard",
        "status": "in_force",
        "title_en": "SAE J3016_202104 — Taxonomy and Definitions for Terms Related to Driving Automation Systems for On-Road Motor Vehicles",
        "title_cn": "SAE J3016_202104 道路机动车辆驾驶自动化系统相关术语分类与定义",
        "url": "https://www.sae.org/standards/content/j3016_202104/",
        "effective_date": "2021-05-03",
        "automation_level": ["L0", "L1", "L2", "L3", "L4", "L5"],
        "topics": ["type_approval"],
        "summary_en": "Defines the six levels of driving automation (L0-L5). The industry reference for 'Level N' terminology. Revised 2021-04 with improved L3/L4 boundary.",
        "summary_cn": "定义六级驾驶自动化（L0-L5），行业 'Level N' 术语的标准参考。2021-04 修订版改进了 L3/L4 分级界限。",
        "impact_note": "Adopted by virtually all national regulators (NHTSA, UNECE, SAC/TC114). Foundational terminology for the industry.",
        "related_standards": ["GB/T 40429", "ISO 22737"],
    },
    {
        "id": "STD-SAE-2024-001",
        "date": "2024-09-15",
        "org": "SAE International",
        "org_full": "SAE International",
        "jurisdiction": "us",
        "type": "standard",
        "status": "published",
        "title_en": "SAE J3237 — Operational Safety Metrics for Verification and Validation of Automated Driving Systems",
        "title_cn": "SAE J3237 自动驾驶系统验证与确认的运行安全指标",
        "url": "https://www.sae.org/standards/content/j3237/",
        "effective_date": "2024-09-15",
        "automation_level": ["L3", "L4"],
        "topics": ["testing", "sotif"],
        "summary_en": "Defines safety performance indicators (SPIs) and operational safety metrics for ADS V&V. Bridges SOTIF (ISO 21448) and UL 4600. Includes metrics for collision avoidance, traffic rule compliance, minimum risk maneuvers.",
        "summary_cn": "为自动驾驶系统的验证与确认定义安全性能指标（SPI）与运行安全指标，连接 SOTIF（ISO 21448）与 UL 4600。指标覆盖碰撞避免、交规遵守、最小风险策略。",
        "impact_note": "Expected to become the de facto US V&V metrics reference. Directly applicable to Robotaxi safety case construction.",
        "related_standards": ["UL 4600", "ISO 21448", "IEEE 2846"],
    },

    # === UL ===
    {
        "id": "STD-UL-2023-001",
        "date": "2023-03-17",
        "org": "UL",
        "org_full": "UL Standards & Engagement",
        "jurisdiction": "us",
        "type": "standard",
        "status": "published",
        "title_en": "UL 4600 Edition 3 — Standard for Safety for the Evaluation of Autonomous Products",
        "title_cn": "UL 4600 第三版 自动驾驶产品安全评估标准",
        "url": "https://ulse.org/focus-areas/travel-safety/autonomous-vehicles/",
        "effective_date": "2023-03-17",
        "automation_level": ["L3", "L4", "L5"],
        "topics": ["functional_safety", "sotif", "testing"],
        "summary_en": "Edition 3 updates: autonomous trucking coverage, refined Safety Performance Indicators (SPIs), new requirements for post-incident behavior. Goal-based and technology-agnostic standard by Prof. Phil Koopman (CMU) and colleagues.",
        "summary_cn": "第三版更新：增加自动驾驶卡车覆盖范围、细化安全性能指标（SPI）、新增事故后行为要求。由 CMU 的 Philip Koopman 教授团队牵头制定，目标导向、技术无关。",
        "impact_note": "Industry gold standard for autonomous product safety case. Heavily influenced ROAM's 3-layer architecture and KPI framework.",
        "related_standards": ["ISO 21448", "ISO 26262", "SAE J3237"],
    },

    # === IEEE ===
    {
        "id": "STD-IEEE-2022-001",
        "date": "2022-04-22",
        "org": "IEEE SA",
        "org_full": "IEEE Standards Association",
        "jurisdiction": "us",
        "type": "standard",
        "status": "in_force",
        "title_en": "IEEE 2846-2022 — Standard for Assumptions in Safety-Related Models for Automated Driving Systems",
        "title_cn": "IEEE 2846-2022 自动驾驶系统安全相关模型假设标准",
        "url": "https://ieeexplore.ieee.org/document/9761121/",
        "effective_date": "2022-04-22",
        "automation_level": ["L3", "L4"],
        "topics": ["sotif", "testing"],
        "summary_en": "Defines minimum set of reasonable assumptions and foreseeable scenarios that safety-related models in ADS shall consider. Framework for car-following, adjacent vehicles, intersections, occlusion scenarios with pedestrians and bicyclists.",
        "summary_cn": "规定自动驾驶系统的安全相关模型应考虑的最小合理假设与可预见场景集。框架覆盖跟车、邻车、交叉口、行人与骑行者的遮挡场景。",
        "impact_note": "Developed by Intel/Mobileye (RSS model) and others. Widely referenced in ADS safety argumentation.",
        "related_standards": ["ISO 34502", "RSS", "SAE J3237"],
    },

    # === EU / Euro NCAP / UK ===
    {
        "id": "STD-EC-2022-001",
        "date": "2022-08-05",
        "org": "European Commission",
        "org_full": "European Commission - DG MOVE",
        "jurisdiction": "eu",
        "type": "regulation",
        "status": "in_force",
        "title_en": "Commission Implementing Regulation (EU) 2022/1426 — Uniform procedures for EU type-approval of ADS",
        "title_cn": "欧盟委员会 2022/1426 实施条例：自动驾驶系统欧盟型式认证统一程序",
        "url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022R1426",
        "effective_date": "2022-09-06",
        "automation_level": ["L3", "L4"],
        "topics": ["type_approval", "data_recording"],
        "summary_en": "First EU-level framework allowing type approval of L3/L4 ADS through 'innovative vehicle' pathway. Defines required documentation, testing, and reporting obligations.",
        "summary_cn": "欧盟首个允许 L3/L4 自动驾驶系统通过'创新车辆'路径进行型式认证的法规，定义所需文档、测试与报告义务。",
        "impact_note": "Enabled Mercedes DRIVE PILOT (Germany) and upcoming EU L3 approvals for BMW, Volvo, NIO.",
        "related_standards": ["UN-R157", "UN-R155", "UN-R156"],
    },
    {
        "id": "STD-EC-2024-001",
        "date": "2024-08-01",
        "org": "European Commission",
        "org_full": "European Commission",
        "jurisdiction": "eu",
        "type": "regulation",
        "status": "in_force",
        "title_en": "EU AI Act (Regulation 2024/1689) — Implications for automotive AI components",
        "title_cn": "欧盟人工智能法案（2024/1689）对汽车 AI 组件的影响",
        "url": "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:L_202401689",
        "effective_date": "2024-08-01",
        "automation_level": ["L2", "L3", "L4"],
        "topics": ["ai_governance", "cybersecurity"],
        "summary_en": "Horizontal AI regulation. AI systems in vehicles (L2+ ADAS, ADS) fall under 'high-risk AI' and must comply with conformity assessment, data governance, human oversight, robustness, cybersecurity requirements.",
        "summary_cn": "欧盟横向 AI 监管法规。车载 AI 系统（L2+ ADAS、ADS）属于'高风险 AI'，需满足合规评估、数据治理、人工监督、稳健性、网络安全要求。",
        "impact_note": "Supplements sector-specific regulations (UN-R155, 2022/1426). Imposes transparency and documentation burdens. Compliance required by Aug 2026 for high-risk systems.",
        "related_standards": ["UN-R155", "ISO/IEC 42001"],
    },
    {
        "id": "STD-NCAP-2023-001",
        "date": "2023-10-01",
        "org": "Euro NCAP",
        "org_full": "European New Car Assessment Programme",
        "jurisdiction": "eu",
        "type": "standard",
        "status": "in_force",
        "title_en": "Euro NCAP Assisted Driving Test Protocol v1.2 — Consumer rating for L2 systems",
        "title_cn": "Euro NCAP 辅助驾驶测评方案 v1.2：L2 系统的消费者评分",
        "url": "https://www.euroncap.com/en/for-engineers/protocols/assisted-driving/",
        "effective_date": "2023-10-01",
        "automation_level": ["L2"],
        "topics": ["testing", "hmi"],
        "summary_en": "Assessment protocol rating L2 ADAS systems on driver engagement, assistance competence, and safety backup. First major scheme to publish consumer-facing ratings of partial automation. Tesla Autopilot, Mercedes ABC, BMW DAP all tested.",
        "summary_cn": "对 L2 辅助驾驶系统的消费者评分方案，从驾驶员参与、辅助能力、安全兜底三维度打分。首个主要公开 L2 评分的测评体系。特斯拉 Autopilot、奔驰 ABC、宝马 DAP 均已测评。",
        "impact_note": "Strong market impact. Chinese OEMs entering EU must pass Euro NCAP. China's C-NCAP and i-VISTA use similar methodology.",
        "related_standards": ["C-NCAP", "i-VISTA", "UN-R79"],
    },
    {
        "id": "STD-NCAP-2025-001",
        "date": "2025-01-10",
        "org": "Euro NCAP",
        "org_full": "European New Car Assessment Programme",
        "jurisdiction": "eu",
        "type": "white_paper",
        "status": "published",
        "title_en": "Euro NCAP Roadmap 2026-2030 — Adding Automated Driving assessment",
        "title_cn": "Euro NCAP 2026-2030 路线图：纳入自动驾驶评估",
        "url": "https://www.euroncap.com/en/press-media/press-releases/",
        "effective_date": "2026-01-01",
        "automation_level": ["L2", "L3"],
        "topics": ["testing"],
        "summary_en": "Roadmap expanding from ADAS-focused L2 assessment to Automated Driving Assessment (ADA) for L3 systems. New test scenarios for minimum risk maneuver, fallback behavior, driver takeover.",
        "summary_cn": "从专注 L2 辅助驾驶测评扩展到针对 L3 系统的自动驾驶评估。新增最小风险策略、失效回退、驾驶员接管等测试场景。",
        "impact_note": "Will shape the next wave of consumer-facing AD metrics globally. C-NCAP and i-VISTA expected to follow.",
        "related_standards": ["UN-R157", "ISO 34502"],
    },
    {
        "id": "STD-UK-2024-001",
        "date": "2024-05-20",
        "org": "UK CCAV",
        "org_full": "UK Centre for Connected and Autonomous Vehicles",
        "jurisdiction": "uk",
        "type": "regulation",
        "status": "in_force",
        "title_en": "UK Automated Vehicles Act 2024",
        "title_cn": "英国 2024 年自动驾驶汽车法案",
        "url": "https://www.legislation.gov.uk/ukpga/2024/10/enacted",
        "effective_date": "2024-05-20",
        "automation_level": ["L3", "L4"],
        "topics": ["type_approval", "operations"],
        "summary_en": "Creates Authorised Self-Driving Entity (ASDE) regime. Shifts liability from driver to ASDE for self-driving vehicles. Defines 'user-in-charge' and 'no-user-in-charge' scenarios and establishes safety regulator.",
        "summary_cn": "建立'授权自动驾驶实体（ASDE）'制度。在自动驾驶状态下将法律责任从驾驶员转移到 ASDE。定义'有责任用户'与'无责任用户'场景，并设立安全监管机构。",
        "impact_note": "Most comprehensive legal framework for L4 operation outside China. Provides ADSE template adopted/studied by Japan, Korea.",
        "related_standards": ["BSI PAS 1881", "UN-R157"],
    },

    # === Japan ===
    {
        "id": "STD-METI-2024-001",
        "date": "2024-06-13",
        "org": "METI Japan",
        "org_full": "Ministry of Economy, Trade and Industry of Japan",
        "jurisdiction": "japan",
        "type": "policy",
        "status": "in_force",
        "title_en": "Mobility Roadmap 2024 — Japan's National Strategy for L4 Automated Driving Services",
        "title_cn": "日本 2024 年交通出行路线图：Level 4 自动驾驶服务国家战略",
        "url": "https://www.meti.go.jp/english/press/2024/0613_002.html",
        "effective_date": "2024-06-13",
        "automation_level": ["L4"],
        "topics": ["operations", "type_approval"],
        "summary_en": "Japan's inter-ministerial mobility strategy targeting 50 locations with L4 services by 2025 and 100 by 2027. Specifies funding, type approval pathways, operational coordination between METI and MLIT.",
        "summary_cn": "日本多部委联合交通出行战略，目标 2025 年 50 个地点、2027 年 100 个地点部署 L4 服务。明确资金、型式认证路径、METI 与 MLIT 协作方式。",
        "impact_note": "Frames Japan's national commitment to L4 commercialization. Triggered 2024 infrastructure deployments (Tokyo-Nagoya AV lanes).",
    },
    {
        "id": "STD-MLIT-2024-001",
        "date": "2024-06-30",
        "org": "MLIT Japan",
        "org_full": "Ministry of Land, Infrastructure, Transport and Tourism of Japan",
        "jurisdiction": "japan",
        "type": "standard",
        "status": "in_force",
        "title_en": "Safety Assurance Guidelines for Level 4 Passenger and Goods Transport Services",
        "title_cn": "日本 Level 4 载人与载货运输服务安全保证指南",
        "url": "https://www.mlit.go.jp/en/",
        "effective_date": "2024-07-01",
        "automation_level": ["L4"],
        "topics": ["type_approval", "operations", "testing"],
        "summary_en": "Defines socially acceptable safety levels for Japanese L4 passenger and goods services. Formalizes type approval criteria building on JAMA and JASIC industry input.",
        "summary_cn": "定义日本 L4 载人/载货服务的'社会可接受安全水平'，结合 JAMA 与 JASIC 产业输入，形成型式认证正式标准。",
        "impact_note": "Japan's answer to UN-R157 for L4 services. Enables commercialization of Robotaxi / AutoBus in Japan.",
        "related_standards": ["UN-R157", "JASPAR"],
    },
]


def main() -> None:
    written = 0
    for r in RECORDS:
        r.setdefault("contributor", CONTRIBUTOR)
        r.setdefault("last_updated", LAST_UPDATED)
        year = r["date"][:4]
        directory = OUT / r["jurisdiction"] / year
        directory.mkdir(parents=True, exist_ok=True)
        path = directory / f"{r['id']}.yaml"
        with open(path, "w", encoding="utf-8") as f:
            yaml.safe_dump(
                r,
                f,
                allow_unicode=True,
                sort_keys=False,
                default_flow_style=False,
                width=120,
            )
        written += 1

    # Count total files existing (including the ones we wrote manually earlier)
    total = sum(1 for _ in OUT.rglob("*.yaml"))
    print(f"Wrote {written} records; total YAML files in standards/: {total}")


if __name__ == "__main__":
    main()
