import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Edit } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CreatePackingListForm } from "@/components/packing-lists/CreatePackingListForm";
import { EditPackingListForm } from "@/components/packing-lists/EditPackingListForm";

const PackingLists = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<any>(null);

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

  const handleEdit = (list: any) => {
    setSelectedList(list);
    setEditDialogOpen(true);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Packing Lists</h1>
              <p className="text-muted-foreground">Manage your packing lists and track order fulfillment</p>
            </div>
            <div className="space-x-4">
              <Button variant="outline" className="bg-soft-gray hover:bg-soft-gray/90">
                <FileText className="mr-2 h-4 w-4" />
                Export Lists
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => setCreateDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Packing List
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <p>Loading packing lists...</p>
            </div>
          ) : packingLists?.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold">No packing lists yet</h3>
              <p className="text-muted-foreground mt-2">Create your first packing list to get started</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {packingLists?.map((list) => (
                <div
                  key={list.id}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">Order #{list.order_number}</h3>
                      <p className="text-sm text-muted-foreground">{list.customer_name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(list)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        list.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : list.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {list.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Items: {list.packing_list_items?.length || 0}
                    </p>
                    <p className="text-sm text-gray-600">
                      Created: {new Date(list.created_at).toLocaleDateString()}
                    </p>
                    {list.notes && (
                      <p className="text-sm text-gray-600 mt-2">
                        Notes: {list.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
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