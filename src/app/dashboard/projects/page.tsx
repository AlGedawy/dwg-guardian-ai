"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FolderPlus, Search, FileCode, Clock, MoreVertical, Download, ShieldCheck, Activity, Database, Library } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function ProjectsPage() {
  const projects = [
    { name: "Terminal 3 Expansion", files: 142, lastUpdated: "2h ago", status: "Active", health: 92, id: "PRJ_T3E" },
    { name: "Downtown Office Hub", files: 48, lastUpdated: "Yesterday", status: "Review", health: 65, id: "PRJ_DOH" },
    { name: "Metro Line B - Phase 1", files: 215, lastUpdated: "3 days ago", status: "Active", health: 88, id: "PRJ_MLB" },
    { name: "City Stadium Grid", files: 312, lastUpdated: "1w ago", status: "Archived", health: 99, id: "PRJ_CSG" },
  ]

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-border/50 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Library className="size-5 text-primary" />
            <Badge variant="outline" className="font-code text-[10px] border-primary/20 text-primary uppercase">Asset Management Cluster</Badge>
          </div>
          <h1 className="text-4xl font-headline font-bold uppercase tracking-tight">Project Vault</h1>
          <p className="text-muted-foreground font-body">Centralized compliance hub for global engineering infrastructure.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-10 px-6 font-code text-xs uppercase">
            Cluster Settings
          </Button>
          <Button className="gap-2 h-10 px-6 font-code text-xs uppercase shadow-lg shadow-primary/20">
            <FolderPlus className="size-4" /> Create Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card className="bg-card/40 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-code uppercase tracking-widest text-muted-foreground">Search & Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search project ID..." className="pl-9 h-9 text-xs font-code bg-muted/20" />
              </div>
              <div className="space-y-3">
                <h5 className="text-[9px] uppercase font-bold text-muted-foreground tracking-tighter">Status Registry</h5>
                <div className="flex flex-col gap-2">
                  {['Active', 'Under Review', 'Standards Pass', 'Archived'].map((status) => (
                    <div key={status} className="flex items-center justify-between p-2 rounded border border-border/50 hover:bg-muted/30 cursor-pointer transition-colors">
                      <span className="text-xs font-medium">{status}</span>
                      <div className="size-1.5 rounded-full bg-primary" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5 border-primary/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Database className="size-24" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold uppercase">Enterprise QA</CardTitle>
              <CardDescription className="text-xs leading-relaxed">Compile global compliance health across all 4 active clusters.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full text-[10px] h-8 font-code uppercase">Master Report PDF</Button>
            </CardContent>
          </Card>

          <Card className="bg-card/20 border-border/50">
            <CardHeader className="py-3">
              <CardTitle className="text-[10px] font-code uppercase tracking-widest text-muted-foreground">Node Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-code">
                  <span>STORAGE_UTILIZATION</span>
                  <span>42%</span>
                </div>
                <div className="h-1 w-full bg-muted/40 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[42%]" />
                </div>
              </div>
              <div className="flex justify-between items-center text-[9px] font-code">
                <span className="text-muted-foreground">ACTIVE_NODES</span>
                <span className="font-bold">12 / 12</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card className="bg-card/40 border-border/50 overflow-hidden shadow-none">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="font-code text-[10px] uppercase tracking-widest h-10">Project Identity</TableHead>
                  <TableHead className="font-code text-[10px] uppercase tracking-widest h-10 text-center">Assets</TableHead>
                  <TableHead className="font-code text-[10px] uppercase tracking-widest h-10">Compliance Health</TableHead>
                  <TableHead className="font-code text-[10px] uppercase tracking-widest h-10">Registry Status</TableHead>
                  <TableHead className="font-code text-[10px] uppercase tracking-widest h-10 text-right pr-6">Telemetry</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.name} className="group border-border/50 hover:bg-primary/5 transition-colors">
                    <TableCell className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded border border-border/50 flex items-center justify-center bg-muted/10 group-hover:border-primary/40 transition-colors">
                          <FileCode className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <div className="font-headline font-bold text-sm group-hover:text-primary transition-colors uppercase tracking-tight">{project.name}</div>
                          <div className="text-[9px] text-muted-foreground font-code flex items-center gap-2">
                            <span>ID: {project.id}</span>
                            <span className="text-border">|</span>
                            <span className="flex items-center gap-1"><Clock className="size-3" /> {project.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-code text-[10px] font-bold">
                      {project.files} DWG/PDF
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 bg-muted/50 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full transition-all duration-1000",
                              project.health > 90 ? "bg-primary" : project.health > 70 ? "bg-warning" : "bg-destructive"
                            )} 
                            style={{ width: `${project.health}%` }} 
                          />
                        </div>
                        <span className={cn(
                          "text-[10px] font-bold font-code",
                          project.health > 90 ? "text-primary" : project.health > 70 ? "text-warning" : "text-destructive"
                        )}>{project.health}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(
                        "text-[9px] font-code h-5 uppercase border-border/50",
                        project.status === "Active" ? "bg-primary/5 text-primary border-primary/20" : 
                        project.status === "Review" ? "bg-warning/5 text-warning border-warning/20" : ""
                      )}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary"><Download className="size-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary"><Activity className="size-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="size-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-4 bg-muted/10 border-t border-border/50 text-center">
              <Button variant="ghost" className="text-[10px] font-code uppercase text-muted-foreground hover:text-primary">
                Load Extended Archive (512 Results)
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
