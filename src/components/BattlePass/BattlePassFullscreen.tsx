"use client";

import { useState } from "react";
import {
  mockBattlePassSeason,
  mockBattlePassTiers,
  mockUserBattlePassProgress,
  calculateRemainingTime,
} from "@/mocks/battlePass";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Lock, Check, Crown, Gift } from "lucide-react";

export function BattlePassFullscreen() {
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
      tier.tier >= Math.max(1, userProgress.currentTier - 3) &&
      tier.tier <= Math.min(100, userProgress.currentTier + 10),
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
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/hexagono.png')] opacity-5"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-lootlab-bg-main via-lootlab-bg-main-highlight/50 to-lootlab-bg-main"></div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#1F2C47] p-6">
        <div className="flex items-center gap-4">
          <Trophy className="h-8 w-8 text-lootlab-color-highlight" />
          <div>
            <h1 className="font-orbitron text-2xl text-lootlab-font-base">
              {mockBattlePassSeason.name}
            </h1>
            <p className="font-orbitron text-sm text-lootlab-font-highlight">
              SEASON 2 • ENDS IN {timeRemaining.days} DAYS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {!userProgress.hasPremium ? (
            <Badge
              variant="outline"
              className="border-lootlab-color-highlight text-lootlab-font-highlight"
            >
              FREE PASS
            </Badge>
          ) : (
            <Badge className="bg-gradient-to-r from-lootlab-color-highlight to-lootlab-hover-highlight text-white">
              PREMIUM
            </Badge>
          )}

          <div className="text-right">
            <div className="text-sm text-lootlab-font-highlight">XP</div>
            <div className="text-xl font-bold text-lootlab-color-highlight">
              {userProgress.totalXP.toLocaleString()} /{" "}
              {(userProgress.currentTier * 1000).toLocaleString()}
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm text-lootlab-font-highlight">TIER</div>
            <div className="text-xl font-bold text-lootlab-font-base">
              {userProgress.currentTier} / 100
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex min-h-[calc(100vh-120px)] flex-col">
        {/* Featured Reward Section */}
        <div className="flex min-h-[300px] flex-1 items-center justify-center p-8">
          <div className="w-full max-w-5xl">
            {/* Reward Display - Horizontal Layout */}
            <div className="flex items-center gap-12">
              {/* Left side - Reward Image */}
              <div className="flex-shrink-0">
                <div
                  className={`h-48 w-48 rounded-2xl bg-gradient-to-br ${getRarityColor(
                    selectedRewardType === "free"
                      ? selectedReward?.rewards.free?.rarity || "COMMON"
                      : selectedReward?.rewards.premium?.rarity || "COMMON",
                  )} p-1 shadow-2xl`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-xl bg-lootlab-bg-main-highlight">
                    <div className="text-6xl">
                      {selectedRewardType === "free"
                        ? selectedReward?.rewards.free?.icon || "🎁"
                        : selectedReward?.rewards.premium?.icon || "👑"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Reward Info */}
              <div className="flex-1">
                <Badge
                  className={`mb-4 bg-gradient-to-r ${getRarityColor(
                    selectedRewardType === "free"
                      ? selectedReward?.rewards.free?.rarity || "COMMON"
                      : selectedReward?.rewards.premium?.rarity || "COMMON",
                  )} text-white`}
                >
                  {selectedRewardType === "free"
                    ? selectedReward?.rewards.free?.rarity || "COMMON"
                    : selectedReward?.rewards.premium?.rarity || "COMMON"}
                </Badge>

                <h2 className="mb-3 font-orbitron text-3xl font-bold text-lootlab-font-base">
                  {selectedRewardType === "free"
                    ? selectedReward?.rewards.free?.name || "Special Reward"
                    : selectedReward?.rewards.premium?.name || "Premium Reward"}
                </h2>

                <p className="mb-6 font-orbitron text-base text-lootlab-font-highlight">
                  {selectedRewardType === "free"
                    ? selectedReward?.rewards.free?.description ||
                      "An incredible Battle Pass reward"
                    : selectedReward?.rewards.premium?.description ||
                      "An exclusive premium reward"}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {selectedReward &&
                    selectedRewardType === "free" &&
                    canClaimReward(selectedReward.tier, "free") && (
                      <Button
                        onClick={() =>
                          handleClaimReward(selectedReward.tier, "free")
                        }
                        className="bg-gradient-to-r from-lootlab-color-highlight to-lootlab-hover-highlight px-6 py-2 text-white"
                      >
                        <Gift className="mr-2 h-4 w-4" />
                        Claim Free
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
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-2 text-white"
                      >
                        <Crown className="mr-2 h-4 w-4" />
                        Claim Premium
                      </Button>
                    )}

                  {selectedRewardType === "premium" &&
                    !userProgress.hasPremium && (
                      <Button
                        onClick={handleBuyPremium}
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-2 text-white"
                      >
                        <Crown className="mr-2 h-4 w-4" />
                        Get Premium
                      </Button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 flex-shrink-0 px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-lootlab-font-highlight">
                Progress to Tier {userProgress.currentTier + 1}
              </span>
              <span className="text-lootlab-font-base">
                {userProgress.currentXP} / 1000 XP
              </span>
            </div>
            <Progress value={getCurrentTierProgress()} className="h-4" />
          </div>
        </div>

        {/* Battle Pass Tiers */}
        <div className="min-h-[300px] flex-shrink-0 overflow-visible border-t border-[#1F2C47] bg-lootlab-bg-main-highlight/50 p-6">
          <div className="mx-auto max-w-6xl overflow-visible">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-lootlab-font-base">
                BATTLE PASS REWARDS
              </h3>
              <span className="text-sm text-lootlab-font-highlight">
                {userProgress.unlockedRewards.length} / {visibleTiers.length}{" "}
                COLLECTED
              </span>
            </div>

            {/* Tiers Horizontal Scroll */}
            <div className="flex gap-4 overflow-x-auto px-4 pb-4 pt-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-lootlab-color-highlight">
              {visibleTiers.map((tier) => (
                <div
                  key={tier.tier}
                  className="min-w-[400px] cursor-pointer transition-all duration-300 hover:translate-y-[-2px] hover:transform"
                >
                  {/* Tier Header */}
                  <div className="mb-3 flex items-center justify-center">
                    <span className="text-sm font-bold text-lootlab-color-highlight">
                      TIER {tier.tier}
                    </span>
                  </div>

                  {/* Rewards Side by Side */}
                  <div className="flex gap-3">
                    {/* Free Reward */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedReward(tier);
                        setSelectedRewardType("free");
                      }}
                      className={`flex-1 cursor-pointer rounded-xl border-2 p-3 transition-all ${
                        tier.tier === selectedReward?.tier &&
                        selectedRewardType === "free"
                          ? "border-lootlab-color-highlight shadow-lg shadow-lootlab-color-highlight/20 ring-2 ring-lootlab-color-highlight/30"
                          : tier.tier === userProgress.currentTier
                            ? "border-lootlab-color-highlight ring-1 ring-lootlab-color-highlight/20"
                            : tier.tier <= userProgress.currentTier
                              ? "border-lootlab-color-highlight/50"
                              : "border-[#1F2C47]"
                      } ${
                        tier.tier <= userProgress.currentTier
                          ? "bg-slate-800/60"
                          : "bg-slate-800/30"
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-lootlab-color-highlight">
                          FREE
                        </span>
                        {tier.tier <= userProgress.currentTier ? (
                          <Check className="h-3 w-3 text-lootlab-color-highlight" />
                        ) : (
                          <Lock className="h-3 w-3 text-lootlab-font-highlight" />
                        )}
                      </div>

                      <div className="mb-2 text-center">
                        <div className="mx-auto mb-1 flex h-12 w-12 items-center justify-center rounded-lg bg-lootlab-bg-main-highlight text-lg">
                          {tier.rewards.free?.icon}
                        </div>
                        <div className="text-xs font-medium text-lootlab-font-base">
                          {tier.rewards.free?.name}
                        </div>
                      </div>

                      <div className="text-center">
                        {isRewardClaimed(tier.tier, "free") ? (
                          <div className="text-xs font-bold text-lootlab-color-highlight">
                            ✓ COLLECTED
                          </div>
                        ) : tier.tier <= userProgress.currentTier ? (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClaimReward(tier.tier, "free");
                            }}
                            className="w-full bg-lootlab-color-highlight text-xs hover:bg-lootlab-hover-highlight"
                          >
                            COLLECT
                          </Button>
                        ) : (
                          <div className="text-xs text-lootlab-font-highlight">
                            {tier.xpRequired} XP
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Premium Reward */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedReward(tier);
                        setSelectedRewardType("premium");
                      }}
                      className={`flex-1 cursor-pointer rounded-xl border-2 p-3 transition-all ${
                        tier.tier === selectedReward?.tier &&
                        selectedRewardType === "premium"
                          ? "border-yellow-400 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 shadow-lg shadow-yellow-400/20 ring-2 ring-yellow-400/30"
                          : userProgress.hasPremium
                            ? "border-yellow-500/50 bg-gradient-to-br from-yellow-900/20 to-orange-900/20"
                            : "border-gray-600 bg-slate-800/20"
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Crown className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs font-bold text-yellow-500">
                            PREMIUM
                          </span>
                        </div>
                        {userProgress.hasPremium &&
                        tier.tier <= userProgress.currentTier ? (
                          <Check className="h-3 w-3 text-yellow-500" />
                        ) : (
                          <Lock className="h-3 w-3 text-gray-500" />
                        )}
                      </div>

                      <div className="mb-2 text-center">
                        <div className="mx-auto mb-1 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-900/30 to-orange-900/30 text-lg">
                          {tier.rewards.premium?.icon || "👑"}
                        </div>
                        <div className="text-xs font-medium text-lootlab-font-base">
                          {tier.rewards.premium?.name || "Premium Reward"}
                        </div>
                      </div>

                      <div className="text-center">
                        {userProgress.hasPremium &&
                        isRewardClaimed(tier.tier, "premium") ? (
                          <div className="text-xs font-bold text-yellow-500">
                            ✓ COLLECTED
                          </div>
                        ) : userProgress.hasPremium &&
                          tier.tier <= userProgress.currentTier ? (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClaimReward(tier.tier, "premium");
                            }}
                            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-xs text-white hover:from-yellow-500 hover:to-orange-600"
                          >
                            COLLECT
                          </Button>
                        ) : (
                          <div className="text-xs text-gray-500">PREMIUM</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
