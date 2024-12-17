import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { menuItems } from "./AppSidebar";
import { Link, useLocation } from "react-router-dom";

export function MobileDrawer() {
  const location = useLocation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden m-2">
          <Menu className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] bg-black p-0">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Warehouse
              </h2>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-8 w-8" />
                </Button>
              </SheetTrigger>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <ul className="p-4 space-y-2">
              {menuItems.map((item) => (
                <li key={item.title}>
                  <Link
                    to={item.url}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      location.pathname === item.url
                        ? "bg-gray-800/50 text-primary"
                        : "text-gray-400 hover:bg-gray-800 hover:text-primary"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}