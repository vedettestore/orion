import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { PackingListTable } from "@/components/packing/PackingListTable";
import { CreatePackingList } from "@/components/packing/CreatePackingList";

const PackingLists = () => {
  const { data: packingLists, isLoading } = useQuery({
    queryKey: ["packing-lists"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packing_lists")
        .select(`
          *,
          created_by_profile:profiles!packing_lists_created_by_fkey(display_name)
        `)
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to fetch packing lists");
        throw error;
      }

      return data;
    },
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Packing Lists</h1>
              <p className="text-muted-foreground">Manage customer orders and packing lists</p>
            </div>
            <CreatePackingList />
          </div>
          <PackingListTable data={packingLists || []} isLoading={isLoading} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PackingLists;