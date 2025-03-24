
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  BarChart, 
  Home, 
  LogOut, 
  Menu, 
  Moon, 
  Settings, 
  Sun, 
  Wallet,
  Users,
  ShieldCheck,
  Target
} from "lucide-react";

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
  return (
    <div 
      className={`fixed left-0 top-0 h-screen z-40 transition-all duration-300 ease-in-out bg-sidebar ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <h1 className="text-sidebar-foreground text-xl font-semibold">P2P Tracker</h1>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground"
          >
            <Menu size={20} />
          </Button>
        </div>
        <Separator className="bg-sidebar-border" />
        
        <nav className="flex-1 py-6 px-2">
          <ul className="space-y-1">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <Home size={20} />
                {!collapsed && <span>Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/payment-methods" 
                className={({ isActive }) => 
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <Wallet size={20} />
                {!collapsed && <span>Payment Methods</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/transactions" 
                className={({ isActive }) => 
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <Users size={20} />
                {!collapsed && <span>Transactions</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/statistics" 
                className={({ isActive }) => 
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <BarChart size={20} />
                {!collapsed && <span>Statistics</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/goals" 
                className={({ isActive }) => 
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <Target size={20} />
                {!collapsed && <span>Goals</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
        
        <div className="mt-auto p-4">
          <Separator className="bg-sidebar-border mb-4" />
          
          <div className="space-y-3">
            {!collapsed && (
              <div className="flex items-center justify-between">
                <span className="text-sidebar-foreground/80 text-sm">Dark Mode</span>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                  className="data-[state=checked]:bg-sidebar-primary"
                />
              </div>
            )}
            {collapsed && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleDarkMode}
                className="text-sidebar-foreground w-full"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            )}
            
            <NavLink 
              to="/settings" 
              className={({ isActive }) => 
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Settings size={20} />
              {!collapsed && <span>Settings</span>}
            </NavLink>
            
            <Button 
              variant="ghost" 
              className={`sidebar-link w-full justify-start`}
            >
              <LogOut size={20} />
              {!collapsed && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
