"use client"

import { useEffect, useRef } from "react"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
}

interface ChatLogProps {
  messages: Message[]
  isLoading?: boolean
}

export function ChatLog({ messages, isLoading = false }: ChatLogProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
    <>
      <CardHeader>
        <CardTitle>Agent Activity</CardTitle>
        <CardDescription>Watch as our AI agent researches keywords for your app</CardDescription>
      </CardHeader>
      <CardContent className="p-4 overflow-auto max-h-[calc(100vh-12rem)]">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 p-4 rounded-lg",
                message.role === "user"
                  ? "bg-secondary/50 border border-border"
                  : message.role === "assistant"
                    ? "bg-secondary/30"
                    : "bg-secondary/10 text-muted-foreground text-sm",
              )}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                {message.role === "assistant" ? (
                  <Bot className="h-5 w-5 text-brand-purple" />
                ) : message.role === "user" ? (
                  <User className="h-5 w-5 text-brand-blue" />
                ) : (
                  <div className="h-5 w-5 rounded-full bg-secondary" />
                )}
              </div>
              <div className="flex-1">
                <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 p-4 rounded-lg bg-secondary/30">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                <Bot className="h-5 w-5 text-brand-purple" />
              </div>
              <div className="flex-1">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-brand-purple/30 animate-pulse"></div>
                  <div className="h-3 w-3 rounded-full bg-brand-purple/30 animate-pulse delay-150"></div>
                  <div className="h-3 w-3 rounded-full bg-brand-purple/30 animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </CardContent>
    </>
  )
}
