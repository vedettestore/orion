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
      images: {
        Row: {
          id: number
          image_src: string | null
          product_id: number | null
          variant_image: string | null
        }
        Insert: {
          id?: number
          image_src?: string | null
          product_id?: number | null
          variant_image?: string | null
        }
        Update: {
          id?: number
          image_src?: string | null
          product_id?: number | null
          variant_image?: string | null
        }
        Relationships: []
      }
      inventory_levels: {
        Row: {
          available: number | null
          created_at: string | null
          id: number
          location_id: number | null
          updated_at: string | null
          variant_id: number | null
        }
        Insert: {
          available?: number | null
          created_at?: string | null
          id?: number
          location_id?: number | null
          updated_at?: string | null
          variant_id?: number | null
        }
        Update: {
          available?: number | null
          created_at?: string | null
          id?: number
          location_id?: number | null
          updated_at?: string | null
          variant_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_levels_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      kit_components: {
        Row: {
          created_at: string | null
          id: number
          kit_id: number | null
          quantity: number
          variant_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          kit_id?: number | null
          quantity?: number
          variant_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: never
          kit_id?: number | null
          quantity?: number
          variant_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "kit_components_kit_id_fkey"
            columns: ["kit_id"]
            isOneToOne: false
            referencedRelation: "kits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "kit_components_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      kits: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: never
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: never
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      locations: {
        Row: {
          aisle: string
          bin: string
          created_at: string | null
          id: number
          rack: string
          shelf: string
          updated_at: string | null
          zone_id: number | null
        }
        Insert: {
          aisle: string
          bin: string
          created_at?: string | null
          id?: never
          rack: string
          shelf: string
          updated_at?: string | null
          zone_id?: number | null
        }
        Update: {
          aisle?: string
          bin?: string
          created_at?: string | null
          id?: never
          rack?: string
          shelf?: string
          updated_at?: string | null
          zone_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "locations_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
        ]
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
          channel_type: string | null
          created_at: string | null
          created_by: string | null
          customer_name: string | null
          id: number
          notes: string | null
          order_number: string
          status: string | null
        }
        Insert: {
          channel_type?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_name?: string | null
          id?: number
          notes?: string | null
          order_number: string
          status?: string | null
        }
        Update: {
          channel_type?: string | null
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
      picking_waves: {
        Row: {
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          id: number
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: never
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: never
          status?: string | null
        }
        Relationships: []
      }
      product_images: {
        Row: {
          alt: string | null
          created_at: string | null
          id: number
          position: number | null
          product_id: number | null
          src: string | null
          updated_at: string | null
          variant_id: number | null
        }
        Insert: {
          alt?: string | null
          created_at?: string | null
          id?: number
          position?: number | null
          product_id?: number | null
          src?: string | null
          updated_at?: string | null
          variant_id?: number | null
        }
        Update: {
          alt?: string | null
          created_at?: string | null
          id?: number
          position?: number | null
          product_id?: number | null
          src?: string | null
          updated_at?: string | null
          variant_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_images_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          description: string | null
          id: number
          product_type: string | null
          published: boolean | null
          status: string | null
          title: string | null
          vendor: string | null
        }
        Insert: {
          description?: string | null
          id?: number
          product_type?: string | null
          published?: boolean | null
          status?: string | null
          title?: string | null
          vendor?: string | null
        }
        Update: {
          description?: string | null
          id?: number
          product_type?: string | null
          published?: boolean | null
          status?: string | null
          title?: string | null
          vendor?: string | null
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
      purchase_orders_suppliers: {
        Row: {
          created_at: string | null
          id: number
          purchase_order_id: number | null
          supplier_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          purchase_order_id?: number | null
          supplier_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          purchase_order_id?: number | null
          supplier_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_orders_suppliers_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_suppliers_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
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
      staging_shopify_inventory: {
        Row: {
          category: string | null
          cost_per_item: number | null
          description: string | null
          image_src: string | null
          option1_name: string | null
          option1_value: string | null
          option2_name: string | null
          option2_value: string | null
          published: boolean | null
          status: string | null
          tags: string | null
          title: string | null
          type: string | null
          variant_barcode: string | null
          variant_compare_at_price: number | null
          variant_fulfillment_service: string | null
          variant_grams: number | null
          variant_image: string | null
          variant_inventory_policy: string | null
          variant_inventory_tracker: string | null
          variant_price: number | null
          variant_requires_shipping: boolean | null
          variant_sku: string | null
          variant_taxable: boolean | null
          variant_weight_unit: string | null
          vendor: string | null
        }
        Insert: {
          category?: string | null
          cost_per_item?: number | null
          description?: string | null
          image_src?: string | null
          option1_name?: string | null
          option1_value?: string | null
          option2_name?: string | null
          option2_value?: string | null
          published?: boolean | null
          status?: string | null
          tags?: string | null
          title?: string | null
          type?: string | null
          variant_barcode?: string | null
          variant_compare_at_price?: number | null
          variant_fulfillment_service?: string | null
          variant_grams?: number | null
          variant_image?: string | null
          variant_inventory_policy?: string | null
          variant_inventory_tracker?: string | null
          variant_price?: number | null
          variant_requires_shipping?: boolean | null
          variant_sku?: string | null
          variant_taxable?: boolean | null
          variant_weight_unit?: string | null
          vendor?: string | null
        }
        Update: {
          category?: string | null
          cost_per_item?: number | null
          description?: string | null
          image_src?: string | null
          option1_name?: string | null
          option1_value?: string | null
          option2_name?: string | null
          option2_value?: string | null
          published?: boolean | null
          status?: string | null
          tags?: string | null
          title?: string | null
          type?: string | null
          variant_barcode?: string | null
          variant_compare_at_price?: number | null
          variant_fulfillment_service?: string | null
          variant_grams?: number | null
          variant_image?: string | null
          variant_inventory_policy?: string | null
          variant_inventory_tracker?: string | null
          variant_price?: number | null
          variant_requires_shipping?: boolean | null
          variant_sku?: string | null
          variant_taxable?: boolean | null
          variant_weight_unit?: string | null
          vendor?: string | null
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          id: number
          name: string
          phone: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          name: string
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: number
          name?: string
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tags: {
        Row: {
          id: number
          product_id: number | null
          tag: string | null
        }
        Insert: {
          id?: number
          product_id?: number | null
          tag?: string | null
        }
        Update: {
          id?: number
          product_id?: number | null
          tag?: string | null
        }
        Relationships: []
      }
      tags_staging: {
        Row: {
          product_id: number | null
          tag: string | null
        }
        Insert: {
          product_id?: number | null
          tag?: string | null
        }
        Update: {
          product_id?: number | null
          tag?: string | null
        }
        Relationships: []
      }
      variant_options: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
          position: number | null
          updated_at: string | null
          value: string | null
          variant_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
          position?: number | null
          updated_at?: string | null
          value?: string | null
          variant_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
          position?: number | null
          updated_at?: string | null
          value?: string | null
          variant_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "variant_options_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      variants: {
        Row: {
          barcode: string | null
          compare_at_price: number | null
          cost_per_item: number | null
          fulfillment_service: string | null
          id: number
          inventory_policy: string | null
          inventory_tracker: string | null
          location_id: number | null
          option1_name: string | null
          option1_value: string | null
          option2_name: string | null
          option2_value: string | null
          price: number | null
          product_id: number | null
          requires_shipping: boolean | null
          sku: string | null
          taxable: boolean | null
          weight: number | null
          weight_unit: string | null
        }
        Insert: {
          barcode?: string | null
          compare_at_price?: number | null
          cost_per_item?: number | null
          fulfillment_service?: string | null
          id?: number
          inventory_policy?: string | null
          inventory_tracker?: string | null
          location_id?: number | null
          option1_name?: string | null
          option1_value?: string | null
          option2_name?: string | null
          option2_value?: string | null
          price?: number | null
          product_id?: number | null
          requires_shipping?: boolean | null
          sku?: string | null
          taxable?: boolean | null
          weight?: number | null
          weight_unit?: string | null
        }
        Update: {
          barcode?: string | null
          compare_at_price?: number | null
          cost_per_item?: number | null
          fulfillment_service?: string | null
          id?: number
          inventory_policy?: string | null
          inventory_tracker?: string | null
          location_id?: number | null
          option1_name?: string | null
          option1_value?: string | null
          option2_name?: string | null
          option2_value?: string | null
          price?: number | null
          product_id?: number | null
          requires_shipping?: boolean | null
          sku?: string | null
          taxable?: boolean | null
          weight?: number | null
          weight_unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "variants_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      wave_orders: {
        Row: {
          created_at: string | null
          id: number
          packing_list_id: number | null
          wave_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          packing_list_id?: number | null
          wave_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: never
          packing_list_id?: number | null
          wave_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "wave_orders_packing_list_id_fkey"
            columns: ["packing_list_id"]
            isOneToOne: false
            referencedRelation: "packing_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wave_orders_wave_id_fkey"
            columns: ["wave_id"]
            isOneToOne: false
            referencedRelation: "picking_waves"
            referencedColumns: ["id"]
          },
        ]
      }
      zones: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: never
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: never
          name?: string
          updated_at?: string | null
        }
        Relationships: []
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
