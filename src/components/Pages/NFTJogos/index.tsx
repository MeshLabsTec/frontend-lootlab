"use client";
import NFTHeaderFilter from "@/components/Others/NFTHeaderFilter";
import NFTPostList from "@/components/Others/NFTPostList";
import useFilterPosts from "@/hooks/useFilterPosts";
import useGetNFTPosts from "@/hooks/useGetNFTPosts";
import { FaGamepad } from "react-icons/fa";

export function NFTJogosComponent() {
  const { isLoading, posts: postsGames } = useGetNFTPosts("getPostsGames");

  const filteredPosts = useFilterPosts(postsGames);

  return (
    <div className="flex h-full w-full flex-col items-start gap-4 px-[5%]">
      <NFTHeaderFilter iconTitle={<FaGamepad />} title="NFT Games" />
      <NFTPostList isLoading={isLoading} posts={filteredPosts} />
    </div>
  );
}
