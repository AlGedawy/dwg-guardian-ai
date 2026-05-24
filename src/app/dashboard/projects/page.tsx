"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FolderPlus, Search, FileCode, Clock, MoreVertical, Download, ShieldCheck, Activity, Database, Library, Globe, Ship, Plane, Train, Landmark } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function ProjectsPage() {
  const projects = [
    { name: "Terminal 3 Expansion", files: 142, lastUpdated: "2h ago", status: "Active", health: 92, id: "PRJ_T3E", icon: Plane, type: "Aviation" },
    { name: "Downtown Office Hub", files: 48, lastUpdated: "Yesterday", status: "Review", health: 65, id: "PRJ_DOH", icon: Landmark, type: "Structural" },
    { name: "Metro Line B - Phase 1", files: 215, lastUpdated: "3 days ago", status: "Active", health: 88, id: "PRJ_MLB", icon: Train, type: "Transit" },
    { name: "City Stadium Grid", files: 312, lastUpdated: "1w ago", status: "Archived", health: 99, id: "PRJ_CSG", icon: Landmark, type: "Sport" },
    { name: "Global Port Logistics", files: 84, lastUpdated: "2w ago", status: "Active", health: 74, id: "PRJ_GPL", icon: Ship, type: "Maritime" },
    { name: "Industrial Facility X", files: 156, lastUpdated: "3w ago", status: "Review", health: 42, id: "PRJ_IFX", icon: Database, type: "Industrial" },
  ]

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-border/50 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Library className="size-5 text-primary" />
            <Badge variant="outline" className="font-code text-[10px] border-primary/20 text-primary uppercase">Project Management Cluster</Badge>
          </div>
          <h1 className="text-4xl font-headline font-bold uppercase tracking-tight">Project Vault</h1>
          <p className="text-muted-foreground font-body">Centralized engineering asset hub. Manage global infrastructure compliance at scale.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-10 px-6 font-code text-xs uppercase bg-black/40">
            Vault Settings
          </Button>
          <Button className="gap-2 h-10 px-6 font-code text-xs uppercase shadow-lg shadow-primary/20 border border-primary/20">
            <FolderPlus className="size-4" /> Initialize New Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-card/40 border-border/50 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-[10px] font-code uppercase tracking-widest text-muted-foreground">Search Registry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Project Identity / ID..." className="pl-9 h-9 text-xs font-code bg-muted/20 border-white/5" />
              </div>
              <div className="space-y-3">
                <h5 className="text-[9px] uppercase font-bold text-muted-foreground tracking-tighter">Status Filter</h5>
                <div className="flex flex-col gap-1">
                  {[
                    { label: 'Active Sessions', count: 12 },
                    { label: 'In Review', count: 4 },
                    { label: 'Compliance Pass', count: 28 },
                    { label: 'Archived Vaults', count: 142 }
                  ].map((filter) => (
                    <div key={filter.label} className="flex items-center justify-between p-2 rounded border border-transparent hover:border-white/10 hover:bg-muted/10 cursor-pointer transition-all group">
                      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">{filter.label}</span>
                      <Badge variant="secondary" className="text-[9px] font-code bg-muted/20">{filter.count}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5 border-primary/10 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
              <Globe className="size-24" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg font-headline font-bold uppercase tracking-tight">Enterprise QA</CardTitle>
              <CardDescription className="text-xs leading-relaxed italic">"Aggregate global compliance health across all active infrastructure clusters."</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full text-[10px] h-9 font-code uppercase gap-2">
                <FileCode className="size-3" /> Master Audit Report
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/20 border-border/50">
            <CardHeader className="py-3">
              <CardTitle className="text-[10px] font-code uppercase tracking-widest text-muted-foreground">Infrastructure Telemetry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-code">
                  <span className="text-muted-foreground uppercase">Storage Utilization</span>
                  <span className="text-primary font-bold">42%</span>
                </div>
                <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[42%] animate-pulse" />
                </div>
              </div>
              <div className="flex justify-between items-center text-[9px] font-code">
                <span className="text-muted-foreground uppercase">Network Latency</span>
                <span className="font-bold text-green-500">0.82ms</span>
              </div>
              <div className="flex justify-between items-center text-[9px] font-code">
                <span className="text-muted-foreground uppercase">Active Nodes</span>
                <span className="font-bold">12 / 12</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="bg-card/40 border-border/50 overflow-hidden shadow-2xl border-white/5">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-white/10">
                  <TableHead className="font-code text-[10px] uppercase tracking-widest h-12">Project Identity & Cluster</TableHead>
                  <TableHead className="font-code text-[10px] uppercase tracking-widest h-12 text-center">Asset Load</TableHead>
                  <TableHead className="font-code text-[10px] uppercase tracking-widest h-12">Compliance Score</TableHead>
                  <TableHead className="font-code text-[10px] uppercase tracking-widest h-12">Registry Status</TableHead>
                  <TableHead className="font-code text-[10px] uppercase tracking-widest h-12 text-right pr-6">Operational Continuity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.name} className="group border-white/5 hover:bg-primary/5 transition-all duration-300">
                    <TableCell className="py-5">
                      <div className="flex items-center gap-4">
                        <div className="size-11 rounded bg-muted/20 border border-white/10 flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
                          <project.icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <div className="font-headline font-bold text-sm group-hover:text-primary transition-colors uppercase tracking-tight">{project.name}</div>
                          <div className="text-[9px] text-muted-foreground font-code flex items-center gap-2 mt-0.5">
                            <Badge variant="outline" className="text-[8px] h-3 px-1 border-white/10">{project.type}</Badge>
                            <span className="text-border">|</span>
                            <span>ID: {project.id}</span>
                            <span className="text-border">|</span>
                            <span className="flex items-center gap-1"><Clock className="size-3" /> {project.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-code text-[11px] font-bold">
                      {project.files} <span className="text-[9px] opacity-50">TECHNICAL_ASSETS</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-1.5 bg-muted/40 rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full transition-all duration-1000",
                              project.health > 90 ? "bg-primary" : project.health > 70 ? "bg-warning" : "bg-destructive"
                            )} 
                            style={{ width: `${project.health}%` }} 
                          />
                        </div>
                        <span className={cn(
                          "text-[11px] font-bold font-code",
                          project.health > 90 ? "text-primary" : project.health > 70 ? "text-warning" : "text-destructive"
                        )}>{project.health}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(
                        "text-[9px] font-code h-5 uppercase border-white/10 shadow-sm",
                        project.status === "Active" ? "bg-primary/5 text-primary border-primary/20" : 
                        project.status === "Review" ? "bg-warning/5 text-warning border-warning/20" : 
                        "bg-muted/5 text-muted-foreground"
                      )}>
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary"><Download className="size-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary"><Activity className="size-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary"><MoreVertical className="size-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="p-4 bg-muted/5 border-t border-white/10 text-center">
              <Button variant="ghost" className="text-[10px] font-code uppercase text-muted-foreground hover:text-primary gap-2">
                Load Extended Archive Cluster (512+ Results)
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}