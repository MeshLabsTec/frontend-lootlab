"use client";
import CardGames from "../../CardPost";
import CarouselPosts from "../../Carousels/Carousel";
import SkeletonPost from "@/components/Skeletons/SkeletonPost";
import type { IPost } from "@/interfaces/interfaces";

interface IProps {
  posts: IPost[];
  isLoading: boolean;
  category: "nft-jogos" | "nft-artes" | "crypto";
}

function GameList({ category, posts, isLoading }: IProps) {
  if (!posts?.length && !isLoading) {
    return (
      <div className="relative mx-auto flex h-48 w-full items-center justify-center">
        <h1 className="text-3xl font-thin text-lootlab-font-highlight">
          {category === "nft-artes" && "No art found."}
          {category === "nft-jogos" && "No game found."}
        </h1>
      </div>
    );
  }

  return (
    <>
      <CarouselPosts>
        {!isLoading &&
          posts &&
          posts.map((game, index) => (
            <CardGames key={game.title + index} post={game} />
          ))}
        {isLoading &&
          Array.from({ length: 10 }, (_, index) => index).map((index) => (
            <SkeletonPost key={index} />
          ))}
      </CarouselPosts>
    </>
  );
}

export default GameList;
