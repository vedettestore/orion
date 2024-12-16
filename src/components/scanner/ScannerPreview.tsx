import { Button } from "@/components/ui/button";

interface ScannerPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  onCancel: () => void;
}

export const ScannerPreview = ({ videoRef, onCancel }: ScannerPreviewProps) => {
  return (
    <div className="relative">
      <video ref={videoRef} className="w-full rounded-lg" />
      
      {/* Dark overlay with transparent scanning window */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="relative">
          {/* Scanning window */}
          <div className="w-64 h-48 border-2 border-soft-orange rounded-lg relative overflow-hidden">
            {/* Clear the background in scanning area */}
            <div className="absolute inset-0 bg-transparent" />
            
            {/* Corner markers for better alignment */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-soft-orange" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-soft-orange" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-soft-orange" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-soft-orange" />
            
            {/* Scanning line animation */}
            <div className="absolute left-0 right-0 h-0.5 bg-soft-orange animate-[scan_2s_ease-in-out_infinite]" />
          </div>
          
          {/* Helper text */}
          <p className="text-white text-sm text-center mt-2">
            Align barcode within the frame
          </p>
        </div>
      </div>
      
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