"use client";
import PostService from "@/services/post.service";
import { useQuery } from "@tanstack/react-query";
import SectionLine from "../Others/SectionLine";
import { FaPaintBrush } from "react-icons/fa";

function SectionArtes() {
  const { data: postsArtes, isLoading: isLoadingArtes } = useQuery({
    queryKey: ["postsArtes"],
    queryFn: async () => await PostService.getPosts("NFT Artes"),
  });

  return (
    <SectionLine
      href="nft-artes"
      iconTitle={<FaPaintBrush />}
      isLoading={isLoadingArtes}
      title="NFT Arts"
      posts={postsArtes}
    />
  );
}

export default SectionArtes;
