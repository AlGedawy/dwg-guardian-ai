import { HealthScore } from "@/components/cad/health-score"
import { AuditConsole } from "@/components/cad/audit-console"
import { TechnicalViewport } from "@/components/cad/technical-viewport"
import { AuditTimeline } from "@/components/cad/audit-timeline"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Activity, 
  ShieldCheck, 
  Database, 
  Layers, 
  GitBranch, 
  Box, 
  FileSearch,
  Server,
  Zap,
  Microscope,
  Terminal,
  ArrowUpRight,
  History
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1800px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/20 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary" />
            <h1 className="text-2xl font-headline font-bold uppercase tracking-tight">Engineering Intelligence Hub</h1>
          </div>
          <p className="text-xs text-muted-foreground font-code uppercase tracking-[0.2em]">
            WORKSPACE_INSTANCE: GLOBAL_OPS_CENTER // SESSION_TOKEN: 0x7E3F...
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end gap-1 mr-4">
            <span className="text-[9px] font-code text-muted-foreground uppercase">Sync Integrity</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className={cn("size-1.5 rounded-full", i < 5 ? "bg-primary" : "bg-primary/20")} />
              ))}
            </div>
          </div>
          <Button size="sm" className="h-8 font-code text-[10px] uppercase gap-2">
            <Zap className="size-3" /> Execute Global Audit
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Column 1: Core Health & Real-time Stats */}
        <div className="lg:col-span-3 space-y-6">
          <HealthScore score={84} />
          
          <Card className="bg-card/20 border-border/50">
            <CardHeader className="py-3 border-b border-border/20">
              <CardTitle className="text-[10px] font-code uppercase tracking-[0.2em] flex items-center gap-2 text-muted-foreground">
                <Activity className="size-3 text-primary" /> Real-time Telemetry
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <MetricRow label="Layers Verified" value="412" icon={Layers} />
              <MetricRow label="Geometric Violations" value="1,284" icon={Database} sub="Critical Cleanup Required" color="text-destructive" />
              <MetricRow label="Standards Compliance" value="98.2%" icon={GitBranch} />
              <MetricRow label="Annotation Drift" value="+0.04mm" icon={FileSearch} />
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <Zap className="size-16" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-code uppercase tracking-widest">Remediation Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">
                Guardian AI has identified 14 redundant block definitions that can be purged to reduce file size by 22%.
              </p>
              <Button variant="outline" className="w-full h-8 text-[9px] font-code uppercase gap-2 border-primary/20 hover:bg-primary/10">
                Bulk Resolve <ArrowUpRight className="size-3" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Column 2: Analysis Viewports */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative group">
            <TechnicalViewport />
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge className="bg-black/60 backdrop-blur-md border-white/10 font-code text-[9px]">VIEWPORT_04</Badge>
              <Badge className="bg-primary/20 text-primary border-primary/30 font-code text-[9px]">ISO_MODERN</Badge>
            </div>
          </div>
          
          <div className="h-[350px]">
            <AuditConsole />
          </div>
        </div>

        {/* Column 3: Pipeline & History */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-card/20 border-border/50 h-full flex flex-col">
            <CardHeader className="py-3 border-b border-border/20">
              <CardTitle className="text-[10px] font-code uppercase tracking-[0.2em] flex items-center gap-2">
                <History className="size-3" /> Revision Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pt-6">
              <AuditTimeline />
            </CardContent>
            <div className="p-4 border-t border-border/20 bg-muted/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-code text-muted-foreground uppercase">Infrastructure Status</span>
                <Badge variant="outline" className="text-[9px] font-code bg-green-500/10 text-green-500 border-green-500/20">NOMINAL</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 border border-border/50 rounded bg-black/20 text-center">
                  <p className="text-[8px] font-code text-muted-foreground uppercase">Memory</p>
                  <p className="text-xs font-bold font-code">4.2GB</p>
                </div>
                <div className="p-2 border border-border/50 rounded bg-black/20 text-center">
                  <p className="text-[8px] font-code text-muted-foreground uppercase">CPU</p>
                  <p className="text-xs font-bold font-code">12%</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function MetricRow({ label, value, icon: Icon, sub, color }: any) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="size-3 text-muted-foreground" />
          <span className="text-[10px] font-code uppercase tracking-tight text-muted-foreground">{label}</span>
        </div>
        <span className={cn("text-xs font-bold font-code", color || "text-foreground")}>{value}</span>
      </div>
      {sub && <p className="text-[8px] text-destructive uppercase font-bold animate-pulse">{sub}</p>}
      <div className="h-1 w-full bg-muted/30 rounded-full overflow-hidden">
        <div className={cn("h-full opacity-60", color ? "bg-destructive" : "bg-primary")} style={{ width: '70%' }} />
      </div>
    </div>
  )
}
