import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Zap, 
  Library, 
  FileText, 
  Settings, 
  History, 
  Users, 
  Scale, 
  Activity,
  Cpu,
  Database,
  Crosshair,
  FileSearch
} from "lucide-react"
import Link from "next/link"

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
  { title: "Upload Workspace", icon: Database, url: "/dashboard/audit" },
  { title: "Analysis Workstation", icon: Crosshair, url: "/dashboard/analysis-dashboard" },
  { title: "Remediation Engine", icon: Zap, url: "/dashboard/remediation" },
  { title: "Project Vault", icon: Library, url: "/dashboard/projects" },
  { title: "Report Viewer", icon: FileSearch, url: "/dashboard/qa-report-viewer" },
  { title: "Executive Summaries", icon: FileText, url: "/dashboard/reports" },
]

const systemItems = [
  { title: "Compliance Center", icon: Scale, url: "/dashboard/compliance" },
  { title: "Team Activity", icon: Users, url: "/dashboard/team" },
  { title: "Audit History", icon: History, url: "/dashboard/history" },
  { title: "System Status", icon: Activity, url: "/dashboard/status" },
]

export function DashboardSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon" className="border-r border-border/50 bg-sidebar">
      <SidebarHeader className="h-14 flex items-center justify-center border-b border-border/50">
        <div className="flex items-center gap-3 px-2">
          <div className="size-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-headline font-bold shrink-0">
            DG
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-headline font-bold text-sm tracking-tight uppercase leading-none">
              Guardian AI
            </span>
            <span className="text-[9px] font-code text-muted-foreground uppercase tracking-widest mt-1">
              Engineering OS
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-code uppercase tracking-widest text-muted-foreground/50">Core Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} className="hover:bg-primary/10 hover:text-primary transition-colors">
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      <span className="font-code text-xs uppercase tracking-tight">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-code uppercase tracking-widest text-muted-foreground/50">System Intel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} className="hover:bg-primary/10 hover:text-primary transition-colors">
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      <span className="font-code text-xs uppercase tracking-tight">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border/50 bg-muted/5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-primary/10">
              <Link href="/dashboard/settings">
                <Settings className="size-4" />
                <span className="font-code text-xs uppercase">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
