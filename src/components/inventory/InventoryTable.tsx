import { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { EditInventoryForm } from "./EditInventoryForm";
import { Json } from "@/integrations/supabase/types";
import { InventoryTableHeader } from "./TableHeader";
import { MainProductRow } from "./MainProductRow";
import { VariantRow } from "./VariantRow";
import { LoadingState } from "./LoadingState";

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
  variant_attributes?: Json;
}

interface InventoryTableProps {
  data: InventoryItem[];
  isLoading: boolean;
}

export const InventoryTable = ({ data, isLoading }: InventoryTableProps) => {
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpand = (itemId: number) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const mainProducts = data.filter(item => !item.parent_id);
  const variantsByParent = data.reduce((acc, item) => {
    if (item.parent_id) {
      if (!acc[item.parent_id]) {
        acc[item.parent_id] = [];
      }
      acc[item.parent_id].push(item);
    }
    return acc;
  }, {} as Record<number, InventoryItem[]>);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <Table>
          <InventoryTableHeader />
          <TableBody>
            {mainProducts.map((item) => (
              <>
                <MainProductRow
                  key={item.id}
                  item={item}
                  hasVariants={!!variantsByParent[item.id]?.length}
                  isExpanded={expandedItems.includes(item.id)}
                  onToggleExpand={() => toggleExpand(item.id)}
                  onEdit={setEditingItem}
                />
                {expandedItems.includes(item.id) &&
                  variantsByParent[item.id]?.map((variant) => (
                    <VariantRow
                      key={variant.id}
                      variant={variant}
                      onEdit={setEditingItem}
                    />
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