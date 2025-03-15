import { LayoutPage } from "@/components/Layout";
import { AirDropComponent } from "@/components/Pages/AirDrop";
import { Suspense } from "react";

export default function Airdrop() {
  return (
    <LayoutPage className="pt-10">
      <Suspense>
        <AirDropComponent />
      </Suspense>
    </LayoutPage>
  );
}
