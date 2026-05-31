"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle, CheckCircle, FileText, ShieldCheck, Upload } from "lucide-react"
import { auditCadFile } from "@/ai/flows/audit-cad-file"
import { saveAudit } from "@/lib/audits/repository"
import { validateDrawingFile } from "@/lib/files/validation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type State = "idle" | "processing" | "complete"

export function UploadWorkspace() {
  const router = useRouter()
  const [state, setState] = useState<State>("idle")
  const [fileName, setFileName] = useState("")
  const [auditId, setAuditId] = useState("")
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState("")

  const handleFile = async (file: File) => {
    const validation = validateDrawingFile(file)
    if (!validation.valid) {
      setError(validation.error)
      return
    }

    setError("")
    setFileName(file.name)
    setState("processing")
    setProgress(10)

    try {
      const fileDataUri = await readFile(file)
      setProgress(35)
      const output = await auditCadFile({ fileName: file.name, fileDataUri })
      setProgress(75)
      const session = await saveAudit(file.name, output, file)
      if (!session) throw new Error("Audit result could not be saved")
      setAuditId(session.id)
      setProgress(100)
      setState("complete")
      router.push(`/dashboard/audit-results?id=${encodeURIComponent(session.id)}`)
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Audit processing failed")
      setState("idle")
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="space-y-2">
        <Badge variant="outline" className="font-code text-[10px] text-primary">UPLOAD_WORKSPACE</Badge>
        <h1 className="text-4xl font-headline font-bold uppercase">Drawing Audit Workspace</h1>
        <p className="text-muted-foreground">Upload DWG, DXF, or PDF files. DXF files use deterministic rules. Maximum file size: 20 MB.</p>
      </div>

      {error && <div className="flex gap-2 rounded border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive"><AlertTriangle className="size-4" />{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-8 bg-card/30 border-border/50">
          <CardContent className="p-0">
            <label className="block cursor-pointer">
              <input type="file" accept=".dwg,.dxf,.pdf" className="hidden" disabled={state === "processing"} onChange={event => { const file = event.target.files?.[0]; if (file) void handleFile(file) }} />
              <div className="min-h-[360px] flex flex-col items-center justify-center gap-4 border-2 border-dashed border-border/60 rounded-xl hover:bg-primary/5 transition-colors">
                {state === "complete" ? <CheckCircle className="size-14 text-primary" /> : <Upload className="size-14 text-primary" />}
                <div className="text-center">
                  <p className="text-xl font-headline font-semibold">{state === "processing" ? "Audit in progress" : "Select an engineering drawing"}</p>
                  <p className="text-sm text-muted-foreground mt-1">{fileName || "DWG, DXF, PDF"}</p>
                </div>
              </div>
            </label>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 bg-primary/5 border-primary/20">
          <CardHeader><CardTitle className="text-xs font-code uppercase tracking-widest flex items-center gap-2"><ShieldCheck className="size-4" /> Audit Pipeline</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p>1. Validate file payload</p>
            <p>2. Execute DXF deterministic rules or AI fallback</p>
            <p>3. Save audit result</p>
            <p>4. Upload authenticated files to cloud storage</p>
            <p>5. Generate report</p>
            <Button variant="outline" className="w-full mt-4" onClick={() => router.push('/dashboard/audit-history')}><FileText className="size-4 mr-2" /> Audit History</Button>
          </CardContent>
        </Card>
      </div>

      {state !== "idle" && <div className="space-y-2"><div className="flex justify-between text-xs font-code uppercase text-muted-foreground"><span>{auditId || "Preparing audit"}</span><span>{progress}%</span></div><Progress value={progress} /></div>}
    </div>
  )
}

function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error("The selected file could not be read"))
    reader.onload = () => resolve(reader.result as string)
    reader.readAsDataURL(file)
  })
}
