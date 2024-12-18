import { Eye, MoreVertical, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";

interface ActionButtonsProps {
  onEdit: () => void;
}

export const ActionButtons = ({ onEdit }: ActionButtonsProps) => {
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
        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
          <MoreVertical className="h-4 w-4 text-gray-500" />
        </Button>
      </div>
    </TableCell>
  );
};