"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Command, Layers, Search, Settings, Smartphone } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: BarChart3,
    },
    {
      name: "Research",
      path: "/research",
      icon: Search,
    },
    {
      name: "Apps",
      path: "/apps",
      icon: Smartphone,
    },
    {
      name: "Keywords",
      path: "/keywords",
      icon: Layers,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="w-64 border-r border-border bg-card flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Command className="h-6 w-6 text-brand-purple" />
          <span className="font-bold text-xl gradient-text">KeywordAI</span>
        </div>
      </div>
      <div className="px-3 py-2">
        <p className="text-xs font-medium text-muted-foreground mb-3 px-3">MAIN NAVIGATION</p>
        <nav className="space-y-1">
          {routes.map((route) => {
            const isActive = pathname === route.path || pathname.startsWith(`${route.path}/`)
            return (
              <Link key={route.path} href={route.path} className={cn("sidebar-item", isActive && "active")}>
                <route.icon className="h-4 w-4" />
                <span>{route.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-xs font-medium">U</span>
          </div>
          <div>
            <p className="text-sm font-medium">User</p>
            <p className="text-xs text-muted-foreground">Free Plan</p>
          </div>
        </div>
      </div>
    </div>
  )
}
