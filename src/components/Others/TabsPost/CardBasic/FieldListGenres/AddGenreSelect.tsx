"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import URLQuery from "@/tools/urlQuery";
import type { UseFieldArrayAppend } from "react-hook-form";

const gameGenres = [
  "Adventure",
  "Action",
  "Battle Royale",
  "Beat 'em Up",
  "Racing",
  "Educational",
  "Sports",
  "Strategy",
  "FPS",
  "Survival Horror",
  "Idle",
  "Fighting",
  "MMO",
  "MOBA",
  "Metroidvania",
  "Music/Rhythm",
  "Party Game",
  "Platformer",
  "Puzzle",
  "RPG",
  "Augmented Reality",
  "Virtual Reality",
  "Roguelike",
  "Roguelite",
  "Sandbox",
  "Simulation",
  "Stealth",
  "Survival",
  "Horror",
  "Tycoon",
  "Visual Novel",
];

interface IAddGenreSelectProps {
  append: UseFieldArrayAppend<any, any>;
  fields: { name?: string; id: string }[];
}

function AddGenreSelect({ append, fields }: IAddGenreSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleAddGenre = () => {
    const selectedGenre = searchParams.get("selectedGenre");
    if (
      !fields.some((field) => field.name === selectedGenre) &&
      selectedGenre
    ) {
      append({ name: selectedGenre });
    }
  };

  return (
    <Select
      onValueChange={(value) =>
        router.push(URLQuery.addQuery([{ key: "selectedGenre", value }]))
      }
    >
      <SelectTrigger className="w-full rounded-lg border border-lootlab-font-highlight">
        <SelectValue placeholder="Selecione um Gênero" />
      </SelectTrigger>
      <Button
        type="button"
        variant="outline"
        onClick={handleAddGenre}
        className="border-lootlab-font-highlight bg-inherit scrollbar-thin scrollbar-track-lootlab-color-highlight hover:bg-[#111f33] hover:text-lootlab-font-base"
      >
        <PlusIcon className="stroke-[4px] text-lootlab-font-base" />
      </Button>
      <SelectContent className="max-h-56 w-full">
        <SelectGroup>
          <SelectLabel>Gêneros</SelectLabel>
          {gameGenres.map((genre) => (
            <SelectItem className="cursor-pointer" key={genre} value={genre}>
              {genre}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default AddGenreSelect;
