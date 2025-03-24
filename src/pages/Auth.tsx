
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LogIn, User } from 'lucide-react';

// Esquemas de validación optimizados
const authSchema = {
  email: z.string().email({ message: 'Por favor ingresa un correo electrónico válido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
};

const loginSchema = z.object({
  email: authSchema.email,
  password: authSchema.password,
});

const registerSchema = z.object({
  email: authSchema.email,
  password: authSchema.password,
  confirmPassword: authSchema.password,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const Auth: React.FC = () => {
  const { user, loading, signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const handleAuthError = (error: any) => {
    console.error('Error de autenticación:', error);
    setFormError(error.message || 'Error desconocido durante la autenticación');
  };

  const onLoginSubmit = async (values: LoginFormValues) => {
    setFormError(null);
    try {
      const { error } = await signIn(values.email, values.password);
      if (error) throw error;
    } catch (error) {
      handleAuthError(error);
    }
  };

  const onRegisterSubmit = async (values: RegisterFormValues) => {
    setFormError(null);
    try {
      const { error } = await signUp(values.email, values.password);
      if (error) throw error;
    } catch (error) {
      handleAuthError(error);
    }
  };

  // Redirigir si el usuario está autenticado
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-6 rounded-xl p-8 shadow-lg backdrop-blur-md bg-white/5 border border-white/10">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {isLogin ? 'Iniciar Sesión' : 'Crear una cuenta'}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isLogin 
              ? 'Ingresa tus credenciales para acceder a tu cuenta' 
              : 'Regístrate para comenzar a usar CriptoTracker'}
          </p>
        </div>

        {formError && (
          <div className="p-3 text-sm bg-destructive/10 border border-destructive/20 text-destructive rounded-md">
            {formError}
          </div>
        )}

        {isLogin ? (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <EmailField form={loginForm} />
              <PasswordField 
                form={loginForm} 
                showPassword={showPassword} 
                setShowPassword={setShowPassword} 
                name="password"
                label="Contraseña"
              />
              
              <Button type="submit" className="w-full" disabled={loading}>
                <LogIn className="mr-2 h-4 w-4" />
                Iniciar sesión
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <EmailField form={registerForm} />
              <PasswordField 
                form={registerForm} 
                showPassword={showPassword} 
                setShowPassword={setShowPassword} 
                name="password"
                label="Contraseña"
              />
              <PasswordField 
                form={registerForm} 
                showPassword={showPassword} 
                setShowPassword={setShowPassword} 
                name="confirmPassword"
                label="Confirmar contraseña"
              />
              
              <Button type="submit" className="w-full" disabled={loading}>
                Registrarse
              </Button>
            </form>
          </Form>
        )}

        <div className="text-center mt-4">
          <Button 
            variant="link" 
            onClick={() => {
              setIsLogin(!isLogin);
              setFormError(null);
            }}
            className="text-primary"
          >
            {isLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión'}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Componentes reutilizables para campos del formulario
const EmailField = ({ form }: { form: any }) => (
  <FormField
    control={form.control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Correo electrónico</FormLabel>
        <FormControl>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="correo@ejemplo.com" 
              className="pl-10" 
              {...field} 
            />
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

const PasswordField = ({ 
  form, 
  showPassword, 
  setShowPassword, 
  name, 
  label 
}: { 
  form: any, 
  showPassword: boolean, 
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>,
  name: string,
  label: string
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="******"
              className="pr-10"
              {...field}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-muted-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default Auth;