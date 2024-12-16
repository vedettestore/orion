import { useZxing } from "react-zxing";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          className="w-24"
          placeholder="Qty"
        />
        {devices.length > 1 && (
          <Select
            value={selectedDevice}
            onValueChange={(value) => setSelectedDevice(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select camera" />
            </SelectTrigger>
            <SelectContent>
              {devices.map((device) => (
                <SelectItem key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${device.deviceId.slice(0, 5)}...`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      
      {isScanning ? (
        <div className="relative">
          <video ref={ref} className="w-full rounded-lg" />
          <Button
            variant="secondary"
            className="absolute top-2 right-2"
            onClick={() => setIsScanning(false)}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          className="w-full bg-soft-blue hover:bg-soft-blue/90 text-gray-800"
          onClick={handleStartScanning}
        >
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