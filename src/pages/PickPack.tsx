import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PickingWorkflow } from "@/components/picking/PickingWorkflow";
import { PackingWorkflow } from "@/components/picking/PackingWorkflow";
import { ShippingWorkflow } from "@/components/picking/ShippingWorkflow";

const PickPack = () => {
  const [activeTab, setActiveTab] = useState("pick");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pick & Pack</h1>
              <p className="text-muted-foreground">Manage order fulfillment workflow</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pick">Pick</TabsTrigger>
              <TabsTrigger value="pack">Pack</TabsTrigger>
              <TabsTrigger value="ship">Ship</TabsTrigger>
            </TabsList>
            <TabsContent value="pick">
              <PickingWorkflow />
            </TabsContent>
            <TabsContent value="pack">
              <PackingWorkflow />
            </TabsContent>
            <TabsContent value="ship">
              <ShippingWorkflow />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PickPack;