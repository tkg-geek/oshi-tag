import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // タイトルを取得
    const title = searchParams.get('title') || '推しTag'
    
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
  } catch (e: any) {
    console.error(`OG画像生成エラー: ${e.message}`)
    return new Response(`OG画像生成に失敗しました: ${e.message}`, {
      status: 500,
    })
  }
} 