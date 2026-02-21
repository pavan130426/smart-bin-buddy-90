import heroBanner from "@/assets/hero-banner.jpg";

const HeroBanner = () => (
  <div className="relative rounded-2xl overflow-hidden mb-6">
    <img
      src={heroBanner}
      alt="Smart waste detection system"
      className="w-full h-48 md:h-56 object-cover"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
    <div className="absolute inset-0 flex items-center p-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          Smart Waste <span className="text-gradient">Detection</span>
        </h2>
        <p className="text-sm text-muted-foreground max-w-md">
          AI-powered monitoring for cleaner cities. Real-time fill detection, contamination alerts, and optimized collection routes.
        </p>
      </div>
    </div>
  </div>
);

export default HeroBanner;
