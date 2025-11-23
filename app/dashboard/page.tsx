"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppHeader } from "@/components/layout/app-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 animate-pulse">
            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            </svg>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-80">
        <AppHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6 max-w-7xl mx-auto">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Current Weight</p>
                      <p className="text-2xl font-bold">{user?.weight || 75} kg</p>
                    </div>
                    <div className="text-3xl">⚖️</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Daily Calories</p>
                      <p className="text-2xl font-bold">2,100</p>
                    </div>
                    <div className="text-3xl">🔥</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Steps Today</p>
                      <p className="text-2xl font-bold">8,234</p>
                    </div>
                    <div className="text-3xl">👟</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Water Intake</p>
                      <p className="text-2xl font-bold">6/8 L</p>
                    </div>
                    <div className="text-3xl">💧</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Health Assessment</CardTitle>
                  <CardDescription>Get personalized AI-powered recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-secondary/10 p-4 rounded-lg">
                      <p className="text-sm mb-3">Last assessment: 3 days ago</p>
                      <div className="space-y-2 mb-4">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Health Score</p>
                          <Progress value={78} className="h-2" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Fitness Level</p>
                          <Progress value={65} className="h-2" />
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" asChild>
                      <a href="/assessment">Take Assessment</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Today's Plan</CardTitle>
                  <CardDescription>Your personalized daily schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                      <span className="text-lg">🌅</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Breakfast</p>
                        <p className="text-xs text-muted-foreground">Oatmeal with berries - 350 cal</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                      <span className="text-lg">💪</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Workout</p>
                        <p className="text-xs text-muted-foreground">30 min cardio - 300 cal</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                      <span className="text-lg">🍽️</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Lunch</p>
                        <p className="text-xs text-muted-foreground">Grilled chicken salad - 450 cal</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent" asChild>
                    <a href="/diet">View Full Plan</a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-24 flex flex-col bg-transparent" asChild>
                <a href="/diet">
                  <span className="text-2xl mb-2">🥗</span>
                  <span>Diet Plans</span>
                </a>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col bg-transparent" asChild>
                <a href="/workouts">
                  <span className="text-2xl mb-2">💪</span>
                  <span>Workouts</span>
                </a>
              </Button>
              <Button variant="outline" className="h-24 flex flex-col bg-transparent" asChild>
                <a href="/chat">
                  <span className="text-2xl mb-2">💬</span>
                  <span>Health Chat</span>
                </a>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
