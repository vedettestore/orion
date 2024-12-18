import { Eye, MoreVertical, Pencil, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ActionButtonsProps {
  onEdit: () => void;
  item: {
    title: string;
    type?: string;
    variant_sku?: string;
    status?: string;
    image_src?: string;
    variant_grams?: number;
    variant_barcode?: string;
    option1_name?: string;
    option1_value?: string;
    option2_name?: string;
    option2_value?: string;
  };
}

export const ActionButtons = ({ onEdit, item }: ActionButtonsProps) => {
  const handleDuplicate = async () => {
    try {
      // Create a new object without any undefined values
      const newItem = Object.fromEntries(
        Object.entries({
          ...item,
          variant_sku: `${item.variant_sku}-copy`,
          title: `${item.title} (Copy)`,
        }).filter(([_, v]) => v !== undefined)
      );

      const { error } = await supabase
        .from("staging_shopify_inventory")
        .insert(newItem);

      if (error) throw error;

      toast.success("Product duplicated successfully");
    } catch (error) {
      console.error("Error duplicating product:", error);
      toast.error("Failed to duplicate product");
    }
  };

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <MoreVertical className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleDuplicate}>
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TableCell>
  );
};