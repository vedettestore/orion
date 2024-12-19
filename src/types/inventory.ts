export interface Product {
  id: number;
  title: string;
  description?: string;
  vendor?: string;
  product_type?: string;
  status?: string;
  published?: boolean;
  variants?: Variant[];
  images?: ProductImage[];
}

export interface Variant {
  id: number;
  product_id: number;
  sku?: string;
  barcode?: string;
  price?: number;
  compare_at_price?: number;
  cost_per_item?: number;
  weight?: number;
  weight_unit?: string;
  inventory_quantity?: number;
  inventory_policy?: string;
  fulfillment_service?: string;
  inventory_management?: string;
  taxable?: boolean;
  requires_shipping?: boolean;
  options?: VariantOption[];
  images?: ProductImage[];
}

export interface VariantOption {
  id: number;
  variant_id: number;
  name: string;
  value: string;
  position: number;
}

export interface ProductImage {
  id: number;
  product_id?: number;
  variant_id?: number;
  src: string;
  position?: number;
  alt?: string;
}

export interface InventoryLevel {
  id: number;
  variant_id: number;
  location_id: number;
  available: number;
}