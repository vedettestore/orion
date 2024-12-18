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
      // First, check if parent product exists
      const { data: existingParent, error: parentError } = await supabase
        .from("staging_shopify_inventory")
        .select("*")
        .eq("variant_sku", "117-PARENT")
        .maybeSingle();

      if (parentError) {
        console.error("Error checking for parent product:", parentError);
        toast.error("Failed to check for parent product");
        throw parentError;
      }

      // If parent doesn't exist, create it
      if (!existingParent) {
        const { error: insertError } = await supabase
          .from("staging_shopify_inventory")
          .insert({
            title: "Alyssa Full Body Suit",
            variant_sku: "117-PARENT",
            type: "Apparel",
            status: "active",
          });

        if (insertError) {
          console.error("Failed to create parent product:", insertError);
          toast.error("Failed to create parent product");
          throw insertError;
        }
      }

      // Fetch all inventory items starting with SKU 117
      const { data: variants, error: variantsError } = await supabase
        .from("staging_shopify_inventory")
        .select("*")
        .like("variant_sku", "117%");

      if (variantsError) {
        console.error("Failed to fetch variants:", variantsError);
        toast.error("Failed to fetch variants");
        throw variantsError;
      }

      // Update each variant to reference the parent
      for (const variant of variants) {
        if (variant.variant_sku !== "117-PARENT") {
          const sizeMatch = variant.title.match(/- (\w+)$/);
          const sizeValue = sizeMatch ? sizeMatch[1] : "Default";
          
          const { error: updateError } = await supabase
            .from("staging_shopify_inventory")
            .update({
              option1_name: "Size",
              option1_value: sizeValue
            })
            .eq("variant_sku", variant.variant_sku);

          if (updateError) {
            console.error(`Failed to update variant ${variant.variant_sku}:`, updateError);
            toast.error(`Failed to update variant ${variant.variant_sku}`);
          }
        }
      }

      // Fetch all inventory items again to get the updated data
      const { data: finalData, error: finalError } = await supabase
        .from("staging_shopify_inventory")
        .select("*");

      if (finalError) {
        toast.error("Failed to fetch final inventory data");
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