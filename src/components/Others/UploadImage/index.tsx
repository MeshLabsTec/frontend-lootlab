"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Toast from "@/tools/toast.tool";
import { useSession } from "next-auth/react";
import { queryClient } from "@/lib/react-query";
import CarouselService from "@/services/carouse.service";
import { formResolver } from "./schemas/formUpload.schema";

interface FormData {
  image: FileList;
}

export default function UploadImageComponent() {
  const [preview, setPreview] = useState<string | null>(null);
  const { data: session } = useSession();
  const token = session?.accessToken;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: formResolver,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (file: File) => {
      return CarouselService.uploadCarousel(file, token!);
    },
    onSuccess: async () => {
      setPreview(null);
      reset();
      await queryClient.invalidateQueries({ queryKey: ["carousel"] });
      Toast.success("Imagem enviada com sucesso!");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Erro ao enviar imagem para o carrossel.";

      Toast.error(errorMessage);
    },
  });

  const onSubmit = (data: FormData) => {
    const file = data.image?.[0];
    if (file) {
      mutate(file);
    }
  };

  const selectedFiles = watch("image");

  useEffect(() => {
    if (!selectedFiles?.length) return;

    const file = selectedFiles[0];
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFiles]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full items-center justify-center p-4"
    >
      <div className="w-full max-w-lg space-y-6 rounded-xl bg-gray-800 p-8 shadow-lg">
        <h2 className="text-center text-3xl font-bold text-white">
          Upload de Imagem
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Selecione a imagem
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-500"
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white transition duration-150 ease-in-out hover:bg-indigo-500 disabled:opacity-50"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Enviando...</span>
            </div>
          ) : (
            "Enviar Imagem"
          )}
        </button>

        {preview && (
          <div>
            <h3 className="mb-2 text-lg font-medium text-gray-300">
              Pré-visualização
            </h3>
            <div className="overflow-hidden rounded-md shadow-md">
              <img
                src={preview}
                alt="Preview da imagem"
                className="w-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
