import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { ComboboxDemo } from "./SkuCombobox";

interface CreatePurchaseOrderProps {
  onSuccess: () => void;
}

export function CreatePurchaseOrder({ onSuccess }: CreatePurchaseOrderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [selectedItems, setSelectedItems] = useState<Array<{ sku: string; quantity: number }>>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleAddItem = () => {
    setSelectedItems([...selectedItems, { sku: "", quantity: 1 }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate a unique PO number (you might want to implement a more sophisticated system)
      const poNumber = `PO-${Date.now()}`;

      const { data: orderData, error: orderError } = await supabase
        .from("purchase_orders")
        .insert([
          {
            po_number: poNumber,
            customer_name: customerName,
            status: "draft",
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Add order items
      const { error: itemsError } = await supabase.from("purchase_order_items").insert(
        selectedItems.map((item) => ({
          purchase_order_id: orderData.id,
          // Note: In a real app, you'd want to properly link this to your inventory items
          quantity: item.quantity,
        }))
      );

      if (itemsError) throw itemsError;

      toast({
        title: "Success",
        description: "Purchase order created successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["purchaseOrders"] });
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create purchase order",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-4">
          {selectedItems.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-1">
                <ComboboxDemo
                  value={item.sku}
                  onChange={(value) => {
                    const newItems = [...selectedItems];
                    newItems[index].sku = value;
                    setSelectedItems(newItems);
                  }}
                />
              </div>
              <div className="w-24">
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => {
                    const newItems = [...selectedItems];
                    newItems[index].quantity = parseInt(e.target.value);
                    setSelectedItems(newItems);
                  }}
                  required
                />
              </div>
            </div>
          ))}
        </div>

        <Button type="button" variant="outline" onClick={handleAddItem}>
          Add Item
        </Button>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Order
        </Button>
      </div>
    </form>
  );
}