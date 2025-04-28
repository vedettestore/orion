
import React, { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { EditInventoryForm } from "./EditInventoryForm";
import { InventoryTableHeader } from "./TableHeader";
import { MainProductRow } from "./MainProductRow";
import { LoadingState } from "./LoadingState";

interface InventoryItem {
  title: string;
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
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
}

export const InventoryTable = ({ 
  data, 
  isLoading,
  selectedItems,
  setSelectedItems,
}: InventoryTableProps) => {
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const mainProducts = data.filter(item => 
    selectedItems.includes(item.variant_sku!) && 
    (!item.option1_name || !data.some(other => 
      other !== item && 
      other.variant_sku === item.variant_sku
    ))
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allSkus = mainProducts.map(item => item.variant_sku!).filter(Boolean);
      setSelectedItems(allSkus);
    } else {
      setSelectedItems([]);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <InventoryTableHeader 
              onSelectAll={handleSelectAll}
              allSelected={mainProducts.length > 0 && mainProducts.every(item => selectedItems.includes(item.variant_sku!))}
              someSelected={mainProducts.some(item => selectedItems.includes(item.variant_sku!))}
            />
            <TableBody>
              {mainProducts.map((item, index) => (
                <MainProductRow
                  key={item.variant_sku || index}
                  item={item}
                  hasVariants={false}
                  isExpanded={false}
                  onToggleExpand={() => {}}
                  onEdit={() => setEditingItem(item)}
                  isSelected={selectedItems.includes(item.variant_sku!)}
                  onSelect={(checked) => {
                    if (checked) {
                      setSelectedItems([...selectedItems, item.variant_sku!]);
                    } else {
                      setSelectedItems(selectedItems.filter(sku => sku !== item.variant_sku));
                    }
                  }}
                />
              ))}
            </TableBody>
          </Table>
        </div>
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
