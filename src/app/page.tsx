import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  ShieldCheck, Zap, Activity, Grid3X3, ArrowRight, Layers, Database, 
  FileSearch, GitBranch, Box, Cpu, Network, Server, Microscope, 
  Terminal, History, LayoutDashboard, ChevronRight, Upload, Search
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { HealthScore } from "@/components/cad/health-score"
import { AuditConsole } from "@/components/cad/audit-console"
import { TechnicalViewport } from "@/components/cad/technical-viewport"
import { AuditTimeline } from "@/components/cad/audit-timeline"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30">
      <nav className="flex items-center justify-between p-4 px-6 max-w-[1600px] mx-auto w-full border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-headline font-bold text-lg">
            DG
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-headline font-bold text-lg tracking-tight uppercase">DWG Guardian AI</span>
            <span className="text-[9px] font-code text-muted-foreground uppercase tracking-widest">Global Engineering Infrastructure</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-[10px] font-code uppercase font-bold text-muted-foreground hover:text-primary transition-colors">Auth Terminal</Link>
          <Button asChild size="sm" className="rounded-none h-8 px-4 font-code text-[10px] uppercase">
            <Link href="/dashboard">Launch Hub</Link>
          </Button>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center max-w-5xl mx-auto space-y-6">
          <div className="flex justify-center">
            <Badge variant="outline" className="font-code py-0.5 px-3 border-primary/30 text-primary bg-primary/5 text-[10px] uppercase tracking-widest">
              Regulatory Engine v4.0.2 Activated
            </Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter text-balance leading-[0.9] uppercase">
            Precision <span className="text-primary">Compliance</span> For Global Engineering.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body font-light">
            Infrastructure-grade geometric reasoning and automated standard enforcement for DWG, DXF, and PDF assets.
          </p>
          <div className="flex items-center justify-center gap-3 pt-4">
            <Button asChild size="lg" className="h-12 rounded-none px-8 font-headline uppercase font-bold tracking-tight">
              <Link href="/dashboard/audit">Initiate Audit <ArrowRight className="ml-2 size-4" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 rounded-none px-8 font-headline uppercase font-bold tracking-tight border-primary/20 hover:bg-primary/5">
              Documentation
            </Button>
          </div>
        </section>

        {/* Live Engineering Audit System */}
        <section className="py-20 border-t border-border/50 bg-muted/5">
          <div className="max-w-[1500px] mx-auto px-6 space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border/50 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-code text-primary uppercase tracking-[0.2em] font-bold">Live Engineering Stream</span>
                </div>
                <h2 className="text-3xl font-headline font-bold uppercase tracking-tight">Mission Critical QA Console</h2>
              </div>
              <div className="flex items-center gap-4 text-[9px] font-code text-muted-foreground uppercase">
                <div className="flex items-center gap-1 bg-muted/20 px-2 py-1 border border-border/50">
                  NODE: SG-AWS-01
                </div>
                <div className="flex items-center gap-1 bg-muted/20 px-2 py-1 border border-border/50">
                  LATENCY: 14.2MS
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-3 space-y-4">
                <HealthScore score={92} className="bg-card/40 border-primary/20" />
                
                <Card className="bg-card/20 border-border/50 shadow-none">
                  <CardHeader className="py-2 border-b border-border/50">
                    <CardTitle className="text-[10px] font-code uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                      <Activity className="size-3" /> System Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <MetricRow label="Layers Audited" value="1,209" icon={Layers} progress={85} />
                    <MetricRow label="Duplicate entities" value="0" icon={Database} sub="NOMINAL" color="text-primary" progress={100} />
                    <MetricRow label="Anno Mismatches" value="14" icon={FileSearch} progress={15} />
                    <MetricRow label="Standards Coverage" value="99.8%" icon={GitBranch} progress={99} />
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <TechnicalViewport />
                <div className="h-[250px]">
                  <AuditConsole />
                </div>
              </div>

              <div className="lg:col-span-3">
                <Card className="bg-card/20 border-border/50 h-full shadow-none">
                  <CardHeader className="py-2 border-b border-border/50">
                    <CardTitle className="text-[10px] font-code uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                      <History className="size-3" /> Revision Pipeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <AuditTimeline />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Processing Pipeline Visualization */}
        <section className="py-16 border-t border-border/50 bg-card">
          <div className="max-w-[1500px] mx-auto px-6">
            <div className="text-center mb-10 space-y-2">
              <span className="text-[10px] font-code uppercase text-primary tracking-widest font-bold">Execution Sequence</span>
              <h2 className="text-2xl font-headline font-bold uppercase tracking-tight">Guardian Processing Pipeline</h2>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 max-w-5xl mx-auto overflow-x-auto pb-4">
              <PipelineStep icon={Upload} label="INGESTION" status="ACTIVE" code="PKG_001" />
              <PipelineDivider />
              <PipelineStep icon={Microscope} label="GEOMETRY SCAN" status="READY" code="GEO_V4" />
              <PipelineDivider />
              <PipelineStep icon={Layers} label="LAYER VALIDATION" status="READY" code="AIA_ISO" />
              <PipelineDivider />
              <PipelineStep icon={ShieldCheck} label="STANDARDS ANALYSIS" status="PENDING" code="REGS_2024" />
              <PipelineDivider />
              <PipelineStep icon={Search} label="PLOT VERIFICATION" status="PENDING" code="PLT_ENG" />
              <PipelineDivider />
              <PipelineStep icon={Terminal} label="REPORT GEN" status="PENDING" code="PDF_AUD" />
            </div>
          </div>
        </section>

        {/* Engineering Capability Grid */}
        <section className="py-20 px-6 border-t border-border/50 bg-muted/5">
          <div className="max-w-[1500px] mx-auto space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <CapabilityCard 
                icon={ShieldCheck}
                title="Geometric Integrity"
                metric="99.9%"
                status="VERIFIED"
                compliance="ISO 10303"
                description="Advanced intersection and boundary analysis ensuring zero geometric leakage."
                severity={0}
              />
              <CapabilityCard 
                icon={Zap}
                title="Automated Remediation"
                metric="12ms"
                status="ACCEL"
                compliance="EN 1090"
                description="Instant fix suggestions for standard layer violations and orphaned entities."
                severity={2}
              />
              <CapabilityCard 
                icon={Network}
                title="Infrastructure Sync"
                metric="SYNCED"
                status="ACTIVE"
                compliance="FEDRAMP"
                description="Distributed node processing for massive asset libraries across global clusters."
                severity={0}
              />
              <CapabilityCard 
                icon={Cpu}
                title="Reasoning Engine"
                metric="V4.2"
                status="STABLE"
                compliance="AIA V3"
                description="Deep learning models trained on millions of technical engineering drawings."
                severity={1}
              />
            </div>

            {/* Infrastructure Status Layer */}
            <div className="border border-border/50 bg-black/40 p-6 rounded-lg font-code">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-8">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-muted-foreground uppercase font-bold mb-1">Audit Node Cluster</span>
                    <div className="flex items-center gap-2">
                      <Server className="size-3 text-primary" />
                      <span className="text-xs font-bold text-foreground">US-EAST-ALPHA-4</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-muted-foreground uppercase font-bold mb-1">Guardian Engine</span>
                    <div className="flex items-center gap-2">
                      <LayoutDashboard className="size-3 text-primary" />
                      <span className="text-xs font-bold text-foreground text-primary">OPERATIONAL</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-muted-foreground uppercase font-bold mb-1">Session ID</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-foreground/60">AUD-0x4f2A11</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-[9px] text-muted-foreground uppercase font-bold block mb-1">Queue Load</span>
                    <div className="flex items-center gap-2 justify-end">
                      <div className="h-1 w-20 bg-muted/40 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[24%]" />
                      </div>
                      <span className="text-[10px] font-bold">24%</span>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-border/50" />
                  <div className="text-right">
                    <span className="text-[9px] text-muted-foreground uppercase font-bold block mb-1">System Uptime</span>
                    <span className="text-xs font-bold text-foreground">99.9999%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="p-8 px-6 border-t border-border/50 bg-background">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="size-6 rounded bg-primary/20 flex items-center justify-center text-primary font-headline font-bold text-xs">
              DG
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-headline font-bold text-foreground tracking-tight uppercase">Guardian AI</span>
              <span className="text-[8px] font-code text-muted-foreground uppercase">Compliance OS v4.0.2</span>
            </div>
          </div>
          <div className="flex gap-8 text-[9px] font-code text-muted-foreground uppercase font-bold">
            <Link href="#" className="hover:text-primary transition-colors">Infrastructure</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy Terminal</Link>
            <Link href="#" className="hover:text-primary transition-colors">API Console</Link>
          </div>
          <p className="text-[9px] font-code text-muted-foreground uppercase">© 2024 DWG Guardian AI Global</p>
        </div>
      </footer>
    </div>
  )
}

function PipelineStep({ icon: Icon, label, status, code }: { icon: any, label: string, status: string, code: string }) {
  return (
    <div className="flex flex-col items-center text-center group min-w-[120px]">
      <div className={cn(
        "size-10 rounded-lg flex items-center justify-center border transition-all duration-500 mb-2",
        status === "ACTIVE" ? "bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(59,130,246,0.2)]" :
        status === "READY" ? "bg-muted/10 border-border text-foreground/80" :
        "bg-muted/5 border-border/30 text-muted-foreground/40"
      )}>
        <Icon className="size-5" />
      </div>
      <span className={cn("text-[9px] font-bold uppercase tracking-widest", status === "ACTIVE" ? "text-primary" : "text-muted-foreground")}>{label}</span>
      <span className="text-[8px] font-code text-muted-foreground/60 mt-1">{code}</span>
    </div>
  )
}

function PipelineDivider() {
  return (
    <div className="hidden md:flex items-center h-10 w-8 px-1">
      <div className="w-full h-px bg-border/50 relative">
        <ChevronRight className="absolute -right-2 -top-2 size-4 text-border/50" />
      </div>
    </div>
  )
}

function CapabilityCard({ icon: Icon, title, description, metric, status, compliance, severity }: any) {
  return (
    <Card className="bg-card/40 border-border/50 hover:border-primary/40 transition-all group shadow-none overflow-hidden relative">
      <div className={cn(
        "absolute top-0 left-0 w-1 h-full",
        severity === 2 ? "bg-warning" : severity === 1 ? "bg-primary/40" : "bg-primary"
      )} />
      <CardHeader className="py-4 space-y-3">
        <div className="flex justify-between items-start">
          <div className="size-8 rounded bg-primary/10 flex items-center justify-center text-primary">
            <Icon className="size-4" />
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold font-code text-primary block">{metric}</span>
            <span className="text-[8px] font-code text-muted-foreground uppercase">{status}</span>
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-headline font-bold uppercase tracking-tight text-foreground/90">{title}</h3>
          <p className="text-[11px] text-muted-foreground leading-relaxed font-body">{description}</p>
        </div>
      </CardHeader>
      <CardContent className="py-2 border-t border-border/50 bg-muted/5 flex items-center justify-between">
        <span className="text-[9px] font-code font-bold uppercase text-muted-foreground">Compliance:</span>
        <Badge variant="outline" className="text-[8px] font-code h-4 px-1.5 border-primary/20 text-primary">{compliance}</Badge>
      </CardContent>
    </Card>
  )
}

function MetricRow({ label, value, icon: Icon, sub, color, progress }: any) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Icon className="size-3 text-muted-foreground" />
          <span className="text-[9px] font-code uppercase tracking-tight text-muted-foreground font-bold">{label}</span>
        </div>
        <span className={cn("text-[10px] font-bold font-code", color || "text-foreground")}>{value}</span>
      </div>
      {sub && <p className="text-[8px] text-primary uppercase font-bold tracking-tighter">{sub}</p>}
      <div className="h-1 w-full bg-muted/40 rounded-full overflow-hidden mt-1.5">
        <div 
          className="h-full bg-primary/40 transition-all duration-1000" 
          style={{ width: `${progress || 0}%` }} 
        />
      </div>
    </div>
  )
}

function InfoStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[8px] uppercase font-bold text-muted-foreground tracking-tighter">{label}</span>
      <span className="text-[10px] font-code text-foreground/80">{value}</span>
    </div>
  )
}
