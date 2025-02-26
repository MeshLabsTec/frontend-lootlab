"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CarouselService from "@/services/carouse.service";
import loot from "../../../../images/banner4.png";

function CarouselHeader() {
  const [currIndex, setCurrIndex] = useState<number>(0);

  const { data: banners } = useQuery({
    queryKey: ["carousel"],
    queryFn: async () => await CarouselService.getCarousel(),
  });

  useEffect(() => {
    if (banners && banners.length === 0) return;
    if (banners && banners.length > 0) {
      const interval = setInterval(() => {
        setCurrIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [banners, currIndex]);

  return (
    <div className="flex h-auto w-full justify-center">
      <div className="h-full w-full overflow-hidden">
        <div className="inset-0 -z-20 h-full w-full opacity-100">
          {banners && banners.length > 0 ? (
            <Image
              src={banners[currIndex]?.path}
              key={currIndex}
              width={1920}
              height={600}
              alt="Banner"
              className="h-full w-full object-contain opacity-85"
              priority
            />
          ) : (
            <Image
              src={loot}
              key={currIndex}
              width={1920}
              height={600}
              alt="Banner"
              className="h-full w-full object-contain opacity-85"
              priority
            />
          )}
        </div>
        <div className="absolute bottom-7 right-[5%] flex gap-5">
          {banners && banners.length > 0 ? (
            banners.map(({ path }, index) => (
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
                  src={path}
                  width={1920}
                  height={600}
                  alt="Banner"
                  className="h-full w-full max-w-[600px] rounded-lg object-contain"
                />
              </div>
            ))
          ) : (
            <div
              className={`flex h-16 w-28 cursor-pointer rounded-md border-2 border-lootlab-font-base shadow-custom shadow-lootlab-font-highlight transition-transform duration-200 ease-in-out hover:border-2`}
            >
              <Image
                src={loot}
                width={1920}
                height={600}
                alt="Banner"
                className="h-full w-full rounded-lg object-contain"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CarouselHeader;
