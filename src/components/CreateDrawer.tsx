import { Plus, FileText, Quote, Users, Package, ArrowLeftRight, ListPlus, ClipboardList, ShoppingCart, FileQuestion, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "react-router-dom";

const createOptions = [
  { title: "Sales Order", path: "/sales/new", icon: FileText },
  { title: "Sales Quote", path: "/quotes/new", icon: Quote },
  { title: "Customer", path: "/customers/new", icon: Users },
  { title: "Product", path: "/products/new", icon: Package },
  { title: "Transfer", path: "/transfers/new", icon: ArrowLeftRight },
  { title: "Adjustment", path: "/adjustments/new", icon: ListPlus },
  { title: "Count", path: "/counts/new", icon: ClipboardList },
  { title: "Purchase Order", path: "/purchasing/new", icon: ShoppingCart },
  { title: "Purchase Quote", path: "/purchase-quotes/new", icon: FileQuestion },
  { title: "Vendor", path: "/vendors/new", icon: Building2 },
];

export function CreateDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="group flex items-center px-4 py-3 w-full transition-all duration-500 ease-in-out rounded-lg hover:bg-gray-800 text-gray-400 hover:text-primary"
        >
          <div className="flex items-center gap-3">
            <Plus className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:text-primary" />
            <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-500 ease-in-out whitespace-nowrap">
              Create New
            </span>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] bg-white">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-lg font-semibold text-gray-900">
            Create New
          </SheetTitle>
        </SheetHeader>
        <nav className="p-2">
          <ul className="space-y-1">
            {createOptions.map((option) => (
              <li key={option.title}>
                <Link
                  to={option.path}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <option.icon className="h-4 w-4" />
                  {option.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}