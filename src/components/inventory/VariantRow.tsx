import { TableCell, TableRow } from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import { ActionButtons } from "./ActionButtons";
import { Variant } from "@/types/inventory";

interface VariantRowProps {
  variant: Variant;
  onEdit: () => void;
}

const renderVariantAttributes = (variant: Variant) => {
  if (!variant.options?.length) return null;
  return (
    <div className="text-sm text-gray-500">
      {variant.options.map((option, index) => (
        <span key={option.id}>
          {option.name}: {option.value}
          {index < variant.options!.length - 1 ? ", " : ""}
        </span>
      ))}
    </div>
  );
};

export const VariantRow = ({ variant, onEdit }: VariantRowProps) => {
  const variantImage = variant.images?.[0]?.src;

  return (
    <TableRow className="hover:bg-gray-50/50 bg-gray-50/30">
      <TableCell></TableCell>
      <TableCell className="pl-8">
        <div className="flex items-center gap-3">
          {variantImage && (
            <img
              src={variantImage}
              alt={variant.sku || ""}
              className="w-10 h-10 object-cover rounded-lg border border-gray-200"
            />
          )}
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">
              {variant.sku || "No SKU"}
            </span>
            {renderVariantAttributes(variant)}
          </div>
        </div>
      </TableCell>
      <TableCell className="text-gray-600">-</TableCell>
      <TableCell className="text-gray-600">{variant.inventory_quantity || 0}</TableCell>
      <TableCell className="text-gray-600">{variant.sku || "N/A"}</TableCell>
      <StatusBadge status={variant.inventory_quantity && variant.inventory_quantity > 0 ? "In Stock" : "Out of Stock"} />
      <ActionButtons item={variant} onEdit={onEdit} />
    </TableRow>
  );
};