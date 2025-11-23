"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppHeader } from "@/components/layout/app-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

export default function ProgressPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return null
  }

  // Mock data for charts
  const weightData = [
    { date: "Jan 1", weight: 80 },
    { date: "Jan 8", weight: 79.5 },
    { date: "Jan 15", weight: 78.8 },
    { date: "Jan 22", weight: 78.2 },
    { date: "Jan 29", weight: 77.5 },
    { date: "Feb 5", weight: 76.8 },
    { date: "Feb 12", weight: 75.2 },
  ]

  const calorieData = [
    { day: "Mon", consumed: 2100, goal: 2000 },
    { day: "Tue", consumed: 1950, goal: 2000 },
    { day: "Wed", consumed: 2150, goal: 2000 },
    { day: "Thu", consumed: 2000, goal: 2000 },
    { day: "Fri", consumed: 2050, goal: 2000 },
    { day: "Sat", consumed: 2200, goal: 2000 },
    { day: "Sun", consumed: 1900, goal: 2000 },
  ]

  const waterData = [
    { date: "Day 1", liters: 6 },
    { date: "Day 2", liters: 7.5 },
    { date: "Day 3", liters: 5.5 },
    { date: "Day 4", liters: 8 },
    { date: "Day 5", liters: 7 },
    { date: "Day 6", liters: 8.5 },
    { date: "Day 7", liters: 6.5 },
  ]

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-80">
        <AppHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6 max-w-6xl mx-auto">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Progress Tracking</h1>
              <p className="text-muted-foreground">Monitor your health journey</p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">Weight Lost</p>
                  <p className="text-3xl font-bold text-accent">4.8 kg</p>
                  <p className="text-xs text-muted-foreground mt-2">Since Jan 1</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">Avg Daily Calories</p>
                  <p className="text-3xl font-bold text-primary">2,050</p>
                  <p className="text-xs text-muted-foreground mt-2">This week</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">Total Workouts</p>
                  <p className="text-3xl font-bold">18</p>
                  <p className="text-xs text-muted-foreground mt-2">Last 4 weeks</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">Current Streak</p>
                  <p className="text-3xl font-bold text-secondary">7 days</p>
                  <p className="text-xs text-muted-foreground mt-2">Consistency</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Tabs */}
            <Tabs defaultValue="weight" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="weight">Weight</TabsTrigger>
                <TabsTrigger value="calories">Calories</TabsTrigger>
                <TabsTrigger value="water">Water Intake</TabsTrigger>
              </TabsList>

              <TabsContent value="weight" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weight Progress</CardTitle>
                    <CardDescription>Your weight changes over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={weightData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[75, 81]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="weight" stroke="#7c6b4f" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="calories" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Calorie Intake</CardTitle>
                    <CardDescription>Consumed vs goal</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={calorieData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="consumed" fill="#72a566" name="Consumed" />
                        <Bar dataKey="goal" fill="#cbd5e1" name="Goal" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="water" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Water Intake</CardTitle>
                    <CardDescription>Daily water consumption (liters)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={waterData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="liters" fill="#72a566" stroke="#72a566" name="Liters" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Weekly Report */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress Report</CardTitle>
                <CardDescription>AI-generated insights for this week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">Excellent Progress! 🎉</h4>
                  <p className="text-sm">
                    You've maintained consistent calorie intake this week and achieved 4 out of 7 planned workouts. Keep
                    up the momentum!
                  </p>
                </div>
                <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                  <h4 className="font-semibold text-accent mb-2">Water Intake Reminder</h4>
                  <p className="text-sm">
                    Your water intake was slightly below target on Wed and Fri. Aim for 8 liters daily to support your
                    fitness goals.
                  </p>
                </div>
                <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/20">
                  <h4 className="font-semibold text-secondary mb-2">Next Week's Goal</h4>
                  <p className="text-sm">
                    Focus on completing all 7 planned workouts and maintaining consistent water intake. You're on track
                    to reach your target weight!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
