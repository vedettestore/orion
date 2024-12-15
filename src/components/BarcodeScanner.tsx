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

export const BarcodeScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");

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
      toast({
        title: "Barcode Scanned",
        description: `Code: ${scannedCode}`,
      });
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
      deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
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
    </div>
  );
};