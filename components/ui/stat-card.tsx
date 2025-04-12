import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color: "purple" | "blue" | "cyan" | "green"
}

export function StatCard({ title, value, icon: Icon, trend, color }: StatCardProps) {
  return (
    <div className={`stat-card ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-1 text-2xl font-bold">{value}</h3>
          {trend && (
            <p className={`mt-1 text-xs ${trend.isPositive ? "text-brand-green" : "text-red-500"}`}>
              {trend.isPositive ? "+" : "-"}
              {trend.value}% from last period
            </p>
          )}
        </div>
        <div
          className={`h-12 w-12 rounded-full bg-${color === "purple" ? "brand-purple" : color === "blue" ? "brand-blue" : color === "cyan" ? "brand-cyan" : "brand-green"}/10 flex items-center justify-center`}
        >
          <Icon
            className={`h-6 w-6 text-${color === "purple" ? "brand-purple" : color === "blue" ? "brand-blue" : color === "cyan" ? "brand-cyan" : "brand-green"}`}
          />
        </div>
      </div>
    </div>
  )
}
