"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppHeader } from "@/components/layout/app-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const BOT_RESPONSES: Record<string, string> = {
  diabetes:
    "For diabetes management, I recommend focusing on low-glycemic foods like oats, beans, and leafy greens. Avoid sugary drinks and refined carbohydrates. Your daily calorie goal should be around 2,000 with a focus on complex carbs and lean proteins.",
  "weight loss":
    "To achieve sustainable weight loss, create a 500-calorie daily deficit. Focus on whole foods, high-protein intake to preserve muscle, and regular cardio combined with resistance training. Stay consistent!",
  "high bp":
    "For blood pressure management, reduce sodium intake, increase potassium-rich foods (bananas, sweet potatoes), and perform 150 minutes of moderate cardio weekly. Avoid processed foods and manage stress.",
  protein:
    "Great choice! Protein helps with muscle recovery and satiety. Aim for 1.6-2.2g per kg of body weight daily. Good sources include chicken, fish, eggs, Greek yogurt, and legumes.",
  breakfast:
    "Some healthy breakfast ideas: Oatmeal with berries, Protein pancakes with honey, Greek yogurt with nuts, or Scrambled eggs with whole wheat toast. Each option provides balanced macros to start your day right.",
  default:
    "I'm your AI Health Assistant! I can help you with diet recommendations, workout advice, nutrition facts about foods, and answer questions about your health goals. What would you like to know?",
}

export default function ChatPage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your personal AI Health Assistant. I can help you with diet recommendations, workout advice, food nutrition, and answer any health-related questions. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Find matching response
    let botResponse = BOT_RESPONSES["default"]
    const lowerInput = input.toLowerCase()

    for (const [key, response] of Object.entries(BOT_RESPONSES)) {
      if (lowerInput.includes(key)) {
        botResponse = response
        break
      }
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: botResponse,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsTyping(false)
  }

  if (isLoading || !isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-80">
        <AppHeader />

        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" />
                    <div
                      className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border bg-card p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Ask me about diet, workouts, nutrition..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isTyping || !input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
