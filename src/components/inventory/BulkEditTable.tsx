import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ProductCell } from "./ProductCell";
import { StatusBadge } from "./StatusBadge";

interface InventoryItem {
  id: number;
  name: string;
  type?: string;
  sku?: string;
  status?: string;
  "image url"?: string;
  quantity?: number;
  barcode?: string;
}

interface BulkEditTableProps {
  data: InventoryItem[];
  isLoading: boolean;
  selectedItems: number[];
  setSelectedItems: (items: number[]) => void;
  editedData: Record<number, Record<string, any>>;
  setEditedData: (data: Record<number, Record<string, any>>) => void;
}

export const BulkEditTable = ({
  data,
  isLoading,
  selectedItems,
  setSelectedItems,
  editedData,
  setEditedData,
}: BulkEditTableProps) => {
  const handleSelectAll = () => {
    if (selectedItems.length === data.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data.map((item) => item.id));
    }
  };

  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleEdit = (id: number, field: string, value: any) => {
    setEditedData({
      ...editedData,
      [id]: {
        ...(editedData[id] || {}),
        [field]: value,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedItems.length === data.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="font-semibold">Product</TableHead>
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold">SKU</TableHead>
            <TableHead className="font-semibold">Quantity</TableHead>
            <TableHead className="font-semibold">UPC</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              className={`hover:bg-gray-50/50 ${
                selectedItems.includes(item.id) ? "bg-primary/5" : ""
              }`}
            >
              <TableCell>
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => handleSelectItem(item.id)}
                />
              </TableCell>
              <ProductCell name={item.name} imageUrl={item["image url"]} />
              <TableCell>
                <Input
                  value={
                    editedData[item.id]?.type !== undefined
                      ? editedData[item.id].type
                      : item.type || ""
                  }
                  onChange={(e) => handleEdit(item.id, "type", e.target.value)}
                  className={`w-full ${
                    selectedItems.includes(item.id)
                      ? "bg-white"
                      : "bg-transparent border-transparent"
                  }`}
                  disabled={!selectedItems.includes(item.id)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={
                    editedData[item.id]?.sku !== undefined
                      ? editedData[item.id].sku
                      : item.sku || ""
                  }
                  onChange={(e) => handleEdit(item.id, "sku", e.target.value)}
                  className={`w-full ${
                    selectedItems.includes(item.id)
                      ? "bg-white"
                      : "bg-transparent border-transparent"
                  }`}
                  disabled={!selectedItems.includes(item.id)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={
                    editedData[item.id]?.quantity !== undefined
                      ? editedData[item.id].quantity
                      : item.quantity || 0
                  }
                  onChange={(e) =>
                    handleEdit(item.id, "quantity", parseInt(e.target.value))
                  }
                  className={`w-full ${
                    selectedItems.includes(item.id)
                      ? "bg-white"
                      : "bg-transparent border-transparent"
                  }`}
                  disabled={!selectedItems.includes(item.id)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={
                    editedData[item.id]?.barcode !== undefined
                      ? editedData[item.id].barcode
                      : item.barcode || ""
                  }
                  onChange={(e) => handleEdit(item.id, "barcode", e.target.value)}
                  className={`w-full ${
                    selectedItems.includes(item.id)
                      ? "bg-white"
                      : "bg-transparent border-transparent"
                  }`}
                  disabled={!selectedItems.includes(item.id)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={
                    editedData[item.id]?.status !== undefined
                      ? editedData[item.id].status
                      : item.status || ""
                  }
                  onChange={(e) => handleEdit(item.id, "status", e.target.value)}
                  className={`w-full ${
                    selectedItems.includes(item.id)
                      ? "bg-white"
                      : "bg-transparent border-transparent"
                  }`}
                  disabled={!selectedItems.includes(item.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};