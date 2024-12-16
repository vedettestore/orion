import { Button } from "@/components/ui/button";

interface ScannerPreviewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  onCancel: () => void;
}

export const ScannerPreview = ({ videoRef, onCancel }: ScannerPreviewProps) => {
  return (
    <div className="relative">
      <video ref={videoRef} className="w-full rounded-lg" />
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