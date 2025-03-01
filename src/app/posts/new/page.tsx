"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { PostForm } from "@/components/posts/post-form"

export default function NewPostPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="container py-10">
        <div className="max-w-3xl mx-auto">
          <div className="h-96 animate-pulse rounded-lg bg-muted"></div>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="container py-10">
      <PostForm />
    </div>
  )
} 