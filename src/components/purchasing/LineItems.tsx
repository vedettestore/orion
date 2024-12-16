import { ComboboxDemo } from "./SkuCombobox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LineItem {
  sku: string;
  quantity: number;
}

interface LineItemsProps {
  items: LineItem[];
  onItemChange: (items: LineItem[]) => void;
}

export function LineItems({ items, onItemChange }: LineItemsProps) {
  const handleAddItem = () => {
    onItemChange([...items, { sku: "", quantity: 1 }]);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex-1">
            <ComboboxDemo
              value={item.sku}
              onChange={(value) => {
                const newItems = [...items];
                newItems[index].sku = value;
                onItemChange(newItems);
              }}
            />
          </div>
          <div className="w-24">
            <Input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].quantity = parseInt(e.target.value);
                onItemChange(newItems);
              }}
              required
            />
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={handleAddItem}>
        Add Item
      </Button>
    </div>
  );
}