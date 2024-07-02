"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { sendPasswordResetEmail } from "firebase/auth";
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
  CardFooter,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, RefreshCw } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "無効なメールアドレスです" }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上である必要があります" }),
});

const resetFormSchema = z.object({
  resetEmail: z.string().email({ message: "無効なメールアドレスです" }),
});

type FormData = z.infer<typeof formSchema>;
type ResetFormData = z.infer<typeof resetFormSchema>;

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const resetForm = useForm<ResetFormData>({
    resolver: zodResolver(resetFormSchema),
    defaultValues: {
      resetEmail: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        setError(
          "ログインに失敗しました。メールアドレスとパスワードを確認してください。"
        );
      } else {
        router.push("/"); // ログイン成功後、ホームページにリダイレクト
      }
    } catch (error) {
      console.error(error);
      setError("ログイン中にエラーが発生しました。");
    }
  };

  const handlePasswordReset = async (values: ResetFormData) => {
    try {
      await sendPasswordResetEmail(auth, values.resetEmail);
      setResetEmailSent(true);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("パスワードリセットメールの送信に失敗しました。");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl rounded-lg overflow-hidden">
          <CardHeader className="bg-white p-6 border-b border-gray-200">
            <CardTitle className="text-center text-3xl font-bold text-gray-800">
              ログイン
            </CardTitle>
            <CardDescription className="text-center text-gray-600 mt-2">
              アカウントにアクセスして、すべての機能をお楽しみください
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-white p-6 space-y-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                  {resetEmailSent && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-green-500 text-sm text-center"
                    >
                      パスワードリセットメールを送信しました。メールをご確認ください。
                    </motion.p>
                  )}
                </AnimatePresence>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-md hover:from-indigo-600 hover:to-purple-700 transition duration-300 ease-in-out flex items-center justify-center"
                >
                  ログイン
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="bg-gray-50 p-6 flex flex-col items-center">
            <Button
              variant="link"
              onClick={() => setShowResetForm(!showResetForm)}
              className="text-indigo-600 hover:text-indigo-800 transition duration-300 ease-in-out mb-4"
            >
              {showResetForm ? "キャンセル" : "パスワードを忘れた場合"}
            </Button>
            <AnimatePresence>
              {showResetForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <Form {...resetForm}>
                    <form
                      onSubmit={resetForm.handleSubmit(handlePasswordReset)}
                      className="space-y-4"
                    >
                      <FormField
                        control={resetForm.control}
                        name="resetEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
                              <Mail className="w-4 h-4 mr-2" />
                              リセット用メールアドレス
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="リセット用のメールアドレスを入力"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-md hover:from-indigo-600 hover:to-purple-700 transition duration-300 ease-in-out flex items-center justify-center"
                      >
                        リセットメールを送信
                        <RefreshCw className="ml-2 w-4 h-4" />
                      </Button>
                    </form>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
