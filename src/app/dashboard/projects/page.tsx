import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FolderPlus, Search, FileCode, Clock, MoreVertical, Download } from "lucide-react"

export default function ProjectsPage() {
  const projects = [
    { name: "Terminal 3 Expansion", files: 142, lastUpdated: "2h ago", status: "Active", health: 92 },
    { name: "Downtown Office Hub", files: 48, lastUpdated: "Yesterday", status: "Review", health: 65 },
    { name: "Metro Line B - Phase 1", files: 215, lastUpdated: "3 days ago", status: "Active", health: 88 },
  ]

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Project Vault</h1>
          <p className="text-muted-foreground">Centralized CAD asset management with full version control.</p>
        </div>
        <Button className="gap-2">
          <FolderPlus className="size-4" />
          Create New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card className="bg-card/40 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-code uppercase tracking-widest">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search assets..." className="pl-9 h-9" />
              </div>
              <div className="space-y-2">
                <h5 className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Status</h5>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">Active</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">Review</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">Archived</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5 border-primary/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <FileCode className="size-16" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg font-headline">Enterprise QA</CardTitle>
              <CardDescription>Generate master compliance report for current workspace.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full text-xs h-8">Download PDF Report</Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card className="bg-card/40 border-border/50">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-code">Project Identity</TableHead>
                  <TableHead className="font-code">Assets</TableHead>
                  <TableHead className="font-code">Health</TableHead>
                  <TableHead className="font-code">Sync Status</TableHead>
                  <TableHead className="font-code text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.name} className="group cursor-pointer">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded bg-muted/40 flex items-center justify-center">
                          <FileCode className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <div className="font-medium group-hover:text-primary transition-colors">{project.name}</div>
                          <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <Clock className="size-3" /> Updated {project.lastUpdated}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-code text-xs text-muted-foreground">
                      {project.files} DWG/PDF
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${project.health > 90 ? "bg-primary" : "bg-warning"}`} 
                            style={{ width: `${project.health}%` }} 
                          />
                        </div>
                        <span className="text-xs font-bold">{project.health}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={project.status === "Active" ? "outline" : "secondary"}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="size-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="size-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  )
}
