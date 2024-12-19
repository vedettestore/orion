import { CreateOrderForm } from "@/components/orders/CreateOrderForm";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function NewOrder() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Create New Order</h1>
              <p className="text-muted-foreground">Create a new order for processing</p>
            </div>
            <CreateOrderForm />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}