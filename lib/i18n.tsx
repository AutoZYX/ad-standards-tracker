"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Lang = "en" | "zh";

const translations = {
  // Nav
  "nav.dashboard": { en: "Dashboard", zh: "仪表盘" },
  "nav.standards": { en: "Standards", zh: "标准库" },
  "nav.maps": { en: "Maps", zh: "专题地图" },
  "nav.sources": { en: "Sources", zh: "数据源" },
  "nav.ask": { en: "Ask AD Standards", zh: "智能问答" },
  "nav.about": { en: "About", zh: "关于" },
  "nav.subscribe": { en: "Subscribe", zh: "订阅" },

  // Brand
  "brand.name_short": { en: "AD Standards", zh: "自动驾驶标准" },
  "brand.name_full": { en: "AD Standards Tracker", zh: "自动驾驶标准追踪" },
  "brand.tagline": {
    en: "Tracking automated driving standards, regulations, assessment protocols, and latest updates across global sources.",
    zh: "追踪全球自动驾驶标准、法规、测评规程与最新动态。",
  },

  // Dashboard
  "dash.title": { en: "Dashboard", zh: "仪表盘" },
  "dash.desc": {
    en: "Recent updates from authoritative sources tracking AD/ICV standards, regulations, assessment protocols, consultations, and industry interpretations.",
    zh: "来自权威数据源的最新动态，覆盖自动驾驶与智能网联汽车标准、法规、测评规程、征求意见和行业解读。",
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
  "dash.data_health": { en: "Data Health", zh: "数据健康" },
  "dash.trust_complete": { en: "Trust fields complete", zh: "可信度字段完整" },
  "dash.evidence_mix": { en: "Evidence mix", zh: "证据等级分布" },
  "dash.source_health": { en: "Source health", zh: "链接状态分布" },
  "dash.health_note": {
    en: "Blocked means official sources are retained but automated checks are blocked or time out; use the original URL and source note for manual verification.",
    zh: "Blocked 表示保留官方来源，但自动化检查被阻断或超时；请结合原文链接与 source_note 做人工核验。",
  },

  // Standards list
  "std.title": { en: "Standards Library", zh: "标准库" },
  "std.desc": {
    en: "A curated database separating formal standards, regulations, assessment protocols, and supplementary latest updates.",
    zh: "按正式标准、法规、测评规程和补充类最新动态分层整理的数据库。",
  },
  "std.search": { en: "Search standards...", zh: "搜索标准..." },
  "std.cat.standards": { en: "Standards", zh: "标准" },
  "std.cat.regulations": { en: "Regulations", zh: "法规" },
  "std.cat.assessments": { en: "Assessment Protocols", zh: "测评规程" },
  "std.cat.updates": { en: "Latest Updates", zh: "最新动态" },
  "std.cat.all": { en: "All Categories", zh: "全部分类" },
  "std.all_juris": { en: "All Jurisdictions", zh: "全部管辖区" },
  "std.all_types": { en: "All Types", zh: "全部类型" },
  "std.all_status": { en: "All Status", zh: "全部状态" },
  "std.all_years": { en: "All Years", zh: "全部年份" },
  "std.all_orgs": { en: "All Organizations", zh: "全部组织" },
  "std.all_topics": { en: "All Topics", zh: "全部主题" },
  "std.all_levels": { en: "All Levels", zh: "全部级别" },
  "std.all_legal": { en: "All Legal Effects", zh: "全部效力" },
  "std.all_sources": { en: "All Source Types", zh: "全部来源类型" },
  "std.all_evidence": { en: "All Evidence Levels", zh: "全部证据等级" },
  "std.all_source_status": { en: "All Source Status", zh: "全部链接状态" },
  "std.found": { en: "found", zh: "条" },
  "std.no_match": { en: "No standards match the filters.", zh: "没有符合筛选条件的标准。" },
  "std.back": { en: "Back to Standards", zh: "返回标准库" },

  // Evidence maps
  "maps.title": { en: "Evidence Maps", zh: "专题地图" },
  "maps.desc": {
    en: "Decision-oriented views that connect records across standards, regulations, assessment protocols, and latest updates. Use them to see which evidence matters for a concrete AD safety question.",
    zh: "面向工程决策的专题视图，把标准、法规、测评规程和最新动态串起来，帮助判断一个具体自动驾驶安全问题到底需要看哪些证据。",
  },

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
  "detail.scope": { en: "SCOPE / WHAT IT COVERS", zh: "覆盖范围 / 标准边界" },
  "detail.exclusions": { en: "EXCLUSIONS / WHAT IT DOES NOT COVER", zh: "不覆盖内容 / 注意边界" },
  "detail.engineering_use": { en: "ENGINEERING USE", zh: "工程使用方式" },
  "detail.expert_note": { en: "EXPERT NOTE", zh: "专家判断" },
  "detail.impact": { en: "IMPACT / ANALYSIS", zh: "影响 / 解读" },
  "detail.related": { en: "RELATED STANDARDS", zh: "关联标准" },
  "detail.quality": { en: "SOURCE & LEGAL EFFECT", zh: "来源与效力" },
  "detail.legal_force": { en: "LEGAL EFFECT", zh: "法律/行业效力" },
  "detail.source_type": { en: "SOURCE TYPE", zh: "来源类型" },
  "detail.evidence_level": { en: "EVIDENCE LEVEL", zh: "证据等级" },
  "detail.verified_at": { en: "VERIFIED AT", zh: "核验日期" },
  "detail.source_status": { en: "SOURCE STATUS", zh: "链接状态" },
  "detail.version": { en: "VERSION", zh: "版本" },
  "detail.supersedes": { en: "SUPERSEDES", zh: "替代" },
  "detail.superseded_by": { en: "SUPERSEDED BY", zh: "被替代" },
  "detail.report_correction": { en: "Report correction", zh: "报告纠错" },

  // Sources page
  "src.title": { en: "Data Sources", zh: "数据源" },
  "src.desc": {
    en: "Authoritative sources grouped by national/international standards bodies, industry standards organizations, regulators, assessment programs, and official interpretation channels.",
    zh: "按国家/国际标准制定组织、行业标准组织、监管机构、测评规程发布方和官方解读渠道分组的数据源。",
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
  "type.interpretation": { en: "Interpretation", zh: "标准解读" },

  // Status labels
  "status.draft": { en: "Draft", zh: "草案" },
  "status.consultation": { en: "Consultation", zh: "征求意见" },
  "status.published": { en: "Published", zh: "已发布" },
  "status.revised": { en: "Revised", zh: "修订" },
  "status.withdrawn": { en: "Withdrawn", zh: "撤回" },
  "status.pending": { en: "Pending", zh: "待定" },
  "status.in_force": { en: "In Force", zh: "已实施" },

  // Legal force labels
  "legal.binding": { en: "Binding regulation", zh: "强制性法规/准入要求" },
  "legal.voluntary": { en: "Voluntary standard", zh: "自愿性标准" },
  "legal.rating_protocol": { en: "Assessment protocol", zh: "测评规程" },
  "legal.guidance": { en: "Guidance", zh: "指导性文件" },
  "legal.best_practice": { en: "Best practice", zh: "最佳实践" },
  "legal.informational": { en: "Informational", zh: "信息参考" },

  // Source type labels
  "source_type.official": { en: "Official source", zh: "官方原始来源" },
  "source_type.official_news": { en: "Official notice/news", zh: "官方通知/新闻" },
  "source_type.official_catalog": { en: "Official catalog", zh: "官方目录/项目页" },
  "source_type.standards_store": { en: "Standards store", zh: "标准销售/目录页" },
  "source_type.secondary": { en: "Secondary source", zh: "二级来源" },
  "source_type.interpretation": { en: "Interpretation", zh: "解读来源" },

  // Evidence/source status labels
  "source_status.verified": { en: "Verified", zh: "已核验" },
  "source_status.paywalled": { en: "Paywalled", zh: "需付费/登录" },
  "source_status.blocked": { en: "Blocked", zh: "访问受限" },
  "source_status.broken": { en: "Broken", zh: "链接失效" },
  "source_status.unverified": { en: "Unverified", zh: "未核验" },

  // Jurisdiction labels
  "juris.international": { en: "International / UN", zh: "国际/联合国" },
  "juris.industry_org": { en: "Industry Org", zh: "行业组织" },
  "juris.china": { en: "China", zh: "中国" },
  "juris.us": { en: "United States", zh: "美国" },
  "juris.eu": { en: "European Union", zh: "欧盟" },
  "juris.uk": { en: "United Kingdom", zh: "英国" },
  "juris.germany": { en: "Germany", zh: "德国" },
  "juris.japan": { en: "Japan", zh: "日本" },
  "juris.korea": { en: "Korea", zh: "韩国" },
  "juris.singapore": { en: "Singapore", zh: "新加坡" },

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
  "topic.scenario_description": { en: "Scenario Description", zh: "场景描述" },

  // Source-category labels (sources page)
  "srccat.government": { en: "Government Regulators", zh: "政府监管机构" },
  "srccat.sdo": { en: "National / International Standards Bodies", zh: "国家/国际标准制定组织" },
  "srccat.industry_org": { en: "Industry Standard Organizations", zh: "行业标准组织" },
  "srccat.assessment": { en: "Assessment & Rating Bodies", zh: "测评与评级机构" },
  "srccat.demonstration": { en: "Pilot & Demonstration Zones", zh: "试点与示范区" },

  // About page
  "about.ai_disclaimer_title": { en: "AI-Assisted Tool Notice", zh: "AI 辅助工具声明" },
  "about.ai_disclaimer": {
    en: "This tool is developed with AI assistance and may contain inaccuracies. Always verify critical information against the official source URL before acting on it.",
    zh: "本工具在 AI 协助下开发，可能存在不准确的内容。关键信息请以原始链接为准，并自行辨别真伪。",
  },
  "about.author": { en: "Author", zh: "作者" },
  "about.author_name": { en: "Zhang Yuxin (张玉新)", zh: "张玉新 (Zhang Yuxin)" },
  "about.author_research": { en: "Research: SOTIF, ISO 21448, ISO 26262, scenario-driven safety assessment for autonomous driving.", zh: "研究方向：SOTIF、ISO 21448、ISO 26262、自动驾驶场景驱动安全评估。" },
  "about.author_homepage": { en: "Homepage", zh: "个人主页" },

  // Ask AD Standards
  "ask.title": { en: "Ask AD Standards", zh: "智能问答" },
  "ask.desc": {
    en: "Ask questions about standards, regulations, consultation drafts, and interpretations. Powered by DeepSeek with the full AD Standards Tracker database as context.",
    zh: "针对已收录的标准、法规、征求意见稿与解读提问。基于 DeepSeek，以完整数据库为上下文。",
  },
  "ask.try": { en: "Try one of these questions:", zh: "试试这些问题：" },
  "ask.placeholder": { en: "Ask about AD standards...", zh: "输入你的问题..." },
  "ask.button": { en: "Ask", zh: "提问" },
  "ask.thinking": { en: "Thinking...", zh: "思考中..." },
  "ask.error": { en: "Error: please try again later.", zh: "出错了，请稍后重试。" },

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
    queueMicrotask(() => {
      const saved = localStorage.getItem("ads-lang");
      if (saved === "zh" || saved === "en") setLangState(saved);
    });
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
