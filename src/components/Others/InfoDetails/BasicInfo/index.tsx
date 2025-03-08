import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import { staticIconUrls } from "@/components/Others/TabsPost/CardDetails/FieldOthersNetwork/getCoinIcons";
import Tooltip from "@/components/Others/Tooltip";

const cardVariants = cva(
  "rounded-lg border border-[#1c2f4a] bg-[#132238] p-6 flex flex-col",
  {
    variants: {
      size: {
        sm: "basis-40",
        default: "basis-auto",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface IProps extends VariantProps<typeof cardVariants> {
  title: string;
  info: string | number | string[] | undefined;
  showAsIcon?: boolean;
  truncate?: boolean;
}

export default function BasicInfo({
  info,
  title,
  size,
  showAsIcon = false,
  truncate = false,
}: IProps) {
  const renderContent = () => {
    if (showAsIcon && Array.isArray(info)) {
      return (
        <div className="mt-2 flex flex-wrap gap-2">
          {info.map((item, index) => {
            if (
              typeof item === "string" &&
              staticIconUrls &&
              item in staticIconUrls
            ) {
              return (
                <div key={index} className="group relative cursor-pointer">
                  <Image
                    src={staticIconUrls[item]}
                    alt={item}
                    width={24}
                    height={24}
                    className="inline-block"
                  />
                  <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {item}
                  </div>
                </div>
              );
            }
            return (
              <span key={index} className="text-xl font-semibold text-white">
                {item}
              </span>
            );
          })}
        </div>
      );
    }

    if (
      showAsIcon &&
      typeof info === "string" &&
      staticIconUrls &&
      info in staticIconUrls
    ) {
      return (
        <div className="group relative mt-2 cursor-pointer">
          <Image src={staticIconUrls[info]} alt={info} width={24} height={24} />
          <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {info}
          </div>
        </div>
      );
    }

    if (truncate && (typeof info === "string" || typeof info === "number")) {
      return (
        <Tooltip title={String(info)}>
          <div className="mt-2 cursor-pointer overflow-hidden truncate text-3xl font-semibold capitalize text-white">
            {info}
          </div>
        </Tooltip>
      );
    }

    return (
      <div className="mt-2 text-3xl font-semibold capitalize text-white">
        {info}
      </div>
    );
  };

  return (
    <div className={cardVariants({ size })}>
      <h2 className="text-sm font-medium uppercase tracking-wider text-white/70">
        {title}
      </h2>
      {renderContent()}
    </div>
  );
}
