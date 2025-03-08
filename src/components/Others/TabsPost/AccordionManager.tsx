import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import classNames from "classnames";

interface IProps {
  children: React.ReactNode;
  error?: string;
  titleTrigger: string;
}

function AccordionManager({ children, error, titleTrigger }: IProps) {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      <AccordionItem
        value="link"
        className={classNames(
          "max-h-96 overflow-hidden overflow-y-auto rounded-lg border border-lootlab-font-highlight",
          {
            "border-red-500": error,
          },
        )}
      >
        <AccordionTrigger className="px-4">{titleTrigger}</AccordionTrigger>
        {children}
      </AccordionItem>
    </Accordion>
  );
}

export default AccordionManager;
