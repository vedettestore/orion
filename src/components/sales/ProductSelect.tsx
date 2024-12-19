import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ComboboxDemo } from "@/components/purchasing/SkuCombobox";

interface ProductSelectProps {
  onAddProduct: (product: { sku: string; quantity: number }) => void;
}

export function ProductSelect({ onAddProduct }: ProductSelectProps) {
  const [selectedSku, setSelectedSku] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (selectedSku) {
      onAddProduct({ sku: selectedSku, quantity });
      setSelectedSku("");
      setQuantity(1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <ComboboxDemo
          value={selectedSku}
          onChange={(value) => setSelectedSku(value)}
        />
      </div>
      <div className="w-full md:w-32">
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          placeholder="Quantity"
        />
      </div>
      <Button type="button" onClick={handleAdd} disabled={!selectedSku}>
        Add Product
      </Button>
    </div>
  );
}