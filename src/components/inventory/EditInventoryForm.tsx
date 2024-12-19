import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { FormFields } from "./FormFields";
import { Product, Variant } from "@/types/inventory";

interface EditInventoryFormProps {
  item: Product | Variant;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditInventoryForm = ({
  item,
  open,
  onOpenChange,
}: EditInventoryFormProps) => {
  const isVariant = 'sku' in item;
  
  const form = useForm({
    defaultValues: {
      title: isVariant ? '' : (item as Product).title || '',
      type: isVariant ? '' : (item as Product).product_type || '',
      variant_sku: isVariant ? (item as Variant).sku || '' : '',
      status: isVariant ? '' : (item as Product).status || '',
      image_src: 'images' in item && item.images?.[0]?.src || '',
      variant_grams: isVariant ? (item as Variant).weight || 0 : 0,
      variant_barcode: isVariant ? (item as Variant).barcode || '' : '',
    },
  });

  const queryClient = useQueryClient();

  const { mutate: updateItem, isPending } = useMutation({
    mutationFn: async (values: any) => {
      if (isVariant) {
        const { error } = await supabase
          .from("variants")
          .update({
            sku: values.variant_sku,
            weight: values.variant_grams,
            barcode: values.variant_barcode,
          })
          .eq("id", item.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("products")
          .update({
            title: values.title,
            product_type: values.type,
            status: values.status,
          })
          .eq("id", item.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      toast.success("Item updated successfully");
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error("Failed to update item");
      console.error("Error updating item:", error);
    },
  });

  const onSubmit = (values: any) => {
    updateItem(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Edit {isVariant ? 'Variant' : 'Product'}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormFields form={form} isVariant={isVariant} />
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-primary hover:bg-primary/90"
              >
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};