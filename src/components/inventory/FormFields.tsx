import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface InventoryFormData {
  name: string;
  type: string;
  sku: string;
  status: string;
  "image url": string;
  quantity: number;
}

interface FormFieldsProps {
  form: UseFormReturn<InventoryFormData>;
}

export const FormFields = ({ form }: FormFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">Name</FormLabel>
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
        name="sku"
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
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">Quantity</FormLabel>
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
        name="image url"
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