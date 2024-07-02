"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// 仮の記事データ
const articles = [
  {
    id: 6,
    title: "Reactの新機能",
    description: "Reactの最新の機能を使った開発手法を紹介します。",
  },
  {
    id: 7,
    title: "整骨院の基礎",
    description: "整骨院での治療方法とその効果を紹介します。",
  },
  {
    id: 8,
    title: "鍼灸治療の効果",
    description: "鍼灸治療がもたらす健康効果を解説します。",
  },
  {
    id: 9,
    title: "交通事故後の整骨院治療",
    description: "交通事故後のリハビリにおける整骨院の役割について説明します。",
  },
  {
    id: 10,
    title: "脊柱管狭窄症と鍼灸",
    description:
      "脊柱管狭窄症に対する鍼灸治療の効果とそのメカニズムを紹介します。",
  },
  {
    id: 11,
    title: "産後の骨盤矯正",
    description: "産後の骨盤矯正の重要性と整骨院での施術方法を解説します。",
  },
  {
    id: 12,
    title: "猫背と姿勢矯正",
    description: "猫背矯正のための整骨院でのアプローチ方法を紹介します。",
  },
  {
    id: 13,
    title: "M&Aによる整骨院の未来",
    description: "整骨院業界におけるM&Aの現状と将来展望を探ります。",
  },
  {
    id: 14,
    title: "整骨院と整体院の違い",
    description: "整骨院と整体院の違いについて解説します。",
  },
  {
    id: 15,
    title: "整骨院での肩こり治療",
    description: "肩こりに対する整骨院での治療方法とその効果を説明します。",
  },
];

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      setShowLoginPrompt(true);
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">最新の記事</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {articles.map((article) => (
          <Card
            key={article.id}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{article.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
        {!session && (
          <div className="absolute inset-0 backdrop-blur-md bg-white/30 flex flex-col justify-center items-center">
            <Card className="w-full max-w-md text-center">
              <CardHeader>
                <CardTitle>ログインして記事を読む</CardTitle>
                <CardDescription>
                  会員登録すると、すべての記事を無料で読むことができます。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => router.push("/signin")} className="mr-4">
                  ログイン
                </Button>
                <Button
                  onClick={() => router.push("/signup")}
                  variant="outline"
                >
                  新規登録
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
