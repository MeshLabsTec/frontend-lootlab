// import Link from "next/link";
import { Common } from "../Common";
import { FaDiscord, FaTelegram, FaTwitter } from "react-icons/fa6";

export function LayoutFooter() {
  return (
    <footer className="mt-auto w-full bg-lootlab-bg-main-highlight text-lootlab-font-base">
      <div className="laptop:h-64 m-auto flex h-auto w-[90%] flex-col items-center justify-between bg-lootlab-bg-main-highlight py-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Common.CommonLogo />

          <p className="text-mesh-color-others-gray text-center md:text-left">
            Powered by MeshLabs. <br /> All rights reserved.
          </p>
        </div>

        <div className="mt-4 flex flex-col items-center gap-8 md:mt-0 md:items-end md:gap-16">
          {/* <nav className="laptop:gap-6 laptop:text-base flex flex-wrap justify-center gap-4 text-xs md:justify-end">
            <Link
              href="/termos-de-uso"
              tabIndex={-1}
              className="text-white transition-colors hover:text-white/50"
              rel="noopener noreferrer"
            >
              Termos de Uso
            </Link>
          </nav> */}
          <nav className="flex gap-4 text-lootlab-font-base/70">
            <a
              href="https://x.com/Lootlabz"
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:text-lootlab-font-base"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://discord.gg/7S3SDb2KEk"
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-full text-lg transition-colors hover:text-lootlab-font-base"
              rel="noopener noreferrer"
            >
              <FaDiscord />
            </a>
            <a
              href="https://t.me/Lootlabzyxz"
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-full text-lg transition-colors hover:text-lootlab-font-base"
              rel="noopener noreferrer"
            >
              <FaTelegram />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
