import { TableCell, TableRow } from "@/components/ui/table";
import { ProductCell } from "./ProductCell";
import { StatusBadge } from "./StatusBadge";
import { ActionButtons } from "./ActionButtons";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Product } from "@/types/inventory";

interface MainProductRowProps {
  product: Product;
  hasVariants: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onEdit: () => void;
}

export const MainProductRow = ({
  product,
  hasVariants,
  isExpanded,
  onToggleExpand,
  onEdit,
}: MainProductRowProps) => {
  const mainImage = product.images?.[0]?.src;

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
      <ProductCell name={product.title} imageUrl={mainImage} />
      <TableCell className="text-gray-600">{product.product_type || "N/A"}</TableCell>
      <TableCell className="text-gray-600">
        {product.variants?.[0]?.inventory_quantity || 0}
      </TableCell>
      <TableCell className="text-gray-600">
        {product.variants?.[0]?.sku || "N/A"}
      </TableCell>
      <StatusBadge status={product.status || ""} />
      <ActionButtons item={product} onEdit={onEdit} />
    </TableRow>
  );
};