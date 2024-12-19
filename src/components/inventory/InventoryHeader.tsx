import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, Upload, Download, Edit2 } from "lucide-react";
import { exportInventoryToCSV, importInventoryFromCSV } from "@/utils/csvUtils";

interface InventoryHeaderProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

export const InventoryHeader = ({ onSearch, searchTerm }: InventoryHeaderProps) => {
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await importInventoryFromCSV(file);
      } catch (error) {
        console.error("Import error:", error);
      }
    }
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Inventory</h1>
          <p className="text-muted-foreground">Manage your inventory items</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="flex-1 md:flex-none"
            onClick={() => exportInventoryToCSV()}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            variant="outline"
            className="flex-1 md:flex-none"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Import
            <input
              id="file-upload"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileUpload}
            />
          </Button>
          <Link to="/inventory/bulk-edit" className="flex-1 md:flex-none">
            <Button className="w-full bg-primary hover:bg-primary/90">
              <Edit2 className="w-4 h-4 mr-2" />
              Bulk Edit
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search by SKU..."
            className="pl-10 bg-white"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};