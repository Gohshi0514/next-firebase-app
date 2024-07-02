'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

const formSchema = z.object({
  email: z.string().email({ message: "無効なメールアドレスです" }),
  password: z.string().min(8, { message: "パスワードは8文字以上である必要があります" }),
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
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        setError("サインインに失敗しました。メールアドレスとパスワードを確認してください。");
      } else {
        router.push('/');  // サインイン成功後、ホームページにリダイレクト
      }
    } catch (error) {
      console.error(error);
      setError("サインイン中にエラーが発生しました。");
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 p-6">
      <Card className="w-full max-w-md shadow-lg rounded-lg">
        <CardHeader className="bg-white p-6 rounded-t-lg">
          <CardTitle className="text-center text-2xl font-semibold text-gray-800">サインイン</CardTitle>
          <CardDescription className="text-center text-gray-600 mt-2">アカウントにアクセスするには認証情報を入力してください</CardDescription>
        </CardHeader>
        <CardContent className="bg-white p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700">メールアドレス</FormLabel>
                    <FormControl>
                      <Input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="メールアドレスを入力" {...field} />
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
                    <FormLabel className="block text-sm font-medium text-gray-700">パスワード</FormLabel>
                    <FormControl>
                      <Input type="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="パスワードを入力" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              {resetEmailSent && <p className="text-green-500 text-sm text-center">パスワードリセットメールを送信しました。メールをご確認ください。</p>}
              <Button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">サインイン</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="bg-gray-50 p-6 rounded-b-lg flex flex-col items-center">
          <Button variant="link" onClick={() => setShowResetForm(true)} className="text-indigo-600 hover:underline mb-4">パスワードを忘れた場合</Button>
          {showResetForm && (
            <Form {...resetForm}>
              <form onSubmit={resetForm.handleSubmit(handlePasswordReset)} className="space-y-6 w-full">
                <FormField
                  control={resetForm.control}
                  name="resetEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700">メールアドレス</FormLabel>
                      <FormControl>
                        <Input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="リセット用のメールアドレスを入力" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">リセットメールを送信</Button>
              </form>
            </Form>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
