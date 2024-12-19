import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DataTable } from "@/components/ui/data-table";
import { Loader2 } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { purchasingColumns } from "@/components/purchasing/PurchasingColumns";
import { PurchasingHeader } from "@/components/purchasing/PurchasingHeader";
import { ShipmentDialog } from "@/components/purchasing/PurchasingDialogs";

export default function Purchasing() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isShipmentDialogOpen, setIsShipmentDialogOpen] = useState(false);

  const { data: purchaseOrders, isLoading } = useQuery({
    queryKey: ["purchaseOrders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("purchase_orders")
        .select("*")
        .order("date_ordered", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleShipmentClick = (orderId: number) => {
    setSelectedOrderId(orderId);
    setIsShipmentDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-8">
          <PurchasingHeader
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />

          <DataTable
            columns={purchasingColumns(handleShipmentClick)}
            data={purchaseOrders || []}
          />

          <ShipmentDialog
            isOpen={isShipmentDialogOpen}
            onOpenChange={setIsShipmentDialogOpen}
            orderId={selectedOrderId}
          />
        </main>
      </div>
    </SidebarProvider>
  );
}