import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  ShieldCheck, Zap, Activity, ArrowRight, Layers, Database, 
  Cpu, Network, Server, Microscope, 
  Terminal, History, LayoutDashboard, ChevronRight, Upload,
  FileCode, CheckCircle2, Globe, Lock, FileText, BarChart3,
  Building2, Search, Ruler, Box, MicroscopeIcon
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { HealthScore } from "@/components/cad/health-score"
import { AuditConsole } from "@/components/cad/audit-console"
import { TechnicalViewport } from "@/components/cad/technical-viewport"
import { AuditTimeline } from "@/components/cad/audit-timeline"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30 bg-[#080808]">
      {/* Infrastructure Grade Navigation */}
      <nav className="flex items-center justify-between p-4 px-6 max-w-[1600px] mx-auto w-full border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded bg-primary flex items-center justify-center text-primary-foreground font-headline font-bold text-xl shadow-lg shadow-primary/20">
            DG
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-headline font-bold text-lg tracking-tight uppercase">Guardian AI</span>
            <span className="text-[9px] font-code text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Globe className="size-2 text-primary" /> Global Engineering Infrastructure
            </span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/pricing" className="text-[10px] font-code uppercase font-bold text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
            <Link href="#capabilities" className="text-[10px] font-code uppercase font-bold text-muted-foreground hover:text-primary transition-colors">Capabilities</Link>
            <Link href="#infrastructure" className="text-[10px] font-code uppercase font-bold text-muted-foreground hover:text-primary transition-colors">Infrastructure</Link>
          </div>
          <div className="h-6 w-px bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[10px] font-code uppercase font-bold text-muted-foreground hover:text-primary transition-colors">Enterprise Login</Link>
            <Button asChild size="sm" className="rounded-none h-9 px-6 font-code text-[10px] uppercase shadow-lg shadow-primary/20 border border-primary/20">
              <Link href="/login">Launch Demo Terminal</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Public Landing Gateway: Hero Section */}
        <section className="relative pt-32 pb-24 px-6 text-center max-w-6xl mx-auto space-y-8">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 size-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="flex justify-center relative z-10">
            <Badge variant="outline" className="font-code py-1 px-4 border-primary/30 text-primary bg-primary/10 text-[10px] uppercase tracking-[0.3em] backdrop-blur-md">
              Regulatory Engine v4.0.2 Stable // Active Node: US-EAST-4
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter text-balance leading-[0.85] uppercase relative z-10">
            Engineering <span className="text-primary">Intelligence</span> At Infrastructure Scale.
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body font-light leading-relaxed relative z-10">
            Mission-critical geometric reasoning and automated compliance enforcement for global infrastructure assets. 
            Trusted by elite architectural and civil engineering firms for automated QA.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 relative z-10">
            <Button asChild size="lg" className="h-14 rounded-none px-10 font-headline uppercase font-bold tracking-tight shadow-2xl shadow-primary/20 border border-primary/40 group">
              <Link href="/login" className="flex items-center">
                Launch Public Demo <ArrowRight className="ml-3 size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 rounded-none px-10 font-headline uppercase font-bold tracking-tight border-white/10 hover:bg-primary/5 bg-black/40 backdrop-blur-sm">
              <Link href="/pricing">Request Enterprise Access</Link>
            </Button>
          </div>

          {/* Real-time Processing Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-16 border-t border-white/5 relative z-10">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] font-code text-muted-foreground uppercase tracking-widest">Audits Finalized</span>
              <span className="text-2xl font-headline font-bold">14.2M+</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] font-code text-muted-foreground uppercase tracking-widest">Compliance Score</span>
              <span className="text-2xl font-headline font-bold text-primary">99.4%</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] font-code text-muted-foreground uppercase tracking-widest">Processing Node</span>
              <span className="text-2xl font-headline font-bold flex items-center gap-2">
                <Globe className="size-4 text-primary" /> US_EAST
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[9px] font-code text-muted-foreground uppercase tracking-widest">System Latency</span>
              <span className="text-2xl font-headline font-bold text-green-500">0.82ms</span>
            </div>
          </div>
        </section>

        {/* Feature Highlights: Workstation Interface Preview */}
        <section id="capabilities" className="py-24 border-y border-white/5 bg-muted/5 relative">
          <div className="max-w-[1500px] mx-auto px-6 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="space-y-2">
                <span className="text-[10px] font-code text-primary uppercase tracking-[0.3em] font-bold">MODULE_01 // ANALYSIS_WORKSTATION</span>
                <h2 className="text-4xl font-headline font-bold uppercase tracking-tight">Real-Time Compliance Workstation</h2>
                <p className="text-muted-foreground max-w-xl text-sm">Automated geometric scan engines verify drawings against ISO 13567 and AIA CAD Standards in sub-millisecond cycles.</p>
              </div>
              <Button variant="outline" className="h-10 text-[10px] font-code uppercase px-6 border-white/10 bg-black/40">
                Explore Workstation Capabilities <ChevronRight className="ml-2 size-3" />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Analysis Console & Viewport */}
              <div className="lg:col-span-8 space-y-6">
                <div className="relative rounded-lg border border-white/10 overflow-hidden shadow-2xl bg-[#0c0c0c]">
                  <div className="h-10 border-b border-white/10 bg-black/40 flex items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                      <Terminal className="size-3 text-primary" />
                      <span className="text-[10px] font-code uppercase font-bold tracking-widest text-muted-foreground">DEMO_SESSION_0x7E3F21A</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] font-code text-green-500 uppercase">System Nominal</span>
                    </div>
                  </div>
                  <TechnicalViewport />
                </div>
                <div className="h-[280px]">
                  <AuditConsole />
                </div>
              </div>

              {/* Integrity & Timeline */}
              <div className="lg:col-span-4 space-y-6">
                <HealthScore score={84} className="bg-card/40 border-primary/20 shadow-xl" />
                
                <Card className="bg-card/20 border-border/50 h-[380px] overflow-hidden flex flex-col">
                  <CardHeader className="py-3 border-b border-border/50 bg-muted/10">
                    <CardTitle className="text-[10px] font-code uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <History className="size-3" /> Audit Revision Pipeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-1 overflow-hidden">
                    <ScrollArea className="h-full p-4">
                      <AuditTimeline />
                    </ScrollArea>
                  </CardContent>
                </Card>

                <div className="p-6 rounded-lg border border-primary/20 bg-primary/5 space-y-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="size-5 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest font-headline">Enterprise QA Certification</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Guardian AI provides digitally signed audit packages verified against AIA-v3 and ISO-13567-2024 specifications for archival continuity.
                  </p>
                  <Button className="w-full h-9 text-[10px] font-code uppercase border border-primary/20 shadow-lg shadow-primary/20">
                    View Sample Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Infrastructure & Pipeline Section */}
        <section id="infrastructure" className="py-24 border-b border-white/5 bg-background relative overflow-hidden">
          <div className="max-w-[1500px] mx-auto px-6 space-y-16">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-[10px] font-code text-primary uppercase tracking-[0.3em] font-bold">INFRASTRUCTURE_LAYER // PIPELINE_EXECUTION</span>
              <h2 className="text-5xl font-headline font-bold uppercase tracking-tight">Compliance Pipeline Architecture</h2>
              <p className="text-muted-foreground text-lg font-light leading-relaxed">A distributed, high-throughput ingestion and analysis engine designed for massive architectural and infrastructure drawing packages.</p>
            </div>

            {/* Pipeline Visualization */}
            <div className="relative pt-12 pb-8">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
                {[
                  { label: "UPLOAD", icon: Upload, code: "SECURE_INGEST" },
                  { label: "GEOMETRY SCAN", icon: Microscope, code: "GEO_PRIMITIVE_V4" },
                  { label: "LAYER VALIDATION", icon: Layers, code: "AIA_ISO_MAPPING" },
                  { label: "STANDARDS ANALYSIS", icon: Ruler, code: "REGULATORY_2024" },
                  { label: "PLOT VERIFICATION", icon: Database, code: "LINEWEIGHT_READY" },
                  { label: "QA GENERATION", icon: FileText, code: "SECURE_RPT_V1" }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-4 group">
                    <div className="size-16 rounded bg-black/60 border border-white/10 flex items-center justify-center text-muted-foreground group-hover:border-primary/50 group-hover:bg-primary/5 group-hover:text-primary transition-all duration-300 shadow-xl">
                      <step.icon className="size-7" />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-xs font-bold uppercase tracking-widest">{step.label}</p>
                      <p className="text-[9px] font-code text-muted-foreground uppercase opacity-50">{step.code}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Credibility & Scale Layer */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ScaleCard 
                title="Global Node Network"
                value="12 Regions"
                icon={Globe}
                desc="Distributed processing nodes in US-EAST, EU-WEST, and AP-SOUTH for low-latency audit execution."
              />
              <ScaleCard 
                title="Audit Confidence"
                value="99.98%"
                icon={ShieldCheck}
                desc="Verified precision across 140+ individual drafting rules and geometric intersection patterns."
              />
              <ScaleCard 
                title="Throughput"
                value="1.4M Objects/s"
                icon={Zap}
                desc="High-performance geometric reasoning engine capable of scanning massive drawing sets in seconds."
              />
              <ScaleCard 
                title="Regulatory Coverage"
                value="Global Stds"
                icon={Ruler}
                desc="Native support for ISO, AIA, RIBA, and custom enterprise drafting and layering standards."
              />
            </div>
          </div>
        </section>

        {/* Final CTA: Demo Gateway */}
        <section className="py-32 px-6 bg-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -bottom-1/2" />
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <div className="flex justify-center">
              <div className="size-16 rounded bg-primary flex items-center justify-center text-primary-foreground font-headline font-bold text-3xl shadow-2xl shadow-primary/40">DG</div>
            </div>
            <h2 className="text-4xl md:text-6xl font-headline font-bold uppercase tracking-tight">Deploy Enterprise Compliance Today.</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body font-light">
              Join the elite engineering firms leveraging Guardian AI for automated drawing quality assurance and risk mitigation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="h-14 rounded-none px-12 font-headline uppercase font-bold tracking-tight shadow-xl shadow-primary/20">
                <Link href="/login">Launch Public Demo</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 rounded-none px-12 font-headline uppercase font-bold tracking-tight border-white/10 hover:bg-white/5">
                <Link href="/pricing">Request Sales Consultation</Link>
              </Button>
            </div>
            <p className="text-[10px] font-code text-muted-foreground uppercase tracking-widest pt-8">
              SECURE SESSION // AES-256-GCM // GLOBAL_ONBOARDING_V4
            </p>
          </div>
        </section>
      </main>

      {/* Enterprise Footer */}
      <footer className="p-16 px-6 border-t border-white/5 bg-background">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded bg-primary flex items-center justify-center text-primary-foreground font-headline font-bold text-xl">DG</div>
              <div className="flex flex-col">
                <span className="text-sm font-headline font-bold text-foreground tracking-tight uppercase">Guardian AI Systems</span>
                <span className="text-[9px] font-code text-muted-foreground uppercase tracking-widest">Compliance Operating System</span>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed uppercase font-code">
              Automated drawing quality assurance and geometric risk mitigation for global infrastructure engineering.
            </p>
          </div>
          <div className="space-y-6">
            <h5 className="text-[10px] font-code font-bold uppercase tracking-widest text-primary">Capabilities</h5>
            <div className="flex flex-col gap-3 text-[11px] font-code uppercase text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">Geometric Scan v4</Link>
              <Link href="#" className="hover:text-primary transition-colors">AIA Compliance</Link>
              <Link href="#" className="hover:text-primary transition-colors">ISO Layering</Link>
              <Link href="#" className="hover:text-primary transition-colors">Remediation AI</Link>
            </div>
          </div>
          <div className="space-y-6">
            <h5 className="text-[10px] font-code font-bold uppercase tracking-widest text-primary">Infrastructure</h5>
            <div className="flex flex-col gap-3 text-[11px] font-code uppercase text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">Processing Nodes</Link>
              <Link href="#" className="hover:text-primary transition-colors">Uptime Telemetry</Link>
              <Link href="#" className="hover:text-primary transition-colors">Security Hub</Link>
              <Link href="#" className="hover:text-primary transition-colors">Cloud Regions</Link>
            </div>
          </div>
          <div className="space-y-6">
            <h5 className="text-[10px] font-code font-bold uppercase tracking-widest text-primary">Enterprise</h5>
            <div className="flex flex-col gap-3 text-[11px] font-code uppercase text-muted-foreground">
              <Link href="/pricing" className="hover:text-primary transition-colors">Licensing Plans</Link>
              <Link href="#" className="hover:text-primary transition-colors">Consultancy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Case Studies</Link>
              <Link href="/login" className="hover:text-primary transition-colors">Demo Login</Link>
            </div>
          </div>
        </div>
        <div className="max-w-[1500px] mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-code text-muted-foreground uppercase tracking-widest">
          <div className="flex items-center gap-6">
            <span>© 2024 Guardian AI Systems Global</span>
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
              <span>Status: Nominal</span>
            </div>
          </div>
          <div className="flex gap-8">
            <span className="flex items-center gap-2"><Lock className="size-3" /> AES-256-GCM</span>
            <span className="flex items-center gap-2"><Building2 className="size-3" /> US-EAST-4</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ScaleCard({ title, value, icon: Icon, desc }: any) {
  return (
    <Card className="bg-card/40 border-white/5 hover:border-primary/30 transition-all group p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="size-10 rounded bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
          <Icon className="size-5" />
        </div>
        <span className="text-2xl font-headline font-bold text-foreground">{value}</span>
      </div>
      <div className="space-y-1">
        <h4 className="text-xs font-bold uppercase tracking-widest font-headline">{title}</h4>
        <p className="text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </Card>
  )
}
