import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Zap, Activity, Grid3X3, ArrowRight } from "lucide-react"

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
        <section className="py-24 px-6 text-center max-w-4xl mx-auto space-y-8">
          <Badge variant="outline" className="font-code py-1 px-4 border-primary/30 text-primary bg-primary/5 mb-4">
            Next-Gen CAD Infrastructure
          </Badge>
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

        <section className="py-24 bg-card/20 border-y border-border/50">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
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

function Badge({ children, variant, className }: any) {
  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)}>
      {children}
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

import { cn } from "@/lib/utils"
