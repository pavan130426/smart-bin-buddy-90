import { AlertTriangle, ArrowRight, Flame, Bug, Droplets } from "lucide-react";

interface Alert {
  id: string;
  binId: string;
  message: string;
  type: "overflow" | "contamination" | "fire" | "leak";
  time: string;
  severity: "low" | "medium" | "high";
}

const alerts: Alert[] = [
  { id: "1", binId: "BIN-006", message: "Hazardous bin critically full – immediate collection required", type: "overflow", time: "3 min ago", severity: "high" },
  { id: "2", binId: "BIN-002", message: "Contamination detected – wrong waste type in general bin", type: "contamination", time: "12 min ago", severity: "medium" },
  { id: "3", binId: "BIN-004", message: "Fill level rising faster than expected", type: "overflow", time: "28 min ago", severity: "medium" },
  { id: "4", binId: "BIN-009", message: "Potential fire hazard detected via thermal sensor", type: "fire", time: "1h ago", severity: "high" },
  { id: "5", binId: "BIN-012", message: "Liquid leak detected at base of organic bin", type: "leak", time: "2h ago", severity: "low" },
];

const typeIcons = {
  overflow: <AlertTriangle className="w-4 h-4" />,
  contamination: <Bug className="w-4 h-4" />,
  fire: <Flame className="w-4 h-4" />,
  leak: <Droplets className="w-4 h-4" />,
};

const severityStyles = {
  high: "border-l-destructive bg-destructive/5",
  medium: "border-l-warning bg-warning/5",
  low: "border-l-muted-foreground bg-muted/30",
};

const AlertsFeed = () => (
  <div className="glass-card p-6">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground">Detection Alerts</h2>
        <p className="text-sm text-muted-foreground">AI-powered anomaly detection</p>
      </div>
      <button className="flex items-center gap-1 text-xs text-primary hover:text-accent transition-colors">
        View All <ArrowRight className="w-3 h-3" />
      </button>
    </div>

    <div className="space-y-3">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`border-l-2 ${severityStyles[alert.severity]} rounded-r-lg p-3 flex items-start gap-3 transition-all hover:translate-x-1 duration-200`}
        >
          <div className="p-1.5 rounded-md bg-secondary text-muted-foreground mt-0.5">
            {typeIcons[alert.type]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-mono text-primary">{alert.binId}</span>
              <span className="text-[10px] text-muted-foreground">{alert.time}</span>
            </div>
            <p className="text-sm text-secondary-foreground leading-snug">{alert.message}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AlertsFeed;
