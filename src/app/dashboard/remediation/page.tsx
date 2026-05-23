"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Zap, ShieldCheck, CheckSquare, Trash2, ArrowUpRight, Loader2, Sparkles, CheckCircle2 } from "lucide-react"
import { suggestCadRemediations, type SuggestCadRemediationsOutput } from "@/ai/flows/suggest-cad-remediations"
import { Badge } from "@/components/ui/badge"

export default function RemediationPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [suggestions, setSuggestions] = useState<SuggestCadRemediationsOutput | null>(null)

  // Initial issues based on user-provided findings
  const initialIssues = [
    { 
      id: "1", 
      type: "incorrect_layer" as const, 
      description: "Layer A-ANNO-TEXT violates ISO standard", 
      severity: "critical" as const, 
      context: "Layer naming convention or property assignment does not match the mandatory ISO 13567 drafting standards." 
    },
    { 
      id: "2", 
      type: "duplicate_geometry" as const, 
      description: "Duplicate geometry detected: 1,284 entities", 
      severity: "high" as const, 
      context: "A significant volume of overlapping lines and circles found in the block definitions, potentially causing plotting errors." 
    },
    { 
      id: "3", 
      type: "scale_violation" as const, 
      description: "Plotting scale mismatch in viewport V-04", 
      severity: "low" as const,
      context: "Viewport scale is set to a non-standard 1:47.3; recommended standard is 1:50 or 1:100."
    }
  ]

  const runRemediation = async () => {
    setIsProcessing(true)
    try {
      const output = await suggestCadRemediations({ cadIssues: initialIssues })
      setSuggestions(output)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Automated Remediation</h1>
          <p className="text-muted-foreground">Rule-driven AI agents suggesting precise CAD fixes.</p>
        </div>
        <Button onClick={runRemediation} disabled={isProcessing} className="gap-2 px-6 h-12 shadow-lg shadow-primary/20">
          {isProcessing ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
          Generate Fix Suggestions
        </Button>
      </div>

      {!suggestions ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="bg-card/40 border-border/50">
              <CardHeader>
                <CardTitle className="text-sm font-code uppercase tracking-widest">Active Violations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {initialIssues.map(issue => (
                  <div key={issue.id} className="p-4 rounded-lg bg-muted/20 border border-border/50 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={issue.severity === "critical" ? "destructive" : issue.severity === "high" ? "destructive" : "outline"} className="text-[10px] font-code h-4 px-1">
                          {issue.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs font-code text-muted-foreground uppercase">{issue.type.replace('_', ' ')}</span>
                      </div>
                      <p className="text-sm font-medium">{issue.description}</p>
                      {issue.context && <p className="text-xs text-muted-foreground mt-1">{issue.context}</p>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-code uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 className="size-3 text-primary" /> Verified Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary">PASS</Badge>
                  <span>Annotation compliance validated</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 border border-dashed border-border rounded-lg bg-muted/5 h-fit">
            <Zap className="size-12 text-primary/20" />
            <div className="space-y-2">
              <h3 className="text-lg font-headline font-semibold">Engine Ready</h3>
              <p className="text-sm text-muted-foreground max-w-[250px]">Select an audit result or project to generate automated cleanup instructions.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestions.remediationSuggestions.map((suggestion, idx) => (
              <Card key={idx} className="bg-card/40 border-primary/20 hover:border-primary/50 transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <Badge variant="outline" className="font-code">{suggestion.priority.toUpperCase()} PRIORITY</Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><CheckSquare className="size-4 text-primary" /></Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-headline font-bold text-lg mb-1">{suggestion.suggestedAction}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{suggestion.rationale}</p>
                  </div>
                  
                  {suggestion.exampleCommand && (
                    <div className="p-3 rounded-md bg-muted/40 font-code text-[11px] text-primary border border-primary/10 overflow-x-auto whitespace-pre">
                      {suggestion.exampleCommand}
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 gap-1">Apply Fix <ArrowUpRight className="size-3" /></Button>
                    <Button size="sm" variant="outline" className="gap-1"><Trash2 className="size-3" /> Ignore</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="bg-primary/5 border-primary/20 p-8 text-center">
            <h3 className="text-xl font-headline font-bold mb-2 text-primary">Bulk Remediate All Issues?</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-lg mx-auto">This will apply all "critical" and "high" priority fixes across the entire project structure using the Guardian engine.</p>
            <Button size="lg" className="px-10 h-12 shadow-xl shadow-primary/30">
              Execute Mass Cleanup
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}
