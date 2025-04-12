import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <Loader2 className="h-10 w-10 text-brand-purple animate-spin mb-4" />
        <p className="text-lg font-medium">Loading Research Tool...</p>
      </div>
    </div>
  )
}
