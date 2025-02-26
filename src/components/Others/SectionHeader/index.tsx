import classNames from "classnames";
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
    <div className="relative flex max-h-full max-w-[750px] flex-col items-start gap-16 pl-[5%] pt-[86px]">
      <Image
        src={sectionTitle}
        alt="asdf"
        className={classNames("h-20 w-fit", {
          // Solução adaptada para o momento em questão, mudar isso o quanto antes.
          "h-28":
            sectionDescriptionTitle === "Explore a new world with SABONG SAGA",
        })}
      />
      <div className="w-full space-y-6 text-left text-xl font-normal leading-[130%] text-lootlab-font-highlight">
        <span className="text-7xl font-bold leading-[90%] text-lootlab-font-base">
          {sectionDescriptionTitle}
        </span>
        <h1 className="text-xl text-[#cecece] 2xl:text-2xl">
          {sectionDescription}
        </h1>
      </div>
    </div>
  );
}
