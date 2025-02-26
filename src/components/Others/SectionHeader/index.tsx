import Image from "next/image";

interface IProps {
  sectionTitle: any;
  sectionDescription?: string;
  sectionDescriptionTitle?: string;
}

export default function SectionHeader({
  sectionTitle,
  sectionDescription,
  sectionDescriptionTitle,
}: IProps) {
  return (
    <div className="relative flex max-h-full max-w-[1000px] flex-col items-start gap-16 pl-[5%] pt-[86px]">
      <Image src={sectionTitle} alt="asdf" className="h-20 w-fit" />
      <div className="w-full space-y-8 text-left text-xl font-normal leading-[130%] text-lootlab-font-highlight">
        <span className="text-4xl font-bold leading-10 text-lootlab-font-base">
          {sectionDescriptionTitle}
        </span>
        <h1 className="w-[50%] text-lg leading-[30px] text-[#cecece]">
          {sectionDescription}
        </h1>
      </div>
    </div>
  );
}
