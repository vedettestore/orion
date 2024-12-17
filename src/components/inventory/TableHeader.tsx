import {
  TableHead,
  TableHeader as UITableHeader,
  TableRow,
} from "@/components/ui/table";

export const InventoryTableHeader = () => {
  return (
    <UITableHeader>
      <TableRow className="bg-gray-50 hover:bg-gray-50">
        <TableHead className="w-8"></TableHead>
        <TableHead className="font-semibold">Product</TableHead>
        <TableHead className="font-semibold">Type</TableHead>
        <TableHead className="font-semibold">SKU</TableHead>
        <TableHead className="font-semibold">Quantity</TableHead>
        <TableHead className="font-semibold">UPC</TableHead>
        <TableHead className="font-semibold">Status</TableHead>
        <TableHead className="w-[100px] font-semibold">Actions</TableHead>
      </TableRow>
    </UITableHeader>
  );
};