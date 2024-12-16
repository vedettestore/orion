import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreatePurchaseOrder } from "@/components/purchasing/CreatePurchaseOrder";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

type PurchaseOrder = {
  id: number;
  po_number: string;
  customer_name: string;
  order_total: number;
  status: string;
  date_ordered: string;
};

const columns: ColumnDef<PurchaseOrder>[] = [
  {
    accessorKey: "po_number",
    header: "PO#",
  },
  {
    accessorKey: "customer_name",
    header: "Customer",
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
          variant={status === "draft" ? "secondary" : status === "completed" ? "default" : "destructive"}
        >
          {status}
        </Badge>
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

export default function Purchasing() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Purchase Orders</h1>
          <p className="text-muted-foreground">Manage your purchase orders</p>
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
    </div>
  );
}