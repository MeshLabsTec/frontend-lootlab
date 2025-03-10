"use client";
import { Form } from "@/components/Form";
import { CardContent } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import type { FormData } from "../schemas";
import AccordionManager from "../AccordionManager";
import { AccordionContent } from "@/components/ui/accordion";
import type { IInfosCard } from "@/interfaces/interfaces";
import FieldListFeatures from "./FieldListFeatures";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddOtherNetworkSelect from "./FieldOthersNetwork/AddOtherNetworkSelect";

const detailsInfos: IInfosCard<FormData>[] = [
  { title: "Nota", pathRegister: "score", type: "number" },
  { title: "Investimento", pathRegister: "investment" },
  { title: "Token", pathRegister: "token" },
];

const statusOptions = [
  { value: "DRAFT", label: "Draft" },
  { value: "DEVELOPMENT", label: "Development" },
  { value: "LIVE", label: "Live" },
  { value: "ALPHA", label: "Alpha" },
  { value: "BETA", label: "Beta" },
  { value: "PRESALE", label: "Pre-Sale" },
  { value: "CANCELL", label: "Cancell" },
];

interface IDeatilsContent {
  action: "Publicar" | "Salvar";
}

function DeatilsContent({ action }: IDeatilsContent) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormData>();

  const selectedStatus = watch("status");

  return (
    <CardContent className="!space-y-4">
      <Form.Label>
        <AccordionManager
          titleTrigger="Features"
          error={errors.projectFeatures?.message}
        >
          <AccordionContent className="pb-3">
            <FieldListFeatures />
          </AccordionContent>
        </AccordionManager>
        <Form.ErrorMessage error={errors.projectFeatures?.message} />
      </Form.Label>
      <div>
        <Form.Label title="Status" htmlFor="status">
          <Select
            onValueChange={(
              value:
                | "DRAFT"
                | "DEVELOPMENT"
                | "LIVE"
                | "ALPHA"
                | "BETA"
                | "PRESALE"
                | "CANCELL",
            ) => setValue("status", value)}
            value={selectedStatus}
          >
            <SelectTrigger className="group w-full rounded-lg border-lootlab-font-highlight text-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="flex w-full items-center justify-between">
                <SelectValue
                  placeholder="Selecione um status"
                  className="text-gray-300"
                />
              </div>
            </SelectTrigger>
            <SelectContent className="w-full rounded-lg border-gray-700 bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg backdrop-blur-sm">
              <div className="px-1 py-1">
                {statusOptions.map(({ value, label }) => (
                  <SelectItem
                    key={value}
                    value={value}
                    className="my-1 cursor-pointer rounded-md text-gray-200 hover:bg-blue-900/40 hover:text-blue-300 focus:bg-blue-900/40 focus:text-blue-300"
                  >
                    {label}
                  </SelectItem>
                ))}
              </div>
            </SelectContent>
          </Select>
        </Form.Label>
      </div>

      {action === "Salvar" && (
        <div>
          <Form.Label title="Rede" htmlFor="Rede">
            <Form.Input.FormInputGeneric
              type="text"
              id="Rede"
              register={register("network")}
              error={errors.network?.message}
            />
          </Form.Label>
          <Form.ErrorMessage error={errors.network?.message} />
        </div>
      )}

      <AddOtherNetworkSelect />

      {detailsInfos.map(({ pathRegister, title, type }) => (
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
    </CardContent>
  );
}

export default DeatilsContent;
