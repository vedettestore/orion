import { Button } from "@/components/ui/button";

interface ScannerPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  showOverlay: boolean;
  onCancel: () => void;
}

export const ScannerPreview = ({
  videoRef,
  showOverlay,
  onCancel,
}: ScannerPreviewProps) => {
  return (
    <div className="relative">
      <video ref={videoRef} className="w-full rounded-lg" />
      {showOverlay && (
        <div className="absolute inset-0 bg-green-500 bg-opacity-20 animate-fade-out flex items-center justify-center">
          <div className="text-white text-2xl font-bold animate-scale-in">
            Scanned!
          </div>
        </div>
      )}
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