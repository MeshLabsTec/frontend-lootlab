interface BattlePassHighlightProps {
  currentTierObj:
    | {
        id: string;
        tier: number;
        name: string;
        description: string;
        type: "FREE" | "PREMIUM";
        rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
        image: string;
        icon: string;
        xpReward?: number;
        category: string;
      }
    | undefined;
  isRewardClaimed: (tier: number, rewardType: "free" | "premium") => boolean;
}

export function BattlePassHighlight({
  currentTierObj,
}: BattlePassHighlightProps) {
  return (
    <div className="mx-auto mb-14 mt-10 flex max-w-3xl flex-col items-center justify-center md:flex-row md:items-center">
      {/* Imagem grande do item */}
      <div className="flex w-full flex-col items-center justify-center">
        <div className="relative flex h-52 w-52 items-center justify-center overflow-hidden rounded-2xl shadow-lg">
          {currentTierObj?.image ? (
            <img
              src={currentTierObj.image}
              alt={currentTierObj.name}
              className="!h-64 !w-64 object-contain drop-shadow-xl"
            />
          ) : (
            <span className="text-7xl drop-shadow-lg">
              {currentTierObj?.icon || "🎁"}
            </span>
          )}
        </div>
      </div>
      {/* Infos do prêmio */}
      <div className="w-full md:ml-2">
        <div className="font-orbitron mb-2 text-2xl font-bold text-white">
          {currentTierObj?.name}
        </div>
        <div className="font-orbitron mb-2 text-sm font-semibold text-green-400">
          <span className="text-sm font-semibold text-green-400">
            {currentTierObj?.type} •{" "}
            <span className="uppercase text-zinc-400">
              {currentTierObj?.category}
            </span>
          </span>
        </div>
        <div className="font-orbitron mb-4 max-w-md text-base text-slate-300">
          {currentTierObj?.description}
        </div>
        <button className="font-orbitron rounded-lg bg-green-600 px-6 py-2 font-bold text-white shadow transition-all hover:bg-green-700">
          Claim now
        </button>
      </div>
    </div>
  );
}
