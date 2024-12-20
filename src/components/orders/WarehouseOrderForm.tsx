import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrderInfoTab } from './tabs/OrderInfoTab';
import { ProductsTab } from './tabs/ProductsTab';
import { FulfillmentTab } from './tabs/FulfillmentTab';
import { DocumentsTab } from './tabs/DocumentsTab';
import { useIsMobile } from '@/hooks/use-mobile';

const WarehouseOrderForm = () => {
  const isMobile = useIsMobile();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, quantity: parseInt(quantity) || 0 }
          : product
      )
    );
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(prev =>
      prev.filter(product => product.id !== productId)
    );
  };

  return (
    <div className={`space-y-4 ${isMobile ? 'pb-20' : 'p-6'}`}>
      <Tabs defaultValue="orderInfo" className="w-full">
        <TabsList className={`${isMobile ? 'w-full grid grid-cols-4 gap-1' : ''}`}>
          <TabsTrigger 
            value="orderInfo" 
            className={`${isMobile ? 'text-xs py-2 px-1' : ''}`}
          >
            Order Info
          </TabsTrigger>
          <TabsTrigger 
            value="products"
            className={`${isMobile ? 'text-xs py-2 px-1' : ''}`}
          >
            Products
          </TabsTrigger>
          <TabsTrigger 
            value="fulfillment"
            className={`${isMobile ? 'text-xs py-2 px-1' : ''}`}
          >
            Fulfillment
          </TabsTrigger>
          <TabsTrigger 
            value="documents"
            className={`${isMobile ? 'text-xs py-2 px-1' : ''}`}
          >
            Documents
          </TabsTrigger>
        </TabsList>

        <div className={`${isMobile ? 'mt-4' : ''}`}>
          <TabsContent value="orderInfo">
            <OrderInfoTab
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              setFormData={setFormData}
            />
          </TabsContent>

          <TabsContent value="products">
            <ProductsTab
              selectedProducts={selectedProducts}
              handleQuantityChange={handleQuantityChange}
              handleRemoveProduct={handleRemoveProduct}
              warehouseAvailability={warehouseAvailability}
            />
          </TabsContent>

          <TabsContent value="fulfillment">
            <FulfillmentTab
              formData={formData}
              handleSelectChange={handleSelectChange}
              setFormData={setFormData}
            />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default WarehouseOrderForm;