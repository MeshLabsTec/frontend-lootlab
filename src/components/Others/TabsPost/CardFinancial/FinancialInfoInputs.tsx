import type { IInfosCard } from "@/interfaces/interfaces";
import type { FormData, LaunchInfo } from "../schemas";
import { Form } from "@/components/Form";
import { NumericFormat } from "react-number-format";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";

const financialInfos: IInfosCard<LaunchInfo>[] = [
  { title: "Total suply", pathRegister: "totalSupply", type: "number" },
  { title: "Private Sale", pathRegister: "privateSale", type: "number" },
  { title: "Public Sale", pathRegister: "publicSale", type: "number" },
  { title: "Market Cap", pathRegister: "marketCap", type: "number" },
];
function FinancialInfoInputs() {
  const {
    formState: { errors },
    watch,
    setValue,
    register,
  } = useFormContext<FormData>();

  return (
    <>
      <Form.Label title="Current Supply">
        <Form.Input.FormInputGeneric
          register={register("launchInfo.currentSupply")}
          error={errors.launchInfo?.currentSupply?.message}
        />
        <Form.ErrorMessage error={errors.launchInfo?.currentSupply?.message} />
      </Form.Label>

      {financialInfos.map(({ pathRegister, title }) => {
        if (
          (pathRegister === "marketCap" || pathRegister === "totalSupply") &&
          watch("category") === "NFT Artes"
        ) {
          return null;
        }
        return (
          <Form.Label key={title} htmlFor={title} title={title}>
            <NumericFormat
              value={watch(`launchInfo.${pathRegister}`) as number}
              onValueChange={(value) =>
                setValue(
                  `launchInfo.${pathRegister}`,
                  (value.floatValue as string | number) || 0,
                )
              }
              decimalSeparator=","
              thousandSeparator="."
              decimalScale={2}
              className={classNames(
                "h-9 w-full rounded-md border-[1px] border-lootlab-font-highlight bg-inherit px-3 py-1 text-base md:text-sm",
                {
                  "border-red-500": errors.launchInfo?.[pathRegister]?.message,
                },
              )}
            />
            <Form.ErrorMessage
              error={errors.launchInfo?.[pathRegister]?.message}
            />
          </Form.Label>
        );
      })}
    </>
  );
}

export default FinancialInfoInputs;
