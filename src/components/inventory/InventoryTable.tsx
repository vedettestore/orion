import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductCell } from "./ProductCell";
import { StatusBadge } from "./StatusBadge";
import { ActionButtons } from "./ActionButtons";
import { EditInventoryForm } from "./EditInventoryForm";

interface InventoryItem {
  id: number;
  name: string;
  type?: string;
  sku?: string;
  status?: string;
  "image url"?: string;
  quantity?: number;
  barcode?: string;
}

interface InventoryTableProps {
  data: InventoryItem[];
  isLoading: boolean;
}

export const InventoryTable = ({ data, isLoading }: InventoryTableProps) => {
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-semibold">Product</TableHead>
              <TableHead className="font-semibold">Type</TableHead>
              <TableHead className="font-semibold">SKU</TableHead>
              <TableHead className="font-semibold">Quantity</TableHead>
              <TableHead className="font-semibold">UPC</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="w-[100px] font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50/50">
                <ProductCell name={item.name} imageUrl={item["image url"]} />
                <TableCell className="text-gray-600">{item.type || "N/A"}</TableCell>
                <TableCell className="text-gray-600">{item.sku || "N/A"}</TableCell>
                <TableCell className="text-gray-600">{item.quantity || 0}</TableCell>
                <TableCell className="text-gray-600">{item.barcode || "N/A"}</TableCell>
                <StatusBadge status={item.status || ""} />
                <ActionButtons onEdit={() => setEditingItem(item)} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingItem && (
        <EditInventoryForm
          item={editingItem}
          open={!!editingItem}
          onOpenChange={(open) => !open && setEditingItem(null)}
        />
      )}
    </>
  );
};