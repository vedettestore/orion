import { Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Inventory from "./pages/Inventory";
import Items from "./pages/Items";
import Locations from "./pages/Locations";
import Team from "./pages/Team";
import History from "./pages/History";
import Settings from "./pages/Settings";
import PickPack from "./pages/PickPack";
import Purchasing from "./pages/Purchasing";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const routes = [
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Index />
      </ProtectedRoute>
    ),
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
    path: "/items",
    element: (
      <ProtectedRoute>
        <Items />
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
    path: "/team",
    element: (
      <ProtectedRoute>
        <Team />
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
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pick-pack",
    element: (
      <ProtectedRoute>
        <PickPack />
      </ProtectedRoute>
    ),
  },
  {
    path: "/purchasing",
    element: (
      <ProtectedRoute>
        <Purchasing />
      </ProtectedRoute>
    ),
  },
];