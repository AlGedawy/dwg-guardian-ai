import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  ShieldCheck, Zap, Activity, Grid3X3, ArrowRight, Layers, Database, 
  FileSearch, GitBranch, Box, Cpu, Network, Server, Microscope, 
  Terminal, History, LayoutDashboard, ChevronRight, Upload, Search,
  Download, Share2, Printer, Filter, MoreHorizontal, FileCode, Clock,
  CheckCircle2, AlertTriangle, AlertCircle, Info, Library, BarChart3,
  ExternalLink, MousePointer2, Ruler, Maximize2, Globe, Lock, FileText
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { HealthScore } from "@/components/cad/health-score"
import { AuditConsole } from "@/components/cad/audit-console"
import { TechnicalViewport } from "@/components/cad/technical-viewport"
import { AuditTimeline } from "@/components/cad/audit-timeline"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30 bg-[#080808]">
      <nav className="flex items-center justify-between p-4 px-6 max-w-[1600px] mx-auto w-full border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-headline font-bold text-lg">
            DG
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-headline font-bold text-lg tracking-tight uppercase">Guardian AI</span>
            <span className="text-[9px] font-code text-muted-foreground uppercase tracking-widest">Global Engineering Infrastructure</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/pricing" className="text-[10px] font-code uppercase font-bold text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
          <Link href="/login" className="text-[10px] font-code uppercase font-bold text-muted-foreground hover:text-primary transition-colors">Enterprise Login</Link>
          <Button asChild size="sm" className="rounded-none h-8 px-4 font-code text-[10px] uppercase shadow-lg shadow-primary/20">
            <Link href="/login">Launch Terminal</Link>
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
            <Button asChild size="lg" className="h-12 rounded-none px-8 font-headline uppercase font-bold tracking-tight shadow-xl shadow-primary/10">
              <Link href="/login">Initialize Audit <ArrowRight className="ml-2 size-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-none px-8 font-headline uppercase font-bold tracking-tight border-primary/20 hover:bg-primary/5">
              <Link href="/pricing">View Enterprise Plans</Link>
            </Button>
          </div>
        </section>

        {/* Mission Critical QA Hub Section */}
        <section className="py-16 border-t border-border/50 bg-muted/5">
          <div className="max-w-[1500px] mx-auto px-6 space-y-8">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-code text-primary uppercase tracking-[0.2em] font-bold">MODULE_01 // LIVE_ENGINEERING_AUDIT_SYSTEM</span>
              <h2 className="text-3xl font-headline font-bold uppercase tracking-tight">Real-Time Compliance Workstation</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Health & Metrics */}
              <div className="lg:col-span-3 space-y-4">
                <HealthScore score={79} className="bg-card/40 border-primary/20" />
                <Card className="bg-card/20 border-border/50">
                  <CardHeader className="py-2 border-b border-border/50">
                    <CardTitle className="text-[10px] font-code uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Activity className="size-3" /> Integrity Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-code">
                        <span>CRITICAL_VIOLATIONS</span>
                        <span className="text-destructive font-bold">12</span>
                      </div>
                      <Progress value={45} className="h-1 bg-muted/20" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-code">
                        <span>GEOMETRIC_INTEGRITY</span>
                        <span className="text-primary font-bold">94%</span>
                      </div>
                      <Progress value={94} className="h-1 bg-muted/20" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-code">
                        <span>PLOTTING_READINESS</span>
                        <span className="text-warning font-bold">82%</span>
                      </div>
                      <Progress value={82} className="h-1 bg-muted/20" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Center: Viewport & Console */}
              <div className="lg:col-span-6 space-y-4">
                <TechnicalViewport />
                <div className="h-[250px]">
                  <AuditConsole />
                </div>
              </div>

              {/* Right: Timeline */}
              <div className="lg:col-span-3">
                <Card className="bg-card/20 border-border/50 h-full overflow-hidden">
                  <CardHeader className="py-2 border-b border-border/50 bg-muted/10">
                    <CardTitle className="text-[10px] font-code uppercase tracking-widest text-muted-foreground">Revision Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[500px]">
                      <div className="p-4">
                        <AuditTimeline />
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Infrastructure & Pipeline Section */}
        <section className="py-16 border-t border-border/50 bg-background">
          <div className="max-w-[1500px] mx-auto px-6 space-y-12">
            <div className="flex items-end justify-between border-b border-border/50 pb-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-code text-primary uppercase tracking-[0.2em] font-bold">INFRASTRUCTURE_LAYER // CAPABILITY_GRID</span>
                <h2 className="text-3xl font-headline font-bold uppercase tracking-tight">Compliance OS Infrastructure</h2>
              </div>
              <div className="hidden lg:flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-[8px] font-code text-muted-foreground uppercase">Global Cluster Status</span>
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-code font-bold uppercase">Nominal // US-EAST-4</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pipeline Visualization */}
            <div className="relative pt-12 pb-8">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 -translate-y-1/2" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
                {[
                  { label: "UPLOAD", icon: Upload, code: "INGEST" },
                  { label: "GEOMETRY SCAN", icon: Microscope, code: "GEO_V4" },
                  { label: "LAYER VALIDATION", icon: Layers, code: "AIA_ISO" },
                  { label: "STANDARDS ANALYSIS", icon: Ruler, code: "REG_2024" },
                  { label: "PLOT VERIFICATION", icon: Database, code: "PLT_READY" },
                  { label: "QA GENERATION", icon: FileText, code: "RPT_V1" }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div className="size-12 rounded bg-black/40 border border-white/5 flex items-center justify-center text-muted-foreground group hover:border-primary/40 transition-colors">
                      <step.icon className="size-5 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest">{step.label}</p>
                      <p className="text-[8px] font-code text-muted-foreground">{step.code}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Capability Detail Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-card/40 border-border/50 hover:border-primary/30 transition-all overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity"><Database className="size-16" /></div>
                <CardHeader className="py-4">
                  <CardTitle className="text-xs font-code uppercase tracking-widest text-primary">01 // Asset Vault</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[11px] text-muted-foreground leading-relaxed">Centralized infrastructure for DWG/DXF/PDF asset persistence with 7-year audit log retention.</p>
                  <div className="flex justify-between items-center text-[9px] font-code">
                    <span className="text-muted-foreground">STORAGE_UTIL</span>
                    <span className="text-foreground font-bold">42.4%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/40 border-border/50 hover:border-primary/30 transition-all overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity"><ShieldCheck className="size-16" /></div>
                <CardHeader className="py-4">
                  <CardTitle className="text-xs font-code uppercase tracking-widest text-primary">02 // Strict Compliance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[11px] text-muted-foreground leading-relaxed">Automated mapping to AIA v3, ISO 13567, and custom enterprise drafting standards.</p>
                  <div className="flex justify-between items-center text-[9px] font-code">
                    <span className="text-muted-foreground">ENGINE_CONFIDENCE</span>
                    <span className="text-green-500 font-bold">99.4%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/40 border-border/50 hover:border-primary/30 transition-all overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity"><Zap className="size-16" /></div>
                <CardHeader className="py-4">
                  <CardTitle className="text-xs font-code uppercase tracking-widest text-primary">03 // Remediation Agent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[11px] text-muted-foreground leading-relaxed">AI-driven repair suggestions for geometric overlaps and layer naming inconsistencies.</p>
                  <div className="flex justify-between items-center text-[9px] font-code">
                    <span className="text-muted-foreground">AUTO_FIX_RATE</span>
                    <span className="text-primary font-bold">84.2%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/40 border-border/50 hover:border-primary/30 transition-all overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity"><Terminal className="size-16" /></div>
                <CardHeader className="py-4">
                  <CardTitle className="text-xs font-code uppercase tracking-widest text-primary">04 // Node Telemetry</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[11px] text-muted-foreground leading-relaxed">Real-time processing metrics and audit session tracking across distributed cluster nodes.</p>
                  <div className="flex justify-between items-center text-[9px] font-code">
                    <span className="text-muted-foreground">QUEUE_LATENCY</span>
                    <span className="text-foreground font-bold">0.82ms</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="p-12 px-6 border-t border-border/50 bg-background">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-headline font-bold text-lg">DG</div>
              <div className="flex flex-col">
                <span className="text-xs font-headline font-bold text-foreground tracking-tight uppercase">Guardian AI</span>
                <span className="text-[8px] font-code text-muted-foreground uppercase">Global Compliance OS</span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed uppercase font-code">Infrastructure-grade geometric reasoning and automated standard enforcement for mission-critical drawings.</p>
          </div>
          <div className="space-y-4">
            <h5 className="text-[10px] font-code font-bold uppercase tracking-widest text-primary">Infrastructure</h5>
            <div className="flex flex-col gap-2 text-[10px] font-code uppercase text-muted-foreground">
              <Link href="#" className="hover:text-primary">Global Nodes</Link>
              <Link href="#" className="hover:text-primary">Compliance Registry</Link>
              <Link href="#" className="hover:text-primary">Security Protocols</Link>
            </div>
          </div>
          <div className="space-y-4">
            <h5 className="text-[10px] font-code font-bold uppercase tracking-widest text-primary">Compliance</h5>
            <div className="flex flex-col gap-2 text-[10px] font-code uppercase text-muted-foreground">
              <Link href="#" className="hover:text-primary">ISO Standards</Link>
              <Link href="#" className="hover:text-primary">AIA Mapping</Link>
              <Link href="#" className="hover:text-primary">Regulatory Hub</Link>
            </div>
          </div>
          <div className="space-y-4">
            <h5 className="text-[10px] font-code font-bold uppercase tracking-widest text-primary">Resources</h5>
            <div className="flex flex-col gap-2 text-[10px] font-code uppercase text-muted-foreground">
              <Link href="/pricing" className="hover:text-primary">Enterprise Plans</Link>
              <Link href="#" className="hover:text-primary">API Documentation</Link>
              <Link href="/login" className="hover:text-primary">Audit Terminal</Link>
            </div>
          </div>
        </div>
        <div className="max-w-[1500px] mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-code text-muted-foreground uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <span>© 2024 DWG Guardian AI Global</span>
            <div className="flex items-center gap-2">
              <div className="size-1.5 rounded-full bg-green-500" />
              <span>Status: Nominal</span>
            </div>
          </div>
          <div className="flex gap-6">
            <span>SEC_PROTO: AES-256-GCM</span>
            <span>NODE_ID: US-EAST-4</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
