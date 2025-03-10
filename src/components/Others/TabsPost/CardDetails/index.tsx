import {
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LayoutCard from "../CardLayout";
import ButtonPrevTab from "../Buttons/ButtonTab/buttonPrevTab";
import PublicButton from "../Buttons/PublicButton";
import DeatilsContent from "./DeatilsContent";

function DetailsCard({
  status,
  action,
}: {
  status: boolean;
  action: "Publicar" | "Salvar";
}) {
  return (
    <LayoutCard>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Detalhes</CardTitle>
        <CardDescription className="text-base text-[#8d8d8d]">
          Detalhes essenciais sobre o jogo.
        </CardDescription>
      </CardHeader>
      <DeatilsContent action={action} />
      <CardFooter className="flex w-full justify-between">
        <ButtonPrevTab />
        <PublicButton disabled={status} title={action} />
      </CardFooter>
    </LayoutCard>
  );
}

export default DetailsCard;
