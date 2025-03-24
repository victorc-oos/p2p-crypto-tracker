
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Globe, Moon, Sun, Shield, LogOut } from "lucide-react";

interface SettingsProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode, toggleDarkMode }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('settings')}</h1>
        <p className="text-muted-foreground">
          {language === 'es' ? 'Administre sus preferencias y configuraciones de cuenta.' : 'Manage your account preferences and settings.'}
        </p>
      </div>
      <Separator />
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('settings')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                <span>{t('dark_mode')}</span>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe size={20} />
                <span>{t('language')}</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={language === 'es' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLanguage('es')}
                >
                  Español
                </Button>
                <Button
                  variant={language === 'en' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLanguage('en')}
                >
                  English
                </Button>
              </div>
            </div>
            
            {/* Security Link */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield size={20} />
                <span>{t('security')}</span>
              </div>
              <Button variant="outline" size="sm">
                {language === 'es' ? 'Administrar' : 'Manage'}
              </Button>
            </div>
            
            {/* Logout Button */}
            <div className="pt-4">
              <Button 
                variant="destructive" 
                className="w-full flex items-center justify-center gap-2"
              >
                <LogOut size={16} />
                {t('logout')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
