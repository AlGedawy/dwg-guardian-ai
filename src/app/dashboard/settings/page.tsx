"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Settings, ShieldCheck, User, Building, Bell, Globe, Key, CreditCard, ChevronRight, Lock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-[1200px] mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Settings className="size-5 text-primary" />
            <Badge variant="outline" className="font-code text-[10px] border-primary/20 text-primary uppercase">Workspace Configuration</Badge>
          </div>
          <h1 className="text-4xl font-headline font-bold uppercase tracking-tight">Enterprise Settings</h1>
          <p className="text-muted-foreground font-body">Manage organization-wide compliance policies and security protocols.</p>
        </div>
        <Button className="gap-2 h-10 px-6 font-code text-xs uppercase shadow-lg shadow-primary/20">
          Save Global Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-1">
          <SettingsNavLink icon={Building} label="Organization" active />
          <SettingsNavLink icon={User} label="User Profile" />
          <SettingsNavLink icon={ShieldCheck} label="Security" />
          <SettingsNavLink icon={Bell} label="Notifications" />
          <SettingsNavLink icon={Globe} label="Region & Infrastructure" />
          <SettingsNavLink icon={Key} label="API Tokens" />
          <SettingsNavLink icon={CreditCard} label="Billing & Subscription" />
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-8">
          <Card className="bg-card/40 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold uppercase tracking-tight">Organization Profile</CardTitle>
              <CardDescription className="text-xs">Update your global engineering workspace identity.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-code uppercase text-muted-foreground">Organization Name</label>
                  <Input defaultValue="Global Infrastructure Partners" className="h-10 bg-muted/20 border-white/10 text-xs font-code" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-code uppercase text-muted-foreground">Admin Email</label>
                  <Input defaultValue="admin@global-infra.com" className="h-10 bg-muted/20 border-white/10 text-xs font-code" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-code uppercase text-muted-foreground">Workspace Region</label>
                <div className="h-10 w-full border border-white/10 bg-muted/20 rounded flex items-center px-3 text-xs font-code justify-between">
                  US-EAST-4 (Northern Virginia)
                  <Globe className="size-3 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold uppercase tracking-tight">Security Protocol</CardTitle>
              <CardDescription className="text-xs">Configure encryption and authentication requirements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded border border-primary/20 bg-primary/5">
                <div className="flex items-center gap-3">
                  <Lock className="size-5 text-primary" />
                  <div>
                    <p className="text-sm font-bold uppercase tracking-tight font-headline">Enterprise MFA</p>
                    <p className="text-[10px] font-code text-muted-foreground uppercase">Require Level 4 Auth for all auditors</p>
                  </div>
                </div>
                <Badge className="bg-primary/20 text-primary border-primary/30 uppercase text-[9px] font-code">Enabled</Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-xs font-medium">Session Inactivity Timeout</span>
                  <span className="text-xs font-code font-bold">15 MINUTES</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-xs font-medium">Data Retention Policy</span>
                  <span className="text-xs font-code font-bold">24 MONTHS</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-destructive/5 border-destructive/20">
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold uppercase tracking-tight text-destructive">Danger Zone</CardTitle>
              <CardDescription className="text-xs text-destructive/70">Irreversible cluster operations.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/10 text-[10px] font-code uppercase">
                Purge Organization Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function SettingsNavLink({ icon: Icon, label, active }: any) {
  return (
    <button className={cn(
      "w-full flex items-center justify-between px-4 py-3 rounded-md transition-colors",
      active ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
    )}>
      <div className="flex items-center gap-3">
        <Icon className={cn("size-4", active ? "text-primary" : "text-muted-foreground")} />
        <span className="text-xs font-code uppercase font-bold tracking-tight">{label}</span>
      </div>
      <ChevronRight className="size-3 opacity-50" />
    </button>
  )
}
