import React, { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { EditInventoryForm } from "./EditInventoryForm";
import { InventoryTableHeader } from "./TableHeader";
import { MainProductRow } from "./MainProductRow";
import { VariantRow } from "./VariantRow";
import { LoadingState } from "./LoadingState";

interface InventoryItem {
  id?: number;
  title: string;
  type?: string;
  variant_sku?: string;
  status?: string;
  image_src?: string;
  variant_grams?: number;
  variant_barcode?: string;
  option1_name?: string;
  option1_value?: string;
  option2_name?: string;
  option2_value?: string;
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

  const mainProducts = data.filter(item => !item.option1_name);
  const variantsByParent = data.reduce((acc, item) => {
    if (item.option1_name) {
      const parentId = item.id;
      if (!acc[parentId!]) {
        acc[parentId!] = [];
      }
      acc[parentId!].push(item);
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
              <React.Fragment key={item.id}>
                <MainProductRow
                  item={item}
                  hasVariants={!!variantsByParent[item.id!]?.length}
                  isExpanded={expandedItems.includes(item.id!)}
                  onToggleExpand={() => toggleExpand(item.id!)}
                  onEdit={setEditingItem}
                />
                {expandedItems.includes(item.id!) &&
                  variantsByParent[item.id!]?.map((variant) => (
                    <VariantRow
                      key={variant.id}
                      variant={variant}
                      onEdit={setEditingItem}
                    />
                  ))}
              </React.Fragment>
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