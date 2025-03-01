"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { PostCard } from "@/components/posts/post-card"
import { Post } from "@/types"
import { PlusCircle } from "lucide-react"

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<Record<string, { username: string; avatar_url?: string }>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 公開投稿のみを取得
        const { data: postsData, error: postsError } = await supabase
          .from("posts")
          .select("*")
          .eq("visibility", "public")
          .order("created_at", { ascending: false })

        if (postsError) throw postsError

        if (postsData) {
          setPosts(postsData)

          // ユーザーIDの一覧を取得
          const userIds = [...new Set(postsData.map(post => post.user_id))]

          // ユーザー情報を取得
          const { data: usersData, error: usersError } = await supabase
            .from("profiles")
            .select("id, username, avatar_url")
            .in("id", userIds)

          if (usersError) throw usersError

          // ユーザー情報をマップに変換
          const usersMap: Record<string, { username: string; avatar_url?: string }> = {}
          usersData?.forEach(user => {
            usersMap[user.id] = {
              username: user.username,
              avatar_url: user.avatar_url
            }
          })

          setUsers(usersMap)
        }
      } catch (error) {
        console.error("投稿の取得中にエラーが発生しました", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">投稿一覧</h1>
        <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-600">
          <Link href="/posts/new" className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            新規投稿
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-lg bg-muted"></div>
          ))}
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              username={users[post.user_id]?.username || "ユーザー"}
              avatarUrl={users[post.user_id]?.avatar_url}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-4">まだ投稿がありません</p>
          <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-600">
            <Link href="/posts/new">最初の投稿を作成</Link>
          </Button>
        </div>
      )}
    </div>
  )
} 