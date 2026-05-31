"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, ArrowUpRight, Loader2, Sparkles, CheckCircle2, History, RefreshCw, AlertTriangle } from "lucide-react"
import { suggestCadRemediations, type SuggestCadRemediationsOutput } from "@/ai/flows/suggest-cad-remediations"
import { Badge } from "@/components/ui/badge"
import { getAudit } from "@/lib/audits/repository"
import type { StoredAuditSession } from "@/lib/audit-session"

function readAuditId() {
  if (typeof window === "undefined") return undefined
  return new URLSearchParams(window.location.search).get("id") ?? undefined
}

function mapIssueType(category: string) {
  switch (category) {
    case "Layer": return "incorrect_layer" as const
    case "Scale": return "scale_violation" as const
    case "Plotting": return "plotting_risk" as const
    case "Text": return "text_inconsistency" as const
    default: return "other" as const
  }
}

function mapSeverity(severity: string) {
  switch (severity) {
    case "Critical": return "critical" as const
    case "High": return "high" as const
    case "Medium": return "medium" as const
    default: return "low" as const
  }
}

export default function RemediationPage() {
  const router = useRouter()
  const [session, setSession] = useState<StoredAuditSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [suggestions, setSuggestions] = useState<SuggestCadRemediationsOutput | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const load = async () => {
      setSession(await getAudit(readAuditId()))
      setIsLoading(false)
    }
    void load()
  }, [])

  const cadIssues = useMemo(() => {
    return (session?.issues ?? []).map((issue, index) => ({
      id: `${session?.id ?? "audit"}-${index + 1}`,
      type: mapIssueType(issue.category),
      description: issue.description,
      severity: mapSeverity(issue.severity),
      context: issue.suggestedRemediation,
    }))
  }, [session])

  const runRemediation = async () => {
    if (cadIssues.length === 0) return
    setError("")
    setIsProcessing(true)
    try {
      setSuggestions(await suggestCadRemediations({ cadIssues }))
    } catch (remediationError) {
      setError(remediationError instanceof Error ? remediationError.message : "Remediation generation failed")
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) return <div className="p-8 text-sm text-muted-foreground">Loading audit findings...</div>

  if (!session) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <Card className="bg-card/40 border-border/50">
          <CardHeader><CardTitle className="flex items-center gap-2 text-lg uppercase"><AlertTriangle className="size-5 text-warning" /> Audit required</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Generate or select an audit before requesting remediation guidance.</p>
            <div className="flex gap-2">
              <Button onClick={() => router.push('/dashboard/upload-workspace')} className="gap-2"><RefreshCw className="size-4" /> New Scan</Button>
              <Button variant="outline" onClick={() => router.push('/dashboard/audit-history')} className="gap-2"><History className="size-4" /> Audit History</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap gap-2 mb-2"><Badge variant="outline" className="font-code text-[10px] text-primary">{session.id}</Badge><Badge variant="outline" className="font-code text-[10px]">{session.fileName}</Badge></div>
          <h1 className="text-3xl font-headline font-bold">Automated Remediation Guidance</h1>
          <p className="text-muted-foreground">AI-generated review instructions linked to the selected audit findings.</p>
        </div>
        <Button onClick={runRemediation} disabled={isProcessing || cadIssues.length === 0} className="gap-2 px-6 h-12 shadow-lg shadow-primary/20">
          {isProcessing ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
          Generate Guidance
        </Button>
      </div>

      {error && <div className="rounded border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">{error}</div>}

      {!suggestions ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card/40 border-border/50">
            <CardHeader><CardTitle className="text-sm font-code uppercase tracking-widest">Selected Audit Findings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {cadIssues.map(issue => (
                <div key={issue.id} className="p-4 rounded-lg bg-muted/20 border border-border/50">
                  <div className="flex items-center gap-2 mb-1"><Badge variant={issue.severity === "critical" || issue.severity === "high" ? "destructive" : "outline"} className="text-[10px] font-code h-4 px-1">{issue.severity.toUpperCase()}</Badge><span className="text-xs font-code text-muted-foreground uppercase">{issue.type.replace('_', ' ')}</span></div>
                  <p className="text-sm font-medium">{issue.description}</p>
                  {issue.context && <p className="text-xs text-muted-foreground mt-1">{issue.context}</p>}
                </div>
              ))}
              {cadIssues.length === 0 && <p className="text-sm text-muted-foreground">No findings require remediation guidance.</p>}
            </CardContent>
          </Card>
          <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 border border-dashed border-border rounded-lg bg-muted/5 h-fit">
            <Zap className="size-12 text-primary/20" />
            <div className="space-y-2"><h3 className="text-lg font-headline font-semibold">Guidance Engine Ready</h3><p className="text-sm text-muted-foreground max-w-[280px]">Generate reviewable cleanup instructions from the selected audit. No CAD file is modified automatically.</p></div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestions.remediationSuggestions.map((suggestion, index) => (
              <Card key={`${suggestion.issueId}-${index}`} className="bg-card/40 border-primary/20 hover:border-primary/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0"><Badge variant="outline" className="font-code">{suggestion.priority.toUpperCase()} PRIORITY</Badge><CheckCircle2 className="size-4 text-primary" /></CardHeader>
                <CardContent className="space-y-4">
                  <div><h4 className="font-headline font-bold text-lg mb-1">{suggestion.suggestedAction}</h4><p className="text-sm text-muted-foreground leading-relaxed">{suggestion.rationale}</p></div>
                  {suggestion.exampleCommand && <div className="p-3 rounded-md bg-muted/40 font-code text-[11px] text-primary border border-primary/10 overflow-x-auto whitespace-pre">{suggestion.exampleCommand}</div>}
                  <Button variant="outline" size="sm" className="w-full gap-1" disabled>Review Instruction Only <ArrowUpRight className="size-3" /></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
