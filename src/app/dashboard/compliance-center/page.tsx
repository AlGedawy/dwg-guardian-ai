"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ShieldCheck, Scale, Ruler, Layers, FileText, CheckCircle2, AlertTriangle, Zap, Settings2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ComplianceCenterPage() {
  const standards = [
    { id: "ISO-13567", name: "ISO 13567 Layering", status: "Active", version: "v2.4", coverage: 98 },
    { id: "AIA-V3", name: "AIA CAD Standard v3", status: "Active", version: "v3.1", coverage: 92 },
    { id: "EN-1090", name: "EN 1090 Structural", status: "Active", version: "v1.0", coverage: 100 },
    { id: "REG-US-4", name: "Local US-East-4 Regs", status: "Inactive", version: "v0.8", coverage: 45 },
  ]

  const rules = [
    { category: "Layers", rule: "Standard Naming Convention", engine: "REGEX_PARSER", severity: "Critical" },
    { category: "Geometry", rule: "Self-Intersection Detection", engine: "GEO_V4", severity: "Major" },
    { category: "Plotting", rule: "Line-weight Verification", engine: "PLT_READY", severity: "Minor" },
    { category: "Text", rule: "Font Standardization", engine: "TXT_ANNO", severity: "Major" },
  ]

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Scale className="size-5 text-primary" />
            <Badge variant="outline" className="font-code text-[10px] border-primary/20 text-primary uppercase">Regulatory Governance</Badge>
          </div>
          <h1 className="text-4xl font-headline font-bold uppercase tracking-tight">Compliance Center</h1>
          <p className="text-muted-foreground font-body">Manage global engineering standards and active audit engines.</p>
        </div>
        <Button className="gap-2 h-10 px-6 font-code text-xs uppercase shadow-lg shadow-primary/20">
          <ShieldCheck className="size-4" /> Global Policy Push
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Standards */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {standards.map((std) => (
              <Card key={std.id} className="bg-card/40 border-border/50 hover:border-primary/30 transition-all overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <FileText className="size-12" />
                </div>
                <CardHeader className="py-4">
                  <div className="flex justify-between items-start">
                    <Badge variant={std.status === "Active" ? "default" : "secondary"} className="text-[8px] h-4 font-code">
                      {std.status.toUpperCase()}
                    </Badge>
                    <span className="text-[10px] font-code text-muted-foreground">{std.version}</span>
                  </div>
                  <CardTitle className="text-sm font-headline font-bold uppercase tracking-tight mt-2">{std.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-code">
                      <span className="text-muted-foreground uppercase">Standards Coverage</span>
                      <span className="text-primary font-bold">{std.coverage}%</span>
                    </div>
                    <div className="h-1 w-full bg-muted/40 rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${std.coverage}%` }} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 text-[9px] font-code uppercase flex-1 border-white/5 bg-white/5">Configure</Button>
                    <Button variant="outline" size="sm" className="h-7 text-[9px] font-code uppercase flex-1 border-white/5 bg-white/5">Logs</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-card/40 border-border/50">
            <CardHeader className="py-4 border-b border-white/5">
              <CardTitle className="text-xs font-code uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Settings2 className="size-3 text-primary" /> Active Rule Registry
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {rules.map((rule, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="size-8 rounded border border-white/10 flex items-center justify-center bg-muted/20">
                        {rule.category === "Layers" ? <Layers className="size-4 text-muted-foreground" /> :
                         rule.category === "Geometry" ? <Zap className="size-4 text-warning" /> :
                         <Ruler className="size-4 text-primary" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase font-headline tracking-tight">{rule.rule}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[9px] font-code text-muted-foreground uppercase">Engine: {rule.engine}</span>
                          <span className="text-border">|</span>
                          <Badge variant="outline" className={cn(
                            "text-[8px] h-3.5 px-1 font-code uppercase",
                            rule.severity === "Critical" ? "border-destructive/30 text-destructive" : "border-primary/30 text-primary"
                          )}>{rule.severity}</Badge>
                        </div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Intel */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="py-4">
              <CardTitle className="text-xs font-code uppercase tracking-widest flex items-center gap-2 text-primary">
                <ShieldCheck className="size-3" /> Integrity Check
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                "Global compliance engine version 4.2.0 is verified. All active standards match ISO-13567-2024 specifications."
              </p>
              <div className="p-3 rounded border border-white/5 bg-black/40 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-code">
                  <span className="text-muted-foreground uppercase">Session Signature</span>
                  <span className="text-foreground font-bold">0x8F22A...</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-code">
                  <span className="text-muted-foreground uppercase">Last Validation</span>
                  <span className="text-foreground font-bold">14s ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/20 border-border/50">
            <CardHeader className="py-3 border-b border-white/5">
              <CardTitle className="text-[10px] font-code uppercase tracking-widest text-muted-foreground">Audit Confidence</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col items-center">
              <div className="size-32 rounded-full border-4 border-primary/20 border-t-primary flex flex-col items-center justify-center">
                <span className="text-3xl font-headline font-bold">99.4%</span>
                <span className="text-[8px] font-code text-muted-foreground uppercase">High Confidence</span>
              </div>
              <div className="mt-6 w-full space-y-2">
                <div className="flex justify-between items-center text-[9px] font-code py-1 border-b border-white/5">
                  <span className="text-muted-foreground uppercase">False Positive Rate</span>
                  <span className="text-green-500 font-bold">0.02%</span>
                </div>
                <div className="flex justify-between items-center text-[9px] font-code py-1 border-b border-white/5">
                  <span className="text-muted-foreground uppercase">Detection Latency</span>
                  <span className="text-foreground font-bold">0.42ms</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
