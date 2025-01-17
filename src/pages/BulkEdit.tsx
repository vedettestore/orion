import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BulkEditHeader } from "@/components/inventory/BulkEditHeader";
import { BulkEditTable } from "@/components/inventory/BulkEditTable";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

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

const BulkEdit = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [editedData, setEditedData] = useState<Record<string, Record<string, any>>>({});

  const { data: inventoryItems, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("staging_shopify_inventory")
        .select("*");
      if (error) {
        toast.error("Failed to fetch inventory");
        throw error;
      }
      return data as InventoryItem[];
    },
  });

  const handleSaveChanges = async () => {
    try {
      for (const [sku, changes] of Object.entries(editedData)) {
        const { error } = await supabase
          .from("staging_shopify_inventory")
          .update(changes)
          .eq("variant_sku", sku);
        
        if (error) throw error;
      }
      
      toast.success("Changes saved successfully");
      setEditedData({});
      setSelectedItems([]);
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("Failed to save changes");
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <BulkEditHeader selectedCount={selectedItems.length} />
            {Object.keys(editedData).length > 0 && (
              <Button
                onClick={handleSaveChanges}
                className="bg-primary hover:bg-primary/90"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            )}
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <BulkEditTable
              data={inventoryItems || []}
              isLoading={isLoading}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              editedData={editedData}
              setEditedData={setEditedData}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default BulkEdit;