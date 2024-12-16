import { Button } from "@/components/ui/button";
import { Plus, FileText, Download } from "lucide-react";

export const InventoryHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
        <p className="text-gray-500 mt-1">
          Manage and track your warehouse inventory items
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" /> Export
        </Button>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Import
        </Button>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add Item
        </Button>
      </div>
    </div>
  );
};