import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Zap, Activity, Grid3X3, ArrowRight, Layers, Database, FileSearch, GitBranch, Box } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { HealthScore } from "@/components/cad/health-score"
import { AuditConsole } from "@/components/cad/audit-console"
import { TechnicalViewport } from "@/components/cad/technical-viewport"
import { AuditTimeline } from "@/components/cad/audit-timeline"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="size-10 rounded bg-primary flex items-center justify-center text-primary-foreground font-headline font-bold text-xl">
            DG
          </div>
          <span className="font-headline font-bold text-2xl tracking-tight">DWG Guardian AI</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">Enterprise Login</Link>
          <Button asChild className="rounded-full px-6">
            <Link href="/dashboard">Launch Workspace</Link>
          </Button>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section - Unchanged */}
        <section className="py-24 px-6 text-center max-w-4xl mx-auto space-y-8">
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="font-code py-1 px-4 border-primary/30 text-primary bg-primary/5">
              Next-Gen CAD Infrastructure
            </Badge>
          </div>
          <h1 className="text-6xl md:text-7xl font-headline font-bold tracking-tight text-balance leading-none">
            Automate Engineering <span className="text-primary italic">Compliance.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The industry's first reasoning-driven auditor for DWG, DXF, and PDF. Detect violations, score health, and remediate geometry with zero manual effort.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="h-14 px-8 text-lg font-headline">
              <Link href="/dashboard/audit">Get Started for Free <ArrowRight className="ml-2 size-5" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-headline border-primary/20 hover:bg-primary/5">
              Watch Demo
            </Button>
          </div>
        </section>

        {/* Live Engineering Audit System - High Density Technical Section */}
        <section className="py-24 border-t border-border/50 bg-muted/5">
          <div className="max-w-[1400px] mx-auto px-6 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border/50 pb-8">
              <div className="space-y-2">
                <Badge variant="secondary" className="font-code text-[10px] uppercase tracking-widest">Live Engineering Audit System</Badge>
                <h2 className="text-4xl font-headline font-bold uppercase tracking-tight">Mission Critical QA Hub</h2>
                <p className="text-muted-foreground max-w-lg">Real-time geometric inspection and international standard compliance monitoring for high-tier engineering projects.</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-code text-muted-foreground uppercase">
                <div className="flex items-center gap-1">
                  <div className="size-1.5 rounded-full bg-primary animate-pulse" /> SYSTEM_STREAMING
                </div>
                <div className="h-3 w-px bg-border" />
                <span>LATENCY: 14MS</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Health & Metrics */}
              <div className="lg:col-span-3 space-y-6">
                <HealthScore score={92} className="bg-card/50" />
                
                <Card className="bg-card/50 border-border/50">
                  <CardHeader className="py-3">
                    <CardTitle className="text-xs font-code uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                      <Activity className="size-3" /> Engineering Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-2">
                    <MetricRow label="Layers Audited" value="1,209" icon={Layers} progress={85} />
                    <MetricRow label="Duplicate entities" value="0" icon={Database} sub="Nominal - Clean" color="text-primary" progress={100} />
                    <MetricRow label="Anno Mismatches" value="14" icon={FileSearch} progress={15} />
                    <MetricRow label="Standards Coverage" value="99.8%" icon={GitBranch} progress={99} />
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

              {/* Right Column: Timeline & Revision History */}
              <div className="lg:col-span-3">
                <Card className="bg-card/50 border-border/50 h-full">
                  <CardHeader className="py-3 border-b border-border/50">
                    <CardTitle className="text-xs font-code uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                      <Box className="size-3" /> Enterprise QA Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <AuditTimeline />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Footer Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border/50">
              <InfoStat label="Compliance Engine" value="V4.0.2 REGULATORY" />
              <InfoStat label="Standards" value="ISO 13567 / AIA V3" />
              <InfoStat label="Processing Node" value="EDGE_CLUSTER_SGP" />
              <InfoStat label="Uptime" value="99.9999% OPERATIONAL" />
            </div>
          </div>
        </section>

        {/* Secondary Feature Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <FeatureCard 
              icon={ShieldCheck}
              title="Standard Auditor"
              description="AIA & ISO compliance checking using advanced geometry reasoning algorithms."
            />
            <FeatureCard 
              icon={Zap}
              title="Auto Remediation"
              description="Instantly suggest and apply fixes for layer violations and duplicate geometry."
            />
            <FeatureCard 
              icon={Activity}
              title="Health Scoring"
              description="0-100 technical scores derived from over 50+ drawing health metrics."
            />
            <FeatureCard 
              icon={Grid3X3}
              title="Project Vault"
              description="Secure, versioned storage for all your engineering assets and audit logs."
            />
          </div>
        </section>
      </main>

      <footer className="p-12 text-center text-sm text-muted-foreground border-t border-border/50 bg-background/50">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="size-6 rounded bg-primary/20 flex items-center justify-center text-primary font-headline font-bold text-xs">
            DG
          </div>
          <span className="font-headline font-bold text-foreground">Guardian AI</span>
        </div>
        <p>© 2024 DWG Guardian AI. All engineering standards reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }: any) {
  return (
    <div className="space-y-4">
      <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        <Icon className="size-6" />
      </div>
      <h3 className="text-xl font-headline font-bold">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function MetricRow({ label, value, icon: Icon, sub, color, progress }: any) {
  return (
    <div className="group transition-colors">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Icon className="size-3 text-muted-foreground" />
          <span className="text-[10px] font-code uppercase tracking-tight text-muted-foreground">{label}</span>
        </div>
        <span className={cn("text-xs font-bold font-code", color || "text-foreground")}>{value}</span>
      </div>
      {sub && <p className="text-[9px] text-primary uppercase font-bold">{sub}</p>}
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
      <span className="text-[9px] uppercase font-bold text-muted-foreground tracking-tighter">{label}</span>
      <span className="text-[11px] font-code text-foreground/80">{value}</span>
    </div>
  )
}
