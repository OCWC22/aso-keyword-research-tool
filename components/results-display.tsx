"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, RefreshCw, Star } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface ResultsDisplayProps {
  markdown: string
  onStartNewResearch: () => void
  onDownload: () => void
}

export function ResultsDisplay({ markdown, onStartNewResearch, onDownload }: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState("report")

  // Extract keywords from markdown (simplified example)
  const extractKeywords = () => {
    const keywordMatch = markdown.match(/\|\s*([^|]+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*(\d+%)\s*\|/g)
    if (!keywordMatch) return []

    return keywordMatch
      .map((row) => {
        const cells = row
          .split("|")
          .map((cell) => cell.trim())
          .filter(Boolean)
        if (cells.length >= 4) {
          return {
            keyword: cells[0],
            volume: Number.parseInt(cells[1]) || 0,
            difficulty: Number.parseInt(cells[2]) || 0,
            relevance: cells[3],
          }
        }
        return null
      })
      .filter(Boolean)
  }

  const keywords = extractKeywords()

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl gradient-text">Research Results</CardTitle>
        <CardDescription>Your keyword research is complete. Review the results below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="report" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-4 bg-secondary">
            <TabsTrigger value="report">Full Report</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
          </TabsList>
          <TabsContent value="report" className="mt-0">
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </TabsContent>
          <TabsContent value="keywords" className="mt-0">
            <div className="rounded-md border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-secondary">
                    <th className="h-10 w-[40px] text-center font-medium"></th>
                    <th className="h-10 px-4 text-left font-medium">Keyword</th>
                    <th className="h-10 px-4 text-center font-medium">Volume</th>
                    <th className="h-10 px-4 text-center font-medium">Difficulty</th>
                    <th className="h-10 px-4 text-center font-medium">Relevance</th>
                  </tr>
                </thead>
                <tbody>
                  {keywords.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-secondary/50 transition-colors">
                      <td className="p-2 text-center">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Star className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </td>
                      <td className="p-4 font-medium">{item.keyword}</td>
                      <td className="p-4 text-center">{item.volume.toLocaleString()}</td>
                      <td className="p-4 text-center">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${
                            item.difficulty < 50
                              ? "bg-brand-green/20 text-brand-green"
                              : item.difficulty < 70
                                ? "bg-brand-cyan/20 text-brand-cyan"
                                : "bg-brand-purple/20 text-brand-purple"
                          }`}
                        >
                          {item.difficulty}/100
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <Badge
                          variant="outline"
                          className="bg-brand-purple/10 text-brand-purple border-brand-purple/20"
                        >
                          {item.relevance}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-border pt-6">
        <Button variant="outline" onClick={onStartNewResearch}>
          <RefreshCw className="mr-2 h-4 w-4" />
          New Research
        </Button>
        <Button className="bg-brand-purple hover:bg-brand-purple/90" onClick={onDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download {activeTab === "report" ? "Report" : "Keywords"}
        </Button>
      </CardFooter>
    </>
  )
}
