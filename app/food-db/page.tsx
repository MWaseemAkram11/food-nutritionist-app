"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppHeader } from "@/components/layout/app-header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MOCK_FOOD_DATABASE } from "@/lib/mock-diet-data"

export default function FoodDatabasePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return null
  }

  const categories = ["All", ...new Set(MOCK_FOOD_DATABASE.map((f) => f.category))]
  const filtered = MOCK_FOOD_DATABASE.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || food.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-80">
        <AppHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6 max-w-6xl mx-auto">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Food Database</h1>
              <p className="text-muted-foreground">Search nutritional information for thousands of foods</p>
            </div>

            {/* Search & Filter */}
            <div className="space-y-4">
              <Input
                placeholder="Search foods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />

              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    onClick={() => setSelectedCategory(cat)}
                    className="whitespace-nowrap"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Food Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((food) => (
                <Card key={food.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{food.name}</h3>
                        <p className="text-xs text-muted-foreground">{food.serving}</p>
                      </div>
                      <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                        {food.calories} cal
                      </span>
                    </div>

                    <div className="bg-muted/30 p-3 rounded-lg mb-3">
                      <div className="grid grid-cols-4 gap-2 text-center text-xs">
                        <div>
                          <span className="text-muted-foreground block">Protein</span>
                          <span className="font-semibold">{food.protein}g</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">Carbs</span>
                          <span className="font-semibold">{food.carbs}g</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">Fat</span>
                          <span className="font-semibold">{food.fats}g</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">Fiber</span>
                          <span className="font-semibold">{food.fiber}g</span>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full text-xs bg-transparent">
                      Add to Meal
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No foods found matching your search</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
