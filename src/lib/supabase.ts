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