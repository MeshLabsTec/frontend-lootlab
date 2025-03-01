"use client";
import classNames from "classnames";
import type { InputHTMLAttributes } from "react";

interface IFormInputImageProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  register: any;
  error?: string;
  imageName?: string;
}
function FormInputImage({
  register,
  error,
  className,
  imageName,
  ...props
}: IFormInputImageProps) {
  // Limite de caracteres para o nome do arquivo
  const MAX_LENGTH = 18;

  // Função para formatar o nome do arquivo
  const getFormattedImageName = (name?: string) => {
    if (name && name.length > MAX_LENGTH) {
      const extensionIndex = name.lastIndexOf(".");
      return `${name.substring(0, MAX_LENGTH)}..${name.substring(extensionIndex)}`.toLocaleLowerCase();
    }
    return name;
  };
  return (
    <div className="relative">
      <input
        {...register}
        {...props}
        type="file"
        accept=".jpg, .jpeg, .png, .gif, .webp"
        className="peer invisible absolute z-10 cursor-pointer"
      />
      <div
        className={classNames(
          className,
          "flex h-9 w-full cursor-pointer items-center justify-start gap-4 rounded-md border-[1px] border-lootlab-font-highlight px-3 py-1 text-base hover:bg-[#122136] md:text-sm",
          {
            "border-red-500": error,
          },
        )}
      >
        <span className="cursor-pointer text-nowrap font-medium">
          Escolher Arquivo
        </span>

        <span className="max-w-[70%] overflow-hidden text-ellipsis text-nowrap">
          {getFormattedImageName(imageName) || "Nenhum arquivo escolhido..."}
        </span>
      </div>
    </div>
  );
}

export default FormInputImage;
