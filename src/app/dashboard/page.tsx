"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Globe,
  Settings,
  HelpCircle,
  LogOut,
  Plus,
  ExternalLink,
  Settings2,
  Trash2,
  Bell,
  User,
  ChevronDown,
  Activity,
  HardDrive,
  Wifi,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { redirect } from "next/dist/server/api-utils"

// Sample data for demonstration
const sampleSites = [
  {
    id: 1,
    name: "My Portfolio",
    domain: "portfolio.OnPretty.dev",
    status: "active",
    lastDeployed: "2 hours ago",
    visits: "1.2K",
  },
  {
    id: 2,
    name: "Company Website",
    domain: "www.mycompany.com",
    status: "active",
    lastDeployed: "1 day ago",
    visits: "5.8K",
  },
  {
    id: 3,
    name: "Blog Site",
    domain: "blog.OnPretty.dev",
    status: "provisioning",
    lastDeployed: "Deploying...",
    visits: "0",
  },
  {
    id: 4,
    name: "Landing Page",
    domain: "landing.OnPretty.dev",
    status: "suspended",
    lastDeployed: "1 week ago",
    visits: "892",
  },
]

const usageStats = {
  totalStorage: "2.4 GB",
  storageLimit: "10 GB",
  bandwidth: "45.2 GB",
  bandwidthLimit: "100 GB",
  totalSites: 4,
  activeSites: 2,
}

// Navigation items
const navItems = [
  {
    title: "My Sites",
    url: "/dashboard",
    icon: Globe,
    isActive: true,
  },
  {
    title: "Account Settings",
    url: "/account",
    icon: Settings,
  },
  {
    title: "Help & Support",
    url: "#",
    icon: HelpCircle,
  },
]

export default function DashboardPage() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        )
      case "provisioning":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Provisioning
          </Badge>
        )
      case "suspended":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Suspended
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Unknown
          </Badge>
        )
    }
  }

  const handleDeleteSite = (siteId: number) => {
    console.log(`Deleting site ${siteId}`)
    setShowDeleteConfirm(null)
    // Implement delete logic here
  }

  const handleLogout = () => {
    console.log("Logging out...")
    // Implement logout logic here
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <Globe className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">OnPretty</span>
                    <span className="truncate text-xs">Dashboard</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">JD</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">John Doe</span>
                      <span className="truncate text-xs">john@example.com</span>
                    </div>
                    <ChevronDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarFallback className="rounded-lg">JD</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">John Doe</span>
                        <span className="truncate text-xs">john@example.com</span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-sidebar-border" />
            <h1 className="text-2xl font-bold">My Sites</h1>
          </div>
          <div className="ml-auto flex items-center gap-2 px-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Notifications/Alerts */}
          <Alert className="border-blue-200 bg-blue-50">
            <Bell className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>New Feature:</strong> Custom domains are now available on all paid plans.{" "}
              <Link href="#" className="underline font-medium">
                Learn more
              </Link>
            </AlertDescription>
          </Alert>

          {/* Create New Site Button */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Your Websites</h2>
              <p className="text-sm text-gray-600">Manage and monitor your hosted sites</p>
            </div>
            <Link href="/create-site">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create New Site
              </Button>
            </Link>
          </div>

          {/* Sites Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sampleSites.map((site) => (
              <Card key={site.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{site.name}</CardTitle>
                      <CardDescription className="text-sm font-mono">{site.domain}</CardDescription>
                    </div>
                    {getStatusBadge(site.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Last deployed: {site.lastDeployed}</span>
                    <span>{site.visits} visits</span>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/site/${site.id}`} className="flex-1 bg-transparent">
                      <Button size="sm" variant="outline" className="w-full">
                        <Settings2 className="w-3 h-3 mr-1" />
                        Manage
                      </Button>
                    </Link>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Live
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                      onClick={() => setShowDeleteConfirm(site.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>

                  {showDeleteConfirm === site.id && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-800 mb-2">Are you sure you want to delete this site?</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteSite(site.id)}
                          className="flex-1"
                        >
                          Delete
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowDeleteConfirm(null)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Usage Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Usage Summary
              </CardTitle>
              <CardDescription>Your current plan usage and limits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Storage Used</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{usageStats.totalStorage}</span>
                      <span className="text-gray-500">of {usageStats.storageLimit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "24%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Bandwidth</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{usageStats.bandwidth}</span>
                      <span className="text-gray-500">of {usageStats.bandwidthLimit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Total Sites</span>
                  </div>
                  <div className="text-2xl font-bold">{usageStats.totalSites}</div>
                  <div className="text-sm text-gray-500">sites created</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Active Sites</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{usageStats.activeSites}</div>
                  <div className="text-sm text-gray-500">currently live</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
