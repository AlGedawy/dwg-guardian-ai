"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Activity, 
  AlertCircle, 
  AlertTriangle, 
  Box, 
  CheckCircle2, 
  ChevronRight, 
  Crosshair, 
  Database, 
  History, 
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
  ArrowUpRight
} from "lucide-react"
import { HealthScore } from "@/components/cad/health-score"
import { cn } from "@/lib/utils"

export default function AnalysisDashboard() {
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
      {/* Engineering Telemetry Layer */}
      <div className="h-10 border-b border-white/5 bg-black/40 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Cpu className="size-3 text-primary" />
            <span className="text-[10px] font-code text-muted-foreground uppercase">AUDIT_NODE:</span>
            <span className="text-[10px] font-code font-bold text-foreground">US-EAST-4_BETA</span>
          </div>
          <div className="flex items-center gap-2">
            <SignalHigh className="size-3 text-green-500" />
            <span className="text-[10px] font-code text-muted-foreground uppercase">LATENCY:</span>
            <span className="text-[10px] font-code font-bold text-foreground">14ms</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="size-3 text-primary" />
            <span className="text-[10px] font-code text-muted-foreground uppercase">GEO_SCAN:</span>
            <span className="text-[10px] font-code font-bold text-foreground">412.4 MB/s</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="h-5 text-[9px] font-code border-primary/20 text-primary bg-primary/5">
            COMPLIANCE_ENGINE: AIA_ISO_STRICT_V4
          </Badge>
          <div className="h-4 w-px bg-white/10" />
          <span className="text-[9px] font-code text-muted-foreground uppercase tracking-widest">SESSION_ID: 0x7E3F21A</span>
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
                        <span className="text-[9px] font-code text-muted-foreground">{v.layer} // {v.viewport}</span>
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
            <Button size="icon" variant="secondary" className="size-8 rounded bg-black/60 backdrop-blur-md border border-white/10 hover:bg-primary/20">
              <MousePointer2 className="size-4" />
            </Button>
            <Button size="icon" variant="secondary" className="size-8 rounded bg-black/60 backdrop-blur-md border border-white/10 hover:bg-primary/20">
              <Ruler className="size-4" />
            </Button>
            <Button size="icon" variant="secondary" className="size-8 rounded bg-black/60 backdrop-blur-md border border-white/10 hover:bg-primary/20">
              <Layers className="size-4" />
            </Button>
            <Button size="icon" variant="secondary" className="size-8 rounded bg-black/60 backdrop-blur-md border border-white/10 hover:bg-primary/20">
              <Crosshair className="size-4" />
            </Button>
          </div>

          <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
            <Badge variant="secondary" className="bg-black/80 backdrop-blur-md border-white/10 font-code text-[10px] uppercase">
              Viewport: V-04_INSPECTION
            </Badge>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 font-code text-[9px] uppercase">Geometry Overlays Active</Badge>
              <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30 font-code text-[9px] uppercase">Compliance Failure</Badge>
            </div>
          </div>

          {/* Technical Drawing Canvas Mock */}
          <div className="flex-1 bg-[#0c0c0c] relative group overflow-hidden cursor-crosshair">
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle, #444 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            <svg className="absolute inset-0 w-full h-full p-12 overflow-visible" viewBox="0 0 800 500">
              {/* Complex Geometry Mock */}
              <g stroke="#333" strokeWidth="1" fill="none">
                <path d="M100 100 L700 100 L700 400 L100 400 Z" />
                <path d="M100 250 L700 250 M400 100 L400 400" />
                <rect x="150" y="150" width="100" height="100" />
                <rect x="550" y="250" width="100" height="100" />
                <circle cx="400" cy="250" r="50" />
              </g>

              {/* Highlighted Violations */}
              <g className="animate-pulse">
                <rect x="145" y="145" width="110" height="110" stroke="hsl(var(--destructive))" strokeWidth="2" fill="hsl(var(--destructive)/0.05)" />
                <circle cx="400" cy="250" r="55" stroke="hsl(var(--warning))" strokeWidth="2" strokeDasharray="4 2" />
                <path d="M545 245 L655 245 L655 355 L545 355 Z" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="8 4" />
              </g>

              {/* Metadata Labels */}
              <g fill="hsl(var(--primary))" fontSize="9" fontFamily="Source Code Pro" className="opacity-70">
                <text x="155" y="140">ERR: ISO-13567-V1</text>
                <text x="555" y="240">WARN: DUP_GEO_V4</text>
                <text x="370" y="190">COORD: 14.22m</text>
              </g>

              {/* Grid Ruler Overlay */}
              <path d="M0 250 L800 250 M400 0 L400 500" stroke="hsl(var(--primary)/0.1)" strokeWidth="0.5" strokeDasharray="2 2" />
            </svg>

            {/* Viewport Bottom HUD */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="bg-black/60 backdrop-blur-md p-2 border border-white/5 rounded font-code text-[10px] space-y-1">
                <div className="flex gap-4">
                  <span className="text-muted-foreground">X: <span className="text-foreground">14,284.11</span></span>
                  <span className="text-muted-foreground">Y: <span className="text-foreground">-2,941.04</span></span>
                  <span className="text-muted-foreground">Z: <span className="text-foreground">0.00</span></span>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted-foreground">SNAP: <span className="text-primary font-bold">GRID</span></span>
                  <span className="text-muted-foreground">ORTHO: <span className="text-green-500 font-bold">ON</span></span>
                  <span className="text-muted-foreground">U_SCALE: <span className="text-foreground">1:50</span></span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="h-7 text-[9px] font-code uppercase bg-black/40">Layer Manager</Button>
                <Button size="sm" variant="outline" className="h-7 text-[9px] font-code uppercase bg-black/40">Entity Inspector</Button>
                <Button size="sm" className="h-7 text-[9px] font-code uppercase gap-2">
                  <Maximize2 className="size-3" /> Full View
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Analysis Terminal */}
          <div className="h-40 border-t border-white/5 bg-black/60 overflow-hidden flex flex-col shrink-0">
            <div className="h-8 border-b border-white/5 px-4 flex items-center justify-between bg-muted/10">
              <div className="flex items-center gap-2">
                <Terminal className="size-3 text-primary" />
                <span className="text-[10px] font-code uppercase font-bold tracking-widest text-muted-foreground">Live Audit Stream</span>
              </div>
              <Badge variant="outline" className="text-[8px] h-4 font-code">FILTER: ALL_EVENTS</Badge>
            </div>
            <ScrollArea className="flex-1 p-2">
              <div className="space-y-1 font-code text-[10px]">
                <p className="text-muted-foreground">[14:42:01] <span className="text-primary">AUDIT</span> :: Intersection scan initiated on sector US-4...</p>
                <p className="text-muted-foreground">[14:42:04] <span className="text-warning">WARN</span> :: Non-compliant text scale found in A-ANNO-TEXT [H=2.5mm vs Standard=3.0mm]</p>
                <p className="text-muted-foreground">[14:42:08] <span className="text-destructive">ERR</span> :: Critical geometry overlap detected in block 'W-JOIN-04' (1,284 entities)</p>
                <p className="text-muted-foreground">[14:42:12] <span className="text-primary">AUDIT</span> :: Layer validation complete: 14 compliance gaps identified</p>
                <p className="text-muted-foreground">[14:42:15] <span className="text-green-500">INFO</span> :: Structural integrity check passed (Score: 94.2)</p>
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Right: Inspector & Health */}
        <div className="w-[380px] border-l border-white/5 flex flex-col shrink-0 bg-muted/5">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {/* Health Score Component */}
              <HealthScore score={84} className="bg-black/40 border-primary/20" />

              {/* Health Matrix Grid */}
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
                <div className="p-3 border border-white/5 rounded bg-black/20 space-y-1">
                  <span className="text-[9px] font-code text-muted-foreground uppercase">Anno Quality</span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground font-code">88.2%</span>
                    <Info className="size-3 text-muted-foreground" />
                  </div>
                </div>
                <div className="p-3 border border-white/5 rounded bg-black/20 space-y-1">
                  <span className="text-[9px] font-code text-muted-foreground uppercase">Standards Cov</span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary font-code">99.2%</span>
                    <ShieldCheck className="size-3 text-primary" />
                  </div>
                </div>
              </div>

              {/* Issue Inspector Panel */}
              <Card className="bg-primary/5 border-primary/20 shadow-none">
                <CardHeader className="py-3 border-b border-primary/10">
                  <CardTitle className="text-[10px] font-code uppercase tracking-[0.2em] flex items-center gap-2">
                    <Microscope className="size-3 text-primary" /> Issue Inspector
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  {selectedIssue ? (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <Badge variant="outline" className={cn("text-[8px] h-4 font-code", getSeverityColor(selectedIssue.severity))}>
                          {selectedIssue.id} // {selectedIssue.severity.toUpperCase()}
                        </Badge>
                        <h4 className="text-sm font-headline font-bold uppercase tracking-tight">{selectedIssue.type}</h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          The component <span className="text-foreground font-code">{selectedIssue.layer}</span> failed mandatory compliance check against <span className="text-primary font-code">{selectedIssue.std}</span> in viewport <span className="text-foreground font-code">{selectedIssue.viewport}</span>.
                        </p>
                      </div>

                      <div className="p-3 rounded bg-black/40 border border-white/5 space-y-2">
                        <div className="flex items-center gap-2">
                          <Zap className="size-3 text-primary" />
                          <span className="text-[10px] font-code font-bold text-primary uppercase">AI Remediation Agent</span>
                        </div>
                        <p className="text-[10px] text-foreground/80 leading-relaxed italic">
                          "Recommended Action: {selectedIssue.remediation}. This will restore 100% compliance score for this entity group."
                        </p>
                        <Button className="w-full h-8 text-[10px] font-code uppercase gap-2 mt-2">
                          Execute Automated Fix <ArrowUpRight className="size-3" />
                        </Button>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-white/5">
                        <div className="flex justify-between items-center text-[9px] font-code">
                          <span className="text-muted-foreground uppercase">Affected Entities</span>
                          <span className="font-bold">{selectedIssue.entities} Primitive(s)</span>
                        </div>
                        <div className="flex justify-between items-center text-[9px] font-code">
                          <span className="text-muted-foreground uppercase">Risk Level</span>
                          <span className={cn("font-bold", selectedIssue.severity === 'Critical' ? "text-destructive" : "text-warning")}>HIGH_IMPACT</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-center space-y-3 opacity-50">
                      <Search className="size-8 mx-auto text-muted-foreground" />
                      <p className="text-[10px] font-code uppercase">Select a violation for deep analysis</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Audit Timeline */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-2">
                  <History className="size-3 text-muted-foreground" />
                  <span className="text-[10px] font-code uppercase font-bold tracking-widest text-muted-foreground">Revision Activity</span>
                </div>
                <div className="relative pl-6 space-y-6">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/5" />
                  <TimelineItem 
                    time="14:42:15" 
                    user="SYS_AUDITOR" 
                    action="Compliance Pass Finalized" 
                    status="complete" 
                  />
                  <TimelineItem 
                    time="14:40:02" 
                    user="AGENT_GEO" 
                    action="Geometry Scan Initiated" 
                    status="processing" 
                  />
                  <TimelineItem 
                    time="12:15:44" 
                    user="ARCH_V_01" 
                    action="Drawing Version Uploaded" 
                    status="complete" 
                  />
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

function TimelineItem({ time, user, action, status }: any) {
  return (
    <div className="relative">
      <div className={cn(
        "absolute -left-[23px] top-1 size-3 rounded-full border bg-black z-10",
        status === 'complete' ? "border-primary" : "border-muted-foreground/30 animate-pulse"
      )}>
        {status === 'complete' && <div className="size-1.5 rounded-full bg-primary m-auto mt-0.5" />}
      </div>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold font-headline uppercase tracking-tight">{action}</span>
          <span className="text-[9px] font-code text-muted-foreground tabular-nums">{time}</span>
        </div>
        <p className="text-[9px] font-code text-muted-foreground uppercase tracking-widest">{user}</p>
      </div>
    </div>
  )
}
