import React, { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { EditInventoryForm } from "./EditInventoryForm";
import { InventoryTableHeader } from "./TableHeader";
import { MainProductRow } from "./MainProductRow";
import { VariantRow } from "./VariantRow";
import { LoadingState } from "./LoadingState";
import { Product, Variant } from "@/types/inventory";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface InventoryTableProps {
  data: Product[];
  isLoading: boolean;
}

export const InventoryTable = ({ data, isLoading }: InventoryTableProps) => {
  const [editingItem, setEditingItem] = useState<Product | Variant | null>(null);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpand = (itemId: number) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <Table>
          <InventoryTableHeader />
          <TableBody>
            {data.map((product) => (
              <React.Fragment key={product.id}>
                <MainProductRow
                  product={product}
                  hasVariants={!!(product.variants && product.variants.length > 0)}
                  isExpanded={expandedItems.includes(product.id)}
                  onToggleExpand={() => toggleExpand(product.id)}
                  onEdit={() => setEditingItem(product)}
                />
                {expandedItems.includes(product.id) &&
                  product.variants?.map((variant) => (
                    <VariantRow
                      key={variant.id}
                      variant={variant}
                      onEdit={() => setEditingItem(variant)}
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