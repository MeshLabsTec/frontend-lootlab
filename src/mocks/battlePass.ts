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
    };
    premium?: {
      type: "XP" | "BADGE" | "TITLE" | "AVATAR" | "EMOTE" | "SKIN";
      name: string;
      description: string;
      icon: string;
      rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
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
