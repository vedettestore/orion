import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Package2, 
  BoxesIcon,
  Building2, 
  Users2, 
  History, 
  Settings2,
  ChevronRight
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/" },
  { title: "Inventory", icon: Package2, url: "/inventory" },
  { title: "Items", icon: BoxesIcon, url: "/items" },
  { title: "Locations", icon: Building2, url: "/locations" },
  { title: "Team", icon: Users2, url: "/team" },
  { title: "History", icon: History, url: "/history" },
  { title: "Settings", icon: Settings2, url: "/settings" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="bg-gradient-to-b from-white to-gray-50 border-r border-gray-200">
      <SidebarContent>
        <div className="px-6 py-5 mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Warehouse
          </h1>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={`flex items-center justify-between px-6 py-3 w-full transition-all duration-300 ease-in-out rounded-lg hover:bg-primary/10 group ${
                        location.pathname === item.url 
                          ? 'text-primary bg-primary/10 font-medium' 
                          : 'text-gray-600 hover:text-primary'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={`h-5 w-5 transition-transform duration-300 ${
                          location.pathname === item.url ? 'text-primary' : 'group-hover:text-primary'
                        }`} />
                        <span>{item.title}</span>
                      </div>
                      <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${
                        location.pathname === item.url 
                          ? 'text-primary rotate-90' 
                          : 'text-gray-400 group-hover:translate-x-1'
                      }`} />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}