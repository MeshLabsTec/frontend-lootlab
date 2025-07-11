"use client";

import { UserTaskProgress, getTasksByType } from "@/mocks/battlePass";
import { TaskCard } from "./TaskCard";
import { Zap, Target, TrendingUp, Calendar } from "lucide-react";
import React from "react";

interface TaskListProps {
  userProgress: UserTaskProgress[];
  onClaimReward?: (taskId: string) => void;
}

function MinimalTaskTabs({
  value,
  onChange,
  counts,
}: {
  value: string;
  onChange: (v: string) => void;
  counts: {
    daily: number;
    weekly: number;
    unique: number;
    progressive: number;
  };
}) {
  const tabs = [
    {
      key: "daily",
      label: "Daily",
      icon: <Calendar className="h-5 w-5 text-lootlab-color-highlight" />,
      count: counts.daily,
    },
    {
      key: "weekly",
      label: "Weekly",
      icon: <Zap className="h-5 w-5 text-lootlab-color-highlight" />,
      count: counts.weekly,
    },
    {
      key: "unique",
      label: "Unique",
      icon: <Target className="h-5 w-5 text-lootlab-color-highlight" />,
      count: counts.unique,
    },
    {
      key: "progressive",
      label: "Progressive",
      icon: <TrendingUp className="h-5 w-5 text-lootlab-color-highlight" />,
      count: counts.progressive,
    },
  ];
  return (
    <div className="mb-6 flex w-full flex-wrap gap-2 border-b border-slate-700">
      {tabs.map((tab) => {
        const active = value === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`font-orbitron relative px-4 py-2 text-base font-bold transition-colors duration-200 ${active ? "text-lootlab-color-highlight" : "text-slate-400"} hover:text-lootlab-color-highlight focus:outline-none`}
            style={{ minWidth: 100 }}
          >
            <span className="flex items-center gap-2">
              {tab.label}
              <span
                className={`ml-1 rounded-full px-2 py-0.5 text-xs font-semibold ${active ? "bg-lootlab-color-highlight/20 text-lootlab-color-highlight" : "bg-slate-700 text-slate-300"}`}
              >
                {tab.count}
              </span>
              {active && tab.icon}
            </span>
            {active && (
              <span className="absolute -bottom-1 left-2 right-2 h-1 animate-pulse rounded-full bg-gradient-to-r from-lootlab-color-highlight to-lootlab-hover-highlight" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export function TaskList({ userProgress, onClaimReward }: TaskListProps) {
  const getTaskProgress = (taskId: string) => {
    return userProgress.find((progress) => progress.taskId === taskId);
  };

  const getTaskCounts = () => {
    const daily = getTasksByType("DAILY");
    const weekly = getTasksByType("WEEKLY");
    const unique = getTasksByType("UNIQUE");
    const progressive = getTasksByType("PROGRESSIVE");

    return { daily, weekly, unique, progressive };
  };

  const [tab, setTab] = React.useState("daily");

  const { daily, weekly, unique, progressive } = getTaskCounts();

  return (
    <div className="rounded-xl border border-[#1F2C47] bg-slate-800/40 p-6 backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="font-orbitron mb-2 text-2xl font-bold text-lootlab-font-base">
          Battle Pass Tasks
        </h2>
        <p className="font-orbitron text-lootlab-font-highlight">
          Complete tasks to earn XP and progress in the Battle Pass
        </p>
      </div>
      <MinimalTaskTabs
        value={tab}
        onChange={setTab}
        counts={{
          daily: daily.length,
          weekly: weekly.length,
          unique: unique.length,
          progressive: progressive.length,
        }}
      />
      {tab === "daily" && (
        <div className="mt-6 space-y-4">
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
            <div className="font-orbitron py-8 text-center text-lootlab-font-highlight">
              No daily tasks available
            </div>
          )}
        </div>
      )}
      {tab === "weekly" && (
        <div className="mt-6 space-y-4">
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
            <div className="font-orbitron py-8 text-center text-lootlab-font-highlight">
              No weekly tasks available
            </div>
          )}
        </div>
      )}
      {tab === "unique" && (
        <div className="mt-6 space-y-4">
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
            <div className="font-orbitron py-8 text-center text-lootlab-font-highlight">
              No unique tasks available
            </div>
          )}
        </div>
      )}
      {tab === "progressive" && (
        <div className="mt-6 space-y-4">
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
            <div className="font-orbitron py-8 text-center text-lootlab-font-highlight">
              No progressive tasks available
            </div>
          )}
        </div>
      )}
    </div>
  );
}
