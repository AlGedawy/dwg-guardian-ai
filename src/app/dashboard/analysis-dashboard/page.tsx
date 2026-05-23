"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Activity, 
  AlertCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Crosshair, 
  Info, 
  Layers, 
  Microscope, 
  MousePointer2, 
  Ruler, 
  Search, 
  ShieldCheck, 
  Terminal, 
  Zap,
  Maximize2,
  Cpu,
  SignalHigh,
  ArrowUpRight,
  FileText
} from "lucide-react"
import { HealthScore } from "@/components/cad/health-score"
import { cn } from "@/lib/utils"

export default function AnalysisDashboard() {
  const router = useRouter()
  const [selectedIssue, setSelectedIssue] = useState<any>(null)

  const violations = [
    { id: "V-001", severity: "Critical", type: "Standard Violation", layer: "A-ANNO-TEXT", viewport: "V-01", std: "ISO-13567", entities: 142, remediation: "Map styles to standard" },
    { id: "V-002", severity: "High", type: "Duplicate Geometry", layer: "0", viewport: "GLOBAL", std: "GEO_INTEGRITY", entities: 1284, remediation: "Execute bulk purge" },
    { id: "V-003", severity: "Medium", type: "Scale Inconsistency", layer: "V-PORT-DEF", viewport: "V-04", std: "ISO-AIA-V3", entities: 1, remediation: "Normalize viewport scale" },
    { id: "V-004", severity: "Low", type: "Orphaned Annotation", layer: "A-DIM-ANNO", viewport: "V-02", std: "AIA-L3", entities: 17, remediation: "Re-associate dim points" },
    { id: "V-005", severity: "Medium", type: "Lineweight Conflict", layer: "A-WALL-EXTR", viewport: "GLOBAL", std: "EN-1090", entities: 54, remediation: "Sync by-layer properties" },
  ]

  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case "Critical": return "bg-destructive/10 text-destructive border-destructive/20"
      case "High": return "bg-destructive/5 text-destructive border-destructive/10"
      case "Medium": return "bg-warning/10 text-warning border-warning/20"
      case "Low": return "bg-primary/10 text-primary border-primary/20"
      default: return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#080808] overflow-hidden">
      {/* Operational Header Navigation */}
      <div className="h-12 border-b border-white/5 bg-black/60 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-6">
          <Badge variant="outline" className="h-6 text-[10px] font-code border-primary/20 text-primary bg-primary/5">
            WORKSTATION_ID: NODE_04_AIA
          </Badge>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-code text-muted-foreground uppercase">Audit Session:</span>
            <span className="text-[10px] font-code font-bold text-foreground">0x7E3F21A</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-[10px] font-code uppercase gap-2 border-white/10 hover:bg-primary/10"
            onClick={() => router.push('/dashboard/audit')}
          >
            New Scan
          </Button>
          <Button 
            size="sm" 
            className="h-8 text-[10px] font-code uppercase gap-2 shadow-lg shadow-primary/20"
            onClick={() => router.push('/dashboard/qa-report-viewer')}
          >
            <FileText className="size-3" /> Generate QA Report
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Violations Table */}
        <div className="w-[450px] border-r border-white/5 flex flex-col shrink-0">
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-muted/5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              <h2 className="text-xs font-headline font-bold uppercase tracking-widest">Violations Matrix</h2>
            </div>
            <Badge variant="secondary" className="text-[9px] font-code">{violations.length} FOUND</Badge>
          </div>
          <ScrollArea className="flex-1">
            <Table>
              <TableHeader className="bg-muted/10 sticky top-0 z-10">
                <TableRow className="h-8 hover:bg-transparent">
                  <TableHead className="text-[9px] font-code uppercase">Severity</TableHead>
                  <TableHead className="text-[9px] font-code uppercase">Issue Type</TableHead>
                  <TableHead className="text-[9px] font-code uppercase text-right">Entities</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {violations.map((v) => (
                  <TableRow 
                    key={v.id} 
                    className={cn(
                      "group cursor-pointer transition-colors border-white/5",
                      selectedIssue?.id === v.id ? "bg-primary/10 border-primary/20" : "hover:bg-primary/5"
                    )}
                    onClick={() => setSelectedIssue(v)}
                  >
                    <TableCell className="py-2">
                      <Badge className={cn("text-[8px] font-code px-1.5 h-4", getSeverityColor(v.severity))}>
                        {v.severity.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-2">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold font-headline uppercase tracking-tight">{v.type}</span>
                        <span className="text-[9px] font-code text-muted-foreground">{v.layer}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2 text-right font-code text-[10px] tabular-nums">
                      {v.entities}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        {/* Center: CAD Viewport */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            <Button size="icon" variant="secondary" className="size-8 rounded bg-black/60 backdrop-blur-md border border-white/10">
              <MousePointer2 className="size-4" />
            </Button>
            <Button size="icon" variant="secondary" className="size-8 rounded bg-black/60 backdrop-blur-md border border-white/10">
              <Ruler className="size-4" />
            </Button>
            <Button size="icon" variant="secondary" className="size-8 rounded bg-black/60 backdrop-blur-md border border-white/10">
              <Layers className="size-4" />
            </Button>
          </div>

          <div className="flex-1 bg-[#0c0c0c] relative group overflow-hidden cursor-crosshair">
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle, #444 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            <svg className="absolute inset-0 w-full h-full p-12 overflow-visible" viewBox="0 0 800 500">
              <g stroke="#333" strokeWidth="1" fill="none">
                <path d="M100 100 L700 100 L700 400 L100 400 Z" />
                <path d="M100 250 L700 250 M400 100 L400 400" />
                <rect x="150" y="150" width="100" height="100" />
                <rect x="550" y="250" width="100" height="100" />
                <circle cx="400" cy="250" r="50" />
              </g>
              <g className="animate-pulse">
                <rect x="145" y="145" width="110" height="110" stroke="hsl(var(--destructive))" strokeWidth="2" fill="hsl(var(--destructive)/0.05)" />
                <circle cx="400" cy="250" r="55" stroke="hsl(var(--warning))" strokeWidth="2" strokeDasharray="4 2" />
              </g>
            </svg>

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="bg-black/60 backdrop-blur-md p-2 border border-white/5 rounded font-code text-[10px] space-y-1">
                <div className="flex gap-4">
                  <span className="text-muted-foreground">X: <span className="text-foreground">14,284.11</span></span>
                  <span className="text-muted-foreground">Y: <span className="text-foreground">-2,941.04</span></span>
                </div>
              </div>
              <Button size="sm" className="h-7 text-[9px] font-code uppercase gap-2">
                <Maximize2 className="size-3" /> Full View
              </Button>
            </div>
          </div>

          {/* Bottom Analysis Terminal */}
          <div className="h-40 border-t border-white/5 bg-black/60 overflow-hidden flex flex-col shrink-0">
            <div className="h-8 border-b border-white/5 px-4 flex items-center justify-between bg-muted/10">
              <div className="flex items-center gap-2">
                <Terminal className="size-3 text-primary" />
                <span className="text-[10px] font-code uppercase font-bold tracking-widest text-muted-foreground">Live Audit Stream</span>
              </div>
            </div>
            <ScrollArea className="flex-1 p-2">
              <div className="space-y-1 font-code text-[10px]">
                <p className="text-muted-foreground">[14:42:01] <span className="text-primary">AUDIT</span> :: Intersection scan initiated on sector US-4...</p>
                <p className="text-muted-foreground">[14:42:04] <span className="text-warning">WARN</span> :: Non-compliant text scale found in A-ANNO-TEXT</p>
                <p className="text-muted-foreground">[14:42:08] <span className="text-destructive">ERR</span> :: Critical geometry overlap detected in block 'W-JOIN-04'</p>
                <p className="text-green-500">[14:42:15] <span className="text-green-500">INFO</span> :: Structural integrity check passed (Score: 94.2)</p>
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Right: Inspector & Health */}
        <div className="w-[380px] border-l border-white/5 flex flex-col shrink-0 bg-muted/5">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              <HealthScore score={84} className="bg-black/40 border-primary/20" />

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border border-white/5 rounded bg-black/20 space-y-1">
                  <span className="text-[9px] font-code text-muted-foreground uppercase">Plotting Readiness</span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-warning font-code">MAJOR_GAP</span>
                    <AlertTriangle className="size-3 text-warning" />
                  </div>
                </div>
                <div className="p-3 border border-white/5 rounded bg-black/20 space-y-1">
                  <span className="text-[9px] font-code text-muted-foreground uppercase">Geo Integrity</span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground font-code">94.4%</span>
                    <CheckCircle2 className="size-3 text-primary" />
                  </div>
                </div>
              </div>

              {selectedIssue ? (
                <Card className="bg-primary/5 border-primary/20 shadow-none">
                  <CardHeader className="py-3 border-b border-primary/10">
                    <CardTitle className="text-[10px] font-code uppercase tracking-[0.2em] flex items-center gap-2">
                      <Microscope className="size-3 text-primary" /> Issue Inspector
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="space-y-1">
                      <Badge variant="outline" className={cn("text-[8px] h-4 font-code", getSeverityColor(selectedIssue.severity))}>
                        {selectedIssue.id} // {selectedIssue.severity.toUpperCase()}
                      </Badge>
                      <h4 className="text-sm font-headline font-bold uppercase tracking-tight">{selectedIssue.type}</h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                        "Recommended Action: {selectedIssue.remediation}. This will restore 100% compliance score for this entity group."
                      </p>
                      <Button className="w-full h-8 text-[10px] font-code uppercase gap-2 mt-4">
                        Execute Automated Fix <ArrowUpRight className="size-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="py-12 text-center opacity-50 border border-dashed border-white/10 rounded">
                  <Search className="size-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-[10px] font-code uppercase">Select violation for analysis</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
