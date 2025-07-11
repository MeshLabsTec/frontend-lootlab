import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FaCheck, FaLock } from "react-icons/fa";

interface BattlePassCardProps {
  tier: number;
  reward: {
    name: string;
    description: string;
    image: string;
    icon: string;
    type: "FREE" | "PREMIUM";
    rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
    xpReward?: number;
    category: string;
  };
  isUnlocked: boolean;
  isClaimed: boolean;
  isPremium: boolean;
  isHighlighted: boolean;
  onClaim: (tier: number, rewardType?: "free" | "premium") => void;
  onHighlight: (tier: number) => void;
}

export const BattlePassCard: React.FC<BattlePassCardProps> = ({
  tier,
  reward,
  isUnlocked,
  isClaimed,
  isPremium,
  isHighlighted,
  onClaim,
  onHighlight,
}) => {
  // Cores condicionais
  const cardBorder = isPremium
    ? "border border-[#6C4EEA]"
    : "border border-gray-500";
  const cardBg = "bg-gradient-to-br from-[#181A20] to-[#23243a]"; // sempre premium
  const buttonColor = isPremium
    ? "bg-[#A259FF] hover:bg-[#8e3be6]"
    : "bg-green-500 hover:bg-green-600";
  const buttonText = "text-white";

  const handleClaim = () => {
    if (isUnlocked && !isClaimed) {
      onClaim(tier, isPremium ? "premium" : "free");
    }
  };

  const handleCardClick = () => {
    onHighlight(tier);
  };

  return (
    <div
      className={cn(
        "group relative flex h-56 w-48 flex-col items-center justify-between rounded-2xl p-0 shadow-lg transition-all duration-300",
        cardBorder,
        cardBg,
        !isUnlocked && "opacity-80",
        isHighlighted &&
          "shadow-xl ring-2 ring-green-400 ring-offset-1 ring-offset-[#181A20]",
      )}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      {/* Badge PREMIUM */}
      {isPremium && (
        <div className="absolute left-0 top-0 z-10 rounded-br-xl rounded-tl-2xl bg-[#A259FF] px-3 py-1 text-xs font-bold text-white">
          PREMIUM
        </div>
      )}
      {/* Badge LOCKED */}
      {!isUnlocked && (
        <div className="absolute right-3 top-2 flex items-center gap-1">
          <FaLock className="h-3 w-3 text-white" />
          <span className="font-orbitron text-[10px] font-bold italic text-white">
            LOCKED
          </span>
        </div>
      )}

      {/* Badge CLAIMED */}
      {isClaimed && (
        <div className="absolute right-3 top-2 flex items-center gap-1">
          <FaCheck className="h-3 w-3 text-[#4ADE80]" />
          <span className="font-orbitron text-[10px] font-bold italic text-[#4ADE80]">
            CLAIMED
          </span>
        </div>
      )}

      {/* Imagem central */}
      <div className="mb-4 mt-8 flex w-full flex-1 flex-col items-center justify-center gap-3">
        <Image
          src={reward?.image || "/images/imagem-placeholder.webp"}
          alt={reward?.name || "Reward"}
          width={110}
          height={110}
          className={cn(
            "rounded-lg drop-shadow-xl transition-all duration-300",
            !isUnlocked && "opacity-60 grayscale",
          )}
        />
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-orbitron text-sm font-bold text-white">
            {reward?.name}
          </h1>
          <p className="font-orbitron text-xs text-gray-400">
            {reward?.category}
          </p>
        </div>
      </div>

      {/* Botão Claim now - aparece no hover apenas para itens desbloqueados e não claimados */}
      {isUnlocked && !isClaimed && (
        <button
          className={cn(
            "font-orbitron absolute bottom-0 left-0 right-0 w-full translate-y-full rounded-b-2xl py-2 text-center text-sm font-semibold opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus:outline-none",
            buttonColor,
            buttonText,
          )}
          onClick={handleClaim}
          type="button"
          style={{ letterSpacing: 0.5 }}
        >
          Claim now
        </button>
      )}
    </div>
  );
};
