
import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarInset
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import {
  BarChart3,
  CreditCard,
  History,
  Home,
  Moon,
  Settings as SettingsIcon,
  Sun,
  Target,
  LogOut
} from "lucide-react";
import Settings from "@/pages/Settings";

const Layout: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading, signOut } = useAuth();
  const isMobile = useIsMobile();
  
  // Check if user preference is for dark mode
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };
  
  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Verificar autenticación
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);
  
  // Mostrar pantalla de carga mientras se verifica autenticación
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  const navItems = [
    { name: "Dashboard", icon: <Home className="h-5 w-5" />, path: "/" },
    { name: "Métodos de Pago", icon: <CreditCard className="h-5 w-5" />, path: "/payment-methods" },
    { name: "Transacciones", icon: <History className="h-5 w-5" />, path: "/transactions" },
    { name: "Estadísticas", icon: <BarChart3 className="h-5 w-5" />, path: "/statistics" },
    { name: "Metas", icon: <Target className="h-5 w-5" />, path: "/goals" },
  ];
  
  const isSettingsPage = location.pathname === '/settings';
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full overflow-hidden">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center justify-between h-16 px-4">
              <h2 className="text-xl font-bold">CriptoTracker</h2>
            </div>
            {user && (
              <div className="px-4 pb-2">
                <p className="text-sm text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            )}
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === item.path}
                      tooltip={item.name}
                    >
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === "/settings"}
                    tooltip="Ajustes"
                  >
                    <Link to="/settings">
                      <SettingsIcon className="h-5 w-5" />
                      <span>Ajustes</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="px-4 py-2 space-y-4">
              <div className="flex justify-between items-center">
                <span>Tema</span>
                <button
                  className="p-2 rounded-md hover:bg-muted"
                  onClick={toggleDarkMode}
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </div>
              
              <button
                className="flex w-full items-center gap-3 px-3 py-2 transition-colors rounded-md hover:bg-destructive hover:text-destructive-foreground"
                onClick={signOut}
              >
                <LogOut className="h-5 w-5" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <div className="container mx-auto py-4 md:py-8 px-2 md:px-4 page-transition">
            {isSettingsPage ? (
              <Settings isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            ) : (
              <Outlet />
            )}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
