import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Items = () => {
  const { data: items, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const { data, error } = await supabase.from("inventory").select("*");
      if (error) {
        toast.error("Failed to fetch items");
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
              <h1 className="text-3xl font-bold text-gray-900">Items</h1>
              <p className="text-muted-foreground">Manage your individual items</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p>Items management content will go here</p>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Items;