import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  ShieldCheck, Zap, Activity, Grid3X3, ArrowRight, Layers, Database, 
  FileSearch, GitBranch, Box, Cpu, Network, Server, Microscope, 
  Terminal, History, LayoutDashboard, ChevronRight, Upload, Search,
  Download, Share2, Printer, Filter, MoreHorizontal, FileCode, Clock,
  CheckCircle2, AlertTriangle, AlertCircle, Info, Library, BarChart3,
  ExternalLink, MousePointer2, Ruler, Maximize2
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { HealthScore } from "@/components/cad/health-score"
import { AuditConsole } from "@/components/cad/audit-console"
import { TechnicalViewport } from "@/components/cad/technical-viewport"
import { AuditTimeline } from "@/components/cad/audit-timeline"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30">
      <nav className="flex items-center justify-between p-4 px-6 max-w-[1600px] mx-auto w-full border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-headline font-bold text-lg">
            DG
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-headline font-bold text-lg tracking-tight uppercase">DWG Guardian AI</span>
            <span className="text-[9px] font-code text-muted-foreground uppercase tracking-widest">Global Engineering Infrastructure</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-[10px] font-code uppercase font-bold text-muted-foreground hover:text-primary transition-colors">Terminal Hub</Link>
          <Button asChild size="sm" className="rounded-none h-8 px-4 font-code text-[10px] uppercase">
            <Link href="/dashboard">Launch Operating System</Link>
          </Button>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section - Untouched as per instructions */}
        <section className="py-20 px-6 text-center max-w-5xl mx-auto space-y-6">
          <div className="flex justify-center">
            <Badge variant="outline" className="font-code py-0.5 px-3 border-primary/30 text-primary bg-primary/5 text-[10px] uppercase tracking-widest">
              Regulatory Engine v4.0.2 Activated
            </Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter text-balance leading-[0.9] uppercase">
            Precision <span className="text-primary">Compliance</span> For Global Engineering.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body font-light">
            Infrastructure-grade geometric reasoning and automated standard enforcement for DWG, DXF, and PDF assets.
          </p>
          <div className="flex items-center justify-center gap-3 pt-4">
            <Button asChild size="lg" className="h-12 rounded-none px-8 font-headline uppercase font-bold tracking-tight">
              <Link href="/dashboard/audit">Initiate Audit <ArrowRight className="ml-2 size-4" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 rounded-none px-8 font-headline uppercase font-bold tracking-tight border-primary/20 hover:bg-primary/5">
              Documentation
            </Button>
          </div>
        </section>

        {/* 1. Upload Workspace Preview */}
        <section className="py-16 border-t border-border/50 bg-muted/5">
          <div className="max-w-[1500px] mx-auto px-6 space-y-8">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-code text-primary uppercase tracking-[0.2em] font-bold">MODULE_01 // INGESTION</span>
              <h2 className="text-3xl font-headline font-bold uppercase tracking-tight">Upload Workspace</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-6">
                <div className="border-2 border-dashed border-border/60 rounded-xl p-12 flex flex-col items-center justify-center gap-6 bg-card/40 hover:bg-primary/5 transition-all group">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Upload className="size-6" />
                  </div>
                  <div className="text-center">
                    <p className="font-headline font-bold uppercase tracking-tight">Drop Engineering Assets</p>
                    <p className="text-xs text-muted-foreground mt-1">Support for .DWG, .DXF, and Vector .PDF up to 500MB</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-[10px] font-code font-bold uppercase text-muted-foreground tracking-widest">Active Upload Queue</h3>
                  <div className="rounded-lg border border-border/50 bg-card/30 overflow-hidden">
                    <Table>
                      <TableHeader className="bg-muted/30">
                        <TableRow className="h-9 border-border/50">
                          <TableHead className="text-[9px] uppercase font-code">Asset Name</TableHead>
                          <TableHead className="text-[9px] uppercase font-code">Status</TableHead>
                          <TableHead className="text-[9px] uppercase font-code">Size</TableHead>
                          <TableHead className="text-[9px] uppercase font-code text-right">Progress</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="border-border/50">
                          <TableCell className="text-xs font-medium py-3">TERMINAL_B_EXPANSION_V1.dwg</TableCell>
                          <TableCell><Badge variant="outline" className="text-[9px] font-code text-primary border-primary/20 bg-primary/5">VALIDATING</Badge></TableCell>
                          <TableCell className="text-[10px] font-code">142.4 MB</TableCell>
                          <TableCell className="text-right w-[200px]">
                            <div className="flex items-center gap-3 justify-end">
                              <Progress value={82} className="h-1 w-24" />
                              <span className="text-[10px] font-code">82%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-border/50">
                          <TableCell className="text-xs font-medium py-3">STRUCTURAL_GRID_P4.dxf</TableCell>
                          <TableCell><Badge variant="outline" className="text-[9px] font-code text-warning border-warning/20">QUEUED</Badge></TableCell>
                          <TableCell className="text-[10px] font-code">12.8 MB</TableCell>
                          <TableCell className="text-right">
                            <span className="text-[10px] font-code text-muted-foreground">WAITING...</span>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-4">
                <Card className="bg-card/40 border-border/50">
                  <CardHeader className="py-3 border-b border-border/50">
                    <CardTitle className="text-[10px] font-code uppercase tracking-widest text-muted-foreground">Metadata Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-code uppercase text-muted-foreground">Target Project</label>
                      <div className="h-8 w-full border border-border/50 bg-muted/20 rounded flex items-center px-3 text-xs font-code justify-between cursor-pointer hover:bg-muted/30">
                        METRO_LINE_B_PHASE_1
                        <ChevronRight className="size-3 opacity-50 rotate-90" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-code uppercase text-muted-foreground">Compliance Engine</label>
                      <div className="h-8 w-full border border-border/50 bg-muted/20 rounded flex items-center px-3 text-xs font-code justify-between">
                        STRICT_ISO_AIA_V3
                        <ShieldCheck className="size-3 text-primary" />
                      </div>
                    </div>
                    <div className="pt-2">
                      <Button className="w-full h-9 rounded-none font-code text-[10px] uppercase gap-2">
                        <Activity className="size-3" /> Initialize Processing
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 border border-border/50 bg-black/20 rounded-lg">
                    <span className="text-[8px] font-code uppercase text-muted-foreground block mb-1">Queue Load</span>
                    <span className="text-lg font-headline font-bold">14%</span>
                  </div>
                  <div className="p-3 border border-border/50 bg-black/20 rounded-lg">
                    <span className="text-[8px] font-code uppercase text-muted-foreground block mb-1">Audit Node</span>
                    <span className="text-xs font-code text-primary uppercase">US-EAST-4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Analysis Dashboard Preview */}
        <section className="py-16 border-t border-border/50 bg-background">
          <div className="max-w-[1500px] mx-auto px-6 space-y-8">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-code text-primary uppercase tracking-[0.2em] font-bold">MODULE_02 // ANALYSIS_HUB</span>
              <h2 className="text-3xl font-headline font-bold uppercase tracking-tight">Analysis Dashboard</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-3 space-y-4">
                <HealthScore score={79} className="bg-card/40 border-primary/20" />
                <Card className="bg-card/20 border-border/50">
                  <CardHeader className="py-2 border-b border-border/50">
                    <CardTitle className="text-[10px] font-code uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      <Activity className="size-3" /> Violations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-code">
                        <span>CRITICAL</span>
                        <span className="text-destructive font-bold">12</span>
                      </div>
                      <Progress value={45} className="h-1 bg-muted/20" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-code">
                        <span>MAJOR</span>
                        <span className="text-warning font-bold">24</span>
                      </div>
                      <Progress value={65} className="h-1 bg-muted/20" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-code">
                        <span>MINOR</span>
                        <span className="text-primary font-bold">82</span>
                      </div>
                      <Progress value={90} className="h-1 bg-muted/20" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <TechnicalViewport />
                <div className="h-[250px]">
                  <AuditConsole />
                </div>
              </div>

              <div className="lg:col-span-3">
                <Card className="bg-card/20 border-border/50 h-full overflow-hidden">
                  <CardHeader className="py-2 border-b border-border/50 bg-muted/10">
                    <CardTitle className="text-[10px] font-code uppercase tracking-widest text-muted-foreground">Compliance Timeline</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[500px]">
                      <div className="p-4">
                        <AuditTimeline />
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 3. QA Report Viewer Preview */}
        <section className="py-16 border-t border-border/50 bg-muted/5">
          <div className="max-w-[1500px] mx-auto px-6 space-y-8">
            <div className="flex items-end justify-between border-b border-border/50 pb-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-code text-primary uppercase tracking-[0.2em] font-bold">MODULE_03 // REPORTING</span>
                <h2 className="text-3xl font-headline font-bold uppercase tracking-tight">Engineering Report Viewer</h2>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 rounded-none px-4 font-code text-[10px] uppercase gap-2">
                  <Share2 className="size-3" /> Share
                </Button>
                <Button variant="outline" size="sm" className="h-8 rounded-none px-4 font-code text-[10px] uppercase gap-2">
                  <Printer className="size-3" /> Print
                </Button>
                <Button size="sm" className="h-8 rounded-none px-4 font-code text-[10px] uppercase gap-2">
                  <Download className="size-3" /> Export PDF
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-card border-border/50 shadow-lg md:col-span-3 overflow-hidden">
                <CardHeader className="bg-muted/30 border-b border-border/50 p-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">DG</div>
                        <div>
                          <h4 className="font-headline font-bold text-lg uppercase">DWG Guardian AI Report</h4>
                          <p className="text-[10px] font-code text-muted-foreground uppercase">SESSION_ID: 0x7E3F21A // TIMESTAMP: 2024.03.22.14.22</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-8 pt-4">
                        <div>
                          <p className="text-[9px] font-code uppercase text-muted-foreground font-bold">Asset Reference</p>
                          <p className="text-xs font-medium uppercase mt-1">T3_TERMINAL_EXPANSION_LAYOUT.dwg</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-code uppercase text-muted-foreground font-bold">Regulatory Framework</p>
                          <p className="text-xs font-medium uppercase mt-1">AIA CAD Standards v3.0 // ISO 13567</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-code uppercase text-muted-foreground mb-1">Final Integrity Score</p>
                      <p className="text-6xl font-headline font-bold text-primary">94.2</p>
                      <Badge className="mt-2 bg-primary/20 text-primary border-primary/30 uppercase text-[9px] font-code">CERTIFIED_PASS</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <h5 className="text-[10px] font-code font-bold uppercase tracking-widest border-b border-border/50 pb-2">Executive Summary</h5>
                      <p className="text-sm text-foreground/80 leading-relaxed font-body">
                        Comprehensive audit of geometric primitives, layer structures, and annotation styles completed. 
                        The drawing demonstrates high structural integrity with minor violations in the non-critical 
                        annotation layer (A-ANNO-TEXT). Global coordinate alignment is within 0.001mm tolerance.
                      </p>
                      <div className="space-y-4 pt-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Geometric Accuracy</span>
                          <span className="font-bold">100%</span>
                        </div>
                        <Progress value={100} className="h-1" />
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Layer Compliance</span>
                          <span className="font-bold">88.4%</span>
                        </div>
                        <Progress value={88} className="h-1" />
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Standards Coverage</span>
                          <span className="font-bold">99.2%</span>
                        </div>
                        <Progress value={99} className="h-1" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h5 className="text-[10px] font-code font-bold uppercase tracking-widest border-b border-border/50 pb-2">Violation Matrix</h5>
                      <div className="space-y-2">
                        {[
                          { cat: "Incorrect Layers", count: 4, sev: "MAJOR" },
                          { cat: "Duplicate Geometry", count: 12, sev: "MINOR" },
                          { cat: "Scale Inconsistencies", count: 1, sev: "CRITICAL" },
                          { cat: "Annotation Orphaned", count: 17, sev: "INFO" }
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded bg-muted/20 border border-border/30 hover:bg-muted/40 transition-colors">
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className={cn(
                                "text-[8px] font-code h-3.5 px-1",
                                item.sev === "CRITICAL" ? "bg-destructive/10 text-destructive border-destructive/20" :
                                item.sev === "MAJOR" ? "bg-warning/10 text-warning border-warning/20" : "bg-primary/10 text-primary border-primary/20"
                              )}>{item.sev}</Badge>
                              <span className="text-xs font-medium">{item.cat}</span>
                            </div>
                            <span className="text-xs font-bold font-code">{item.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader className="py-3">
                    <CardTitle className="text-[10px] font-code uppercase tracking-widest text-primary">Auditor Remarks</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-[11px] text-foreground/70 leading-relaxed italic">
                      "Bulk remediation recommended for Layer 0 entities. Plotting risks identified in V-04 Viewport."
                    </p>
                    <div className="flex items-center gap-2 pt-2 border-t border-primary/10">
                      <div className="size-6 rounded bg-primary/20" />
                      <div className="flex flex-col leading-none">
                        <span className="text-[9px] font-bold uppercase">Sys_Auditor_42</span>
                        <span className="text-[8px] text-muted-foreground">Verification Node</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/20 border-border/50">
                  <CardHeader className="py-3">
                    <CardTitle className="text-[10px] font-code uppercase tracking-widest text-muted-foreground">Audit Trace</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3 text-[10px] font-code border-b border-border/30 pb-2">
                      <span className="text-muted-foreground">09:12</span>
                      <span>INGESTION_START</span>
                    </div>
                    <div className="flex gap-3 text-[10px] font-code border-b border-border/30 pb-2">
                      <span className="text-muted-foreground">09:14</span>
                      <span>GEO_SCAN_COMPLETE</span>
                    </div>
                    <div className="flex gap-3 text-[10px] font-code">
                      <span className="text-muted-foreground">09:15</span>
                      <span>CERT_FINALIZED</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Project Vault Preview */}
        <section className="py-16 border-t border-border/50 bg-background mb-20">
          <div className="max-w-[1500px] mx-auto px-6 space-y-8">
            <div className="flex items-end justify-between border-b border-border/50 pb-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-code text-primary uppercase tracking-[0.2em] font-bold">MODULE_04 // ASSET_VAULT</span>
                <h2 className="text-3xl font-headline font-bold uppercase tracking-tight">Enterprise Project Vault</h2>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 size-3 text-muted-foreground" />
                  <Input placeholder="SEARCH_PROJECT_REGISTRY..." className="h-8 pl-8 text-[10px] font-code rounded-none border-border/50 bg-muted/20 w-64" />
                </div>
                <Button className="h-8 rounded-none px-4 font-code text-[10px] uppercase">
                  New Cluster
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { name: "TERMINAL 3 EXPANSION", id: "PRJ_T3E", health: 92, status: "ACTIVE", assets: 142 },
                { name: "DOWNTOWN OFFICE HUB", id: "PRJ_DOH", health: 65, status: "REVIEW", assets: 48 },
                { name: "METRO LINE B - PHASE 1", id: "PRJ_MLB", health: 88, status: "ACTIVE", assets: 215 },
                { name: "CITY STADIUM GRID", id: "PRJ_CSG", health: 99, status: "ARCHIVE", assets: 312 },
              ].map((project, i) => (
                <Card key={i} className="bg-card/40 border-border/50 hover:border-primary/40 transition-all cursor-pointer group shadow-none">
                  <CardHeader className="py-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="size-8 rounded bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                        <Library className="size-4" />
                      </div>
                      <Badge variant="outline" className={cn(
                        "text-[8px] font-code h-4 px-1.5",
                        project.status === "ACTIVE" ? "border-primary/30 text-primary bg-primary/5" : "border-border/50"
                      )}>{project.status}</Badge>
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-sm uppercase tracking-tight group-hover:text-primary transition-colors">{project.name}</h4>
                      <p className="text-[9px] font-code text-muted-foreground mt-0.5">ID: {project.id} // {project.assets} ASSETS</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-code uppercase text-muted-foreground">Global Health Index</span>
                      <span className={cn("text-[10px] font-bold font-code", project.health > 80 ? "text-primary" : "text-warning")}>{project.health}%</span>
                    </div>
                    <Progress value={project.health} className="h-1" />
                    <div className="flex justify-end gap-1 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-6 w-6"><Download className="size-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6"><Activity className="size-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronRight className="size-3" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="p-4 bg-muted/5 border border-border/50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-[9px] font-code uppercase text-muted-foreground font-bold">Storage Cluster</span>
                  <span className="text-xs font-code">US-CENTRAL-ALPHA-12</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-code uppercase text-muted-foreground font-bold">Global Uptime</span>
                  <span className="text-xs font-code text-green-500">99.999% NOMINAL</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-code uppercase text-muted-foreground font-bold">Encrypted Volume</span>
                  <span className="text-xs font-code">4.2 TB / 10 TB</span>
                </div>
              </div>
              <Button variant="outline" className="h-7 text-[9px] font-code uppercase rounded-none px-4">Vault Settings</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="p-8 px-6 border-t border-border/50 bg-background">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="size-6 rounded bg-primary/20 flex items-center justify-center text-primary font-headline font-bold text-xs">
              DG
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-headline font-bold text-foreground tracking-tight uppercase">Guardian AI</span>
              <span className="text-[8px] font-code text-muted-foreground uppercase">Compliance OS v4.0.2</span>
            </div>
          </div>
          <div className="flex gap-8 text-[9px] font-code text-muted-foreground uppercase font-bold">
            <Link href="#" className="hover:text-primary transition-colors">Infrastructure</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy Terminal</Link>
            <Link href="#" className="hover:text-primary transition-colors">API Console</Link>
          </div>
          <p className="text-[9px] font-code text-muted-foreground uppercase">© 2024 DWG Guardian AI Global</p>
        </div>
      </footer>
    </div>
  )
}
