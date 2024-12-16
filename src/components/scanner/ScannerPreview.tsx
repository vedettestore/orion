import { Button } from "@/components/ui/button";

interface ScannerPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  onCancel: () => void;
}

export const ScannerPreview = ({ videoRef, onCancel }: ScannerPreviewProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Video element */}
      <video 
        ref={videoRef} 
        className="w-full rounded-lg"
        style={{ 
          maxHeight: "400px",
          objectFit: "cover"
        }} 
      />

      {/* Dark overlay with transparent center */}
      <div className="absolute inset-0 bg-black/50">
        {/* Scanning window */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-48 bg-transparent">
          {/* Corner markers */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-soft-orange"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-soft-orange"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-soft-orange"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-soft-orange"></div>
          
          {/* Scanning line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-soft-orange/70 animate-scan"></div>
        </div>

        {/* Helper text */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-12 text-white text-sm text-center bg-black/40 px-4 py-2 rounded-full">
          Position barcode within the frame
        </div>
      </div>

      {/* Cancel button */}
      <Button
        variant="secondary"
        className="absolute top-2 right-2"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  );
};