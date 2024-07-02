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
import { motion } from "framer-motion";
import { LockIcon, UnlockIcon } from "lucide-react";

// 仮の記事データ
const articles = [
  {
    id: 1,
    title: "整骨院の基礎",
    description: "整骨院での治療方法とその効果を紹介します。",
  },
  {
    id: 2,
    title: "鍼灸治療の効果",
    description: "鍼灸治療がもたらす健康効果を解説します。",
  },
  {
    id: 3,
    title: "交通事故後の整骨院治療",
    description: "交通事故後のリハビリにおける整骨院の役割について説明します。",
  },
  {
    id: 4,
    title: "脊柱管狭窄症と鍼灸",
    description:
      "脊柱管狭窄症に対する鍼灸治療の効果とそのメカニズムを紹介します。",
  },
  {
    id: 5,
    title: "産後の骨盤矯正",
    description: "産後の骨盤矯正の重要性と整骨院での施術方法を解説します。",
  },
  {
    id: 6,
    title: "猫背と姿勢矯正",
    description: "猫背矯正のための整骨院でのアプローチ方法を紹介します。",
  },
  {
    id: 7,
    title: "M&Aによる整骨院の未来",
    description: "整骨院業界におけるM&Aの現状と将来展望を探ります。",
  },
  {
    id: 8,
    title: "整骨院と整体院の違い",
    description: "整骨院と整体院の違いについて解説します。",
  },
  {
    id: 9,
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
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <LockIcon className="w-12 h-12 text-primary" />
        </motion.div>
      </div>
    );
  }

  const visibleArticles = session ? articles : articles.slice(0, 3);
  const hiddenArticles = session ? [] : articles.slice(3);

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center text-gray-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        最新の記事
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {visibleArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-xl transition-shadow duration-300 bg-white">
              <CardHeader className="bg-primary text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <UnlockIcon className="w-5 h-5 mr-2" />
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CardDescription className="text-gray-600">
                  {article.description}
                </CardDescription>
                <Button className="mt-4 w-full">記事を読む</Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        {!session && hiddenArticles.length > 0 && (
          <motion.div
            className="col-span-1 md:col-span-2 lg:col-span-3 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hiddenArticles.map((article) => (
                <Card
                  key={article.id}
                  className="h-full bg-white opacity-50 blur-sm"
                >
                  <CardHeader className="bg-gray-300 rounded-t-lg">
                    <CardTitle>{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardDescription>{article.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="absolute inset-0 backdrop-blur-md bg-white/30 flex flex-col justify-center items-center">
              <Card className="w-full max-w-md text-center bg-white shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary">
                    ログインしてさらに記事を読む
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    会員登録すると、すべての記事を無料で読むことができます。
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => router.push("/signin")}
                    className="w-full"
                  >
                    ログイン
                  </Button>
                  <Button
                    onClick={() => router.push("/signup")}
                    variant="outline"
                    className="w-full"
                  >
                    新規登録
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
