import { useZxing } from "react-zxing";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export const BarcodeScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [lastScannedCode, setLastScannedCode] = useState<string>("");
  const [showOverlay, setShowOverlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/scan-beep.mp3');
    audioRef.current.preload = 'auto';

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

  const handleScanCount = async (scannedCode: string) => {
    try {
      // Play success sound
      if (audioRef.current) {
        audioRef.current.play().catch(console.error);
      }

      // Show visual feedback
      setShowOverlay(true);
      setTimeout(() => setShowOverlay(false), 1000);

      // First, check if the item exists in inventory
      const { data: inventoryItem, error: inventoryError } = await supabase
        .from("inventory")
        .select("id, name")
        .eq("upc_code", scannedCode)
        .single();

      if (inventoryError || !inventoryItem) {
        toast({
          variant: "destructive",
          title: "Item Not Found",
          description: "This UPC code is not registered in inventory",
        });
        return;
      }

      // Insert scan count
      const { error: scanError } = await supabase
        .from("scan_counts")
        .insert({
          inventory_id: inventoryItem.id,
          count: quantity,
          scanned_by: (await supabase.auth.getUser()).data.user?.id,
        });

      if (scanError) throw scanError;

      // Update inventory quantity
      const { error: updateError } = await supabase
        .from("inventory")
        .update({ quantity: quantity })
        .eq("id", inventoryItem.id);

      if (updateError) throw updateError;

      toast({
        title: "Count Saved",
        description: `Saved ${quantity} units of ${inventoryItem.name}`,
      });

      setLastScannedCode(scannedCode);
      setQuantity(1); // Reset quantity for next scan
    } catch (error) {
      console.error("Error saving scan count:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save scan count",
      });
    }
  };

  const { ref } = useZxing({
    onDecodeResult(result) {
      const scannedCode = result.getText();
      handleScanCount(scannedCode);
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