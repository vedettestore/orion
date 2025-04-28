
import {
  TableHead,
  TableHeader as UITableHeader,
  TableRow,
} from "@/components/ui/table";
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
  const checkboxRef = React.useRef<HTMLButtonElement>(null);
  
  React.useEffect(() => {
    if (checkboxRef.current) {
      const checkboxInput = checkboxRef.current.querySelector('input[type="checkbox"]') as HTMLInputElement | null;
      if (checkboxInput) {
        checkboxInput.indeterminate = someSelected && !allSelected;
      }
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
        <TableHead className="font-semibold">Product</TableHead>
        <TableHead className="font-semibold">Status</TableHead>
        <TableHead className="w-[100px] font-semibold">Actions</TableHead>
      </TableRow>
    </UITableHeader>
  );
};
