"use client";
import NFTHeaderFilter from "@/components/Others/NFTHeaderFilter";
import NFTPostList from "@/components/Others/NFTPostList";
import useFilterPosts from "@/hooks/useFilterPosts";
import useGetNFTPosts from "@/hooks/useGetNFTPosts";
import { FaPaintBrush } from "react-icons/fa";

export function NFTArtesComponent() {
  const { isLoading, posts: postsArtes } = useGetNFTPosts("getPostsArtes");

  const filteredPosts = useFilterPosts(postsArtes);

  return (
    <div className="flex h-full w-full flex-col items-start gap-4 px-[5%]">
      <NFTHeaderFilter iconTitle={<FaPaintBrush />} title="NFT Arts" />
      <NFTPostList isLoading={isLoading} posts={filteredPosts} />
    </div>
  );
}
