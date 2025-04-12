"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Download, Filter, MoreHorizontal, RefreshCw, Search, Sparkles } from "lucide-react"

// Sample data for demonstration
const sampleKeywords = [
  {
    id: "1",
    keyword: "fitness tracker",
    difficulty: 75,
    traffic: 89,
    relevance: 92,
    inTitle: false,
    inDescription: true,
  },
  {
    id: "2",
    keyword: "workout app",
    difficulty: 68,
    traffic: 76,
    relevance: 88,
    inTitle: true,
    inDescription: true,
  },
  {
    id: "3",
    keyword: "exercise planner",
    difficulty: 45,
    traffic: 62,
    relevance: 85,
    inTitle: false,
    inDescription: true,
  },
  {
    id: "4",
    keyword: "gym routine",
    difficulty: 52,
    traffic: 71,
    relevance: 79,
    inTitle: false,
    inDescription: false,
  },
  {
    id: "5",
    keyword: "weight loss app",
    difficulty: 82,
    traffic: 94,
    relevance: 72,
    inTitle: false,
    inDescription: true,
  },
  {
    id: "6",
    keyword: "health tracker",
    difficulty: 79,
    traffic: 88,
    relevance: 81,
    inTitle: true,
    inDescription: true,
  },
  {
    id: "7",
    keyword: "step counter",
    difficulty: 41,
    traffic: 65,
    relevance: 76,
    inTitle: false,
    inDescription: true,
  },
  {
    id: "8",
    keyword: "calorie counter",
    difficulty: 73,
    traffic: 86,
    relevance: 68,
    inTitle: false,
    inDescription: false,
  },
]

export default function ResearchResultsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([])

  const filteredKeywords = sampleKeywords.filter((keyword) =>
    keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleKeywordSelection = (id: string) => {
    setSelectedKeywords((prev) => (prev.includes(id) ? prev.filter((keywordId) => keywordId !== id) : [...prev, id]))
  }

  const getDifficultyColor = (score: number) => {
    if (score < 50) return "text-brand-green"
    if (score < 70) return "text-brand-cyan"
    return "text-brand-purple"
  }

  const getTrafficColor = (score: number) => {
    if (score < 50) return "text-brand-purple"
    if (score < 70) return "text-brand-cyan"
    return "text-brand-green"
  }

  const getRelevanceColor = (score: number) => {
    if (score < 60) return "text-brand-purple"
    if (score < 80) return "text-brand-cyan"
    return "text-brand-green"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Research Results</h1>
          <p className="text-muted-foreground mt-1">Fitness Tracker App - iOS</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="bg-secondary">
            <TabsTrigger value="all">All Keywords</TabsTrigger>
            <TabsTrigger value="selected">Selected Keywords</TabsTrigger>
            <TabsTrigger value="suggested">AI Suggested</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search keywords..."
                className="pl-10 bg-secondary border-secondary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="bg-secondary border-secondary">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle>Keyword Analysis</CardTitle>
              <CardDescription>
                Analyze keywords for your app based on difficulty, traffic, and relevance
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="data-grid">
                <Table>
                  <TableHeader>
                    <TableRow className="data-grid-header">
                      <TableHead className="w-12">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-border bg-secondary"
                          onChange={() => {
                            if (selectedKeywords.length === filteredKeywords.length) {
                              setSelectedKeywords([])
                            } else {
                              setSelectedKeywords(filteredKeywords.map((k) => k.id))
                            }
                          }}
                          checked={selectedKeywords.length > 0 && selectedKeywords.length === filteredKeywords.length}
                        />
                      </TableHead>
                      <TableHead>Keyword</TableHead>
                      <TableHead className="text-center">Difficulty</TableHead>
                      <TableHead className="text-center">Traffic</TableHead>
                      <TableHead className="text-center">Relevance</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredKeywords.map((keyword) => (
                      <TableRow key={keyword.id} className="data-grid-row">
                        <TableCell>
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-border bg-secondary"
                            checked={selectedKeywords.includes(keyword.id)}
                            onChange={() => toggleKeywordSelection(keyword.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{keyword.keyword}</TableCell>
                        <TableCell className="text-center">
                          <span className={getDifficultyColor(keyword.difficulty)}>{keyword.difficulty}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={getTrafficColor(keyword.traffic)}>{keyword.traffic}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={getRelevanceColor(keyword.relevance)}>{keyword.relevance}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          {keyword.inTitle ? (
                            <Badge variant="outline" className="bg-secondary/50 text-brand-green border-brand-green/20">
                              In Title
                            </Badge>
                          ) : keyword.inDescription ? (
                            <Badge variant="outline" className="bg-secondary/50 text-brand-blue border-brand-blue/20">
                              In Description
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-secondary/50 text-muted-foreground border-border">
                              New
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Find Similar</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Add to Selected</DropdownMenuItem>
                              <DropdownMenuItem>Exclude Keyword</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="selected" className="mt-0">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle>Selected Keywords</CardTitle>
              <CardDescription>Keywords you've selected for your app</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {selectedKeywords.length > 0 ? (
                <div className="data-grid">
                  <Table>
                    <TableHeader>
                      <TableRow className="data-grid-header">
                        <TableHead>Keyword</TableHead>
                        <TableHead className="text-center">Difficulty</TableHead>
                        <TableHead className="text-center">Traffic</TableHead>
                        <TableHead className="text-center">Relevance</TableHead>
                        <TableHead className="w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleKeywords
                        .filter((keyword) => selectedKeywords.includes(keyword.id))
                        .map((keyword) => (
                          <TableRow key={keyword.id} className="data-grid-row">
                            <TableCell className="font-medium">{keyword.keyword}</TableCell>
                            <TableCell className="text-center">
                              <span className={getDifficultyColor(keyword.difficulty)}>{keyword.difficulty}</span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className={getTrafficColor(keyword.traffic)}>{keyword.traffic}</span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className={getRelevanceColor(keyword.relevance)}>{keyword.relevance}</span>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" onClick={() => toggleKeywordSelection(keyword.id)}>
                                Remove
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-secondary p-3">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">No keywords selected</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Select keywords from the "All Keywords" tab to add them to your list
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggested" className="mt-0">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle>AI Suggested Keywords</CardTitle>
              <CardDescription>Keywords suggested by our AI based on your app description</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-secondary p-3">
                  <Sparkles className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Generate AI Suggestions</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Our AI can analyze your app to find the best keyword suggestions
                </p>
                <Button className="mt-4 bg-brand-purple hover:bg-brand-purple/90">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Suggestions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
