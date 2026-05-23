import { HealthScore } from "@/components/cad/health-score"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, FileWarning, Layers, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const recentAudits = [
    { id: "A-2023-001", file: "Floor_Plan_L1.dwg", score: 94, status: "Healthy" },
    { id: "A-2023-002", file: "HVAC_Layout_Final.dwg", score: 62, status: "Critical" },
    { id: "A-2023-003", file: "Structural_Details.pdf", score: 81, status: "Warning" },
  ]

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-headline font-bold">Systems Overview</h1>
          <p className="text-muted-foreground mt-2">Real-time CAD standard compliance monitoring.</p>
        </div>
        <Badge variant="outline" className="font-code py-1 px-3 border-primary/30 text-primary">
          Build v1.0.4-stable
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HealthScore score={79} className="md:col-span-1" />
        
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="bg-card/40 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-code uppercase tracking-widest text-muted-foreground">Violation Index</CardTitle>
              <AlertCircle className="size-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-headline font-bold">14</div>
              <p className="text-xs text-muted-foreground mt-1">High severity issues detected across project</p>
              <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
                <div className="h-full bg-destructive w-[65%]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-code uppercase tracking-widest text-muted-foreground">Optimizations</CardTitle>
              <CheckCircle2 className="size-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-headline font-bold">128</div>
              <p className="text-xs text-muted-foreground mt-1">Ready for automated remediation</p>
              <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
                <div className="h-full bg-primary w-[40%]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-code uppercase tracking-widest text-muted-foreground">Active Layers</CardTitle>
              <Layers className="size-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-headline font-bold">42</div>
              <p className="text-xs text-muted-foreground mt-1">Layers non-compliant with AIA standards</p>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-code uppercase tracking-widest text-muted-foreground">Storage Used</CardTitle>
              <FileWarning className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-headline font-bold">2.4 GB</div>
              <p className="text-xs text-muted-foreground mt-1">Version history takes 40% of space</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-headline font-bold">Recent Audit Stream</h3>
          <Link href="/dashboard/history" className="text-sm font-code text-primary flex items-center gap-1 hover:underline">
            View full history <ArrowRight className="size-3" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {recentAudits.map((audit) => (
            <div 
              key={audit.id} 
              className="flex items-center justify-between p-4 bg-card/20 border border-border/50 rounded-lg hover:border-primary/50 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "size-10 rounded-full flex items-center justify-center",
                  audit.score > 90 ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                )}>
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <div className="font-medium group-hover:text-primary transition-colors">{audit.file}</div>
                  <div className="text-xs font-code text-muted-foreground">{audit.id} • 2 hours ago</div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="text-xs font-code text-muted-foreground">Compliance</div>
                  <div className={cn("font-bold", audit.score > 90 ? "text-primary" : "text-warning")}>
                    {audit.score}%
                  </div>
                </div>
                <Badge variant={audit.status === "Healthy" ? "default" : "destructive"}>
                  {audit.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
