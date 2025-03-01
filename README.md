# 推しTag

NFCタグと印刷・OGP技術を活用した推し活支援サービス

## 概要

「推しTag」は、NFCタグと印刷・OGP技術を活用した推し活支援サービスです。ユーザーはスマホをNFCタグにかざすだけで推しの情報を記録・共有でき、SNS用OGP生成や布教シートの印刷が可能です。Web NFC技術とEpson Connect APIを組み合わせ、デジタルとリアルをつなぐ推し活体験を提供します。

## 主要機能

- **推し活記録**: 推し活タイトル、内容、画像のアップロード
- **NFC連携**: NFCタグへのURL書き込み、タグ読み取りによる直接アクセス
- **SNS共有**: OGP画像自動生成、主要SNSへのシェア
- **印刷機能**: EPSON Connect APIを使用した最適レイアウトでの印刷

## 技術スタック

- **フロントエンド/バックエンド**: Next.js
- **データベース**: Supabase
- **デプロイ**: Vercel
- **主要API/技術**:
  - Web NFC API (Chrome)
  - Vercel/og (OGP画像生成)
  - EPSON Connect API (印刷機能)

## 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/oshi-tag.git
cd oshi-tag

# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.local.example .env.local
# .env.localファイルを編集して必要な環境変数を設定

# 開発サーバーの起動
npm run dev
```

## 環境変数

プロジェクトを実行するには、以下の環境変数を`.env.local`ファイルに設定する必要があります：

- `NEXT_PUBLIC_SUPABASE_URL`: SupabaseプロジェクトのURL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabaseの匿名キー
- `EPSON_CLIENT_ID`: EPSON Connect APIのクライアントID
- `EPSON_CLIENT_SECRET`: EPSON Connect APIのクライアントシークレット

## ライセンス

MIT
