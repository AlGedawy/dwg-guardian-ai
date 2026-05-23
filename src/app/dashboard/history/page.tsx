"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, Search, Download, FileText, CheckCircle2, AlertTriangle, AlertCircle, Clock, ExternalLink } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function AuditHistoryPage() {
  const sessions = [
    { id: "0x7E3F21A", project: "Terminal 3 Expansion", file: "T3_Layout_V1.dwg", health: 94, violations: 34, time: "2h ago", status: "Certified" },
    { id: "0x4A2B9C4", project: "Downtown Office Hub", file: "DH_Grid_P4.dxf", health: 65, violations: 128, time: "Yesterday", status: "Review" },
    { id: "0x1F8D2E1", project: "Metro Line B - Phase 1", file: "MLB_Section_02.dwg", health: 88, violations: 12, time: "2 days ago", status: "Certified" },
    { id: "0x9C3F0A2", project: "City Stadium Grid", file: "CSG_Plan_Final.pdf", health: 99, violations: 2, time: "1w ago", status: "Certified" },
    { id: "0x5E2A1B7", project: "Terminal 3 Expansion", file: "T3_Layout_v0.9.dwg", health: 42, violations: 412, time: "2w ago", status: "Archived" },
  ]

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <History className="size-5 text-primary" />
            <Badge variant="outline" className="font-code text-[10px] border-primary/20 text-primary uppercase">Audit Registry Cluster</Badge>
          </div>
          <h1 className="text-4xl font-headline font-bold uppercase tracking-tight">Audit Session History</h1>
          <p className="text-muted-foreground font-body">Historical record of all geometric audits and compliance certification sessions.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input placeholder="Search Session ID..." className="pl-9 h-10 w-64 bg-muted/20 border-white/10 text-xs font-code uppercase" />
          </div>
          <Button variant="outline" className="h-10 px-6 font-code text-xs uppercase border-white/10 hover:bg-white/5">
            Export Archive
          </Button>
        </div>
      </div>

      <Card className="bg-card/40 border-border/50 overflow-hidden shadow-none">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent border-white/5">
              <TableHead className="font-code text-[10px] uppercase tracking-widest h-12">Session Identity</TableHead>
              <TableHead className="font-code text-[10px] uppercase tracking-widest h-12">Asset Reference</TableHead>
              <TableHead className="font-code text-[10px] uppercase tracking-widest h-12 text-center">Health</TableHead>
              <TableHead className="font-code text-[10px] uppercase tracking-widest h-12">Violations</TableHead>
              <TableHead className="font-code text-[10px] uppercase tracking-widest h-12">Registry Status</TableHead>
              <TableHead className="font-code text-[10px] uppercase tracking-widest h-12 text-right pr-6">Reports</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id} className="group border-white/5 hover:bg-primary/5 transition-colors">
                <TableCell className="py-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold font-code text-primary uppercase">{session.id}</span>
                    <span className="text-[9px] font-code text-muted-foreground uppercase flex items-center gap-1">
                      <Clock className="size-2.5" /> {session.time}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold font-headline uppercase tracking-tight">{session.project}</span>
                    <span className="text-[10px] font-code text-muted-foreground">{session.file}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className={cn(
                      "text-xs font-bold font-code",
                      session.health > 90 ? "text-primary" : session.health > 70 ? "text-warning" : "text-destructive"
                    )}>{session.health}%</span>
                    <div className="w-16 h-1 bg-muted/40 rounded-full overflow-hidden">
                      <div className={cn(
                        "h-full",
                        session.health > 90 ? "bg-primary" : session.health > 70 ? "bg-warning" : "bg-destructive"
                      )} style={{ width: `${session.health}%` }} />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 font-code text-xs">
                  <div className="flex items-center gap-2">
                    {session.violations > 50 ? <AlertCircle className="size-3 text-destructive" /> : 
                     session.violations > 0 ? <AlertTriangle className="size-3 text-warning" /> : 
                     <CheckCircle2 className="size-3 text-primary" />}
                    <span>{session.violations} FOUND</span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <Badge variant="outline" className={cn(
                    "text-[8px] h-4 font-code uppercase border-white/10",
                    session.status === "Certified" ? "bg-green-500/5 text-green-500 border-green-500/20" :
                    session.status === "Review" ? "bg-warning/5 text-warning border-warning/20" : ""
                  )}>{session.status}</Badge>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary"><Download className="size-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary"><ExternalLink className="size-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary"><FileText className="size-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
