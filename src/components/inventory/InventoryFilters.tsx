
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InventoryFiltersProps {
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedVendor: string;
  setSelectedVendor: (vendor: string) => void;
  vendors: string[];
}

export const InventoryFilters = ({
  selectedStatus,
  setSelectedStatus,
  selectedVendor,
  setSelectedVendor,
  vendors,
}: InventoryFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg border">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Status:</span>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="In Stock">In Stock</SelectItem>
            <SelectItem value="Low Stock">Low Stock</SelectItem>
            <SelectItem value="Out of Stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Vendor:</span>
        <Select value={selectedVendor} onValueChange={setSelectedVendor}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select vendor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Vendors</SelectItem>
            {vendors.map((vendor) => (
              <SelectItem key={vendor} value={vendor}>
                {vendor || "No Vendor"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
