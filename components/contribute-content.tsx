"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";

const ROLE_OPTIONS_ZH = [
  "标准法规工作经验",
  "功能安全 / SOTIF / 安全论证",
  "测试评价 / NCAP / 场景库",
  "数据源与链接核验",
  "开源项目维护 / 前端 / 自动化",
  "团队 / 组织 / 公司接管维护",
  "内容共创 / 公众号 / Blog",
];

const ROLE_OPTIONS_EN = [
  "Standards / regulatory affairs",
  "Functional safety / SOTIF / safety case",
  "Testing / NCAP / scenario libraries",
  "Source verification and data quality",
  "Open-source maintenance / frontend / automation",
  "Team / organization / company stewardship",
  "Content collaboration / blog writing",
];

export default function ContributeContent() {
  const { lang } = useI18n();
  const zh = lang === "zh";
  const roles = zh ? ROLE_OPTIONS_ZH : ROLE_OPTIONS_EN;
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [note, setNote] = useState("");

  useEffect(() => {
    setSelectedRole(roles[0]);
  }, [roles]);

  const mailto = useMemo(() => {
    const subject = zh
      ? "我想共同维护 AD Standards Tracker"
      : "I would like to help maintain AD Standards Tracker";
    const body = zh
      ? [
          `姓名/称呼：${name || ""}`,
          `可贡献方向：${selectedRole}`,
          "",
          "个人、团队、组织或公司背景：",
          "",
          "相关标准/安全工作经验，或接管维护设想：",
          note || "",
          "",
          "项目链接：https://standards.autozyx.com",
        ].join("\n")
      : [
          `Name: ${name || ""}`,
          `Contribution area: ${selectedRole}`,
          "",
          "Individual, team, organization, or company background:",
          "",
          "Relevant standards/safety experience, or stewardship proposal:",
          note || "",
          "",
          "Project: https://standards.autozyx.com",
        ].join("\n");

    return `mailto:zhangyuxin@jlu.edu.cn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [name, note, selectedRole, zh]);

  return (
    <div className="max-w-4xl">
      <section className="mb-10">
        <p className="text-sm text-[var(--accent)] font-medium mb-3">
          {zh ? "开源接力 / 行业共建" : "Open-source stewardship"}
        </p>
        <h1 className="text-3xl mb-3">
          {zh ? "共同维护 AD Standards Tracker" : "Help Maintain AD Standards Tracker"}
        </h1>
        <p className="text-[var(--muted)] leading-relaxed max-w-3xl">
          {zh
            ? "这个项目希望成为面向自动驾驶安全标准、法规和测评规程的行业共享平台。个人时间有限，后续既欢迎有标准工作经验的个人一起维护，也欢迎高校团队、行业组织、测试机构、企业或社区接管维护。我可以把项目资料、维护方法和必要权限完全免费交接出来，前提是继续保持开源、准确和行业共享。"
            : "This project aims to become a shared industry platform for automated-driving safety standards, regulations, and assessment protocols. Individual contributors are welcome, and university teams, industry organizations, test houses, companies, or open communities are also welcome to take over stewardship. I am willing to hand over project materials, maintenance methods, and necessary access for free, provided the project remains open, accurate, and industry-shared."}
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <ContributionCard
          title={zh ? "标准与法规核验" : "Standards Review"}
          body={
            zh
              ? "核对 ISO、SAE、IEEE、UL、UNECE、GB、NCAP 等记录的标题、版本、日期、效力和原始链接。"
              : "Verify titles, versions, dates, legal effect, and primary links for ISO, SAE, IEEE, UL, UNECE, GB, and NCAP records."
          }
        />
        <ContributionCard
          title={zh ? "安全工程解读" : "Safety Know-How"}
          body={
            zh
              ? "补充标准边界、工程使用方式、常见误读和安全案例中的证据链，重点关注 AD/ADAS 安全。"
              : "Add scope boundaries, engineering use, common misreadings, and safety-case evidence chains for AD/ADAS safety."
          }
        />
        <ContributionCard
          title={zh ? "工具与自动化" : "Tooling"}
          body={
            zh
              ? "维护 YAML schema、链接检查、数据源清单、爬虫 scaffold、网站 UI 和智能问答上下文。"
              : "Maintain YAML schema, URL checks, source registry, crawler scaffold, website UI, and Ask context."
          }
        />
      </section>

      <section className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-5 mb-10">
        <h2 className="text-xl mb-3">{zh ? "适合谁参与或接管" : "Who This Is For"}</h2>
        <ul className="list-disc pl-5 text-sm leading-relaxed text-[var(--muted)] space-y-2">
          <li>
            {zh
              ? "做过标准、法规、认证、准入、测试评价、功能安全、SOTIF 或安全论证工作。"
              : "People with experience in standards, regulation, certification, type approval, assessment, functional safety, SOTIF, or safety cases."}
          </li>
          <li>
            {zh
              ? "高校课题组、标准化相关团队、测试评价机构、行业组织、开源社区、车企或供应链企业，都可以讨论整体接管或联合维护。"
              : "University groups, standardization teams, test and assessment bodies, industry associations, open communities, OEMs, and suppliers can discuss full stewardship or joint maintenance."}
          </li>
          <li>
            {zh
              ? "愿意把每条信息追溯到原始链接，而不是只转述新闻、PPT 或二手总结。"
              : "People willing to trace each record back to primary sources instead of relying on news, slides, or summaries."}
          </li>
          <li>
            {zh
              ? "认可开源开放、行业共享的方式：数据透明，纠错透明，版本演进透明。"
              : "People who support open industry infrastructure: transparent data, transparent corrections, and transparent version history."}
          </li>
        </ul>
      </section>

      <section className="rounded-lg border border-[var(--accent)] bg-[var(--card-bg)] p-5 mb-10">
        <h2 className="text-xl mb-3">{zh ? "可以免费交接出去" : "Free Stewardship Handover"}</h2>
        <p className="text-sm leading-relaxed text-[var(--muted)] mb-4">
          {zh
            ? "如果有个人、团队、组织或公司愿意长期维护，我愿意完全免费交接这个开源项目。交接内容可以包括仓库维护权、数据结构说明、来源核验流程、部署方式、现有问题清单和后续路线图。"
            : "If an individual, team, organization, or company is willing to maintain it long-term, I am willing to hand over the open-source project for free. The handover can include repository stewardship, data-structure documentation, source-verification workflow, deployment notes, known issues, and roadmap."}
        </p>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {zh
            ? "我不希望它变成一个封闭商业数据库，也不希望它被用于包装不准确的标准解读。更理想的归宿，是由真正懂标准、懂安全、愿意做长期维护的人或机构，把它做成行业公共基础设施。"
            : "I do not want it to become a closed commercial database or a wrapper around inaccurate interpretations. The ideal home is a maintainer or institution that understands standards, understands safety, and is willing to turn it into shared industry infrastructure."}
        </p>
      </section>

      <section className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-5 mb-10">
        <h2 className="text-xl mb-3">{zh ? "可以逐步接管的工作包" : "Maintainer Workstreams"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm leading-relaxed text-[var(--muted)]">
          <p>
            {zh
              ? "数据源维护：认领 ISO/SAE/IEEE/UNECE/中国 GB/NCAP/ASAM 等一个或几个来源，定期核验新增、修订和链接状态。"
              : "Source ownership: take responsibility for one or more sources such as ISO, SAE, IEEE, UNECE, China GB, NCAP, or ASAM, and periodically verify updates and links."}
          </p>
          <p>
            {zh
              ? "专业解读维护：围绕功能安全、SOTIF、安全论证、测评场景、准入合规等主题，补充边界、误读风险和工程使用方式。"
              : "Know-how ownership: enrich scope boundaries, misreading risks, and engineering use around functional safety, SOTIF, safety cases, assessment scenarios, and type approval."}
          </p>
          <p>
            {zh
              ? "工具维护：改进 schema、URL 检查、数据导入脚本、CI、智能问答上下文和网站呈现。"
              : "Tooling ownership: improve schema, URL checks, import scripts, CI, Ask context, and website presentation."}
          </p>
          <p>
            {zh
              ? "内容共创：把项目中的标准地图、专题证据链和方法论沉淀成公众号、Blog、课程或开源文档。"
              : "Content ownership: turn evidence maps, topic chains, and methodology into articles, blog posts, courses, or open documentation."}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-5">
          <h2 className="text-xl mb-3">{zh ? "通过 GitHub 参与" : "Contribute on GitHub"}</h2>
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
            {zh
              ? "适合提交标准纠错、新记录、数据源建议、页面问题和 Pull Request。安全相关条目建议先开 issue 讨论证据边界。"
              : "Use GitHub for corrections, new records, source suggestions, UI issues, and pull requests. For safety-critical records, open an issue first to discuss evidence boundaries."}
          </p>
          <a
            href="https://github.com/AutoZYX-Labs/ad-standards-tracker/issues/new/choose"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white no-underline hover:opacity-90"
          >
            {zh ? "打开 GitHub Issue" : "Open GitHub Issue"}
          </a>
        </div>

        <div className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-5">
          <h2 className="text-xl mb-3">{zh ? "直接联系" : "Contact Directly"}</h2>
          <div className="space-y-3">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={zh ? "姓名/称呼" : "Name"}
              className="w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
            />
            <select
              value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value)}
              className="w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder={zh ? "简单说明你的相关经验、团队背景，或希望如何接管/共同维护" : "Briefly describe your experience, team background, or stewardship proposal"}
              rows={4}
              className="w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-2 text-sm"
            />
            <a
              href={mailto}
              className="inline-flex rounded-md border border-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--accent)] no-underline hover:bg-[var(--accent)] hover:text-white"
            >
              {zh ? "生成邮件" : "Create Email"}
            </a>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-[var(--border)] bg-[var(--badge-bg)] p-5">
        <h2 className="text-xl mb-3">{zh ? "维护原则" : "Maintenance Principles"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-[var(--muted)] leading-relaxed">
          <p>{zh ? "宁可少收录，也不放无法核验的标准号和链接。" : "Fewer records are better than unverifiable standard numbers or links."}</p>
          <p>{zh ? "标准、法规、测评规程、征求意见和解读必须分层。" : "Standards, regulations, assessment protocols, drafts, and interpretations must remain separated."}</p>
          <p>{zh ? "安全相关内容必须说明适用边界和工程使用方式。" : "Safety-related content must explain scope boundaries and engineering use."}</p>
        </div>
      </section>

      <div className="mt-8">
        <Link href="/standards" className="text-sm text-[var(--accent)] no-underline hover:underline">
          {zh ? "查看当前标准库 →" : "View current database →"}
        </Link>
      </div>
    </div>
  );
}

function ContributionCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-5">
      <h2 className="text-base mb-2">{title}</h2>
      <p className="text-sm leading-relaxed text-[var(--muted)]">{body}</p>
    </div>
  );
}
