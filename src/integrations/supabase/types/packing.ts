export type PackingListRow = {
  id: number;
  order_number: string;
  customer_name: string | null;
  status: string | null;
  created_at: string | null;
  created_by: string | null;
  notes: string | null;
};

export type PackingListItemRow = {
  id: number;
  packing_list_id: number | null;
  inventory_id: number | null;
  quantity_required: number;
  quantity_packed: number | null;
  status: string | null;
  packed_at: string | null;
  packed_by: string | null;
};