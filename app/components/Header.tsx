'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">
          認証デモアプリ
        </Link>
        <nav>
          {status === 'authenticated' ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                ようこそ、{session.user?.email || 'ゲスト'}さん
              </span>
              <Button
                onClick={() => signOut({ callbackUrl: '/' })}
                variant="outline"
              >
                ログアウト
              </Button>
            </div>
          ) : (
            <div className="space-x-2">
              <Button asChild variant="outline">
                <Link href="/signin">ログイン</Link>
              </Button>
              <Button asChild>
                <Link href="/register">新規登録</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}