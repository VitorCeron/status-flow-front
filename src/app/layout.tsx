import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeStoreHydrator } from "@/components/layout/theme-store-hydrator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StatusFlow",
  description: "Monitor your APIs and get notified when they go down.",
};

const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem('statusflow-theme');var p=s?JSON.parse(s):null;var t=p&&p.state?p.state.theme:'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeStoreHydrator />
        {children}
      </body>
    </html>
  );
}
