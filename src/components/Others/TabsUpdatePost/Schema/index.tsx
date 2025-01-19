"use client";
import { z } from "zod";

// Esquema para validação de um Link
const LinkSchema = z.object({
  url: z.string().url("A URL do link é inválida").optional(),
});

// Esquema para validação de ProjectFeatures
const ProjectFeatureSchema = z.object({
  title: z.string().min(1, "O título da feature é obrigatório").optional(),
  isFeature: z.boolean().optional(),
});

// Esquema para validação de LaunchInfo
const LaunchInfoSchema = z.object({
  launchDate: z.date().optional(),
  marketCap: z
    .number()
    .min(0, "MarketCap deve ser um valor positivo")
    .optional(),
  currentSupply: z.string().optional(),
  totalSupply: z
    .number()
    .min(0, "TotalSupply deve ser um valor positivo")
    .optional(),
  privateSale: z
    .number()
    .min(0, "PrivateSale deve ser um valor positivo")
    .optional(),
  publicSale: z
    .number()
    .min(0, "PublicSale deve ser um valor positivo")
    .optional(),
});

// Esquema para validação de Partnership
const PartnershipSchema = z.object({
  type: z.string().min(1, "O tipo da parceria é obrigatório").optional(),
  link_url: z.string().url("A URL da parceria é inválida").optional(),
});

// Esquema principal para validação do Post
export const FormSchemaToUpdate = z.object({
  title: z.string().optional(),
  market_link: z.string().optional(),
  category: z.enum(["NFT Jogos", "NFT Artes"], {
    message: "Escolha uma categoria",
  }),
  score: z.coerce
    .number({ message: "Digite um número válido" })
    .nonnegative("O valor do Public Sale deve ser positivo")
    .optional(),
  investment: z.string().optional(),
  network: z.string().optional(),
  token: z.string().optional(),
  comment_author: z.string().optional(),
  file: z
    .instanceof(globalThis.FileList, { message: "Escolha um arquivo valido" })
    .refine((file) => (file.length ? file[0].size <= 5 * 1024 * 1024 : true), {
      message: "O arquivo deve ter no máximo 5MB.",
    })
    .refine(
      (file) =>
        file.length
          ? ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
              file[0].type,
            )
          : true,
      {
        message:
          "Apenas imagens nos formatos JPEG, PNG, GIF ou WEBP são permitidas",
      },
    )
    .optional(),
  links: z.array(LinkSchema).default([]).optional(),
  projectFeatures: z.array(ProjectFeatureSchema).optional(),
  launchInfo: LaunchInfoSchema.optional(),
  imagens: z.array(z.string()).optional(),
  genres: z.array(z.string()).optional(),
  partnerships: z.array(PartnershipSchema).default([]).optional(),
  postId: z.string(),
  oldImageUrl: z.string().optional(),
});

export type FormDataToUpdate = z.infer<typeof FormSchemaToUpdate>;
export type LaunchInfo = z.infer<typeof LaunchInfoSchema>;
