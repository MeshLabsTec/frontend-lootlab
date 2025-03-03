"use client";
import { Login } from "@/components/Modal/Login";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Suspense } from "react";
// Importando ícones do React Icons
import { FiLogOut, FiPlusCircle, FiUpload } from "react-icons/fi";

function AuthConditionalRender() {
  const { data: session } = useSession();
  return (
    <div className="space-x-3">
      {session?.accessToken ? (
        <div className="flex flex-col gap-2 md:flex-row">
          <Button
            className="order-last flex items-center gap-2 bg-[#283563] font-bold text-white transition-all hover:bg-[#283563]/60 lg:order-first"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <FiLogOut className="text-lg" />
            <span>Logout</span>
          </Button>
          <Link
            className="flex h-9 cursor-pointer select-none items-center rounded-sm px-2 py-1 text-lootlab-font-highlight transition-all hover:bg-[#242C3A] hover:text-white"
            href="/create-post?activatedTab=basic"
          >
            <FiPlusCircle className="mr-2 text-lg" />
            <span>Criar Post</span>
          </Link>
          <Link
            className="flex h-9 cursor-pointer select-none items-center rounded-sm px-2 py-1 text-lootlab-font-highlight transition-all hover:bg-[#242C3A] hover:text-white"
            href="/upload-image"
          >
            <FiUpload className="mr-2 text-lg" />
            <span>Upload</span>
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
