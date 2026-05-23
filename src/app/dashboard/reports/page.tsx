"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Share2, ShieldCheck, Microscope, Layers, Ruler, Database, PieChart as PieChartIcon, Printer, ChevronRight } from "lucide-react"
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { cn } from "@/lib/utils"

export default function ReportsPage() {
  const complianceData = [
    { name: 'ISO-13567', score: 92, fill: 'hsl(var(--primary))' },
    { name: 'AIA-V3', score: 85, fill: 'hsl(var(--primary)/0.6)' },
    { name: 'EN-1090', score: 98, fill: 'hsl(var(--primary)/0.8)' },
    { name: 'OSHA-2024', score: 100, fill: 'hsl(var(--primary))' },
  ]

  const violationStats = [
    { category: 'Layers', critical: 2, major: 4, minor: 12 },
    { category: 'Geometry', critical: 5, major: 1, minor: 8 },
    { category: 'Annotations', critical: 0, major: 2, minor: 15 },
    { category: 'Plotting', critical: 1, major: 3, minor: 4 },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-border/50 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="font-code text-[10px] border-primary/20 text-primary">QA_REPORT_V4_STABLE</Badge>
          </div>
          <h1 className="text-4xl font-headline font-bold uppercase tracking-tight">Compliance Executive Summary</h1>
          <p className="text-muted-foreground font-body">Drawing: T3_TERMINAL_EXPANSION_LAYOUT_V1.dwg // Authored: 2024-03-22</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 h-10 font-code text-xs uppercase">
            <Printer className="size-4" /> Print
          </Button>
          <Button variant="outline" className="gap-2 h-10 font-code text-xs uppercase">
            <Share2 className="size-4" /> Share
          </Button>
          <Button className="gap-2 h-10 font-code text-xs uppercase shadow-lg shadow-primary/20">
            <Download className="size-4" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Executive Overview Cards */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card/40 border-primary/20">
              <CardContent className="pt-6 space-y-2">
                <p className="text-[10px] font-code text-muted-foreground uppercase font-bold">Overall Compliance</p>
                <p className="text-5xl font-headline font-bold text-primary">94.2%</p>
                <Badge className="bg-primary/20 text-primary border-primary/30 text-[9px]">OPTIMAL</Badge>
              </CardContent>
            </Card>
            <Card className="bg-card/40 border-border/50">
              <CardContent className="pt-6 space-y-2">
                <p className="text-[10px] font-code text-muted-foreground uppercase font-bold">Total Violations</p>
                <p className="text-5xl font-headline font-bold text-foreground">34</p>
                <div className="flex gap-2 text-[9px] font-code">
                  <span className="text-destructive font-bold">8 CRITICAL</span>
                  <span className="text-muted-foreground">• 26 MINOR</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/40 border-border/50">
              <CardContent className="pt-6 space-y-2">
                <p className="text-[10px] font-code text-muted-foreground uppercase font-bold">Standards Passed</p>
                <p className="text-5xl font-headline font-bold text-foreground">12/14</p>
                <Badge variant="outline" className="text-[9px]">AIA / ISO CERTIFIED</Badge>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/20 border-border/50">
            <CardHeader>
              <CardTitle className="text-sm font-code uppercase tracking-widest flex items-center gap-2">
                <PieChartIcon className="size-3" /> Violation Breakdown by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={violationStats}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted)/0.2)" />
                    <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: 'hsl(var(--muted-foreground))'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: 'hsl(var(--muted-foreground))'}} />
                    <Tooltip cursor={{fill: 'hsl(var(--muted)/0.1)'}} contentStyle={{backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', fontSize: '10px'}} />
                    <Bar dataKey="critical" stackId="a" fill="hsl(var(--destructive))" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="major" stackId="a" fill="hsl(var(--warning))" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="minor" stackId="a" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card/40 border-border/50">
              <CardHeader className="py-3">
                <CardTitle className="text-[10px] font-code uppercase tracking-widest">Standards Coverage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {complianceData.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-code">
                      <span>{item.name}</span>
                      <span>{item.score}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all" style={{ width: `${item.score}%`, backgroundColor: item.fill }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/40 border-border/50">
              <CardHeader className="py-3">
                <CardTitle className="text-[10px] font-code uppercase tracking-widest">Integrity Telemetry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "GEOMETRY_SCAN", status: "PASS", val: "100%" },
                  { label: "COORD_ALIGNMENT", status: "PASS", val: "99.9%" },
                  { label: "BLOCK_DEFINITIONS", status: "WARN", val: "82.4%" },
                  { label: "LINE_WEIGHT_ISO", status: "PASS", val: "94.1%" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                    <span className="text-[10px] font-code text-muted-foreground">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold font-code">{item.val}</span>
                      <Badge variant={item.status === 'PASS' ? 'outline' : 'secondary'} className={cn("text-[8px] h-3 px-1", item.status === 'WARN' && "text-warning")}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action / History Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xs font-code uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="size-3 text-primary" /> Auditor Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 rounded-lg bg-background border border-border/50 space-y-2">
                <p className="text-[11px] font-bold uppercase text-primary">Geometry Cleanup Required</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  The current model contains 1,284 duplicate entities. Bulk execution of the "PURGE_DUPLICATES" routine is mandatory for plotting stability.
                </p>
                <Button size="sm" className="w-full h-8 text-[10px] font-code uppercase mt-2">Execute Cleanup</Button>
              </div>

              <div className="p-4 rounded-lg bg-background border border-border/50 space-y-2">
                <p className="text-[11px] font-bold uppercase text-warning">Layer Standardization</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Non-compliant layers 'A-ANNO-OLD' and 'TEMP_WALLS' detected. Map these to AIA standards to achieve 100% compliance.
                </p>
                <Button size="sm" variant="outline" className="w-full h-8 text-[10px] font-code uppercase mt-2">Map to Standards</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/20 border-border/50">
            <CardHeader className="py-3">
              <CardTitle className="text-[10px] font-code uppercase tracking-widest text-muted-foreground">Revision Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { ver: "v1.2", date: "2024-03-22", user: "SysAudit", action: "Current QA Pass" },
                  { ver: "v1.1", date: "2024-03-21", user: "Arch_V", action: "Geometry Fix applied" },
                  { ver: "v1.0", date: "2024-03-18", user: "Arch_V", action: "Initial Ingestion" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 relative">
                    {i !== 2 && <div className="absolute left-[7px] top-4 bottom-0 w-[1px] bg-border/50" />}
                    <div className={cn("size-4 rounded-full border border-border/50 flex items-center justify-center bg-card relative z-10", i === 0 ? "border-primary" : "")}>
                      <div className={cn("size-1.5 rounded-full", i === 0 ? "bg-primary" : "bg-muted-foreground/30")} />
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex justify-between items-start mb-0.5">
                        <span className="text-[10px] font-bold font-code">{item.ver}</span>
                        <span className="text-[9px] font-code text-muted-foreground">{item.date}</span>
                      </div>
                      <p className="text-[10px] font-body text-foreground/80">{item.action}</p>
                      <p className="text-[8px] font-code text-muted-foreground uppercase">{item.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
