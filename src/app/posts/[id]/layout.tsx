import { Metadata } from 'next'
import { supabase } from '@/lib/supabase'

// 動的メタデータを生成する関数
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    // 投稿データを取得
    const { data: post } = await supabase
      .from('posts')
      .select('title, content')
      .eq('id', params.id)
      .single()

    if (!post) {
      return {
        title: '投稿が見つかりません | 推しTag',
        description: '指定された投稿は存在しないか、削除された可能性があります。',
      }
    }

    // 投稿内容の最初の100文字を説明文として使用
    const description = post.content 
      ? post.content.substring(0, 100) + (post.content.length > 100 ? '...' : '')
      : '推し活を記録・共有・印刷できるサービス'

    // OGP画像のURLを生成
    const ogImageUrl = new URL(`/api/og?title=${encodeURIComponent(post.title)}`, process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').toString()

    return {
      title: `${post.title} | 推しTag`,
      description,
      openGraph: {
        title: `${post.title} | 推しTag`,
        description,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${post.title} | 推しTag`,
        description,
        images: [ogImageUrl],
      },
    }
  } catch (error) {
    console.error('メタデータ生成エラー:', error)
    return {
      title: '推しTag - 推し活を記録・共有・印刷',
      description: 'NFCタグと印刷・OGP技術を活用した推し活支援サービス',
    }
  }
}

export default function PostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 