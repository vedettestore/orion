import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChannelSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function ChannelSelect({ value, onChange }: ChannelSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select channel" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ecommerce">E-commerce</SelectItem>
        <SelectItem value="wholesale">Wholesale</SelectItem>
        <SelectItem value="retail">Retail</SelectItem>
      </SelectContent>
    </Select>
  );
}