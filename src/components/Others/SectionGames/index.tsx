"use client";
import PostService from "@/services/post.service";
import { useQuery } from "@tanstack/react-query";
import SectionLine from "../SectionLine";
import { FaGamepad } from "react-icons/fa";

export default function SectionGames() {
  const { data: postsGames, isLoading } = useQuery({
    queryKey: ["postsGames"],
    queryFn: async () => await PostService.getPosts("NFT Jogos"),
  });

  return (
    <SectionLine
      href="nft-jogos"
      iconTitle={<FaGamepad />}
      isLoading={isLoading}
      posts={postsGames}
      title="NFT Games"
    />
  );
}
