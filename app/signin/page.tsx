import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInForm from "@/app/components/SignForm";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6">
      <div className="w-full max-w-md">
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
            <SignInForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
