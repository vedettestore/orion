import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ProductCell } from "./ProductCell";
import { StatusBadge } from "./StatusBadge";

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

interface BulkEditTableProps {
  data: InventoryItem[];
  isLoading: boolean;
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  editedData: Record<string, Record<string, any>>;
  setEditedData: (data: Record<string, Record<string, any>>) => void;
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
      setSelectedItems(data.map((item) => item.variant_sku!));
    }
  };

  const handleSelectItem = (sku: string) => {
    if (selectedItems.includes(sku)) {
      setSelectedItems(selectedItems.filter((item) => item !== sku));
    } else {
      setSelectedItems([...selectedItems, sku]);
    }
  };

  const handleEdit = (sku: string, field: string, value: any) => {
    setEditedData({
      ...editedData,
      [sku]: {
        ...(editedData[sku] || {}),
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
              key={item.variant_sku}
              className={`hover:bg-gray-50/50 ${
                selectedItems.includes(item.variant_sku!) ? "bg-primary/5" : ""
              }`}
            >
              <TableCell>
                <Checkbox
                  checked={selectedItems.includes(item.variant_sku!)}
                  onCheckedChange={() => handleSelectItem(item.variant_sku!)}
                />
              </TableCell>
              <ProductCell name={item.title} imageUrl={item.image_src} />
              <TableCell>
                <Input
                  value={
                    editedData[item.variant_sku!]?.type !== undefined
                      ? editedData[item.variant_sku!].type
                      : item.type || ""
                  }
                  onChange={(e) => handleEdit(item.variant_sku!, "type", e.target.value)}
                  className={`w-full ${
                    selectedItems.includes(item.variant_sku!)
                      ? "bg-white"
                      : "bg-transparent border-transparent"
                  }`}
                  disabled={!selectedItems.includes(item.variant_sku!)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={
                    editedData[item.variant_sku!]?.variant_sku !== undefined
                      ? editedData[item.variant_sku!].variant_sku
                      : item.variant_sku || ""
                  }
                  onChange={(e) => handleEdit(item.variant_sku!, "variant_sku", e.target.value)}
                  className={`w-full ${
                    selectedItems.includes(item.variant_sku!)
                      ? "bg-white"
                      : "bg-transparent border-transparent"
                  }`}
                  disabled={!selectedItems.includes(item.variant_sku!)}
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={
                    editedData[item.variant_sku!]?.variant_grams !== undefined
                      ? editedData[item.variant_sku!].variant_grams
                      : item.variant_grams || 0
                  }
                  onChange={(e) =>
                    handleEdit(item.variant_sku!, "variant_grams", parseInt(e.target.value))
                  }
                  className={`w-full ${
                    selectedItems.includes(item.variant_sku!)
                      ? "bg-white"
                      : "bg-transparent border-transparent"
                  }`}
                  disabled={!selectedItems.includes(item.variant_sku!)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={
                    editedData[item.variant_sku!]?.variant_barcode !== undefined
                      ? editedData[item.variant_sku!].variant_barcode
                      : item.variant_barcode || ""
                  }
                  onChange={(e) => handleEdit(item.variant_sku!, "variant_barcode", e.target.value)}
                  className={`w-full ${
                    selectedItems.includes(item.variant_sku!)
                      ? "bg-white"
                      : "bg-transparent border-transparent"
                  }`}
                  disabled={!selectedItems.includes(item.variant_sku!)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={
                    editedData[item.variant_sku!]?.status !== undefined
                      ? editedData[item.variant_sku!].status
                      : item.status || ""
                  }
                  onChange={(e) => handleEdit(item.variant_sku!, "status", e.target.value)}
                  className={`w-full ${
                    selectedItems.includes(item.variant_sku!)
                      ? "bg-white"
                      : "bg-transparent border-transparent"
                  }`}
                  disabled={!selectedItems.includes(item.variant_sku!)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};