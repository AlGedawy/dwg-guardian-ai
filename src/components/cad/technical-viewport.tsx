"use client"

import { Crosshair, Layers, Maximize2, MousePointer2, Ruler } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function TechnicalViewport() {
  return (
    <div className="relative aspect-video bg-[#0c0c0c] border border-border/50 rounded-lg overflow-hidden group">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      {/* CAD Mock Graphics */}
      <svg className="absolute inset-0 w-full h-full p-8 overflow-visible" viewBox="0 0 400 200">
        {/* Floor Plan Mock */}
        <path d="M50 50 L350 50 L350 150 L50 150 Z" fill="none" stroke="#444" strokeWidth="2" />
        <path d="M150 50 L150 150 M250 50 L250 150" fill="none" stroke="#444" strokeWidth="1" />
        
        {/* Violation Highlights */}
        <rect x="145" y="45" width="10" height="10" fill="none" stroke="hsl(var(--destructive))" strokeWidth="1" className="animate-pulse" />
        <circle cx="250" cy="100" r="15" fill="none" stroke="hsl(var(--warning))" strokeWidth="1" strokeDasharray="4 2" />
        
        {/* Dimension Lines */}
        <path d="M50 40 L350 40" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <path d="M50 35 L50 45 M350 35 L350 45" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <text x="200" y="35" fontSize="8" fill="hsl(var(--primary))" textAnchor="middle" className="font-code">300.00m</text>
      </svg>

      {/* Coordinate HUD */}
      <div className="absolute bottom-4 left-4 font-code text-[10px] text-muted-foreground flex gap-4 bg-black/60 p-2 rounded backdrop-blur-sm border border-white/5">
        <div className="flex gap-1">
          <span className="opacity-50">X:</span> <span className="text-foreground">14,209.42</span>
        </div>
        <div className="flex gap-1">
          <span className="opacity-50">Y:</span> <span className="text-foreground">-821.11</span>
        </div>
        <div className="flex gap-1">
          <span className="opacity-50">Z:</span> <span className="text-foreground">0.00</span>
        </div>
      </div>

      {/* Tools Overlay */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <button className="p-1.5 bg-black/60 rounded border border-white/5 hover:bg-primary/20 transition-colors">
          <MousePointer2 className="size-4 text-foreground" />
        </button>
        <button className="p-1.5 bg-black/60 rounded border border-white/5 hover:bg-primary/20 transition-colors">
          <Ruler className="size-4 text-foreground" />
        </button>
        <button className="p-1.5 bg-black/60 rounded border border-white/5 hover:bg-primary/20 transition-colors">
          <Layers className="size-4 text-foreground" />
        </button>
      </div>

      {/* Layer Badge HUD */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
        <Badge variant="secondary" className="bg-black/60 backdrop-blur-sm font-code text-[10px] border-white/10">
          A-WALL-EXTR [Active]
        </Badge>
        <Badge variant="destructive" className="font-code text-[10px] animate-bounce">
          VIOLATION: ISO-13567
        </Badge>
      </div>

      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 transition-all pointer-events-none" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/10 pointer-events-none" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/10 pointer-events-none" />
    </div>
  )
}
