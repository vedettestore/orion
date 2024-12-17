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
import { cn } from "@/lib/utils";

interface InventoryItem {
  id: number;
  name: string;
  type?: string;
  sku?: string;
  status?: string;
  "image url"?: string;
  quantity?: number;
  is_variant?: boolean;
  parent_id?: number;
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

  const mainProducts = data.filter((item) => !item.is_variant);
  
  const getVariants = (parentId: number) => {
    return data.filter((item) => item.parent_id === parentId);
  };

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
              <TableHead className="w-8"></TableHead>
              <TableHead className="font-semibold">Product</TableHead>
              <TableHead className="font-semibold">Type</TableHead>
              <TableHead className="font-semibold">SKU</TableHead>
              <TableHead className="font-semibold">Quantity</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="w-[100px] font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mainProducts.map((item) => {
              const variants = getVariants(item.id);
              const isExpanded = expandedItems.includes(item.id);
              
              return (
                <>
                  <TableRow 
                    key={item.id} 
                    className={cn(
                      "hover:bg-gray-50/50 cursor-pointer",
                      variants.length > 0 && "font-medium"
                    )}
                    onClick={() => variants.length > 0 && toggleExpand(item.id)}
                  >
                    <TableCell className="w-8">
                      {variants.length > 0 && (
                        <button className="p-1">
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      )}
                    </TableCell>
                    <ProductCell name={item.name} imageUrl={item["image url"]} />
                    <TableCell className="text-gray-600">{item.type || "N/A"}</TableCell>
                    <TableCell className="text-gray-600">{item.sku || "N/A"}</TableCell>
                    <TableCell className="text-gray-600">{item.quantity || 0}</TableCell>
                    <StatusBadge status={item.status || ""} />
                    <ActionButtons onEdit={() => setEditingItem(item)} />
                  </TableRow>
                  {isExpanded &&
                    variants.map((variant) => (
                      <TableRow 
                        key={variant.id} 
                        className="hover:bg-gray-50/50 bg-gray-50/30"
                      >
                        <TableCell className="w-8"></TableCell>
                        <ProductCell 
                          name={variant.name} 
                          imageUrl={variant["image url"]} 
                          isVariant 
                        />
                        <TableCell className="text-gray-600">{variant.type || "N/A"}</TableCell>
                        <TableCell className="text-gray-600">{variant.sku || "N/A"}</TableCell>
                        <TableCell className="text-gray-600">{variant.quantity || 0}</TableCell>
                        <StatusBadge status={variant.status || ""} />
                        <ActionButtons onEdit={() => setEditingItem(variant)} />
                      </TableRow>
                    ))}
                </>
              );
            })}
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