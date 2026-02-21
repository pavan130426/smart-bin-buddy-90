import DashboardHeader from "@/components/DashboardHeader";
import HeroBanner from "@/components/HeroBanner";
import StatsGrid from "@/components/StatsGrid";
import BinGrid from "@/components/BinGrid";
import AlertsFeed from "@/components/AlertsFeed";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <DashboardHeader />
        <main className="space-y-6">
          <HeroBanner />
          <StatsGrid />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <BinGrid />
            </div>
            <div className="lg:col-span-2">
              <AlertsFeed />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
