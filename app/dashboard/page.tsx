import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, PlusCircle, Search, Smartphone, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // This would normally be fetched from the database
  const recentSessions = []
  const hasRecentSessions = recentSessions.length > 0

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to your ASO keyword research dashboard</p>
        </div>
        <Link href="/research/new">
          <Button className="bg-brand-purple hover:bg-brand-purple/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Research
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-glow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Research Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">0</div>
              <div className="h-10 w-10 rounded-full bg-secondary/50 flex items-center justify-center">
                <Search className="h-5 w-5 text-brand-purple" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-glow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Analyzed Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">0</div>
              <div className="h-10 w-10 rounded-full bg-secondary/50 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-brand-blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-glow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Registered Apps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">0</div>
              <div className="h-10 w-10 rounded-full bg-secondary/50 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-brand-cyan" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-glow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Keyword Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">--</div>
              <div className="h-10 w-10 rounded-full bg-secondary/50 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-brand-green" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Recent Research Sessions</h2>
        {hasRecentSessions ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{/* Map through recent sessions here */}</div>
        ) : (
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>No research sessions found</CardTitle>
              <CardDescription>Create your first ASO keyword research session to get started.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-6">
              <Link href="/research/new">
                <Button className="bg-brand-purple hover:bg-brand-purple/90">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Research Session
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
