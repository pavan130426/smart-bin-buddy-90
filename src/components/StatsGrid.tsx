import { Trash2, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  variant?: "default" | "warning" | "success" | "accent";
}

const variantStyles = {
  default: "text-primary border-primary/20",
  warning: "text-warning border-warning/20",
  success: "text-success border-success/20",
  accent: "text-accent border-accent/20",
};

const StatCard = ({ title, value, subtitle, icon, variant = "default" }: StatCardProps) => (
  <div className="glass-card p-6 group hover:glow-border transition-all duration-300">
    <div className="flex items-start justify-between mb-4">
      <p className="text-sm text-muted-foreground font-medium">{title}</p>
      <div className={`p-2 rounded-lg bg-secondary ${variantStyles[variant]}`}>
        {icon}
      </div>
    </div>
    <p className="text-3xl font-bold font-display text-foreground">{value}</p>
    <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
  </div>
);

const statsData = [
  { title: "Total Bins Monitored", value: 248, subtitle: "+12 this week", icon: <Trash2 className="w-4 h-4" />, variant: "default" as const },
  { title: "Alerts Active", value: 17, subtitle: "3 critical", icon: <AlertTriangle className="w-4 h-4" />, variant: "warning" as const },
  { title: "Collections Today", value: 34, subtitle: "89% on schedule", icon: <CheckCircle className="w-4 h-4" />, variant: "success" as const },
  { title: "Detection Rate", value: "97.3%", subtitle: "+2.1% vs last month", icon: <TrendingUp className="w-4 h-4" />, variant: "accent" as const },
];

const StatsGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {statsData.map((stat) => (
      <StatCard key={stat.title} {...stat} />
    ))}
  </div>
);

export default StatsGrid;
