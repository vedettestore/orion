import { TableCell, TableRow } from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import { ActionButtons } from "./ActionButtons";
import { Json } from "@/integrations/supabase/types";

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

interface VariantRowProps {
  variant: InventoryItem;
  onEdit: (variant: InventoryItem) => void;
}

const renderVariantAttributes = (variant: InventoryItem) => {
  if (!variant.option1_name) return null;
  return (
    <div className="text-sm text-gray-500">
      {variant.option1_name}: {variant.option1_value}
      {variant.option2_name && (
        <span className="ml-2">
          {variant.option2_name}: {variant.option2_value}
        </span>
      )}
    </div>
  );
};

export const VariantRow = ({ variant, onEdit }: VariantRowProps) => {
  return (
    <TableRow className="hover:bg-gray-50/50 bg-gray-50/30">
      <TableCell></TableCell>
      <TableCell className="pl-8">
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{variant.title}</span>
          {renderVariantAttributes(variant)}
        </div>
      </TableCell>
      <TableCell className="text-gray-600">{variant.title || "N/A"}</TableCell>
      <TableCell className="text-gray-600">{variant.type || "N/A"}</TableCell>
      <TableCell className="text-gray-600">{variant.variant_sku || "N/A"}</TableCell>
      <TableCell className="text-gray-600">{variant.variant_grams || 0}</TableCell>
      <TableCell className="text-gray-600">{variant.variant_barcode || "N/A"}</TableCell>
      <StatusBadge status={variant.status || ""} />
      <ActionButtons onEdit={() => onEdit(variant)} />
    </TableRow>
  );
};