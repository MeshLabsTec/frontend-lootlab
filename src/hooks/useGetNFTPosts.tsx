"use client";
import PostService from "@/services/post.service";
import { useQuery } from "@tanstack/react-query";

function useGetNFTPosts(
  queryKey:
    | "getPostsGames"
    | "getPostsArtes"
    | "getPostsCrypto"
    | "getPostsAll",
) {
  const { data: posts, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      if (queryKey === "getPostsArtes") {
        return PostService.getPosts("NFT Artes");
      } else if (queryKey === "getPostsGames") {
        return PostService.getPosts("NFT Jogos");
      } else if (queryKey === "getPostsCrypto") {
        return PostService.getPosts("Crypto");
      } else if (queryKey === "getPostsAll") {
        return PostService.getPostsAll();
      }
    },
  });
  return { posts, isLoading };
}

export default useGetNFTPosts;
