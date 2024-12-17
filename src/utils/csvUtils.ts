import Papa from 'papaparse';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { TablesInsert } from '@/integrations/supabase/types';

type InventoryInsert = TablesInsert<'inventory'>;

const validateAndTransformInventoryData = (data: unknown): InventoryInsert | null => {
  if (typeof data !== 'object' || data === null) return null;
  
  const record = data as Record<string, unknown>;
  
  // Name is required
  if (!record.name || typeof record.name !== 'string') return null;
  
  const inventory: InventoryInsert = {
    name: record.name,
    // Optional fields
    type: typeof record.type === 'string' ? record.type : null,
    tags: typeof record.tags === 'string' ? record.tags : null,
    size: typeof record.size === 'string' ? record.size : null,
    color: typeof record.color === 'string' ? record.color : null,
    sku: typeof record.sku === 'string' ? record.sku : null,
    description: typeof record.description === 'string' ? record.description : null,
    category: typeof record.category === 'string' ? record.category : null,
    "inventory tracker": typeof record["inventory tracker"] === 'string' ? record["inventory tracker"] : null,
    "inventory policy": typeof record["inventory policy"] === 'string' ? record["inventory policy"] : null,
    price: typeof record.price === 'number' ? record.price : null,
    barcode: typeof record.barcode === 'string' ? record.barcode : null,
    "image url": typeof record["image url"] === 'string' ? record["image url"] : null,
    "variant image url": typeof record["variant image url"] === 'string' ? record["variant image url"] : null,
    status: typeof record.status === 'string' ? record.status : null,
    quantity: typeof record.quantity === 'number' ? record.quantity : 0,
  };

  return inventory;
};

export const exportInventoryToCSV = async () => {
  try {
    const { data, error } = await supabase
      .from('inventory')
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
          // Transform and validate the data
          const validInventoryItems = results.data
            .map(validateAndTransformInventoryData)
            .filter((item): item is InventoryInsert => item !== null);

          if (validInventoryItems.length === 0) {
            throw new Error('No valid inventory items found in CSV');
          }

          const { error } = await supabase
            .from('inventory')
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