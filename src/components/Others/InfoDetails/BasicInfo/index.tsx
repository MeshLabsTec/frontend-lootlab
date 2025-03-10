import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import { staticIconUrls } from "@/components/Others/TabsPost/CardDetails/FieldOthersNetwork/getCoinIcons";
import Tooltip from "@/components/Others/Tooltip";
import { useMemo } from "react";

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
  info: any;
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
  const iconExists = (str: string): boolean => {
    if (!staticIconUrls) return false;
    if (!str) return false;

    if (str.toUpperCase() in staticIconUrls) return true;

    return Object.keys(staticIconUrls).some(
      (key) =>
        key.includes(str.toUpperCase()) || str.toUpperCase().includes(key),
    );
  };

  const getIconUrl = (str: string): string | null => {
    if (!staticIconUrls || !str) return null;

    if (str.toUpperCase() in staticIconUrls) {
      const iconSource = staticIconUrls[str.toUpperCase()];
      return typeof iconSource === "object" && "url" in iconSource
        ? iconSource.url
        : (iconSource as string);
    }

    const matchingKey = Object.keys(staticIconUrls).find(
      (key) =>
        key.includes(str.toUpperCase()) || str.toUpperCase().includes(key),
    );

    if (!matchingKey) return null;

    const iconSource = staticIconUrls[matchingKey];
    return typeof iconSource === "object" && "url" in iconSource
      ? iconSource.url
      : (iconSource as string);
  };

  const getUniqueIcons = (items: any[]): any[] => {
    if (!Array.isArray(items)) return items;

    const uniqueItems: any[] = [];
    const iconUrls = new Set<string>();

    items.forEach((item) => {
      if (typeof item === "string" && iconExists(item)) {
        const iconUrl = getIconUrl(item);

        if (iconUrl && !iconUrls.has(iconUrl)) {
          iconUrls.add(iconUrl);
          uniqueItems.push(item);
        }
      } else {
        uniqueItems.push(item);
      }
    });

    return uniqueItems;
  };

  const uniqueInfo = useMemo(() => {
    if (showAsIcon && Array.isArray(info)) {
      return getUniqueIcons(info);
    }
    return info;
  }, [info, showAsIcon]);

  const renderContent = () => {
    if (showAsIcon && Array.isArray(uniqueInfo)) {
      return (
        <div className="mt-2 flex flex-wrap gap-2">
          {uniqueInfo.map((item, index) => {
            if (typeof item === "string" && iconExists(item)) {
              const iconUrl = getIconUrl(item);
              if (iconUrl) {
                return (
                  <div key={index} className="group relative cursor-pointer">
                    <Image
                      src={iconUrl}
                      alt={item}
                      width={24}
                      height={24}
                      className="inline-block"
                    />
                    <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {item.toUpperCase()}
                    </div>
                  </div>
                );
              }
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
      typeof uniqueInfo === "string" &&
      iconExists(uniqueInfo)
    ) {
      const iconUrl = getIconUrl(uniqueInfo);
      if (iconUrl) {
        return (
          <div className="group relative mt-2 cursor-pointer">
            <Image src={iconUrl} alt={uniqueInfo} width={24} height={24} />
            <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {uniqueInfo}
            </div>
          </div>
        );
      }
    }

    if (
      truncate &&
      (typeof uniqueInfo === "string" || typeof uniqueInfo === "number")
    ) {
      return (
        <Tooltip title={String(uniqueInfo.toString().toUpperCase())}>
          <div className="mt-2 cursor-pointer overflow-hidden truncate text-3xl font-semibold capitalize text-white">
            {uniqueInfo.toString().toUpperCase()}
          </div>
        </Tooltip>
      );
    }

    return (
      <div className="mt-2 text-3xl font-semibold capitalize text-white">
        {uniqueInfo}
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
