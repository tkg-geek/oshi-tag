"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { ja } from "date-fns/locale"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Lock, Heart, Share2, Printer, MoreVertical, Pencil, Trash } from "lucide-react"
import { Post } from "@/types"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

interface PostCardProps {
  post: Post
  username?: string
  avatarUrl?: string
  showActions?: boolean
  showControls?: boolean
}

export function PostCard({ post, username, avatarUrl, showActions = true, showControls = false }: PostCardProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [liked, setLiked] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: ja })
    } catch (error) {
      return "日付不明"
    }
  }

  const getVisibilityBadge = () => {
    switch (post.visibility) {
      case "private":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <EyeOff className="h-3 w-3" />
            非公開
          </Badge>
        )
      case "public":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
            <Eye className="h-3 w-3" />
            公開
          </Badge>
        )
      case "limited":
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200">
            <Lock className="h-3 w-3" />
            限定公開
          </Badge>
        )
      default:
        return null
    }
  }

  const handleEdit = () => {
    router.push(`/posts/edit/${post.id}`)
  }

  const handleDelete = async () => {
    if (!user) return

    setIsDeleting(true)
    try {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", post.id)
        .eq("user_id", user.id)

      if (error) throw error

      toast.success("投稿を削除しました")
      router.refresh()
    } catch (error) {
      console.error("投稿の削除中にエラーが発生しました", error)
      toast.error("投稿の削除に失敗しました")
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <Card className="overflow-hidden">
      {post.image_url && (
        <div className="relative h-48 w-full">
          <img
            src={post.image_url}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{post.title}</CardTitle>
          {getVisibilityBadge()}
        </div>
        {username && (
          <div className="flex items-center gap-2 mt-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={avatarUrl} alt={username} />
              <AvatarFallback className="text-xs bg-pink-100 text-pink-800">
                {username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{username}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{formatDate(post.created_at)}</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3">{post.content}</p>
      </CardContent>
      {showActions && (
        <CardFooter className="flex justify-between pt-2">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 ${liked ? 'text-pink-500' : ''}`}
              onClick={() => setLiked(!liked)}
            >
              <Heart className="h-4 w-4" />
              <span className="text-xs">いいね</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              <span className="text-xs">共有</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Printer className="h-4 w-4" />
              <span className="text-xs">印刷</span>
            </Button>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/posts/${post.id}`}>詳細</Link>
          </Button>
        </CardFooter>
      )}
      {showControls && user && post.user_id === user.id && (
        <div className="flex items-center">
          {post.visibility === "private" ? (
            <EyeOff className="h-4 w-4 text-muted-foreground mr-2" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground mr-2" />
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">メニューを開く</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit} className="flex items-center gap-2">
                <Pencil className="h-4 w-4" />
                編集
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-destructive flex items-center gap-2"
              >
                <Trash className="h-4 w-4" />
                削除
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>この投稿を削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は元に戻せません。投稿は完全に削除されます。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "削除中..." : "削除する"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
} 