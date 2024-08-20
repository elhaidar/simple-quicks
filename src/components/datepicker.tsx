"use client";

import { Clock } from "lucide-react";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { useEffect, useState } from "react";
import { format, isValid } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useTask } from "@/context/TaskContext";

interface DatepickerProps {
  initialDate?: Date;
  todoId: string;
}

export function Datepicker({ todoId, initialDate }: DatepickerProps) {
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [type, setType] = useState<"date" | "text">(
    initialDate ? "date" : "text"
  );
  const [editedDate, setEditedDate] = useState<Date | undefined>(initialDate);

  const { handleOnChangeDate } = useTask();

  async function handleUpdateDate() {
    try {
      if (!todoId || !date) return;
      const payload = {
        date: date.toISOString(),
      };
      const res = await fetch(`/api/todo/${todoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error updating date");
      handleOnChangeDate(todoId, date.toISOString());
      setEditedDate(date);
    } catch (err) {
      if (err instanceof Error) {
        setDate(initialDate);
        setEditedDate(initialDate);
        console.error(err.message);
      }
    }
  }

  useEffect(() => {
    if (date !== initialDate) {
      handleUpdateDate();
    }
  }, [date]);

  return (
    <div className="flex gap-[18px] py-1 items-center relative">
      <Clock
        className={cn("w-5 h-5 transition-all", editedDate && "text-primary")}
      />
      <div className="relative flex items-center">
        <Input
          type={type}
          className="w-[193px] p-4 h-[40px] relative placeholder:text-foreground"
          value={
            editedDate && isValid(editedDate)
              ? format(editedDate, "yyyy-MM-dd")
              : ""
          }
          onChange={(e) => setEditedDate(new Date(e.target.value))}
          placeholder="Set Date"
          onFocus={() => setType("date")}
          onBlur={() => {
            setType(editedDate ? "date" : "text");
            setDate(editedDate);
          }}
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
