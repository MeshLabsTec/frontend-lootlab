"use client";

import PostService from "@/services/post.service";
import Toast from "@/tools/toast.tool";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IPost } from "@/interfaces/interfaces";
import usePostStore from "@/stores/post.store";
import { useRouter } from "next/navigation";
import type { AxiosResponse } from "axios";

function useDeletePost() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { post } = usePostStore();
  const router = useRouter();

  const { mutateAsync: deletePostFn, status } = useMutation({
    mutationFn: PostService.deletePost,
    onSuccess(data) {
      const queryKey =
        post?.category === "NFT Jogos" ? "postsGames" : "postsArtes";

      // deleta o post no cache para nao precisar buscar novamente no banco os posts antigos.
      queryClient.setQueryData([queryKey], (oldData: IPost[]) => {
        return [...(oldData || []).filter(({ slug }) => slug !== post?.slug)];
      });
      if (data) {
        Toast.success((data as any).data.message);
      }
      router.push("/");
    },
    onError(error: AxiosResponse) {
      if (error.status === 404) {
        Toast.error("Post não encontrado.");
        return;
      }
      console.log("Erro ao deletar post.", error);
      Toast.error("Erro ao deletart post", 2000);
    },
  });

  const onDeletePost = (id?: string) => {
    if (session?.accessToken && session.user.role === "ADMIN" && id) {
      deletePostFn({ id, authorizationToken: session.accessToken });
    }
  };

  return { onDeletePost, status };
}

export default useDeletePost;
