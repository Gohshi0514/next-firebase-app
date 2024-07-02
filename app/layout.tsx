import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import Header from "@/app/components/Header"; // ヘッダーコンポーネントをインポート

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "認証デモアプリ",
  description: "NextAuth.js と Firebase Authentication を使った認証デモアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="ja">
        <body className={inter.className}>
          <Header />
          <main>{children}</main>
        </body>
      </html>
    </SessionProvider>
  );
}
