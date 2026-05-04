"use client";

import { useI18n } from "@/lib/i18n";

export default function AboutPage() {
  const { lang, t } = useI18n();
  const zh = lang === "zh";

  return (
    <div className="max-w-3xl">
      {/* AI disclaimer — top of page */}
      <div className="rounded-xl border-2 border-[var(--accent)]/40 bg-[var(--accent)]/5 p-5 mb-8">
        <h2 className="text-base font-semibold mb-2 flex items-center gap-2">
          <span>⚠️</span>
          {t("about.ai_disclaimer_title")}
        </h2>
        <p className="text-sm text-[var(--text)] leading-relaxed">
          {t("about.ai_disclaimer")}
        </p>
      </div>

      <h1 className="text-3xl mb-2">
        {zh ? "关于 AD 标准追踪" : "About AD Standards Tracker"}
      </h1>
      <p className="text-[var(--muted)] mb-8">
        {zh
          ? "AD Standards Tracker（自动驾驶标准追踪）是一个开源的自动驾驶安全证据地图，用于结构化监测全球自动驾驶标准、法规、测评规程、草案动态与最佳实践。"
          : "AD Standards Tracker is an open-source safety evidence map for automated driving standards, regulations, assessment protocols, drafts, and best practices."}
      </p>

      <section className="mb-10">
        <h2 className="text-xl mb-3">{zh ? "为什么做这个工具" : "Why this tool"}</h2>
        <ul className="list-disc list-inside text-sm space-y-2 text-[var(--muted)]">
          <li>
            {zh
              ? "车企合规、监管机构、投资人、研究者都需要持续跟踪全球标准动态，但没有一个统一的、中英双语的平台"
              : "OEMs, regulators, investors, and researchers all need to track global standard developments continuously, but no unified bilingual platform exists."}
          </li>
          <li>
            {zh
              ? "标准条款散落在 UN、ISO、SAE、IEEE、UL、各国监管机构、行业组织（ASAM/VDA/AUTOSAR）、地方立法之间，整合门槛高"
              : "Standards are scattered across UN, ISO, SAE, IEEE, UL, national regulators, industry organizations (ASAM/VDA/AUTOSAR), and local legislation; integration barrier is high."}
          </li>
          <li>
            {zh
              ? "中国 GB/T 标准的英文化、国际标准的中文化，都缺乏权威对照来源"
              : "Translation of Chinese GB/T to English and international standards to Chinese lacks authoritative sources."}
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl mb-3">{zh ? "工作方法" : "Methodology"}</h2>
        <ul className="list-disc list-inside text-sm space-y-2 text-[var(--muted)]">
          <li>
            {zh
              ? "多层级数据源：国家/国际标准制定组织（UN/ISO/SAC/TC114/KATS/VDA 等）、行业标准组织（SAE/IEEE/UL/ASAM/AUTOSAR/5GAA 等）、政府监管（MIIT/NHTSA/EC/MLIT/MOLIT）、测评机构（Euro NCAP/C-NCAP/i-VISTA）、示范区（北京/上海/深圳）"
              : "Multi-tier sources: national/international SDOs (UN/ISO/SAC/TC114/KATS/VDA, etc.), industry standards organizations (SAE/IEEE/UL/ASAM/AUTOSAR/5GAA, etc.), government regulators (MIIT/NHTSA/EC/MLIT/MOLIT), assessment bodies (Euro NCAP/C-NCAP/i-VISTA), and demonstration zones (Beijing/Shanghai/Shenzhen)."}
          </li>
          <li>
            {zh
              ? "四类内容分离：技术标准 / 法规与准入规则 / 测评规程 / 最新动态与解读"
              : "Four content layers: technical standards / regulations and type approval / assessment protocols / latest updates and interpretations."}
          </li>
          <li>
            {zh
              ? "高优先级条目标注法律效力、来源类型、证据等级、核验日期和链接状态"
              : "High-priority records include legal effect, source type, evidence level, verification date, and source status."}
          </li>
          <li>
            {zh
              ? "高优先级条目进一步沉淀标准边界、常见误读、工程使用方式和专家判断，避免停留在链接汇总或机器摘要层面"
              : "High-priority records further capture scope boundaries, common misreadings, engineering use, and expert notes instead of stopping at links or generic summaries."}
          </li>
          <li>
            {zh
              ? "仅保留元数据与原文链接；不发布受版权保护的标准全文"
              : "Metadata and links only. No redistribution of copyrighted standard texts."}
          </li>
          <li>
            {zh
              ? "所有记录以 YAML 格式存储在 GitHub 公开仓库，Apache 2.0 许可"
              : "All records stored as YAML in a public GitHub repository under Apache 2.0."}
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl mb-3">{zh ? "引用方式" : "How to cite"}</h2>
        <pre className="rounded-lg bg-[var(--badge-bg)] p-4 text-xs overflow-x-auto font-mono">
{`@misc{zhang2026adstandards,
  title={AD Standards Tracker: Global Monitoring of
         Automated Driving Regulations and Standards},
  author={Zhang, Yuxin},
  year={2026},
  howpublished={\\url{https://standards.autozyx.com}},
  note={Open-source tool under Apache 2.0}
}`}
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-xl mb-3">{zh ? "相关项目" : "Related projects"}</h2>
        <ul className="list-disc list-inside text-sm space-y-2">
          <li>
            <a
              href="https://roam.autozyx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              ROAM Explorer
            </a>
            {" — "}
            {zh
              ? "L4 Robotaxi 远程运营异常管理开源框架（事件数据库 + 场景分类 + 参考架构）"
              : "Open-source framework for L4 robotaxi remote operations and anomaly management."}
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl mb-3">{t("about.author")}</h2>
        <div className="space-y-3 text-sm leading-relaxed text-[var(--text)]">
          <p className="font-medium text-base">{t("about.author_name")}</p>
          <p className="text-[var(--muted)]">{t("about.author_research")}</p>
          <p>
            {t("about.author_homepage")}:{" "}
            <a
              href="https://autozyx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              autozyx.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
