import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function TaskFilterPopover() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen}>
      <div className="lg:mx-20">
        <PopoverTrigger asChild>
          <Button
            className="font-bold"
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
          >
            My Tasks{" "}
            <ChevronDown className="ml-[7px] w-4 h-4 font-bold mt-[2px]" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-[288px] p-0 border-border">
        <div className="flex flex-col items-start rounded-none">
          <Button
            className={cn(
              "text-sm font-bold w-full flex justify-start border-b-[1px] border-border"
            )}
            variant="ghost-secondary"
            size="sm"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Personal Errands
          </Button>
          <Button
            className="text-sm font-bold w-full flex justify-start"
            variant="ghost-secondary"
            size="sm"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Urgent To-Do
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
