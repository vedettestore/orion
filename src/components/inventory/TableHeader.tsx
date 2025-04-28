
import {
  TableHead,
  TableHeader as UITableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";
import { Checkbox } from "@/components/ui/checkbox";
import * as React from "react";

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
  
  // Use useRef to create a DOM reference for the checkbox
  const checkboxRef = React.useRef<HTMLButtonElement>(null);
  
  // Set indeterminate prop via DOM API since it's not in the React props
  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = someSelected && !allSelected;
    }
  }, [someSelected, allSelected]);

  return (
    <UITableHeader>
      <TableRow className="bg-gray-50 hover:bg-gray-50">
        <TableHead className="w-[50px] pl-4">
          <Checkbox 
            ref={checkboxRef}
            checked={allSelected}
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
