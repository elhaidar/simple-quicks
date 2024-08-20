"use client";

import { Clock } from "lucide-react";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface DatepickerProps {
  initialDate?: Date;
}

export function Datepicker({ initialDate }: DatepickerProps) {
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [type, setType] = useState<"date" | "text">(
    initialDate ? "date" : "text"
  );

  return (
    <div className="flex gap-[18px] py-1 items-center relative">
      <Clock className={cn("w-5 h-5 transition-all", date && "text-primary")} />
      <div className="relative flex items-center">
        <Input
          type={type}
          className="w-[193px] p-4 h-[40px] relative placeholder:text-foreground"
          value={date ? format(date, "yyyy-MM-dd") : ""}
          onChange={(e) => setDate(new Date(e.target.value))}
          placeholder="Set Date"
          onFocus={() => setType("date")}
          onBlur={() => setType(date ? "date" : "text")}
        />
        <Popover>
          <PopoverTrigger asChild>
            <CalendarIcon className="w-4 h-4 absolute right-4" />
          </PopoverTrigger>
          <PopoverContent
            sideOffset={24}
            align="start"
            className="w-full border-none p-0"
          >
            <Calendar
              mode="single"
              className={cn("rounded-md border")}
              selected={date}
              onSelect={(e) => {
                setDate(e);
                setType(e ? "date" : "text");
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
