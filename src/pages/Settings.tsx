
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLanguage } from '@/contexts/LanguageContext';

export interface SettingsProps {
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
          {t('update_personal_info')}
        </p>
      </div>
      
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-3">
          <TabsTrigger value="account">{t('account')}</TabsTrigger>
          <TabsTrigger value="appearance">{t('appearance')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('notifications')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('profile_info')}</CardTitle>
              <CardDescription>
                {t('update_personal_info')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contenido de perfil */}
              <p className="text-muted-foreground">{t('feature_in_development')}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t('security')}</CardTitle>
              <CardDescription>
                {t('manage_security')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contenido de seguridad */}
              <p className="text-muted-foreground">{t('feature_in_development')}</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('appearance')}</CardTitle>
              <CardDescription>
                {t('customize_appearance')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">{t('dark_mode')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('dark_mode_description')}
                  </p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                />
              </div>
              
              <div className="space-y-3">
                <Label>{t('language')}</Label>
                <RadioGroup 
                  defaultValue={language} 
                  onValueChange={(value) => setLanguage(value as 'es' | 'en')}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="es" id="es" />
                    <Label htmlFor="es">{t('spanish')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="en" id="en" />
                    <Label htmlFor="en">{t('english')}</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('notifications')}</CardTitle>
              <CardDescription>
                {t('notification_preferences')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Contenido de notificaciones */}
              <p className="text-muted-foreground">{t('feature_in_development')}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
