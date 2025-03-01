"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@supabase/supabase-js"
import { useAuth } from "@/context/auth-context"

interface UserProfileProps {
  className?: string
}

export function UserProfile({ className }: UserProfileProps) {
  const { user } = useAuth()
  const [username, setUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        // プロフィール情報を取得
        const { data, error } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .single()

        if (error && error.code !== "PGRST116") {
          // PGRST116はデータが見つからないエラー
          console.error("プロフィール情報の取得中にエラーが発生しました", error)
        } else {
          setUsername(data?.username || null)
        }
      } catch (error) {
        console.error("プロフィール情報の取得中にエラーが発生しました", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [user])

  if (loading) {
    return <div className={className}>読み込み中...</div>
  }

  if (!user) {
    return null
  }

  // ユーザー名の頭文字を取得（アバターのフォールバック用）
  const initials = username 
    ? username.charAt(0).toUpperCase() 
    : user.email?.charAt(0).toUpperCase() || "U"

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Avatar>
        <AvatarImage src={user.user_metadata?.avatar_url || ""} alt={username || "ユーザー"} />
        <AvatarFallback className="bg-pink-100 text-pink-800">{initials}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">{username || "ユーザー"}</p>
      </div>
    </div>
  )
} 