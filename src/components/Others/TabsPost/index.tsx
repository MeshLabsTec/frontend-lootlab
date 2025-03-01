"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import CardBasic from "./CardBasic";
import FinancialCard from "./CardFinancial";
import LinksCard from "./CardLinks";
import {
  FormProvider,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import TabsTriggers from "./TabsTriggers";
import { useSearchParams } from "next/navigation";
import DetailsCard from "./CardDetails";
import React, { Suspense } from "react";
// import type { FormDataToUpdate } from "../TabsUpdatePost/Schema";

interface ITabsCreate<T extends FieldValues> {
  methods: UseFormReturn<T>;
  status: "idle" | "success" | "error" | "pending";
  onSubmit: (data: T) => Promise<void>;
  action: "Publicar" | "Salvar";
}

function TabsPost<T extends FieldValues>({
  methods,
  onSubmit,
  status,
  action = "Publicar",
}: ITabsCreate<T>) {
  const searchParams = useSearchParams();

  // Define a aba inicial com base nos parâmetros de busca ou padrão
  const activatedTab =
    (searchParams.get("activatedTab") as
      | "basic"
      | "financial"
      | "links"
      | "details") || "basic";

  return (
    <Suspense>
      <FormProvider {...methods}>
        <Tabs value={activatedTab} className="w-[95%] max-w-[400px]">
          <TabsTriggers />

          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <TabsContent value="basic">
              <CardBasic />
            </TabsContent>

            <TabsContent value="financial">
              <FinancialCard />
            </TabsContent>

            <TabsContent value="links">
              <LinksCard />
            </TabsContent>

            <TabsContent value="details">
              <DetailsCard action={action} status={status === "pending"} />
            </TabsContent>
          </form>
        </Tabs>
      </FormProvider>
    </Suspense>
  );
}

export default TabsPost;
