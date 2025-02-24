"use client";
import { Form } from "@/components/Form";
import { CardContent } from "@/components/ui/card";
import { AccordionContent } from "@/components/ui/accordion";
import FieldListLinks from "./FieldListLinks";
import FieldListPartnership from "./FieldListPartnership";
import MarketCapAddresForm from "./MarketCapAddressForm";
import { useFormContext } from "react-hook-form";
import type { FormData } from "../schemas";
import AccordionManager from "../AccordionManager";

function LinksContent() {
  const {
    formState: { errors },
    watch,
  } = useFormContext<FormData>();
  return (
    <CardContent className="space-y-2">
      <Form.Label>
        <AccordionManager titleTrigger="Links" error={errors?.links?.message}>
          <AccordionContent>
            <FieldListLinks />
          </AccordionContent>
        </AccordionManager>
        <Form.ErrorMessage error={errors?.links?.message} />
      </Form.Label>
      <Form.Label>
        <AccordionManager
          titleTrigger="Parcerias"
          error={errors?.partnerships?.message}
        >
          <AccordionContent>
            <FieldListPartnership />
          </AccordionContent>
        </AccordionManager>
        <Form.ErrorMessage error={errors?.partnerships?.message} />
      </Form.Label>
      {watch("category") === "NFT Jogos" && (
        <Form.Label>
          <AccordionManager
            titleTrigger="MarketCap Adress"
            error={errors?.marketLink?.message}
          >
            <AccordionContent>
              <MarketCapAddresForm />
            </AccordionContent>
          </AccordionManager>
          <Form.ErrorMessage error={errors?.marketLink?.message} />
        </Form.Label>
      )}
    </CardContent>
  );
}

export default LinksContent;
