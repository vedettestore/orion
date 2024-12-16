import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { StatsCard } from "@/components/StatsCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { Box, Boxes, Users, AlertTriangle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarcodeScanner } from "@/components/scanner/BarcodeScanner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const navigate = useNavigate();

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
      
      return data;
    },
  });

  const handleScan = (barcode: string) => {
    console.log("Barcode scanned:", barcode);
    toast.success(`Scanned barcode: ${barcode}`);
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/auth");
    } catch (error) {
      toast.error("Error signing out");
    }
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
                className="flex-1 md:flex-none bg-soft-gray hover:bg-soft-gray/90"
              >
                Export Report
              </Button>
              <Button 
                className="flex-1 md:flex-none bg-soft-blue hover:bg-soft-blue/90 text-gray-800"
              >
                Add Item
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="flex-1 md:flex-none"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
            <StatsCard
              title="Total Items"
              value={inventoryItems?.length.toString() || "0"}
              icon={Box}
              description="+20.1% from last month"
            />
            <StatsCard
              title="Low Stock Items"
              value="12"
              icon={AlertTriangle}
              description="Items below threshold"
            />
            <StatsCard
              title="Storage Locations"
              value="8"
              icon={Boxes}
              description="Across 3 warehouses"
            />
            <StatsCard
              title="Team Members"
              value="24"
              icon={Users}
              description="Active this week"
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