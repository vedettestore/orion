import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { InventoryHeader } from "@/components/inventory/InventoryHeader";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useState } from "react";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: inventoryItems, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      const { data: finalData, error: finalError } = await supabase
        .from("staging_shopify_inventory")
        .select("*");

      if (finalError) {
        toast.error("Failed to fetch inventory data");
        throw finalError;
      }

      return finalData;
    },
  });

  const filteredItems = inventoryItems?.filter(item => 
    item.variant_sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-2 md:p-8 overflow-x-hidden">
          <InventoryHeader onSearch={setSearchTerm} searchTerm={searchTerm} />
          <div className="rounded-lg border bg-card">
            <InventoryTable data={filteredItems} isLoading={isLoading} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Inventory;