"use client"

import { useState } from "react"
import { ResearchLayout } from "@/components/research-layout"
import { VncPanel } from "@/components/vnc-panel"
import { KeywordInputForm } from "@/components/keyword-input-form"
import { ChatLog } from "@/components/chat-log"
import { ResultsDisplay } from "@/components/results-display"
import { useToast } from "@/components/ui/use-toast"

// Sample data for demonstration
const sampleMessages = [
  { id: "1", role: "system", content: "Starting keyword research for your app..." },
  {
    id: "2",
    role: "assistant",
    content: "I'll help you find the best keywords for your app. Let me start by opening Firefox...",
  },
  { id: "3", role: "assistant", content: "Navigating to Google to search for relevant keywords..." },
  { id: "4", role: "assistant", content: "Typing 'productivity app keywords'..." },
  {
    id: "5",
    role: "assistant",
    content: "Found some suggestions: 'task manager', 'to-do list', 'productivity tools'...",
  },
  { id: "6", role: "assistant", content: "Now checking search volumes and competition..." },
]

const sampleMarkdown = `
# ASO Keyword Research Report

## Summary
Based on your app description and seed keywords, I've researched and analyzed potential keywords for your productivity app. Here are the top recommendations.

## Top Keywords

| Keyword | Volume | Difficulty | Relevance |
|---------|--------|------------|-----------|
| task manager app | 8500 | 60 | 98% |
| to do list app | 12000 | 75 | 85% |
| productivity app | 9800 | 70 | 90% |
| task organizer | 3500 | 45 | 95% |
| task reminder | 6500 | 40 | 92% |
| simple task app | 2800 | 30 | 96% |
| project management | 15000 | 85 | 75% |
| time tracking app | 7200 | 55 | 82% |
| habit tracker | 8900 | 65 | 78% |
| daily planner | 6200 | 50 | 88% |

## Analysis

### High Traffic Keywords
- **to do list app**: High search volume (12,000) but also high competition (75/100)
- **productivity app**: Good volume (9,800) with moderate competition (70/100)
- **project management**: Highest volume (15,000) but very competitive (85/100)

### Low Competition Opportunities
- **simple task app**: Low competition (30/100) with decent relevance (96%)
- **task reminder**: Good balance of volume (6,500) and low competition (40/100)
- **task organizer**: Moderate volume (3,500) with low competition (45/100)

## Recommendations

1. **Primary Keywords**: Focus on "task manager app" and "productivity app" as your main keywords
2. **Secondary Keywords**: Include "task reminder" and "task organizer" for better ranking opportunities
3. **Long-tail Keywords**: Add "simple task app" and "daily planner" to capture specific user intent

## Next Steps

1. Incorporate these keywords into your app title, subtitle, and description
2. Monitor performance after implementation
3. Consider A/B testing different keyword combinations
`

export default function ResearchPage() {
  const { toast } = useToast()
  const [isResearching, setIsResearching] = useState(false)
  const [isLoadingSandbox, setIsLoadingSandbox] = useState(false)
  const [vncUrl, setVncUrl] = useState<string | undefined>(undefined)
  const [messages, setMessages] = useState<any[]>([])
  const [markdownResult, setMarkdownResult] = useState<string | null>(null)
  const [sandboxTime, setSandboxTime] = useState(600) // 10 minutes

  const handleStartResearch = (values: any) => {
    setIsResearching(true)
    setIsLoadingSandbox(true)
    setMessages([])
    setMarkdownResult(null)

    // Simulate sandbox loading
    setTimeout(() => {
      setIsLoadingSandbox(false)
      setVncUrl("about:blank") // In a real app, this would be the actual VNC URL

      // Simulate messages coming in
      let index = 0
      const messageInterval = setInterval(() => {
        if (index < sampleMessages.length) {
          setMessages((prev) => [...prev, sampleMessages[index]])
          index++
        } else {
          clearInterval(messageInterval)

          // Simulate research completion
          setTimeout(() => {
            setMarkdownResult(sampleMarkdown)
            setIsResearching(false)
            toast({
              title: "Research Complete",
              description: "Your keyword research has been completed successfully.",
            })
          }, 2000)
        }
      }, 2000)
    }, 3000)
  }

  const handleStopSandbox = () => {
    setIsResearching(false)
    setVncUrl(undefined)
    toast({
      title: "Sandbox Stopped",
      description: "The research sandbox has been stopped.",
    })
  }

  const handleStartNewResearch = () => {
    setMarkdownResult(null)
    setMessages([])
    setVncUrl(undefined)
  }

  const handleDownload = () => {
    if (!markdownResult) return

    const blob = new Blob([markdownResult], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "aso-keyword-research.md"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <ResearchLayout
      isResearching={isResearching}
      sandboxTime={sandboxTime}
      onStopSandbox={handleStopSandbox}
      vncPanel={<VncPanel vncUrl={vncUrl} isLoadingSandbox={isLoadingSandbox} />}
    >
      {markdownResult ? (
        <ResultsDisplay
          markdown={markdownResult}
          onStartNewResearch={handleStartNewResearch}
          onDownload={handleDownload}
        />
      ) : isResearching ? (
        <ChatLog messages={messages} isLoading={messages.length < sampleMessages.length} />
      ) : (
        <KeywordInputForm onSubmit={handleStartResearch} isResearching={isResearching} />
      )}
    </ResearchLayout>
  )
}
