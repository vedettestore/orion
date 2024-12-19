import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PackageSearch, Truck, Clock, AlertTriangle } from 'lucide-react';

export const WarehouseOrderForm = () => {
  // Form state management
  const [formData, setFormData] = useState({
    orderType: 'standard',
    companyName: '',
    customerReference: '',
    shippingPriority: 'standard',
    preferredWarehouse: 'main',
    specialInstructions: '',
    pickingPriority: 'fifo',
    selectedDate: null,
    qualityControl: 'standard'
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [warehouseAvailability, setWarehouseAvailability] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle product quantity change
  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, quantity: parseInt(quantity) || 0 }
          : product
      )
    );
  };

  // Handle product removal
  const handleRemoveProduct = (productId) => {
    setSelectedProducts(prev =>
      prev.filter(product => product.id !== productId)
    );
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="orderInfo" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orderInfo">Order Information</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="fulfillment">Fulfillment</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="orderInfo">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PackageSearch className="w-5 h-5" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Basic Order Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Order Number</label>
                  <Input placeholder="Auto-generated" disabled />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Order Type</label>
                  <Select
                    name="orderType"
                    value={formData.orderType}
                    onChange={handleInputChange}
                  >
                    <option value="standard">Standard Order</option>
                    <option value="rush">Rush Order</option>
                    <option value="backorder">Backorder</option>
                    <option value="preorder">Pre-order</option>
                  </Select>
                </div>
              </div>

              {/* Customer Information */}
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

              {/* Shipping Information */}
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

              {/* Warehouse Allocation */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Preferred Warehouse</label>
                <Select
                  name="preferredWarehouse"
                  value={formData.preferredWarehouse}
                  onChange={handleInputChange}
                >
                  <option value="main">Main Warehouse</option>
                  <option value="north">North Distribution Center</option>
                  <option value="south">South Distribution Center</option>
                </Select>
              </div>

              {/* Special Instructions */}
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
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Product Selection Interface */}
                <div className="grid grid-cols-1 gap-4">
                  {selectedProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-grow">
                        <h4 className="font-medium">{product.name}</h4>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">SKU: {product.sku}</Badge>
                          <Badge variant="outline">Stock: {product.stock}</Badge>
                          <Badge variant="outline">Location: {product.location}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="number" 
                          className="w-24"
                          placeholder="Qty"
                          min="1"
                          value={product.quantity || ''}
                          onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRemoveProduct(product.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {Object.keys(warehouseAvailability).length > 0 && (
                  <Alert>
                    <AlertDescription>
                      Some products have limited availability. Please check stock levels.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fulfillment">
          <Card>
            <CardHeader>
              <CardTitle>Fulfillment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Picking Instructions */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Picking Priority</label>
                  <Select
                    name="pickingPriority"
                    value={formData.pickingPriority}
                    onChange={handleInputChange}
                  >
                    <option value="fifo">FIFO (First In, First Out)</option>
                    <option value="fefo">FEFO (First Expired, First Out)</option>
                    <option value="lifo">LIFO (Last In, First Out)</option>
                  </Select>
                </div>

                {/* Shipping Windows */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preferred Shipping Window</label>
                  <Calendar 
                    mode="single"
                    selected={formData.selectedDate}
                    onSelect={(date) => setFormData(prev => ({ ...prev, selectedDate: date }))}
                    className="rounded-md border"
                  />
                </div>

                {/* Quality Control Requirements */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quality Control</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['standard', 'enhanced'].map(qc => (
                      <Button
                        key={qc}
                        variant="outline"
                        className={formData.qualityControl === qc ? 'bg-primary text-primary-foreground' : ''}
                        onClick={() => setFormData(prev => ({ ...prev, qualityControl: qc }))}
                      >
                        {qc.charAt(0).toUpperCase() + qc.slice(1)} QC
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline">Generate Picking List</Button>
                  <Button variant="outline">Generate Packing Slip</Button>
                  <Button variant="outline">Generate Invoice</Button>
                  <Button variant="outline">Generate BOL</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Save as Draft</Button>
        <Button>Create Order</Button>
      </div>
    </div>
  );
};