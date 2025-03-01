import { ImageResponse } from 'next/og'
import { supabase } from '@/lib/supabase'

export const runtime = 'edge'

export const alt = '推しTag - 推し活の投稿'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: { id: string } }) {
  try {
    // アプリのベースURLを取得
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const baseUrlWithProtocol = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;
    const ogImageUrl = `${baseUrlWithProtocol}/oshi-tag_ogp.png`;

    // 投稿データを取得
    const { data: post } = await supabase
      .from('posts')
      .select('title')
      .eq('id', params.id)
      .single()

    const title = post?.title || '推しTag - 推し活の投稿'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url(${ogImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              padding: '20px',
            }}
          >
            <div
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                marginBottom: '20px',
                maxWidth: '100%',
                wordBreak: 'break-word',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: '32px',
                color: 'white',
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              #推しタグ
            </div>
          </div>
        </div>
      ),
      {
        ...size,
        headers: {
          'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
          'Content-Type': contentType,
        },
      }
    )
  } catch (e) {
    // エラー時はデフォルトのOGP画像を返す
    // アプリのベースURLを取得
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const baseUrlWithProtocol = baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`;
    const ogImageUrl = `${baseUrlWithProtocol}/oshi-tag_ogp.png`;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url(${ogImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              padding: '20px',
            }}
          >
            <div
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                marginBottom: '20px',
              }}
            >
              推しTag
            </div>
            <div
              style={{
                fontSize: '32px',
                color: 'white',
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              推し活を記録・共有・印刷できるサービス
            </div>
          </div>
        </div>
      ),
      {
        ...size,
        headers: {
          'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
          'Content-Type': contentType,
        },
      }
    )
  }
} 