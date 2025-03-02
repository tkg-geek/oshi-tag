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

    // ファイルベースのOGP画像のURLを生成
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const baseUrlWithProtocol = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;
    
    return {
      title: `${post.title} | 推しTag`,
      description,
      openGraph: {
        title: `${post.title} | 推しTag`,
        description,
        images: [
          {
            url: `/oshi-tag_ogp.png`,
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
        images: [`/oshi-tag_ogp.png`],
      },
    }
  } catch (error) {
    console.error('メタデータ生成エラー:', error)
    
    return {
      title: '推しTag - 推し活を記録・共有・印刷',
      description: 'NFCタグと印刷・OGP技術を活用した推し活支援サービス',
      openGraph: {
        title: '推しTag - 推し活を記録・共有・印刷',
        description: 'NFCタグと印刷・OGP技術を活用した推し活支援サービス',
        images: [
          {
            url: '/oshi-tag_ogp.png',
            width: 1200,
            height: 630,
            alt: '推しTag',
          },
        ],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: '推しTag - 推し活を記録・共有・印刷',
        description: 'NFCタグと印刷・OGP技術を活用した推し活支援サービス',
        images: ['/oshi-tag_ogp.png'],
      },
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