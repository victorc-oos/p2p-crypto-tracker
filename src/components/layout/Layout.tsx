
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Settings from "@/pages/Settings";

const Layout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  
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
  
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      <main 
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "pl-20" : "pl-64"
        }`}
      >
        <div className="container mx-auto py-8 px-4 page-transition">
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
