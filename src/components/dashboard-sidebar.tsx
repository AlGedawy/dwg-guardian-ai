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
} from "@/components/ui/sidebar"
import { LayoutDashboard, ShieldCheck, Zap, Library, FileText, Settings, History } from "lucide-react"
import Link from "next/link"

const navItems = [
  { title: "Overview", icon: LayoutDashboard, url: "/dashboard" },
  { title: "Audit Tool", icon: ShieldCheck, url: "/dashboard/audit" },
  { title: "Remediation", icon: Zap, url: "/dashboard/remediation" },
  { title: "Project Vault", icon: Library, url: "/dashboard/projects" },
  { title: "Reports", icon: FileText, url: "/dashboard/reports" },
  { title: "Audit History", icon: History, url: "/dashboard/history" },
]

export function DashboardSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex items-center p-4">
        <div className="flex items-center gap-2 px-2">
          <div className="size-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-headline font-bold">
            DG
          </div>
          <span className="font-headline font-bold text-lg group-data-[collapsible=icon]:hidden">
            Guardian AI
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4">Engineering Hub</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/settings">
                <Settings className="size-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
