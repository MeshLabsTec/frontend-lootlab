"use client";
import { Login } from "@/components/Modal/Login";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Suspense, useState } from "react";
import { UserPanel, UserPanelDropdown } from "@/components/UserPanel";
// Importando ícones do React Icons
import {
  FiLogIn,
  FiPlusCircle,
  FiUpload,
  FiUser,
  FiChevronDown,
} from "react-icons/fi";

function AuthConditionalRender() {
  const { data: session } = useSession();
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openUserPanel, setOpenUserPanel] = useState(false);

  return (
    <div className="space-x-3">
      {session?.accessToken ? (
        <div className="relative">
          {/* Botão do usuário para mobile */}
          <div className="md:hidden">
            <Button
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 font-bold text-white transition-all hover:from-purple-700 hover:to-blue-700"
              onClick={() => setOpenUserPanel(true)}
            >
              <FiUser className="text-lg" />
              <span>Perfil</span>
            </Button>
            <UserPanel
              isOpen={openUserPanel}
              onClose={() => setOpenUserPanel(false)}
            />
          </div>

          {/* Botão do usuário para desktop */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <div className="flex gap-2">
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

            <div className="relative">
              <Button
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 font-bold text-white transition-all hover:from-purple-700 hover:to-blue-700"
                onClick={() => setOpenUserPanel(!openUserPanel)}
              >
                <FiUser className="text-lg" />
                <span className="hidden lg:inline">
                  {session?.user?.email?.split("@")[0] || "Usuário"}
                </span>
                <FiChevronDown className="text-sm" />
              </Button>

              <UserPanelDropdown
                isOpen={openUserPanel}
                onClose={() => setOpenUserPanel(false)}
              />
            </div>
          </div>

          {/* Overlay para fechar dropdown quando clicar fora */}
          {openUserPanel && (
            <div
              className="fixed inset-0 z-40 hidden md:block"
              onClick={() => setOpenUserPanel(false)}
            />
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            className="flex items-center gap-2 bg-lootlab-color-highlight font-bold text-white transition-all hover:bg-lootlab-hover-highlight"
            onClick={() => setOpenModalLogin(true)}
          >
            <FiLogIn className="text-lg" />
            <span>Login</span>
          </Button>
          <Suspense>
            <Login
              open={openModalLogin}
              onClose={() => setOpenModalLogin(false)}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
}

export default AuthConditionalRender;
