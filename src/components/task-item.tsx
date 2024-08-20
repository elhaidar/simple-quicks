"use client";

import { ChevronDown, Ellipsis } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { PopoverTrigger } from "./ui/popover";
import { Datepicker } from "./datepicker";
import { InputDescription } from "./input-description";
import { Todo } from "@/schemas/todo";
import { format } from "date-fns";
import { getDateDifferenceMessage } from "@/lib/taskHelper";
import { cn } from "@/lib/utils";
import { Editable } from "./editable";
import { Input } from "./ui/input";
import { HTMLAttributes, SetStateAction, useRef, useState } from "react";
import { useTask } from "@/context/TaskContext";

interface TaskItemProps {
  todo: Todo;
}

export interface TitleComponentProps
  extends HTMLAttributes<HTMLHeadingElement> {
  title: string;
  completed: boolean;
}

function TitleComponent({ title, completed, ...props }: TitleComponentProps) {
  return (
    <h3
      className={cn(
        "text-sm font-bold max-w-[335px] transition-all line-clamp-2",
        completed && "line-through text-muted"
      )}
      {...props}
    >
      {title}
    </h3>
  );
}

export function TaskItem({ todo }: TaskItemProps) {
  const { id, title, description, date, completed } = todo;

  const { handleOnChangeTitle } = useTask();

  const [isEditing, setIsEditing] = useState(false);

  const childRef = useRef<HTMLInputElement>(null);

  const formattedDate = format(new Date(date), "dd/MM/yyyy");
  const dateDifference = getDateDifferenceMessage(date);

  return (
    <AccordionItem value={id} className="w-full">
      <AccordionTrigger className="flex justify-start gap-[22.5px] py-[22px] data-[state=open]:pb-[12px]">
        <div className="flex items-center justify-between w-full">
          <div
            className={cn(
              "cursor-text w-full text-left max-w-[335px]",
              isEditing ? "w-full" : "w-fit"
            )}
          >
            <Editable
              childRef={childRef}
              placeholder="No Title"
              type="input"
              text={title}
              ViewComponent={
                <TitleComponent completed={completed} title={title} />
              }
            >
              <Input
                className="w-full text-sm font-bold transition-all"
                ref={childRef}
                value={title}
                name="title"
                onChange={(e) => handleOnChangeTitle(id, e.target.value)}
                onKeyUp={(e) => e.preventDefault()}
                onFocus={() => setIsEditing(true)}
                onBlur={() => setIsEditing(false)}
              />
            </Editable>
          </div>
          <div className="flex items-center gap-3 justify-end [&[data-state=open]>svg]:rotate-180">
            <p
              className={cn(
                "text-destructive text-xs transition",
                completed && "hidden"
              )}
            >
              {dateDifference}
            </p>
            <time className="text-xs" dateTime={formattedDate}>
              {formattedDate}
            </time>
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            <PopoverTrigger asChild>
              <Ellipsis
                className="h-4 w-4 shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            </PopoverTrigger>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-[22px] space-y-2">
        <Datepicker initialDate={new Date(date)} />
        <InputDescription initialDescription={description} />
      </AccordionContent>
    </AccordionItem>
  );
}
