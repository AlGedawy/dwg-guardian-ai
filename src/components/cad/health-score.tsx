"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface HealthScoreProps {
  score: number
  className?: string
}

export function HealthScore({ score, className }: HealthScoreProps) {
  const data = [
    { value: score },
    { value: 100 - score },
  ]

  const getColor = (val: number) => {
    if (val >= 90) return "hsl(var(--primary))"
    if (val >= 70) return "hsl(var(--warning))"
    return "hsl(var(--destructive))"
  }

  return (
    <Card className={cn("bg-card/30 border-primary/20 h-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-code uppercase tracking-widest text-muted-foreground flex justify-between">
          Drawing Health
          <span className={cn("font-bold", score >= 70 ? "text-primary" : "text-destructive")}>
            {score >= 90 ? "OPTIMAL" : score >= 70 ? "WARNING" : "CRITICAL"}
          </span>
        </CardTitle>
        <CardDescription className="text-[10px]">Aggregated QA Compliance Index</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-2">
        <div className="relative size-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={55}
                outerRadius={65}
                paddingAngle={0}
                dataKey="value"
                startAngle={225}
                endAngle={-45}
                stroke="none"
              >
                <Cell fill={getColor(score)} />
                <Cell fill="hsl(var(--muted)/0.1)" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-headline font-bold">{score}</span>
            <span className="text-[10px] font-code text-muted-foreground uppercase opacity-60">Percentile</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 w-full text-[10px] font-code">
          <div className="p-2 rounded bg-muted/20 border border-border/50">
            <div className="text-muted-foreground mb-1 uppercase">Readiness</div>
            <div className="text-primary font-bold">READY</div>
          </div>
          <div className="p-2 rounded bg-muted/20 border border-border/50">
            <div className="text-muted-foreground mb-1 uppercase">Integrity</div>
            <div className="text-foreground font-bold">94.2%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
