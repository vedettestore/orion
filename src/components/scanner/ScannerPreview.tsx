import { Button } from "@/components/ui/button";

interface ScannerPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  onCancel: () => void;
}

export const ScannerPreview = ({ videoRef, onCancel }: ScannerPreviewProps) => {
  return (
    <div className="relative">
      <video ref={videoRef} className="w-full rounded-lg" />
      
      {/* Scanning target overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-4/5 h-1/3 border-2 border-soft-orange rounded-lg relative">
          {/* Horizontal scanning line animation */}
          <div className="absolute left-0 right-0 h-0.5 bg-soft-orange animate-[scan_2s_ease-in-out_infinite]" />
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