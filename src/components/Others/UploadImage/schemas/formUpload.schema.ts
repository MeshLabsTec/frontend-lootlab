import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchemaUpload = z.object({
  image: z
    .custom<FileList>((val) => val instanceof FileList, {
      message: "Arquivo inválido",
    })
    .refine((files) => files && files.length > 0, {
      message: "O arquivo é obrigatório",
    })
    .refine(
      (files) =>
        files &&
        ["image/jpeg", "image/png"].includes(files.item(0)?.type ?? ""),
      {
        message: "Formato inválido. Use JPG ou PNG",
      },
    ),
});

export const formResolver = zodResolver(formSchemaUpload);
