import { createClient } from '@supabase/supabase-js'

// 環境変数の存在確認
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
if (!supabaseUrl) {
  console.error('環境変数 NEXT_PUBLIC_SUPABASE_URL が設定されていません')
}

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
if (!supabaseAnonKey) {
  console.error('環境変数 NEXT_PUBLIC_SUPABASE_ANON_KEY が設定されていません')
}

// Supabaseクライアントの作成
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
)

/**
 * Supabaseストレージの画像URLを適切に処理する関数
 * @param url 元の画像URL
 * @returns 処理済みの画像URL
 */
export function getImageUrl(url: string | null | undefined): string {
  if (!url) return '';
  
  // すでに変換済みのURLや外部URLはそのまま返す
  if (url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('http://localhost')) {
    return url;
  }
  
  // URLにクエリパラメータを追加してキャッシュを回避
  const cacheBuster = `?t=${Date.now()}`;
  return `${url}${cacheBuster}`;
} 