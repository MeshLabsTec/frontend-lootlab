import { BattlePassModern } from "@/components/BattlePass";
import { Suspense } from "react";

export default function BattlePassPage() {
  return (
    <div className="w-full">
      <Suspense fallback={<div>Carregando Battle Pass...</div>}>
        <BattlePassModern />
      </Suspense>
    </div>
  );
}
