"use client";

import { UserTaskProgress, getTasksByType } from "@/mocks/battlePass";
import { TaskCard } from "./TaskCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Zap, Target, TrendingUp, Calendar } from "lucide-react";

interface TaskListProps {
  userProgress: UserTaskProgress[];
  onClaimReward?: (taskId: string) => void;
}

export function TaskList({ userProgress, onClaimReward }: TaskListProps) {
  const getTaskProgress = (taskId: string) => {
    return userProgress.find((progress) => progress.taskId === taskId);
  };

  const getTabIcon = (taskType: string) => {
    switch (taskType) {
      case "daily":
        return <Calendar className="h-4 w-4" />;
      case "weekly":
        return <Zap className="h-4 w-4" />;
      case "unique":
        return <Target className="h-4 w-4" />;
      case "progressive":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getTaskCounts = () => {
    const daily = getTasksByType("DAILY");
    const weekly = getTasksByType("WEEKLY");
    const unique = getTasksByType("UNIQUE");
    const progressive = getTasksByType("PROGRESSIVE");

    return { daily, weekly, unique, progressive };
  };

  const { daily, weekly, unique, progressive } = getTaskCounts();

  return (
    <div className="rounded-xl border border-[#1F2C47] bg-slate-800/40 p-6 backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold text-lootlab-font-base">
          Battle Pass Tasks
        </h2>
        <p className="text-lootlab-font-highlight">
          Complete tasks to earn XP and progress in the Battle Pass
        </p>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="daily" className="flex items-center gap-2">
            {getTabIcon("daily")}
            <span className="hidden sm:inline">Daily</span>
            <span className="sm:hidden">D</span>
            <span className="ml-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
              {daily.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            {getTabIcon("weekly")}
            <span className="hidden sm:inline">Weekly</span>
            <span className="sm:hidden">W</span>
            <span className="ml-1 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
              {weekly.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="unique" className="flex items-center gap-2">
            {getTabIcon("unique")}
            <span className="hidden sm:inline">Unique</span>
            <span className="sm:hidden">U</span>
            <span className="ml-1 rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-800">
              {unique.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="progressive" className="flex items-center gap-2">
            {getTabIcon("progressive")}
            <span className="hidden sm:inline">Progressive</span>
            <span className="sm:hidden">P</span>
            <span className="ml-1 rounded-full bg-orange-100 px-2 py-1 text-xs text-orange-800">
              {progressive.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-6 space-y-4">
          <div className="grid gap-4">
            {daily.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                progress={getTaskProgress(task.id)}
                onClaimReward={onClaimReward}
              />
            ))}
          </div>
          {daily.length === 0 && (
            <div className="py-8 text-center text-lootlab-font-highlight">
              No daily tasks available
            </div>
          )}
        </TabsContent>

        <TabsContent value="weekly" className="mt-6 space-y-4">
          <div className="grid gap-4">
            {weekly.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                progress={getTaskProgress(task.id)}
                onClaimReward={onClaimReward}
              />
            ))}
          </div>
          {weekly.length === 0 && (
            <div className="py-8 text-center text-lootlab-font-highlight">
              No weekly tasks available
            </div>
          )}
        </TabsContent>

        <TabsContent value="unique" className="mt-6 space-y-4">
          <div className="grid gap-4">
            {unique.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                progress={getTaskProgress(task.id)}
                onClaimReward={onClaimReward}
              />
            ))}
          </div>
          {unique.length === 0 && (
            <div className="py-8 text-center text-lootlab-font-highlight">
              No unique tasks available
            </div>
          )}
        </TabsContent>

        <TabsContent value="progressive" className="mt-6 space-y-4">
          <div className="grid gap-4">
            {progressive.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                progress={getTaskProgress(task.id)}
                onClaimReward={onClaimReward}
              />
            ))}
          </div>
          {progressive.length === 0 && (
            <div className="py-8 text-center text-lootlab-font-highlight">
              No progressive tasks available
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
