import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { WarehouseOrderForm } from "@/components/orders/WarehouseOrderForm";

export default function NewOrder() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Create New Order</h1>
              <p className="text-muted-foreground">Create a new sales order</p>
            </div>
            <WarehouseOrderForm />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}