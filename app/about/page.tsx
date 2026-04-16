"use client";

import { useI18n } from "@/lib/i18n";

export default function AboutPage() {
  const { lang } = useI18n();
  const zh = lang === "zh";

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl mb-2">
        {zh ? "关于 AD 标准追踪" : "About AD Standards Tracker"}
      </h1>
      <p className="text-[var(--muted)] mb-8">
        {zh
          ? "AD Standards Tracker（自动驾驶标准追踪）是一个监测全球自动驾驶法规、标准、征求意见与测评动态的开源工具。由张玉新副教授（吉林大学）构建与维护。"
          : "AD Standards Tracker is an open-source tool for monitoring automated driving regulations, standards, consultations, and assessments globally. Built and maintained by Prof. Zhang Yuxin (Jilin University)."}
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
              ? "标准条款散落在 UN、ISO、SAE、IEEE、UL、各国监管机构、地方立法之间，整合门槛高"
              : "Standards are scattered across UN, ISO, SAE, IEEE, UL, national regulators, and local legislation; integration barrier is high."}
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
              ? "25 个 P0 优先级权威数据源（联合国、ISO、SAE、IEEE、UL、NHTSA、CA DMV、中国 SAC/TC114/SC34、CATARC、CAERI、地方示范区、欧盟、Euro NCAP、UK CCAV、日本 METI/MLIT）"
              : "25 P0 authoritative sources (UN, ISO, SAE, IEEE, UL, NHTSA, CA DMV, China SAC/TC114/SC34, CATARC, CAERI, local demonstration zones, EU, Euro NCAP, UK CCAV, Japan METI/MLIT)."}
          </li>
          <li>
            {zh
              ? "每日自动爬取新发布，人工审核与双语解读"
              : "Daily automated crawling of new publications; human review with bilingual commentary."}
          </li>
          <li>
            {zh
              ? "仅保留标准元数据与原文链接；不发布受版权保护的标准全文"
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
  note={Open-source tool under Apache 2.0, complementary
        to ROAM Explorer (https://roam.autozyx.com)}
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
              ROAM
            </a>
            {" — "}
            {zh
              ? "L4 Robotaxi 远程运营异常管理开源框架（事件数据库 + 场景分类 + 参考架构）"
              : "Open-source framework for L4 robotaxi remote operations and anomaly management (incident database, scenario taxonomy, reference architecture)."}
          </li>
          <li>
            <a
              href="https://roam-explorer.autozyx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              ROAM Explorer
            </a>
            {" — "}
            {zh
              ? "ROAM 的交互式前端，含 570+ 条事件的可搜索数据库与 AI 问答"
              : "Interactive frontend for ROAM with 570+ searchable incidents and AI assistant."}
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl mb-3">{zh ? "作者 / 联系方式" : "Author / Contact"}</h2>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {zh ? (
            <>
              张玉新，博士，吉林大学汽车工程学院副教授、自动驾驶安全联合实验室主任。研究方向：SOTIF（ISO 21448）、功能安全（ISO 26262）、场景驱动测试评价。曾任卓驭科技功能安全负责人，驭研科技创始人。
              <br />
              邮箱：{" "}
              <a href="mailto:zhangyuxin@jlu.edu.cn" className="text-[var(--accent)] hover:underline">
                zhangyuxin@jlu.edu.cn
              </a>
              <br />
              个人主页：{" "}
              <a href="https://autozyx.com" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
                autozyx.com
              </a>
            </>
          ) : (
            <>
              Zhang Yuxin, PhD, Associate Professor at the School of Automotive Engineering, Jilin University. Director of the AD Safety Joint Lab. Research focus: SOTIF (ISO 21448), functional safety (ISO 26262), scenario-driven testing and evaluation.
              <br />
              Email:{" "}
              <a href="mailto:zhangyuxin@jlu.edu.cn" className="text-[var(--accent)] hover:underline">
                zhangyuxin@jlu.edu.cn
              </a>
              <br />
              Homepage:{" "}
              <a href="https://autozyx.com" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
                autozyx.com
              </a>
            </>
          )}
        </p>
      </section>
    </div>
  );
}
