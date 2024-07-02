"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, UserPlus, CheckCircle } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: "無効なメールアドレスです" }),
  password: z.string().min(8, { message: "パスワードは8文字以上である必要があります" }),
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
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      await sendEmailVerification(userCredential.user);
      setIsEmailSent(true);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "登録に失敗しました。もう一度お試しください。");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-teal-400 to-green-400 p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl rounded-lg overflow-hidden">
          <CardHeader className="bg-white p-6 border-b border-gray-200">
            <CardTitle className="text-center text-3xl font-bold text-gray-800">
              {isEmailSent ? "確認メールを送信しました" : "新規登録"}
            </CardTitle>
            <CardDescription className="text-center text-gray-600 mt-2">
              {isEmailSent
                ? "メールアドレスの確認のため、送信されたメールのリンクをクリックしてください。"
                : "新しいアカウントを作成して、サービスをお楽しみください"}
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-white p-6 space-y-6">
            <AnimatePresence mode="wait">
              {isEmailSent ? (
                <motion.div
                  key="email-sent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <Button
                    onClick={() => router.push("/signin")}
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-md hover:from-green-500 hover:to-blue-600 transition duration-300 ease-in-out"
                  >
                    ログインページへ
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="signup-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                              <Mail className="w-4 h-4 mr-2" />
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
                            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                              <Lock className="w-4 h-4 mr-2" />
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
                      <AnimatePresence>
                        {error && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-500 text-sm text-center"
                          >
                            {error}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 rounded-md hover:from-blue-600 hover:to-green-600 transition duration-300 ease-in-out flex items-center justify-center"
                      >
                        <UserPlus className="w-5 h-5 mr-2" />
                        登録
                      </Button>
                    </form>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}