"use client";
import { CardContent } from "@/components/ui/card";
import type { IInfosCard } from "@/interfaces/interfaces";
import type { FormData } from "../schemas";
import { useFormContext } from "react-hook-form";
import { Form } from "@/components/Form";
import { Textarea } from "@/components/ui/textarea";
import classNames from "classnames";
import AccordionManager from "../AccordionManager";
import { AccordionContent } from "@/components/ui/accordion";
import FieldListGenres from "./FieldListGenres";
import FinancialDateLaunch from "./FinancialDateLaunch";
import CategoryRadio from "./CategoryRadio";
import AddPlataformSelect from "./FieldListPlataform/AddPlataformSelect";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const basicInfos: IInfosCard<FormData>[] = [
  { title: "Nome do Projeto", pathRegister: "title" },
];

function BasicContent() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    // getValues,
  } = useFormContext<FormData>();

  return (
    <CardContent className="space-y-2">
      {watch("category") === "NFT Jogos" && (
        <Form.Label>
          <AccordionManager
            titleTrigger="Gêneros"
            error={errors?.genres?.message}
          >
            <AccordionContent>
              <FieldListGenres />
            </AccordionContent>
          </AccordionManager>
          <Form.ErrorMessage error={errors?.genres?.message} />
        </Form.Label>
      )}
      <FinancialDateLaunch />
      {basicInfos.map(({ pathRegister, title, type }) => (
        <Form.Label title={title} htmlFor={title} key={title}>
          <Form.Input.FormInputGeneric
            type={type ?? "text"}
            id={title}
            register={register(pathRegister)}
            error={errors?.[pathRegister]?.message}
          />
          <Form.ErrorMessage error={errors?.[pathRegister]?.message} />
        </Form.Label>
      ))}

      <AddPlataformSelect />

      <Form.Label title="Imagem" htmlFor="file">
        <Form.Input.FormInputImage
          register={register("file")}
          id="file"
          error={errors?.file?.message}
          imageName={
            (watch("file") && watch("file").length && watch("file")[0].name) ||
            ""
          }
        />
        <Form.ErrorMessage error={errors?.file?.message} />
      </Form.Label>
      <Form.Label htmlFor="comment" title="Comentário">
        <Textarea
          className={classNames("min-h-24 overflow-hidden border", {
            "border-red-500": errors.commentAuthor?.message,
          })}
          id="comment"
          {...register("commentAuthor")}
        />
        <Form.ErrorMessage error={errors.commentAuthor?.message} />
      </Form.Label>

      <div className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="airDrop">AirDrop</Label>
          <p className="text-sm text-muted-foreground">
            Ative caso seu projeto tenha AirDrop disponível
          </p>
        </div>
        <Switch
          id="airDrop"
          checked={watch("airDrop")}
          onCheckedChange={(checked: boolean) => setValue("airDrop", checked)}
          className="data-[state=checked]:bg-[#172944]"
        />
      </div>

      <CategoryRadio />
    </CardContent>
  );
}

export default BasicContent;
