export type ShipmentRow = {
  id: number;
  tracking_number: string | null;
  carrier: string | null;
  status: string | null;
  estimated_delivery: string | null;
  actual_delivery: string | null;
  created_at: string | null;
  updated_at: string | null;
  purchase_order_id: number | null;
  shipping_address: string | null;
  shipping_method: string | null;
  notes: string | null;
};

export type ShipmentEventRow = {
  id: number;
  shipment_id: number | null;
  status: string;
  location: string | null;
  timestamp: string | null;
  description: string | null;
  created_by: string | null;
};