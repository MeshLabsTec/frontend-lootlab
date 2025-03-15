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
  currentSupply: z.string().optional().default(""),
  marketCap: z.coerce.number().optional().default(0),
  totalSupply: z.coerce.number().optional().default(0),
  privateSale: z.coerce.number().optional().default(0),
  publicSale: z.coerce.number().optional().default(0),
});

// Esquema para validação de Partnership
const PartnershipSchema = z.object({
  type: z.string().optional().default(""),
  link_url: z.string().url("A URL da parceria é inválida").optional(),
});

// Esquema principal para validação do Post.
export const FormSchemaToUpdate = z.object({
  title: z.string().optional(),
  marketLink: z.string().optional(),
  category: z.enum(["NFT Jogos", "NFT Artes", "Crypto"], {
    message: "Escolha uma categoria",
  }),
  score: z.coerce
    .number({ message: "Digite um número válido" })
    .nonnegative("O valor do Public Sale deve ser positivo")
    .optional(),
  investment: z.string().optional(),
  network: z.string().optional(),
  network_secondary: z.array(z.string()).optional(),
  token: z.string().optional(),
  commentAuthor: z.string().optional(),
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
  airDrop: z.boolean().optional(),
  launchInfo: LaunchInfoSchema.optional(),
  images: z.array(z.string()).optional(),
  genres: z
    .array(
      z.object({
        name: z.string().optional(),
      }),
    )
    .optional(),
  partnerships: z.array(PartnershipSchema).default([]).optional(),
  postId: z.string(),
  oldImageUrl: z.string().optional(),
  status: z
    .enum(
      ["DRAFT", "DEVELOPMENT", "LIVE", "ALPHA", "BETA", "PRESALE", "CANCELL"],
      {
        message: "O status é inválido",
      },
    )
    .optional(),
  platform: z.array(z.string()).optional(),
});

export type FormDataToUpdate = z.infer<typeof FormSchemaToUpdate>;
export type LaunchInfo = z.infer<typeof LaunchInfoSchema>;
