// import Link from "next/link";

import Link from "next/link";

interface IProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}
function NavLink({ children, className, href }: IProps) {
  return (
    <div
      className={`cursor-pointer select-none rounded-sm px-2 py-1 text-lootlab-font-highlight transition-all hover:bg-[#242C3A] hover:text-white ${className}`}
    >
      <Link href={href}>{children}</Link>
    </div>
  );
}

export default NavLink;
