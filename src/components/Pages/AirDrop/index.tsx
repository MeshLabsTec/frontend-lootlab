"use client";
import NFTHeaderFilter from "@/components/Others/NFTHeaderFilter";
import NFTPostList from "@/components/Others/NFTPostList";
import useGetNFTPosts from "@/hooks/useGetNFTPosts";
import { GoContainer } from "react-icons/go";

export function AirDropComponent() {
  const { isLoading, posts: postsAll } = useGetNFTPosts("getPostsAll");

  const filterAirDrop = postsAll?.filter((post) => post.airDrop === true);

  return (
    <div className="flex h-full w-full flex-col items-start gap-4 px-[5%]">
      <NFTHeaderFilter iconTitle={<GoContainer />} title="AirDrop" />
      <NFTPostList isLoading={isLoading} posts={filterAirDrop} />
    </div>
  );
}
