"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppHeader } from "@/components/layout/app-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function AdminPage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, user, router])

  if (isLoading || !isAuthenticated || user?.role !== "admin") {
    return null
  }

  // Mock data
  const mockUsers = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "user@example.com",
      role: "user",
      joinDate: "2024-01-15",
      status: "active",
    },
    {
      id: "2",
      name: "Sarah Williams",
      email: "user2@example.com",
      role: "user",
      joinDate: "2024-02-01",
      status: "active",
    },
    {
      id: "3",
      name: "Mike Smith",
      email: "user3@example.com",
      role: "user",
      joinDate: "2024-01-20",
      status: "inactive",
    },
  ]

  const mockNotifications = [
    { id: "1", title: "Low Water Intake Alert", user: "Alex Johnson", timestamp: "2 hours ago", severity: "warning" },
    { id: "2", title: "Missed Workout", user: "Sarah Williams", timestamp: "4 hours ago", severity: "info" },
    { id: "3", title: "Diet Goal Exceeded", user: "Mike Smith", timestamp: "1 day ago", severity: "alert" },
  ]

  const mockSystemStats = [
    { label: "Total Users", value: "1,234" },
    { label: "Active This Week", value: "892" },
    { label: "Diet Plans Generated", value: "3,456" },
    { label: "Workouts Completed", value: "12,890" },
  ]

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-0 md:ml-80">
        <AppHeader />

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6 max-w-6xl mx-auto">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage users, systems, and platform settings</p>
            </div>

            {/* System Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockSystemStats.map((stat, idx) => (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="notifications">Alerts</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Users Tab */}
              <TabsContent value="users" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>View and manage platform users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg"
                        >
                          <div className="flex-1">
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                            <span className="text-xs text-muted-foreground">{user.joinDate}</span>
                            <Button variant="ghost" size="sm">
                              Manage
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Alerts</CardTitle>
                    <CardDescription>Health and behavior alerts from users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockNotifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-4 border rounded-lg ${
                            notif.severity === "alert"
                              ? "bg-destructive/10 border-destructive"
                              : notif.severity === "warning"
                                ? "bg-accent/10 border-accent"
                                : "bg-muted border-border"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold">{notif.title}</p>
                              <p className="text-sm text-muted-foreground">{notif.user}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">{notif.timestamp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Content Tab */}
              <TabsContent value="content" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Management</CardTitle>
                    <CardDescription>Manage food database, workout plans, and AI templates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      📋 Edit Food Database
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      💪 Manage Workout Plans
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      🤖 Configure AI Prompts
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      🏥 Disease Rules & Constraints
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Settings</CardTitle>
                    <CardDescription>Configure system-wide settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="font-medium">Enable Email Notifications</span>
                      </label>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="font-medium">Allow New User Registrations</span>
                      </label>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="font-medium">Maintenance Mode</span>
                      </label>
                    </div>
                    <Button className="w-full mt-4">Save Settings</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
