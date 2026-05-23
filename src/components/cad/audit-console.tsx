"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Terminal, AlertCircle, Info, Zap, Hash } from "lucide-react"
import { cn } from "@/lib/utils"

const logs = [
  { time: "14:22:01", type: "audit", msg: "Geometry intersection scan initiated on layer A-WALL-EXTR", sev: "info" },
  { time: "14:22:04", type: "warning", msg: "Scale mismatch detected in Viewport 04 [1:47.3 vs 1:50]", sev: "minor" },
  { time: "14:22:09", type: "error", msg: "CRITICAL: Layer A-ANNO-TEXT violates ISO-13567-2", sev: "critical" },
  { time: "14:22:12", type: "audit", msg: "Duplicate geometry purge: 1,284 entities identified", sev: "major" },
  { time: "14:22:15", type: "success", msg: "Validation complete: Coordinate system alignment nominal", sev: "info" },
  { time: "14:22:20", type: "warning", msg: "Unpurgeable block 'X_REF_OLD' detected in model space", sev: "minor" },
  { time: "14:22:25", type: "audit", msg: "Plotting readiness check: Line-weights inconsistent on Layer 0", sev: "major" },
]

export function AuditConsole() {
  return (
    <div className="flex flex-col h-full bg-black/40 border border-border/50 rounded-lg overflow-hidden font-code">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-muted/20">
        <div className="flex items-center gap-2">
          <Terminal className="size-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest">Live Audit Console</span>
        </div>
        <div className="flex gap-2">
          <div className="size-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] text-muted-foreground uppercase">Streaming</span>
        </div>
      </div>
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-3 py-1 px-2 hover:bg-primary/5 rounded group transition-colors">
              <span className="text-muted-foreground shrink-0 text-[10px] tabular-nums">{log.time}</span>
              <span className="shrink-0">
                {log.sev === "critical" ? <AlertCircle className="size-3 text-destructive" /> : 
                 log.sev === "major" ? <Zap className="size-3 text-warning" /> : 
                 <Hash className="size-3 text-muted-foreground" />}
              </span>
              <span className={cn(
                "text-[11px] leading-tight",
                log.sev === "critical" ? "text-destructive font-semibold" : 
                log.sev === "major" ? "text-warning" : "text-foreground/80"
              )}>
                {log.msg}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-2 bg-muted/10 border-t border-border/50 flex justify-between items-center px-4">
        <div className="text-[10px] text-muted-foreground flex gap-3">
          <span>LINES: 41,209</span>
          <span>BLOCKS: 82</span>
          <span>LAYERS: 14</span>
        </div>
        <Badge variant="outline" className="text-[9px] h-4 px-1.5 font-code border-primary/20 text-primary">v1.0.4-LTS</Badge>
      </div>
    </div>
  )
}
