"use client";

import { useState } from "react";
import {
  mockBattlePassSeason,
  mockBattlePassTiers,
  mockUserBattlePassProgress,
  calculateRemainingTime,
} from "@/mocks/battlePass";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Lock, Check, Crown, Gift, Star } from "lucide-react";

export function BattlePassModern() {
  const [userProgress, setUserProgress] = useState(mockUserBattlePassProgress);
  const [selectedReward, setSelectedReward] = useState(
    mockBattlePassTiers[userProgress.currentTier - 1],
  );
  const [selectedRewardType, setSelectedRewardType] = useState<
    "free" | "premium"
  >("free");

  const timeRemaining = calculateRemainingTime(mockBattlePassSeason.endDate);

  // Mostrar tiers ao redor do atual
  const visibleTiers = mockBattlePassTiers.filter(
    (tier) =>
      tier.tier >= Math.max(1, userProgress.currentTier - 2) &&
      tier.tier <= Math.min(100, userProgress.currentTier + 8),
  );

  const handleBuyPremium = () => {
    setUserProgress((prev) => ({ ...prev, hasPremium: true }));
  };

  const handleClaimReward = (tier: number, rewardType: "free" | "premium") => {
    setUserProgress((prev) => ({
      ...prev,
      unlockedRewards: [
        ...prev.unlockedRewards,
        { tier, rewardType, claimedAt: new Date().toISOString() },
      ],
    }));
  };

  const isRewardClaimed = (tier: number, rewardType: "free" | "premium") => {
    return userProgress.unlockedRewards.some(
      (reward) => reward.tier === tier && reward.rewardType === rewardType,
    );
  };

  const canClaimReward = (tier: number, rewardType: "free" | "premium") => {
    if (rewardType === "premium" && !userProgress.hasPremium) return false;
    if (userProgress.currentTier < tier) return false;
    return !isRewardClaimed(tier, rewardType);
  };

  const getCurrentTierProgress = () => {
    return (userProgress.currentXP / 1000) * 100;
  };

  const getProgressRadius = () => {
    const progress = getCurrentTierProgress();
    const circumference = 2 * Math.PI * 45; // raio = 45
    return circumference - (progress / 100) * circumference;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "COMMON":
        return "from-gray-400 to-gray-600";
      case "RARE":
        return "from-blue-400 to-blue-600";
      case "EPIC":
        return "from-purple-400 to-purple-600";
      case "LEGENDARY":
        return "from-yellow-400 to-orange-500";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-lootlab-bg-main">
      {/* Background Effects */}
      <div className="opacity-3 absolute inset-0 bg-[url('/images/hexagono.png')]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-lootlab-bg-main via-lootlab-bg-main-highlight/30 to-lootlab-bg-main"></div>

      {/* Floating Elements */}
      <div className="absolute right-20 top-20 h-32 w-32 animate-pulse rounded-full bg-lootlab-color-highlight/10 blur-3xl"></div>
      <div className="absolute bottom-32 left-16 h-40 w-40 animate-pulse rounded-full bg-purple-500/5 blur-2xl delay-1000"></div>

      {/* Modern Header */}
      <div className="relative z-10 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Left: Season Info */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-lootlab-color-highlight/30 bg-gradient-to-br from-lootlab-color-highlight/20 to-lootlab-hover-highlight/20 backdrop-blur-sm">
                  <Trophy className="h-8 w-8 text-lootlab-color-highlight" />
                </div>
                <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-lootlab-color-highlight to-lootlab-hover-highlight">
                  <span className="text-xs font-bold text-white">2</span>
                </div>
              </div>
              <div>
                <h1 className="font-russo-one text-xl font-bold text-lootlab-font-base">
                  {mockBattlePassSeason.name}
                </h1>
                <p className="text-xs text-lootlab-font-highlight">
                  Ends in {timeRemaining.days} days • {timeRemaining.hours}h{" "}
                  {timeRemaining.minutes}m
                </p>
              </div>
            </div>

            {/* Center: Circular Progress */}
            <div className="flex items-center gap-8">
              <div className="relative">
                <svg className="h-24 w-24 -rotate-90 transform">
                  {/* Background Circle */}
                  <circle
                    cx="48"
                    cy="48"
                    r="45"
                    stroke="rgba(75, 85, 99, 0.3)"
                    strokeWidth="6"
                    fill="none"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="48"
                    cy="48"
                    r="45"
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={getProgressRadius()}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#4A90E2" />
                      <stop offset="100%" stopColor="#357ABD" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-lootlab-font-base">
                      {userProgress.currentTier}
                    </div>
                    <div className="text-xs text-lootlab-font-highlight">
                      TIER
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-lg font-bold text-lootlab-color-highlight">
                  {userProgress.currentXP}
                </div>
                <div className="text-xs text-lootlab-font-highlight">
                  / 1000 XP
                </div>
                <div className="mt-1 text-xs text-lootlab-font-highlight">
                  {1000 - userProgress.currentXP} to next tier
                </div>
              </div>
            </div>

            {/* Right: Premium Status */}
            <div className="flex items-center gap-4">
              {!userProgress.hasPremium ? (
                <Button
                  onClick={handleBuyPremium}
                  className="rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-2 text-white shadow-lg transition-all duration-300 hover:from-yellow-500 hover:to-orange-600"
                >
                  <Crown className="mr-2 h-4 w-4" />
                  Get Premium
                </Button>
              ) : (
                <div className="flex items-center gap-2 rounded-xl border border-yellow-400/30 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 px-4 py-2">
                  <Crown className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-bold text-yellow-400">
                    PREMIUM
                  </span>
                </div>
              )}

              <div className="text-right">
                <div className="text-sm text-lootlab-font-highlight">
                  Rewards
                </div>
                <div className="text-lg font-bold text-lootlab-font-base">
                  {userProgress.unlockedRewards.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Featured Reward */}
      <div className="relative z-10 px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-[#1F2C47] bg-gradient-to-r from-slate-800/40 to-slate-900/40 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-6">
              {/* Reward Image */}
              <div className="flex-shrink-0">
                <div
                  className={`h-20 w-20 rounded-xl bg-gradient-to-br ${getRarityColor(
                    selectedRewardType === "free"
                      ? selectedReward?.rewards.free?.rarity || "COMMON"
                      : selectedReward?.rewards.premium?.rarity || "COMMON",
                  )} p-0.5 shadow-lg`}
                >
                  <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-lootlab-bg-main-highlight">
                    <div
                      className={`text-2xl ${
                        (selectedReward &&
                          selectedReward.tier > userProgress.currentTier) ||
                        (selectedRewardType === "premium" &&
                          !userProgress.hasPremium)
                          ? "opacity-30"
                          : ""
                      }`}
                    >
                      {selectedRewardType === "free"
                        ? selectedReward?.rewards.free?.icon || "🎁"
                        : selectedReward?.rewards.premium?.icon || "👑"}
                    </div>
                    {((selectedReward &&
                      selectedReward.tier > userProgress.currentTier) ||
                      (selectedRewardType === "premium" &&
                        !userProgress.hasPremium)) && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                        <Lock className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Reward Info */}
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <Badge
                    className={`bg-gradient-to-r ${getRarityColor(
                      selectedRewardType === "free"
                        ? selectedReward?.rewards.free?.rarity || "COMMON"
                        : selectedReward?.rewards.premium?.rarity || "COMMON",
                    )} text-xs text-white`}
                  >
                    {selectedRewardType === "free"
                      ? selectedReward?.rewards.free?.rarity || "COMMON"
                      : selectedReward?.rewards.premium?.rarity || "COMMON"}
                  </Badge>
                  <span className="text-xs text-lootlab-font-highlight">
                    TIER {selectedReward?.tier}
                  </span>
                  {((selectedReward &&
                    selectedReward.tier > userProgress.currentTier) ||
                    (selectedRewardType === "premium" &&
                      !userProgress.hasPremium)) && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Lock className="h-3 w-3" />
                      LOCKED
                    </div>
                  )}
                </div>

                <h3
                  className={`mb-1 text-lg font-bold ${
                    (selectedReward &&
                      selectedReward.tier > userProgress.currentTier) ||
                    (selectedRewardType === "premium" &&
                      !userProgress.hasPremium)
                      ? "text-gray-500"
                      : "text-lootlab-font-base"
                  }`}
                >
                  {selectedRewardType === "free"
                    ? selectedReward?.rewards.free?.name || "Special Reward"
                    : selectedReward?.rewards.premium?.name || "Premium Reward"}
                </h3>

                <p
                  className={`text-sm ${
                    (selectedReward &&
                      selectedReward.tier > userProgress.currentTier) ||
                    (selectedRewardType === "premium" &&
                      !userProgress.hasPremium)
                      ? "text-gray-500"
                      : "text-lootlab-font-highlight"
                  }`}
                >
                  {selectedReward &&
                  selectedReward.tier > userProgress.currentTier
                    ? `Unlock Tier ${selectedReward.tier} to get this reward`
                    : selectedRewardType === "premium" &&
                        !userProgress.hasPremium
                      ? "Get Premium to unlock this reward"
                      : selectedRewardType === "free"
                        ? selectedReward?.rewards.free?.description ||
                          "An incredible Battle Pass reward"
                        : selectedReward?.rewards.premium?.description ||
                          "An exclusive premium reward"}
                </p>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0">
                {selectedReward &&
                  selectedRewardType === "free" &&
                  canClaimReward(selectedReward.tier, "free") && (
                    <Button
                      onClick={() =>
                        handleClaimReward(selectedReward.tier, "free")
                      }
                      className="rounded-lg bg-gradient-to-r from-lootlab-color-highlight to-lootlab-hover-highlight px-4 py-2 text-white"
                    >
                      <Gift className="mr-2 h-4 w-4" />
                      Collect
                    </Button>
                  )}

                {selectedReward &&
                  selectedRewardType === "premium" &&
                  userProgress.hasPremium &&
                  selectedReward.rewards.premium &&
                  canClaimReward(selectedReward.tier, "premium") && (
                    <Button
                      onClick={() =>
                        handleClaimReward(selectedReward.tier, "premium")
                      }
                      className="rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 text-white"
                    >
                      <Crown className="mr-2 h-4 w-4" />
                      Collect
                    </Button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Tier Grid */}
      <div className="relative z-10 flex-1 px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-lootlab-font-base">
              Battle Pass Rewards
            </h2>
            <div className="flex items-center gap-2 text-sm text-lootlab-font-highlight">
              <Star className="h-4 w-4" />
              <span>
                {userProgress.unlockedRewards.length} / {visibleTiers.length}{" "}
                collected
              </span>
            </div>
          </div>

          {/* Tier Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleTiers.map((tier) => (
              <div
                key={tier.tier}
                className="rounded-xl border border-[#1F2C47] bg-gradient-to-br from-slate-800/30 to-slate-900/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-lootlab-color-highlight/30"
              >
                {/* Tier Header */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        tier.tier <= userProgress.currentTier
                          ? "bg-gradient-to-br from-lootlab-color-highlight/20 to-lootlab-hover-highlight/20"
                          : "bg-slate-700/30"
                      }`}
                    >
                      <span
                        className={`text-xs font-bold ${
                          tier.tier <= userProgress.currentTier
                            ? "text-lootlab-color-highlight"
                            : "text-gray-500"
                        }`}
                      >
                        {tier.tier}
                      </span>
                    </div>
                    <span
                      className={`text-xs ${
                        tier.tier <= userProgress.currentTier
                          ? "text-lootlab-font-highlight"
                          : "text-gray-500"
                      }`}
                    >
                      {tier.xpRequired} XP
                    </span>
                  </div>
                  {tier.tier <= userProgress.currentTier ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-lootlab-color-highlight to-lootlab-hover-highlight">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-700/50">
                      <Lock className="h-3 w-3 text-gray-500" />
                    </div>
                  )}
                </div>

                {/* Rewards */}
                <div className="space-y-2">
                  {/* Free Reward */}
                  <div
                    onClick={() => {
                      setSelectedReward(tier);
                      setSelectedRewardType("free");
                    }}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-all ${
                      tier.tier === selectedReward?.tier &&
                      selectedRewardType === "free"
                        ? "border border-lootlab-color-highlight/50 bg-lootlab-color-highlight/20"
                        : "bg-slate-800/30 hover:bg-slate-800/50"
                    }`}
                  >
                    <div
                      className={`relative flex h-10 w-10 items-center justify-center rounded-lg ${
                        tier.tier <= userProgress.currentTier
                          ? "bg-lootlab-bg-main-highlight"
                          : "bg-slate-700/50"
                      }`}
                    >
                      <span
                        className={`text-lg ${
                          tier.tier <= userProgress.currentTier
                            ? ""
                            : "opacity-30"
                        }`}
                      >
                        {tier.rewards.free?.icon}
                      </span>
                      {tier.tier > userProgress.currentTier && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                          <Lock className="h-3 w-3 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`truncate text-xs font-medium ${
                          tier.tier <= userProgress.currentTier
                            ? "text-lootlab-font-base"
                            : "text-gray-500"
                        }`}
                      >
                        {tier.rewards.free?.name}
                      </div>
                      <div className="text-xs text-lootlab-color-highlight">
                        FREE
                      </div>
                    </div>
                    {isRewardClaimed(tier.tier, "free") ? (
                      <Check className="h-4 w-4 text-lootlab-color-highlight" />
                    ) : tier.tier > userProgress.currentTier ? (
                      <Lock className="h-4 w-4 text-gray-500" />
                    ) : null}
                  </div>

                  {/* Premium Reward */}
                  <div
                    onClick={() => {
                      setSelectedReward(tier);
                      setSelectedRewardType("premium");
                    }}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-all ${
                      tier.tier === selectedReward?.tier &&
                      selectedRewardType === "premium"
                        ? "border border-yellow-400/50 bg-yellow-400/20"
                        : "bg-slate-800/30 hover:bg-slate-800/50"
                    }`}
                  >
                    <div
                      className={`relative flex h-10 w-10 items-center justify-center rounded-lg ${
                        tier.tier <= userProgress.currentTier &&
                        userProgress.hasPremium
                          ? "bg-gradient-to-br from-yellow-900/30 to-orange-900/30"
                          : "bg-slate-700/50"
                      }`}
                    >
                      <span
                        className={`text-lg ${
                          tier.tier <= userProgress.currentTier &&
                          userProgress.hasPremium
                            ? ""
                            : "opacity-30"
                        }`}
                      >
                        {tier.rewards.premium?.icon || "👑"}
                      </span>
                      {(tier.tier > userProgress.currentTier ||
                        !userProgress.hasPremium) && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                          <Lock className="h-3 w-3 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`truncate text-xs font-medium ${
                          tier.tier <= userProgress.currentTier &&
                          userProgress.hasPremium
                            ? "text-lootlab-font-base"
                            : "text-gray-500"
                        }`}
                      >
                        {tier.rewards.premium?.name || "Premium Reward"}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-yellow-400">
                        <Crown className="h-3 w-3" />
                        PREMIUM
                      </div>
                    </div>
                    {userProgress.hasPremium &&
                    isRewardClaimed(tier.tier, "premium") ? (
                      <Check className="h-4 w-4 text-yellow-400" />
                    ) : tier.tier > userProgress.currentTier ||
                      !userProgress.hasPremium ? (
                      <Lock className="h-4 w-4 text-gray-500" />
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
