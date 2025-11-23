"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const navigationItems = [
  { label: "Dashboard", href: "/dashboard", icon: "📊" },
  { label: "Health Assessment", href: "/assessment", icon: "🏥" },
  { label: "Diet Plans", href: "/diet", icon: "🥗" },
  { label: "Workouts", href: "/workouts", icon: "💪" },
  { label: "Progress Tracking", href: "/progress", icon: "📈" },
  { label: "Food Database", href: "/food-db", icon: "🍎" },
  { label: "Health Chat", href: "/chat", icon: "💬" },
  { label: "Profile", href: "/profile", icon: "👤" },
]

export function AppSidebar() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (!user) return null

  const isAdmin = user.role === "admin"
  const isNutritionist = user.role === "nutritionist"

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary/10 text-primary"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-transform duration-300 z-40",
          "w-64 md:w-80",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
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
              <div>
                <h1 className="font-bold text-lg">HealthFlow</h1>
                <p className="text-xs text-sidebar-foreground/60">{user.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navigationItems.map((item) => {
              // Filter items based on role
              if (
                isNutritionist &&
                !["Dashboard", "Health Assessment", "Diet Plans", "Workouts", "Profile"].includes(item.label)
              ) {
                return null
              }

              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent",
                  )}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-sidebar-border space-y-4">
            <Link
              href="/profile"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent transition-colors"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-sidebar-foreground/60">{user.email}</p>
              </div>
            </Link>
            <Button onClick={handleLogout} variant="outline" className="w-full bg-transparent">
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="ml-0 md:ml-80">
        {/* Overlay for mobile */}
        {isOpen && <div className="fixed inset-0 bg-black/50 md:hidden z-30" onClick={() => setIsOpen(false)} />}
      </div>
    </>
  )
}
