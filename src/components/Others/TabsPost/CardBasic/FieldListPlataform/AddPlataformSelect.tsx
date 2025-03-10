"use client";
import { Button } from "@/components/ui/button";
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
import { X, Monitor, Smartphone, Gamepad2, Globe } from "lucide-react";
import type { FormData } from "../../schemas";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { AccordionContent } from "@/components/ui/accordion";
import AccordionManager from "../../AccordionManager";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const platformOptions = [
  "PC",
  "Mobile",
  "Console",
  "Web",
  "Windows",
  "Steam",
  "Epic Games",
  "Android",
  "iOS",
  "PlayStation",
  "Xbox",
  "Nintendo",
];

// Função para obter o ícone correspondente à plataforma
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

function AddPlataformSelect() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormData>();

  const selectedPlatforms = watch("platform") || [];

  useEffect(() => {
    if (!selectedPlatforms || !Array.isArray(selectedPlatforms)) {
      setValue("platform", []);
    }
  }, [setValue]);

  const handleTogglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setValue(
        "platform",
        selectedPlatforms.filter((p) => p !== platform),
      );
    } else {
      setValue("platform", [...selectedPlatforms, platform]);
    }
  };

  const handleRemovePlatform = (platformToRemove: string) => {
    setValue(
      "platform",
      selectedPlatforms.filter((platform) => platform !== platformToRemove),
    );
  };

  return (
    <div className="w-full overflow-hidden">
      <h2 className="mb-2">Plataformas</h2>
      <AccordionManager
        titleTrigger="Selecione as plataformas"
        error={errors.platform?.message}
      >
        <AccordionContent className="px-3 pb-3">
          <div className="grid grid-cols-2 gap-4">
            {platformOptions.map((platform) => (
              <div key={platform} className="flex items-center space-x-2">
                <Checkbox
                  id={`platform-${platform}`}
                  checked={selectedPlatforms.includes(platform)}
                  onCheckedChange={() => handleTogglePlatform(platform)}
                  className="border-lootlab-font-highlight"
                />
                <Label
                  htmlFor={`platform-${platform}`}
                  className="cursor-pointer text-gray-200"
                >
                  {platform}
                </Label>
              </div>
            ))}
          </div>
        </AccordionContent>

        <div className="mx-3 mb-3 flex w-full flex-wrap gap-2">
          {selectedPlatforms.length > 0 ? (
            <div className="w-full">
              <p className="mb-2 text-sm text-gray-400">
                Plataformas selecionadas:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedPlatforms.map((platform, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between gap-2"
                  >
                    <div className="flex h-fit w-fit items-center gap-2 rounded-full border-[1px] border-lootlab-font-highlight px-4">
                      <span className="flex items-center">
                        {getPlatformIcon(platform)}
                        {platform}
                      </span>
                      <Button
                        type="button"
                        variant="default"
                        onClick={() => handleRemovePlatform(platform)}
                        className="group h-fit border-none bg-inherit p-0 py-[6px] hover:bg-none"
                      >
                        <X className="stroke-[3px] text-sm text-lootlab-font-base group-hover:stroke-red-500 group-hover:stroke-[4px]" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              Nenhuma plataforma selecionada
            </p>
          )}
        </div>
      </AccordionManager>
    </div>
  );
}

export default AddPlataformSelect;
