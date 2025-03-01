"use client";
import { Login } from "@/components/Modal/Login";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Suspense } from "react";
// import NavLink from "../../NavLinks/NavLink";

function AuthConditionalRender() {
  const { data: session } = useSession();
  return (
    <div className="space-x-3">
      {session?.accessToken ? (
        <div className="flex gap-2">
          <Button
            className="bg-[#283563] font-bold text-white transition-all hover:bg-[#283563]/60"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </Button>
          <Link
            className="flex h-9 cursor-pointer select-none items-center rounded-sm px-2 py-1 text-lootlab-font-highlight transition-all hover:bg-[#242C3A] hover:text-white"
            href="/create-post?activatedTab=basic"
          >
            Criar Post
          </Link>
          <Link
            className="flex h-9 cursor-pointer select-none items-center rounded-sm px-2 py-1 text-lootlab-font-highlight transition-all hover:bg-[#242C3A] hover:text-white"
            href="/upload-image"
          >
            Upload
          </Link>
        </div>
      ) : (
        <Suspense>
          <Login />
        </Suspense>
      )}
    </div>
  );
}

export default AuthConditionalRender;
