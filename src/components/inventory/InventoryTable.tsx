import React, { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { EditInventoryForm } from "./EditInventoryForm";
import { InventoryTableHeader } from "./TableHeader";
import { MainProductRow } from "./MainProductRow";
import { VariantRow } from "./VariantRow";
import { LoadingState } from "./LoadingState";
import { useIsMobile } from "@/hooks/use-mobile";

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
}

export const InventoryTable = ({ data, isLoading }: InventoryTableProps) => {
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const isMobile = useIsMobile();

  const toggleExpand = (itemId: number) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const mainProducts = data.filter(item => 
    !item.option1_name || 
    (item.option1_name && !data.some(other => 
      other !== item && 
      other.variant_sku === item.variant_sku
    ))
  );

  const variantsByParent = data.reduce((acc, item) => {
    if (item.option1_name && item.variant_sku) {
      if (!acc[item.variant_sku]) {
        acc[item.variant_sku] = [];
      }
      if (!mainProducts.includes(item)) {
        acc[item.variant_sku].push(item);
      }
    }
    return acc;
  }, {} as Record<string, InventoryItem[]>);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className={`overflow-x-auto ${isMobile ? 'max-w-[100vw]' : ''}`}>
          <Table>
            <InventoryTableHeader />
            <TableBody>
              {mainProducts.map((item, index) => (
                <React.Fragment key={item.variant_sku || index}>
                  <MainProductRow
                    item={item}
                    hasVariants={!!variantsByParent[item.variant_sku || '']?.length}
                    isExpanded={expandedItems.includes(parseInt(item.variant_sku || '0'))}
                    onToggleExpand={() => toggleExpand(parseInt(item.variant_sku || '0'))}
                    onEdit={setEditingItem}
                  />
                  {expandedItems.includes(parseInt(item.variant_sku || '0')) &&
                    variantsByParent[item.variant_sku || '']?.map((variant, variantIndex) => (
                      <VariantRow
                        key={`${variant.variant_sku}-${variantIndex}`}
                        variant={variant}
                        onEdit={setEditingItem}
                      />
                    ))}
                </React.Fragment>
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