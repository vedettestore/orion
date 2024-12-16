import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ScannerControlsProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  devices: MediaDeviceInfo[];
  selectedDevice: string;
  setSelectedDevice: (deviceId: string) => void;
}

export const ScannerControls = ({
  quantity,
  setQuantity,
  devices,
  selectedDevice,
  setSelectedDevice,
}: ScannerControlsProps) => {
  return (
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
  );
};