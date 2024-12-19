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
        <main className="flex-1 p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Pick & Pack</h1>
              <p className="text-muted-foreground">Manage order fulfillment workflow</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pick">Pick</TabsTrigger>
              <TabsTrigger value="pack">Pack</TabsTrigger>
              <TabsTrigger value="ship">Ship</TabsTrigger>
            </TabsList>
            <TabsContent value="pick" className="mt-4 md:mt-6">
              <PickingWorkflow />
            </TabsContent>
            <TabsContent value="pack" className="mt-4 md:mt-6">
              <PackingWorkflow />
            </TabsContent>
            <TabsContent value="ship" className="mt-4 md:mt-6">
              <ShippingWorkflow />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PickPack;