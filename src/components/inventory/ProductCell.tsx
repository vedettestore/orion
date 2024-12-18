import { TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Package2 } from "lucide-react";

interface ProductCellProps {
  name: string;
  imageUrl?: string;
}

export const ProductCell = ({ name, imageUrl }: ProductCellProps) => {
  return (
    <TableCell>
      <div className="flex items-center gap-3">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-10 h-10 object-cover rounded-lg border border-gray-200"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <Package2 className="w-5 h-5 text-gray-400" />
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{name}</span>
        </div>
      </div>
    </TableCell>
  );
};