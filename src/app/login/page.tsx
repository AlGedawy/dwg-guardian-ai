"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Lock, Globe, Key, ArrowRight, Cpu, Rocket, Monitor, CheckCircle2, AlertCircle, UserPlus } from "lucide-react"
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase/client"

const DEMO_MODE_KEY = "dwg-guardian:demo-mode"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [demoLoading, setDemoLoading] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const auth = getFirebaseAuth()
      if (!auth) throw new Error("Firebase authentication is not configured yet. Use Demo Mode or add the Vercel environment variables.")

      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }

      window.localStorage.removeItem(DEMO_MODE_KEY)
      router.push('/dashboard')
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  const launchDemo = () => {
    setDemoLoading(true)
    window.localStorage.setItem(DEMO_MODE_KEY, "true")
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #444 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <Card className="bg-card/40 border-border/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="size-10 rounded bg-primary flex items-center justify-center text-primary-foreground font-headline font-bold text-xl shadow-lg shadow-primary/20">DG</div>
              <Badge variant="outline" className="text-[8px] font-code uppercase tracking-widest border-white/10">Secure Access</Badge>
            </div>
            <div className="space-y-1">
              <CardTitle className="text-xl font-headline font-bold uppercase tracking-tight">{isRegistering ? "Create Workspace Account" : "Workspace Login"}</CardTitle>
              <CardDescription className="font-code text-[9px] uppercase tracking-widest">Firebase Authentication</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-code uppercase text-muted-foreground ml-1">Work Email</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input value={email} onChange={event => setEmail(event.target.value)} type="email" placeholder="name@company.com" className="pl-10 h-11 bg-muted/20 border-white/10 text-sm font-code" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-code uppercase text-muted-foreground ml-1">Password</label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder="Minimum 6 characters" className="pl-10 h-11 bg-muted/20 border-white/10 text-sm font-code" minLength={6} required />
                </div>
              </div>
              {error && <div className="flex items-start gap-2 rounded border border-destructive/20 bg-destructive/5 p-3 text-xs text-destructive"><AlertCircle className="size-4 shrink-0" /><span>{error}</span></div>}
              <Button type="submit" className="w-full h-11 font-headline uppercase font-bold tracking-tight text-sm gap-2" disabled={isLoading}>
                {isLoading ? <><Cpu className="size-4 animate-spin" /> Authenticating...</> : isRegistering ? <><UserPlus className="size-4" /> Create Account</> : <>Sign In <ArrowRight className="size-4" /></>}
              </Button>
            </form>
            <Button type="button" variant="ghost" className="w-full text-xs" onClick={() => setIsRegistering(value => !value)}>
              {isRegistering ? "Already have an account? Sign in" : "Need an account? Register"}
            </Button>
            {!isFirebaseConfigured() && <p className="text-[10px] font-code text-warning uppercase">Cloud authentication is not configured. Demo Mode remains available.</p>}
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t border-white/5 pt-6 text-[10px] font-code text-muted-foreground uppercase">
            <span className="flex items-center gap-1"><Lock className="size-3 text-primary" /> Protected Session</span>
            <span>Firebase Auth</span>
          </CardFooter>
        </Card>

        <div className="flex flex-col justify-center space-y-6 p-6">
          <div className="space-y-2">
            <Badge className="bg-primary/20 text-primary border-primary/30 uppercase text-[9px] font-code tracking-[0.2em] h-6 px-3">Public Demo Mode</Badge>
            <h2 className="text-3xl font-headline font-bold uppercase tracking-tight">Explore The <span className="text-primary">Audit</span> Workspace.</h2>
            <p className="text-muted-foreground text-sm font-body leading-relaxed">Launch a browser-local sandbox. Demo data and local audits remain separate from authenticated cloud workspaces.</p>
          </div>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-3">
            <div className="flex items-center gap-3"><Rocket className="size-5 text-primary" /><span className="text-xs font-bold uppercase tracking-widest font-headline">Demo Capabilities</span></div>
            <ul className="space-y-2">
              {["Upload workspace", "Local audit history", "Printable QA reports"].map(item => <li key={item} className="flex items-center gap-2 text-[10px] font-code text-muted-foreground"><CheckCircle2 className="size-3 text-primary" /> {item.toUpperCase()}</li>)}
            </ul>
            <Button onClick={launchDemo} disabled={demoLoading} className="w-full h-12 mt-2 gap-2 shadow-xl shadow-primary/20">
              {demoLoading ? <Cpu className="size-4 animate-spin" /> : <Monitor className="size-4" />}
              {demoLoading ? "Opening Demo..." : "Launch Demo Workspace"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
