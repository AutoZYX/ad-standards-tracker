"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";

const ROLES_EN = [
  "Automotive OEM",
  "Tier 1 supplier",
  "Robotaxi operator",
  "Consultancy / Law firm",
  "Third-party test house",
  "Regulator / government",
  "Academic researcher",
  "Journalist / Media",
  "Investor",
  "Other",
];

const ROLES_ZH = [
  "整车厂",
  "Tier 1 供应商",
  "Robotaxi 运营商",
  "咨询机构 / 律所",
  "第三方测试机构",
  "监管机构 / 政府",
  "学术研究者",
  "媒体",
  "投资人",
  "其他",
];

const INTERESTS_EN = [
  "Weekly digest of new standards and consultations",
  "Alerts for China GB/T draft standards",
  "Alerts for UNECE/ISO publications",
  "Alerts for US NHTSA and CA DMV actions",
  "Euro NCAP and consumer assessment updates",
  "Monthly deep-dive commentary",
];

const INTERESTS_ZH = [
  "每周新标准与征求意见摘要",
  "中国 GB/T 草案预警",
  "联合国/ISO 发布预警",
  "美国 NHTSA 与加州 DMV 动作预警",
  "Euro NCAP 与消费者测评更新",
  "月度深度解读",
];

export default function SubscribePage() {
  const { t, lang } = useI18n();
  const zh = lang === "zh";
  const roles = zh ? ROLES_ZH : ROLES_EN;
  const interests = zh ? INTERESTS_ZH : INTERESTS_EN;

  const [email, setEmail] = useState("");
  const [role, setRole] = useState(roles[0]);
  const [selected, setSelected] = useState<string[]>([interests[0]]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, interests: selected, product: "ad-standards-tracker" }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const toggleInterest = (i: string) => {
    setSelected((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl mb-2">{t("sub.title")}</h1>
      <p className="text-[var(--muted)] mb-8">{t("sub.desc")}</p>

      {status === "success" ? (
        <div className="rounded-xl bg-green-50 border border-green-200 p-6">
          <h2 className="text-lg font-semibold text-green-800 mb-2">✓ {t("sub.success")}</h2>
          <p className="text-sm text-green-700">
            {zh
              ? "我们会每周一发送更新摘要。如需退订，直接回复任何一封邮件。"
              : "Weekly digests sent every Monday. Reply to any email to unsubscribe."}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">{t("sub.email")}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t("sub.role")}</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t("sub.interests")}</label>
            <div className="space-y-2">
              {interests.map((i) => (
                <label key={i} className="flex items-start gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.includes(i)}
                    onChange={() => toggleInterest(i)}
                    className="mt-0.5"
                  />
                  <span>{i}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "loading" || !email}
            className="rounded-lg bg-[var(--accent)] text-white px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
          >
            {status === "loading" ? "..." : t("sub.submit")}
          </button>

          {status === "error" && (
            <p className="text-sm text-red-600">
              {zh ? "提交失败，请重试。" : "Submission failed. Please try again."}
            </p>
          )}

          <p className="text-xs text-[var(--muted)] pt-2">{t("sub.privacy")}</p>
        </form>
      )}
    </div>
  );
}
