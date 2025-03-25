
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  CreditCard,
  History,
  Home,
  Menu,
  Moon,
  Settings,
  Sun,
  Target,
  X,
  LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed, 
  setCollapsed, 
  isDarkMode, 
  toggleDarkMode 
}) => {
  const location = useLocation();
  const { signOut, user } = useAuth();
  
  const navItems = [
    { name: "Dashboard", icon: <Home className="h-5 w-5" />, path: "/" },
    { name: "Métodos de Pago", icon: <CreditCard className="h-5 w-5" />, path: "/payment-methods" },
    { name: "Transacciones", icon: <History className="h-5 w-5" />, path: "/transactions" },
    { name: "Estadísticas", icon: <BarChart3 className="h-5 w-5" />, path: "/statistics" },
    { name: "Metas", icon: <Target className="h-5 w-5" />, path: "/goals" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-background border-r ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="h-full flex flex-col justify-between py-6">
        <div>
          <div className="flex items-center justify-between px-4">
            {!collapsed && (
              <h2 className="text-xl font-bold">CriptoTracker</h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <Menu className="h-5 w-5" />
              ) : (
                <X className="h-5 w-5" />
              )}
            </Button>
          </div>
          
          {user && (
            <div className={`mt-2 px-4 ${collapsed ? 'text-center' : ''}`}>
              <p className={`text-sm text-muted-foreground truncate ${collapsed ? 'hidden' : ''}`}>
                {user.email}
              </p>
            </div>
          )}

          <nav className="mt-6 space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                to={item.path}
                key={item.name}
                className={`flex items-center gap-3 px-3 py-2 transition-colors rounded-md ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                } ${collapsed ? "justify-center" : ""}`}
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className="px-4 space-y-2">
          <div className={`flex ${collapsed ? "justify-center" : "justify-between"} items-center`}>
            {!collapsed && <span>Tema</span>}
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
          
          <Link
            to="/settings"
            className={`flex items-center gap-3 px-3 py-2 transition-colors rounded-md ${
              location.pathname === "/settings"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            } ${collapsed ? "justify-center" : ""}`}
          >
            <Settings className="h-5 w-5" />
            {!collapsed && <span>Ajustes</span>}
          </Link>
          
          <Button
            variant="ghost"
            className={`flex w-full items-center gap-3 px-3 py-2 transition-colors rounded-md hover:bg-muted text-red-500 ${
              collapsed ? "justify-center" : ""
            }`}
            onClick={signOut}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Cerrar Sesión</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
