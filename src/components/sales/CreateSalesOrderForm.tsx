import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { ProductSelect } from "./ProductSelect";

const paymentTermsOptions = [
  { value: "net30", label: "Net 30" },
  { value: "net60", label: "Net 60" },
  { value: "cod", label: "Cash on Delivery" },
  { value: "prepaid", label: "Prepaid" },
];

const salesOrderSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required"),
  companyName: z.string().min(1, "Company name is required"),
  customerName: z.string().min(1, "Customer name is required"),
  shippingAddress: z.string().min(1, "Shipping address is required"),
  paymentTerms: z.string().min(1, "Payment terms are required"),
});

type SalesOrderFormValues = z.infer<typeof salesOrderSchema>;

interface OrderProduct {
  sku: string;
  quantity: number;
}

export function CreateSalesOrderForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<OrderProduct[]>([]);

  const form = useForm<SalesOrderFormValues>({
    resolver: zodResolver(salesOrderSchema),
    defaultValues: {
      paymentTerms: "net30",
    },
  });

  const handleAddProduct = (product: OrderProduct) => {
    setSelectedProducts((prev) => [...prev, product]);
  };

  const handleRemoveProduct = (index: number) => {
    setSelectedProducts((prev) => prev.filter((_, i) => i !== index));
  };

  async function onSubmit(data: SalesOrderFormValues) {
    setIsSubmitting(true);
    try {
      // Here you would typically save the order to your backend
      console.log("Form data:", { ...data, products: selectedProducts });
      
      toast({
        title: "Order created",
        description: `Order ${data.orderNumber} has been created successfully.`,
      });

      navigate("/sales");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="orderNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter order number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentTerms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Terms</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {paymentTermsOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter customer name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shippingAddress"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Shipping Address</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter shipping address"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Products</h3>
            <ProductSelect onAddProduct={handleAddProduct} />
          </div>

          {selectedProducts.length > 0 && (
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">Selected Products</h4>
              <div className="space-y-2">
                {selectedProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded"
                  >
                    <span>
                      {product.sku} - Qty: {product.quantity}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/sales")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Create Order
          </Button>
        </div>
      </form>
    </Form>
  );
}