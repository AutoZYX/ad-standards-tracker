"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import { useI18n } from "@/lib/i18n";
import RegisterGate from "@/components/register-gate";

interface Message {
  role: "user" | "assistant";
  content: string;
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
          "MIIT 组合驾驶辅助强标报批稿最关键的变化是什么？",
          "C-NCAP 2027 对 OEM 的产品规划有什么影响？",
          "ASAM OpenSCENARIO 和 ISO 34502 有什么关系？",
          "欧盟 AI Act 对自动驾驶的影响有哪些？",
        ]
      : [
          "What is the latest MIIT combined driving assistance standard?",
          "Compare ISO 21448 SOTIF with ISO 26262 functional safety",
          "Which records relate to teleoperation?",
          "What standards are currently in consultation?",
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
