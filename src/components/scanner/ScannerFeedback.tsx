interface ScannerFeedbackProps {
  lastScannedCode: string;
}

export const ScannerFeedback = ({ lastScannedCode }: ScannerFeedbackProps) => {
  if (!lastScannedCode) return null;
  
  return (
    <div className="text-sm text-gray-500 text-center">
      Last scanned: {lastScannedCode}
    </div>
  );
};