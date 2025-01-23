import { z } from "zod";

const LinkSchema = z.object({
  url: z.string().url("URL inválida").optional(),
});

const ProjectFeatureSchema = z.object({
  title: z.string().optional(),
  isFeature: z.boolean().optional(),
});

const LaunchInfoSchema = z.object({
  launchDate: z.date({ message: "A data do Launch é obrigatória" }),
  currentSupply: z.string().optional(),
  marketCap: z.coerce.number().optional(),
  totalSupply: z.coerce.number().optional(),
  privateSale: z.coerce.number().optional(),
  publicSale: z.coerce.number().optional(),
});

const PartnershipSchema = z.object({
  type: z.string().optional(),
  link_url: z.string().url("URL da parceria inválida").optional(),
});

export const FormSchema = z.object({
  title: z.string().min(1, "O Nome do Jogo é obrigatório"),
  category: z.enum(["NFT Jogos", "NFT Artes", "Crypto"], {
    message: "Escolha uma categoria",
  }),
  score: z.coerce
    .number({ message: "Digite um número válido" })
    .nonnegative("O valor do Public Sale deve ser positivo")
    .optional(),
  investment: z.string().optional(),
  network: z.string().optional(),
  token: z.string().optional(),
  comment_author: z.string().min(1, "O comentário do autor é obrigatório"),
  file: z
    .instanceof(globalThis.FileList, { message: "Escolha um arquivo valido" })
    .refine((file) => file.length, {
      message: "Escolha um arquivo.",
    })
    .refine((file) => file.length && file[0].size <= 5 * 1024 * 1024, {
      message: "O arquivo deve ter no máximo 5MB.",
    })
    .refine(
      (file) =>
        file.length &&
        ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
          file[0].type,
        ),
      {
        message:
          "Apenas imagens nos formatos JPEG, PNG, GIF ou WEBP são permitidas",
      },
    ),
  market_link: z.string().url("URL de mercado inválida").optional(),
  authorId: z.string().optional(),

  // Arrays e objetos opcionais
  genres: z
    .array(
      z.object({
        name: z.string().optional(),
      }),
    )
    .optional(),
  links: z.array(LinkSchema).optional(),
  projectFeatures: z.array(ProjectFeatureSchema).optional(),
  launchInfo: LaunchInfoSchema.optional(),
  partnerships: z.array(PartnershipSchema).optional(),
});

export type FormData = z.infer<typeof FormSchema>;
export type LaunchInfo = z.infer<typeof LaunchInfoSchema>;
