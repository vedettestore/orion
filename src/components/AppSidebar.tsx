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
import { Warehouse, Box, Boxes, BarChart2, Settings, Users, History } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", icon: BarChart2, url: "/" },
  { title: "Inventory", icon: Boxes, url: "/inventory" },
  { title: "Items", icon: Box, url: "/items" },
  { title: "Locations", icon: Warehouse, url: "/locations" },
  { title: "Team", icon: Users, url: "/team" },
  { title: "History", icon: History, url: "/history" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Warehouse Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={`flex items-center gap-3 transition-all duration-300 ease-in-out rounded-md hover:bg-white/10 ${
                        location.pathname === item.url 
                          ? 'text-primary bg-white/10 scale-[1.02] transform' 
                          : 'hover:scale-[1.02] transform'
                      }`}
                    >
                      <item.icon className={`h-5 w-5 transition-transform duration-300 ${
                        location.pathname === item.url ? 'scale-110' : ''
                      }`} />
                      <span className="transition-colors duration-300">{item.title}</span>
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