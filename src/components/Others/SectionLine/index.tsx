import type { IPost } from "@/interfaces/interfaces";
import Link from "next/link";
import GameList from "./GameList";
import { Common } from "@/components/Common";

interface ISectionLineProps {
  iconTitle: React.ReactNode;
  title: string;
  href: "nft-jogos" | "nft-artes";
  posts?: IPost[];
  isLoading: boolean;
}

function SectionLine({
  href,
  isLoading,
  iconTitle,
  title,
  posts,
}: ISectionLineProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-end gap-4 text-white">
          <Common.CommonTitleSection>
            {iconTitle} {title}
          </Common.CommonTitleSection>
          <span className="hidden text-white/60 md:block">
            {posts?.length ?? 0}{" "}
            {(posts?.length ?? 0) > 1 ? "Results" : "Result"}
          </span>
        </div>
        <Link
          href={`/${href}`}
          className="flex gap-1 text-white/60 transition-all hover:text-white"
        >
          <span className="hidden md:block">See </span>
          more
        </Link>
      </div>

      <GameList category={href} posts={posts || []} isLoading={isLoading} />
    </div>
  );
}

export default SectionLine;
