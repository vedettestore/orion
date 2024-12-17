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
import { Json } from "@/integrations/supabase/types";

interface InventoryItem {
  id: number;
  name: string;
  type?: string;
  sku?: string;
  status?: string;
  "image url"?: string;
  quantity?: number;
  barcode?: string;
  is_variant?: boolean;
  parent_id?: number | null;
  variant_attributes?: Json;
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
      name: item.name,
      type: item.type || "",
      sku: item.sku || "",
      status: item.status || "",
      "image url": item["image url"] || "",
      quantity: item.quantity || 0,
      barcode: item.barcode || "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate: updateItem, isPending } = useMutation({
    mutationFn: async (values: Partial<Omit<InventoryItem, "id">>) => {
      const { error } = await supabase
        .from("inventory")
        .update(values)
        .eq("id", item.id);

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
    mutationFn: async (variantData: { sku: string; attributes: Record<string, string> }) => {
      const { error } = await supabase
        .from("inventory")
        .insert({
          name: `${item.name} - Variant`,
          sku: variantData.sku,
          parent_id: item.id,
          is_variant: true,
          variant_attributes: variantData.attributes,
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

  const onSubmit = (values: Partial<Omit<InventoryItem, "id">>) => {
    updateItem(values);
  };

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
            {!item.is_variant && (
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