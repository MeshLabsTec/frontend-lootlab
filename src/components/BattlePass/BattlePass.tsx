"use client";

import { useState } from "react";
import {
  mockBattlePassSeason,
  mockTasks,
  mockUserTaskProgress,
  mockBattlePassTiers,
  mockUserBattlePassProgress,
} from "@/mocks/battlePass";
import { BattlePassHeader } from "./BattlePassHeader";
import { TaskList } from "./TaskList";
import { BattlePassTiers } from "./BattlePassTiers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, CheckSquare, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BattlePass() {
  const [userProgress, setUserProgress] = useState(mockUserBattlePassProgress);
  const [taskProgress, setTaskProgress] = useState(mockUserTaskProgress);

  const handleClaimTaskReward = (taskId: string) => {
    console.log("Claiming task reward:", taskId);
    // Aqui você implementaria a lógica para resgatar a recompensa da tarefa

    // Simular claim da recompensa
    setTaskProgress((prev) =>
      prev.map((progress) =>
        progress.taskId === taskId
          ? { ...progress, lastCompletedAt: new Date().toISOString() }
          : progress,
      ),
    );
  };

  const handleClaimTierReward = (
    tier: number,
    rewardType: "free" | "premium",
  ) => {
    console.log("Claiming tier reward:", tier, rewardType);
    // Aqui você implementaria a lógica para resgatar a recompensa do tier

    // Simular claim da recompensa
    setUserProgress((prev) => ({
      ...prev,
      unlockedRewards: [
        ...prev.unlockedRewards,
        {
          tier,
          rewardType,
          claimedAt: new Date().toISOString(),
        },
      ],
    }));
  };

  const handleBuyPremium = () => {
    console.log("Buying premium battle pass");
    // Aqui você implementaria a lógica para comprar o premium

    setUserProgress((prev) => ({
      ...prev,
      hasPremium: true,
    }));
  };

  // Estatísticas resumidas
  const completedTasks = taskProgress.filter(
    (progress) => progress.isCompleted,
  ).length;
  const totalTasks = mockTasks.length;
  const totalXPEarned = taskProgress.reduce(
    (sum, progress) => sum + progress.xpEarned,
    0,
  );

  return (
    <div className="min-h-screen bg-lootlab-bg-main">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <BattlePassHeader
          season={mockBattlePassSeason}
          userLevel={userProgress.currentTier}
          totalXP={userProgress.totalXP}
          hasPremium={userProgress.hasPremium}
        />

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-[#1F2C47] bg-slate-800/40 p-6 backdrop-blur-sm transition-all hover:bg-slate-700/40">
            <div className="flex items-center gap-3">
              <CheckSquare className="h-8 w-8 text-lootlab-color-highlight" />
              <div>
                <h3 className="text-lg font-semibold text-lootlab-font-base">
                  Completed Tasks
                </h3>
                <p className="text-2xl font-bold text-lootlab-color-highlight">
                  {completedTasks}/{totalTasks}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#1F2C47] bg-slate-800/40 p-6 backdrop-blur-sm transition-all hover:bg-slate-700/40">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-lootlab-color-highlight" />
              <div>
                <h3 className="text-lg font-semibold text-lootlab-font-base">
                  XP Earned
                </h3>
                <p className="text-2xl font-bold text-lootlab-color-highlight">
                  {totalXPEarned.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#1F2C47] bg-slate-800/40 p-6 backdrop-blur-sm transition-all hover:bg-slate-700/40">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-lootlab-color-highlight" />
              <div>
                <h3 className="text-lg font-semibold text-lootlab-font-base">
                  Rewards
                </h3>
                <p className="text-2xl font-bold text-lootlab-color-highlight">
                  {userProgress.unlockedRewards.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Upgrade Banner */}
        {!userProgress.hasPremium && (
          <div className="mb-8 rounded-xl bg-gradient-to-r from-lootlab-color-highlight to-lootlab-hover-highlight p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-2 text-xl font-bold">
                  🔥 Unlock Premium Battle Pass!
                </h3>
                <p className="text-white/80">
                  Get access to exclusive rewards and accelerate your progress
                </p>
              </div>
              <Button
                onClick={handleBuyPremium}
                className="bg-lootlab-bg-main text-lootlab-font-base hover:bg-lootlab-bg-main-highlight"
              >
                Buy Premium
              </Button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="tiers" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Tiers & Rewards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="mt-6">
            <TaskList
              userProgress={taskProgress}
              onClaimReward={handleClaimTaskReward}
            />
          </TabsContent>

          <TabsContent value="tiers" className="mt-6">
            <BattlePassTiers
              tiers={mockBattlePassTiers}
              userProgress={userProgress}
              onClaimReward={handleClaimTierReward}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
