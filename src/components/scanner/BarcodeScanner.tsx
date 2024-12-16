import { useZxing } from "react-zxing";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Barcode } from "lucide-react";
import { CameraSelect } from "./CameraSelect";
import { QuantityInput } from "./QuantityInput";
import { ScannerPreview } from "./ScannerPreview";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";

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

    // Request camera permission first
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => getDevices())
      .catch((error) => {
        console.error("Camera permission denied:", error);
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please allow camera access to scan barcodes",
        });
      });
  }, []);

  const hints = new Map();
  hints.set(DecodeHintType.POSSIBLE_FORMATS, [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
  ]);

  const { ref } = useZxing({
    onDecodeResult(result) {
      const scannedCode = result.getText();
      console.log("Barcode scanned:", scannedCode); // Debug log
      if (onScan) {
        onScan(scannedCode);
      }
      setLastScannedCode(scannedCode);
      toast({
        title: "Barcode Scanned",
        description: `Code: ${scannedCode}`,
      });
      setIsScanning(false);
    },
    onError(error) {
      console.error("Scanning error:", error);
      toast({
        variant: "destructive",
        title: "Error scanning barcode",
        description: "Please try again",
      });
    },
    constraints: {
      video: {
        deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
        facingMode: "environment", // Prefer back camera on mobile devices
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    },
    timeBetweenDecodingAttempts: 300,
    hints,
  });

  const handleStartScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
          facingMode: "environment",
        },
      });
      if (stream) {
        setIsScanning(true);
        console.log("Camera stream started"); // Debug log
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