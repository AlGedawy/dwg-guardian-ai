"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Lock, Globe, Key, ArrowRight, Building2, Cpu } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate enterprise auth delay
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #444 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md bg-card/40 border-border/50 backdrop-blur-xl shadow-2xl relative z-10">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="size-12 rounded bg-primary flex items-center justify-center text-primary-foreground font-headline font-bold text-2xl shadow-lg shadow-primary/20">
              DG
            </div>
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-headline font-bold uppercase tracking-tight">Guardian Enterprise</CardTitle>
            <CardDescription className="font-code text-[10px] uppercase tracking-widest">Global Engineering Compliance OS</CardDescription>
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
            <div className="relative flex justify-center text-[9px] font-code uppercase"><span className="bg-[#121212] px-2 text-muted-foreground">Trusted Infrastructure</span></div>
          </div>

          <Button variant="outline" className="w-full h-11 bg-muted/10 border-white/5 hover:bg-white/5 font-code text-[10px] uppercase gap-2">
            <Building2 className="size-4" /> Enterprise SSO (OIDC/SAML)
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 border-t border-white/5 pt-6">
          <div className="flex items-center justify-between w-full text-[10px] font-code text-muted-foreground uppercase">
            <span className="flex items-center gap-1"><Lock className="size-3 text-primary" /> AES-256-GCM</span>
            <span>Node: US-EAST-4</span>
          </div>
          <p className="text-center text-[9px] text-muted-foreground leading-relaxed">
            By accessing this system, you agree to the <span className="text-foreground hover:underline cursor-pointer">Security Protocols</span> and <span className="text-foreground hover:underline cursor-pointer">Data Sovereignty Terms</span>.
          </p>
        </CardFooter>
      </Card>
      
      {/* Early Access Ribbon */}
      <div className="fixed bottom-8 right-8">
        <Badge variant="outline" className="h-8 px-4 bg-primary/5 text-primary border-primary/20 font-code text-[10px] uppercase tracking-widest gap-2">
          <ShieldCheck className="size-3" /> Early Access // v4.0.2 Stable
        </Badge>
      </div>
    </div>
  )
}
