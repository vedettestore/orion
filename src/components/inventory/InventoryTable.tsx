import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package2 } from "lucide-react";

interface InventoryItem {
  id: number;
  name: string;
  type?: string;
  sku?: string;
  status?: string;
  "image url"?: string;
}

interface InventoryTableProps {
  data: InventoryItem[];
  isLoading: boolean;
}

export const InventoryTable = ({ data, isLoading }: InventoryTableProps) => {
  if (isLoading) {
    return <div>Loading inventory...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="flex items-center gap-2">
              {item["image url"] ? (
                <img
                  src={item["image url"]}
                  alt={item.name}
                  className="w-8 h-8 object-cover rounded"
                />
              ) : (
                <Package2 className="w-8 h-8 text-gray-400" />
              )}
              {item.name}
            </TableCell>
            <TableCell>{item.type || "N/A"}</TableCell>
            <TableCell>{item.sku || "N/A"}</TableCell>
            <TableCell>{item.status || "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};