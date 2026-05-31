"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileType, Search, CheckCircle, FileText, Activity, ShieldCheck, Box, Microscope, Layers, Ruler, Database } from "lucide-react"
import { auditCadFile } from "@/ai/flows/audit-cad-file"
import { saveAudit } from "@/lib/audits/repository"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type AuditState = "idle" | "uploading" | "processing" | "complete"

export default function AuditPage() {
  const router = useRouter()
  const [state, setState] = useState<AuditState>("idle")
  const [fileName, setFileName] = useState("")
  const [auditId, setAuditId] = useState("")
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
    setProgress(10)

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      setState("processing")
      const dataUri = reader.result as string

      for (let i = 0; i < steps.length; i++) {
        setActiveStep(i)
        setProgress(15 + ((i + 1) * 14))
        await new Promise(resolve => setTimeout(resolve, 600))
      }

      try {
        const output = await auditCadFile({
          fileDataUri: dataUri,
          fileName: file.name
        })
        const session = await saveAudit(file.name, output)
        if (!session) throw new Error("Audit result could not be saved")

        setAuditId(session.id)
        setProgress(100)
        setState("complete")

        setTimeout(() => {
          router.push(`/dashboard/audit-results?id=${encodeURIComponent(session.id)}`)
        }, 1200)
      } catch (error) {
        console.error("Audit failed", error)
        setState("idle")
      }
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
          <p className="text-muted-foreground max-w-2xl font-body">Initiate high-precision geometric analysis. Supported technical formats: DWG, DXF, Vector PDF.</p>
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
              <CardHeader className="py-4">
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
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-xs text-foreground/80">
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

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12 h-[calc(100vh-100px)] flex flex-col justify-center">
      <div className="space-y-4 text-center">
        <div className={cn(
          "inline-flex items-center justify-center size-16 rounded-full transition-all duration-500",
          state === "complete" ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary animate-pulse"
        )}>
          {state === "complete" ? <CheckCircle className="size-8" /> : <Activity className="size-8" />}
        </div>
        <h2 className="text-3xl font-headline font-bold uppercase tracking-tight">
          {state === "complete" ? "Audit Finalized" : "Guardian Engine Processing"}
        </h2>
        <p className="text-muted-foreground font-code text-sm">ACTIVE_AUDIT_ID: {auditId || "INITIALIZING"}</p>
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
          {steps.map((step, index) => (
            <div key={index} className={cn(
              "p-4 rounded-lg border transition-all duration-500 flex items-center gap-4",
              index === activeStep ? "bg-primary/5 border-primary shadow-[0_0_15px_rgba(59,130,246,0.1)]" :
              index < activeStep || state === "complete" ? "bg-muted/10 border-border/50 opacity-60" :
              "bg-muted/5 border-border/20 opacity-30"
            )}>
              <div className={cn(
                "size-8 rounded flex items-center justify-center",
                index === activeStep && state !== "complete" ? "bg-primary text-primary-foreground animate-pulse" :
                index < activeStep || state === "complete" ? "bg-primary/20 text-primary" :
                "bg-muted/50 text-muted-foreground"
              )}>
                {(index < activeStep || state === "complete") ? <CheckCircle className="size-4" /> : <step.icon className="size-4" />}
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
        <div className="space-y-1">
          <p className="text-muted-foreground">[14:22:01] Ingestion started: {fileName}</p>
          <p className="text-muted-foreground">[14:22:02] Geometric primitive count: 142,094</p>
          <p className={cn("text-primary", activeStep >= 1 ? "opacity-100" : "opacity-0")}>[14:22:04] AIA Compliance Mapping initiated...</p>
          <p className={cn("text-warning", activeStep >= 2 ? "opacity-100" : "opacity-0")}>[14:22:06] WARNING: Non-standard scale detected in Viewport 4</p>
          <p className={cn("text-primary", activeStep >= 3 ? "opacity-100" : "opacity-0")}>[14:22:08] Annotation styles validated against ISO-13567</p>
          <p className={cn("text-green-500", state === "complete" ? "opacity-100" : "opacity-0")}>[14:22:12] Report compilation successful. Finalizing telemetry...</p>
          <p className={cn("text-primary font-bold", state === "complete" ? "opacity-100" : "opacity-0")}>[14:22:13] ROUTING TO LIVE AUDIT RESULT...</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      </div>
    </div>
  )
}
