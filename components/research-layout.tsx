"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, StopCircle, Terminal, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResearchLayoutProps {
  children: React.ReactNode
  vncPanel?: React.ReactNode
  isResearching: boolean
  sandboxTime?: number
  onStopSandbox?: () => void
}

export function ResearchLayout({
  children,
  vncPanel,
  isResearching,
  sandboxTime = 0,
  onStopSandbox,
}: ResearchLayoutProps) {
  const [minimized, setMinimized] = useState(false)
  const [timeLeft, setTimeLeft] = useState(sandboxTime)

  useEffect(() => {
    if (!isResearching || sandboxTime <= 0) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isResearching, sandboxTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-brand-purple" />
          <h1 className="text-lg font-bold gradient-text">ASO Keyword Research</h1>
        </div>
        {isResearching && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Sandbox time: {formatTime(timeLeft)}</span>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={onStopSandbox}
              className="bg-red-900/30 hover:bg-red-900/50 text-red-400"
            >
              <StopCircle className="h-4 w-4 mr-2" />
              Stop Sandbox
            </Button>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* VNC Panel */}
        {vncPanel && (
          <div
            className={cn("border-r border-border transition-all duration-300 relative", minimized ? "w-0" : "w-1/2")}
          >
            <div className="absolute top-2 right-2 z-10 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-secondary/80 backdrop-blur-sm"
                onClick={() => setMinimized(!minimized)}
              >
                {minimized ? <span className="text-xs font-medium">Show</span> : <X className="h-4 w-4" />}
              </Button>
            </div>
            <div className="h-full overflow-hidden">{vncPanel}</div>
          </div>
        )}

        {/* Input/Results Panel */}
        <div className={cn("flex-1 overflow-auto p-4", minimized && "w-full")}>
          <Card className="border-border bg-card h-full overflow-auto">{children}</Card>
        </div>
      </div>
    </div>
  )
}
