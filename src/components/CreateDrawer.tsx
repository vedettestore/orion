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
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-primary"
        >
          <Plus className="h-5 w-5" />
          <span className="sr-only">Create new</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] bg-black p-0">
        <SheetHeader className="p-4 border-b border-gray-800">
          <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Create New
          </SheetTitle>
        </SheetHeader>
        <nav className="p-4">
          <ul className="space-y-2">
            {createOptions.map((option) => (
              <li key={option.title}>
                <Link
                  to={option.path}
                  className="flex items-center px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-primary transition-colors"
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