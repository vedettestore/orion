import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ShippingDetailsFormProps {
  customerName: string;
  shippingAddress: string;
  shippingMethod: string;
  onCustomerNameChange: (value: string) => void;
  onShippingAddressChange: (value: string) => void;
  onShippingMethodChange: (value: string) => void;
}

export function ShippingDetailsForm({
  customerName,
  shippingAddress,
  shippingMethod,
  onCustomerNameChange,
  onShippingAddressChange,
  onShippingMethodChange,
}: ShippingDetailsFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="customerName">Customer Name</Label>
        <Input
          id="customerName"
          value={customerName}
          onChange={(e) => onCustomerNameChange(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="shippingAddress">Shipping Address</Label>
        <Textarea
          id="shippingAddress"
          value={shippingAddress}
          onChange={(e) => onShippingAddressChange(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="shippingMethod">Shipping Method</Label>
        <Input
          id="shippingMethod"
          value={shippingMethod}
          onChange={(e) => onShippingMethodChange(e.target.value)}
          required
        />
      </div>
    </div>
  );
}