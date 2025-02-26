"use client";
import Image from "next/image";
import bannerIlluvium from "../../../../images/Banner-illuvium.png";
import bannerAxieInfinity from "../../../../images/Banner-AxieInfinity.png";
import { useEffect, useState } from "react";
import illuviumLogo from "../../../../images/Illuvium-logo.svg";
import axieLogo from "../../../../images/Axie-logo.svg";
import SectionHeader from "../../SectionHeader";
import bannerSabong from "../../../../images/Banner-SabongSaga.png";
import sabongLogo from "../../../../images/sabong.svg";

const banners = [
  {
    banner: bannerSabong,
    logo: sabongLogo,
    description:
      "The Genesis Collectionfeatures 2,222 exclusive chickens. Prized in the Sabong Saga universe. Essential for future collections.",
    descriptionTitle: "Explore a new world with SABONG SAGA",
  },
  {
    banner: bannerIlluvium,
    logo: illuviumLogo,
    description:
      "Immerse yourself in an open universe filled with epic adventures, collect powerful Illuvials, battle other players, and discover hidden riches in a breathtaking environment.",
    descriptionTitle: "Explore a new world with Illuvium",
  },
  {
    banner: bannerAxieInfinity,
    logo: axieLogo,
    description:
      "Immerse yourself in a dynamic universe filled with strategic battles, train and evolve your Axies, compete against other players, and earn rewards in an ever-expanding ecosystem.",
    descriptionTitle: "Explore a new world with Axie Infinity",
  },
];

function CarouselHeader() {
  const [currIndex, setCurrIndex] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [currIndex]);

  return (
    <div className="h-[40vw] max-h-[800px] min-h-[400px] w-full">
      <SectionHeader
        sectionDescriptionTitle={banners[currIndex].descriptionTitle}
        sectionDescription={banners[currIndex].description}
        sectionTitle={banners[currIndex].logo}
      />
      <div className="absolute inset-0 -z-20 h-full w-full opacity-100">
        <Image
          src={banners[currIndex].banner}
          key={currIndex}
          alt="Banner Illuvium"
          className="h-full w-full object-cover object-top opacity-85"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-lootlab-bg-main via-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-lootlab-bg-main via-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-lootlab-bg-main via-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-lootlab-bg-main via-transparent" />
      </div>
      <div className="absolute bottom-7 right-[5%] flex gap-5">
        {banners.map(({ banner }, index) => (
          <div
            key={index}
            onClick={() => setCurrIndex(index)}
            className={`cursor-pointer ${
              currIndex === index
                ? "border-2 shadow-custom shadow-lootlab-font-highlight"
                : ""
            } flex h-16 w-28 rounded-md border-lootlab-font-base transition-transform duration-200 ease-in-out hover:border-2`}
          >
            <Image
              src={banner}
              alt="Banner"
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarouselHeader;
