import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { InventoryHeader } from "@/components/inventory/InventoryHeader";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useState } from "react";

const sampleProducts = [
  {
    title: "Premium Cat Food",
    variant_sku: "SKU1234",
    status: "active",
    image_src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    variant_grams: 500,
    variant_barcode: "BAR1234",
    type: "Pet Food",
  },
  {
    title: "Organic Honey",
    variant_sku: "SKU5678",
    status: "active",
    image_src: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    variant_grams: 250,
    variant_barcode: "BAR5678",
    type: "Food",
  },
  {
    title: "Kitten Care Kit",
    variant_sku: "SKU9012",
    status: "active",
    image_src: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    variant_grams: 1000,
    variant_barcode: "BAR9012",
    type: "Pet Supplies",
  },
  {
    title: "Raw Honey Collection",
    variant_sku: "SKU3456",
    status: "active",
    image_src: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937",
    variant_grams: 750,
    variant_barcode: "BAR3456",
    type: "Food",
  }
];

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: inventoryItems, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      try {
        // For now, we'll return our sample products
        // Later this can be replaced with actual Supabase query
        return sampleProducts;
      } catch (error) {
        toast.error("Failed to fetch inventory data");
        throw error;
      }
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