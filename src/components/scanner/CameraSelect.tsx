import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CameraSelectProps {
  devices: MediaDeviceInfo[];
  selectedDevice: string;
  onDeviceChange: (deviceId: string) => void;
}

export const CameraSelect = ({
  devices,
  selectedDevice,
  onDeviceChange,
}: CameraSelectProps) => {
  if (devices.length <= 1) return null;

  return (
    <Select value={selectedDevice} onValueChange={onDeviceChange}>
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
  );
};