"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, router])

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-foreground">HealthFlow</span>
          </div>
        </div>

        <LoginForm />

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center text-xs">
          <div>
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary mb-2">
              🎯
            </div>
            <p className="text-muted-foreground">Personalized Plans</p>
          </div>
          <div>
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 text-accent mb-2">
              📊
            </div>
            <p className="text-muted-foreground">Track Progress</p>
          </div>
          <div>
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/10 text-secondary mb-2">
              💬
            </div>
            <p className="text-muted-foreground">AI Assistant</p>
          </div>
        </div>
      </div>
    </main>
  )
}
