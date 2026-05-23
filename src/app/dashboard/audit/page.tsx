"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Upload, FileType, Search, AlertCircle, AlertTriangle, Info, CheckCircle, Loader2, Sparkles, Database, Layers, Ruler, Microscope, Terminal, FileText, ChevronRight, Activity, ShieldCheck, Box } from "lucide-react"
import { auditCadFile, type AuditCadFileOutput } from "@/ai/flows/audit-cad-file"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { HealthScore } from "@/components/cad/health-score"
import { TechnicalViewport } from "@/components/cad/technical-viewport"

type AuditState = "idle" | "uploading" | "processing" | "complete"

export default function AuditPage() {
  const [state, setState] = useState<AuditState>("idle")
  const [results, setResults] = useState<AuditCadFileOutput | null>(null)
  const [fileName, setFileName] = useState("")
  const [progress, setProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    { label: "GEOMETRY SCAN", icon: Microscope, code: "GEO_V4" },
    { label: "LAYER VALIDATION", icon: Layers, code: "AIA_ISO" },
    { label: "STANDARDS MAPPING", icon: Ruler, code: "REG_2024" },
    { label: "ANNOTATION AUDIT", icon: Search, code: "TXT_ANNO" },
    { label: "PLOT VERIFICATION", icon: Database, code: "PLT_READY" },
    { label: "QA GENERATION", icon: FileText, code: "RPT_V1" }
  ]

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setState("uploading")
    setProgress(30)

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      setState("processing")
      const dataUri = reader.result as string
      
      // Artificial delay for UI feedback of the technical steps
      for (let i = 0; i < steps.length; i++) {
        setActiveStep(i)
        setProgress(30 + ((i + 1) * 10))
        await new Promise(r => setTimeout(r, 800))
      }

      try {
        const output = await auditCadFile({
          fileDataUri: dataUri,
          fileName: file.name
        })
        setResults(output)
        setState("complete")
        setProgress(100)
      } catch (error) {
        console.error("Audit failed", error)
        setState("idle")
      }
    }
  }

  const getSeverityIcon = (sev: string) => {
    switch (sev) {
      case "Critical": return <AlertCircle className="size-4 text-destructive" />
      case "High": return <AlertTriangle className="size-4 text-destructive" />
      case "Medium": return <AlertTriangle className="size-4 text-warning" />
      default: return <Info className="size-4 text-muted-foreground" />
    }
  }

  if (state === "idle") {
    return (
      <div className="p-8 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-code text-[10px] text-primary bg-primary/5">INGESTION_MODULE_V4</Badge>
          </div>
          <h1 className="text-4xl font-headline font-bold uppercase tracking-tight">Upload Workspace</h1>
          <p className="text-muted-foreground max-w-2xl font-body">Initiate high-precision geometric analysis. Supported technical formats: DWG (v2000-2024), DXF, Vector PDF.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-6">
            <div className="relative group">
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                accept=".dwg,.dxf,.pdf"
                onChange={handleFileUpload}
              />
              <div className="border-2 border-dashed border-border/60 rounded-xl p-20 flex flex-col items-center justify-center gap-6 bg-muted/5 group-hover:bg-primary/5 group-hover:border-primary/40 transition-all duration-300">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Upload className="size-8" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-xl font-headline font-semibold">Drop Engineering Drawings</p>
                  <p className="text-sm text-muted-foreground">Select local files or network assets for compliance verification</p>
                </div>
                <div className="flex gap-4 pt-4">
                  <Badge variant="secondary" className="font-code text-[10px]">MAX_SIZE: 500MB</Badge>
                  <Badge variant="secondary" className="font-code text-[10px]">ENCRYPTION: AES-256</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-card/40 border-border/50 p-4 flex flex-col items-center gap-2">
                <FileType className="size-6 text-muted-foreground" />
                <span className="text-[10px] font-code font-bold uppercase">DWG Native</span>
              </Card>
              <Card className="bg-card/40 border-border/50 p-4 flex flex-col items-center gap-2">
                <Box className="size-6 text-muted-foreground" />
                <span className="text-[10px] font-code font-bold uppercase">DXF Interchange</span>
              </Card>
              <Card className="bg-card/40 border-border/50 p-4 flex flex-col items-center gap-2">
                <FileText className="size-6 text-muted-foreground" />
                <span className="text-[10px] font-code font-bold uppercase">Vector PDF</span>
              </Card>
            </div>
          </div>

          <div className="md:col-span-4 space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xs font-code uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck className="size-3 text-primary" /> Active Protocols
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "ISO 13567 Layering Standards",
                  "AIA CAD Layer Guidelines v3",
                  "Geometric Intersection Analysis",
                  "Line-weight Compliance (EN 1090)",
                  "Annotation Scale Verification"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-foreground/80">
                    <CheckCircle className="size-3 text-primary" />
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/20 border-border/50">
              <CardHeader className="py-3">
                <CardTitle className="text-[10px] font-code uppercase tracking-widest text-muted-foreground">System telemetry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-code">
                  <span className="text-muted-foreground">AUDIT_NODE</span>
                  <span className="text-primary">US-EAST-4</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-code">
                  <span className="text-muted-foreground">QUEUE_LATENCY</span>
                  <span className="text-foreground">0.4ms</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-code">
                  <span className="text-muted-foreground">ENGINE_STABILITY</span>
                  <span className="text-green-500">NOMINAL</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (state === "processing" || state === "uploading") {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-12 h-[calc(100vh-100px)] flex flex-col justify-center">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 text-primary animate-pulse mb-4">
            <Activity className="size-8" />
          </div>
          <h2 className="text-3xl font-headline font-bold uppercase tracking-tight">Guardian Engine Processing</h2>
          <p className="text-muted-foreground font-code text-sm">ACTIVE_AUDIT_ID: 0x{Math.random().toString(16).substr(2, 8).toUpperCase()}</p>
        </div>

        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-code text-muted-foreground uppercase">
              <span>Overall Integrity Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map((step, i) => (
              <div key={i} className={cn(
                "p-4 rounded-lg border transition-all duration-500 flex items-center gap-4",
                i === activeStep ? "bg-primary/5 border-primary shadow-[0_0_15px_rgba(59,130,246,0.1)]" :
                i < activeStep ? "bg-muted/10 border-border/50 opacity-60" :
                "bg-muted/5 border-border/20 opacity-30"
              )}>
                <div className={cn(
                  "size-8 rounded flex items-center justify-center",
                  i === activeStep ? "bg-primary text-primary-foreground animate-spin-slow" :
                  i < activeStep ? "bg-muted text-foreground" :
                  "bg-muted/50 text-muted-foreground"
                )}>
                  {i < activeStep ? <CheckCircle className="size-4" /> : <step.icon className="size-4" />}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest">{step.label}</span>
                  <span className="text-[9px] font-code text-muted-foreground">{step.code}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black/60 rounded-lg border border-border/50 p-6 font-code text-[11px] h-48 overflow-hidden relative">
          <div className="space-y-1 animate-in slide-in-from-bottom-2 duration-500">
            <p className="text-muted-foreground">[14:22:01] Ingestion started: {fileName}</p>
            <p className="text-muted-foreground">[14:22:02] Geometric primitive count: 142,094</p>
            <p className={cn("text-primary", activeStep >= 1 ? "opacity-100" : "opacity-0")}>[14:22:04] AIA Compliance Mapping initiated...</p>
            <p className={cn("text-warning", activeStep >= 2 ? "opacity-100" : "opacity-0")}>[14:22:06] WARNING: Non-standard scale detected in Viewport 4</p>
            <p className={cn("text-primary", activeStep >= 3 ? "opacity-100" : "opacity-0")}>[14:22:08] Annotation styles validated against ISO-13567</p>
            <p className={cn("text-destructive", activeStep >= 4 ? "opacity-100" : "opacity-0")}>[14:22:10] CRITICAL: Overlapping block definitions found in model space</p>
            <p className={cn("text-green-500", activeStep >= 5 ? "opacity-100" : "opacity-0")}>[14:22:12] Report compilation successful. Finalizing telemetry...</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/50 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="size-5 text-primary" />
            <h1 className="text-2xl font-headline font-bold uppercase tracking-tight">Audit Analysis: {fileName}</h1>
          </div>
          <p className="text-xs text-muted-foreground font-code uppercase tracking-widest">
            SESSION: 0x{Math.random().toString(16).substr(2, 6).toUpperCase()} // COMPLIANCE_MODE: STRICT
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-8 text-[10px] font-code uppercase" onClick={() => setState("idle")}>
            New Audit
          </Button>
          <Button className="h-8 text-[10px] font-code uppercase">
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <HealthScore score={results?.issues ? Math.max(0, 100 - (results.issues.length * 5)) : 92} />
          
          <Card className="bg-card/40 border-border/50">
            <CardHeader className="py-3">
              <CardTitle className="text-[10px] font-code uppercase tracking-widest text-muted-foreground">Violation Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded bg-destructive/10 border border-destructive/20">
                  <p className="text-2xl font-bold text-destructive">{results?.issues.filter(i => i.severity === 'Critical' || i.severity === 'High').length || 0}</p>
                  <p className="text-[9px] font-code uppercase text-destructive font-bold">Critical</p>
                </div>
                <div className="p-3 rounded bg-warning/10 border border-warning/20">
                  <p className="text-2xl font-bold text-warning">{results?.issues.filter(i => i.severity === 'Medium').length || 0}</p>
                  <p className="text-[9px] font-code uppercase text-warning font-bold">Major</p>
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-[10px] font-code">
                  <span className="text-muted-foreground">STANDARDS_COVERAGE</span>
                  <span className="text-foreground">98.2%</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-code">
                  <span className="text-muted-foreground">GEOMETRY_INTEGRITY</span>
                  <span className="text-foreground">94.4%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <TechnicalViewport />
          
          <Card className="bg-card/40 border-border/50 overflow-hidden">
            <CardHeader className="py-3 border-b border-border/50 bg-muted/20">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xs font-code uppercase tracking-widest flex items-center gap-2">
                  <Terminal className="size-3" /> Audit Findings
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-[9px] h-4 px-1">ISO-13567</Badge>
                  <Badge variant="outline" className="text-[9px] h-4 px-1">AIA-V3</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <div className="divide-y divide-border/50">
                  {results?.issues.map((issue, idx) => (
                    <div key={idx} className="p-4 hover:bg-muted/5 transition-colors group">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {getSeverityIcon(issue.severity)}
                            <span className="font-headline font-bold text-sm uppercase tracking-tight">{issue.category}</span>
                            <Badge variant="secondary" className="text-[9px] font-code h-3.5 px-1">{issue.severity}</Badge>
                          </div>
                          <p className="text-xs text-foreground/80 leading-relaxed">{issue.description}</p>
                          {issue.suggestedRemediation && (
                            <div className="mt-3 p-2 rounded bg-primary/5 border border-primary/10 text-[10px] font-code text-primary-foreground/70">
                              <span className="font-bold mr-2 text-primary">FIX:</span>
                              {issue.suggestedRemediation}
                            </div>
                          )}
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-card/40 border-border/50 h-full">
            <CardHeader className="py-3 border-b border-border/50">
              <CardTitle className="text-[10px] font-code uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                <Box className="size-3" /> Revision Stream
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="relative pl-6 border-l border-border/50">
                  <div className="absolute -left-[5px] top-0 size-2 rounded-full bg-primary" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase">Current Audit</p>
                    <p className="text-[9px] text-muted-foreground font-code">Today, 14:22:12</p>
                  </div>
                </div>
                <div className="relative pl-6 border-l border-border/50">
                  <div className="absolute -left-[5px] top-0 size-2 rounded-full bg-muted-foreground/30" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground">Prior Version (v1.0.3)</p>
                    <p className="text-[9px] text-muted-foreground font-code">Yesterday, 09:15:44</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 rounded bg-primary/5 border border-primary/10">
                <h4 className="text-[10px] font-bold uppercase mb-2">AI Remediation Agent</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">Guardian AI has identified 3 bulk fixes that can resolve 80% of current compliance violations.</p>
                <Button className="w-full mt-4 h-8 text-[10px] font-code uppercase gap-2">
                  <Sparkles className="size-3" /> Execute Remediation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
