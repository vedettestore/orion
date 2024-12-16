import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface PackingListCardProps {
  list: {
    id: number;
    order_number: string;
    customer_name?: string;
    status?: string;
    created_at: string;
    notes?: string;
    packing_list_items?: any[];
  };
  onEdit: (list: any) => void;
  onDelete: (id: number) => void;
}

export const PackingListCard = ({ list, onEdit, onDelete }: PackingListCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
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
              onClick={() => onEdit(list)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="h-4 w-4" />
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

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the packing list for Order #{list.order_number}.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                onDelete(list.id);
                setShowDeleteDialog(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};