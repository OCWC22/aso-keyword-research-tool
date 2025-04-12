"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, Filter, Search, SlidersHorizontal, Sparkles, Star } from "lucide-react"

// Sample data for demonstration
const keywordData = [
  { keyword: "task manager app", volume: 8500, difficulty: 60, relevance: 98, competition: "High", trending: true },
  { keyword: "to do list app", volume: 12000, difficulty: 75, relevance: 85, competition: "High", trending: true },
  { keyword: "productivity app", volume: 9800, difficulty: 70, relevance: 90, competition: "High", trending: true },
  { keyword: "task organizer", volume: 3500, difficulty: 45, relevance: 95, competition: "Medium", trending: false },
  { keyword: "task reminder", volume: 6500, difficulty: 40, relevance: 92, competition: "Low", trending: false },
  { keyword: "simple task app", volume: 2800, difficulty: 30, relevance: 96, competition: "Low", trending: false },
  { keyword: "project management", volume: 15000, difficulty: 85, relevance: 75, competition: "High", trending: true },
  { keyword: "time tracking app", volume: 7200, difficulty: 55, relevance: 82, competition: "Medium", trending: true },
  { keyword: "habit tracker", volume: 8900, difficulty: 65, relevance: 78, competition: "Medium", trending: true },
  { keyword: "daily planner", volume: 6200, difficulty: 50, relevance: 88, competition: "Medium", trending: false },
]

export default function KeywordsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])

  const filteredKeywords = keywordData.filter((keyword) =>
    keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleKeywordSelection = (keyword: string) => {
    setSelectedKeywords((prev) => (prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]))
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight gradient-text">Keywords Explorer</h1>
          <p className="text-muted-foreground mt-1">Discover and analyze keywords for your app</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-brand-purple hover:bg-brand-purple/90">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Ideas
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="bg-secondary">
              <TabsTrigger value="all">All Keywords</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="suggested">AI Suggested</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search keywords..."
                  className="pl-10 bg-secondary border-secondary w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="bg-secondary border-secondary">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-secondary border-secondary">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <Card className="border-border bg-card">
              <CardContent className="p-0">
                <div className="rounded-md border border-border overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-secondary">
                        <th className="h-10 w-[40px] text-center font-medium"></th>
                        <th className="h-10 px-4 text-left font-medium">Keyword</th>
                        <th className="h-10 px-4 text-center font-medium">Volume</th>
                        <th className="h-10 px-4 text-center font-medium">Difficulty</th>
                        <th className="h-10 px-4 text-center font-medium">Relevance</th>
                        <th className="h-10 px-4 text-center font-medium">Competition</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredKeywords.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-secondary/50 transition-colors">
                          <td className="p-2 text-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => toggleKeywordSelection(item.keyword)}
                            >
                              <Star
                                className={`h-4 w-4 ${
                                  selectedKeywords.includes(item.keyword)
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-muted-foreground"
                                }`}
                              />
                            </Button>
                          </td>
                          <td className="p-4 font-medium">
                            <div className="flex items-center gap-2">
                              {item.keyword}
                              {item.trending && (
                                <Badge
                                  variant="outline"
                                  className="bg-brand-purple/10 text-brand-purple border-brand-purple/20"
                                >
                                  Trending
                                </Badge>
                              )}
                            </div>
                          </td>
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
                            <span className="inline-block px-2 py-1 rounded-full text-xs bg-brand-green/20 text-brand-green">
                              {item.relevance}%
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs ${
                                item.competition === "Low"
                                  ? "bg-green-500/20 text-green-500"
                                  : item.competition === "Medium"
                                    ? "bg-yellow-500/20 text-yellow-500"
                                    : "bg-red-500/20 text-red-500"
                              }`}
                            >
                              {item.competition}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Saved Keywords</CardTitle>
                <CardDescription>Keywords you've saved for later analysis</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedKeywords.length > 0 ? (
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
                        {keywordData
                          .filter((item) => selectedKeywords.includes(item.keyword))
                          .map((item, index) => (
                            <tr key={index} className="border-b hover:bg-secondary/50 transition-colors">
                              <td className="p-2 text-center">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => toggleKeywordSelection(item.keyword)}
                                >
                                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
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
                                <span className="inline-block px-2 py-1 rounded-full text-xs bg-brand-green/20 text-brand-green">
                                  {item.relevance}%
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-secondary p-3">
                      <Star className="h-6 w-6 text-brand-purple" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">No saved keywords yet</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Star keywords to save them for later reference</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
