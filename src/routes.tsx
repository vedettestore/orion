import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Inventory from "@/pages/Inventory";
import Items from "@/pages/Items";
import BulkEdit from "@/pages/BulkEdit";
import History from "@/pages/History";
import Locations from "@/pages/Locations";
import Settings from "@/pages/Settings";
import Team from "@/pages/Team";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import NewOrder from "@/pages/sales/new";

export const routes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Index />
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/inventory",
    element: (
      <ProtectedRoute>
        <Inventory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inventory/bulk-edit",
    element: (
      <ProtectedRoute>
        <BulkEdit />
      </ProtectedRoute>
    ),
  },
  {
    path: "/items",
    element: (
      <ProtectedRoute>
        <Items />
      </ProtectedRoute>
    ),
  },
  {
    path: "/history",
    element: (
      <ProtectedRoute>
        <History />
      </ProtectedRoute>
    ),
  },
  {
    path: "/locations",
    element: (
      <ProtectedRoute>
        <Locations />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/team",
    element: (
      <ProtectedRoute>
        <Team />
      </ProtectedRoute>
    ),
  },
  {
    path: "/sales/new",
    element: (
      <ProtectedRoute>
        <NewOrder />
      </ProtectedRoute>
    ),
  },
];

export const router = createBrowserRouter(routes);