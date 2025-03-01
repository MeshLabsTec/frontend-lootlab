import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchemaUpload = z.object({
  image: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: "O arquivo é obrigatório",
    })
    .refine(
      (files) =>
        ["image/jpeg", "image/png"].includes(files.item(0)?.type ?? ""),
      {
        message: "Formato inválido. Use JPG, PNG",
      },
    ),
});

export const formResolver = zodResolver(formSchemaUpload);
