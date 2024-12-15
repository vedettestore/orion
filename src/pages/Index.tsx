import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { StatsCard } from "@/components/StatsCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { Box, Boxes, Users, AlertTriangle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();

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
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back to your warehouse overview</p>
            </div>
            <div className="space-x-4">
              <Button variant="outline" className="bg-soft-gray hover:bg-soft-gray/90">
                Export Report
              </Button>
              <Button className="bg-soft-blue hover:bg-soft-blue/90 text-gray-800">
                Add Item
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              title="Total Items"
              value="2,345"
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

          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Scan Inventory</h2>
              <BarcodeScanner />
            </div>
            <ActivityFeed />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;