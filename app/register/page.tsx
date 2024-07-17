import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from '@/app/components/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-teal-400 to-green-400 p-6">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl rounded-lg overflow-hidden">
          <CardHeader className="bg-white p-6 border-b border-gray-200">
            <CardTitle className="text-center text-3xl font-bold text-gray-800">
              新規登録
            </CardTitle>
            <CardDescription className="text-center text-gray-600 mt-2">
              新しいアカウントを作成して、サービスをお楽しみください
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-white p-6 space-y-6">
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
