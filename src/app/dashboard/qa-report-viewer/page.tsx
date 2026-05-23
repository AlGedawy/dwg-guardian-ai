"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Download, 
  Share2, 
  ShieldCheck, 
  Microscope, 
  Layers, 
  Ruler, 
  Database, 
  Printer, 
  History,
  Activity,
  Zap,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Cpu,
  Globe,
  SignalHigh,
  FileCheck,
  FileSearch,
  ChevronRight,
  ArrowUpRight,
  Fingerprint,
  FileCode,
  Lock,
  Package
} from "lucide-react"
import { HealthScore } from "@/components/cad/health-score"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export default function QAReportViewer() {
  const violations = [
    { id: "V-001", severity: "Critical", category: "Layer Standards", layer: "A-ANNO-TEXT", std: "ISO-13567", status: "Open", risk: "Extreme" },
    { id: "V-002", severity: "High", category: "Geometric Integrity", layer: "0 (Global)", std: "GEO-REG-V4", status: "Suggested", risk: "High" },
    { id: "V-003", severity: "Medium", category: "Viewport Scaling", layer: "V-PORT-04", std: "AIA-L3", status: "Review", risk: "Moderate" },
    { id: "V-004", severity: "Low", category: "Annotation Drift", layer: "A-DIM-ANNO", std: "ANSI-Y14", status: "Ignored", risk: "Minor" },
    { id: "V-005", severity: "High", category: "Plotting Risks", layer: "DEFPOINTS", std: "PLT-READY-V1", status: "Open", risk: "High" },
  ]

  const getSeverityStyles = (sev: string) => {
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
      {/* Infrastructure Telemetry Layer */}
      <div className="h-10 border-b border-white/5 bg-black/40 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Cpu className="size-3 text-primary" />
            <span className="text-[9px] font-code text-muted-foreground uppercase">NODE:</span>
            <span className="text-[9px] font-code font-bold text-foreground">US-EAST-4_SECURE</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-3 text-green-500" />
            <span className="text-[9px] font-code text-muted-foreground uppercase">ENGINE:</span>
            <span className="text-[9px] font-code font-bold text-foreground">GUARDIAN_STRICT_v4.2</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="size-3 text-primary" />
            <span className="text-[9px] font-code text-muted-foreground uppercase">LATENCY:</span>
            <span className="text-[9px] font-code font-bold text-foreground">0.82ms</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-4 w-px bg-white/10" />
          <span className="text-[9px] font-code text-muted-foreground uppercase tracking-[0.2em]">CERT_HASH: 0x8F22A...</span>
          <Badge variant="outline" className="h-5 text-[8px] font-code bg-green-500/5 text-green-500 border-green-500/20 uppercase">
            Validation Passed
          </Badge>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Summary & Health */}
        <div className="w-[450px] border-r border-white/5 flex flex-col shrink-0 bg-muted/5">
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
            <div className="flex items-center gap-2">
              <Fingerprint className="size-4 text-primary" />
              <h2 className="text-xs font-headline font-bold uppercase tracking-widest">Executive Summary</h2>
            </div>
            <Button size="icon" variant="ghost" className="size-6">
              <Printer className="size-3 text-muted-foreground" />
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {/* Report Metadata */}
              <div className="space-y-4 p-4 rounded border border-white/5 bg-black/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <FileCheck className="size-16 text-primary" />
                </div>
                <div className="space-y-1 relative z-10">
                  <span className="text-[9px] font-code text-muted-foreground uppercase tracking-widest block">Project Identity</span>
                  <h3 className="text-sm font-headline font-bold uppercase tracking-tight">T3_TERMINAL_EXPANSION_LAYOUT</h3>
                  <p className="text-[10px] text-muted-foreground font-code">ARCH_PKG_2024_Q1 // SESSION_ID: 0x7E3F21A</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5 relative z-10">
                  <div className="space-y-1">
                    <span className="text-[8px] font-code text-muted-foreground uppercase">Validating Engineer</span>
                    <p className="text-[10px] font-bold uppercase">SYS_AUDITOR_42</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] font-code text-muted-foreground uppercase">Audit Timestamp</span>
                    <p className="text-[10px] font-bold uppercase">2024.03.22 14:22</p>
                  </div>
                </div>
              </div>

              {/* Health Core */}
              <HealthScore score={94} className="bg-primary/5 border-primary/20" />

              {/* Detailed Metrics List */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                  <Activity className="size-3 text-muted-foreground" />
                  <span className="text-[9px] font-code uppercase font-bold tracking-widest text-muted-foreground">Compliance Metrics</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <MetricItem label="Standards Coverage" value="99.2%" icon={ShieldCheck} status="pass" />
                  <MetricItem label="Plotting Readiness" value="84.0%" icon={Printer} status="warn" />
                  <MetricItem label="Geometry Integrity" value="94.4%" icon={Database} status="pass" />
                  <MetricItem label="Annotation Consistency" value="88.2%" icon={Layers} status="pass" />
                  <MetricItem label="Audit Confidence" value="HIGH" icon={Fingerprint} status="pass" />
                </div>
              </div>

              {/* Action Sidebar */}
              <Card className="bg-primary/5 border-primary/20 shadow-none border-dashed">
                <CardHeader className="py-3">
                  <CardTitle className="text-[10px] font-code uppercase tracking-widest flex items-center gap-2 text-primary">
                    <Lock className="size-3" /> Certification Pipeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Drawing has passed primary geometric scan. Final certification requires approval of "Critical" layer violations.
                  </p>
                  <Button className="w-full h-8 text-[10px] font-code uppercase gap-2 shadow-lg shadow-primary/20">
                    <FileCheck className="size-3" /> Sign & Publish Report
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="h-7 text-[9px] font-code uppercase gap-1 bg-black/40 border-white/5">
                      <Download className="size-3" /> PDF
                    </Button>
                    <Button variant="outline" className="h-7 text-[9px] font-code uppercase gap-1 bg-black/40 border-white/5">
                      <Package className="size-3" /> Audit Pkg
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </div>

        {/* Center: Detailed Matrix */}
        <div className="flex-1 flex flex-col overflow-hidden bg-black/20">
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-muted/5">
            <div className="flex items-center gap-2">
              <Microscope className="size-4 text-primary" />
              <h2 className="text-xs font-headline font-bold uppercase tracking-widest">Violations Matrix</h2>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-[9px] font-code">FILTER: ALL_CATEGORIES</Badge>
              <Badge variant="outline" className="text-[9px] font-code border-destructive/30 text-destructive">8 CRITICAL</Badge>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <Table>
              <TableHeader className="bg-muted/10 sticky top-0 z-10">
                <TableRow className="h-10 hover:bg-transparent border-white/5">
                  <TableHead className="text-[9px] font-code uppercase tracking-widest">Severity</TableHead>
                  <TableHead className="text-[9px] font-code uppercase tracking-widest">Category</TableHead>
                  <TableHead className="text-[9px] font-code uppercase tracking-widest">Affected Entity</TableHead>
                  <TableHead className="text-[9px] font-code uppercase tracking-widest">Standard</TableHead>
                  <TableHead className="text-[9px] font-code uppercase tracking-widest">Risk</TableHead>
                  <TableHead className="text-[9px] font-code uppercase tracking-widest text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {violations.map((v) => (
                  <TableRow key={v.id} className="group border-white/5 hover:bg-primary/5 transition-colors">
                    <TableCell className="py-4">
                      <Badge className={cn("text-[9px] font-code px-2 h-5", getSeverityStyles(v.severity))}>
                        {v.severity.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold font-headline uppercase tracking-tight">{v.category}</span>
                        <span className="text-[9px] font-code text-muted-foreground">{v.id}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 font-code text-[10px]">
                      {v.layer}
                    </TableCell>
                    <TableCell className="py-4 font-code text-[10px] text-primary">
                      {v.std}
                    </TableCell>
                    <TableCell className="py-4">
                      <span className={cn(
                        "text-[9px] font-code font-bold uppercase",
                        v.risk === 'Extreme' || v.risk === 'High' ? "text-destructive" : "text-warning"
                      )}>
                        {v.risk}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="size-4 text-primary" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>

          {/* Bottom Recommendations Panel */}
          <div className="h-64 border-t border-white/5 bg-black/60 overflow-hidden flex flex-col shrink-0">
            <div className="h-8 border-b border-white/5 px-4 flex items-center justify-between bg-muted/10">
              <div className="flex items-center gap-2">
                <Zap className="size-3 text-primary" />
                <span className="text-[10px] font-code uppercase font-bold tracking-widest text-muted-foreground">AI Engineering Recommendations</span>
              </div>
              <Badge variant="outline" className="text-[9px] h-4 font-code">AUTO_GEN_READY</Badge>
            </div>
            <div className="flex-1 grid grid-cols-3 divide-x divide-white/5 overflow-hidden">
              <RecommendationCard 
                title="Geometry Cleanup"
                desc="1,284 redundant entities in block 'W-JOIN-04'. Bulk purge recommended to restore plotting stability."
                priority="HIGH"
              />
              <RecommendationCard 
                title="Standard Mapping"
                desc="Non-compliant layer 'A-ANNO-TEXT' lacks mandatory ISO properties. Apply AIA-v3 standard map."
                priority="CRITICAL"
              />
              <RecommendationCard 
                title="Scale Correction"
                desc="Viewport scale (1:47.3) is non-standard. Normalize to 1:50 to ensure plotting accuracy."
                priority="MEDIUM"
              />
            </div>
          </div>
        </div>

        {/* Right: History & Revision */}
        <div className="w-[380px] border-l border-white/5 flex flex-col shrink-0 bg-muted/5">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {/* Revision activity timeline */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-2">
                  <History className="size-3 text-muted-foreground" />
                  <span className="text-[10px] font-code uppercase font-bold tracking-widest text-muted-foreground">Audit Revision History</span>
                </div>
                <div className="relative pl-6 space-y-8">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/5" />
                  <AuditHistoryItem 
                    time="14:22:12" 
                    user="SYS_AUDITOR" 
                    action="Report Finalized" 
                    rev="v1.2.4" 
                    status="current"
                  />
                  <AuditHistoryItem 
                    time="14:15:02" 
                    user="AGENT_GEO" 
                    action="Geometry Fix Applied" 
                    rev="v1.2.3" 
                  />
                  <AuditHistoryItem 
                    time="10:04:44" 
                    user="ARCH_INFRA" 
                    action="Drawing Package Uploaded" 
                    rev="v1.0.0" 
                  />
                  <AuditHistoryItem 
                    time="Mar 21 09:00" 
                    user="SYSTEM" 
                    action="Session Initialized" 
                    rev="v0.9.0" 
                  />
                </div>
              </div>

              {/* Integrity Certification */}
              <div className="p-4 rounded border border-primary/20 bg-primary/5 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-primary" />
                  <span className="text-[10px] font-code font-bold text-primary uppercase tracking-widest">Compliance Certification</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-code border-b border-white/5 pb-2">
                    <span className="text-muted-foreground uppercase">Certificate No.</span>
                    <span className="text-foreground font-bold">QA-992-04X</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-code border-b border-white/5 pb-2">
                    <span className="text-muted-foreground uppercase">Validation Authority</span>
                    <span className="text-foreground font-bold">GUARDIAN_SECURE</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-code">
                    <span className="text-muted-foreground uppercase">Status</span>
                    <span className="text-green-500 font-bold tracking-widest">ISO_COMPLIANT</span>
                  </div>
                </div>
                <div className="pt-2 text-[9px] text-muted-foreground italic leading-relaxed text-center">
                  "This document certifies that the geometric and metadata integrity of the referenced asset meets global engineering standards."
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

function MetricItem({ label, value, icon: Icon, status }: any) {
  return (
    <div className="flex items-center justify-between p-2 rounded bg-black/20 border border-white/5 group hover:border-primary/20 transition-colors">
      <div className="flex items-center gap-3">
        <div className={cn(
          "size-7 rounded border flex items-center justify-center transition-colors",
          status === 'pass' ? "border-primary/20 bg-primary/5 text-primary" : "border-warning/20 bg-warning/5 text-warning"
        )}>
          <Icon className="size-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-code text-muted-foreground uppercase tracking-tight">{label}</span>
          <span className="text-xs font-bold font-code">{value}</span>
        </div>
      </div>
      {status === 'pass' ? (
        <CheckCircle2 className="size-3 text-primary opacity-50" />
      ) : (
        <AlertTriangle className="size-3 text-warning opacity-80" />
      )}
    </div>
  )
}

function RecommendationCard({ title, desc, priority }: any) {
  return (
    <div className="p-4 flex flex-col justify-between group hover:bg-primary/5 transition-colors">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-[10px] font-bold font-headline uppercase tracking-tight">{title}</h4>
          <Badge variant="outline" className={cn(
            "text-[8px] h-3 px-1 font-code",
            priority === 'CRITICAL' ? "border-destructive/30 text-destructive" : 
            priority === 'HIGH' ? "border-warning/30 text-warning" : "border-primary/30 text-primary"
          )}>
            {priority}
          </Badge>
        </div>
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          {desc}
        </p>
      </div>
      <Button variant="ghost" className="h-6 w-full text-[9px] font-code uppercase justify-between px-0 hover:text-primary">
        Review Remediation <ChevronRight className="size-3" />
      </Button>
    </div>
  )
}

function AuditHistoryItem({ time, user, action, rev, status }: any) {
  return (
    <div className="relative">
      <div className={cn(
        "absolute -left-[23px] top-1 size-3 rounded-full border bg-black z-10",
        status === 'current' ? "border-primary" : "border-white/10"
      )}>
        {status === 'current' && <div className="size-1.5 rounded-full bg-primary m-auto mt-0.5" />}
      </div>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className={cn(
            "text-[10px] font-bold font-headline uppercase tracking-tight",
            status === 'current' ? "text-primary" : "text-foreground"
          )}>{action}</span>
          <span className="text-[9px] font-code text-muted-foreground tabular-nums">{time}</span>
        </div>
        <div className="flex items-center justify-between text-[8px] font-code text-muted-foreground uppercase tracking-widest">
          <span>USER: {user}</span>
          <span>REV: {rev}</span>
        </div>
      </div>
    </div>
  )
}
