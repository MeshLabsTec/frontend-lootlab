import type { IPost } from "@/interfaces/interfaces";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import imagemPlaceholder from "@/images/imagem-placeholder.webp";
import airDrop from "../../../../public/airdrop.png";

interface CardPostProps {
  post: IPost;
  className?: string;
}

export default function CardPost({ post, className }: CardPostProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const hasGenres = post.genres && post.genres.length > 0;
  const displayedGenres = hasGenres ? post.genres.slice(0, 3) : [];

  return (
    <div className={cn("embla__slide mt-8 flex-[0_0_auto]", className)}>
      <Link
        href={`/details/${post.slug}`}
        className="group relative flex h-[360px] w-[250px] flex-col overflow-hidden rounded-xl bg-slate-800/40 transition-all duration-500 ease-out hover:bg-slate-700/40 md:hover:-translate-y-2"
        aria-label={`View details for ${post.title}`}
      >
        {/* Badge de Airdrop */}
        {post.airDrop && (
          <div className="absolute right-0 top-0 z-20">
            <div className="flex items-center gap-1 rounded-bl-lg bg-gradient-to-r from-purple-600 to-pink-600 px-2.5 py-1.5 shadow-lg">
              <div className="relative">
                <Image src={airDrop} alt="Airdrop" className="h-4 w-3" />
                <div className="absolute -inset-0.5 animate-ping rounded-full bg-purple-400 opacity-20"></div>
              </div>
              <span className="text-xs font-bold text-white">Airdrop</span>
            </div>
          </div>
        )}

        {/* Overlay de brilho */}
        <div
          className={cn(
            "absolute inset-0 z-0 hidden bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 md:block",
            post.airDrop && "via-purple-500/5",
          )}
          style={{
            transform: "translateX(-100%)",
            animation: "shine 2s infinite",
          }}
        />

        {/* Container da imagem com gradiente */}
        <div className="relative h-[280px] w-full overflow-hidden">
          <div
            className={cn(
              "absolute inset-0 z-10",
              post.airDrop
                ? "bg-gradient-to-tr from-transparent via-purple-900/20 to-purple-900/90"
                : "bg-gradient-to-b from-transparent via-transparent to-slate-800/90",
            )}
          />
          <Image
            src={post.images[0] || imagemPlaceholder}
            alt={`Cover image for ${post.title}`}
            fill
            sizes="280px"
            className={cn(
              "object-cover transition-all duration-700 ease-out group-hover:scale-110",
              isImageLoading ? "blur-sm" : "blur-0",
            )}
            onLoadingComplete={() => setIsImageLoading(false)}
            priority={false}
          />
        </div>

        {/* Área de conteúdo (título e gêneros) */}
        <div className="group/content flex h-[80px] w-full flex-col justify-start gap-2 p-4">
          <h3
            className={cn(
              "line-clamp-2 w-full text-sm font-bold",
              post.airDrop
                ? "text-purple-100 group-hover:text-white"
                : "text-white group-hover:text-white/90",
            )}
          >
            {post.title}
          </h3>

          {hasGenres && (
            <div className="relative flex flex-wrap gap-1">
              {displayedGenres.map(
                (genre, index) =>
                  index < 2 && (
                    <span
                      key={genre}
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium transition-all duration-300",
                        post.airDrop
                          ? "bg-purple-500/20 text-purple-100 group-hover:bg-purple-500/30"
                          : "bg-white/10 text-white/90 group-hover:bg-white/15",
                      )}
                    >
                      {genre}
                    </span>
                  ),
              )}

              {post.genres.length > 2 && (
                <div className="group/tooltip relative">
                  <button
                    type="button"
                    className="flex h-5 items-center justify-center rounded-full bg-white/10 px-2 text-xs font-medium text-white/90 transition-all duration-300 hover:bg-white/15"
                    aria-label={`Show ${post.genres.length - 2} more genres`}
                  >
                    +{post.genres.length - 2}
                  </button>

                  {/* Tooltip melhorado */}
                  <div className="invisible absolute -right-2 bottom-full z-30 mb-2 rounded-lg bg-slate-700 opacity-0 shadow-xl transition-all duration-300 group-hover/tooltip:visible group-hover/tooltip:translate-y-0 group-hover/tooltip:opacity-100">
                    <div className="flex flex-col gap-1 p-2">
                      {post.genres.slice(2).map((genre) => (
                        <span
                          key={genre}
                          className="whitespace-nowrap text-xs text-white/90"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    {/* Seta do tooltip */}
                    <div className="absolute -bottom-1 right-3 h-2 w-2 rotate-45 bg-slate-700" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tooltip para título completo */}
          <div className="invisible absolute bottom-full left-0 z-30 mb-2 w-full max-w-[250px] rounded-lg bg-slate-700 opacity-0 shadow-xl transition-all duration-300 group-hover/content:visible group-hover/content:translate-y-0 group-hover/content:opacity-100">
            <div className="p-2">
              <p className="text-sm text-white/90">{post.title}</p>
            </div>
            <div className="absolute -bottom-1 left-4 h-2 w-2 rotate-45 bg-slate-700" />
          </div>
        </div>
      </Link>
    </div>
  );
}
