"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Cpu, Globe, SignalHigh, Database, Terminal, Server, Zap, BarChart3, Clock } from "lucide-react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { cn } from "@/lib/utils"

export default function SystemStatusPage() {
  const telemetryData = [
    { time: '14:20', latency: 12, load: 42 },
    { time: '14:21', latency: 14, load: 45 },
    { time: '14:22', latency: 11, load: 38 },
    { time: '14:23', latency: 18, load: 52 },
    { time: '14:24', latency: 14, load: 44 },
    { time: '14:25', latency: 12, load: 40 },
    { time: '14:26', latency: 13, load: 41 },
  ]

  const nodes = [
    { id: "US-EAST-INFRA-04", status: "Nominal", latency: "14ms", load: "12%", uptime: "99.999%" },
    { id: "US-WEST-INFRA-01", status: "Nominal", latency: "18ms", load: "8%", uptime: "99.998%" },
    { id: "EU-WEST-INFRA-09", status: "Active", latency: "42ms", load: "24%", uptime: "99.992%" },
    { id: "AP-SOUTH-INFRA-02", status: "Nominal", latency: "22ms", load: "15%", uptime: "99.997%" },
  ]

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Globe className="size-5 text-primary" />
            <Badge variant="outline" className="font-code text-[10px] border-primary/20 text-primary uppercase">Infrastructure Health Cluster</Badge>
          </div>
          <h1 className="text-4xl font-headline font-bold uppercase tracking-tight">System Telemetry</h1>
          <p className="text-muted-foreground font-body">Real-time infrastructure monitoring and geo-spatial node performance.</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] font-code text-muted-foreground uppercase">Global Uptime</span>
          <span className="text-2xl font-headline font-bold text-green-500">99.9997%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Real-time Charts */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="bg-card/40 border-border/50">
            <CardHeader className="py-4 border-b border-white/5 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-code uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <BarChart3 className="size-3 text-primary" /> Node Latency (ms)
              </CardTitle>
              <Badge variant="outline" className="text-[9px] font-code border-primary/20 text-primary">LIVE_STREAM</Badge>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={telemetryData}>
                    <defs>
                      <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted)/0.2)" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: 'hsl(var(--muted-foreground))'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: 'hsl(var(--muted-foreground))'}} />
                    <Tooltip contentStyle={{backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', fontSize: '10px'}} />
                    <Area type="monotone" dataKey="latency" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorLatency)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50">
            <CardHeader className="py-4 border-b border-white/5">
              <CardTitle className="text-xs font-code uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Server className="size-3 text-primary" /> Distributed Infrastructure Registry
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {nodes.map((node, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "size-2 rounded-full",
                        node.status === "Nominal" ? "bg-green-500 animate-pulse" : "bg-primary"
                      )} />
                      <div>
                        <p className="text-xs font-bold font-code uppercase tracking-tight">{node.id}</p>
                        <p className="text-[9px] font-code text-muted-foreground uppercase">{node.status} // LATENCY: {node.latency}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-[9px] font-code text-muted-foreground uppercase">Engine Load</p>
                        <p className="text-xs font-bold font-code">{node.load}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-code text-muted-foreground uppercase">Cluster Uptime</p>
                        <p className="text-xs font-bold font-code">{node.uptime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Status */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="py-4">
              <CardTitle className="text-xs font-code uppercase tracking-widest flex items-center gap-2 text-primary">
                <Terminal className="size-3" /> System Logs
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-black/60 p-4 font-code text-[10px] space-y-1 h-64 overflow-hidden">
                <p className="text-muted-foreground">[14:22:01] <span className="text-primary">INFO</span> :: Node synchronizing with global registry...</p>
                <p className="text-muted-foreground">[14:22:04] <span className="text-green-500">PASS</span> :: Heartbeat confirmed for AP-SOUTH-INFRA-02</p>
                <p className="text-muted-foreground">[14:22:08] <span className="text-warning">WARN</span> :: Latency spike detected on EU-WEST-INFRA-09 (42ms)</p>
                <p className="text-muted-foreground">[14:22:15] <span className="text-primary">INFO</span> :: Purging session cache for expired tokens...</p>
                <p className="text-muted-foreground">[14:22:22] <span className="text-primary">INFO</span> :: Audit engine updated to v4.2.0_STABLE</p>
                <p className="text-muted-foreground">[14:22:30] <span className="text-green-500">INFO</span> :: System nominal.</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card/20 border-border/50 p-4 space-y-2">
              <Database className="size-4 text-primary" />
              <div>
                <p className="text-[9px] font-code text-muted-foreground uppercase">Storage Use</p>
                <p className="text-sm font-bold font-code">4.2 TB</p>
              </div>
            </Card>
            <Card className="bg-card/20 border-border/50 p-4 space-y-2">
              <Zap className="size-4 text-warning" />
              <div>
                <p className="text-[9px] font-code text-muted-foreground uppercase">API Req/s</p>
                <p className="text-sm font-bold font-code">142</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
