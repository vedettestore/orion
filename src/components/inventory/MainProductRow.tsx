import { TableCell, TableRow } from "@/components/ui/table";
import { ProductCell } from "./ProductCell";
import { StatusBadge } from "./StatusBadge";
import { ActionButtons } from "./ActionButtons";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

interface MainProductRowProps {
  item: {
    id: number;
    name: string;
    type?: string;
    sku?: string;
    status?: string;
    "image url"?: string;
    quantity?: number;
    barcode?: string;
  };
  hasVariants: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onEdit: (item: any) => void;
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
      <ProductCell name={item.name} imageUrl={item["image url"]} />
      <TableCell className="text-gray-600">{item.type || "N/A"}</TableCell>
      <TableCell className="text-gray-600">{item.sku || "N/A"}</TableCell>
      <TableCell className="text-gray-600">{item.quantity || 0}</TableCell>
      <TableCell className="text-gray-600">{item.barcode || "N/A"}</TableCell>
      <StatusBadge status={item.status || ""} />
      <ActionButtons onEdit={() => onEdit(item)} />
    </TableRow>
  );
};