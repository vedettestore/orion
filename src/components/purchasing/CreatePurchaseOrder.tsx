import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { ShippingDetailsForm } from "./ShippingDetailsForm";
import { LineItems } from "./LineItems";
import { FormActions } from "./FormActions";

interface CreatePurchaseOrderProps {
  onSuccess: () => void;
}

export function CreatePurchaseOrder({ onSuccess }: CreatePurchaseOrderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [selectedItems, setSelectedItems] = useState<
    Array<{ sku: string; quantity: number }>
  >([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const poNumber = `PO-${Date.now()}`;

      const { data: orderData, error: orderError } = await supabase
        .from("purchase_orders")
        .insert([
          {
            po_number: poNumber,
            customer_name: customerName,
            shipping_address: shippingAddress,
            shipping_method: shippingMethod,
            status: "draft",
            shipping_status: "pending",
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      const { error: itemsError } = await supabase
        .from("purchase_order_items")
        .insert(
          selectedItems.map((item) => ({
            purchase_order_id: orderData.id,
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
      <ShippingDetailsForm
        customerName={customerName}
        shippingAddress={shippingAddress}
        shippingMethod={shippingMethod}
        onCustomerNameChange={setCustomerName}
        onShippingAddressChange={setShippingAddress}
        onShippingMethodChange={setShippingMethod}
      />

      <LineItems items={selectedItems} onItemChange={setSelectedItems} />

      <FormActions isLoading={isLoading} onCancel={onSuccess} />
    </form>
  );
}