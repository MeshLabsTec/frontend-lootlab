"use client";

import { BattlePassTier, UserBattlePassProgress } from "@/mocks/battlePass";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Lock, Check, Crown, Star } from "lucide-react";

interface BattlePassTiersProps {
  tiers: BattlePassTier[];
  userProgress: UserBattlePassProgress;
  onClaimReward?: (tier: number, rewardType: "free" | "premium") => void;
}

export function BattlePassTiers({
  tiers,
  userProgress,
  onClaimReward,
}: BattlePassTiersProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "COMMON":
        return "text-gray-600 bg-gray-100";
      case "RARE":
        return "text-blue-600 bg-blue-100";
      case "EPIC":
        return "text-purple-600 bg-purple-100";
      case "LEGENDARY":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
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
    const currentTierXP = userProgress.currentXP;
    const totalXpForCurrentTier = 1000; // xpPerTier from season
    return (currentTierXP / totalXpForCurrentTier) * 100;
  };

  // Mostrar apenas tiers próximos ao atual para performance
  const visibleTiers = tiers.filter(
    (tier) =>
      tier.tier <= userProgress.currentTier + 10 &&
      tier.tier >= Math.max(1, userProgress.currentTier - 5),
  );

  return (
    <div className="space-y-6">
      {/* Header com progresso atual */}
      <div className="rounded-xl border border-[#1F2C47] bg-gradient-to-r from-lootlab-bg-main to-lootlab-bg-main-highlight p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-orbitron text-2xl font-bold text-lootlab-font-base">
              Battle Pass Progress
            </h2>
            <p className="font-orbitron text-lootlab-font-highlight">
              Tier {userProgress.currentTier} / {tiers.length}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-lootlab-font-highlight">
              Current XP
            </div>
            <div className="font-orbitron text-2xl font-bold text-lootlab-font-base">
              {userProgress.currentXP.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-lootlab-font-highlight">
              Progress to next tier
            </span>
            <span className="text-lootlab-font-base">
              {userProgress.currentXP} / 1000 XP
            </span>
          </div>
          <Progress value={getCurrentTierProgress()} className="h-3" />
        </div>
      </div>

      {/* Lista de Tiers */}
      <div className="space-y-4">
        {visibleTiers.map((tier) => (
          <div
            key={tier.tier}
            className={`rounded-xl border-2 bg-slate-800/40 backdrop-blur-sm transition-all ${
              tier.tier === userProgress.currentTier
                ? "border-lootlab-color-highlight ring-2 ring-lootlab-color-highlight/20"
                : tier.tier <= userProgress.currentTier
                  ? "border-lootlab-color-highlight"
                  : "border-[#1F2C47]"
            }`}
          >
            <div className="p-6">
              {/* Tier Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {tier.tier <= userProgress.currentTier ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lootlab-color-highlight">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-600">
                      <Lock className="h-5 w-5 text-lootlab-font-highlight" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-orbitron text-xl font-bold text-lootlab-font-base">
                      Tier {tier.tier}
                    </h3>
                    <p className="font-orbitron text-sm text-lootlab-font-highlight">
                      {tier.xpRequired.toLocaleString()} XP required
                    </p>
                  </div>
                </div>

                {tier.tier === userProgress.currentTier && (
                  <Badge className="border-blue-200 bg-blue-100 text-blue-800">
                    <Star className="mr-1 h-4 w-4" />
                    aa Current
                  </Badge>
                )}
              </div>

              {/* Rewards */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Free Reward */}
                {tier.rewards.free && (
                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Free Reward
                      </h4>
                      <Badge
                        className={getRarityColor(tier.rewards.free.rarity)}
                      >
                        {tier.rewards.free.rarity}
                      </Badge>
                    </div>

                    <div className="mb-3 flex items-center gap-3">
                      <div className="text-2xl">{tier.rewards.free.icon}</div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {tier.rewards.free.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {tier.rewards.free.description}
                        </div>
                      </div>
                    </div>

                    {canClaimReward(tier.tier, "free") && (
                      <Button
                        size="sm"
                        onClick={() => onClaimReward?.(tier.tier, "free")}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Claim
                      </Button>
                    )}

                    {isRewardClaimed(tier.tier, "free") && (
                      <div className="text-center text-sm font-medium text-green-600">
                        ✓ Claimed
                      </div>
                    )}

                    {tier.tier > userProgress.currentTier && (
                      <div className="text-center text-sm text-gray-500">
                        <Lock className="mr-1 inline h-4 w-4" />
                        Locked
                      </div>
                    )}
                  </div>
                )}

                {/* Premium Reward */}
                {tier.rewards.premium && (
                  <div className="rounded-lg border border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 p-4 dark:border-yellow-800 dark:from-yellow-900/20 dark:to-orange-900/20">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                        <Crown className="h-4 w-4 text-yellow-600" />
                        Premium Reward
                      </h4>
                      <Badge
                        className={getRarityColor(tier.rewards.premium.rarity)}
                      >
                        {tier.rewards.premium.rarity}
                      </Badge>
                    </div>

                    <div className="mb-3 flex items-center gap-3">
                      <div className="text-2xl">
                        {tier.rewards.premium.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {tier.rewards.premium.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {tier.rewards.premium.description}
                        </div>
                      </div>
                    </div>

                    {!userProgress.hasPremium && (
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
                      >
                        Get Premium
                      </Button>
                    )}

                    {userProgress.hasPremium &&
                      canClaimReward(tier.tier, "premium") && (
                        <Button
                          size="sm"
                          onClick={() => onClaimReward?.(tier.tier, "premium")}
                          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
                        >
                          Claim Premium
                        </Button>
                      )}

                    {isRewardClaimed(tier.tier, "premium") && (
                      <div className="text-center text-sm font-medium text-yellow-600">
                        ✓ Claimed
                      </div>
                    )}

                    {tier.tier > userProgress.currentTier && (
                      <div className="text-center text-sm text-gray-500">
                        <Lock className="mr-1 inline h-4 w-4" />
                        Locked
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
