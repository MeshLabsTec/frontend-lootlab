"use client";
import PostService from "@/services/post.service";
import { useQuery } from "@tanstack/react-query";
import { IoGameControllerOutline } from "react-icons/io5";
import SectionLine from "../SectionLine";

export default function SectionGames() {
  const { data: postsGames, isLoading } = useQuery({
    queryKey: ["postsGames"],
    queryFn: async () => await PostService.getPosts("NFT Jogos"),
  });

  return (
    <SectionLine
      href="nft-jogos"
      iconTitle={<IoGameControllerOutline />}
      isLoading={isLoading}
      posts={postsGames}
      title="NFT Jogos"
    />
  );
}
