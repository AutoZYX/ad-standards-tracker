"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "zh";

const translations = {
  // Nav
  "nav.dashboard": { en: "Dashboard", zh: "仪表盘" },
  "nav.standards": { en: "Standards", zh: "标准库" },
  "nav.sources": { en: "Sources", zh: "数据源" },
  "nav.about": { en: "About", zh: "关于" },
  "nav.subscribe": { en: "Subscribe", zh: "订阅" },

  // Brand
  "brand.name_short": { en: "AD Standards", zh: "自动驾驶标准" },
  "brand.name_full": { en: "AD Standards Tracker", zh: "自动驾驶标准追踪" },
  "brand.tagline": {
    en: "Tracking automated driving standards across UN, China, US, EU, UK, Japan.",
    zh: "追踪联合国、中国、美国、欧盟、英国、日本的自动驾驶标准、法规与测评动态。",
  },

  // Dashboard
  "dash.title": { en: "Dashboard", zh: "仪表盘" },
  "dash.desc": {
    en: "Recent updates across 25 authoritative sources tracking AD/ICV regulations, standards, consultations, and assessments.",
    zh: "25 个权威数据源的最新动态，覆盖自动驾驶与智能网联汽车的法规、标准、征求意见与测评。",
  },
  "dash.total": { en: "Total Records", zh: "记录总数" },
  "dash.sources_count": { en: "Data Sources", zh: "数据源" },
  "dash.latest_update": { en: "Latest Update", zh: "最近更新" },
  "dash.this_month": { en: "This Month", zh: "本月新增" },
  "dash.recent_updates": { en: "Recent Updates", zh: "近期更新" },
  "dash.view_all": { en: "View all", zh: "查看全部" },
  "dash.by_jurisdiction": { en: "By Jurisdiction", zh: "按管辖区" },
  "dash.by_type": { en: "By Type", zh: "按类型" },
  "dash.by_topic": { en: "Top Topics", zh: "热门主题" },

  // Standards list
  "std.title": { en: "Standards Library", zh: "标准库" },
  "std.desc": {
    en: "Full database of regulations, standards, consultations, meeting notices, recalls, and policy documents.",
    zh: "法规、标准、征求意见、会议通知、召回与政策文件的完整数据库。",
  },
  "std.search": { en: "Search standards...", zh: "搜索标准..." },
  "std.all_juris": { en: "All Jurisdictions", zh: "全部管辖区" },
  "std.all_types": { en: "All Types", zh: "全部类型" },
  "std.all_status": { en: "All Status", zh: "全部状态" },
  "std.all_years": { en: "All Years", zh: "全部年份" },
  "std.all_orgs": { en: "All Organizations", zh: "全部组织" },
  "std.all_topics": { en: "All Topics", zh: "全部主题" },
  "std.all_levels": { en: "All Levels", zh: "全部级别" },
  "std.found": { en: "found", zh: "条" },
  "std.no_match": { en: "No standards match the filters.", zh: "没有符合筛选条件的标准。" },
  "std.back": { en: "Back to Standards", zh: "返回标准库" },

  // Standard detail
  "detail.url": { en: "OFFICIAL URL", zh: "原文链接" },
  "detail.status": { en: "STATUS", zh: "状态" },
  "detail.type": { en: "TYPE", zh: "类型" },
  "detail.org": { en: "ORGANIZATION", zh: "发布组织" },
  "detail.date": { en: "PUBLICATION DATE", zh: "发布日期" },
  "detail.effective": { en: "EFFECTIVE DATE", zh: "实施日期" },
  "detail.jurisdiction": { en: "JURISDICTION", zh: "管辖区" },
  "detail.automation": { en: "AUTOMATION LEVEL", zh: "自动化等级" },
  "detail.topics": { en: "TOPICS", zh: "主题" },
  "detail.summary": { en: "SUMMARY", zh: "摘要" },
  "detail.impact": { en: "IMPACT / ANALYSIS", zh: "影响 / 解读" },
  "detail.related": { en: "RELATED STANDARDS", zh: "关联标准" },

  // Sources page
  "src.title": { en: "Data Sources", zh: "数据源" },
  "src.desc": {
    en: "25 P0 (priority zero) authoritative sources monitored continuously. Expandable roadmap for P1/P2 sources.",
    zh: "持续监测 25 个 P0 优先级权威数据源。P1/P2 源在扩展路线图中。",
  },
  "src.difficulty": { en: "Crawl Difficulty", zh: "抓取难度" },
  "src.language": { en: "Language", zh: "语言" },

  // Subscribe
  "sub.title": { en: "Subscribe to Updates", zh: "订阅更新" },
  "sub.desc": {
    en: "Weekly digest of AD standards developments. No spam, no selling emails, unsubscribe any time.",
    zh: "每周精选自动驾驶标准动态摘要。不发送垃圾邮件，不出售邮箱，随时可退订。",
  },
  "sub.email": { en: "Email address", zh: "邮箱地址" },
  "sub.role": { en: "Your role", zh: "你的角色" },
  "sub.interests": { en: "Subscribe to (multi-select)", zh: "订阅内容（可多选）" },
  "sub.submit": { en: "Subscribe", zh: "订阅" },
  "sub.success": { en: "Subscribed successfully.", zh: "订阅成功。" },
  "sub.privacy": {
    en: "Free. Unsubscribe anytime. We never share your email.",
    zh: "免费。随时可退订。我们不会将邮箱转给第三方。",
  },

  // About
  "about.title": { en: "About AD Standards Tracker", zh: "关于自动驾驶标准追踪" },
  "about.desc": {
    en: "An open tool for monitoring global automated driving regulatory and standardization developments, built by Zhang Yuxin (Jilin University).",
    zh: "一个监测全球自动驾驶法规与标准进展的开源工具，由张玉新（吉林大学）构建。",
  },

  // Type labels
  "type.regulation": { en: "Regulation", zh: "法规" },
  "type.standard": { en: "Standard", zh: "标准" },
  "type.consultation": { en: "Consultation", zh: "征求意见" },
  "type.meeting_notice": { en: "Meeting Notice", zh: "会议通知" },
  "type.recall": { en: "Recall", zh: "召回" },
  "type.white_paper": { en: "White Paper", zh: "白皮书" },
  "type.policy": { en: "Policy", zh: "政策" },
  "type.research": { en: "Research", zh: "研究报告" },

  // Status labels
  "status.draft": { en: "Draft", zh: "草案" },
  "status.consultation": { en: "Consultation", zh: "征求意见" },
  "status.published": { en: "Published", zh: "已发布" },
  "status.revised": { en: "Revised", zh: "修订" },
  "status.withdrawn": { en: "Withdrawn", zh: "撤回" },
  "status.pending": { en: "Pending", zh: "待定" },
  "status.in_force": { en: "In Force", zh: "已实施" },

  // Jurisdiction labels
  "juris.international": { en: "International / UN", zh: "国际/联合国" },
  "juris.china": { en: "China", zh: "中国" },
  "juris.us": { en: "United States", zh: "美国" },
  "juris.eu": { en: "European Union", zh: "欧盟" },
  "juris.uk": { en: "United Kingdom", zh: "英国" },
  "juris.japan": { en: "Japan", zh: "日本" },
  "juris.korea": { en: "Korea", zh: "韩国" },

  // Topic labels
  "topic.functional_safety": { en: "Functional Safety", zh: "功能安全" },
  "topic.sotif": { en: "SOTIF", zh: "预期功能安全" },
  "topic.cybersecurity": { en: "Cybersecurity", zh: "网络安全" },
  "topic.data_recording": { en: "Data Recording", zh: "数据记录" },
  "topic.teleoperation": { en: "Teleoperation", zh: "远程操作" },
  "topic.testing": { en: "Testing", zh: "测试" },
  "topic.perception": { en: "Perception", zh: "感知" },
  "topic.hmi": { en: "HMI", zh: "人机交互" },
  "topic.v2x": { en: "V2X", zh: "车路协同" },
  "topic.ota": { en: "OTA Updates", zh: "OTA 升级" },
  "topic.privacy": { en: "Privacy", zh: "隐私" },
  "topic.ai_governance": { en: "AI Governance", zh: "AI 治理" },
  "topic.type_approval": { en: "Type Approval", zh: "型式认证" },
  "topic.operations": { en: "Operations", zh: "运营" },

  // Footer
  "footer.desc": { en: "Open-source AD standards tracker by Zhang Yuxin", zh: "开源自动驾驶标准追踪工具，张玉新出品" },

  // Register-gate (used by shared component)
  "reg.title": { en: "Email required", zh: "需要填写邮箱" },
  "reg.desc": { en: "Free; we need your email to prevent abuse.", zh: "免费使用，仅需邮箱以防滥用。" },
  "reg.email": { en: "Email address", zh: "邮箱地址" },
  "reg.submit": { en: "Continue", zh: "继续" },
  "reg.privacy": { en: "We never share your email.", zh: "我们不会将邮箱转给第三方。" },
} as const;

type TranslationKey = keyof typeof translations;

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => translations[key]?.en ?? key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("ads-lang") as Lang;
    if (saved === "zh" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("ads-lang", l);
  };

  const t = (key: TranslationKey) => translations[key]?.[lang] ?? key;

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

export function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <button
      onClick={() => setLang(lang === "en" ? "zh" : "en")}
      className="px-2 py-1 rounded-md text-xs font-medium border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
      title={lang === "en" ? "切换中文" : "Switch to English"}
    >
      {lang === "en" ? "中文" : "EN"}
    </button>
  );
}
