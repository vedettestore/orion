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
import { VariantForm } from "./VariantForm";
import { useState } from "react";

interface InventoryItem {
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
}

interface EditInventoryFormProps {
  item: InventoryItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditInventoryForm = ({
  item,
  open,
  onOpenChange,
}: EditInventoryFormProps) => {
  const [showVariantForm, setShowVariantForm] = useState(false);
  const form = useForm({
    defaultValues: {
      title: item.title,
      type: item.type || "",
      variant_sku: item.variant_sku || "",
      status: item.status || "",
      image_src: item.image_src || "",
      variant_grams: item.variant_grams || 0,
      variant_barcode: item.variant_barcode || "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate: updateItem, isPending } = useMutation({
    mutationFn: async (values: Partial<InventoryItem>) => {
      const { error } = await supabase
        .from("staging_shopify_inventory")
        .update(values)
        .eq("variant_sku", item.variant_sku);

      if (error) throw error;
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

  const { mutate: addVariant } = useMutation({
    mutationFn: async (variantData: { variant_sku: string; attributes: Record<string, string> }) => {
      const { error } = await supabase
        .from("staging_shopify_inventory")
        .insert({
          title: `${item.title} - Variant`,
          variant_sku: variantData.variant_sku,
          option1_name: Object.keys(variantData.attributes)[0],
          option1_value: Object.values(variantData.attributes)[0],
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      toast.success("Variant added successfully");
      setShowVariantForm(false);
    },
    onError: (error) => {
      toast.error("Failed to add variant");
      console.error("Error adding variant:", error);
    },
  });

  const onSubmit = (values: Partial<InventoryItem>) => {
    updateItem(values);
  };

  const canAddVariant = item.title && !item.option1_name;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Edit Inventory Item
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
            <FormFields form={form} />
            {canAddVariant && (
              <div className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowVariantForm(!showVariantForm)}
                >
                  {showVariantForm ? "Hide Variant Form" : "Add Variant"}
                </Button>
                {showVariantForm && (
                  <div className="mt-4">
                    <VariantForm onAddVariant={addVariant} />
                  </div>
                )}
              </div>
            )}
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