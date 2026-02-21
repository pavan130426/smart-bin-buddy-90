import { MapPin } from "lucide-react";

interface WasteBin {
  id: string;
  location: string;
  fillLevel: number;
  type: "general" | "recycling" | "organic" | "hazardous";
  lastCollected: string;
  status: "normal" | "warning" | "critical";
}

const bins: WasteBin[] = [
  { id: "BIN-001", location: "Main St & 5th Ave", fillLevel: 23, type: "recycling", lastCollected: "2h ago", status: "normal" },
  { id: "BIN-002", location: "Central Park East", fillLevel: 87, type: "general", lastCollected: "6h ago", status: "critical" },
  { id: "BIN-003", location: "Market Square", fillLevel: 45, type: "organic", lastCollected: "3h ago", status: "normal" },
  { id: "BIN-004", location: "Harbor District", fillLevel: 72, type: "general", lastCollected: "5h ago", status: "warning" },
  { id: "BIN-005", location: "University Campus", fillLevel: 15, type: "recycling", lastCollected: "1h ago", status: "normal" },
  { id: "BIN-006", location: "Industrial Zone B", fillLevel: 91, type: "hazardous", lastCollected: "8h ago", status: "critical" },
  { id: "BIN-007", location: "Riverside Walk", fillLevel: 56, type: "organic", lastCollected: "4h ago", status: "warning" },
  { id: "BIN-008", location: "Tech Park Hub", fillLevel: 33, type: "recycling", lastCollected: "2h ago", status: "normal" },
];

const typeColors: Record<WasteBin["type"], string> = {
  general: "bg-muted-foreground/20 text-muted-foreground",
  recycling: "bg-primary/20 text-primary",
  organic: "bg-success/20 text-success",
  hazardous: "bg-destructive/20 text-destructive",
};

const statusIndicator: Record<WasteBin["status"], string> = {
  normal: "bg-success",
  warning: "bg-warning",
  critical: "bg-destructive animate-pulse",
};

const fillColor = (level: number) => {
  if (level >= 80) return "bg-destructive/80";
  if (level >= 60) return "bg-warning/80";
  return "bg-primary/80";
};

const BinGrid = () => (
  <div className="glass-card p-6">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground">Waste Bin Status</h2>
        <p className="text-sm text-muted-foreground">Real-time fill level monitoring</p>
      </div>
      <div className="flex gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" /> Normal</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning" /> Warning</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-destructive" /> Critical</span>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {bins.map((bin) => (
        <div
          key={bin.id}
          className="relative bg-secondary/50 rounded-lg p-4 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-muted-foreground">{bin.id}</span>
            <span className={`w-2 h-2 rounded-full ${statusIndicator[bin.status]}`} />
          </div>

          {/* Fill bar */}
          <div className="w-full h-20 bg-muted rounded-md overflow-hidden relative mb-3">
            <div
              className={`absolute bottom-0 left-0 right-0 ${fillColor(bin.fillLevel)} rounded-md transition-all duration-1000`}
              style={{ height: `${bin.fillLevel}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-display font-bold text-foreground drop-shadow-lg">
                {bin.fillLevel}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <MapPin className="w-3 h-3" />
            <span className="truncate">{bin.location}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${typeColors[bin.type]}`}>
              {bin.type}
            </span>
            <span className="text-[10px] text-muted-foreground">{bin.lastCollected}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default BinGrid;
