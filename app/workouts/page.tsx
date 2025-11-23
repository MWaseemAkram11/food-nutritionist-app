"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppHeader } from "@/components/layout/app-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MOCK_WORKOUT_PLANS } from "@/lib/mock-diet-data"

export default function WorkoutsPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState(0)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return null
  }

  const plan = MOCK_WORKOUT_PLANS[selectedPlan]
  const totalCalories = plan.exercises.reduce((acc, ex) => acc + ex.caloriesBurned, 0)

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-80">
        <AppHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6 max-w-5xl mx-auto">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Workout Plans</h1>
              <p className="text-muted-foreground">AI-generated personalized training routines</p>
            </div>

            {/* Plan Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_WORKOUT_PLANS.map((p, idx) => (
                <Card
                  key={p.id}
                  className={`cursor-pointer transition-all ${selectedPlan === idx ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedPlan(idx)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{p.name}</h3>
                      <Badge variant={p.difficulty === "Beginner" ? "secondary" : "default"}>{p.difficulty}</Badge>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <p>⏱️ {p.duration} minutes</p>
                      <p>📍 {p.type === "home" ? "Home Workouts" : "Gym Required"}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Workout
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Plan Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>
                      {plan.duration} minutes • {plan.exercises.length} exercises
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge className="mb-2">{plan.difficulty}</Badge>
                    <p className="text-sm font-semibold text-primary">~{totalCalories} cal</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {plan.exercises.map((exercise, idx) => (
                  <Card key={exercise.id} className="bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold flex items-center gap-2">
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-sm">
                              {idx + 1}
                            </span>
                            {exercise.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{exercise.description}</p>
                        </div>
                        <span className="text-sm font-bold text-accent">{exercise.caloriesBurned} cal</span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3 text-xs">
                        <div className="bg-background/50 p-2 rounded">
                          <span className="text-muted-foreground">Sets</span>
                          <p className="font-semibold">{exercise.sets}</p>
                        </div>
                        <div className="bg-background/50 p-2 rounded">
                          <span className="text-muted-foreground">Reps</span>
                          <p className="font-semibold">{exercise.reps}</p>
                        </div>
                        <div className="bg-background/50 p-2 rounded">
                          <span className="text-muted-foreground">Rest</span>
                          <p className="font-semibold">{exercise.rest}s</p>
                        </div>
                        <div className="bg-background/50 p-2 rounded">
                          <span className="text-muted-foreground">Duration</span>
                          <p className="font-semibold">{exercise.duration}min</p>
                        </div>
                        <div className="bg-background/50 p-2 rounded">
                          <span className="text-muted-foreground">Level</span>
                          <p className="font-semibold capitalize">{exercise.difficulty}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
