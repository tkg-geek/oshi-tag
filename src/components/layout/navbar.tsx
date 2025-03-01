"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { UserProfile } from "@/components/auth/user-profile"
import { LogoutButton } from "@/components/auth/logout-button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const { user, loading } = useAuth()
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/oshi-tag_logo.png" 
              alt="推しTag" 
              width={32} 
              height={32} 
              className="rounded-full"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              推しTag
            </span>
          </Link>
        </div>
        
        {/* デスクトップ用ナビゲーション */}
        <nav className="hidden md:flex gap-6">
          {user ? (
            <>
              <Link href="/" className="text-sm font-medium hover:text-pink-500 transition-colors">
                ホーム
              </Link>
              <Link href="/posts" className="text-sm font-medium hover:text-pink-500 transition-colors">
                投稿一覧
              </Link>
              <Link href="/my-page" className="text-sm font-medium hover:text-pink-500 transition-colors">
                マイページ
              </Link>
            </>
          ) : isHomePage ? (
            <>
              <Link href="#features" className="text-sm font-medium hover:text-pink-500 transition-colors">
                機能
              </Link>
              <Link href="#testimonials" className="text-sm font-medium hover:text-pink-500 transition-colors">
                ユーザーの声
              </Link>
              <Link href="#pricing" className="text-sm font-medium hover:text-pink-500 transition-colors">
                料金プラン
              </Link>
              <Link href="#faq" className="text-sm font-medium hover:text-pink-500 transition-colors">
                よくある質問
              </Link>
            </>
          ) : (
            <Link href="/" className="text-sm font-medium hover:text-pink-500 transition-colors">
              ホーム
            </Link>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
          {loading ? (
            <div className="h-10 w-20 animate-pulse rounded bg-muted"></div>
          ) : user ? (
            <div className="flex items-center gap-4">
              <UserProfile className="hidden md:flex" />
              <LogoutButton className="hidden md:flex" />
              
              {/* モバイル用ハンバーガーメニュー */}
              <div className="relative md:hidden">
                <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="md:hidden">
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                  <span className="sr-only">メニューを開く</span>
                </Button>
                
                {mobileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-4 space-y-4 z-50">
                    <UserProfile className="mb-2" />
                    <div className="flex flex-col space-y-3">
                      <Link 
                        href="/" 
                        className="text-sm font-medium hover:text-pink-500 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        ホーム
                      </Link>
                      <Link 
                        href="/posts" 
                        className="text-sm font-medium hover:text-pink-500 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        投稿一覧
                      </Link>
                      <Link 
                        href="/my-page" 
                        className="text-sm font-medium hover:text-pink-500 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        マイページ
                      </Link>
                      <div className="pt-2 mt-2 border-t">
                        <LogoutButton className="w-full justify-start" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
                ログイン
              </Link>
              <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                <Link href="/signup">新規登録</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
} 