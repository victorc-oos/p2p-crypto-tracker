
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  Check,
  Edit,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import { goals, paymentMethods } from "@/utils/dummy-data";
import { toast } from "sonner";

const GoalsList: React.FC = () => {
  const navigate = useNavigate();

  // Get payment method name by ID
  const getMethodName = (id: string) => {
    const method = paymentMethods.find((m) => m.id === id);
    return method ? method.name : "Unknown";
  };

  // Delete a goal (mock)
  const handleDelete = (id: string) => {
    toast.success("Goal deleted successfully!");
  };

  // Mark as completed (mock)
  const handleComplete = (id: string) => {
    toast.success("Goal marked as completed!");
  };

  // Calculate progress percentage
  const getProgressPercentage = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Goals</h1>
          <p className="text-muted-foreground">
            Set and track volume goals for your payment methods
          </p>
        </div>
        <Button onClick={() => navigate("/goals/new")}>
          <Plus className="mr-2 h-4 w-4" /> New Goal
        </Button>
      </div>

      {/* Active Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Active Goals</CardTitle>
          <CardDescription>
            Track your progress towards volume targets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment Method</TableHead>
                <TableHead>Target Volume</TableHead>
                <TableHead>Current Volume</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {goals.filter(g => !g.completed).map((goal) => {
                const progressPercentage = getProgressPercentage(
                  goal.currentVolume,
                  goal.targetVolume
                );
                
                return (
                  <TableRow key={goal.id}>
                    <TableCell className="font-medium">
                      {getMethodName(goal.paymentMethodId)}
                    </TableCell>
                    <TableCell>{goal.targetVolume.toFixed(2)}</TableCell>
                    <TableCell>{goal.currentVolume.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress value={progressPercentage} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {progressPercentage}% Complete
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(goal.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {goal.endDate
                        ? new Date(goal.endDate).toLocaleDateString()
                        : "No end date"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => navigate(`/goals/${goal.id}/edit`)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleComplete(goal.id)}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            <span>Mark as Complete</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(goal.id)}
                            className="text-red-600 dark:text-red-400"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Goal Cards - Progress Visualization */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.filter(g => !g.completed).map((goal) => {
          const progressPercentage = getProgressPercentage(
            goal.currentVolume,
            goal.targetVolume
          );
          const methodName = getMethodName(goal.paymentMethodId);
          
          return (
            <Card key={goal.id} className="stat-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{methodName}</CardTitle>
                <CardDescription>
                  Volume Goal: {goal.targetVolume.toFixed(2)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">
                      {progressPercentage}%
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Current</span>
                    <span>{goal.currentVolume.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Remaining</span>
                    <span>{(goal.targetVolume - goal.currentVolume).toFixed(2)}</span>
                  </div>
                  
                  {goal.endDate && (
                    <div className="flex justify-between text-sm">
                      <span>Deadline</span>
                      <span>{new Date(goal.endDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                
                <Button variant="outline" className="w-full" onClick={() => navigate(`/goals/${goal.id}/edit`)}>
                  Update Progress <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default GoalsList;
