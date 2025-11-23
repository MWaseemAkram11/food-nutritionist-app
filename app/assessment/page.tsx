"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppHeader } from "@/components/layout/app-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function AssessmentPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    diseases: [] as string[],
    allergies: [] as string[],
    dietaryPreference: "",
    goals: [] as string[],
    activityLevel: "",
  })

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return null
  }

  const diseaseOptions = ["Diabetes", "Hypertension", "PCOS", "Heart Disease", "Thyroid", "None"]
  const allergyOptions = ["Nuts", "Gluten", "Lactose", "Seafood", "Eggs", "Soy", "None"]
  const goalOptions = ["Weight Loss", "Weight Gain", "Muscle Building", "General Fitness", "Endurance"]

  const toggleOption = (field: "diseases" | "allergies" | "goals", option: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(option) ? prev[field].filter((item) => item !== option) : [...prev[field], option],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/diet")
  }

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-80">
        <AppHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6 max-w-3xl mx-auto">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Health Assessment</h1>
              <p className="text-muted-foreground">Get personalized recommendations based on your health profile</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Step {step} of 5</CardTitle>
                <div className="flex gap-2 mt-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className={`flex-1 h-2 rounded-full ${s <= step ? "bg-primary" : "bg-muted"}`} />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Medical Conditions */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-semibold mb-3 block">
                          Do you have any medical conditions?
                        </Label>
                        <div className="space-y-3">
                          {diseaseOptions.map((disease) => (
                            <div key={disease} className="flex items-center">
                              <Checkbox
                                id={`disease-${disease}`}
                                checked={formData.diseases.includes(disease)}
                                onCheckedChange={() => toggleOption("diseases", disease)}
                              />
                              <Label htmlFor={`disease-${disease}`} className="ml-3 font-normal cursor-pointer">
                                {disease}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Allergies */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-semibold mb-3 block">Do you have any food allergies?</Label>
                        <div className="space-y-3">
                          {allergyOptions.map((allergy) => (
                            <div key={allergy} className="flex items-center">
                              <Checkbox
                                id={`allergy-${allergy}`}
                                checked={formData.allergies.includes(allergy)}
                                onCheckedChange={() => toggleOption("allergies", allergy)}
                              />
                              <Label htmlFor={`allergy-${allergy}`} className="ml-3 font-normal cursor-pointer">
                                {allergy}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Dietary Preference */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Dietary Preference</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {["Vegetarian", "Non-Vegetarian", "Vegan", "Keto"].map((pref) => (
                          <Button
                            key={pref}
                            type="button"
                            variant={formData.dietaryPreference === pref ? "default" : "outline"}
                            onClick={() => setFormData((prev) => ({ ...prev, dietaryPreference: pref }))}
                          >
                            {pref}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Goals */}
                  {step === 4 && (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-semibold mb-3 block">What are your fitness goals?</Label>
                        <div className="space-y-3">
                          {goalOptions.map((goal) => (
                            <div key={goal} className="flex items-center">
                              <Checkbox
                                id={`goal-${goal}`}
                                checked={formData.goals.includes(goal)}
                                onCheckedChange={() => toggleOption("goals", goal)}
                              />
                              <Label htmlFor={`goal-${goal}`} className="ml-3 font-normal cursor-pointer">
                                {goal}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Activity Level */}
                  {step === 5 && (
                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Activity Level</Label>
                      <div className="grid grid-cols-1 gap-3">
                        {["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extremely Active"].map(
                          (level) => (
                            <Button
                              key={level}
                              type="button"
                              variant={formData.activityLevel === level ? "default" : "outline"}
                              onClick={() => setFormData((prev) => ({ ...prev, activityLevel: level }))}
                              className="justify-start"
                            >
                              {level}
                            </Button>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex gap-3 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(Math.max(1, step - 1))}
                      disabled={step === 1}
                    >
                      Back
                    </Button>
                    {step < 5 ? (
                      <Button type="button" onClick={() => setStep(step + 1)} className="flex-1">
                        Next
                      </Button>
                    ) : (
                      <Button type="submit" className="flex-1">
                        Generate My Plan
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
