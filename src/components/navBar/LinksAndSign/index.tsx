import NavLinks from "../NavLinks";
import classNames from "classnames";
import AuthConditionalRender from "./AuthConditionalRender";
import { useSession } from "next-auth/react";

interface IProps {
  orientation?: "vertical" | "horizontal";
  className?: string;
}

function LinksAndLogin({ orientation = "horizontal", className }: IProps) {
  const { data: session } = useSession();
  return (
    <div
      className={classNames(
        className,
        "h-full w-full justify-between md:flex md:items-center",
        {
          "flex flex-col justify-center": orientation === "vertical",
        },
      )}
    >
      <NavLinks orientation={orientation} />
      {session?.accessToken && (
        <div className="border-t border-gray-700 bg-gray-800 md:border-t-0 md:bg-transparent" />
      )}
      <AuthConditionalRender />
    </div>
  );
}

export default LinksAndLogin;
