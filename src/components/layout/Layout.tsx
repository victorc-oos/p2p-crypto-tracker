
import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Settings from "@/pages/Settings";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const isMobile = useIsMobile();
  
  // Auto-collapse sidebar on mobile devices
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isMobile]);
  
  // Verificar autenticación
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);
  
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

  // Check if current route is settings
  const isSettingsPage = location.pathname === '/settings';
  
  // Mostrar pantalla de carga mientras se verifica autenticación
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex w-full overflow-hidden">
      <Sidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <main 
        className={`flex-1 transition-all duration-300 ${
          collapsed ? (isMobile ? "pl-0" : "pl-20") : (isMobile ? "pl-0" : "pl-64")
        }`}
      >
        <div className="container mx-auto py-4 md:py-8 px-2 md:px-4 page-transition">
          {isSettingsPage ? (
            <Settings isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
};

export default Layout;
