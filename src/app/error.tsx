"use client"

import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GlobalError({ reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-6">
      <div className="max-w-lg w-full rounded-lg border border-destructive/20 bg-card/40 p-8 space-y-4 text-center">
        <AlertTriangle className="size-10 text-destructive mx-auto" />
        <h1 className="text-2xl font-headline font-bold uppercase">Workspace Error</h1>
        <p className="text-sm text-muted-foreground">The workspace encountered an unexpected error. Retry the operation or return to the dashboard.</p>
        <div className="flex justify-center gap-2">
          <Button onClick={reset} className="gap-2"><RefreshCw className="size-4" /> Retry</Button>
          <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>Dashboard</Button>
        </div>
      </div>
    </div>
  )
}
