import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Package2, 
  BoxesIcon,
  Building2, 
  Users2, 
  History, 
  Settings2,
  ChevronRight,
  ShoppingCart,
  PackageCheck,
  LogOut
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MobileDrawer } from "./MobileDrawer";
import { CreateDrawer } from "./CreateDrawer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/" },
  { title: "Inventory", icon: Package2, url: "/inventory" },
  { title: "Items", icon: BoxesIcon, url: "/items" },
  { title: "Locations", icon: Building2, url: "/locations" },
  { title: "Team", icon: Users2, url: "/team" },
  { title: "Pick & Pack", icon: PackageCheck, url: "/pick-pack" },
  { title: "Purchasing", icon: ShoppingCart, url: "/purchasing" },
  { title: "History", icon: History, url: "/history" },
  { title: "Settings", icon: Settings2, url: "/settings" },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/auth");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <>
      <MobileDrawer />
      <Sidebar className="border-r border-gray-800 transition-all duration-500 ease-in-out group/sidebar hover:w-64 w-16 hidden md:flex">
        <SidebarContent>
          <div className="px-4 py-5 mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              W
            </h1>
            <CreateDrawer />
          </div>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={`group flex items-center px-4 py-3 w-full transition-all duration-500 ease-in-out rounded-lg hover:bg-gray-800 ${
                          location.pathname === item.url 
                            ? 'text-primary bg-gray-800/50 font-medium' 
                            : 'text-gray-400 hover:text-primary'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className={`h-5 w-5 transition-transform duration-500 ease-in-out ${
                            location.pathname === item.url ? 'text-primary' : 'group-hover:text-primary'
                          }`} />
                          <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-500 ease-in-out whitespace-nowrap">
                            {item.title}
                          </span>
                        </div>
                        <ChevronRight className={`h-4 w-4 ml-auto transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100 ${
                          location.pathname === item.url 
                            ? 'text-primary rotate-90' 
                            : 'text-gray-400 group-hover:translate-x-1'
                        }`} />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              <SidebarSeparator className="my-4" />
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleSignOut}
                    className="group flex items-center px-4 py-3 w-full transition-all duration-500 ease-in-out rounded-lg hover:bg-gray-800 text-gray-400 hover:text-primary"
                  >
                    <div className="flex items-center gap-3">
                      <LogOut className="h-5 w-5 transition-transform duration-500 ease-in-out group-hover:text-primary" />
                      <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-500 ease-in-out whitespace-nowrap">
                        Sign Out
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}