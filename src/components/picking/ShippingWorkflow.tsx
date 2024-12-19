import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const ShippingWorkflow = () => {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["packing-lists", "to-ship"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packing_lists")
        .select("*, packing_list_items(*, inventory(*))")
        .eq("status", "packed");

      if (error) throw error;
      return data;
    },
  });

  const { mutate: shipOrder } = useMutation({
    mutationFn: async (orderId: number) => {
      const { error } = await supabase
        .from("packing_lists")
        .update({ status: "shipped" })
        .eq("id", orderId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packing-lists"] });
      toast.success("Order marked as shipped");
      setSelectedOrder(null);
    },
    onError: () => {
      toast.error("Failed to update shipping status");
    },
  });

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Select Order to Ship</h3>
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
              <h3 className="text-lg font-semibold">Ship Order</h3>
              <Button 
                onClick={() => shipOrder(selectedOrder)}
                className="w-full"
              >
                Mark as Shipped
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};