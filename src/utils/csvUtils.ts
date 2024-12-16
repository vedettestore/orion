import Papa from 'papaparse';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
          const { error } = await supabase
            .from('inventory')
            .insert(results.data);

          if (error) throw error;
          
          toast.success('Inventory imported successfully');
          resolve(results.data);
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