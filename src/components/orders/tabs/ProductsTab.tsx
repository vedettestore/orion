import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Product {
  id: string;
  name: string;
  sku: string;
  stock: number;
  location: string;
  quantity?: number;
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Selection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
  );
};