import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { InventoryHeader } from "@/components/inventory/InventoryHeader";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useState, useEffect } from "react";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: inventoryItems, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      // First, ensure the parent product exists
      const { error: insertError } = await supabase
        .from("staging_shopify_inventory")
        .upsert({
          title: "Alyssa Full Body Suit",
          variant_sku: "117-PARENT",
          type: "Apparel",
          status: "active",
        });

      if (insertError) {
        toast.error("Failed to ensure parent product exists");
        throw insertError;
      }

      // Then fetch all inventory items
      const { data, error } = await supabase
        .from("staging_shopify_inventory")
        .select("*");

      if (error) {
        toast.error("Failed to fetch inventory");
        throw error;
      }

      // Update variants to reference the parent
      const variants = data.filter(item => 
        item.variant_sku?.startsWith("117") && 
        item.variant_sku !== "117-PARENT"
      );

      // Update each variant individually to properly handle the title splitting
      for (const variant of variants) {
        const sizeValue = variant.title.split(" - ")[1] || "Default";
        const { error: updateError } = await supabase
          .from("staging_shopify_inventory")
          .update({ 
            option1_name: "Size",
            option1_value: sizeValue
          })
          .eq("variant_sku", variant.variant_sku);

        if (updateError) {
          toast.error(`Failed to update variant ${variant.variant_sku}`);
          console.error("Update error:", updateError);
        }
      }

      // Fetch the updated data
      const { data: updatedData, error: refetchError } = await supabase
        .from("staging_shopify_inventory")
        .select("*");

      if (refetchError) {
        toast.error("Failed to fetch updated inventory");
        throw refetchError;
      }

      return updatedData;
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
        <main className="flex-1 p-4 md:p-8">
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