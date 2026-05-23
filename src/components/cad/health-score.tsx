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
    <Card className={cn("bg-card/30 border-primary/20", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-code uppercase tracking-widest text-muted-foreground">Drawing Health</CardTitle>
        <CardDescription>Aggregate compliance score</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-4">
        <div className="relative size-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={65}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                startAngle={225}
                endAngle={-45}
                stroke="none"
              >
                <Cell fill={getColor(score)} />
                <Cell fill="hsl(var(--muted)/0.2)" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-5xl font-headline font-bold">{score}</span>
            <span className="text-xs font-code text-muted-foreground">Compliance index</span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 w-full">
          <div className="p-3 rounded-md bg-muted/20 border border-border/50 text-center">
            <div className="text-xs text-muted-foreground font-code mb-1">Status</div>
            <div className={cn("font-medium", score >= 70 ? "text-primary" : "text-destructive")}>
              {score >= 90 ? "Optimal" : score >= 70 ? "Warning" : "Critical"}
            </div>
          </div>
          <div className="p-3 rounded-md bg-muted/20 border border-border/50 text-center">
            <div className="text-xs text-muted-foreground font-code mb-1">Files</div>
            <div className="font-medium">1.2 GB</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
