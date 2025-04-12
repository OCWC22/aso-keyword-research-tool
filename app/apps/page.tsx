import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function AppsPage() {
  // This would normally be fetched from the database
  const apps = []
  const hasApps = apps.length > 0

  return (
    <DashboardShell>
      <DashboardHeader heading="Your Apps" text="Manage your app portfolio">
        <Link href="/apps/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add App
          </Button>
        </Link>
      </DashboardHeader>

      {hasApps ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{/* Map through apps here */}</div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No apps found</CardTitle>
            <CardDescription>Add your first app to start optimizing its keywords.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="rounded-full bg-muted p-3">
                <PlusCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Add your first app</h3>
              <p className="mt-2 text-sm text-muted-foreground">Start by adding an app to your portfolio</p>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/apps/new" className="w-full">
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add App
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </DashboardShell>
  )
}
