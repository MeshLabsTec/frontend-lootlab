import classNames from "classnames";
import NavLink from "./NavLink";
import Link from "next/link";
// Importando ícones do React Icons (pacote FaIcons - Font Awesome)
import { FaHome, FaGamepad, FaPaintBrush } from "react-icons/fa";
import { GoContainer } from "react-icons/go";

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

      <NavLink href="/crypto">
        <div className="flex items-center gap-2">
          <GoContainer className="text-lg" />
          <span>AirDrop</span>
        </div>
      </NavLink>
    </ul>
  );
}

export default NavLinks;
