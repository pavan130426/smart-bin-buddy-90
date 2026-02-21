import { useState, useRef, useCallback } from "react";
import { Camera, Upload, Loader2, Recycle, Leaf, Trash2, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ClassificationResult {
  category: "Biodegradable" | "Recyclable" | "Non-Biodegradable" | "Unknown";
  confidence: number;
  item: string;
  details: string;
}

const categoryConfig = {
  Biodegradable: { icon: Leaf, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/30" },
  Recyclable: { icon: Recycle, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30" },
  "Non-Biodegradable": { icon: Trash2, color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/30" },
  Unknown: { icon: Trash2, color: "text-muted-foreground", bg: "bg-muted/10", border: "border-muted/30" },
};

const WasteDetection = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const classify = useCallback(async (base64: string) => {
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("classify-waste", {
        body: { image: base64 },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data as ClassificationResult);
    } catch (e: any) {
      toast.error(e.message || "Classification failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      stopCamera();
      classify(base64);
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: 640, height: 480 },
      });
      setStream(mediaStream);
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch {
      toast.error("Could not access camera");
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    setCameraActive(false);
  };

  const capture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d")!.drawImage(videoRef.current, 0, 0);
    const base64 = canvas.toDataURL("image/jpeg", 0.8);
    setPreview(base64);
    stopCamera();
    classify(base64);
  };

  const reset = () => {
    setPreview(null);
    setResult(null);
    stopCamera();
  };

  const config = result ? categoryConfig[result.category] || categoryConfig.Unknown : null;
  const Icon = config?.icon;

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Waste Detection</h1>
            <p className="text-sm text-muted-foreground">AI-powered waste classification using CNN-equivalent vision model</p>
          </div>
        </div>

        {/* Camera / Preview Area */}
        <Card className="glass-card overflow-hidden">
          <CardContent className="p-0 relative">
            {cameraActive ? (
              <div className="relative">
                <video ref={videoRef} autoPlay playsInline muted className="w-full aspect-[4/3] object-cover" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                  <Button onClick={capture} className="gap-2">
                    <Camera className="w-4 h-4" /> Capture & Predict
                  </Button>
                  <Button variant="secondary" onClick={stopCamera}>
                    Stop Camera
                  </Button>
                </div>
              </div>
            ) : preview ? (
              <div className="relative">
                <img src={preview} alt="Waste preview" className="w-full aspect-[4/3] object-contain bg-card" />
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-card/80" onClick={reset}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground">
                <div className="p-4 rounded-full bg-primary/10">
                  <Camera className="w-10 h-10 text-primary" />
                </div>
                <p className="text-sm">Upload an image or use your camera to classify waste</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {!cameraActive && !loading && (
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="gap-2 glow-border" onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-4 h-4" /> Upload Image
            </Button>
            <Button className="gap-2" onClick={startCamera}>
              <Camera className="w-4 h-4" /> Live Camera
            </Button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </div>
        )}

        {/* Loading */}
        {loading && (
          <Card className="glass-card">
            <CardContent className="flex items-center justify-center gap-3 py-8">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
              <span className="text-muted-foreground">Classifying waste...</span>
            </CardContent>
          </Card>
        )}

        {/* Result */}
        {result && config && Icon && (
          <Card className={`glass-card border ${config.border}`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className={`p-2 rounded-lg ${config.bg}`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div>
                  <span className={config.color}>{result.category}</span>
                  <p className="text-sm text-muted-foreground font-normal mt-0.5">{result.item}</p>
                </div>
                <span className={`ml-auto text-2xl font-bold ${config.color}`}>{result.confidence}%</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{result.details}</p>
            </CardContent>
          </Card>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default WasteDetection;
