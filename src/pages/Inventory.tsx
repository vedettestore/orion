import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { InventoryHeader } from "@/components/inventory/InventoryHeader";
import { InventoryTable } from "@/components/inventory/InventoryTable";

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
    <div className="container mx-auto py-8">
      <InventoryHeader />
      <div className="rounded-lg border bg-card">
        <InventoryTable data={inventoryItems || []} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Inventory;