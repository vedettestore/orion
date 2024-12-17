import { InventoryRow } from './inventory';
import { ProfileRow } from './profiles';
import { PackingListRow, PackingListItemRow } from './packing';
import { PurchaseOrderRow, PurchaseOrderItemRow, PurchaseOrderSupplierRow } from './purchasing';
import { ShipmentRow, ShipmentEventRow } from './shipping';
import { ScanCountRow } from './scanning';
import { SupplierRow } from './suppliers';

export type Database = {
  public: {
    Tables: {
      inventory: {
        Row: InventoryRow;
        Insert: Partial<InventoryRow>;
        Update: Partial<InventoryRow>;
      };
      profiles: {
        Row: ProfileRow;
        Insert: Partial<ProfileRow>;
        Update: Partial<ProfileRow>;
      };
      packing_lists: {
        Row: PackingListRow;
        Insert: Partial<PackingListRow>;
        Update: Partial<PackingListRow>;
      };
      packing_list_items: {
        Row: PackingListItemRow;
        Insert: Partial<PackingListItemRow>;
        Update: Partial<PackingListItemRow>;
      };
      purchase_orders: {
        Row: PurchaseOrderRow;
        Insert: Partial<PurchaseOrderRow>;
        Update: Partial<PurchaseOrderRow>;
      };
      purchase_order_items: {
        Row: PurchaseOrderItemRow;
        Insert: Partial<PurchaseOrderItemRow>;
        Update: Partial<PurchaseOrderItemRow>;
      };
      purchase_orders_suppliers: {
        Row: PurchaseOrderSupplierRow;
        Insert: Partial<PurchaseOrderSupplierRow>;
        Update: Partial<PurchaseOrderSupplierRow>;
      };
      shipments: {
        Row: ShipmentRow;
        Insert: Partial<ShipmentRow>;
        Update: Partial<ShipmentRow>;
      };
      shipment_events: {
        Row: ShipmentEventRow;
        Insert: Partial<ShipmentEventRow>;
        Update: Partial<ShipmentEventRow>;
      };
      scan_counts: {
        Row: ScanCountRow;
        Insert: Partial<ScanCountRow>;
        Update: Partial<ScanCountRow>;
      };
      suppliers: {
        Row: SupplierRow;
        Insert: Partial<SupplierRow>;
        Update: Partial<SupplierRow>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];