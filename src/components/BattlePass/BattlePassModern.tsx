"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  battlePassItems,
  mockUserBattlePassProgress,
} from "@/mocks/battlePass";
import { BattlePassCard } from "./BattlePassCard";
import { BattlePassHighlight } from "./BattlePassHighlight";
import medalha from "../../../public/assets/medalha.png";
import Image from "next/image";

export function BattlePassModern() {
  const [userProgress, setUserProgress] = useState(mockUserBattlePassProgress);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [highlightedItem, setHighlightedItem] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Largura fixa dos cards e bolinhas
  const CARD_WIDTH = 204;

  const isRewardClaimed = (tier: number, rewardType: "free" | "premium") => {
    return userProgress.unlockedRewards.some(
      (reward) => reward.tier === tier && reward.rewardType === rewardType,
    );
  };

  // Função para dar claim na recompensa
  function handleClaimReward(tier: number, rewardType: "free" | "premium") {
    // Evita claim duplicado
    if (
      userProgress.unlockedRewards.some(
        (r) => r.tier === tier && r.rewardType === rewardType,
      )
    )
      return;

    // Marca a recompensa como claimada
    const newUnlockedRewards = [
      ...userProgress.unlockedRewards,
      { tier, rewardType, claimedAt: new Date().toISOString() },
    ];

    // Se for o tier atual, avança para o próximo tier e adiciona XP
    let newTier = userProgress.currentTier;
    let newXP = userProgress.currentXP;
    if (tier === userProgress.currentTier) {
      newXP += 1000; // Supondo que cada tier = 1000 XP
      if (newTier < battlePassItems.length) {
        newTier += 1;
        newXP = 0;
      }
    }

    setUserProgress({
      ...userProgress,
      unlockedRewards: newUnlockedRewards,
      currentTier: newTier,
      currentXP: newXP,
    });
  }

  // Novo: Card de destaque sempre mostra o tier atual
  const currentTierObj = battlePassItems.find(
    (item) => item.tier === (highlightedItem || userProgress.currentTier),
  );

  // Função para atualizar o item destacado
  const handleItemHighlight = (tier: number) => {
    setHighlightedItem(tier);
  };

  // Funções de pan/scroll com mouse melhoradas
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setStartX(e.clientX);
      setStartScrollLeft(scrollLeft);

      // Cancelar qualquer animação em andamento
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    },
    [scrollLeft],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();

      const deltaX = e.clientX - startX;
      const sensitivity = 1.5; // Sensibilidade do movimento
      const newScrollLeft = startScrollLeft - deltaX * sensitivity;

      // Limitar o scroll
      const maxScroll = Math.max(
        0,
        battlePassItems.length * 204 - (containerRef.current?.clientWidth || 0),
      );
      const clampedScroll = Math.max(0, Math.min(newScrollLeft, maxScroll));

      setScrollLeft(clampedScroll);
    },
    [isDragging, startX, startScrollLeft],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Cleanup da animação
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove, {
        passive: false,
      });
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="relative min-h-screen bg-lootlab-bg-main">
      {/* CONTAINER CENTRALIZADO 80% DA TELA */}
      <div className="mx-auto w-4/5 max-w-screen-xl">
        {/* HEADER INTEGRADO AO TOPO DA TELA, NÃO FIXO */}
        <div className="mb-6 flex w-full items-center justify-between bg-gradient-to-b from-lootlab-bg-main/95 to-transparent px-12 py-8">
          {/* Esquerda: Logo e título */}
          <div className="flex items-center gap-8">
            <Image
              src={medalha}
              alt="Battle Pass Logo"
              className="h-20 w-20 object-contain"
            />
            <div>
              <div className="font-orbitron text-4xl leading-tight text-white">
                BATTLE PASS
              </div>
              <div className="mt-2 text-sm font-semibold text-lootlab-font-highlight">
                G3 BATTLE PASS | SEASON 2 • ENDED ON JUN 30, 2025 09:00AM (BRT)
              </div>
            </div>
          </div>
          {/* Direita: Barra de progresso global */}
          <div className="flex min-w-[380px] flex-col items-end gap-2">
            <div className="flex w-full items-center gap-3">
              <div className="flex-1">
                <div className="relative h-5 w-full rounded-full bg-slate-800">
                  <div
                    className="absolute left-0 top-0 h-5 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                    style={{
                      width: `${((userProgress.currentXP + (userProgress.currentTier - 1) * 1000) / (battlePassItems.length * 1000)) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="mt-2 flex w-full items-center justify-between gap-4 text-sm text-white">
              <span className="font-bold text-green-300">FREE PASS</span>
              <span className="text-green-300">
                XP {userProgress.currentXP.toLocaleString()} /{" "}
                {(battlePassItems.length * 1000).toLocaleString()}
              </span>
              <span className="text-blue-300">
                TIER {userProgress.currentTier} / {battlePassItems.length}
              </span>
            </div>
          </div>
        </div>

        {/* DESTAQUE CENTRAL DO ITEM */}
        <BattlePassHighlight
          currentTierObj={currentTierObj}
          isRewardClaimed={isRewardClaimed}
        />

        {/* TRILHA DE RECOMPENSAS HORIZONTAL */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-12">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex w-full items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
              <h2 className="whitespace-nowrap font-orbitron text-sm text-white">
                BATTLE PASS REWARDS{" "}
                <span className="font-normal text-green-400">
                  {userProgress.currentTier} / {battlePassItems.length}
                </span>
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-400 to-transparent"></div>
            </div>
          </div>

          {/* Container dos cards com pan/scroll suavizado */}
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-lg"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            style={{
              cursor: isDragging ? "grabbing" : "grab",
              userSelect: "none",
              touchAction: "none",
            }}
          >
            <div
              className="flex items-end gap-3 px-2 py-2 pb-6"
              style={{
                transform: `translateX(-${scrollLeft}px)`,
                minWidth: "max-content",
                willChange: "transform",
              }}
            >
              {battlePassItems.map((item) => {
                const isUnlocked = item.tier <= userProgress.currentTier;
                const isClaimed = isRewardClaimed(item.tier, "free");
                const isPremium = item.type === "PREMIUM";

                return (
                  <BattlePassCard
                    key={item.tier}
                    tier={item.tier}
                    reward={{
                      name: item.name,
                      description: item.description,
                      image: item.image,
                      icon: item.icon,
                      type: item.type,
                      rarity: item.rarity,
                      xpReward: item.xpReward,
                      category: item.category,
                    }}
                    isUnlocked={isUnlocked}
                    isClaimed={isClaimed}
                    isPremium={isPremium}
                    onClaim={(tier, rewardType) =>
                      handleClaimReward(tier, rewardType || "free")
                    }
                    onHighlight={handleItemHighlight}
                    isHighlighted={highlightedItem === item.tier}
                  />
                );
              })}
            </div>
          </div>

          {/* BARRA DE PROGRESSO ABAIXO DOS CARDS */}
          <div
            className="relative mt-4 overflow-hidden rounded-lg"
            style={{ height: 40 }}
          >
            {/* Container da barra de progresso com scroll sincronizado */}
            <div
              className="relative flex pb-4"
              style={{
                transform: `translateX(-${scrollLeft}px)`,
                minWidth: "max-content",
                willChange: "transform",
              }}
            >
              {/* Linha de fundo (toda a extensão) */}
              <div className="absolute left-0 top-[40%] z-0 h-1 w-full -translate-y-1/2 rounded-full bg-slate-800" />
              {/* Linha de progresso animada */}
              <div
                className="absolute left-0 top-[40%] z-10 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-700"
                style={{
                  width: `${((userProgress.currentTier - 1) / (battlePassItems.length - 1)) * 100}%`,
                  maxWidth: "100%",
                }}
              />
              {/* Bolinhas centralizadas na linha, alinhadas com os cards */}
              {battlePassItems.map((item) => {
                const isUnlocked = item.tier < userProgress.currentTier;
                const isActive = item.tier === userProgress.currentTier;
                const isPremium = item.type === "PREMIUM";
                return (
                  <div
                    key={item.tier}
                    className="relative flex items-center justify-center"
                    style={{ width: CARD_WIDTH, height: 40 }}
                  >
                    <div
                      className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full border-2 shadow-md transition-all duration-300 ${
                        isUnlocked
                          ? "border-green-400 bg-green-400 text-white"
                          : isActive
                            ? "scale-110 border-green-400 bg-white text-green-500 shadow-lg"
                            : isPremium
                              ? "border-purple-400 bg-purple-400/30 text-purple-400"
                              : "border-slate-700 bg-slate-800 text-slate-400"
                      }`}
                      style={{ zIndex: 30 }}
                    >
                      {item.tier}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
