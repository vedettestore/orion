import { TableCell } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProductCellProps {
  name: string;
  imageUrl?: string;
}

export const ProductCell = ({ name, imageUrl }: ProductCellProps) => {
  return (
    <TableCell>
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={imageUrl || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{name}</span>
        </div>
      </div>
    </TableCell>
  );
};