export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      inventory: {
        Row: {
          barcode: string | null
          category: string | null
          color: string | null
          description: string | null
          id: number
          "image url": string | null
          "inventory policy": string | null
          "inventory tracker": string | null
          name: string
          price: number | null
          size: string | null
          sku: string | null
          status: string | null
          tags: string | null
          type: string | null
          "variant image url": string | null
        }
        Insert: {
          barcode?: string | null
          category?: string | null
          color?: string | null
          description?: string | null
          id?: number
          "image url"?: string | null
          "inventory policy"?: string | null
          "inventory tracker"?: string | null
          name: string
          price?: number | null
          size?: string | null
          sku?: string | null
          status?: string | null
          tags?: string | null
          type?: string | null
          "variant image url"?: string | null
        }
        Update: {
          barcode?: string | null
          category?: string | null
          color?: string | null
          description?: string | null
          id?: number
          "image url"?: string | null
          "inventory policy"?: string | null
          "inventory tracker"?: string | null
          name?: string
          price?: number | null
          size?: string | null
          sku?: string | null
          status?: string | null
          tags?: string | null
          type?: string | null
          "variant image url"?: string | null
        }
        Relationships: []
      }
      packing_list_items: {
        Row: {
          id: number
          inventory_id: number | null
          packed_at: string | null
          packed_by: string | null
          packing_list_id: number | null
          quantity_packed: number | null
          quantity_required: number
          status: string | null
        }
        Insert: {
          id?: number
          inventory_id?: number | null
          packed_at?: string | null
          packed_by?: string | null
          packing_list_id?: number | null
          quantity_packed?: number | null
          quantity_required: number
          status?: string | null
        }
        Update: {
          id?: number
          inventory_id?: number | null
          packed_at?: string | null
          packed_by?: string | null
          packing_list_id?: number | null
          quantity_packed?: number | null
          quantity_required?: number
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "packing_list_items_packing_list_id_fkey"
            columns: ["packing_list_id"]
            isOneToOne: false
            referencedRelation: "packing_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      packing_lists: {
        Row: {
          created_at: string | null
          created_by: string | null
          customer_name: string | null
          id: number
          notes: string | null
          order_number: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          customer_name?: string | null
          id?: number
          notes?: string | null
          order_number: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          customer_name?: string | null
          id?: number
          notes?: string | null
          order_number?: string
          status?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      purchase_order_items: {
        Row: {
          created_at: string | null
          id: number
          inventory_id: number | null
          purchase_order_id: number | null
          quantity: number
          total_price: number | null
          unit_price: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          inventory_id?: number | null
          purchase_order_id?: number | null
          quantity?: number
          total_price?: number | null
          unit_price?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          inventory_id?: number | null
          purchase_order_id?: number | null
          quantity?: number
          total_price?: number | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_order_items_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_orders: {
        Row: {
          created_by: string | null
          customer_name: string | null
          date_ordered: string | null
          id: number
          notes: string | null
          order_total: number | null
          po_number: string
          shipping_address: string | null
          shipping_method: string | null
          shipping_status: string | null
          status: string | null
        }
        Insert: {
          created_by?: string | null
          customer_name?: string | null
          date_ordered?: string | null
          id?: number
          notes?: string | null
          order_total?: number | null
          po_number: string
          shipping_address?: string | null
          shipping_method?: string | null
          shipping_status?: string | null
          status?: string | null
        }
        Update: {
          created_by?: string | null
          customer_name?: string | null
          date_ordered?: string | null
          id?: number
          notes?: string | null
          order_total?: number | null
          po_number?: string
          shipping_address?: string | null
          shipping_method?: string | null
          shipping_status?: string | null
          status?: string | null
        }
        Relationships: []
      }
      scan_counts: {
        Row: {
          batch_id: string | null
          count: number | null
          id: number
          inventory_id: number | null
          notes: string | null
          scanned_at: string | null
          scanned_by: string | null
        }
        Insert: {
          batch_id?: string | null
          count?: number | null
          id?: number
          inventory_id?: number | null
          notes?: string | null
          scanned_at?: string | null
          scanned_by?: string | null
        }
        Update: {
          batch_id?: string | null
          count?: number | null
          id?: number
          inventory_id?: number | null
          notes?: string | null
          scanned_at?: string | null
          scanned_by?: string | null
        }
        Relationships: []
      }
      shipment_events: {
        Row: {
          created_by: string | null
          description: string | null
          id: number
          location: string | null
          shipment_id: number | null
          status: string
          timestamp: string | null
        }
        Insert: {
          created_by?: string | null
          description?: string | null
          id?: number
          location?: string | null
          shipment_id?: number | null
          status: string
          timestamp?: string | null
        }
        Update: {
          created_by?: string | null
          description?: string | null
          id?: number
          location?: string | null
          shipment_id?: number | null
          status?: string
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shipment_events_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      shipments: {
        Row: {
          actual_delivery: string | null
          carrier: string | null
          created_at: string | null
          estimated_delivery: string | null
          id: number
          notes: string | null
          purchase_order_id: number | null
          shipping_address: string | null
          shipping_method: string | null
          status: string | null
          tracking_number: string | null
          updated_at: string | null
        }
        Insert: {
          actual_delivery?: string | null
          carrier?: string | null
          created_at?: string | null
          estimated_delivery?: string | null
          id?: number
          notes?: string | null
          purchase_order_id?: number | null
          shipping_address?: string | null
          shipping_method?: string | null
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_delivery?: string | null
          carrier?: string | null
          created_at?: string | null
          estimated_delivery?: string | null
          id?: number
          notes?: string | null
          purchase_order_id?: number | null
          shipping_address?: string | null
          shipping_method?: string | null
          status?: string | null
          tracking_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shipments_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
