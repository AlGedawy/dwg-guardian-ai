import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Badge } from "@/components/ui/badge"
import { Activity, Cpu, Globe, SignalHigh } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="flex flex-col bg-background">
        <header className="flex h-14 items-center gap-4 border-b bg-card/30 px-6 backdrop-blur-md sticky top-0 z-50">
          <SidebarTrigger />
          <div className="h-4 w-px bg-border/50 mx-2" />
          
          <div className="flex-1 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-code text-muted-foreground uppercase leading-none mb-1">Active Cluster</span>
                <span className="text-xs font-bold font-code uppercase tracking-tight flex items-center gap-2">
                  <Globe className="size-3 text-primary" /> US-EAST-INFRA-04
                </span>
              </div>
              <div className="h-8 w-px bg-border/30" />
              <div className="flex flex-col">
                <span className="text-[10px] font-code text-muted-foreground uppercase leading-none mb-1">Node Latency</span>
                <span className="text-xs font-bold font-code uppercase tracking-tight flex items-center gap-2 text-green-500">
                  <SignalHigh className="size-3" /> 14ms
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-code text-muted-foreground uppercase leading-none mb-1">Engine Status</span>
                <Badge variant="outline" className="h-5 text-[9px] font-code bg-primary/5 text-primary border-primary/20 uppercase">
                  v4.0.2_STABLE
                </Badge>
              </div>
              <div className="h-8 w-px bg-border/30" />
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase leading-none">SYS_ADMIN_42</p>
                  <p className="text-[8px] font-code text-muted-foreground uppercase mt-1">AUTH_LEVEL_04</p>
                </div>
                <div className="size-8 rounded bg-muted border border-border/50" />
              </div>
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto bg-[#080808]">
          {children}
        </div>

        <footer className="h-8 border-t bg-card/30 flex items-center px-6 justify-between text-[9px] font-code text-muted-foreground uppercase tracking-widest">
          <div className="flex gap-4">
            <span>© 2024 Guardian AI Systems</span>
            <span>//</span>
            <span>Security Protocol: AES-256-GCM</span>
          </div>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Activity className="size-2" /> Engine: Nominal</span>
            <span className="flex items-center gap-1"><Cpu className="size-2" /> Load: 12.4%</span>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
