import { Plus } from "lucide-react";
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
  { title: "Sales Order", path: "/sales/new" },
  { title: "Sales Quote", path: "/quotes/new" },
  { title: "Customer", path: "/customers/new" },
  { title: "Product", path: "/products/new" },
  { title: "Transfer", path: "/transfers/new" },
  { title: "Adjustment", path: "/adjustments/new" },
  { title: "Count", path: "/counts/new" },
  { title: "Purchase Order", path: "/purchasing/new" },
  { title: "Purchase Quote", path: "/purchase-quotes/new" },
  { title: "Vendor", path: "/vendors/new" },
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
                  className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
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