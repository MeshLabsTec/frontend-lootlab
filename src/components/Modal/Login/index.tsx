"use client";
import { Common } from "@/components/Common";
import { Form } from "@/components/Form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useLogin from "@/hooks/useLogin/useLogin";
import URLQuery from "@/tools/urlQuery";

import { useRouter, useSearchParams } from "next/navigation";

export function Login() {
  const {
    mutation: { mutate, status, data },
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
  } = useLogin();

  const searchParams = useSearchParams();
  const router = useRouter();
  const openModalLogin = searchParams.get("openModalLogin") as "true" | "false";

  return (
    <Dialog
      open={status === "pending" ? true : openModalLogin === "true"}
      onOpenChange={() => {
        router.push(
          URLQuery.addQuery([
            {
              key: "openModalLogin",
              value: openModalLogin !== "true",
            },
          ]),
        );
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="border-none bg-lootlab-bg-main sm:max-w-[425px]">
        <DialogHeader className="">
          <DialogTitle className="text-3xl text-white">Login</DialogTitle>
          <DialogDescription className="text-white/60">
            Digite os seus dados de acesso no campo abaixo.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((data) => mutate(data))}
          className="flex flex-col gap-4 text-white"
        >
          {data?.status === 401 && status !== "pending" && (
            <span className="text-xs text-red-500">
              E-mail ou senha incorretos.
            </span>
          )}
          <Form.Label title="E-mail">
            <Form.Input.FormInputGeneric
              register={register("email")}
              id="email"
              type="email"
              className="h-11 placeholder:text-white/60"
              placeholder="Digite seu e-mail"
              error={errors.email?.message}
            />
            <Form.ErrorMessage error={errors.email?.message} />
          </Form.Label>

          <Form.Label title="Password">
            <Form.Input.FormInputGeneric
              register={register("password")}
              type="password"
              id="password"
              className="h-11 placeholder:text-white/60"
              placeholder="Digite sua senha"
              error={errors.password?.message}
            />
            <Form.ErrorMessage error={errors.password?.message} />
          </Form.Label>

          <DialogFooter>
            <Button
              disabled={status === "pending"}
              type="submit"
              className="w-full bg-lootlab-color-highlight hover:bg-lootlab-hover-highlight"
            >
              <Common.CommonLoading
                isLoading={status === "pending"}
                title="Acessar"
              />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
