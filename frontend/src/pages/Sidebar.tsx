// Sidebar.tsx
import { useState, useEffect } from "react";
import {
  Home,
  ShoppingCart,
  Repeat,
  ClipboardCheck,
  Shield,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// All possible menu items
const menuItems = [
  { name: "Dashboard", icon: Home, path: "/dashboard", key: "dashboard" },
  {
    name: "Purchases",
    icon: ShoppingCart,
    path: "/purchases",
    key: "purchases",
  },
  { name: "Transfers", icon: Repeat, path: "/transfers", key: "transfers" },
  {
    name: "Assignments & Expenditures",
    icon: ClipboardCheck,
    path: "/assignments",
    key: "assignments",
  },
  {
    name: "Admin Panel",
    icon: Shield,
    path: "/admin",
    key: "admin",
  },
];

// Role-based access control
const rolePermissions: Record<string, string[]> = {
  ADMIN: ["dashboard", "purchases", "transfers", "assignments"],
  COMMANDER: ["dashboard", "purchases", "transfers", "assignments"],
  LOGISTICS: ["dashboard", "purchases", "transfers"],
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const savedRole = localStorage.getItem("role") || "";
    setRole(savedRole);
  }, []);

  // Get allowed items for this role
  const allowedItems = role
    ? menuItems.filter((item) => rolePermissions[role]?.includes(item.key))
    : [];

  return (
    <div
      className={cn(
        "h-screen bg-gray-900 text-gray-100 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <h1 className="text-lg font-bold">Military Assets</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-300 hover:text-white"
        >
          <Menu size={20} />
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-4 space-y-1">
        {allowedItems.map((item) => (
          <a
            key={item.name}
            href={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <item.icon size={20} />
            {!collapsed && <span>{item.name}</span>}
          </a>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
        {!collapsed &&
          (role
            ? `© 2025 Defense Logistics - ${role}`
            : "© 2025 Defense Logistics")}
      </div>
    </div>
  );
}
