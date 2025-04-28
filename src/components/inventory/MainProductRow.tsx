
import { TableCell, TableRow } from "@/components/ui/table";
import { ProductCell } from "./ProductCell";
import { StatusBadge } from "./StatusBadge";
import { ActionButtons } from "./ActionButtons";
import { Checkbox } from "@/components/ui/checkbox";

interface InventoryItem {
  title: string;
  status?: string;
  image_src?: string;
  variant_sku?: string;
}

interface MainProductRowProps {
  item: InventoryItem;
  hasVariants: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onEdit: (item: InventoryItem) => void;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
}

export const MainProductRow = ({
  item,
  onEdit,
  isSelected,
  onSelect,
}: MainProductRowProps) => {
  return (
    <TableRow className="hover:bg-gray-50/50">
      <TableCell className="pl-4">
        <Checkbox 
          checked={isSelected}
          onCheckedChange={onSelect}
        />
      </TableCell>
      <ProductCell name={item.title} imageUrl={item.image_src} />
      <StatusBadge status={item.status || "N/A"} />
      <ActionButtons item={item} onEdit={() => onEdit(item)} />
    </TableRow>
  );
};
