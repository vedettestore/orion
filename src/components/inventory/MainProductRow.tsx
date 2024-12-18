import { TableCell, TableRow } from "@/components/ui/table";
import { ProductCell } from "./ProductCell";
import { StatusBadge } from "./StatusBadge";
import { ActionButtons } from "./ActionButtons";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

interface InventoryItem {
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

interface MainProductRowProps {
  item: InventoryItem;
  hasVariants: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onEdit: (item: InventoryItem) => void;
}

export const MainProductRow = ({
  item,
  hasVariants,
  isExpanded,
  onToggleExpand,
  onEdit,
}: MainProductRowProps) => {
  return (
    <TableRow className="hover:bg-gray-50/50">
      <TableCell>
        {hasVariants && (
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onToggleExpand}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
      </TableCell>
      <ProductCell name={item.title} imageUrl={item.image_src} />
      <TableCell className="text-gray-600">{item.variant_sku || "N/A"}</TableCell>
      <TableCell className="text-gray-600">{item.variant_grams || 0}</TableCell>
      <TableCell className="text-gray-600">{item.variant_barcode || "N/A"}</TableCell>
      <StatusBadge status={item.status || ""} />
      <ActionButtons item={item} onEdit={() => onEdit(item)} />
    </TableRow>
  );
};