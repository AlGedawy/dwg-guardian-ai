"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ShieldCheck, Lock, Globe, Key, ArrowRight, Building2, Cpu, Rocket, Monitor, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [demoLoading, setDemoLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate enterprise auth delay
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  }

  const launchDemo = () => {
    setDemoLoading(true)
    // Simulate high-performance session initialization
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #444 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Left Side: Enterprise Auth */}
        <Card className="bg-card/40 border-border/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="size-10 rounded bg-primary flex items-center justify-center text-primary-foreground font-headline font-bold text-xl shadow-lg shadow-primary/20">
                DG
              </div>
              <Badge variant="outline" className="text-[8px] font-code uppercase tracking-widest border-white/10">Enterprise Access</Badge>
            </div>
            <div className="space-y-1">
              <CardTitle className="text-xl font-headline font-bold uppercase tracking-tight">System Initialization</CardTitle>
              <CardDescription className="font-code text-[9px] uppercase tracking-widest">Establish secure session via AES-256-GCM</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-code uppercase text-muted-foreground ml-1">Work Email</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input type="email" placeholder="name@company.com" className="pl-10 h-11 bg-muted/20 border-white/10 text-sm font-code" required />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-code uppercase text-muted-foreground">Password</label>
                  <button type="button" className="text-[9px] font-code text-primary uppercase hover:underline">Forgot Access Key?</button>
                </div>
                <div className="relative">
                  <Key className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input type="password" placeholder="••••••••" className="pl-10 h-11 bg-muted/20 border-white/10 text-sm font-code" required />
                </div>
              </div>
              <Button type="submit" className="w-full h-11 font-headline uppercase font-bold tracking-tight text-sm gap-2" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Cpu className="size-4 animate-spin" /> Authenticating...
                  </>
                ) : (
                  <>
                    Initialize Session <ArrowRight className="size-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5" /></div>
              <div className="relative flex justify-center text-[9px] font-code uppercase"><span className="bg-[#121212] px-2 text-muted-foreground">SSO Provider Inbound</span></div>
            </div>

            <Button variant="outline" className="w-full h-11 bg-muted/10 border-white/5 hover:bg-white/5 font-code text-[10px] uppercase gap-2">
              <Building2 className="size-4" /> Enterprise SSO (OIDC)
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t border-white/5 pt-6">
            <div className="flex items-center justify-between w-full text-[10px] font-code text-muted-foreground uppercase">
              <span className="flex items-center gap-1"><Lock className="size-3 text-primary" /> SEC_PROTOCOL_V4</span>
              <span>NODE: US-EAST-4</span>
            </div>
          </CardFooter>
        </Card>

        {/* Right Side: Demo Access Gateway */}
        <div className="flex flex-col justify-center space-y-6 p-6">
          <div className="space-y-2">
            <Badge className="bg-primary/20 text-primary border-primary/30 uppercase text-[9px] font-code tracking-[0.2em] h-6 px-3">Public Sandbox Activated</Badge>
            <h2 className="text-3xl font-headline font-bold uppercase tracking-tight">Experience The <span className="text-primary">Intelligence</span> Layer.</h2>
            <p className="text-muted-foreground text-sm font-body leading-relaxed italic">
              "Access a pre-configured audit workspace with high-density engineering data. Experience real-time geometric reasoning without enterprise onboarding."
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-3">
              <div className="flex items-center gap-3">
                <Rocket className="size-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest font-headline">Demo Onboarding Modules</span>
              </div>
              <ul className="space-y-2">
                {["Airport Infrastructure V1", "Metro Grid Compliance", "ISO-13567 Validation"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[10px] font-code text-muted-foreground">
                    <CheckCircle2 className="size-3 text-primary" /> {item.toUpperCase()}
                  </li>
                ))}
              </ul>
              <Button onClick={launchDemo} disabled={demoLoading} className="w-full h-12 mt-2 gap-2 shadow-xl shadow-primary/20">
                {demoLoading ? <Cpu className="size-4 animate-spin" /> : <Monitor className="size-4" />}
                {demoLoading ? "Initializing Demo Workspace..." : "Launch Public Demo Dashboard"}
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-card/20 border border-white/5 space-y-2">
              <span className="text-[10px] font-code text-muted-foreground uppercase tracking-widest">Early Access Status</span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-headline uppercase">Waitlist Queue</span>
                <span className="text-xs font-code text-primary">0.4k Active</span>
              </div>
              <Progress value={84} className="h-1 bg-white/5" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Platform Version Footer */}
      <div className="fixed bottom-8 left-8">
        <Badge variant="outline" className="h-8 px-4 bg-black/40 text-muted-foreground border-white/10 font-code text-[10px] uppercase tracking-widest gap-2">
          <ShieldCheck className="size-3" /> Guardian AI // Stable Build v4.0.2
        </Badge>
      </div>
    </div>
  )
}