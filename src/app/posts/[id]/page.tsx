"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { supabase, getImageUrl } from "@/lib/supabase"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Post } from "@/types"
import { ArrowLeft, Heart, MessageSquare, Share2, Wifi, Printer, Share } from "lucide-react"
import React from "react"
import { createClient } from '@supabase/supabase-js'
import { toast, success, error as toastError } from "@/components/ui/toast"

export default function PostDetailPage({ params }: { params: { id: string } }) {
  // React.use()でparamsをアンラップ
  const unwrappedParams = React.use(params as any) as { id: string }
  const { id } = unwrappedParams
  const router = useRouter()
  const { user } = useAuth()
  const [post, setPost] = useState<Post | null>(null)
  const [author, setAuthor] = useState<{ username: string; avatar_url?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string>("")
  const [isNfcSupported, setIsNfcSupported] = useState<boolean>(false)
  const [isNfcWriting, setIsNfcWriting] = useState<boolean>(false)

  useEffect(() => {
    // Web NFC APIのサポート確認
    if (typeof window !== 'undefined') {
      setIsNfcSupported('NDEFReader' in window);
    }
  }, []);

  // NFCタグに書き込む関数
  const writeToNfcTag = async () => {
    if (!post) return;
    
    try {
      setIsNfcWriting(true);
      toast("NFCタグを近づけてください", "info", {
        description: "スマートフォンにNFCタグを近づけて書き込みを行ってください"
      });

      // @ts-ignore - Web NFC APIはTypeScriptの型定義がないため
      const ndef = new NDEFReader();
      await ndef.write({
        records: [
          { recordType: "url", data: `${window.location.origin}/posts/${id}` },
          { recordType: "text", data: post.title }
        ]
      });

      success("書き込み成功", {
        description: "NFCタグへの書き込みが完了しました"
      });
    } catch (err: any) {
      console.error("NFC書き込みエラー:", err);
      toastError("書き込み失敗", {
        description: err?.message || "NFCタグへの書き込みに失敗しました"
      });
    } finally {
      setIsNfcWriting(false);
    }
  };

  // SNSで布教する関数
  const shareToSns = () => {
    if (!post) return;
    
    try {
      // シェアURLの作成
      const shareUrl = `${window.location.origin}/posts/${id}`;
      const shareText = `${post.title} | 推しTag`;
      
      // Web Share APIが利用可能な場合はそれを使用
      if (navigator.share) {
        navigator.share({
          title: shareText,
          text: post.content?.substring(0, 100) + (post.content && post.content.length > 100 ? '...' : ''),
          url: shareUrl
        })
        .then(() => {
          success("共有成功", {
            description: "コンテンツの共有が完了しました"
          });
        })
        .catch((err) => {
          console.error("共有エラー:", err);
          // エラーが発生した場合はフォールバック
          fallbackShare();
        });
      } else {
        // Web Share APIが利用できない場合はフォールバック
        fallbackShare();
      }
    } catch (err) {
      console.error("共有処理エラー:", err);
      toastError("共有失敗", {
        description: "コンテンツの共有中にエラーが発生しました"
      });
    }
    
    // フォールバックの共有方法
    function fallbackShare() {
      const shareUrl = `${window.location.origin}/posts/${id}`;
      // クリップボードにURLをコピー
      navigator.clipboard.writeText(shareUrl).then(() => {
        success("URLをコピーしました", {
          description: "URLがクリップボードにコピーされました。お好みのSNSで共有できます。"
        });
      }).catch(() => {
        toastError("コピー失敗", {
          description: "URLのコピーに失敗しました"
        });
      });
    }
  };

  // 印刷する関数
  const printPost = () => {
    if (!post) return;
    
    try {
      toast("印刷準備中...", "info", {
        description: "印刷用データを準備しています"
      });
      
      // 印刷機能は今後実装予定
      success("印刷準備完了", {
        description: "印刷機能は近日実装予定です"
      });
    } catch (err) {
      console.error("印刷エラー:", err);
      toastError("印刷準備失敗", {
        description: "印刷の準備中にエラーが発生しました"
      });
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("投稿ID:", id)
        console.log("現在のユーザー:", user?.id || "未ログイン")
        
        let debugMessages = []
        
        // 匿名ユーザー用のSupabaseクライアントを作成
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
        
        debugMessages.push(`Supabase URL: ${supabaseUrl ? "設定済み" : "未設定"}`)
        debugMessages.push(`Supabase Anon Key: ${supabaseAnonKey ? "設定済み" : "未設定"}`)
        
        if (!supabaseUrl || !supabaseAnonKey) {
          throw new Error("Supabase環境変数が正しく設定されていません")
        }
        
        const anonSupabase = createClient(supabaseUrl, supabaseAnonKey);
        debugMessages.push("匿名Supabaseクライアント作成完了")

        // 投稿データを取得
        debugMessages.push("投稿データ取得開始")
        const { data: postData, error: postError } = await anonSupabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single()

        if (postError) {
          debugMessages.push(`投稿データ取得エラー: ${JSON.stringify(postError)}`)
          throw new Error(`投稿データの取得に失敗しました: ${postError.message}`)
        }

        if (!postData) {
          debugMessages.push("投稿データが見つかりません")
          setError("投稿が見つかりませんでした")
          setLoading(false)
          return
        }

        debugMessages.push(`投稿データ取得成功: ${postData.title}`)

        // 非公開投稿の場合、作成者のみアクセス可能
        if (postData.visibility === "private" && postData.user_id !== user?.id) {
          debugMessages.push("非公開投稿へのアクセス制限")
          setError("この投稿にアクセスする権限がありません")
          setLoading(false)
          return
        }

        // 投稿データをセット
        setPost(postData)
        debugMessages.push("投稿データをセット完了")

        // 投稿者の情報を取得
        debugMessages.push("投稿者情報取得開始")
        const { data: userData, error: userError } = await anonSupabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", postData.user_id)
          .single()

        if (userError) {
          debugMessages.push(`ユーザープロフィール取得エラー: ${JSON.stringify(userError)}`)
          // プロフィールが見つからない場合はデフォルト値を設定
          setAuthor({
            username: "ユーザー",
            avatar_url: undefined
          })
        } else {
          debugMessages.push(`ユーザープロフィール取得成功: ${userData.username}`)
          setAuthor(userData)
        }
        
        setDebugInfo(debugMessages.join("\n"))
      } catch (error: any) {
        console.error("投稿の取得中にエラーが発生しました", error)
        setError(error?.message || "投稿の読み込み中にエラーが発生しました")
        setDebugInfo(`エラー詳細: ${error?.message || "不明なエラー"}`)
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
          {process.env.NODE_ENV === 'development' && debugInfo && (
            <div className="mt-4 p-4 bg-gray-100 rounded text-left text-xs overflow-auto max-h-60">
              <pre>{debugInfo}</pre>
            </div>
          )}
          <Button asChild variant="outline" className="mt-4">
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

  // 自分の投稿かどうかを確認
  const isOwnPost = user?.id === post.user_id;

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
        <div className="md:flex">
          {post.image_url && (
            <div className="md:w-1/2 lg:w-2/5">
              <div className="relative aspect-square">
                <script
                  dangerouslySetInnerHTML={{
                    __html: `console.log("画像URL:", ${JSON.stringify(post.image_url)})`,
                  }}
                />
                <Image
                  src={getImageUrl(post.image_url)}
                  alt={post.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          )}

          <div className="p-6 md:w-1/2 lg:w-3/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted">
                {author.avatar_url ? (
                  <Image
                    src={getImageUrl(author.avatar_url)}
                    alt={author.username}
                    width={40}
                    height={40}
                    className="object-cover"
                    unoptimized
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
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={shareToSns}
              >
                <Share2 className="h-4 w-4" />
                シェア
              </Button>
            </div>
            
            {/* 自分の投稿の場合のみ表示する機能ボタン */}
            {isOwnPost && (
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm font-medium mb-3">推し活ツール</p>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={writeToNfcTag}
                    disabled={!isNfcSupported || isNfcWriting}
                  >
                    <Wifi className="h-4 w-4" />
                    {isNfcWriting ? "書き込み中..." : "推しタグに書き込む"}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={shareToSns}
                  >
                    <Share className="h-4 w-4" />
                    SNSで布教する
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={printPost}
                  >
                    <Printer className="h-4 w-4" />
                    推し活を印刷する
                  </Button>
                </div>
                
                {/* NFC非対応デバイスの場合の注意メッセージ */}
                {!isNfcSupported && (
                  <p className="text-xs text-amber-600 mt-2">
                    お使いのデバイスはNFC書き込みに対応していません。Chrome for Androidでアクセスしてください。
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 