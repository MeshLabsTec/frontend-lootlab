import { cva, type VariantProps } from "class-variance-authority";

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
  info: string | number;
}

export default function BasicInfo({ info, title, size }: IProps) {
  return (
    <div className={cardVariants({ size })}>
      <h2 className="text-sm font-medium uppercase tracking-wider text-white/70">
        {title}
      </h2>
      <div className="mt-2 text-3xl font-semibold capitalize text-white">
        {info}
      </div>
    </div>
  );
}
