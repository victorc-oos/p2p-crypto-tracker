
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { paymentMethods, goals } from "@/utils/dummy-data";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const GoalForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const { t } = useLanguage();

  // Find the goal if editing
  const goal = isEditing ? goals.find((g) => g.id === id) : null;

  // Form state
  const [targetVolume, setTargetVolume] = useState(goal?.target_volume || 0);
  const [currentVolume, setCurrentVolume] = useState(goal?.current_volume || 0);
  const [hasEndDate, setHasEndDate] = useState(!!goal?.end_date);

  // Calculate progress percentage
  const progressPercentage = Math.min(
    Math.round((currentVolume / targetVolume) * 100) || 0,
    100
  );

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would save the data to the backend here
    toast.success(
      isEditing 
        ? t("edit") + " " + t("goals").toLowerCase() 
        : t("add") + " " + t("goals").toLowerCase()
    );

    navigate("/goals");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/goals")}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("back")}
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditing ? t("edit") + " " + t("goals") : t("add") + " " + t("goals")}
        </h1>
      </div>

      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{isEditing ? t("edit") + " " + t("goals") : t("add") + " " + t("goals")}</CardTitle>
            <CardDescription>
              {isEditing
                ? "Actualiza tu meta de volumen o progreso"
                : "Establece una nueva meta de volumen para un método de pago"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">{t("payment_methods")}</Label>
              <Select defaultValue={goal?.payment_method_id || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un método de pago" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      {method.name} ({method.currency})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetVolume">Volumen objetivo</Label>
              <Input
                id="targetVolume"
                type="number"
                min="0"
                step="0.01"
                placeholder="Volumen objetivo a alcanzar"
                value={targetVolume}
                onChange={(e) => setTargetVolume(parseFloat(e.target.value) || 0)}
                required
              />
            </div>

            {isEditing && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentVolume">Volumen actual</Label>
                  <Input
                    id="currentVolume"
                    type="number"
                    min="0"
                    step="0.01"
                    max={targetVolume}
                    placeholder="Progreso actual"
                    value={currentVolume}
                    onChange={(e) =>
                      setCurrentVolume(parseFloat(e.target.value) || 0)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Progreso</Label>
                    <span className="text-sm text-muted-foreground">
                      {progressPercentage}%
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="startDate">Fecha de inicio</Label>
              <Input
                id="startDate"
                type="date"
                defaultValue={
                  goal
                    ? new Date(goal.start_date).toISOString().split("T")[0]
                    : new Date().toISOString().split("T")[0]
                }
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="hasEndDate"
                checked={hasEndDate}
                onCheckedChange={setHasEndDate}
              />
              <Label htmlFor="hasEndDate">Establecer fecha de finalización</Label>
            </div>

            {hasEndDate && (
              <div className="space-y-2">
                <Label htmlFor="endDate">Fecha de finalización</Label>
                <Input
                  id="endDate"
                  type="date"
                  defaultValue={
                    goal?.end_date
                      ? new Date(goal.end_date).toISOString().split("T")[0]
                      : ""
                  }
                  required={hasEndDate}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">Descripción (Opcional)</Label>
              <Textarea
                id="description"
                placeholder="Añade notas sobre esta meta"
                defaultValue={goal?.description || ""}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate("/goals")}
            >
              {t("cancel")}
            </Button>
            <Button type="submit">
              {isEditing ? t("save") : t("add")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default GoalForm;
