import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface InventoryFormData {
  title: string;
  type: string;
  variant_sku: string;
  status: string;
  image_src: string;
  variant_grams: number;
  variant_barcode: string;
}

interface FormFieldsProps {
  form: UseFormReturn<InventoryFormData>;
}

export const FormFields = ({ form }: FormFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">Title</FormLabel>
            <FormControl>
              <Input {...field} className="focus-visible:ring-primary" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">Type</FormLabel>
            <FormControl>
              <Input {...field} className="focus-visible:ring-primary" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="variant_sku"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">SKU</FormLabel>
            <FormControl>
              <Input {...field} className="focus-visible:ring-primary" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="variant_grams"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">Weight (grams)</FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="focus-visible:ring-primary"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="variant_barcode"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">UPC/Barcode</FormLabel>
            <FormControl>
              <Input {...field} className="focus-visible:ring-primary" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">Status</FormLabel>
            <FormControl>
              <Input {...field} className="focus-visible:ring-primary" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="image_src"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">Image URL</FormLabel>
            <FormControl>
              <Input {...field} className="focus-visible:ring-primary" />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};