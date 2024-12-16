import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";

interface ShipmentDetailsProps {
  purchaseOrderId: number;
}

export function ShipmentDetails({ purchaseOrderId }: ShipmentDetailsProps) {
  const queryClient = useQueryClient();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState("");

  const { data: shipment, isLoading } = useQuery({
    queryKey: ["shipment", purchaseOrderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("shipments")
        .select("*, shipment_events(*)")
        .eq("purchase_order_id", purchaseOrderId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { mutate: createShipment } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from("shipments")
        .insert([
          {
            purchase_order_id: purchaseOrderId,
            tracking_number: trackingNumber,
            carrier,
            status: "pending",
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipment", purchaseOrderId] });
      toast.success("Shipment created successfully");
    },
    onError: () => {
      toast.error("Failed to create shipment");
    },
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: async (status: string) => {
      if (!shipment) return;

      const { error: shipmentError } = await supabase
        .from("shipments")
        .update({ status })
        .eq("id", shipment.id);

      if (shipmentError) throw shipmentError;

      const { error: eventError } = await supabase
        .from("shipment_events")
        .insert([
          {
            shipment_id: shipment.id,
            status,
            description: `Shipment status updated to ${status}`,
          },
        ]);

      if (eventError) throw eventError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shipment", purchaseOrderId] });
      toast.success("Status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });

  if (isLoading) {
    return <div>Loading shipment details...</div>;
  }

  return (
    <div className="space-y-6">
      {!shipment ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="tracking">Tracking Number</Label>
            <Input
              id="tracking"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="carrier">Carrier</Label>
            <Input
              id="carrier"
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
            />
          </div>
          <Button onClick={() => createShipment()}>Create Shipment</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tracking Number</Label>
              <p className="text-lg font-medium">{shipment.tracking_number}</p>
            </div>
            <div>
              <Label>Carrier</Label>
              <p className="text-lg font-medium">{shipment.carrier}</p>
            </div>
          </div>
          <div>
            <Label>Status</Label>
            <div className="flex gap-2 mt-2">
              <Button
                variant={shipment.status === "pending" ? "default" : "outline"}
                onClick={() => updateStatus("pending")}
              >
                Pending
              </Button>
              <Button
                variant={shipment.status === "in_transit" ? "default" : "outline"}
                onClick={() => updateStatus("in_transit")}
              >
                In Transit
              </Button>
              <Button
                variant={shipment.status === "delivered" ? "default" : "outline"}
                onClick={() => updateStatus("delivered")}
              >
                Delivered
              </Button>
            </div>
          </div>
          <div>
            <Label>Event History</Label>
            <div className="space-y-2 mt-2">
              {shipment.shipment_events?.map((event: any) => (
                <div
                  key={event.id}
                  className="p-3 border rounded-lg bg-muted/50"
                >
                  <p className="font-medium">{event.status}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(event.timestamp).toLocaleString()}
                  </p>
                  <p className="text-sm">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}