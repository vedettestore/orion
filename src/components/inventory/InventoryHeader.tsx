import { Button } from "@/components/ui/button";
import { Plus, FileText, Download } from "lucide-react";
import { exportInventoryToCSV, importInventoryFromCSV } from "@/utils/csvUtils";
import { useQueryClient } from "@tanstack/react-query";

export const InventoryHeader = () => {
  const queryClient = useQueryClient();
  
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    try {
      await importInventoryFromCSV(file);
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    } catch (error) {
      console.error('Import failed:', error);
    }
    
    // Reset the input
    event.target.value = '';
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
        <p className="text-gray-500 mt-1">
          Manage and track your warehouse inventory items
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => exportInventoryToCSV()}
        >
          <FileText className="h-4 w-4" /> Export
        </Button>
        <div className="relative">
          <input
            type="file"
            accept=".csv"
            onChange={handleImport}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            title="Import CSV"
          />
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Import
          </Button>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add Item
        </Button>
      </div>
    </div>
  );
};