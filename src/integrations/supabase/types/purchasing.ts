export type PurchaseOrderRow = {
  id: number;
  po_number: string;
  customer_name: string | null;
  order_total: number | null;
  status: string | null;
  date_ordered: string | null;
  created_by: string | null;
  notes: string | null;
  shipping_status: string | null;
  shipping_address: string | null;
  shipping_method: string | null;
};

export type PurchaseOrderItemRow = {
  id: number;
  purchase_order_id: number | null;
  inventory_id: number | null;
  quantity: number;
  unit_price: number | null;
  total_price: number | null;
  created_at: string | null;
};

export type PurchaseOrderSupplierRow = {
  id: number;
  purchase_order_id: number | null;
  supplier_id: number | null;
  created_at: string | null;
};