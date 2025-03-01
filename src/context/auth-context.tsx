"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signUp: async () => ({}),
  signIn: async () => ({}),
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 現在のユーザー情報を取得
    const fetchUser = async () => {
      try {
        // Supabaseの認証状態を確認
        const { data, error } = await supabase.auth.getUser()
        
        if (error) {
          console.error("認証情報の取得中にエラーが発生しました", error)
          setUser(null)
        } else {
          setUser(data.user)
        }
      } catch (error) {
        console.error("認証処理中に予期せぬエラーが発生しました", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

    // 認証状態の変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("認証状態が変更されました:", event)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // サインアップ関数
  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      return data
    } catch (error) {
      console.error("サインアップ中にエラーが発生しました:", error)
      throw error
    }
  }

  // サインイン関数
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return data
    } catch (error) {
      console.error("サインイン中にエラーが発生しました:", error)
      throw error
    }
  }

  // サインアウト関数
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error("サインアウト中にエラーが発生しました:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
} 