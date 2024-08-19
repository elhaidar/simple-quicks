import { ChevronDown, Clock, Ellipsis } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { Datepicker } from "./datepicker";
import { InputDescription } from "./input-description";

interface TaskItemProps {
  value: string;
}

export function TaskItem({ value }: TaskItemProps) {
  return (
    <AccordionItem value={value} className="w-full">
      <AccordionTrigger className="flex justify-start gap-[22.5px] py-[22px] data-[state=open]:pb-[12px]">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-sm font-bold max-w-[335px]">
            Close off Case #012920- RODRIGUES, Amiguel
          </h3>
          <div className="flex items-center gap-3 justify-end [&[data-state=open]>svg]:rotate-180">
            <p className="text-destructive text-xs">2 Days Left</p>
            <time className="text-xs" dateTime="14/06/2021">
              14/06/2021
            </time>
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            <PopoverTrigger asChild>
              <Ellipsis
                className="h-4 w-4 shrink-0"
                onClick={(e) => e.stopPropagation()}
              />
            </PopoverTrigger>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-[22px] space-y-2">
        <Datepicker />
        <InputDescription />
      </AccordionContent>
    </AccordionItem>
  );
}
