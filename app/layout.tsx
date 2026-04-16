import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { I18nProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "AD Standards Tracker — 自动驾驶标准追踪",
  description:
    "Tracking automated driving regulations, standards, consultations, and assessments across UN, China, US, EU, UK, Japan. Built by Zhang Yuxin (Jilin University).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <I18nProvider>
          <Nav />
          <main className="mx-auto max-w-6xl w-full px-4 py-8 flex-1">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
