import { TableCell, TableRow } from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import { ActionButtons } from "./ActionButtons";
import { Json } from "@/integrations/supabase/types";

interface VariantRowProps {
  variant: {
    id: number;
    name: string;
    type?: string;
    sku?: string;
    status?: string;
    quantity?: number;
    barcode?: string;
    variant_attributes?: Json;
  };
  onEdit: (variant: any) => void;
}

const renderVariantAttributes = (attributes?: Json) => {
  if (!attributes || typeof attributes !== 'object') return null;
  return (
    <div className="text-sm text-gray-500">
      {Object.entries(attributes as Record<string, any>).map(([key, value]) => (
        <span key={key} className="mr-2">
          {key}: {value}
        </span>
      ))}
    </div>
  );
};

export const VariantRow = ({ variant, onEdit }: VariantRowProps) => {
  return (
    <TableRow key={variant.id} className="hover:bg-gray-50/50 bg-gray-50/30">
      <TableCell></TableCell>
      <TableCell className="pl-8">
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{variant.name}</span>
          {renderVariantAttributes(variant.variant_attributes)}
        </div>
      </TableCell>
      <TableCell className="text-gray-600">{variant.type || "N/A"}</TableCell>
      <TableCell className="text-gray-600">{variant.sku || "N/A"}</TableCell>
      <TableCell className="text-gray-600">{variant.quantity || 0}</TableCell>
      <TableCell className="text-gray-600">{variant.barcode || "N/A"}</TableCell>
      <StatusBadge status={variant.status || ""} />
      <ActionButtons onEdit={() => onEdit(variant)} />
    </TableRow>
  );
};