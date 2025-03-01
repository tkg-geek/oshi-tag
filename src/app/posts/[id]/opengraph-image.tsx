import { ImageResponse } from 'next/og'
import { supabase } from '@/lib/supabase'

// Route segment config
export const runtime = 'edge'
export const revalidate = 3600 // 1時間ごとに再検証

// Image metadata
export const alt = '推しTag - 推し活を記録・共有・印刷'
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image({ params }: { params: { id: string } }) {
  try {
    // 投稿データを取得
    const { data: post } = await supabase
      .from('posts')
      .select('title')
      .eq('id', params.id)
      .single()

    const title = post?.title || '推しTag'
    
    // 背景画像のURLを取得
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const imageUrl = `${baseUrl}/oshi-tag_ogp.png`
    
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
            backgroundImage: `url(${imageUrl})`,
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
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '16px',
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
          'Content-Type': 'image/png',
        },
      }
    )
  } catch (e: any) {
    console.error(`OG画像生成エラー: ${e.message}`)
    
    // エラー時はデフォルトのOG画像を返す
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
            backgroundColor: '#FF3366',
            color: 'white',
            padding: '40px',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            推しTag
          </div>
        </div>
      ),
      {
        ...size,
      }
    )
  }
} 