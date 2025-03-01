"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Post } from "@/types"
import { ArrowLeft, Heart, MessageSquare, Share2 } from "lucide-react"

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const { user } = useAuth()
  const [post, setPost] = useState<Post | null>(null)
  const [author, setAuthor] = useState<{ username: string; avatar_url?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // 投稿データを取得
        const { data: postData, error: postError } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single()

        if (postError) throw postError

        if (!postData) {
          setError("投稿が見つかりませんでした")
          return
        }

        // 非公開投稿の場合、作成者のみアクセス可能
        if (postData.visibility === "private" && postData.user_id !== user?.id) {
          setError("この投稿にアクセスする権限がありません")
          return
        }

        setPost(postData)

        // 投稿者の情報を取得
        const { data: userData, error: userError } = await supabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", postData.user_id)
          .single()

        if (userError) throw userError

        setAuthor(userData)
      } catch (error) {
        console.error("投稿の取得中にエラーが発生しました", error)
        setError("投稿の読み込み中にエラーが発生しました")
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id, user?.id])

  if (loading) {
    return (
      <div className="container py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/3 bg-muted rounded"></div>
          <div className="h-64 bg-muted rounded-lg"></div>
          <div className="h-4 w-full bg-muted rounded"></div>
          <div className="h-4 w-2/3 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-10">
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">{error}</p>
          <Button asChild variant="outline">
            <Link href="/posts">投稿一覧に戻る</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!post || !author) {
    return (
      <div className="container py-10">
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-4">投稿が見つかりませんでした</p>
          <Button asChild variant="outline">
            <Link href="/posts">投稿一覧に戻る</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        戻る
      </Button>

      <div className="bg-card rounded-lg shadow-md overflow-hidden">
        {post.image_url && (
          <div className="relative w-full h-[400px]">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted">
              {author.avatar_url ? (
                <Image
                  src={author.avatar_url}
                  alt={author.username}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary font-medium">
                  {author.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <p className="font-medium">{author.username}</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(post.created_at), "yyyy年MM月dd日 HH:mm", { locale: ja })}
              </p>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <p className="mb-6 whitespace-pre-wrap">{post.content}</p>

          <div className="flex items-center gap-4 text-muted-foreground">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              いいね
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              コメント
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              シェア
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 