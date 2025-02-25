"use client";
import NFTHeaderFilter from "@/components/Others/NFTHeaderFilter";
import NFTPostList from "@/components/Others/NFTPostList";
import { IoGameControllerOutline } from "react-icons/io5";
import useFilterPosts from "@/hooks/useFilterPosts";
import useGetNFTPosts from "@/hooks/useGetNFTPosts";

export function NFTArtesComponent() {
  const { isLoading, posts: postsArtes } = useGetNFTPosts("getPostsArtes");

  const filteredPosts = useFilterPosts(postsArtes);

  return (
    <div className="flex h-full w-full flex-col items-start gap-4 px-[5%]">
      <NFTHeaderFilter
        iconTitle={<IoGameControllerOutline />}
        title="NFT Arts"
      />
      <NFTPostList isLoading={isLoading} posts={filteredPosts} />
    </div>
  );
}
