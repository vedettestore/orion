
import {
  TableHead,
  TableHeader as UITableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import { Checkbox } from "@/components/ui/checkbox";

interface InventoryTableHeaderProps {
  onSelectAll: (checked: boolean) => void;
  allSelected: boolean;
  someSelected: boolean;
}

export const InventoryTableHeader = ({ 
  onSelectAll,
  allSelected,
  someSelected
}: InventoryTableHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <UITableHeader>
      <TableRow className="bg-gray-50 hover:bg-gray-50">
        <TableHead className="w-[50px] pl-4">
          <Checkbox 
            checked={allSelected}
            indeterminate={someSelected && !allSelected}
            onCheckedChange={onSelectAll}
          />
        </TableHead>
        <TableHead className="w-8"></TableHead>
        <TableHead className="font-semibold min-w-[200px]">Product</TableHead>
        <TableHead className="font-semibold min-w-[120px]">SKU</TableHead>
        <TableHead className="font-semibold min-w-[100px]">Quantity</TableHead>
        <TableHead className="font-semibold min-w-[120px]">UPC</TableHead>
        <TableHead className="font-semibold min-w-[100px]">Status</TableHead>
        <TableHead className="w-[100px] font-semibold">Actions</TableHead>
      </TableRow>
    </UITableHeader>
  );
};
