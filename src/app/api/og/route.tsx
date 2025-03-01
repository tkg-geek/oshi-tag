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
            backgroundColor: 'white',
            backgroundImage: 'linear-gradient(to right, #ec4899, #9333ea)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '40px 60px',
              margin: '40px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              width: '80%',
              height: '70%',
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
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundImage: 'linear-gradient(to right, #ec4899, #9333ea)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '16px',
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  <path d="M19 17.7c.4.2.8.3 1.2.3a3 3 0 0 0-3-3c-.4 0-.8.1-1.2.3" />
                  <path d="M12 19a9 9 0 0 0 9-9 6 6 0 0 1-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9Z" />
                </svg>
              </div>
              <div
                style={{
                  backgroundImage: 'linear-gradient(to right, #ec4899, #9333ea)',
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontSize: '36px',
                  fontWeight: 'bold',
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
                maxWidth: '90%',
                wordBreak: 'break-word',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
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