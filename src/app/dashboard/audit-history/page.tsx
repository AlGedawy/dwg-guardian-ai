"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, Search, FileText, AlertTriangle, AlertCircle, Clock, ExternalLink, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { deleteAuditSession, listAuditSessions, type StoredAuditSession } from "@/lib/audit-session"

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

export default function AuditHistoryPage() {
  const router = useRouter()
  const [sessions, setSessions] = useState<StoredAuditSession[]>([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    setSessions(listAuditSessions())
  }, [])

  const filteredSessions = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return sessions

    return sessions.filter(session =>
      session.id.toLowerCase().includes(normalized) ||
      session.fileName.toLowerCase().includes(normalized)
    )
  }, [query, sessions])

  const removeSession = (id: string) => {
    deleteAuditSession(id)
    setSessions(listAuditSessions())
  }

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <History className="size-5 text-primary" />
            <Badge variant="outline" className="font-code text-[10px] border-primary/20 text-primary uppercase">Persistent Local Registry</Badge>
          </div>
          <h1 className="text-4xl font-headline font-bold uppercase tracking-tight">Audit Session History</h1>
          <p className="text-muted-foreground font-body">Stored audit sessions generated from uploaded drawings on this browser.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search audit ID or file..."
            className="pl-9 h-10 w-72 bg-muted/20 border-white/10 text-xs font-code"
          />
        </div>
      </div>

      <Card className="bg-card/40 border-border/50 overflow-hidden shadow-none">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent border-white/5">
              <TableHead className="font-code text-[10px] uppercase tracking-widest h-12">Audit Identity</TableHead>
              <TableHead className="font-code text-[10px] uppercase tracking-widest h-12">Drawing File</TableHead>
              <TableHead className="font-code text-[10px] uppercase tracking-widest h-12">Issues</TableHead>
              <TableHead className="font-code text-[10px] uppercase tracking-widest h-12">Status</TableHead>
              <TableHead className="font-code text-[10px] uppercase tracking-widest h-12 text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSessions.map(session => {
              const critical = session.issues.filter(issue => issue.severity === "Critical").length
              const high = session.issues.filter(issue => issue.severity === "High").length

              return (
                <TableRow key={session.id} className="group border-white/5 hover:bg-primary/5 transition-colors">
                  <TableCell className="py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold font-code text-primary">{session.id}</span>
                      <span className="text-[9px] font-code text-muted-foreground flex items-center gap-1">
                        <Clock className="size-2.5" /> {formatDate(session.createdAt)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-xs font-bold font-code">{session.fileName}</span>
                  </TableCell>
                  <TableCell className="py-4 font-code text-xs">
                    <div className="flex items-center gap-2">
                      {critical > 0 ? <AlertCircle className="size-3 text-destructive" /> : <AlertTriangle className="size-3 text-warning" />}
                      <span>{session.issues.length} FOUND</span>
                      {critical > 0 && <Badge variant="destructive" className="text-[8px] h-4">{critical} CRITICAL</Badge>}
                      {high > 0 && <Badge variant="outline" className="text-[8px] h-4 border-destructive/30 text-destructive">{high} HIGH</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge variant="outline" className="text-[8px] h-4 font-code uppercase bg-green-500/5 text-green-500 border-green-500/20">
                      {session.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:text-primary"
                        onClick={() => router.push(`/dashboard/audit-results?id=${encodeURIComponent(session.id)}`)}
                        aria-label="Open audit result"
                      >
                        <ExternalLink className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:text-primary"
                        onClick={() => router.push(`/dashboard/audit-results?id=${encodeURIComponent(session.id)}`)}
                        aria-label="Open audit report"
                      >
                        <FileText className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:text-destructive"
                        onClick={() => removeSession(session.id)}
                        aria-label="Delete audit result"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
            {filteredSessions.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-16 text-center text-sm text-muted-foreground">
                  No stored audit sessions found. Upload a drawing to generate the first result.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
