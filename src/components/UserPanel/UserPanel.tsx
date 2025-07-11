"use client";

import { useSession, signOut } from "next-auth/react";
import { User, Settings, LogOut, Trophy, Star, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

interface UserPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserPanel({ isOpen, onClose }: UserPanelProps) {
  const { data: session } = useSession();
  const router = useRouter();

  // Mock data para demonstração - em produção viria da API
  const userData = {
    username: session?.user?.email?.split("@")[0] || "Usuário",
    level: 20,
    currentXP: 1500,
    nextLevelXP: 2000,
    rank: "Bronze",
    avatar: null, // Pode ser implementado futuramente
  };

  const progressPercentage = (userData.currentXP / userData.nextLevelXP) * 100;
  const xpUntilNext = userData.nextLevelXP - userData.currentXP;

  const menuItems = [
    {
      icon: User,
      label: "Perfil",
      action: () => {
        router.push("/profile");
        onClose();
      },
    },
    {
      icon: Trophy,
      label: "Conquistas",
      action: () => {
        console.log("Navegar para conquistas");
        onClose();
      },
    },
    {
      icon: Settings,
      label: "Configurações",
      action: () => {
        console.log("Navegar para configurações");
        onClose();
      },
    },
    {
      icon: LogOut,
      label: "Sair",
      action: () => {
        signOut({ callbackUrl: "/" });
        onClose();
      },
      variant: "destructive" as const,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={onClose}>
      <div
        className="absolute right-0 top-0 h-full w-80 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="h-full border-none bg-transparent">
          <CardContent className="p-0">
            {/* Header com informações do usuário */}
            <div className="relative p-6 pb-4">
              <div className="absolute inset-0 rounded-t-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20" />

              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">
                    Meu Perfil
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-white hover:bg-white/10"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                </div>

                {/* Avatar e informações básicas */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">
                      {userData.username}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <span>Level {userData.level}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{userData.rank}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Progresso</span>
                    <span className="text-gray-300">
                      {userData.currentXP} / {userData.nextLevelXP} XP
                    </span>
                  </div>
                  <Progress
                    value={progressPercentage}
                    className="h-2 bg-gray-700"
                  />
                  <p className="text-center text-xs text-gray-400">
                    {xpUntilNext} XP até o próximo nível
                  </p>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Menu Items */}
            <div className="space-y-2 p-4">
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant={item.variant || "ghost"}
                  className={`h-12 w-full justify-start gap-3 text-left ${
                    item.variant === "destructive"
                      ? "text-red-400 hover:bg-red-950/50 hover:text-red-300"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                  onClick={item.action}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Versão dropdown para desktop
export function UserPanelDropdown({ isOpen, onClose }: UserPanelProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const userData = {
    username: session?.user?.email?.split("@")[0] || "Usuário",
    level: 20,
    currentXP: 1500,
    nextLevelXP: 2000,
    rank: "Bronze",
  };

  const progressPercentage = (userData.currentXP / userData.nextLevelXP) * 100;
  const xpUntilNext = userData.nextLevelXP - userData.currentXP;

  const menuItems = [
    {
      icon: User,
      label: "Perfil",
      action: () => {
        router.push("/profile");
        onClose();
      },
    },
    {
      icon: Trophy,
      label: "Conquistas",
      action: () => {
        console.log("Navegar para conquistas");
        onClose();
      },
    },
    {
      icon: Settings,
      label: "Configurações",
      action: () => {
        console.log("Navegar para configurações");
        onClose();
      },
    },
    {
      icon: LogOut,
      label: "Sair",
      action: () => {
        signOut({ callbackUrl: "/" });
        onClose();
      },
      variant: "destructive" as const,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full z-50 mt-2 w-80">
      <Card className="border-slate-700 bg-slate-900 shadow-2xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="rounded-t-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">
                  {userData.username}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <span>Level {userData.level}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{userData.rank}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">XP</span>
                <span className="text-gray-300">
                  {userData.currentXP} / {userData.nextLevelXP}
                </span>
              </div>
              <Progress
                value={progressPercentage}
                className="h-1.5 bg-gray-700"
              />
              <p className="text-center text-xs text-gray-400">
                {xpUntilNext} XP até o próximo nível
              </p>
            </div>
          </div>

          <Separator className="bg-gray-700" />

          {/* Menu Items */}
          <div className="space-y-1 p-2">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`h-10 w-full justify-start gap-2 text-left ${
                  item.variant === "destructive"
                    ? "text-red-400 hover:bg-red-950/50 hover:text-red-300"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
                onClick={item.action}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm">{item.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
