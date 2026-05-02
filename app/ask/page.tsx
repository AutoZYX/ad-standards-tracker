"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import { useI18n } from "@/lib/i18n";
import RegisterGate from "@/components/register-gate";

interface Message {
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
}

interface Citation {
  id: string;
  title_en: string;
  title_cn?: string;
  url: string;
  status: string;
  legal_force?: string;
  evidence_level?: string;
  source_status?: string;
}

export default function AskPage() {
  const { t, lang } = useI18n();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const EXAMPLES =
    lang === "zh"
      ? [
          "L2 组合驾驶辅助强标和 C-NCAP 2027 有什么关系？",
          "EU 2022/1426 和 2026/481 对 L4 有什么影响？",
          "做 L4 safety case 应该优先看哪些记录？",
          "哪些记录是强制性法规，哪些只是最佳实践？",
        ]
      : [
          "How do the China L2 combined driving assistance draft and C-NCAP 2027 relate?",
          "What do EU 2022/1426 and 2026/481 mean for L4 ADS?",
          "Which records should I read first for an L4 safety case?",
          "Which records are binding regulations versus best practices?",
        ];

  async function handleSubmit(question?: string) {
    const q = (question || input).trim();
    if (!q || loading) return;
    setInput("");

    const userMsg: Message = { role: "user", content: q };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      const assistantMsg: Message = {
        role: "assistant",
        content: data.error || data.answer,
        citations: Array.isArray(data.citations) ? data.citations : undefined,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("ask.error") },
      ]);
    } finally {
      setLoading(false);
      setTimeout(
        () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
        100
      );
    }
  }

  return (
    <RegisterGate>
      <div className="flex flex-col h-[calc(100vh-14rem)] min-h-[500px]">
        <div className="mb-4">
          <h1 className="text-3xl mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
            {t("ask.title")}
          </h1>
          <p className="text-[var(--muted)] text-sm">{t("ask.desc")}</p>
          <p className="mt-2 text-xs text-[var(--muted)] leading-relaxed">
            {lang === "zh"
              ? "请勿输入客户项目、未公开事故、商业秘密或个人信息。问题会发送给 Claude 处理，回答仅基于本站数据库。"
              : "Do not submit client projects, non-public incidents, trade secrets, or personal data. Questions are sent to Claude and answers are grounded only in this database."}
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-1">
          {messages.length === 0 && (
            <div className="py-12">
              <p className="text-center text-[var(--muted)] mb-6">
                {t("ask.try")}
              </p>
              <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => handleSubmit(ex)}
                    className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] text-sm text-[var(--text)] hover:border-[var(--accent)] transition-colors cursor-pointer"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[var(--accent)] text-white whitespace-pre-wrap"
                    : "bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text)]"
                }`}
              >
                {msg.role === "assistant" ? (
                  <>
                    <Markdown
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                        li: ({ children }) => <li>{children}</li>,
                        code: ({ children }) => (
                          <code className="px-1.5 py-0.5 rounded bg-[var(--bg)] text-xs font-mono">
                            {children}
                          </code>
                        ),
                        a: ({ href, children }) => (
                          <Link
                            href={href || "#"}
                            target={href?.startsWith("http") ? "_blank" : undefined}
                            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-[var(--accent)] underline hover:opacity-80"
                          >
                            {children}
                          </Link>
                        ),
                      }}
                    >
                      {msg.content}
                    </Markdown>
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-3 border-t border-[var(--border)] pt-3">
                        <p className="text-xs font-semibold text-[var(--muted)] mb-2">
                          {lang === "zh" ? "服务端引用校验" : "Server-checked citations"}
                        </p>
                        <ul className="space-y-2">
                          {msg.citations.map((citation) => (
                            <li key={citation.id} className="text-xs">
                              <Link
                                href={`/standards/${citation.id}`}
                                className="text-[var(--accent)] hover:underline no-underline font-mono"
                              >
                                {citation.id}
                              </Link>
                              <span className="text-[var(--muted)]">
                                {" "}
                                {lang === "zh" && citation.title_cn
                                  ? citation.title_cn
                                  : citation.title_en}
                              </span>
                              <a
                                href={citation.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-[var(--accent)] hover:underline break-all"
                              >
                                {citation.url}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--muted)]">
                {t("ask.thinking")}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("ask.placeholder")}
            disabled={loading}
            maxLength={500}
            className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-xl bg-[var(--accent)] text-white px-5 py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 cursor-pointer"
          >
            {t("ask.button")}
          </button>
        </form>
      </div>
    </RegisterGate>
  );
}
