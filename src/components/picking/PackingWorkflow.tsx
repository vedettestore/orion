import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const PackingWorkflow = () => {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["packing-lists", "to-pack"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packing_lists")
        .select("*, packing_list_items(*, inventory(*))")
        .eq("status", "picked");

      if (error) throw error;
      return data;
    },
  });

  const handleScan = async (barcode: string) => {
    if (!selectedOrder) {
      toast.error("Please select an order first");
      return;
    }

    // Update the packed status in packing_list_items
    const { error } = await supabase
      .from("packing_list_items")
      .update({ status: "packed" })
      .eq("packing_list_id", selectedOrder)
      .eq("inventory.barcode", barcode);

    if (error) {
      toast.error("Failed to update pack status");
      return;
    }

    toast.success("Item packed successfully");
  };

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Select Order to Pack</h3>
          {orders?.map((order) => (
            <Button
              key={order.id}
              variant={selectedOrder === order.id ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => setSelectedOrder(order.id)}
            >
              Order #{order.order_number}
            </Button>
          ))}
        </div>
        <div>
          {selectedOrder && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Scan Items</h3>
              <BarcodeScanner onScan={handleScan} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};