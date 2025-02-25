import classNames from "classnames";
import NavLink from "./NavLink";
import Link from "next/link";

interface IProps {
  orientation?: "horizontal" | "vertical";
}
function NavLinks({ orientation = "horizontal" }: IProps) {
  return (
    <ul
      className={classNames("flex items-center gap-2", {
        "flex-col": orientation === "vertical",
      })}
    >
      <Link
        className="cursor-pointer select-none rounded-sm px-2 py-1 text-lootlab-font-highlight transition-all hover:bg-[#242C3A] hover:text-white"
        href="/"
      >
        Home
      </Link>
      <NavLink href="/nft-jogos">NFT Games</NavLink>
      <NavLink href="/nft-artes">NTF Arts</NavLink>
      <NavLink href="/crypto">Crypto</NavLink>
    </ul>
  );
}

export default NavLinks;
