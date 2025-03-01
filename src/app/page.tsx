import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Heart, Share2, Printer, Lock, Globe, Key, Star, Check } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function OshiTagLanding() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
          <div className="container relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-100 px-3 py-1 text-sm">
                  推し活の新しいマストアイテム
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  あなたの推し活を
                  <br />
                  もっと加速する
                </h1>
                <p className="text-xl text-muted-foreground">
                  「推しTag」は推し活を記録・共有・印刷できるサービス。
                  <br />
                  デジタルとアナログの垣根を超えた推し活の新しい形。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  >
                    無料で始める
                  </Button>
                  <Button size="lg" variant="outline" className="text-pink-600 border-pink-300 hover:bg-pink-50 hover:text-pink-700">
                    詳しく見る
                  </Button>
                </div>
              </div>
              <div className="relative mt-8 lg:mt-0">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 opacity-75 blur-sm"></div>
                <div className="relative overflow-hidden rounded-xl border bg-background shadow-xl">
                  <div className="flex flex-col items-center space-y-4">
                    <Image
                      src="/placeholder.svg?height=1080&width=1920"
                      width={600}
                      height={400}
                      alt="推しTagのスクリーンショット"
                      className="rounded-lg shadow-xl"
                    />
                  </div>
                </div>
                <Image 
                  src="/oshi-tag_logo.png" 
                  alt="推しTag" 
                  width={96} 
                  height={96} 
                  className="absolute -bottom-4 -right-4 rotate-12 rounded-full shadow-lg"
                />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gradient-to-b from-background to-pink-50 dark:to-background">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-pink-100 text-pink-800 hover:bg-pink-100">機能紹介</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                推し活をサポートする<span className="text-pink-500">3つの主要機能</span>
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                推しTagは推し活をより楽しく、より特別なものにするための機能が満載です
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="relative overflow-hidden border-pink-200 dark:border-pink-900">
                <div className="absolute top-0 right-0 h-20 w-20 translate-x-6 -translate-y-6 bg-pink-500/20 rounded-full blur-2xl"></div>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-pink-500" />
                  </div>
                  <CardTitle>推し活を記録</CardTitle>
                  <CardDescription>あなたの大切な推し活の思い出を写真や文章で記録しましょう</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">推し活タイトルと内容を記録</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">写真のアップロード機能</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">3種類のプライバシー設定</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full text-pink-600 border-pink-300 hover:bg-pink-50 hover:text-pink-700">
                    詳しく見る
                  </Button>
                </CardFooter>
              </Card>

              <Card className="relative overflow-hidden border-purple-200 dark:border-purple-900">
                <div className="absolute top-0 right-0 h-20 w-20 translate-x-6 -translate-y-6 bg-purple-500/20 rounded-full blur-2xl"></div>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                    <Share2 className="h-6 w-6 text-purple-500" />
                  </div>
                  <CardTitle>推し活を共有</CardTitle>
                  <CardDescription>NFCタグやSNSを通じて、あなたの推し活を世界に広めましょう</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">NFCタグに推し活URLを書き込み</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">OGP画像生成でSNS共有</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">限定公開機能でプライベート共有</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full text-purple-600 border-purple-300 hover:bg-purple-50 hover:text-purple-700">
                    詳しく見る
                  </Button>
                </CardFooter>
              </Card>

              <Card className="relative overflow-hidden border-indigo-200 dark:border-indigo-900">
                <div className="absolute top-0 right-0 h-20 w-20 translate-x-6 -translate-y-6 bg-indigo-500/20 rounded-full blur-2xl"></div>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                    <Printer className="h-6 w-6 text-indigo-500" />
                  </div>
                  <CardTitle>推し活を印刷</CardTitle>
                  <CardDescription>EPSON Connect APIを使って、推し活をきれいに印刷しましょう</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">写真サイズでの印刷</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">美しいレイアウトで自動デザイン</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">EPSON Connect APIとの連携</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full text-indigo-600 border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700">
                    詳しく見る
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-24">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                  プライバシー設定も<span className="text-pink-500">自由自在</span>
                </h3>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                  あなたの推し活をどのように共有するか、完全にコントロールできます
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                <Card className="border-pink-200 dark:border-pink-900/50">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4">
                      <Lock className="h-6 w-6 text-pink-500" />
                    </div>
                    <CardTitle>非公開</CardTitle>
                    <CardDescription>自分だけの思い出として</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-sm text-muted-foreground">
                      あなただけが閲覧できる完全プライベートな設定です。マイページでいつでも振り返ることができます。
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 dark:border-purple-900/50">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                      <Globe className="h-6 w-6 text-purple-500" />
                    </div>
                    <CardTitle>公開</CardTitle>
                    <CardDescription>みんなと共有</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-sm text-muted-foreground">
                      誰でも閲覧できる公開設定です。TOPページの一覧に表示され、他のユーザーと推し活を共有できます。
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-indigo-200 dark:border-indigo-900/50">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                      <Key className="h-6 w-6 text-indigo-500" />
                    </div>
                    <CardTitle>限定公開</CardTitle>
                    <CardDescription>特別な人だけに</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-sm text-muted-foreground">
                      URLを知っている人だけが閲覧できる設定です。パスワード保護も可能で、特定の人だけに共有できます。
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* App Preview Section */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-pink-100 text-pink-800 hover:bg-pink-100">アプリプレビュー</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                <span className="text-pink-500">使いやすい</span>インターフェース
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                直感的な操作で、あなたの推し活をカンタンに記録・管理できます
              </p>
            </div>

            <Tabs defaultValue="mypage" className="w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="mypage">マイページ</TabsTrigger>
                <TabsTrigger value="post">新規投稿</TabsTrigger>
                <TabsTrigger value="detail">詳細ページ</TabsTrigger>
              </TabsList>
              <TabsContent value="mypage" className="relative">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 opacity-75 blur-sm"></div>
                <div className="relative rounded-xl overflow-hidden border bg-background">
                  <Image
                    src="/placeholder.svg?height=600&width=1200"
                    width={1200}
                    height={600}
                    alt="マイページのスクリーンショット"
                    className="w-full"
                  />
                </div>
              </TabsContent>
              <TabsContent value="post" className="relative">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 opacity-75 blur-sm"></div>
                <div className="relative rounded-xl overflow-hidden border bg-background">
                  <Image
                    src="/placeholder.svg?height=600&width=1200"
                    width={1200}
                    height={600}
                    alt="新規投稿画面のスクリーンショット"
                    className="w-full"
                  />
                </div>
              </TabsContent>
              <TabsContent value="detail" className="relative">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 opacity-75 blur-sm"></div>
                <div className="relative rounded-xl overflow-hidden border bg-background">
                  <Image
                    src="/placeholder.svg?height=600&width=1200"
                    width={1200}
                    height={600}
                    alt="詳細ページのスクリーンショット"
                    className="w-full"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gradient-to-b from-background to-pink-50 dark:to-background">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-pink-100 text-pink-800 hover:bg-pink-100">ユーザーの声</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
                推しTagを使って推し活をもっと楽しんでいるユーザーの声をご紹介します
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                推しTagを使って推し活をもっと楽しんでいるユーザーの声をご紹介します
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-white dark:bg-background border-pink-100 dark:border-pink-900/20">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="ユーザーアイコン" />
                      <AvatarFallback>AK</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">あきこ</CardTitle>
                      <CardDescription>アイドルオタク歴10年</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-pink-500 text-pink-500" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    「推し活の思い出をきれいに整理できて最高です！特にNFCタグ機能が便利で、推しグッズに貼り付けて思い出を紐づけています。友達にも勧めたいサービスです！」
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-background border-purple-100 dark:border-purple-900/20">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="ユーザーアイコン" />
                      <AvatarFallback>TK</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">たくや</CardTitle>
                      <CardDescription>声優ファン</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-purple-500 text-purple-500" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    「イベントの写真や感想を記録するのに最適です。限定公開機能で仲間内だけで共有できるのが気に入っています。印刷機能も使いやすくて、推し活アルバムを作るのが楽しみになりました！」
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-background border-indigo-100 dark:border-indigo-900/20">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="ユーザーアイコン" />
                      <AvatarFallback>MY</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">みゆき</CardTitle>
                      <CardDescription>2.5次元舞台ファン</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-indigo-500 text-indigo-500" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    「舞台の感想や写真を整理するのにぴったりです。SNS共有機能でOGP画像が自動生成されるのが素敵！他のファンとの交流も増えて、推し活がもっと楽しくなりました。」
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-pink-100 text-pink-800 hover:bg-pink-100">料金プラン</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                あなたの<span className="text-pink-500">推し活スタイル</span>に合わせたプラン
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                無料プランから始めて、必要に応じてアップグレードできます
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              <Card className="border-pink-200 dark:border-pink-900/50">
                <CardHeader>
                  <CardTitle>フリープラン</CardTitle>
                  <div className="mt-4 flex items-baseline text-pink-500">
                    <span className="text-4xl font-extrabold tracking-tight">¥0</span>
                    <span className="ml-1 text-sm font-medium text-muted-foreground">/月</span>
                  </div>
                  <CardDescription className="mt-4">推し活を始めたばかりの方に</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                      <span>月10件までの投稿</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                      <span>基本的な共有機能</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                      <span>標準画質での印刷</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                      <span>NFCタグ書き込み機能</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                      <span>カスタムOGP画像</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">無料で始める</Button>
                </CardFooter>
              </Card>

              <Card className="border-purple-200 dark:border-purple-900/50 relative">
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-t-lg"></div>
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                    人気プラン
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle>スタンダードプラン</CardTitle>
                  <div className="mt-4 flex items-baseline text-purple-500">
                    <span className="text-4xl font-extrabold tracking-tight">¥980</span>
                    <span className="ml-1 text-sm font-medium text-muted-foreground">/月</span>
                  </div>
                  <CardDescription className="mt-4">定期的に推し活を楽しむ方に</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span>無制限の投稿</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span>高度な共有機能</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span>高画質での印刷</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span>NFCタグ書き込み機能</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span>カスタムOGP画像</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                    プランを選択
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-indigo-200 dark:border-indigo-900/50">
                <CardHeader>
                  <CardTitle>プレミアムプラン</CardTitle>
                  <div className="mt-4 flex items-baseline text-indigo-500">
                    <span className="text-4xl font-extrabold tracking-tight">¥1,980</span>
                    <span className="ml-1 text-sm font-medium text-muted-foreground">/月</span>
                  </div>
                  <CardDescription className="mt-4">本格的に推し活を楽しむ方に</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span>スタンダードプランの全機能</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span>プロフェッショナル印刷サービス</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span>優先サポート</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span>高度な分析機能</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span>推し活アルバム自動生成</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">プランを選択</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gradient-to-b from-background to-pink-50 dark:to-background">
          <div className="container">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-pink-100 text-pink-800 hover:bg-pink-100">よくある質問</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
                よくある質問
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                推しTagについてよくある質問にお答えします
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>推しTagとは何ですか？</AccordionTrigger>
                  <AccordionContent>
                    推しTagは、あなたの推し活を記録・共有・印刷できるサービスです。推しイベントの参加記録や思い出を整理し、同じ推しを持つ仲間と共有したり、思い出をフォトブックとして印刷することができます。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>無料プランでも十分に使えますか？</AccordionTrigger>
                  <AccordionContent>
                    はい、無料プランでも月10件までの投稿、基本的な共有機能、標準画質での印刷など、主要な機能をお使いいただけます。より多くの投稿や高度な機能が必要な場合は、有料プランへのアップグレードをご検討ください。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>NFCタグ機能とは何ですか？</AccordionTrigger>
                  <AccordionContent>
                    NFCタグ機能を使うと、あなたの推し活の記録をNFCタグに書き込むことができます。このタグをグッズや写真に貼り付けることで、スマートフォンをかざすだけで関連する推し活の記録を表示することができます。思い出を物理的なアイテムと紐づけることができる便利な機能です。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>印刷機能はどのように使えますか？</AccordionTrigger>
                  <AccordionContent>
                    EPSON Connect
                    APIを利用した印刷機能により、あなたの推し活をきれいにレイアウトして写真サイズで印刷することができます。対応するEPSONプリンターをお持ちであれば、ワンクリックで印刷指示を送ることができます。プレミアムプランでは、プロフェッショナル印刷サービスも利用可能です。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>プライバシー設定について教えてください</AccordionTrigger>
                  <AccordionContent>
                    Oshi
                    Tagでは3種類のプライバシー設定をご用意しています。「非公開」は自分だけが閲覧できる設定、「公開」は誰でも閲覧でき一覧にも表示される設定、「限定公開」はURLを知っている人だけが閲覧でき、パスワード保護も可能な設定です。あなたの推し活をどのように共有するか、完全にコントロールできます。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>有料プランはいつでもキャンセルできますか？</AccordionTrigger>
                  <AccordionContent>
                    はい、有料プランはいつでもキャンセルすることができます。キャンセル後は、次の請求サイクルから無料プランに戻ります。それまでに投稿したコンテンツはそのまま保持されますが、無料プランの制限が適用されます。
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-6 py-16 sm:px-12 sm:py-24 md:px-20">
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
                  あなたの推し活をもっと特別なものに
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  今すぐ無料で始めて、あなたの大切な推し活の思い出を記録・共有・印刷しましょう。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-pink-600 hover:bg-white/90">
                    無料で始める
                  </Button>
                </div>
              </div>
              <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/10 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-indigo-900/30 to-transparent"></div>
              <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-pink-400/30 blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-400/30 blur-3xl"></div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image 
                  src="/oshi-tag_logo.png" 
                  alt="推しTag" 
                  width={24} 
                  height={24} 
                  className="rounded-full"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  推しTag
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                推し活を記録・共有・印刷できるWebサービス。
                <br />
                あなたの大切な思い出をもっと素敵に残そう。
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-pink-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-pink-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-pink-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">サービス</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    機能紹介
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    料金プラン
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    よくある質問
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    ブログ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">サポート</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    ヘルプセンター
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    お問い合わせ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    利用ガイド
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    コミュニティ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">会社情報</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    会社概要
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    プライバシーポリシー
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    利用規約
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    特定商取引法に基づく表記
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} 推しTag. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Avatar({ children, className, ...props }) {
  return (
    <div className={`relative h-10 w-10 rounded-full ${className}`} {...props}>
      {children}
    </div>
  )
}

function AvatarImage({ src, alt, className, ...props }) {
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={40}
      height={40}
      className={`aspect-square h-full w-full rounded-full object-cover ${className}`}
      {...props}
    />
  )
}

function AvatarFallback({ className, children, ...props }) {
  return (
    <div className={`flex h-full w-full items-center justify-center rounded-full bg-muted ${className}`} {...props}>
      {children}
    </div>
  )
}

