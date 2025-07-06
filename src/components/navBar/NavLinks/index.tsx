import classNames from "classnames";
import NavLink from "./NavLink";
import Link from "next/link";
// Importando ícones do React Icons (pacote FaIcons - Font Awesome)
import { FaHome, FaGamepad, FaPaintBrush, FaMedal } from "react-icons/fa";
import airdrop from "../../../../public/airdrop.png";
import Image from "next/image";

interface IProps {
  orientation?: "horizontal" | "vertical";
}

function NavLinks({ orientation = "horizontal" }: IProps) {
  return (
    <ul
      className={classNames("flex gap-2", {
        "flex-col": orientation === "vertical",
      })}
    >
      <Link
        className="flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1 text-lootlab-font-highlight transition-all hover:bg-[#242C3A] hover:text-white"
        href="/"
      >
        <FaHome className="text-lg" />
        <span>Home</span>
      </Link>

      <NavLink href="/nft-jogos">
        <div className="flex items-center gap-2">
          <FaGamepad className="text-lg" />
          <span>NFT Games</span>
        </div>
      </NavLink>

      <NavLink href="/nft-artes">
        <div className="flex items-center gap-2">
          <FaPaintBrush className="text-lg" />
          <span>NTF Arts</span>
        </div>
      </NavLink>

      <NavLink href="/airdrop">
        <div className="flex items-center gap-2">
          <Image src={airdrop} alt="Airdrop" className="h-4 w-3" />
          <span>AirDrop</span>
        </div>
      </NavLink>

      <NavLink href="/battle-pass">
        <div className="flex items-center gap-2">
          <FaMedal className="h-4 w-3" />
          <span>Battle Pass</span>
        </div>
      </NavLink>
    </ul>
  );
}

export default NavLinks;
