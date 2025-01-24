import { LayoutPage } from "@/components/Layout";
import { CryptoComponent } from "@/components/Pages/Crypto";
import { Suspense } from "react";

export default function Crypto() {
  return (
    <LayoutPage className="pt-10">
      <Suspense>
        <CryptoComponent />
      </Suspense>
    </LayoutPage>
  );
}
