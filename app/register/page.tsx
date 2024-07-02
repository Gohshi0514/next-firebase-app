"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  email: z.string().email({ message: "無効なメールアドレスです" }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上である必要があります" }),
});

type FormData = z.infer<typeof formSchema>;

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      // Firebaseで新規ユーザーを作成
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      // メール確認を送信
      await sendEmailVerification(userCredential.user);

      setIsEmailSent(true);
    } catch (error) {
      console.error(error);
      setError(
        error instanceof Error
          ? error.message
          : "登録に失敗しました。もう一度お試しください。"
      );
    }
  };

  if (isEmailSent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 p-6">
        <Card className="w-full max-w-md shadow-lg rounded-lg">
          <CardHeader className="bg-white p-6 rounded-t-lg">
            <CardTitle className="text-center text-2xl font-semibold text-gray-800">
              確認メールを送信しました
            </CardTitle>
            <CardDescription className="text-center text-gray-600 mt-2">
              メールアドレスの確認のため、送信されたメールのリンクをクリックしてください。
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-white p-6">
            <Button
              onClick={() => router.push("/signin")}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            >
              ログインページへ
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 p-6">
      <Card className="w-full max-w-md shadow-lg rounded-lg">
        <CardHeader className="bg-white p-6 rounded-t-lg">
          <CardTitle className="text-center text-2xl font-semibold text-gray-800">
            新規登録
          </CardTitle>
          <CardDescription className="text-center text-gray-600 mt-2">
            新しいアカウントを作成してください
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700">
                      メールアドレス
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="メールアドレスを入力"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700">
                      パスワード
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="パスワードを入力"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
              >
                登録
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
