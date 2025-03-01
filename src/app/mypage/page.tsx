"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserProfile } from "@/components/auth/user-profile"
import { LogoutButton } from "@/components/auth/logout-button"
import { supabase } from "@/lib/supabase"

export default function MyPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)

  useEffect(() => {
    // 未認証ユーザーはログインページにリダイレクト
    if (!loading && !user) {
      router.push("/login")
    }

    // ユーザープロフィールを取得
    const fetchProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single()

          if (error) throw error
          setProfile(data)
        } catch (error) {
          console.error("プロフィール取得中にエラーが発生しました", error)
        } finally {
          setLoadingProfile(false)
        }
      }
    }

    fetchProfile()
  }, [user, loading, router])

  if (loading || loadingProfile) {
    return (
      <div className="container py-10">
        <div className="max-w-4xl mx-auto">
          <div className="h-32 animate-pulse rounded-lg bg-muted"></div>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>マイプロフィール</CardTitle>
            <CardDescription>あなたのアカウント情報</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <UserProfile className="flex-1" />
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <a href="/profile/edit">プロフィール編集</a>
                </Button>
                <LogoutButton variant="destructive" showIcon />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>マイ投稿</CardTitle>
            <CardDescription>あなたの投稿一覧</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-10 text-muted-foreground">
              <p>まだ投稿がありません</p>
              <Button className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600" asChild>
                <a href="/posts/new">新規投稿を作成</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 