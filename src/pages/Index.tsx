import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { StatsCard } from "@/components/StatsCard";
import { ActivityFeed } from "@/components/ActivityFeed";
import { Box, Boxes, Users, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
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
            <ActivityFeed />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;