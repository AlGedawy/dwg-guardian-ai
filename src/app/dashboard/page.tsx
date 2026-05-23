import { HealthScore } from "@/components/cad/health-score"
import { AuditConsole } from "@/components/cad/audit-console"
import { TechnicalViewport } from "@/components/cad/technical-viewport"
import { AuditTimeline } from "@/components/cad/audit-timeline"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, ShieldCheck, Database, Layers, GitBranch, Box, FileSearch } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/50 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="size-5 text-primary" />
            <h1 className="text-2xl font-headline font-bold uppercase tracking-tight">Engineering Intelligence Hub</h1>
          </div>
          <p className="text-xs text-muted-foreground font-code uppercase tracking-widest">
            Workspace: GLOBAL_OPS_CENTER // Auth: LEVEL_4_ACCESS
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="font-code text-[10px] bg-primary/5 text-primary border-primary/20">
            PROD_v1.0.4_STABLE
          </Badge>
          <div className="flex gap-1">
            <div className="size-2 rounded-full bg-primary" />
            <div className="size-2 rounded-full bg-primary" />
            <div className="size-2 rounded-full bg-primary/20" />
          </div>
        </div>
      </div>

      {/* Main Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Health & Logs */}
        <div className="lg:col-span-3 space-y-6">
          <HealthScore score={79} />
          
          <Card className="bg-card/30 border-border/50">
            <CardHeader className="py-3">
              <CardTitle className="text-xs font-code uppercase tracking-widest flex items-center gap-2">
                <Activity className="size-3" /> System Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <MetricRow label="Layers Audited" value="412" icon={Layers} />
              <MetricRow label="Duplicate entities" value="1,284" icon={Database} sub="Critical Purge Required" color="text-destructive" />
              <MetricRow label="Anno Mismatches" value="14" icon={FileSearch} />
              <MetricRow label="Standards Coverage" value="98.2%" icon={GitBranch} />
            </CardContent>
          </Card>
        </div>

        {/* Center Column: Viewport & Console */}
        <div className="lg:col-span-6 space-y-6">
          <TechnicalViewport />
          <div className="h-[300px]">
            <AuditConsole />
          </div>
        </div>

        {/* Right Column: Timeline & Alerts */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-card/30 border-border/50 h-full">
            <CardHeader className="py-3 border-b border-border/50">
              <CardTitle className="text-xs font-code uppercase tracking-widest flex items-center gap-2">
                <Box className="size-3" /> Revision Stream
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <AuditTimeline />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Info-bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/50">
        <InfoStat label="Last Sync" value="14:22:42 UTC" />
        <InfoStat label="Processing Latency" value="14ms" />
        <InfoStat label="Guardian Engine" value="Active (V4)" />
        <InfoStat label="Compliance Mode" value="Strict ISO/AIA" />
      </div>
    </div>
  )
}

function MetricRow({ label, value, icon: Icon, sub, color }: any) {
  return (
    <div className="group transition-colors">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Icon className="size-3 text-muted-foreground" />
          <span className="text-[10px] font-code uppercase tracking-tight text-muted-foreground">{label}</span>
        </div>
        <span className={cn("text-xs font-bold font-code", color || "text-foreground")}>{value}</span>
      </div>
      {sub && <p className="text-[9px] text-destructive uppercase font-bold animate-pulse">{sub}</p>}
      <div className="h-1 w-full bg-muted/40 rounded-full overflow-hidden mt-1.5">
        <div className="h-full bg-primary/40 w-[60%]" />
      </div>
    </div>
  )
}

function InfoStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-tighter">{label}</span>
      <span className="text-[11px] font-code text-foreground/80">{value}</span>
    </div>
  )
}
