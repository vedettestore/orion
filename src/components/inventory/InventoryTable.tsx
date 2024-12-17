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
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InventoryItem {
  id: number;
  name: string;
  type?: string;
  sku?: string;
  status?: string;
  "image url"?: string;
  quantity?: number;
  barcode?: string;
  is_variant?: boolean;
  parent_id?: number | null;
}

interface InventoryTableProps {
  data: InventoryItem[];
  isLoading: boolean;
}

export const InventoryTable = ({ data, isLoading }: InventoryTableProps) => {
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Organize data into parent-child structure
  const mainProducts = data.filter(
    (item) => !item.is_variant && !item.parent_id
  );
  const variantsByParentId = data.reduce((acc, item) => {
    if (item.parent_id) {
      if (!acc[item.parent_id]) {
        acc[item.parent_id] = [];
      }
      acc[item.parent_id].push(item);
    }
    return acc;
  }, {} as Record<number, InventoryItem[]>);

  const toggleExpand = (itemId: number) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="w-[30px]"></TableHead>
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
            {mainProducts.map((item) => (
              <>
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-50/50 group"
                >
                  <TableCell className="w-[30px]">
                    {variantsByParentId[item.id]?.length > 0 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => toggleExpand(item.id)}
                      >
                        {expandedItems.includes(item.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </TableCell>
                  <ProductCell name={item.name} imageUrl={item["image url"]} />
                  <TableCell className="text-gray-600">
                    {item.type || "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-600 font-medium">
                    {item.sku || "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {item.quantity || 0}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {item.barcode || "N/A"}
                  </TableCell>
                  <StatusBadge status={item.status || ""} />
                  <ActionButtons onEdit={() => setEditingItem(item)} />
                </TableRow>
                {expandedItems.includes(item.id) &&
                  variantsByParentId[item.id]?.map((variant) => (
                    <TableRow
                      key={variant.id}
                      className="hover:bg-gray-50/50 bg-gray-50/30"
                    >
                      <TableCell className="w-[30px]"></TableCell>
                      <ProductCell
                        name={variant.name}
                        imageUrl={variant["image url"]}
                        isVariant
                      />
                      <TableCell className="text-gray-600">
                        {variant.type || "N/A"}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {variant.sku || "N/A"}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {variant.quantity || 0}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {variant.barcode || "N/A"}
                      </TableCell>
                      <StatusBadge status={variant.status || ""} />
                      <ActionButtons onEdit={() => setEditingItem(variant)} />
                    </TableRow>
                  ))}
              </>
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