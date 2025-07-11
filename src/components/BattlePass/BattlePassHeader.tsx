import { BattlePassSeason, calculateRemainingTime } from "@/mocks/battlePass";
import { Clock, Star, Trophy } from "lucide-react";

interface BattlePassHeaderProps {
  season: BattlePassSeason;
  userLevel: number;
  totalXP: number;
  hasPremium: boolean;
}

export function BattlePassHeader({
  season,
  userLevel,
  totalXP,
  hasPremium,
}: BattlePassHeaderProps) {
  const timeRemaining = calculateRemainingTime(season.endDate);

  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl border border-[#1F2C47] bg-gradient-to-r from-lootlab-bg-main via-lootlab-bg-main-highlight to-lootlab-bg-main p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/hexagono.png')] opacity-10"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Season Info */}
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <Trophy className="h-8 w-8 text-lootlab-color-highlight" />
              <h1 className="font-orbitron text-3xl font-semibold text-lootlab-font-base">
                {season.name}
              </h1>
              {hasPremium && (
                <div className="rounded-full bg-gradient-to-r from-lootlab-color-highlight to-lootlab-hover-highlight px-3 py-1 text-sm font-bold text-white">
                  PREMIUM
                </div>
              )}
            </div>
            <p className="font-orbitron mb-4 text-lg text-lootlab-font-highlight">
              {season.description}
            </p>

            {/* User Stats */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-lootlab-color-highlight" />
                <span className="font-orbitron font-semibold text-lootlab-font-base">
                  Level {userLevel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lootlab-font-highlight">Total XP:</span>
                <span className="font-orbitron font-bold text-lootlab-font-base">
                  {totalXP.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lootlab-font-highlight">Multiplier:</span>
                <span className="font-orbitron font-bold text-lootlab-color-highlight">
                  {season.boostMultiplier}x
                </span>
              </div>
            </div>
          </div>

          {/* Time Remaining */}
          <div className="flex flex-col items-center lg:items-end">
            <div className="mb-2 flex items-center gap-2">
              <Clock className="h-5 w-5 text-lootlab-color-highlight" />
              <span className="font-semibold text-lootlab-color-highlight">
                Time Remaining
              </span>
            </div>
            <div className="flex gap-3">
              <div className="text-center">
                <div className="rounded-lg border border-[#1F2C47] bg-lootlab-bg-main-highlight/80 px-3 py-2 backdrop-blur-sm">
                  <div className="font-orbitron text-2xl font-bold text-lootlab-font-base">
                    {timeRemaining.days}
                  </div>
                  <div className="font-orbitron text-xs text-lootlab-font-highlight">
                    DAYS
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="rounded-lg border border-[#1F2C47] bg-lootlab-bg-main-highlight/80 px-3 py-2 backdrop-blur-sm">
                  <div className="font-orbitron text-2xl font-bold text-lootlab-font-base">
                    {timeRemaining.hours}
                  </div>
                  <div className="font-orbitron text-xs text-lootlab-font-highlight">
                    HOURS
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="rounded-lg border border-[#1F2C47] bg-lootlab-bg-main-highlight/80 px-3 py-2 backdrop-blur-sm">
                  <div className="font-orbitron text-2xl font-bold text-lootlab-font-base">
                    {timeRemaining.minutes}
                  </div>
                  <div className="font-orbitron text-xs text-lootlab-font-highlight">
                    MIN
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
