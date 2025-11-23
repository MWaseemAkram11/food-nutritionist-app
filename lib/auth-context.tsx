"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type User, authenticateUser, generateMockToken } from "./mock-data"

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth")
    if (savedAuth) {
      try {
        const { user: savedUser, token: savedToken } = JSON.parse(savedAuth)
        setUser(savedUser)
        setToken(savedToken)
        setIsAuthenticated(true)
      } catch (e) {
        localStorage.removeItem("auth")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      const authenticatedUser = authenticateUser(email, password)
      if (!authenticatedUser) {
        return { success: false, error: "Invalid email or password" }
      }

      const newToken = generateMockToken(authenticatedUser.id)

      setUser(authenticatedUser)
      setToken(newToken)
      setIsAuthenticated(true)

      // Save to localStorage
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: authenticatedUser,
          token: newToken,
        }),
      )

      return { success: true }
    } catch (error) {
      return { success: false, error: "Login failed" }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem("auth")
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
