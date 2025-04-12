"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Sparkles } from "lucide-react"

const formSchema = z.object({
  appDescription: z.string().min(10, {
    message: "App description must be at least 10 characters.",
  }),
  seedKeywords: z.string().min(3, {
    message: "Please enter at least one seed keyword.",
  }),
})

interface KeywordInputFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void
  isResearching: boolean
}

export function KeywordInputForm({ onSubmit, isResearching }: KeywordInputFormProps) {
  const [examples, setExamples] = useState({
    description: "",
    keywords: "",
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appDescription: "",
      seedKeywords: "",
    },
  })

  const loadExample = () => {
    setExamples({
      description:
        "A productivity app that helps users organize tasks, set reminders, and track their daily progress. Features include customizable to-do lists, calendar integration, and habit tracking.",
      keywords: "task manager, to-do list, productivity, reminder app, habit tracker",
    })

    form.setValue(
      "appDescription",
      "A productivity app that helps users organize tasks, set reminders, and track their daily progress. Features include customizable to-do lists, calendar integration, and habit tracking.",
    )
    form.setValue("seedKeywords", "task manager, to-do list, productivity, reminder app, habit tracker")
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl gradient-text">ASO Keyword Research</CardTitle>
        <CardDescription>
          Enter your app details to discover high-performing keywords using AI-powered research
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="appDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>App Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your app's features and purpose..."
                      className="min-h-[120px] bg-secondary border-secondary resize-none"
                      {...field}
                      disabled={isResearching}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a detailed description of your app to help our AI find relevant keywords
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seedKeywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seed Keywords</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter comma-separated keywords..."
                      className="min-h-[80px] bg-secondary border-secondary resize-none"
                      {...field}
                      disabled={isResearching}
                    />
                  </FormControl>
                  <FormDescription>Add some initial keywords to guide the research (comma-separated)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={loadExample}
                disabled={isResearching}
                className="text-muted-foreground"
              >
                Load Example
              </Button>
              <Button
                type="submit"
                disabled={isResearching || !form.formState.isValid}
                className="bg-brand-purple hover:bg-brand-purple/90"
              >
                {isResearching ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Agent Researching...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Start Research
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col border-t border-border pt-6">
        <div className="w-full p-4 bg-secondary/30 rounded-lg border border-border mb-4">
          <h3 className="text-sm font-medium mb-2">How it works</h3>
          <ol className="text-sm text-muted-foreground space-y-2 ml-5 list-decimal">
            <li>Enter your app description and seed keywords</li>
            <li>Our AI agent will launch a browser in the sandbox</li>
            <li>The agent will research keywords based on your input</li>
            <li>Results will be analyzed for relevance to your app</li>
            <li>You'll receive a detailed report of optimized keywords</li>
          </ol>
        </div>
      </CardFooter>
    </>
  )
}
