import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-card/50 px-6 backdrop-blur-md sticky top-0 z-10">
          <SidebarTrigger />
          <div className="h-4 w-px bg-border mx-2" />
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider font-code">
            System Status: Nominal
          </h2>
        </header>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
