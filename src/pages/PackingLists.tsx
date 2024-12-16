import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CreatePackingListForm } from "@/components/packing-lists/CreatePackingListForm";
import { EditPackingListForm } from "@/components/packing-lists/EditPackingListForm";
import { PackingListHeader } from "@/components/packing-lists/PackingListHeader";
import { PackingListGrid } from "@/components/packing-lists/PackingListGrid";

const PackingLists = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<any>(null);

  const queryClient = useQueryClient();

  const { data: packingLists, isLoading } = useQuery({
    queryKey: ['packing-lists'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('packing_lists')
        .select(`
          *,
          packing_list_items (
            *,
            inventory (
              name
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        toast.error('Failed to fetch packing lists');
        throw error;
      }

      return data;
    },
  });

  const { mutate: deleteList } = useMutation({
    mutationFn: async (id: number) => {
      // First delete all related packing list items
      const { error: itemsError } = await supabase
        .from('packing_list_items')
        .delete()
        .eq('packing_list_id', id);

      if (itemsError) throw itemsError;

      // Then delete the packing list itself
      const { error: listError } = await supabase
        .from('packing_lists')
        .delete()
        .eq('id', id);

      if (listError) throw listError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packing-lists'] });
      toast.success('Packing list deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting packing list:', error);
      toast.error('Failed to delete packing list');
    },
  });

  const handleEdit = (list: any) => {
    setSelectedList(list);
    setEditDialogOpen(true);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-8">
          <PackingListHeader onCreateNew={() => setCreateDialogOpen(true)} />
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <p>Loading packing lists...</p>
            </div>
          ) : (
            <PackingListGrid 
              lists={packingLists || []} 
              onEdit={handleEdit}
              onDelete={deleteList}
            />
          )}

          <CreatePackingListForm
            open={createDialogOpen}
            onOpenChange={setCreateDialogOpen}
          />

          {selectedList && (
            <EditPackingListForm
              list={selectedList}
              open={editDialogOpen}
              onOpenChange={setEditDialogOpen}
            />
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PackingLists;