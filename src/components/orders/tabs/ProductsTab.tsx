import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  sku: string;
  stock: number;
  location: string;
  quantity?: number;
  price?: number;
}

interface ProductsTabProps {
  selectedProducts: Product[];
  handleQuantityChange: (productId: string, quantity: string) => void;
  handleRemoveProduct: (productId: string) => void;
  warehouseAvailability: Record<string, any>;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({
  selectedProducts,
  handleQuantityChange,
  handleRemoveProduct,
  warehouseAvailability,
}) => {
  const [customerSearch, setCustomerSearch] = useState('');
  const [skuSearch, setSkuSearch] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Fetch products based on SKU search
  const { data: products } = useQuery({
    queryKey: ['products', skuSearch],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('variants')
        .select('id, sku, price, products(title)')
        .ilike('sku', `%${skuSearch}%`)
        .limit(5);

      if (error) throw error;
      return data;
    },
    enabled: skuSearch.length > 2,
  });

  const calculateSubtotal = () => {
    return selectedProducts.reduce((sum, product) => {
      return sum + (product.quantity || 0) * (product.price || 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Customer Search */}
            <div className="relative">
              <label className="text-sm font-medium">Customer Name</label>
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search customer..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Product Search */}
            <div className="relative">
              <label className="text-sm font-medium">Product SKU</label>
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by SKU..."
                  value={skuSearch}
                  onChange={(e) => setSkuSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
              {products && products.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        // Add product to selected products
                        const newProduct = {
                          id: product.id,
                          name: product.products.title,
                          sku: product.sku,
                          price: product.price,
                          quantity: quantity,
                        };
                        // Call parent component to add product
                      }}
                    >
                      <div className="flex justify-between">
                        <span>{product.sku}</span>
                        <span>${product.price}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {product.products.title}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Products */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="flex-grow">
                  <h4 className="font-medium">{product.name}</h4>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline">SKU: {product.sku}</Badge>
                    <Badge variant="outline">${product.price}</Badge>
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

            {/* Subtotal */}
            <div className="flex justify-end pt-4 border-t">
              <div className="text-right">
                <div className="text-sm text-gray-600">Subtotal</div>
                <div className="text-xl font-bold">${calculateSubtotal().toFixed(2)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};