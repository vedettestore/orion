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
    <div className="h-screen bg-black">
      <Sidebar className="bg-black border-r border-gray-800 transition-all duration-300 ease-in-out group/sidebar hover:w-64 w-16">
        <SidebarContent>
          <div className="px-4 py-5 mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              W
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
                        className={`group flex items-center px-4 py-3 w-full transition-all duration-300 ease-in-out rounded-lg hover:bg-gray-800 ${
                          location.pathname === item.url 
                            ? 'text-primary bg-gray-800/50 font-medium' 
                            : 'text-gray-400 hover:text-primary'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className={`h-5 w-5 transition-transform duration-300 ${
                            location.pathname === item.url ? 'text-primary' : 'group-hover:text-primary'
                          }`} />
                          <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            {item.title}
                          </span>
                        </div>
                        <ChevronRight className={`h-4 w-4 ml-auto transition-transform duration-300 opacity-0 group-hover:opacity-100 ${
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
    </div>
  );
}