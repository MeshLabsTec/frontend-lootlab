"use client";
import { queryClient } from "@/lib/react-query";
import CarouselService from "@/services/carouse.service";
import Toast from "@/tools/toast.tool";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";

export default function ListImagens() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const { data } = useQuery({
    queryKey: ["carousel"],
    queryFn: async () => await CarouselService.getCarousel(),
  });

  async function deleteByIdCousel(id: string) {
    try {
      await CarouselService.deleteByIdCarousel(id, token!);
      await queryClient.invalidateQueries({ queryKey: ["carousel"] });
      Toast.success("Imagem deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar imagem do carrossel:", error);
      Toast.error("Erro ao deletar imagem do carrossel");
    }
  }

  return (
    <div className="w-[75%] p-6">
      <div className="mx-auto">
        <h1 className="mb-8 text-center text-3xl font-bold text-white">
          Imagens do Carrossel
        </h1>

        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((image: any) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800 shadow-lg"
              >
                <div className="relative w-full">
                  <Image
                    src={image.path}
                    alt={`Imagem do carrossel ${image.id}`}
                    layout="responsive"
                    width={1920}
                    height={600}
                    objectFit="contain"
                    className="rounded-t-xl"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition duration-300 group-hover:bg-opacity-60">
                    <button
                      onClick={() => deleteByIdCousel(image.id)}
                      className="rounded-full bg-red-600 p-2 text-white opacity-0 transition duration-300 group-hover:opacity-100 hover:bg-red-700"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-400">Dimensões: 1920x600</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-700">
            <p className="text-lg text-gray-400">
              Nenhuma imagem encontrada no carrossel
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
