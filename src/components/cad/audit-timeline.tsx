"use client"

import { Clock, CheckCircle2, AlertTriangle, FileText } from "lucide-react"

const timeline = [
  { time: "2h ago", user: "SysAdmin", action: "Full Audit Triggered", status: "complete", rev: "v1.2" },
  { time: "4h ago", user: "Agent_QA", action: "Bulk Remediation Applied", status: "complete", rev: "v1.1" },
  { time: "Yesterday", user: "Architect_B", action: "New Revision Uploaded", status: "warning", rev: "v1.0" },
  { time: "2 days ago", user: "System", action: "Automated Compliance Sweep", status: "complete", rev: "v0.9" },
]

export function AuditTimeline() {
  return (
    <div className="space-y-4 font-code">
      {timeline.map((item, i) => (
        <div key={i} className="flex gap-4 relative">
          {i !== timeline.length - 1 && (
            <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border/50" />
          )}
          <div className="shrink-0 size-6 rounded-full bg-muted/40 border border-border/50 flex items-center justify-center relative z-10">
            {item.status === "complete" ? (
              <CheckCircle2 className="size-3 text-primary" />
            ) : (
              <AlertTriangle className="size-3 text-warning" />
            )}
          </div>
          <div className="flex-1 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-tight">{item.action}</p>
                <p className="text-[10px] text-muted-foreground">{item.user} • {item.rev}</p>
              </div>
              <span className="text-[10px] tabular-nums text-muted-foreground">{item.time}</span>
            </div>
          </div>
        </div>
      ))}
      <button className="w-full py-2 text-[10px] font-bold uppercase border border-dashed border-border/50 rounded hover:bg-muted/10 transition-colors text-muted-foreground">
        Expand Revision History
      </button>
    </div>
  )
}
