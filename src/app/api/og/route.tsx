import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // タイトルを取得
    const title = searchParams.get('title') || '推しTag'
    
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
            background: 'linear-gradient(to right, #ec4899, #9333ea)',
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
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '24px',
              padding: '40px',
              width: '90%',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  color: '#9333ea',
                }}
              >
                推しTag
              </div>
            </div>
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                textAlign: 'center',
                color: '#333',
                marginBottom: '20px',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: '24px',
                color: '#666',
                textAlign: 'center',
              }}
            >
              私の推しを布教します！
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.error(`OG画像生成エラー: ${e.message}`)
    return new Response(`OG画像生成に失敗しました: ${e.message}`, {
      status: 500,
    })
  }
} 