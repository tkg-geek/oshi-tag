"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Post, VisibilityType } from "@/types"
import { Eye, EyeOff, Lock, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface PostFormProps {
  initialData?: Post
  onSubmit?: (data: Partial<Post>) => Promise<boolean>
  submitButtonText?: string
}

export function PostForm({ 
  initialData,
  onSubmit: externalSubmit,
  submitButtonText = "投稿する" 
}: PostFormProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [title, setTitle] = useState(initialData?.title || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image_url || null)
  const [visibility, setVisibility] = useState<VisibilityType>(initialData?.visibility || "private")
  const [password, setPassword] = useState(initialData?.password || "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setImagePreview(initialData?.image_url || null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (!user) throw new Error("ログインが必要です")

      let image_url = initialData?.image_url || null

      // 画像がある場合はアップロード
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop()
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
        const filePath = `${user.id}/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, imageFile)

        if (uploadError) throw uploadError

        // 画像のURLを取得
        const { data } = supabase.storage.from("images")
          .getPublicUrl(filePath)
        image_url = data.publicUrl
      }

      // 投稿データを作成
      const postData = {
        title,
        content,
        image_url: image_url || undefined,
        visibility,
        user_id: user.id,
        updated_at: new Date().toISOString(),
        // 限定公開の場合はパスワードを設定
        ...(visibility === "limited" && { password }),
      }

      // 外部のonSubmit関数が提供されている場合はそれを使用
      if (externalSubmit) {
        const success = await externalSubmit(postData)
        if (success) {
          toast.success(initialData ? "投稿を更新しました" : "投稿しました")
          return
        } else {
          throw new Error(initialData ? "投稿の更新に失敗しました" : "投稿に失敗しました")
        }
      } else {
        // デフォルトの投稿作成処理
        const { error: insertError } = await supabase.from("posts").insert([postData])
        if (insertError) throw insertError
        
        toast.success("投稿しました")
        router.push("/posts")
        router.refresh()
      }
    } catch (error: any) {
      setError(error.message || "投稿中にエラーが発生しました")
      toast.error(error.message || "投稿中にエラーが発生しました")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{initialData ? "投稿を編集" : "新規投稿作成"}</CardTitle>
        <CardDescription>推し活の思い出を記録しましょう</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">タイトル</Label>
            <Input
              id="title"
              placeholder="推し活のタイトルを入力"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">内容</Label>
            <Textarea
              id="content"
              placeholder="推し活の内容を入力"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">画像</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="プレビュー"
                  className="max-h-40 rounded-md object-cover"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>公開設定</Label>
            <RadioGroup
              value={visibility}
              onValueChange={(value) => setVisibility(value as VisibilityType)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private" className="flex items-center gap-2 cursor-pointer">
                  <EyeOff className="h-4 w-4" />
                  非公開（自分のみ）
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="public" />
                <Label htmlFor="public" className="flex items-center gap-2 cursor-pointer">
                  <Eye className="h-4 w-4" />
                  公開（全体公開）
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="limited" id="limited" />
                <Label htmlFor="limited" className="flex items-center gap-2 cursor-pointer">
                  <Lock className="h-4 w-4" />
                  限定公開（URLとパスワード保護）
                </Label>
              </div>
            </RadioGroup>
          </div>

          {visibility === "limited" && (
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                placeholder="閲覧用パスワードを設定"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                送信中...
              </>
            ) : (
              submitButtonText
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="ghost" onClick={() => router.back()}>
          キャンセル
        </Button>
      </CardFooter>
    </Card>
  )
} 