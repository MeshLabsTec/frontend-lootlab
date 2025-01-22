"use client";
import { useFormContext } from "react-hook-form";
import type { FormData } from "../schemas";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { IPostCategories } from "@/interfaces/interfaces";
import { Form } from "@/components/Form";
const postCategories: IPostCategories[] = [
  { category: "NFT Jogos" },
  { category: "NFT Artes" },
  { category: "Crypto" },
];

function CategoryRadio() {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<FormData>();
  return (
    <FormField
      control={control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-normal text-lootlab-font-base">
            Category
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                setValue("genres", []);
              }}
              value={field.value}
              className="flex flex-col justify-center gap-2"
            >
              <div className="flex gap-4">
                {postCategories.map(({ category }) => (
                  <FormItem key={category}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <RadioGroupItem
                        className="h-4 w-4 rounded-full border-inherit"
                        value={category}
                        id={category}
                      />
                      <label
                        htmlFor={category}
                        className="cursor-pointer text-base text-lootlab-font-base"
                      >
                        {category}
                      </label>
                    </div>
                  </FormItem>
                ))}
              </div>
              <Form.ErrorMessage error={errors.category?.message} />
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export default CategoryRadio;
