import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function CreateDrawer({ isActive = false }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive 
              ? 'text-primary bg-gray-800/50 font-medium' 
              : 'text-gray-400 hover:bg-gray-800 hover:text-primary'
          }`}
        >
          <Plus className="h-5 w-5" />
          <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-500 ease-in-out whitespace-nowrap">
            Create New
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] bg-black p-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Create New</h2>
          <div className="grid gap-4">
            <Link
              to="/sales/new"
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-400 hover:bg-gray-800 hover:text-primary"
            >
              <Plus className="h-5 w-5" />
              <div>
                <div className="font-medium">Sales Order</div>
                <div className="text-sm text-gray-500">Create a new sales order</div>
              </div>
            </Link>
            <Link
              to="/purchase/new"
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-400 hover:bg-gray-800 hover:text-primary"
            >
              <Plus className="h-5 w-5" />
              <div>
                <div className="font-medium">Purchase Order</div>
                <div className="text-sm text-gray-500">Create a new purchase order</div>
              </div>
            </Link>
            <Link
              to="/transfer/new"
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-400 hover:bg-gray-800 hover:text-primary"
            >
              <Plus className="h-5 w-5" />
              <div>
                <div className="font-medium">Transfer Order</div>
                <div className="text-sm text-gray-500">Create a new transfer order</div>
              </div>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}