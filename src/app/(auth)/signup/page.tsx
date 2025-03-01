import { Metadata } from "next"
import { SignUpForm } from "@/components/auth/signup-form"

export const metadata: Metadata = {
  title: "新規登録 - 推しTag",
  description: "推しTagに新規登録して、推し活を記録・共有しましょう",
}

export default function SignUpPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <SignUpForm />
    </div>
  )
} 