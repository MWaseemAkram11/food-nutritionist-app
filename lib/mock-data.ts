// Mock authentication and user data for frontend development

export interface User {
  id: string
  email: string
  name: string
  role: "user" | "nutritionist" | "admin"
  avatar?: string
  age?: number
  gender?: string
  height?: number
  weight?: number
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
}

// Mock users database
const MOCK_USERS = [
  {
    id: "1",
    email: "user@example.com",
    password: "password123",
    name: "Alex Johnson",
    role: "user" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    age: 28,
    gender: "Male",
    height: 180,
    weight: 75,
  },
  {
    id: "2",
    email: "nutritionist@example.com",
    password: "password123",
    name: "Dr. Sarah Williams",
    role: "nutritionist" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "3",
    email: "admin@example.com",
    password: "password123",
    name: "Admin User",
    role: "admin" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
  },
]

export function authenticateUser(email: string, password: string): User | null {
  const user = MOCK_USERS.find((u) => u.email === email && u.password === password)
  return user ? ({ ...user, password: undefined } as any) : null
}

export function getUserByEmail(email: string): User | null {
  const user = MOCK_USERS.find((u) => u.email === email)
  return user ? ({ ...user, password: undefined } as any) : null
}

export function generateMockToken(userId: string): string {
  return `mock_token_${userId}_${Date.now()}`
}

export const DEMO_CREDENTIALS = {
  user: { email: "user@example.com", password: "password123" },
  nutritionist: { email: "nutritionist@example.com", password: "password123" },
  admin: { email: "admin@example.com", password: "password123" },
}
