"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppHeader } from "@/components/layout/app-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MOCK_DIET_PLANS } from "@/lib/mock-diet-data"

export default function DietPage() {
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

  const plan = MOCK_DIET_PLANS[selectedPlan]
  const totalMacros = plan.meals.reduce(
    (acc, meal) => ({
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats,
    }),
    { protein: 0, carbs: 0, fats: 0 },
  )

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-80">
        <AppHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6 max-w-5xl mx-auto">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Diet Plans</h1>
              <p className="text-muted-foreground">AI-generated personalized meal plans</p>
            </div>

            {/* Plan Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_DIET_PLANS.map((p, idx) => (
                <Card
                  key={p.id}
                  className={`cursor-pointer transition-all ${selectedPlan === idx ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedPlan(idx)}
                >
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">{p.dailyCalories} kcal/day</span>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selected Plan Details */}
            <Card>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Macros Summary */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-primary/10 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Daily Calories</p>
                    <p className="text-2xl font-bold text-primary">{plan.dailyCalories}</p>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Protein</p>
                    <p className="text-2xl font-bold text-accent">{totalMacros.protein}g</p>
                  </div>
                  <div className="bg-secondary/10 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Carbs</p>
                    <p className="text-2xl font-bold text-secondary">{totalMacros.carbs}g</p>
                  </div>
                  <div className="bg-chart-3/30 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Fats</p>
                    <p className="text-2xl font-bold">{totalMacros.fats}g</p>
                  </div>
                </div>

                {/* Meals */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Daily Meals</h3>
                  <div className="space-y-3">
                    {plan.meals.map((meal) => (
                      <Card key={meal.id} className="bg-muted/50">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-semibold">{meal.name}</p>
                              <p className="text-xs text-muted-foreground capitalize">{meal.type}</p>
                            </div>
                            <span className="text-sm font-bold text-primary">{meal.calories} kcal</span>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3">{meal.reason}</p>

                          <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                            <div>
                              <span className="text-muted-foreground">Protein</span>
                              <p className="font-semibold">{meal.protein}g</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Carbs</span>
                              <p className="font-semibold">{meal.carbs}g</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Fats</span>
                              <p className="font-semibold">{meal.fats}g</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {meal.ingredients.map((ingredient) => (
                              <span key={ingredient} className="text-xs bg-background px-2 py-1 rounded">
                                {ingredient}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
