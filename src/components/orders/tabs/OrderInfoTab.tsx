import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PackageSearch, Truck, Clock, AlertTriangle } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface OrderInfoTabProps {
  formData: {
    orderType: string;
    companyName: string;
    customerReference: string;
    shippingPriority: string;
    preferredWarehouse: string;
    specialInstructions: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  setFormData: (value: React.SetStateAction<any>) => void;
}

export const OrderInfoTab: React.FC<OrderInfoTabProps> = ({
  formData,
  handleInputChange,
  handleSelectChange,
  setFormData,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PackageSearch className="w-5 h-5" />
          Order Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Order Number</label>
            <Input placeholder="Auto-generated" disabled />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Order Type</label>
            <Select
              value={formData.orderType}
              onValueChange={(value) => handleSelectChange('orderType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select order type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Order</SelectItem>
                <SelectItem value="rush">Rush Order</SelectItem>
                <SelectItem value="backorder">Backorder</SelectItem>
                <SelectItem value="preorder">Pre-order</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Name</label>
            <Input
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Enter company name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Customer Reference</label>
            <Input
              name="customerReference"
              value={formData.customerReference}
              onChange={handleInputChange}
              placeholder="PO or reference number"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Shipping Priority</label>
          <div className="grid grid-cols-3 gap-2">
            {['standard', 'express', 'urgent'].map(priority => (
              <Button
                key={priority}
                variant="outline"
                className={`flex items-center gap-2 ${
                  formData.shippingPriority === priority ? 'bg-primary text-primary-foreground' : ''
                }`}
                onClick={() => setFormData(prev => ({ ...prev, shippingPriority: priority }))}
              >
                {priority === 'standard' && <Clock className="w-4 h-4" />}
                {priority === 'express' && <Truck className="w-4 h-4" />}
                {priority === 'urgent' && <AlertTriangle className="w-4 h-4" />}
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Preferred Warehouse</label>
          <Select
            value={formData.preferredWarehouse}
            onValueChange={(value) => handleSelectChange('preferredWarehouse', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select warehouse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main">Main Warehouse</SelectItem>
              <SelectItem value="north">North Distribution Center</SelectItem>
              <SelectItem value="south">South Distribution Center</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Special Instructions</label>
          <Textarea
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleInputChange}
            placeholder="Enter any special handling or shipping instructions"
          />
        </div>
      </CardContent>
    </Card>
  );
};