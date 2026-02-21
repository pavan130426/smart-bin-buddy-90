import { Recycle, Bell, Settings, Search, ScanLine } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => (
  <header className="flex items-center justify-between py-4">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-primary/10 glow-border">
        <Recycle className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h1 className="text-xl font-display font-bold text-foreground tracking-tight">WasteGuard</h1>
        <p className="text-xs text-muted-foreground">Smart Detection System</p>
      </div>
    </div>

    <div className="flex items-center gap-2">
      <Link to="/detect">
        <Button variant="outline" size="sm" className="gap-2 glow-border">
          <ScanLine className="w-4 h-4" /> Detect Waste
        </Button>
      </Link>
      <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors">
        <Search className="w-4 h-4" />
      </button>
      <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors relative">
        <Bell className="w-4 h-4" />
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-card" />
      </button>
      <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors">
        <Settings className="w-4 h-4" />
      </button>
    </div>
  </header>
);

export default DashboardHeader;
