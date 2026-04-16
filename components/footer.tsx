"use client";

import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-[var(--border)] mt-16 py-8 text-center text-sm text-[var(--muted)]">
      <div className="mx-auto max-w-6xl px-4">
        <p>
          <strong style={{ fontFamily: "Playfair Display, serif" }}>
            AD·Standards Tracker
          </strong>{" "}
          &mdash; {t("footer.desc")}
        </p>
        <p className="mt-1">
          <a
            href="https://github.com/AutoZYX/ad-standards-tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            GitHub
          </a>{" "}
          &middot; Apache 2.0 &middot;{" "}
          <a href="https://roam.autozyx.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            ROAM
          </a>{" "}
          &middot;{" "}
          <a href="https://roam-explorer.autozyx.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            ROAM Explorer
          </a>
        </p>
      </div>
    </footer>
  );
}
