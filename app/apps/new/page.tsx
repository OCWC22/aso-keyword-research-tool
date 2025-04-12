"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Smartphone } from "lucide-react"

const formSchema = z.object({
  appName: z.string().min(2, {
    message: "App name must be at least 2 characters.",
  }),
  bundleId: z.string().min(2, {
    message: "Bundle ID is required.",
  }),
  platform: z.enum(["ios", "android"]),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  appStoreUrl: z.string().url().optional().or(z.literal("")),
})

export default function NewAppPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appName: "",
      bundleId: "",
      platform: "ios",
      category: "",
      description: "",
      appStoreUrl: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // This would normally send the data to the server
    console.log(values)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/apps")
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight gradient-text">Add New App</h1>
        <p className="text-muted-foreground mt-1">Register your app to start tracking keywords</p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>App Details</CardTitle>
          <CardDescription>Provide information about your app</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 border border-border mb-6">
                <div className="h-16 w-16 rounded-xl bg-brand-purple/20 flex items-center justify-center">
                  <Smartphone className="h-8 w-8 text-brand-purple" />
                </div>
                <div>
                  <h3 className="font-medium">App Registration</h3>
                  <p className="text-sm text-muted-foreground">
                    Register your app to track keywords and monitor performance
                  </p>
                </div>
              </div>

              <FormField
                control={form.control}
                name="appName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>App Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Awesome App" className="bg-secondary border-secondary" {...field} />
                    </FormControl>
                    <FormDescription>The name of your app as it appears in the app store</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="bundleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bundle ID</FormLabel>
                      <FormControl>
                        <Input placeholder="com.example.myapp" className="bg-secondary border-secondary" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-secondary border-secondary">
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ios">iOS App Store</SelectItem>
                          <SelectItem value="android">Google Play Store</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-secondary border-secondary">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="games">Games</SelectItem>
                          <SelectItem value="productivity">Productivity</SelectItem>
                          <SelectItem value="social">Social Networking</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="utilities">Utilities</SelectItem>
                          <SelectItem value="entertainment">Entertainment</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="appStoreUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>App Store URL (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://apps.apple.com/app/..."
                          className="bg-secondary border-secondary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>App Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your app's features and purpose..."
                        className="min-h-[120px] bg-secondary border-secondary"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>This helps us understand your app for better keyword suggestions</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-brand-purple hover:bg-brand-purple/90">
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      Register App
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
