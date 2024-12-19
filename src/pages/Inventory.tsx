import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { InventoryHeader } from "@/components/inventory/InventoryHeader";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useState } from "react";
import { Product } from "@/types/inventory";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: inventoryItems, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      // Fetch products with their variants and images
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select(`
          *,
          variants:variants(
            *,
            options:variant_options(*),
            images:product_images(*)
          ),
          images:product_images(*)
        `);

      if (productsError) {
        toast.error("Failed to fetch inventory data");
        throw productsError;
      }

      return products as Product[];
    },
  });

  const filteredItems = inventoryItems?.filter(item => 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.variants?.some(variant => 
      variant.sku?.toLowerCase().includes(searchTerm.toLowerCase())
    )
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