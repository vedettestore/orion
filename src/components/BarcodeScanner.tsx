import { useZxing } from "react-zxing";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export const BarcodeScanner = () => {
  const [isScanning, setIsScanning] = useState(false);

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
  });

  return (
    <div className="w-full max-w-md mx-auto">
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
          onClick={() => setIsScanning(true)}
        >
          Scan Barcode
        </Button>
      )}
    </div>
  );
};