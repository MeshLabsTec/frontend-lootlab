// Usar URLs de imagem em vez de importações diretas
const box = "/assets/box.png";
const box2 = "/assets/box2.png";
const caixaPirata = "/assets/caixa-pirata.png";
const xp = "/assets/xp.png";

export interface BattlePassSeason {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  maxTier: number;
  xpPerTier: number;
  boostMultiplier: number;
  theme: string;
  backgroundImage: string;
}

export interface Task {
  id: string;
  seasonId: string;
  name: string;
  description: string;
  xpReward: number;
  taskType: "DAILY" | "WEEKLY" | "UNIQUE" | "PROGRESSIVE";
  maxCompletions?: number;
  requirements: {
    action: string;
    count?: number;
    timeframe?: string;
    milestones?: Array<{ count: number; xp: number }>;
  };
  isActive: boolean;
  icon: string;
  category: string;
}

export interface UserTaskProgress {
  taskId: string;
  userId: string;
  currentProgress: number;
  targetProgress: number;
  completedCount: number;
  isCompleted: boolean;
  lastCompletedAt?: string;
  xpEarned: number;
}

export interface BattlePassTier {
  tier: number;
  xpRequired: number;
  xpTotal: number;
  rewards: {
    free?: {
      type: "XP" | "BADGE" | "TITLE" | "AVATAR" | "EMOTE" | "SKIN";
      name: string;
      description: string;
      icon: string;
      rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
      image?: string;
    };
    premium?: {
      type: "XP" | "BADGE" | "TITLE" | "AVATAR" | "EMOTE" | "SKIN";
      name: string;
      description: string;
      icon: string;
      rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
      image?: string;
    };
  };
}

export interface UserBattlePassProgress {
  userId: string;
  seasonId: string;
  currentTier: number;
  currentXP: number;
  totalXP: number;
  hasPremium: boolean;
  unlockedRewards: Array<{
    tier: number;
    rewardType: "free" | "premium";
    claimedAt: string;
  }>;
}

// Mock Data
export const mockBattlePassSeason: BattlePassSeason = {
  id: "season-1",
  name: "Temporada 1: Cyberpunk 2024",
  description: "Primeira temporada com tema cyberpunk e recompensas exclusivas",
  startDate: "2024-01-01T00:00:00.000Z",
  endDate: "2024-03-31T23:59:59.000Z",
  isActive: true,
  maxTier: 100,
  xpPerTier: 1000,
  boostMultiplier: 1.5,
  theme: "cyberpunk",
  backgroundImage: "/images/cyberpunk-bg.jpg",
};

export const mockTasks: Task[] = [
  {
    id: "task-1",
    seasonId: "season-1",
    name: "Login Diário",
    description: "Faça login na plataforma para ganhar XP diário",
    xpReward: 50,
    taskType: "DAILY",
    requirements: {
      action: "login",
      timeframe: "daily",
    },
    isActive: true,
    icon: "🔗",
    category: "ENGAGEMENT",
  },
  {
    id: "task-2",
    seasonId: "season-1",
    name: "Comentar 5 Posts",
    description: "Comente em 5 posts diferentes para ganhar XP",
    xpReward: 200,
    taskType: "WEEKLY",
    maxCompletions: 1,
    requirements: {
      action: "comment",
      count: 5,
      timeframe: "weekly",
    },
    isActive: true,
    icon: "💬",
    category: "SOCIAL",
  },
  {
    id: "task-3",
    seasonId: "season-1",
    name: "Primeiro Login",
    description: "Complete seu primeiro login na plataforma",
    xpReward: 100,
    taskType: "UNIQUE",
    maxCompletions: 1,
    requirements: {
      action: "first_login",
    },
    isActive: true,
    icon: "🎯",
    category: "MILESTONE",
  },
  {
    id: "task-4",
    seasonId: "season-1",
    name: "Master Reviewer",
    description: "Faça reviews para desbloquear recompensas progressivas",
    xpReward: 25,
    taskType: "PROGRESSIVE",
    requirements: {
      action: "review",
      milestones: [
        { count: 10, xp: 25 },
        { count: 25, xp: 50 },
        { count: 50, xp: 100 },
        { count: 100, xp: 200 },
      ],
    },
    isActive: true,
    icon: "⭐",
    category: "CONTENT",
  },
  {
    id: "task-5",
    seasonId: "season-1",
    name: "Criar Post",
    description: "Publique um novo post na comunidade",
    xpReward: 150,
    taskType: "DAILY",
    requirements: {
      action: "create_post",
      timeframe: "daily",
    },
    isActive: true,
    icon: "📝",
    category: "CONTENT",
  },
  {
    id: "task-6",
    seasonId: "season-1",
    name: "Colecionador",
    description: "Visualize 20 NFTs diferentes",
    xpReward: 300,
    taskType: "WEEKLY",
    requirements: {
      action: "view_nft",
      count: 20,
      timeframe: "weekly",
    },
    isActive: true,
    icon: "🎨",
    category: "EXPLORATION",
  },
];

export const mockUserTaskProgress: UserTaskProgress[] = [
  {
    taskId: "task-1",
    userId: "user-1",
    currentProgress: 1,
    targetProgress: 1,
    completedCount: 15,
    isCompleted: true,
    lastCompletedAt: "2024-01-15T10:30:00.000Z",
    xpEarned: 750,
  },
  {
    taskId: "task-2",
    userId: "user-1",
    currentProgress: 3,
    targetProgress: 5,
    completedCount: 2,
    isCompleted: false,
    xpEarned: 400,
  },
  {
    taskId: "task-3",
    userId: "user-1",
    currentProgress: 1,
    targetProgress: 1,
    completedCount: 1,
    isCompleted: true,
    lastCompletedAt: "2024-01-01T08:00:00.000Z",
    xpEarned: 100,
  },
  {
    taskId: "task-4",
    userId: "user-1",
    currentProgress: 15,
    targetProgress: 25,
    completedCount: 0,
    isCompleted: false,
    xpEarned: 25,
  },
  {
    taskId: "task-5",
    userId: "user-1",
    currentProgress: 0,
    targetProgress: 1,
    completedCount: 8,
    isCompleted: false,
    xpEarned: 1200,
  },
  {
    taskId: "task-6",
    userId: "user-1",
    currentProgress: 12,
    targetProgress: 20,
    completedCount: 1,
    isCompleted: false,
    xpEarned: 300,
  },
];

export const mockBattlePassTiers: BattlePassTier[] = Array.from(
  { length: 100 },
  (_, index) => {
    const tier = index + 1;
    const xpRequired = 1000;
    const xpTotal = tier * xpRequired;

    // Associa imagens reais para alguns tiers de exemplo
    let image: any;
    if (tier === 2) image = box;
    if (tier === 3) image = box;
    if (tier === 4) image = box;
    if (tier === 5) image = box;
    if (tier === 6) image = box;

    return {
      tier,
      xpRequired,
      xpTotal,
      rewards: {
        free: {
          type: tier % 10 === 0 ? "BADGE" : tier % 5 === 0 ? "TITLE" : "XP",
          name:
            tier % 10 === 0
              ? `Badge Tier ${tier}`
              : tier % 5 === 0
                ? `Título Tier ${tier}`
                : `${tier * 10} XP Bonus`,
          description:
            tier % 10 === 0
              ? `Badge exclusivo do tier ${tier}`
              : tier % 5 === 0
                ? `Título especial do tier ${tier}`
                : `Bônus de XP do tier ${tier}`,
          icon: tier % 10 === 0 ? "🏆" : tier % 5 === 0 ? "👑" : "⚡",
          rarity:
            tier % 10 === 0 ? "LEGENDARY" : tier % 5 === 0 ? "EPIC" : "COMMON",
          ...(image ? { image } : {}),
        },
        ...(tier % 3 === 0 && {
          premium: {
            type:
              tier % 20 === 0
                ? "SKIN"
                : tier % 10 === 0
                  ? "EMOTE"
                  : tier % 5 === 0
                    ? "AVATAR"
                    : "BADGE",
            name:
              tier % 20 === 0
                ? `Skin Premium ${tier}`
                : tier % 10 === 0
                  ? `Emote ${tier}`
                  : tier % 5 === 0
                    ? `Avatar ${tier}`
                    : `Badge Premium ${tier}`,
            description:
              tier % 20 === 0
                ? `Skin exclusiva premium`
                : tier % 10 === 0
                  ? `Emote premium exclusivo`
                  : tier % 5 === 0
                    ? `Avatar premium`
                    : `Badge premium exclusivo`,
            icon:
              tier % 20 === 0
                ? "🎭"
                : tier % 10 === 0
                  ? "💃"
                  : tier % 5 === 0
                    ? "🖼️"
                    : "🌟",
            rarity:
              tier % 20 === 0 ? "LEGENDARY" : tier % 10 === 0 ? "EPIC" : "RARE",
            ...(image ? { image } : {}),
          },
        }),
      },
    };
  },
);

export const mockUserBattlePassProgress: UserBattlePassProgress = {
  userId: "user-1",
  seasonId: "season-1",
  currentTier: 12,
  currentXP: 500,
  totalXP: 12500,
  hasPremium: true,
  unlockedRewards: [
    {
      tier: 1,
      rewardType: "free",
      claimedAt: "2024-01-02T10:00:00.000Z",
    },
    {
      tier: 3,
      rewardType: "premium",
      claimedAt: "2024-01-05T14:30:00.000Z",
    },
    {
      tier: 5,
      rewardType: "free",
      claimedAt: "2024-01-08T09:15:00.000Z",
    },
    {
      tier: 5,
      rewardType: "premium",
      claimedAt: "2024-01-08T09:15:00.000Z",
    },
    {
      tier: 10,
      rewardType: "free",
      claimedAt: "2024-01-12T16:45:00.000Z",
    },
    {
      tier: 10,
      rewardType: "premium",
      claimedAt: "2024-01-12T16:45:00.000Z",
    },
  ],
};

export const getTasksByType = (type: Task["taskType"]) => {
  return mockTasks.filter((task) => task.taskType === type);
};

export const getUserTaskProgress = (taskId: string) => {
  return mockUserTaskProgress.find((progress) => progress.taskId === taskId);
};

export const getTierProgress = (tier: number) => {
  return mockBattlePassTiers.find((t) => t.tier === tier);
};

export const calculateRemainingTime = (endDate: string) => {
  const now = new Date();
  const end = new Date(endDate);
  const diff = end.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes };
};

// Array de objetos com dados reais dos itens do Battle Pass
export const battlePassItems: Array<{
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
}> = [
  {
    id: "tier-1",
    tier: 1,
    name: "LET ME IN!",
    description: "Caixa misteriosa com recompensas aleatórias",
    type: "FREE",
    rarity: "COMMON",
    image: box,
    icon: "📦",
    category: "Mystery Box",
  },
  {
    id: "tier-2",
    tier: 2,
    name: "Rare Mystery Box",
    description: "Caixa rara com melhores chances de itens especiais",
    type: "FREE",
    rarity: "RARE",
    image: box2,
    icon: "🎁",
    category: "Mystery Box",
  },
  {
    id: "tier-3",
    tier: 3,
    name: "Follow The Map",
    description: "Baú pirata com tesouros lendários",
    type: "PREMIUM",
    rarity: "EPIC",
    image: caixaPirata,
    icon: "🏴‍☠️",
    category: "Mystery Box",
  },
  {
    id: "tier-4",
    tier: 4,
    name: "XP Boost Pack",
    description: "Pacote de boost de experiência",
    type: "FREE",
    rarity: "COMMON",
    image: xp,
    icon: "⚡",
    xpReward: 500,
    category: "250 XP POINTS",
  },
  {
    id: "tier-5",
    tier: 5,
    name: "Legendary Mystery Box",
    description: "Caixa lendária com itens exclusivos",
    type: "PREMIUM",
    rarity: "LEGENDARY",
    image: box,
    icon: "💎",
    category: "Mystery Box",
  },
  {
    id: "tier-6",
    tier: 6,
    name: "Rare XP Pack",
    description: "Pacote raro de experiência",
    type: "FREE",
    rarity: "RARE",
    image: xp,
    icon: "🌟",
    xpReward: 1000,
    category: "1000 XP POINTS",
  },
  {
    id: "tier-7",
    tier: 7,
    name: "Epic Mystery Box",
    description: "Caixa épica com recompensas valiosas",
    type: "PREMIUM",
    rarity: "EPIC",
    image: box2,
    icon: "🔥",
    category: "Mystery Box",
  },
  {
    id: "tier-8",
    tier: 8,
    name: "Common Mystery Box",
    description: "Caixa comum com recompensas básicas",
    type: "FREE",
    rarity: "COMMON",
    image: box,
    icon: "📦",
    category: "Mystery Box",
  },
  {
    id: "tier-9",
    tier: 9,
    name: "Rare Pirate Chest",
    description: "Baú pirata raro com tesouros especiais",
    type: "PREMIUM",
    rarity: "RARE",
    image: caixaPirata,
    icon: "⚓",
    category: "Mystery Box",
  },
  {
    id: "tier-10",
    tier: 10,
    name: "Legendary XP Pack",
    description: "Pacote lendário de experiência máxima",
    type: "FREE",
    rarity: "LEGENDARY",
    image: xp,
    icon: "👑",
    xpReward: 2000,
    category: "2000 XP POINTS",
  },
  {
    id: "tier-11",
    tier: 11,
    name: "Epic XP Boost",
    description: "Boost épico de experiência",
    type: "PREMIUM",
    rarity: "EPIC",
    image: xp,
    icon: "🚀",
    xpReward: 1500,
    category: "1500 XP POINTS",
  },
  {
    id: "tier-12",
    tier: 12,
    name: "Mystery Box Deluxe",
    description: "Caixa misteriosa deluxe com recompensas premium",
    type: "FREE",
    rarity: "RARE",
    image: box2,
    icon: "💫",
    category: "Mystery Box",
  },
  {
    id: "tier-13",
    tier: 13,
    name: "Legendary Pirate Chest",
    description: "Baú pirata lendário com tesouros míticos",
    type: "PREMIUM",
    rarity: "LEGENDARY",
    image: caixaPirata,
    icon: "🗡️",
    category: "Mystery Box",
  },
  {
    id: "tier-14",
    tier: 14,
    name: "Common XP Pack",
    description: "Pacote comum de experiência",
    type: "FREE",
    rarity: "COMMON",
    image: xp,
    icon: "📚",
    xpReward: 250,
    category: "250 XP POINTS",
  },
  {
    id: "tier-15",
    tier: 15,
    name: "Epic Mystery Box",
    description: "Caixa épica com itens valiosos",
    type: "PREMIUM",
    rarity: "EPIC",
    image: box,
    icon: "💎",
    category: "Mystery Box",
  },
  {
    id: "tier-16",
    tier: 16,
    name: "Rare Mystery Box",
    description: "Caixa rara com recompensas especiais",
    type: "FREE",
    rarity: "RARE",
    image: box2,
    icon: "🎁",
    category: "Mystery Box",
  },
  {
    id: "tier-17",
    tier: 17,
    name: "Legendary XP Boost",
    description: "Boost lendário de experiência máxima",
    type: "PREMIUM",
    rarity: "LEGENDARY",
    image: xp,
    icon: "👑",
    xpReward: 3000,
    category: "1500 XP POINTS",
  },
  {
    id: "tier-18",
    tier: 18,
    name: "Common Mystery Box",
    description: "Caixa comum com recompensas básicas",
    type: "FREE",
    rarity: "COMMON",
    image: box,
    icon: "📦",
    category: "Mystery Box",
  },
  {
    id: "tier-19",
    tier: 19,
    name: "Rare Pirate Chest",
    description: "Baú pirata raro com tesouros especiais",
    type: "PREMIUM",
    rarity: "RARE",
    image: caixaPirata,
    icon: "⚓",
    category: "Mystery Box",
  },
  {
    id: "tier-20",
    tier: 20,
    name: "Epic XP Pack",
    description: "Pacote épico de experiência",
    type: "FREE",
    rarity: "EPIC",
    image: xp,
    icon: "🔥",
    xpReward: 1750,
    category: "1750 XP POINTS",
  },
];

// Funções utilitárias para trabalhar com battlePassItems
export const getItemByTier = (tier: number) => {
  return battlePassItems.find((item) => item.tier === tier);
};

export const getFreeItems = () => {
  return battlePassItems.filter((item) => item.type === "FREE");
};

export const getPremiumItems = () => {
  return battlePassItems.filter((item) => item.type === "PREMIUM");
};

export const getItemsByRarity = (
  rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY",
) => {
  return battlePassItems.filter((item) => item.rarity === rarity);
};

export const getItemsByCategory = (category: string) => {
  return battlePassItems.filter((item) => item.category === category);
};

export const getTotalItems = () => {
  return battlePassItems.length;
};

export const getMaxTier = () => {
  return Math.max(...battlePassItems.map((item) => item.tier));
};
