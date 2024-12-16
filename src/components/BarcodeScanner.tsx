import { useZxing } from "react-zxing";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ScannerControls } from "./scanner/ScannerControls";
import { ScannerPreview } from "./scanner/ScannerPreview";
import { ScannerFeedback } from "./scanner/ScannerFeedback";

export const BarcodeScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [lastScannedCode, setLastScannedCode] = useState<string>("");
  const [showOverlay, setShowOverlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
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
      if (audioRef.current) {
        audioRef.current.play().catch(console.error);
      }

      setShowOverlay(true);
      setTimeout(() => setShowOverlay(false), 1000);

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

      const { error: scanError } = await supabase
        .from("scan_counts")
        .insert({
          inventory_id: inventoryItem.id,
          count: quantity,
          scanned_by: (await supabase.auth.getUser()).data.user?.id,
        });

      if (scanError) throw scanError;

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
      setQuantity(1);
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
      <ScannerControls
        quantity={quantity}
        setQuantity={setQuantity}
        devices={devices}
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
      />
      
      {isScanning ? (
        <ScannerPreview
          videoRef={ref}
          showOverlay={showOverlay}
          onCancel={() => setIsScanning(false)}
        />
      ) : (
        <Button
          className="w-full bg-soft-blue hover:bg-soft-blue/90 text-gray-800"
          onClick={handleStartScanning}
        >
          Scan Barcode
        </Button>
      )}

      <ScannerFeedback lastScannedCode={lastScannedCode} />
    </div>
  );
};