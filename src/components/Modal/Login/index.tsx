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

export function Login({
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
}) {
  const {
    mutation: { mutate, status, data },
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
  } = useLogin();

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
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
