"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Zap, ShieldCheck, Database, Globe, ArrowRight, Cpu, Microscope } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Standard Hub",
      id: "starter",
      price: "0",
      description: "For individual engineers and small project groups.",
      features: [
        "10 Automated Audits / Month",
        "2 Active Projects",
        "ISO 13567 Basic Compliance",
        "Community Support",
        "Standard Export (PDF)",
      ],
      cta: "Initialize Starter",
      popular: false
    },
    {
      name: "Enterprise Core",
      id: "pro",
      price: "199",
      description: "Full compliance suite for mid-size engineering firms.",
      features: [
        "Unlimited Automated Audits",
        "20 Active Projects",
        "All Global CAD Standards",
        "Priority Node Processing",
        "Team Role Management",
        "API Ingestion Access",
      ],
      cta: "Initialize Enterprise",
      popular: true
    },
    {
      name: "Infrastructure Global",
      id: "enterprise",
      price: "Custom",
      description: "Mission-critical deployment for global infra firms.",
      features: [
        "Unlimited Projects & Audits",
        "Dedicated Processing Nodes",
        "Custom Compliance Engines",
        "Audit Log Persistence (7Y)",
        "On-Premise Deployment Option",
        "24/7 Dedicated Ops Support",
      ],
      cta: "Request Demo",
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-[#080808] selection:bg-primary/30">
      <nav className="border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-50 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-headline font-bold">DG</div>
            <span className="font-headline font-bold uppercase tracking-tight">Guardian AI</span>
          </Link>
          <Button variant="ghost" className="font-code text-[10px] uppercase" asChild>
            <Link href="/login">Return to Terminal</Link>
          </Button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-20">
          <Badge variant="outline" className="font-code py-1 px-4 border-primary/30 text-primary bg-primary/5 uppercase tracking-[0.2em] text-[10px]">
            Enterprise Access Licensing
          </Badge>
          <h1 className="text-5xl md:text-6xl font-headline font-bold uppercase tracking-tight">Precision <span className="text-primary">Compliance</span> Scaling</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">Scale your engineering QA infrastructure from individual drawings to global asset portfolios.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.id} className={`relative flex flex-col bg-card/40 border-border/50 hover:border-primary/40 transition-all ${plan.popular ? 'border-primary/50 shadow-[0_0_40px_rgba(59,130,246,0.1)]' : ''}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-primary text-primary-foreground font-code text-[9px] px-3 uppercase tracking-widest">Recommended_Deploy</Badge>
                </div>
              )}
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-headline font-bold uppercase">{plan.name}</CardTitle>
                <CardDescription className="text-xs font-code uppercase tracking-widest">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-headline font-bold">{plan.price !== 'Custom' ? `$${plan.price}` : plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-muted-foreground text-sm font-code uppercase">/NODE/MO</span>}
                </div>
                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs">
                      <CheckCircle2 className="size-4 text-primary shrink-0" />
                      <span className="text-muted-foreground leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className={`w-full h-12 uppercase font-headline font-bold tracking-tight gap-2 ${!plan.popular ? 'variant-outline bg-white/5' : ''}`}>
                  {plan.cta} <ArrowRight className="size-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-t border-white/5">
          <div className="space-y-2">
            <Globe className="size-6 text-primary" />
            <h4 className="text-sm font-headline font-bold uppercase">Multi-Region Nodes</h4>
            <p className="text-[11px] text-muted-foreground">Audit your data close to your infrastructure with global node support.</p>
          </div>
          <div className="space-y-2">
            <ShieldCheck className="size-6 text-primary" />
            <h4 className="text-sm font-headline font-bold uppercase">ISO Certified QA</h4>
            <p className="text-[11px] text-muted-foreground">All compliance engines are verified against the latest 2024 standards.</p>
          </div>
          <div className="space-y-2">
            <Database className="size-6 text-primary" />
            <h4 className="text-sm font-headline font-bold uppercase">Sovereign Storage</h4>
            <p className="text-[11px] text-muted-foreground">Strict encryption-at-rest with custom key management options.</p>
          </div>
          <div className="space-y-2">
            <Cpu className="size-6 text-primary" />
            <h4 className="text-sm font-headline font-bold uppercase">AI Remediation</h4>
            <p className="text-[11px] text-muted-foreground">Automated fix suggestions powered by geometric LLM reasoning.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 p-12 bg-black/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-code uppercase tracking-widest text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>© 2024 Guardian Systems</span>
            <span>//</span>
            <span>All Nodes Operational</span>
          </div>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary">Compliance Terms</Link>
            <Link href="#" className="hover:text-primary">DPA</Link>
            <Link href="#" className="hover:text-primary">Security Hub</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
