
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const emailSchema = z.string().email({ message: "Email inválido" });
const passwordSchema = z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" });

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { signIn, signUp, isLoading, user } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState("login");
  
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Redirigir si ya está autenticado
  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    let isValid = true;

    try {
      emailSchema.parse(email);
    } catch (error) {
      if (error instanceof z.ZodError) {
        newErrors.email = error.errors[0]?.message || "Email inválido";
        isValid = false;
      }
    }

    try {
      passwordSchema.parse(password);
    } catch (error) {
      if (error instanceof z.ZodError) {
        newErrors.password = error.errors[0]?.message || "Contraseña inválida";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      if (tab === "login") {
        const { error } = await signIn(email, password);
        if (error) throw error;
        toast.success("Inicio de sesión exitoso");
        navigate("/");
      } else {
        const { error } = await signUp(email, password);
        if (error) throw error;
        toast.success("Registro exitoso. Verifica tu correo electrónico.");
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      
      // Detectar errores específicos
      if (error.message?.includes("User already registered")) {
        toast.error("Este email ya está registrado. Intenta iniciar sesión.");
      } else if (error.message?.includes("Invalid login credentials")) {
        toast.error("Credenciales inválidas. Verifica tu email y contraseña.");
      } else {
        toast.error(error.message || "Error en la autenticación");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">CriptoTracker</CardTitle>
          <CardDescription className="text-center">
            {tab === "login" 
              ? "Inicia sesión para administrar tus transacciones" 
              : "Crea una cuenta para comenzar a usar CriptoTracker"}
          </CardDescription>
        </CardHeader>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            </CardContent>
            
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Procesando..." : tab === "login" ? "Iniciar Sesión" : "Registrarse"}
              </Button>
            </CardFooter>
          </form>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
