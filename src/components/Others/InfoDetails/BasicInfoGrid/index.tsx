"use client";

import BasicInfo from "../BasicInfo";
import usePostStore from "@/stores/post.store";
import Tooltip from "@/components/Others/Tooltip";
import {
  FaSteam,
  FaWindows,
  FaPlaystation,
  FaApple,
  FaXbox,
} from "react-icons/fa";
import { IoLogoAndroid } from "react-icons/io";
import { SiEpicgames } from "react-icons/si";
import { BsNintendoSwitch } from "react-icons/bs";
import { Monitor, Smartphone, Gamepad2, Globe } from "lucide-react";

// Componente para exibir ícones de plataforma com tooltips
const PlatformIcons = ({ platforms }: { platforms: string[] }) => {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "PC":
        return <Monitor className="mr-1 h-4 w-4" />;
      case "Mobile":
        return <Smartphone className="mr-1 h-4 w-4" />;
      case "Console":
        return <Gamepad2 className="mr-1 h-4 w-4" />;
      case "Web":
        return <Globe className="mr-1 h-4 w-4" />;
      case "Windows":
        return <FaWindows className="mr-1 h-4 w-4" />;
      case "Steam":
        return <FaSteam className="mr-1 h-4 w-4" />;
      case "Epic Games":
        return <SiEpicgames className="mr-1 h-4 w-4" />;
      case "Android":
        return <IoLogoAndroid className="mr-1 h-4 w-4" />;
      case "iOS":
        return <FaApple className="mr-1 h-4 w-4" />;
      case "PlayStation":
        return <FaPlaystation className="mr-1 h-4 w-4" />;
      case "Xbox":
        return <FaXbox className="mr-1 h-4 w-4" />;
      case "Nintendo":
        return <BsNintendoSwitch className="mr-1 h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-2 flex flex-wrap gap-3">
      {platforms.map((platform, index) => (
        <Tooltip key={index} title={platform}>
          <div className="cursor-pointer text-white">
            {getPlatformIcon(platform)}
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default function BasicInfoGrid() {
  const { post } = usePostStore();

  return (
    <div className="row-span-2 flex h-full flex-col justify-center gap-6 md:col-span-1">
      <BasicInfo info={post?.title || ""} title="TITLE" />
      <BasicInfo info={post?.author.name || ""} title="AUTHOR" />
      <div className="grid grid-cols-2 gap-6">
        <BasicInfo title="SCORE" info={String(post?.score || "") || "0"} />
        <BasicInfo
          title="NETWORK"
          info={(() => {
            const network = post?.network || "";
            const networkSecondary = post?.network_secondary || [];

            if (
              !network &&
              (!networkSecondary || networkSecondary.length === 0)
            ) {
              return ["TBA"];
            }

            return [network, ...networkSecondary].filter(Boolean);
          })()}
          showAsIcon={true}
        />
        <BasicInfo title="INVESTMENT" info={post?.investment || "N/I"} />
        {post?.status !== "DRAFT" && (
          <BasicInfo
            title="STATUS"
            info={post?.status || "N/I"}
            truncate={true}
          />
        )}
        {post?.platform && post?.platform.length > 0 && (
          <div className="flex flex-col rounded-lg border border-[#1c2f4a] bg-[#132238] p-6">
            <h2 className="text-sm font-medium uppercase tracking-wider text-white/70">
              PLATFORMS
            </h2>
            <div className="mt-2">
              <PlatformIcons platforms={post.platform} />
            </div>
          </div>
        )}
        {post?.category === "NFT Jogos" && (
          <BasicInfo title="TOKEN" info={post?.token || "N/I"} />
        )}
      </div>
    </div>
  );
}
