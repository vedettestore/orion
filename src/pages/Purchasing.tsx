import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreatePurchaseOrder } from "@/components/purchasing/CreatePurchaseOrder";
import { ShipmentDetails } from "@/components/shipping/ShipmentDetails";
import { Badge } from "@/components/ui/badge";
import { Loader2, Truck } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

type PurchaseOrder = {
  id: number;
  po_number: string;
  customer_name: string;
  order_total: number;
  status: string;
  shipping_status: string;
  date_ordered: string;
};

export default function Purchasing() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isShipmentDialogOpen, setIsShipmentDialogOpen] = useState(false);

  const columns: ColumnDef<PurchaseOrder>[] = [
    {
      accessorKey: "po_number",
      header: "PO#",
    },
    {
      accessorKey: "customer_name",
      header: "Customer Name", // Changed from "Customer" to "Customer Name"
    },
    {
      accessorKey: "order_total",
      header: "Order Total",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("order_total"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return formatted;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            variant={
              status === "draft"
                ? "secondary"
                : status === "completed"
                ? "default"
                : "destructive"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "shipping_status",
      header: "Shipping",
      cell: ({ row }) => {
        const status = row.getValue("shipping_status") as string;
        return (
          <div className="flex items-center gap-2">
            <Badge
              variant={
                status === "delivered"
                  ? "default"
                  : status === "in_transit"
                  ? "secondary"
                  : "outline"
              }
            >
              {status}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedOrderId(row.original.id);
                setIsShipmentDialogOpen(true);
              }}
            >
              <Truck className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: "date_ordered",
      header: "Date Ordered",
      cell: ({ row }) => {
        return format(new Date(row.getValue("date_ordered")), "MMM dd, yyyy");
      },
    },
  ];

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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Purchase Orders
              </h1>
              <p className="text-muted-foreground">
                Manage your purchase orders and shipments
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Place New Order</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Create Purchase Order</DialogTitle>
                </DialogHeader>
                <CreatePurchaseOrder onSuccess={() => setIsDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>

          <DataTable columns={columns} data={purchaseOrders || []} />

          <Dialog
            open={isShipmentDialogOpen}
            onOpenChange={setIsShipmentDialogOpen}
          >
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Manage Shipment</DialogTitle>
              </DialogHeader>
              {selectedOrderId && (
                <ShipmentDetails purchaseOrderId={selectedOrderId} />
              )}
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </SidebarProvider>
  );
}
