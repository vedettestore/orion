import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ActionButtonsProps {
  item: {
    title: string;
    variant_sku?: string;
  };
  onEdit: () => void;
}

export const ActionButtons = ({ item, onEdit }: ActionButtonsProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteItem } = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("staging_shopify_inventory")
        .delete()
        .eq("variant_sku", item.variant_sku);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      toast.success("Product deleted successfully");
      setShowDeleteDialog(false);
    },
    onError: (error) => {
      toast.error("Failed to delete product");
      console.error("Error deleting product:", error);
    },
  });

  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-100"
          onClick={onEdit}
        >
          <Pencil className="h-4 w-4 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
          <Eye className="h-4 w-4 text-gray-500" />
        </Button>
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <Trash2 className="h-4 w-4 text-gray-500" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete "{item.title}". This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  deleteItem();
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
          <MoreVertical className="h-4 w-4 text-gray-500" />
        </Button>
      </div>
    </TableCell>
  );
};