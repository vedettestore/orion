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
  { title: "Items", icon: Box, url: "#items" },
  { title: "Locations", icon: Warehouse, url: "#locations" },
  { title: "Team", icon: Users, url: "#team" },
  { title: "History", icon: History, url: "#history" },
  { title: "Settings", icon: Settings, url: "#settings" },
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
                    {item.url.startsWith('#') ? (
                      <a href={item.url} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </a>
                    ) : (
                      <Link
                        to={item.url}
                        className={`flex items-center gap-3 ${
                          location.pathname === item.url ? 'text-primary' : ''
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    )}
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