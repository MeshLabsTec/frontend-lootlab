"use client";
import NFTHeaderFilter from "@/components/Others/NFTHeaderFilter";
import NFTPostList from "@/components/Others/NFTPostList";
import useFilterPosts from "@/hooks/useFilterPosts";
import useGetNFTPosts from "@/hooks/useGetNFTPosts";
import { FaBitcoin } from "react-icons/fa";

export function CryptoComponent() {
  const { isLoading, posts: postsArtes } = useGetNFTPosts("getPostsCrypto");

  const filteredPosts = useFilterPosts(postsArtes);

  return (
    <div className="flex h-full w-full flex-col items-start gap-4 px-[5%]">
      <NFTHeaderFilter iconTitle={<FaBitcoin />} title="Crypto" />
      <NFTPostList isLoading={isLoading} posts={filteredPosts} />
    </div>
  );
}
