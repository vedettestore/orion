import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CreateSalesOrderForm } from "@/components/sales/CreateSalesOrderForm";

export default function NewSalesOrder() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Create Sales Order</h1>
              <p className="text-muted-foreground">Create a new sales order for processing</p>
            </div>
            <CreateSalesOrderForm />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}