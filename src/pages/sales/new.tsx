import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import WarehouseOrderForm from "@/components/orders/WarehouseOrderForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NewOrder() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          <div className={`h-full ${isMobile ? 'px-4 py-4' : 'p-8'}`}>
            <div className={`${isMobile ? 'max-w-full' : 'max-w-5xl mx-auto'}`}>
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(-1)}
                  className="h-8 w-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900`}>
                    Create New Order
                  </h1>
                  <p className="text-muted-foreground text-sm">Create a new sales order</p>
                </div>
              </div>
              <WarehouseOrderForm />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}