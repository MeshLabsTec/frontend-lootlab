"use client";
import NFTHeaderFilter from "@/components/Others/NFTHeaderFilter";
import NFTPostList from "@/components/Others/NFTPostList";
import { IoGameControllerOutline } from "react-icons/io5";
import useFilterPosts from "@/hooks/useFilterPosts";
import useGetNFTPosts from "@/hooks/useGetNFTPosts";

export function NFTJogosComponent() {
  const { isLoading, posts: postsGames } = useGetNFTPosts("getPostsGames");

  const filteredPosts = useFilterPosts(postsGames);

  return (
    <div className="flex h-full w-full flex-col items-start gap-4 px-[5%]">
      <NFTHeaderFilter
        iconTitle={<IoGameControllerOutline />}
        title="NFT Games"
      />
      <NFTPostList isLoading={isLoading} posts={filteredPosts} />
    </div>
  );
}
