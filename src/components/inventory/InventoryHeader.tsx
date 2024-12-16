import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const InventoryHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
        <p className="text-muted-foreground">
          Manage your warehouse inventory items
        </p>
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" /> Add Item
      </Button>
    </div>
  );
};