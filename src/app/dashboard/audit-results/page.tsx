"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, AlertTriangle, CheckCircle2, FileText, History, RefreshCw, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { readAuditSession, type StoredAuditSession } from "@/lib/audit-session"
import { cn } from "@/lib/utils"

function severityClass(severity: string) {
  switch (severity) {
    case "Critical": return "bg-destructive/10 text-destructive border-destructive/20"
    case "High": return "bg-destructive/5 text-destructive border-destructive/10"
    case "Medium": return "bg-warning/10 text-warning border-warning/20"
    case "Low": return "bg-primary/10 text-primary border-primary/20"
    default: return "bg-muted text-muted-foreground border-border"
  }
}

function readRequestedAuditId() {
  if (typeof window === "undefined") return undefined
  return new URLSearchParams(window.location.search).get("id") ?? undefined
}

export default function AuditResultsPage() {
  const router = useRouter()
  const [session, setSession] = useState<StoredAuditSession | null>(null)

  useEffect(() => {
    setSession(readAuditSession(readRequestedAuditId()))
  }, [])

  const summary = useMemo(() => {
    const issues = session?.issues ?? []
    return {
      total: issues.length,
      critical: issues.filter(issue => issue.severity === "Critical").length,
      high: issues.filter(issue => issue.severity === "High").length,
      medium: issues.filter(issue => issue.severity === "Medium").length,
      low: issues.filter(issue => issue.severity === "Low" || issue.severity === "Informational").length,
    }
  }, [session])

  if (!session) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <Card className="bg-card/40 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg uppercase tracking-tight">
              <AlertTriangle className="size-5 text-warning" /> Audit result not found
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Upload a drawing or select a stored audit from the history registry.</p>
            <div className="flex gap-2">
              <Button onClick={() => router.push('/dashboard/upload-workspace')} className="gap-2">
                <RefreshCw className="size-4" /> Start New Scan
              </Button>
              <Button variant="outline" onClick={() => router.push('/dashboard/audit-history')} className="gap-2">
                <History className="size-4" /> Open Audit History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="outline" className="font-code text-[10px] text-primary bg-primary/5">LIVE_AUDIT_RESULT</Badge>
            <Badge variant="outline" className="font-code text-[10px]">{session.fileName}</Badge>
            <Badge variant="outline" className="font-code text-[10px]">{session.id}</Badge>
          </div>
          <h1 className="text-3xl font-headline font-bold uppercase tracking-tight">Audit Results</h1>
          <p className="text-sm text-muted-foreground">Stored audit result generated from the uploaded drawing.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => router.push('/dashboard/audit-history')} className="gap-2">
            <History className="size-4" /> Audit History
          </Button>
          <Button variant="outline" onClick={() => router.push('/dashboard/upload-workspace')} className="gap-2">
            <RefreshCw className="size-4" /> New Scan
          </Button>
          <Button onClick={() => router.push('/dashboard/qa-report-viewer')} className="gap-2">
            <FileText className="size-4" /> Open Report Viewer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <SummaryCard label="Total" value={summary.total} icon={ShieldCheck} />
        <SummaryCard label="Critical" value={summary.critical} icon={AlertCircle} tone="text-destructive" />
        <SummaryCard label="High" value={summary.high} icon={AlertTriangle} tone="text-destructive" />
        <SummaryCard label="Medium" value={summary.medium} icon={AlertTriangle} tone="text-warning" />
        <SummaryCard label="Low / Info" value={summary.low} icon={CheckCircle2} tone="text-primary" />
      </div>

      <Card className="bg-card/30 border-border/50">
        <CardHeader className="border-b border-border/30">
          <CardTitle className="text-sm font-code uppercase tracking-widest">Detected Issues</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px] uppercase">Severity</TableHead>
                <TableHead className="text-[10px] uppercase">Category</TableHead>
                <TableHead className="text-[10px] uppercase">Description</TableHead>
                <TableHead className="text-[10px] uppercase">Suggested Remediation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {session.issues.map((issue, index) => (
                <TableRow key={`${issue.category}-${index}`}>
                  <TableCell>
                    <Badge className={cn("text-[9px] font-code", severityClass(issue.severity))}>{issue.severity.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell className="font-code text-xs uppercase">{issue.category}</TableCell>
                  <TableCell className="text-sm text-foreground/90">{issue.description}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{issue.suggestedRemediation || "Manual review required"}</TableCell>
                </TableRow>
              ))}
              {session.issues.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-sm text-muted-foreground">No issues were returned for this audit.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function SummaryCard({ label, value, icon: Icon, tone = "text-foreground" }: { label: string, value: number, icon: any, tone?: string }) {
  return (
    <Card className="bg-card/30 border-border/50">
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-code uppercase text-muted-foreground">{label}</p>
          <p className={cn("text-2xl font-headline font-bold", tone)}>{value}</p>
        </div>
        <Icon className={cn("size-5", tone)} />
      </CardContent>
    </Card>
  )
}
