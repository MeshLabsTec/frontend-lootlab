import type { IPost } from "@/interfaces/interfaces";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CardPostProps {
  post: IPost;
  className?: string;
}

export default function CardPost({ post, className }: CardPostProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const displayedGenres = post.genres.slice(0, 3);
  const remainingGenres = post.genres.slice(3);
  const hasMoreGenres = remainingGenres.length > 0;
<<<<<<< HEAD
=======

>>>>>>> 079aa414eb158e577a958f452e292639909ac5b4
  return (
    <div className={cn("embla__slide mt-6 flex-[0_0_auto]", className)}>
      <Link
        href={`/details/${post.slug}`}
        className="group relative flex h-[360px] w-[250px] flex-col overflow-hidden rounded-xl bg-slate-800/40 transition-all duration-500 ease-out hover:bg-slate-700/40 md:hover:-translate-y-2"
        aria-label={`View details for ${post.title}`}
      >
        {/* Overlay de brilho */}
        <div
          className="absolute inset-0 z-0 hidden bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 md:block"
          style={{
            transform: "translateX(-100%)",
            animation: "shine 2s infinite",
          }}
        />

        {/* Container da imagem com gradiente */}
        <div className="relative h-[280px] w-full overflow-hidden">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-slate-800/90" />
          <Image
            src={post.images[0]}
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

          {/* Título sobreposto na imagem */}
          <div className="absolute bottom-0 z-20 w-full p-4">
            <h3 className="w-full truncate text-lg font-bold text-white transition-colors duration-300 group-hover:text-white/90">
              {post.title}
            </h3>
          </div>
        </div>

        {/* Container dos gêneros */}
        <div className="flex h-[80px] w-full items-center gap-2 p-4">
          <div className="flex flex-wrap gap-2">
            {displayedGenres.map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white/90 transition-all duration-300 group-hover:bg-white/15"
              >
                {genre}
              </span>
            ))}

            {hasMoreGenres && (
              <div className="group/tooltip relative">
                <button
                  type="button"
                  className="flex h-7 items-center justify-center rounded-full bg-white/10 px-3 text-sm font-medium text-white/90 transition-all duration-300 hover:bg-white/15"
                  aria-label={`Show ${remainingGenres.length} more genres`}
                >
                  +{remainingGenres.length}
                </button>

                <div className="invisible absolute bottom-full left-1/2 z-30 mb-2 min-w-32 -translate-x-1/2 translate-y-1 rounded-lg bg-slate-700 opacity-0 shadow-xl transition-all duration-300 group-hover/tooltip:visible group-hover/tooltip:translate-y-0 group-hover/tooltip:opacity-100">
                  <div className="flex flex-col gap-1 p-2">
                    {remainingGenres.map((genre) => (
                      <span
                        key={genre}
                        className="whitespace-nowrap text-sm text-white/90"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
