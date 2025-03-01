"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth-context"
import { toast } from "sonner"
import { Sparkles } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { signIn } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signIn(email, password)
      toast.success("ログインしました")
      router.push("/my-page")
    } catch (error: any) {
      console.error("ログインエラー:", error)
      
      // エラーメッセージの表示
      if (error.message?.includes("Invalid login credentials")) {
        toast.error("メールアドレスまたはパスワードが正しくありません")
      } else {
        toast.error("ログインに失敗しました")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2">
          <Sparkles className="h-6 w-6 text-pink-500 mr-2" />
          <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            推しTag
          </span>
        </div>
        <CardTitle className="text-2xl text-center">ログイン</CardTitle>
        <CardDescription className="text-center">
          アカウント情報を入力して、推し活を記録しましょう
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">パスワード</Label>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                パスワードを忘れた場合
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "ログイン中..." : "ログイン"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="mt-2 text-center text-sm">
          <span className="text-muted-foreground">
            アカウントをお持ちでない場合は{" "}
          </span>
          <Link
            href="/signup"
            className="text-blue-500 hover:text-blue-700"
          >
            新規登録
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
} 