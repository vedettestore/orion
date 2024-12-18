import Papa from 'papaparse';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { TablesInsert } from '@/integrations/supabase/types';

type InventoryInsert = TablesInsert<'staging_shopify_inventory'>;

const validateAndTransformInventoryData = (data: unknown): InventoryInsert | null => {
  if (typeof data !== 'object' || data === null) return null;
  
  const record = data as Record<string, unknown>;
  
  // Title is required
  if (!record.title || typeof record.title !== 'string') return null;
  
  const inventory: InventoryInsert = {
    title: record.title,
    description: typeof record.description === 'string' ? record.description : null,
    vendor: typeof record.vendor === 'string' ? record.vendor : null,
    category: typeof record.category === 'string' ? record.category : null,
    status: typeof record.status === 'string' ? record.status : null,
    type: typeof record.type === 'string' ? record.type : null,
    tags: typeof record.tags === 'string' ? record.tags : null,
    published: typeof record.published === 'boolean' ? record.published : null,
    variant_sku: typeof record.variant_sku === 'string' ? record.variant_sku : null,
    variant_barcode: typeof record.variant_barcode === 'string' ? record.variant_barcode : null,
    image_src: typeof record.image_src === 'string' ? record.image_src : null,
    variant_image: typeof record.variant_image === 'string' ? record.variant_image : null,
  };

  return inventory;
};

export const exportInventoryToCSV = async () => {
  try {
    const { data, error } = await supabase
      .from('staging_shopify_inventory')
      .select('*');

    if (error) throw error;

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `inventory_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Inventory exported successfully');
  } catch (error) {
    console.error('Export error:', error);
    toast.error('Failed to export inventory');
  }
};

export const importInventoryFromCSV = async (file: File) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        try {
          const validInventoryItems = results.data
            .map(validateAndTransformInventoryData)
            .filter((item): item is InventoryInsert => item !== null);

          if (validInventoryItems.length === 0) {
            throw new Error('No valid inventory items found in CSV');
          }

          const { error } = await supabase
            .from('staging_shopify_inventory')
            .insert(validInventoryItems);

          if (error) throw error;
          
          toast.success(`Successfully imported ${validInventoryItems.length} items`);
          resolve(validInventoryItems);
        } catch (error) {
          console.error('Import error:', error);
          toast.error('Failed to import inventory');
          reject(error);
        }
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
        toast.error('Failed to parse CSV file');
        reject(error);
      }
    });
  });
};