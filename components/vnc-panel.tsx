"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface VncPanelProps {
  vncUrl?: string
  isLoadingSandbox: boolean
}

export function VncPanel({ vncUrl, isLoadingSandbox }: VncPanelProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    if (vncUrl) {
      setIframeLoaded(false)
    }
  }, [vncUrl])

  return (
    <div className="h-full w-full relative">
      {(isLoadingSandbox || (vncUrl && !iframeLoaded)) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card z-10">
          <Loader2 className="h-10 w-10 text-brand-purple animate-spin mb-4" />
          <p className="text-lg font-medium">Starting Sandbox...</p>
          <p className="text-sm text-muted-foreground mt-2">This may take a few moments</p>
        </div>
      )}

      {vncUrl ? (
        <iframe
          src={vncUrl}
          className="w-full h-full border-0"
          onLoad={() => setIframeLoaded(true)}
          allow="clipboard-read; clipboard-write"
        />
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center bg-card">
          <div className="text-center max-w-md p-6">
            <h3 className="text-xl font-bold mb-2 gradient-text">E2B Surf Sandbox</h3>
            <p className="text-muted-foreground mb-4">
              Enter your app details and start research to launch the AI-powered browser sandbox
            </p>
            <div className="p-4 bg-secondary/50 rounded-lg border border-border">
              <pre className="text-xs text-muted-foreground overflow-auto">
                {`
  ________ ___  ___  ________  ___  ___  ________  ________ 
 |\\  _____\\\\  \\|\\  \\|\\   ____\\|\\  \\|\\  \\|\\   __  \\|\\  _____\\
 \\ \\  \\__/\\ \\  \\\\\\  \\ \\  \\___|\\ \\  \\\\\\  \\ \\  \\|\\  \\ \\  \\__/ 
  \\ \\   __\\\\ \\  \\\\\\  \\ \\_____  \\ \\  \\\\\\  \\ \\   _  _\\ \\   __\\
   \\ \\  \\_| \\ \\  \\\\\\  \\|____|\\  \\ \\  \\\\\\  \\ \\  \\\\  \\\\ \\  \\_|
    \\ \\__\\   \\ \\_______\\____\\_\\  \\ \\_______\\ \\__\\\\ _\\\\ \\__\\ 
     \\|__|    \\|_______|\\____|__|  \\|_______|\\|__|\\|__|\\|__| 
                `}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
