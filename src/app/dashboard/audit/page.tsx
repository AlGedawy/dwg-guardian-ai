"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Upload, FileType, Search, AlertCircle, AlertTriangle, Info, CheckCircle, Loader2 } from "lucide-react"
import { auditCadFile, type AuditCadFileOutput } from "@/ai/flows/audit-cad-file"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export default function AuditPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [results, setResults] = useState<AuditCadFileOutput | null>(null)
  const [fileName, setFileName] = useState("")

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setIsUploading(true)

    try {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        const dataUri = reader.result as string
        const output = await auditCadFile({
          fileDataUri: dataUri,
          fileName: file.name
        })
        setResults(output)
        setIsUploading(false)
      }
    } catch (error) {
      console.error("Audit failed", error)
      setIsUploading(false)
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

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Standard Auditor</h1>
        <p className="text-muted-foreground">Verify CAD drawing quality against international engineering standards.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-card/40 border-dashed border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Upload Drawing</CardTitle>
              <CardDescription>Support for DWG, DXF, and PDF</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative group">
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  accept=".dwg,.dxf,.pdf"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
                <div className="border border-border/50 rounded-lg p-12 flex flex-col items-center justify-center gap-4 bg-muted/5 group-hover:bg-primary/5 transition-colors">
                  {isUploading ? (
                    <Loader2 className="size-10 text-primary animate-spin" />
                  ) : (
                    <Upload className="size-10 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                  <div className="text-center">
                    <p className="font-medium">{isUploading ? "Analyzing Geometry..." : "Drop file or click to select"}</p>
                    <p className="text-xs text-muted-foreground mt-1">Maximum file size: 50MB</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/20 border-border/50">
            <CardHeader>
              <CardTitle className="text-sm font-code uppercase tracking-widest">Audit Scope</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                "Layer compliance (AIA/ISO)",
                "Geometric integrity check",
                "Annotation & Text verification",
                "Scale & Coordinate accuracy",
                "Plotting & Line-weight risks"
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="size-3 text-primary" />
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {results ? (
            <Card className="bg-card/40 overflow-hidden border-primary/30">
              <CardHeader className="bg-primary/5 border-b border-primary/20">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">{fileName}</CardTitle>
                    <CardDescription className="font-code text-xs">Analysis complete: {results.issues.length} detections found</CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-background">Audit-2023-V1</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  <div className="divide-y divide-border/50">
                    {results.issues.map((issue, idx) => (
                      <div key={idx} className="p-6 hover:bg-muted/5 transition-colors group">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {getSeverityIcon(issue.severity)}
                              <span className="font-headline font-semibold">{issue.category} Issue</span>
                              <Badge variant="secondary" className="text-[10px] font-code h-4 px-1">{issue.severity}</Badge>
                            </div>
                            <p className="text-sm text-foreground/80">{issue.description}</p>
                            {issue.suggestedRemediation && (
                              <div className="mt-4 p-3 rounded bg-primary/10 border border-primary/20 text-xs text-primary-foreground/90 font-code">
                                <span className="font-bold mr-2 uppercase">AI Logic:</span>
                                {issue.suggestedRemediation}
                              </div>
                            )}
                          </div>
                          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Search className="size-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full min-h-[400px] border border-border border-dashed rounded-lg flex flex-row items-center justify-center bg-muted/5 text-muted-foreground gap-4">
              <FileType className="size-12 opacity-20" />
              <div className="max-w-xs">
                <p className="font-medium text-foreground">Awaiting Input Stream</p>
                <p className="text-sm">Upload a CAD drawing to initiate the AI-driven structural audit process.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
