import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = '推しTag - 推し活を記録・共有・印刷'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// 静的な画像ファイルを使用するためのリダイレクト
export default function Image() {
  return new Response('', {
    status: 307, // 一時的なリダイレクト
    headers: {
      'Location': '/oshi-tag_ogp.png',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  })
} 