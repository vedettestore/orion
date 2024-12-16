import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Barcode } from "lucide-react";
import { CameraSelect } from "./CameraSelect";
import { QuantityInput } from "./QuantityInput";
import { ScannerPreview } from "./ScannerPreview";
import { useCameraDevices } from "./useCameraDevices";
import { useBarcodeScanner } from "./useBarcodeScanner";
import { useBeepSound } from "./useBeepSound";

interface BarcodeScannerProps {
  onScan?: (barcode: string) => void;
}

export const BarcodeScanner = ({ onScan }: BarcodeScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [lastScannedCode, setLastScannedCode] = useState<string>("");
  const { devices, selectedDevice, setSelectedDevice } = useCameraDevices();
  const { playBeep } = useBeepSound();
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleScanSuccess = (scannedCode: string) => {
    playBeep();
    setLastScannedCode(scannedCode);
    if (onScan) {
      onScan(scannedCode);
    }
    stopScanning();
  };

  const { ref } = useBarcodeScanner({
    selectedDevice,
    onScan,
    onSuccess: handleScanSuccess,
    enabled: isScanning,
  });

  const stopScanning = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsScanning(false);
  };

  const handleStartScanning = async () => {
    try {
      if (stream) {
        stopScanning();
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      setStream(newStream);
      setIsScanning(true);
      console.log("Camera stream started successfully");
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        variant: "destructive",
        title: "Camera Access Error",
        description: "Please allow camera access to scan barcodes",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="flex items-center gap-4">
        <QuantityInput quantity={quantity} onQuantityChange={setQuantity} />
        <CameraSelect
          devices={devices}
          selectedDevice={selectedDevice}
          onDeviceChange={setSelectedDevice}
        />
      </div>
      
      {isScanning ? (
        <ScannerPreview
          videoRef={ref}
          onCancel={stopScanning}
        />
      ) : (
        <Button
          className="w-full bg-soft-purple hover:bg-soft-purple/90 text-gray-800"
          onClick={handleStartScanning}
        >
          <Barcode className="mr-2 h-4 w-4" />
          Scan Barcode
        </Button>
      )}

      {lastScannedCode && (
        <div className="text-sm text-gray-500 text-center">
          Last scanned: {lastScannedCode}
        </div>
      )}
    </div>
  );
};