"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, AlertTriangle, CheckCircle2, Download, FileText, History, Printer, RefreshCw, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAudit } from "@/lib/audits/repository"
import type { StoredAuditSession } from "@/lib/audit-session"
import { cn } from "@/lib/utils"

function readAuditId() {
  if (typeof window === "undefined") return undefined
  return new URLSearchParams(window.location.search).get("id") ?? undefined
}

function severityClass(severity: string) {
  switch (severity) {
    case "Critical": return "bg-destructive/10 text-destructive border-destructive/20"
    case "High": return "bg-destructive/5 text-destructive border-destructive/10"
    case "Medium": return "bg-warning/10 text-warning border-warning/20"
    case "Low": return "bg-primary/10 text-primary border-primary/20"
    default: return "bg-muted text-muted-foreground border-border"
  }
}

function downloadJson(session: StoredAuditSession) {
  const blob = new Blob([JSON.stringify(session, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = `${session.fileName.replace(/\.[^/.]+$/, "")}-audit-${session.id}.json`
  anchor.click()
  URL.revokeObjectURL(url)
}

export default function QAReportViewer() {
  const router = useRouter()
  const [session, setSession] = useState<StoredAuditSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setSession(await getAudit(readAuditId()))
      setIsLoading(false)
    }
    void load()
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

  if (isLoading) return <div className="p-8 text-sm text-muted-foreground">Loading report...</div>

  if (!session) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <Card className="bg-card/40 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg uppercase tracking-tight">
              <AlertTriangle className="size-5 text-warning" /> Report not found
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Select an audit from history or generate a new scan.</p>
            <div className="flex gap-2">
              <Button onClick={() => router.push('/dashboard/upload-workspace')} className="gap-2">
                <RefreshCw className="size-4" /> New Scan
              </Button>
              <Button variant="outline" onClick={() => router.push('/dashboard/audit-history')} className="gap-2">
                <History className="size-4" /> Audit History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 print:bg-white print:text-black">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6 print:border-black/20">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline" className="font-code text-[10px] text-primary bg-primary/5 print:text-black">AUDIT_REPORT</Badge>
            <Badge variant="outline" className="font-code text-[10px]">{session.id}</Badge>
          </div>
          <h1 className="text-4xl font-headline font-bold uppercase tracking-tight">DWG Guardian QA Report</h1>
          <p className="text-sm text-muted-foreground print:text-black/70">{session.fileName}</p>
          <p className="text-xs font-code text-muted-foreground print:text-black/60">Generated: {new Date(session.createdAt).toLocaleString()}</p>
        </div>
        <div className="flex flex-wrap gap-2 print:hidden">
          <Button variant="outline" onClick={() => router.push(`/dashboard/audit-results?id=${encodeURIComponent(session.id)}`)} className="gap-2">
            <FileText className="size-4" /> Results
          </Button>
          <Button variant="outline" onClick={() => downloadJson(session)} className="gap-2">
            <Download className="size-4" /> JSON
          </Button>
          <Button onClick={() => window.print()} className="gap-2">
            <Printer className="size-4" /> Print PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Metric label="Total Issues" value={summary.total} icon={ShieldCheck} />
        <Metric label="Critical" value={summary.critical} icon={AlertCircle} tone="text-destructive" />
        <Metric label="High" value={summary.high} icon={AlertTriangle} tone="text-destructive" />
        <Metric label="Medium" value={summary.medium} icon={AlertTriangle} tone="text-warning" />
        <Metric label="Low / Info" value={summary.low} icon={CheckCircle2} tone="text-primary" />
      </div>

      <Card className="bg-card/30 border-border/50 print:bg-white print:border-black/20">
        <CardHeader className="border-b border-border/30 print:border-black/20">
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
                  <TableCell className="text-sm">{issue.description}</TableCell>
                  <TableCell className="text-sm text-muted-foreground print:text-black/70">{issue.suggestedRemediation || "Manual review required"}</TableCell>
                </TableRow>
              ))}
              {session.issues.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="py-12 text-center text-sm text-muted-foreground">No issues returned for this audit.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function Metric({ label, value, icon: Icon, tone = "text-foreground" }: { label: string, value: number, icon: any, tone?: string }) {
  return (
    <Card className="bg-card/30 border-border/50 print:bg-white print:border-black/20">
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-code uppercase text-muted-foreground print:text-black/60">{label}</p>
          <p className={cn("text-2xl font-headline font-bold", tone)}>{value}</p>
        </div>
        <Icon className={cn("size-5", tone)} />
      </CardContent>
    </Card>
  )
}
