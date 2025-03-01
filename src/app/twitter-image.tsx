import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = '推しTag - 推し活を記録・共有・印刷'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
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
          backgroundImage: 'url(/oshi-tag_ogp.png)',
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