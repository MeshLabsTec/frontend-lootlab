"use client";

import PostService from "@/services/post.service";
import Toast from "@/tools/toast.tool";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IPost } from "@/interfaces/interfaces";
import { generateSlug } from "@/tools/generateSlug";
import {
  FormSchemaToUpdate,
  type FormDataToUpdate,
} from "@/components/Others/TabsUpdatePost/Schema";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transformPostToSchema } from "@/tools/tranformPostToSchema";
import usePostStore from "@/stores/post.store";

interface UseUpdatePostReturn {
  onSubmit: (data: FormDataToUpdate) => Promise<void>;
  status: "idle" | "success" | "error" | "pending";
  methods: UseFormReturn<FormDataToUpdate>;
}

function useUpdatePost(): UseUpdatePostReturn {
  const { post } = usePostStore();
  const methods = useForm<FormDataToUpdate>({
    resolver: zodResolver(FormSchemaToUpdate),
    defaultValues: {
      ...(post ? transformPostToSchema(post) : {}),
    },
  });

  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const { mutateAsync: updatePostFn, status } = useMutation({
    mutationFn: PostService.updatePost,
    onSuccess(data, variables) {
      const queryKey =
        JSON.parse(variables.data.postData || "{category: ''}").category ===
        "NFT Jogos"
          ? "postsGames"
          : "postArtes";

      // seta o novo post no cache para nao precisar buscar novamente no banco
      queryClient.setQueryData([queryKey], (oldData: IPost[] | undefined) => {
        const newPost = {
          id: variables.postId,
          ...JSON.parse(variables.data.postData || ""),
          Image: [
            {
              url: variables.data.file
                ? URL.createObjectURL(variables.data.file)
                : variables.imageUrl,
            },
          ],
          slug: generateSlug(
            JSON.parse(variables.data.postData || "{ title: '' }").title,
          ),
        };

        // Adiciona verificação se oldData existe
        if (!oldData) return [newPost];

        console.log("oldDataUpdate", oldData);

        return [newPost, ...oldData.filter(({ id }) => id !== post?.id)];
      });

      if (data?.status === 200) {
        methods.reset();
        return Toast.success("Post editado com sucesso", 2000);
      }
    },
    onError(error) {
      console.log(
        "Algo inesperado aconteceu, tente novamente mais tarde.",
        error.message,
      );
      Toast.error(
        "Algo inesperado aconteceu, tente novamente mais tarde.",
        2000,
      );
    },
  });

  const onSubmit = async (data: FormDataToUpdate) => {
    if (!session?.accessToken && !session?.user.id) {
      Toast.error("Você precisa estar logado para publicar um post.");
      return;
    }

    // Remove file de data antes para enviar separadamente para a API.
    const { file, oldImageUrl, postId, ...postData } = data;

    await updatePostFn({
      data: {
        postData: JSON.stringify(postData),
        file: file ? file[0] : new DataTransfer().files[0],
      },
      imageUrl: oldImageUrl,
      postId,
      authorId: session?.user.id,
      authorizationToken: session?.accessToken,
    });
  };
  return { onSubmit, status, methods };
}

export default useUpdatePost;
