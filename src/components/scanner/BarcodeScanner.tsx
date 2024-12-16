import { useState, useEffect } from "react";
import { useZxing } from "react-zxing";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Barcode } from "lucide-react";
import { CameraSelect } from "./CameraSelect";
import { QuantityInput } from "./QuantityInput";
import { ScannerPreview } from "./ScannerPreview";

interface BarcodeScannerProps {
  onScan?: (barcode: string) => void;
}

export const BarcodeScanner = ({ onScan }: BarcodeScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [lastScannedCode, setLastScannedCode] = useState<string>("");

  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDevice(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error("Error getting devices:", error);
        toast({
          variant: "destructive",
          title: "Camera Error",
          description: "Unable to access camera devices",
        });
      }
    };

    getDevices();
  }, []);

  const { ref } = useZxing({
    onDecodeResult(result) {
      const scannedCode = result.getText();
      if (onScan) {
        onScan(scannedCode);
      }
      setLastScannedCode(scannedCode);
      setIsScanning(false);
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error scanning barcode",
        description: "Please try again",
      });
    },
    constraints: {
      video: {
        deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
      }
    },
  });

  const handleStartScanning = async () => {
    try {
      const permission = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (permission) {
        setIsScanning(true);
      }
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
          onCancel={() => setIsScanning(false)}
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