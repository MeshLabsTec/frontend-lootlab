"use client";
import NFTPostList from "@/components/Others/NFTPostList";
import useGetNFTPosts from "@/hooks/useGetNFTPosts";
import airdrop from "../../../../public/airdrop.png";
import Image from "next/image";

export function AirDropComponent() {
  const { isLoading, posts: postsAll } = useGetNFTPosts("getPostsAll");

  const filterAirDrop = postsAll?.filter((post) => post.airDrop === true);

  return (
    <div className="flex h-full w-full flex-col items-start gap-4 px-[5%]">
      <div className="flex items-center gap-2">
        <Image src={airdrop} alt="AirDrop" className="h-6 w-5" />
        <h1 className="text-2xl font-bold text-white">AirDrop</h1>
      </div>
      <NFTPostList isLoading={isLoading} posts={filterAirDrop} />
    </div>
  );
}
