"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/hooks/use-auth"
import { PostForm } from "@/components/posts/post-form"
import { Post } from "@/types"
import { Skeleton } from "@/components/ui/skeleton"

export default function EditPostPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 未認証の場合はログインページにリダイレクト
    if (!isLoading && !user) {
      router.push("/login")
      return
    }

    const fetchPost = async () => {
      if (!user) return

      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .eq("user_id", user.id)
          .single()

        if (error) throw error

        if (!data) {
          setError("投稿が見つからないか、編集権限がありません")
          return
        }

        setPost(data)
      } catch (error) {
        console.error("投稿の取得中にエラーが発生しました", error)
        setError("投稿の読み込み中にエラーが発生しました")
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchPost()
    }
  }, [id, user, isLoading, router])

  const handleUpdatePost = async (updatedPost: Partial<Post>) => {
    if (!user || !post) return false

    try {
      const { error } = await supabase
        .from("posts")
        .update({
          title: updatedPost.title,
          content: updatedPost.content,
          image_url: updatedPost.image_url,
          visibility: updatedPost.visibility,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("user_id", user.id)

      if (error) throw error

      router.push(`/posts/${id}`)
      return true
    } catch (error) {
      console.error("投稿の更新中にエラーが発生しました", error)
      return false
    }
  }

  if (isLoading || loading) {
    return (
      <div className="container py-10">
        <Skeleton className="h-12 w-1/3 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-10">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
          <p>{error}</p>
        </div>
        <button
          onClick={() => router.push("/my-page")}
          className="text-primary hover:underline"
        >
          マイページに戻る
        </button>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container py-10">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
          <p>投稿が見つかりませんでした</p>
        </div>
        <button
          onClick={() => router.push("/my-page")}
          className="text-primary hover:underline"
        >
          マイページに戻る
        </button>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">投稿を編集</h1>
      <PostForm
        initialData={post}
        onSubmit={handleUpdatePost}
        submitButtonText="更新する"
      />
    </div>
  )
} 