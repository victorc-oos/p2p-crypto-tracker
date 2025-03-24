
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionaries
const translations = {
  en: {
    // Dashboard
    "dashboard": "Dashboard",
    "payment_methods": "Payment Methods",
    "transactions": "Transactions",
    "statistics": "Statistics",
    "goals": "Goals",
    
    // Settings
    "settings": "Settings",
    "dark_mode": "Dark Mode",
    "language": "Language",
    "security": "Security",
    "logout": "Logout",
    
    // Common
    "add": "Add",
    "edit": "Edit",
    "delete": "Delete",
    "save": "Save",
    "cancel": "Cancel",
    "back": "Back",
    "search": "Search",
  },
  es: {
    // Dashboard
    "dashboard": "Panel Principal",
    "payment_methods": "Métodos de Pago",
    "transactions": "Transacciones",
    "statistics": "Estadísticas",
    "goals": "Metas",
    
    // Settings
    "settings": "Configuración",
    "dark_mode": "Modo Oscuro",
    "language": "Idioma",
    "security": "Seguridad",
    "logout": "Cerrar Sesión",
    
    // Common
    "add": "Añadir",
    "edit": "Editar",
    "delete": "Eliminar",
    "save": "Guardar",
    "cancel": "Cancelar",
    "back": "Volver",
    "search": "Buscar",
  }
};

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // Get initial language from localStorage or default to Spanish
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' || savedLanguage === 'es') ? savedLanguage : 'es';
  });

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    console.log(`Language changed to: ${language}`);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
