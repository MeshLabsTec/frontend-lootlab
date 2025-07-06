"use client";

import { Task, UserTaskProgress } from "@/mocks/battlePass";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import {
  CheckCircle,
  Clock,
  Zap,
  Target,
  TrendingUp,
  Gift,
} from "lucide-react";

interface TaskCardProps {
  task: Task;
  progress?: UserTaskProgress;
  onClaimReward?: (taskId: string) => void;
}

export function TaskCard({ task, progress, onClaimReward }: TaskCardProps) {
  const getTaskTypeColor = (type: Task["taskType"]) => {
    switch (type) {
      case "DAILY":
        return "bg-green-100 text-green-800 border-green-200";
      case "WEEKLY":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "UNIQUE":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "PROGRESSIVE":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTaskTypeIcon = (type: Task["taskType"]) => {
    switch (type) {
      case "DAILY":
        return <Clock className="h-4 w-4" />;
      case "WEEKLY":
        return <Zap className="h-4 w-4" />;
      case "UNIQUE":
        return <Target className="h-4 w-4" />;
      case "PROGRESSIVE":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getTaskTypeLabel = (type: Task["taskType"]) => {
    switch (type) {
      case "DAILY":
        return "Daily";
      case "WEEKLY":
        return "Weekly";
      case "UNIQUE":
        return "Unique";
      case "PROGRESSIVE":
        return "Progressive";
      default:
        return type;
    }
  };

  const calculateProgress = () => {
    if (!progress) return 0;

    if (task.taskType === "PROGRESSIVE") {
      // Para tarefas progressivas, mostra progresso até o próximo milestone
      const milestones = task.requirements.milestones || [];
      const currentMilestone = milestones.find(
        (m) => m.count > progress.currentProgress,
      );
      if (currentMilestone) {
        return (progress.currentProgress / currentMilestone.count) * 100;
      }
      return 100;
    }

    return Math.min(
      (progress.currentProgress / progress.targetProgress) * 100,
      100,
    );
  };

  const getProgressText = () => {
    if (!progress) return "0/1";

    if (task.taskType === "PROGRESSIVE") {
      const milestones = task.requirements.milestones || [];
      const currentMilestone = milestones.find(
        (m) => m.count > progress.currentProgress,
      );
      if (currentMilestone) {
        return `${progress.currentProgress}/${currentMilestone.count}`;
      }
      return `${progress.currentProgress}/${milestones[milestones.length - 1]?.count || 0}`;
    }

    return `${progress.currentProgress}/${progress.targetProgress}`;
  };

  const canClaimReward = progress?.isCompleted && !progress?.lastCompletedAt;
  const isCompleted = progress?.isCompleted;

  return (
    <div className="rounded-xl border border-[#1F2C47] bg-slate-800/40 p-6 shadow-sm backdrop-blur-sm transition-all hover:bg-slate-700/40 hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{task.icon}</div>
          <div>
            <h3 className="font-semibold text-lootlab-font-base">
              {task.name}
            </h3>
            <p className="text-sm text-lootlab-font-highlight">
              {task.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge className={`${getTaskTypeColor(task.taskType)} border`}>
            {getTaskTypeIcon(task.taskType)}
            <span className="ml-1">{getTaskTypeLabel(task.taskType)}</span>
          </Badge>

          {isCompleted && (
            <CheckCircle className="h-5 w-5 text-lootlab-color-highlight" />
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-lootlab-font-highlight">Progress</span>
          <span className="font-medium text-lootlab-font-base">
            {getProgressText()}
          </span>
        </div>
        <Progress value={calculateProgress()} className="h-2" />
      </div>

      {/* Rewards & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gift className="h-4 w-4 text-lootlab-color-highlight" />
          <span className="text-sm font-medium text-lootlab-font-base">
            {task.xpReward} XP
          </span>
          {progress?.xpEarned && progress.xpEarned > 0 && (
            <span className="text-sm text-lootlab-color-highlight">
              (+{progress.xpEarned} XP earned)
            </span>
          )}
        </div>

        {canClaimReward && (
          <Button
            size="sm"
            onClick={() => onClaimReward?.(task.id)}
            className="bg-gradient-to-r from-lootlab-color-highlight to-lootlab-hover-highlight text-white hover:from-lootlab-hover-highlight hover:to-lootlab-color-highlight"
          >
            <Gift className="mr-1 h-4 w-4" />
            Claim
          </Button>
        )}
      </div>

      {/* Progressive Task Milestones */}
      {task.taskType === "PROGRESSIVE" && task.requirements.milestones && (
        <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
          <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Milestones:
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {task.requirements.milestones.map((milestone, index) => (
              <div
                key={index}
                className={`rounded-lg p-2 text-sm ${
                  progress && progress.currentProgress >= milestone.count
                    ? "border border-green-200 bg-green-100 text-green-800"
                    : "border border-gray-200 bg-gray-100 text-gray-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{milestone.count}</span>
                  <span className="font-medium">{milestone.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
