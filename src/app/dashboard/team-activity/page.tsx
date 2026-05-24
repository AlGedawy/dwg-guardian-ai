"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Activity, ShieldCheck, MessageSquare, CheckCircle2, Clock, MoreVertical, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

export default function TeamActivityPage() {
  const activities = [
    { user: "SYS_ADMIN_42", action: "Approved Compliance Pass", target: "T3_TERMINAL_EXPANSION", time: "2m ago", type: "approval" },
    { user: "ARCH_INFRA_B", action: "Uploaded Revision v2.4", target: "METRO_LINE_PHASE_1", time: "14m ago", type: "upload" },
    { user: "AGENT_GEO_V4", action: "Remediated Duplicate Geometry", target: "DOWNTOWN_HUB", time: "42m ago", type: "system" },
    { user: "SYS_AUDITOR", action: "Flagged Critical Standard Violation", target: "CITY_STADIUM", time: "1h ago", type: "flag" },
  ]

  const team = [
    { name: "John Doe", role: "Lead Auditor", status: "Active", audits: 142, auth: "Level 4" },
    { name: "Sarah Smith", role: "QA Engineer", status: "In Scan", audits: 84, auth: "Level 3" },
    { name: "Mike Johnson", role: "Arch Infrastructure", status: "Review", audits: 215, auth: "Level 4" },
  ]

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="size-5 text-primary" />
            <Badge variant="outline" className="font-code text-[10px] border-primary/20 text-primary uppercase">Operational Continuity</Badge>
          </div>
          <h1 className="text-4xl font-headline font-bold uppercase tracking-tight">Team Operations</h1>
          <p className="text-muted-foreground font-body">Centralized monitoring of engineering workflows and remediation ownership.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Activity Stream */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="bg-card/40 border-border/50">
            <CardHeader className="py-4 border-b border-white/5">
              <CardTitle className="text-xs font-code uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Activity className="size-3 text-primary" /> Live Activity Stream
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {activities.map((item, i) => (
                  <div key={i} className="p-6 flex items-start justify-between hover:bg-white/5 transition-colors">
                    <div className="flex gap-4">
                      <div className="mt-1">
                        {item.type === "approval" ? <CheckCircle2 className="size-4 text-green-500" /> :
                         item.type === "flag" ? <ShieldCheck className="size-4 text-destructive" /> :
                         <Terminal className="size-4 text-primary" />}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          <span className="font-code text-[11px] font-bold text-primary uppercase">{item.user}</span>
                          <span className="mx-2 text-muted-foreground">{item.action}</span>
                          <span className="font-headline font-bold text-[11px] uppercase tracking-tight">{item.target}</span>
                        </p>
                        <div className="flex items-center gap-3 text-[10px] font-code text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="size-3" /> {item.time}</span>
                          <span>//</span>
                          <span className="uppercase">Auth_Success</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[8px] h-4 font-code uppercase border-white/10">Log_id_{i}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Members Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-card/20 border-border/50">
            <CardHeader className="py-3 border-b border-white/5">
              <CardTitle className="text-[10px] font-code uppercase tracking-widest text-muted-foreground">Active Personnel</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-6">
              {team.map((member, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-muted border border-white/10 flex items-center justify-center text-[10px] font-code">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-tight font-headline">{member.name}</p>
                      <p className="text-[9px] font-code text-muted-foreground uppercase">{member.role} // {member.auth}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className={cn(
                      "text-[8px] h-4 px-1.5 font-code uppercase",
                      member.status === "Active" ? "bg-green-500/5 text-green-500 border-green-500/20" : "bg-primary/5 text-primary border-primary/20"
                    )}>{member.status}</Badge>
                    <p className="text-[8px] font-code text-muted-foreground mt-1">{member.audits} AUDITS</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="py-3">
              <CardTitle className="text-[10px] font-code uppercase tracking-widest text-primary flex items-center gap-2">
                <MessageSquare className="size-3" /> Internal Comms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="p-3 rounded bg-black/40 border border-white/5 font-code text-[10px] space-y-2">
                <p className="text-muted-foreground uppercase font-bold text-[9px]">[14:22:01] ARCH_INFRA:</p>
                <p className="text-foreground italic">"Drawing package T3-E finalized. Moving to QA audit queue."</p>
              </div>
              <div className="p-3 rounded bg-black/40 border border-white/5 font-code text-[10px] space-y-2">
                <p className="text-primary uppercase font-bold text-[9px]">[14:24:14] SYS_ADMIN:</p>
                <p className="text-foreground italic">"Audit session initiated on US-EAST-4 node."</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
