
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

const GoalForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Find the goal if editing
  const goal = isEditing ? goals.find((g) => g.id === id) : null;

  // Form state
  const [targetVolume, setTargetVolume] = useState(goal?.targetVolume || 0);
  const [currentVolume, setCurrentVolume] = useState(goal?.currentVolume || 0);
  const [hasEndDate, setHasEndDate] = useState(!!goal?.endDate);

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
      isEditing ? "Goal updated successfully!" : "Goal added successfully!"
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
          Back
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditing ? "Edit Goal" : "New Goal"}
        </h1>
      </div>

      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Goal" : "Create Goal"}</CardTitle>
            <CardDescription>
              {isEditing
                ? "Update your volume target or progress"
                : "Set a new volume target for a payment method"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select defaultValue={goal?.paymentMethodId || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
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
              <Label htmlFor="targetVolume">Target Volume</Label>
              <Input
                id="targetVolume"
                type="number"
                min="0"
                step="0.01"
                placeholder="Target volume to achieve"
                value={targetVolume}
                onChange={(e) => setTargetVolume(parseFloat(e.target.value) || 0)}
                required
              />
            </div>

            {isEditing && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentVolume">Current Volume</Label>
                  <Input
                    id="currentVolume"
                    type="number"
                    min="0"
                    step="0.01"
                    max={targetVolume}
                    placeholder="Current progress"
                    value={currentVolume}
                    onChange={(e) =>
                      setCurrentVolume(parseFloat(e.target.value) || 0)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Progress</Label>
                    <span className="text-sm text-muted-foreground">
                      {progressPercentage}%
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                defaultValue={
                  goal
                    ? new Date(goal.startDate).toISOString().split("T")[0]
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
              <Label htmlFor="hasEndDate">Set End Date</Label>
            </div>

            {hasEndDate && (
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  defaultValue={
                    goal?.endDate
                      ? new Date(goal.endDate).toISOString().split("T")[0]
                      : ""
                  }
                  required={hasEndDate}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add notes about this goal"
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
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update Goal" : "Create Goal"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default GoalForm;
