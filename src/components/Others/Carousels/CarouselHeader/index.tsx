"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CarouselService from "@/services/carouse.service";
import loot from "../../../../images/banner4.png";

function CarouselHeader() {
  const [currIndex, setCurrIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex h-auto w-full justify-center">
      <div className="h-full w-full overflow-hidden">
        {/* Imagem do Banner */}
        <div className="relative inset-0 -z-20 h-full w-full opacity-100">
          {banners && banners.length > 0 ? (
            <Image
              src={banners[currIndex]?.path}
              key={currIndex}
              width={1920}
              height={600}
              alt="Banner"
              className="h-full w-full object-cover opacity-85"
              priority
            />
          ) : (
            <Image
              src={loot}
              key={currIndex}
              width={1920}
              height={600}
              alt="Banner"
              className="h-full w-full object-cover opacity-85"
              priority
            />
          )}
        </div>

        {/* Bullets ou Miniaturas */}
        <div
          className={`absolute flex gap-5 ${
            isMobile
              ? "bottom-2 left-1/2 z-10 -translate-x-1/2"
              : "bottom-7 right-[5%]"
          }`}
        >
          {isMobile ? (
            <div className="flex gap-2">
              {banners &&
                banners.length > 0 &&
                banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrIndex(index)}
                    className={`h-4 w-4 rounded-full border-[1px] border-white transition-transform duration-300 ease-in-out ${
                      currIndex === index
                        ? "scale-125 bg-[#283563] shadow-lg"
                        : "bg-gray-300 hover:scale-110"
                    }`}
                  />
                ))}
            </div>
          ) : (
            banners &&
            banners.length > 0 &&
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
                  className="h-full w-full max-w-[600px] rounded-lg object-cover"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CarouselHeader;
