import { LayoutPage } from "@/components/Layout";
import CarouselHeader from "@/components/Others/Carousels/CarouselHeader";
import SectionGames from "@/components/Others/SectionGames";
import SectionArtes from "@/components/SectionArtes";

export default function Home() {
  return (
    <LayoutPage className="gap-16">
      <div className="relative flex w-full justify-between">
        <CarouselHeader />
        <hr className="absolute bottom-0 left-0 h-[1px] w-full border-0 bg-lootlab-font-highlight opacity-40" />
      </div>

      <div className="flex w-full flex-col gap-6 px-[5%]">
        <SectionGames />
        <SectionArtes />
      </div>
    </LayoutPage>
  );
}
