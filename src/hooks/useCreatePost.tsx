"use client";

import PostService from "@/services/post.service";
import Toast from "@/tools/toast.tool";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FormSchema,
  type FormData,
} from "@/components/Others/TabsPost/schemas";
import type { IPost } from "@/interfaces/interfaces";
import { generateSlug } from "@/tools/generateSlug";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function useCreatePost() {
  const methods = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "NFT Jogos",
    },
  });
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const { mutateAsync: createPostFn, status } = useMutation({
    mutationFn: PostService.createPost,
    onSuccess(data, variables) {
      if ((data as any)?.status === 201) {
        Toast.success("Post criado com sucesso", 2000);
        methods.reset();
      }
      const queryKey =
        JSON.parse(variables.data.postData).category === "NFT Jogos"
          ? "postsGames"
          : "postsArtes";
      // seta o novo post no cache para nao precisar buscar novamente no banco
      queryClient.setQueryData([queryKey], (oldData: IPost[]) => {
        const newPost = {
          ...JSON.parse(variables.data.postData),
          // corrigi o genres para ser um array de strings como recebido pela API
          genres:
            JSON.parse(variables.data.postData).genres.map(
              (genre: { name: string }) => genre.name,
            ) || [],
          images: [URL.createObjectURL(variables.data.file)],
          slug: generateSlug(JSON.parse(variables.data.postData).title),
        };

        console.log(newPost);

        return [newPost, ...(oldData || [])];
      });
    },
    onError(error) {
      const errorMessage =
        (error as any)?.response?.data?.message ||
        "Algo inesperado aconteceu, tente novamente mais tarde.";
      Toast.error(errorMessage);
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!session?.accessToken && !session?.user.id) {
      Toast.error("Você precisa estar logado para publicar um post.");
      return;
    }

    // Remove file de data antes para enviar separadamente para a API.
    const { file, ...postData } = data;

    await createPostFn({
      data: {
        postData: JSON.stringify(postData),
        file: file[0],
      },
      authorId: session?.user.id,
      authorizationToken: session?.accessToken,
    });
  };
  return { onSubmit, status, methods };
}

export default useCreatePost;
