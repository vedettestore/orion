import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Package2, Pencil, Eye, MoreVertical } from "lucide-react";
import { EditInventoryForm } from "./EditInventoryForm";

interface InventoryItem {
  id: number;
  name: string;
  type?: string;
  sku?: string;
  status?: string;
  "image url"?: string;
  quantity?: number;
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
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="w-[100px] font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50/50">
                <TableCell className="flex items-center gap-3">
                  {item["image url"] ? (
                    <img
                      src={item["image url"]}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded-lg border border-gray-200"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Package2 className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                  <span className="font-medium text-gray-900">{item.name}</span>
                </TableCell>
                <TableCell className="text-gray-600">{item.type || "N/A"}</TableCell>
                <TableCell className="text-gray-600">{item.sku || "N/A"}</TableCell>
                <TableCell className="text-gray-600">{item.quantity || 0}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.status === "In Stock" 
                      ? "bg-green-50 text-green-700"
                      : item.status === "Low Stock"
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-gray-50 text-gray-700"
                  }`}>
                    {item.status || "N/A"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-gray-100"
                      onClick={() => setEditingItem(item)}
                    >
                      <Pencil className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-gray-100"
                    >
                      <Eye className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-gray-100"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </TableCell>
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