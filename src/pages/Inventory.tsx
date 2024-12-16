import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { InventoryHeader } from "@/components/inventory/InventoryHeader";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Inventory = () => {
  const { data: inventoryItems, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      const { data, error } = await supabase.from("inventory").select("*");

      if (error) {
        toast.error("Failed to fetch inventory");
        throw error;
      }

      return data;
    },
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8">
          <InventoryHeader />
          <div className="rounded-lg border bg-card">
            <InventoryTable data={inventoryItems || []} isLoading={isLoading} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Inventory;