import { Input } from "@/components/ui/input";

interface QuantityInputProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export const QuantityInput = ({ quantity, onQuantityChange }: QuantityInputProps) => {
  return (
    <Input
      type="number"
      min="1"
      value={quantity}
      onChange={(e) => onQuantityChange(parseInt(e.target.value) || 1)}
      className="w-24"
      placeholder="Qty"
    />
  );
};