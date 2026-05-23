"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Badge } from "@/components/ui/badge"
import { 
  Activity, 
  Cpu, 
  Globe, 
  SignalHigh, 
  ChevronDown, 
  Building2, 
  Search, 
  Bell,
  Command
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeOrg, setActiveOrg] = useState("Global Infra Partners")
  const organizations = ["Global Infra Partners", "Metro Rail Authority", "City Dev Group"]

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="flex flex-col bg-background">
        <header className="flex h-14 items-center gap-4 border-b bg-card/30 px-6 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <div className="h-4 w-px bg-border/50 mx-2" />
            
            {/* Organization Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 gap-2 px-2 hover:bg-white/5 font-headline font-bold uppercase text-xs">
                  <Building2 className="size-4 text-primary" />
                  <span className="max-w-[150px] truncate">{activeOrg}</span>
                  <ChevronDown className="size-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-card border-border/50">
                <DropdownMenuLabel className="text-[10px] font-code uppercase tracking-widest text-muted-foreground">Switch Workspace</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {organizations.map(org => (
                  <DropdownMenuItem key={org} onClick={() => setActiveOrg(org)} className="text-xs font-code uppercase flex justify-between">
                    {org}
                    {activeOrg === org && <div className="size-1.5 rounded-full bg-primary" />}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-xs font-code uppercase text-primary gap-2">
                  <Command className="size-3" /> Create New Cluster
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex-1 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="hidden xl:flex flex-col">
                <span className="text-[10px] font-code text-muted-foreground uppercase leading-none mb-1">Active Cluster</span>
                <span className="text-xs font-bold font-code uppercase tracking-tight flex items-center gap-2">
                  <Globe className="size-3 text-primary" /> US-EAST-INFRA-04
                </span>
              </div>
              <div className="hidden xl:block h-8 w-px bg-border/30" />
              <div className="flex flex-col">
                <span className="text-[10px] font-code text-muted-foreground uppercase leading-none mb-1">Node Latency</span>
                <span className="text-xs font-bold font-code uppercase tracking-tight flex items-center gap-2 text-green-500">
                  <SignalHigh className="size-3 animate-pulse" /> 14ms
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 bg-muted/20 border border-white/5 rounded px-2 h-8">
                <Search className="size-3 text-muted-foreground" />
                <span className="text-[10px] font-code text-muted-foreground uppercase">Search Audit DB...</span>
              </div>
              
              <Button size="icon" variant="ghost" className="size-8 relative">
                <Bell className="size-4" />
                <span className="absolute top-1 right-1 size-1.5 bg-primary rounded-full" />
              </Button>

              <div className="h-8 w-px bg-border/30" />
              
              <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                  <p className="text-[10px] font-bold uppercase leading-none">SYS_ADMIN_42</p>
                  <p className="text-[8px] font-code text-muted-foreground uppercase mt-1">QA_LEAD // L4_AUTH</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="size-8 rounded bg-primary/20 border border-primary/20 flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
                      <span className="text-[10px] font-code font-bold">SA</span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-card border-border/50">
                    <DropdownMenuLabel className="text-[10px] font-code uppercase tracking-widest text-muted-foreground">Session Profile</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-xs font-code uppercase">Profile Settings</DropdownMenuItem>
                    <DropdownMenuItem className="text-xs font-code uppercase">Security Tokens</DropdownMenuItem>
                    <DropdownMenuItem className="text-xs font-code uppercase">Organization Admin</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-xs font-code uppercase text-destructive" onClick={() => window.location.href = '/login'}>Terminate Session</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
            <span className="flex items-center gap-1"><Activity className="size-2 text-primary" /> Engine: Nominal</span>
            <span className="flex items-center gap-1"><Cpu className="size-2" /> Load: 12.4%</span>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
