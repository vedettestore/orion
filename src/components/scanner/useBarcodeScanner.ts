import { useCallback } from "react";
import { useZxing } from "react-zxing";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";
import { toast } from "@/components/ui/use-toast";

interface UseBarcodeScannerProps {
  selectedDevice: string;
  onScan?: (barcode: string) => void;
  onSuccess: (code: string) => void;
}

export const useBarcodeScanner = ({ selectedDevice, onScan, onSuccess }: UseBarcodeScannerProps) => {
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
  hints.set(DecodeHintType.TRY_HARDER, true);
  hints.set(DecodeHintType.ASSUME_GS1, true);
  hints.set(DecodeHintType.CHARACTER_SET, "UTF-8");

  const { ref } = useZxing({
    onDecodeResult(result) {
      const scannedCode = result.getText();
      console.log("Barcode scanned:", scannedCode);
      if (onScan) {
        onScan(scannedCode);
      }
      onSuccess(scannedCode);
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
        facingMode: "environment",
        width: { ideal: 1280 },
        height: { ideal: 720 },
        aspectRatio: { ideal: 1.7777777778 },
        frameRate: { ideal: 30 },
      },
    },
    timeBetweenDecodingAttempts: 150,
    hints,
  });

  return { ref };
};