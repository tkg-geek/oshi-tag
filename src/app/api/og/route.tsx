import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // タイトルを取得
    const title = searchParams.get('title') || '推しTag'
    
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
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
          'Content-Type': 'image/png',
        },
      }
    )
  } catch (error: unknown) {
    console.error(`OG画像生成エラー: ${error instanceof Error ? error.message : 'Unknown error'}`)
    return new Response(`OG画像生成に失敗しました: ${error instanceof Error ? error.message : 'Unknown error'}`, {
      status: 500,
    })
  }
} 