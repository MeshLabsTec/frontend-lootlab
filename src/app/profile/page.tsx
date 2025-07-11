"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { mockUserTaskProgress } from "@/mocks/battlePass";
import { TaskList } from "@/components/BattlePass/TaskList";
import NFTPostList from "@/components/Others/NFTPostList";
import { Star, Settings, Share2, Edit2, Boxes, ListChecks } from "lucide-react";

function MinimalTabs({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const tabs = [
    {
      key: "inventory",
      label: "Inventário",
      icon: <Boxes className="h-5 w-5 text-lootlab-color-highlight" />,
    },
    {
      key: "tasks",
      label: "Tarefas",
      icon: <ListChecks className="h-5 w-5 text-lootlab-color-highlight" />,
    },
  ];

  return (
    <div className="mb-8 flex w-full flex-wrap gap-2 border-b border-slate-700">
      {tabs.map((tab) => {
        const active = value === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`relative px-6 py-3 text-base font-bold transition-colors duration-200 ${active ? "text-lootlab-color-highlight" : "text-slate-400"} hover:text-lootlab-color-highlight focus:outline-none`}
            style={{ minWidth: 120 }}
          >
            <span className="flex items-center gap-2">
              {tab.label}
              {active && tab.icon}
            </span>
            {active && (
              <span className="absolute -bottom-1 left-4 right-4 h-1 animate-pulse rounded-full bg-gradient-to-r from-lootlab-color-highlight to-lootlab-hover-highlight" />
            )}
          </button>
        );
      })}
    </div>
  );
}

// Mock de inventário NFT
const mockInventory = [
  {
    id: "1",
    title: "Tiny Pack",
    category: "NFT Jogos" as const,
    marketLink: "https://example.com/market",
    score: 4.5,
    investment: "0.1 ETH",
    token: "TINY",
    network: "Arbitrum",
    commentAuthor: "Usuário",
    slug: "tiny-pack",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    authorId: "user-1",
    network_secondary: [],
    platform: [],
    airDrop: true,
    status: "LIVE" as const,
    links: [],
    projectFeatures: [],
    launchInfo: {
      launchDate: new Date().toISOString(),
      marketCap: 1000000,
      currentSupply: "1000",
      totalSupply: "10000",
      privateSale: 0,
      publicSale: 0,
    },
    partnerships: [],
    images: ["/images/placeholder-inventory.png"],
    genres: ["Wild Forest"],
    author: {
      id: "user-1",
      name: "Usuário",
      email: "usuario@email.com",
      password: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      role: "USER" as const,
    },
  },
];

export default function ProfilePage() {
  const { data: session } = useSession();
  const [tab, setTab] = useState("inventory");

  // Mock de dados do usuário
  const userData = {
    username: session?.user?.email?.split("@")[0] || "Usuário",
    level: 20,
    currentXP: 1500,
    nextLevelXP: 2000,
    rank: "Bronze",
    avatar: null, // Mockado por enquanto
  };
  const progressPercentage = (userData.currentXP / userData.nextLevelXP) * 100;
  const xpUntilNext = userData.nextLevelXP - userData.currentXP;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-lootlab-bg-main">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 bg-[url('/images/hexagono.png')] opacity-10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-lootlab-bg-main via-lootlab-bg-main-highlight/30 to-lootlab-bg-main" />
      <div className="absolute right-20 top-20 -z-10 h-32 w-32 animate-pulse rounded-full bg-lootlab-color-highlight/10 blur-3xl" />
      <div className="absolute bottom-32 left-16 -z-10 h-40 w-40 animate-pulse rounded-full bg-purple-500/5 blur-2xl delay-1000" />

      {/* Header do perfil */}
      <div className="mx-auto w-full px-20 pt-10 md:pt-16">
        <div className="rounded-2xl border border-lootlab-color-highlight/30 bg-slate-900/80 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col gap-8 p-8 md:flex-row md:items-center md:gap-12">
            {/* Avatar com borda neon discreta */}
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-4 border-lootlab-color-highlight bg-slate-950 shadow-xl md:mx-0">
              {userData.avatar ? (
                <img
                  src={userData.avatar}
                  alt="Avatar"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span className="text-6xl text-white">👤</span>
              )}
            </div>
            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
                <h1 className="truncate text-3xl font-extrabold text-white drop-shadow-md md:text-4xl">
                  {userData.username}
                </h1>
                <span className="inline-flex items-center gap-2 rounded-full bg-lootlab-color-highlight px-4 py-1 text-base font-semibold text-white shadow-md">
                  <span className="text-xs font-bold">Nível</span>{" "}
                  {userData.level}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400/20 px-4 py-1 text-base font-semibold text-yellow-300 shadow-md">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  {userData.rank}
                </span>
              </div>
              <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
                <div className="flex items-center gap-3 text-base text-gray-200">
                  <span className="font-medium">
                    {userData.currentXP} / {userData.nextLevelXP} XP
                  </span>
                  <div className="relative w-48">
                    <Progress
                      value={progressPercentage}
                      className="h-3 rounded-full bg-gray-800"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                      +{xpUntilNext} XP
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Ações */}
            <div className="flex flex-row items-center justify-center gap-3 md:flex-col md:gap-6">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-slate-800/80 p-3 text-white shadow transition-all hover:bg-lootlab-color-highlight/20"
              >
                <Edit2 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-slate-800/80 p-3 text-white shadow transition-all hover:bg-lootlab-color-highlight/20"
              >
                <Share2 className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-slate-800/80 p-3 text-white shadow transition-all hover:bg-lootlab-color-highlight/20"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs e conteúdo principal */}
      <div className="mx-auto mt-10 flex w-full flex-col gap-8 px-20 md:flex-row md:gap-12">
        {/* Conteúdo principal: Tabs */}
        <main className="flex-1">
          <div className="rounded-2xl border border-[#1F2C47] bg-gradient-to-br from-slate-800/40 to-slate-900/40 p-6 shadow-lg backdrop-blur-md">
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <MinimalTabs value={tab} onChange={setTab} />
              <TabsContent value="inventory">
                <NFTPostList posts={mockInventory} isLoading={false} />
              </TabsContent>
              <TabsContent value="tasks">
                <TaskList userProgress={mockUserTaskProgress} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <aside className="mb-8 w-full md:mb-0 md:w-80">
          <div className="rounded-2xl border border-[#1F2C47] bg-gradient-to-br from-slate-800/40 to-slate-900/40 p-6 shadow-lg backdrop-blur-md">
            <h3 className="mb-4 text-lg font-semibold text-lootlab-font-base">
              Filtros
            </h3>
            <div className="mb-4">
              <span className="mb-2 block text-xs font-bold text-lootlab-font-highlight">
                Tipo de Recompensa
              </span>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-lootlab-font-base">
                  <input
                    type="checkbox"
                    checked
                    readOnly
                    className="accent-purple-500"
                  />{" "}
                  Soulbound
                </label>
              </div>
            </div>
            <div className="mb-4">
              <span className="mb-2 block text-xs font-bold text-lootlab-font-highlight">
                Chains
              </span>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-lootlab-font-base">
                  <input
                    type="checkbox"
                    checked
                    readOnly
                    className="accent-blue-500"
                  />{" "}
                  Arbitrum
                </label>
              </div>
            </div>
            <div>
              <span className="mb-2 block text-xs font-bold text-lootlab-font-highlight">
                Data de Resgate
              </span>
              <select className="w-full rounded bg-slate-800 p-2 text-lootlab-font-base">
                <option>All Time</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 6 months</option>
                <option>Last 12 months</option>
              </select>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
