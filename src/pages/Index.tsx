import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { StatsCard } from "@/components/StatsCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { Box, Boxes, TrendingUp, AlertTriangle, Package, Truck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarcodeScanner } from "@/components/scanner/BarcodeScanner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Tables } from "@/integrations/supabase/types";

const Index = () => {
  // Query for inventory items with low stock alert
  const { data: inventoryItems } = useQuery({
    queryKey: ['inventory'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('inventory')
        .select('*');
      
      if (error) {
        toast.error('Failed to fetch inventory');
        throw error;
      }
      
      return data as Tables<'inventory'>[];
    },
  });

  // Query for recent purchase orders - Fixed the ordering column from created_at to date_ordered
  const { data: recentOrders } = useQuery({
    queryKey: ['recent-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('purchase_orders')
        .select('*')
        .order('date_ordered', { ascending: false })
        .limit(5);
      
      if (error) {
        toast.error('Failed to fetch recent orders');
        throw error;
      }
      
      return data;
    },
  });

  // Calculate metrics
  const lowStockItems = inventoryItems?.filter(
    item => item.low_stock_threshold && (item.quantity || 0) <= (item.low_stock_threshold || 0)
  ) || [];

  const totalValue = inventoryItems?.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
    0
  ) || 0;

  const handleScan = (barcode: string) => {
    console.log("Barcode scanned:", barcode);
    toast.success(`Scanned barcode: ${barcode}`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back to your warehouse overview</p>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-4 w-full md:w-auto">
              <Button 
                variant="outline" 
                className="flex-1 md:flex-none"
              >
                Export Report
              </Button>
              <Button 
                className="flex-1 md:flex-none"
              >
                Add Item
              </Button>
            </div>
          </div>

          {lowStockItems.length > 0 && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Low Stock Alert</AlertTitle>
              <AlertDescription>
                {lowStockItems.length} items are below their minimum stock threshold
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
            <StatsCard
              title="Total Items"
              value={inventoryItems?.length.toString() || "0"}
              icon={Box}
              description="Total unique products"
            />
            <StatsCard
              title="Low Stock Items"
              value={lowStockItems.length.toString()}
              icon={AlertTriangle}
              description="Items below threshold"
            />
            <StatsCard
              title="Inventory Value"
              value={`$${totalValue.toFixed(2)}`}
              icon={TrendingUp}
              description="Total stock value"
            />
            <StatsCard
              title="Recent Orders"
              value={recentOrders?.length.toString() || "0"}
              icon={Package}
              description="Orders this week"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Scan Inventory</h2>
              <BarcodeScanner onScan={handleScan} />
            </div>
            <ActivityFeed />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;