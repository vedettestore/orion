import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";

type PurchaseOrder = {
  id: number;
  po_number: string;
  customer_name: string;
  order_total: number;
  status: string;
  shipping_status: string;
  date_ordered: string;
};

export const purchasingColumns = (
  onShipmentClick: (orderId: number) => void
): ColumnDef<PurchaseOrder>[] => [
  {
    accessorKey: "po_number",
    header: "PO#",
  },
  {
    accessorKey: "customer_name",
    header: "Customer Name",
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
            onClick={() => onShipmentClick(row.original.id)}
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