"use client";
import PostService from "@/services/post.service";
import { useQuery } from "@tanstack/react-query";

function useGetNFTPosts(
  queryKey: "getPostsGames" | "getPostsArtes" | "getPostsCrypto",
) {
  const { data: posts, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      if (queryKey === "getPostsArtes") {
        return await PostService.getPosts("NFT Artes");
      } else if (queryKey === "getPostsGames") {
        return await PostService.getPosts("NFT Jogos");
      } else if (queryKey === "getPostsCrypto") {
        return await PostService.getPosts("Crypto");
      }
    },
  });
  return { posts, isLoading };
}

export default useGetNFTPosts;
