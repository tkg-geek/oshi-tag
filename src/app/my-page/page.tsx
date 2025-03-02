"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostCard } from "@/components/posts/post-card"
import { UserProfile } from "@/components/auth/user-profile"
import { Post } from "@/types"
import { PlusCircle } from "lucide-react"

export default function MyPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 未認証の場合はログインページにリダイレクト
    if (!authLoading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      const fetchUserPosts = async () => {
        try {
          const { data, error } = await supabase
            .from("posts")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })

          if (error) throw error
          setPosts(data || [])
        } catch (error) {
          console.error("投稿の取得中にエラーが発生しました", error)
        } finally {
          setLoading(false)
        }
      }

      fetchUserPosts()
    }
  }, [user, authLoading, router])

  if (authLoading || !user) {
    return (
      <div className="container py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-20 w-full bg-muted rounded-lg"></div>
          <div className="h-64 w-full bg-muted rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <UserProfile />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="all">すべての投稿</TabsTrigger>
            <TabsTrigger value="public">公開</TabsTrigger>
            <TabsTrigger value="private">非公開</TabsTrigger>
          </TabsList>

          <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-600">
            <Link href="/posts/new" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              新規投稿
            </Link>
          </Button>
        </div>

        <TabsContent value="all">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-64 animate-pulse rounded-lg bg-muted"></div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  username={user.user_metadata.username || "ユーザー"}
                  avatarUrl={user.user_metadata.avatar_url}
                  showControls
                  showContent={false}
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
        </TabsContent>

        <TabsContent value="public">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-64 animate-pulse rounded-lg bg-muted"></div>
              ))}
            </div>
          ) : posts.filter(post => post.visibility === "public").length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {posts
                .filter(post => post.visibility === "public")
                .map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    username={user.user_metadata.username || "ユーザー"}
                    avatarUrl={user.user_metadata.avatar_url}
                    showControls
                    showContent={false}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">公開されている投稿はありません</p>
              <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-600">
                <Link href="/posts/new">公開投稿を作成</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="private">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-64 animate-pulse rounded-lg bg-muted"></div>
              ))}
            </div>
          ) : posts.filter(post => post.visibility === "private").length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {posts
                .filter(post => post.visibility === "private")
                .map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    username={user.user_metadata.username || "ユーザー"}
                    avatarUrl={user.user_metadata.avatar_url}
                    showControls
                    showContent={false}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">非公開の投稿はありません</p>
              <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-600">
                <Link href="/posts/new">非公開投稿を作成</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
} 