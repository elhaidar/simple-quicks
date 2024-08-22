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
import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { useTask } from "@/context/TaskContext";
import { Stickers } from "./stickers";

interface TaskItemProps {
  todo: Todo;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
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
      {title || "No Title"}
    </h3>
  );
}

export function TaskItem({ todo, setIsOpen }: TaskItemProps) {
  const { id, title, description, date, completed, categories } = todo;

  const { handleOnChangeTitle } = useTask();

  const [isEditing, setIsEditing] = useState(todo.title === "" ? true : false);
  const [editedTitle, setEditedTitle] = useState(title);

  const childRef = useRef<HTMLInputElement>(null);

  const formattedDate = date ? format(new Date(date), "dd/MM/yyyy") : "";
  const dateDifference = getDateDifferenceMessage(date);

  async function handleUpdateTitle() {
    try {
      if (!id || editedTitle === title) return;
      const payload = {
        title: editedTitle,
      };
      const res = await fetch(`/api/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error updating title");
      handleOnChangeTitle(id, editedTitle);
    } catch (err) {
      if (err instanceof Error) {
        setEditedTitle(title);
        console.error(err.message);
      }
    } finally {
      setIsEditing(false);
    }
  }

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
              text={editedTitle}
              ViewComponent={
                <TitleComponent completed={completed} title={editedTitle} />
              }
              initialEditing={isEditing}
            >
              <Input
                className="w-full text-sm font-bold transition-all"
                ref={childRef}
                value={editedTitle}
                name="title"
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyUp={(e) => e.preventDefault()}
                onFocus={() => setIsEditing(true)}
                onBlur={handleUpdateTitle}
              />
            </Editable>
          </div>
          <div className="flex items-center gap-3 justify-end [&[data-state=open]>svg]:rotate-180">
            <p
              className={cn(
                "text-destructive text-xs transition",
                (completed || !date) && "hidden"
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
                  setIsOpen((prev) => !prev);
                }}
              />
            </PopoverTrigger>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-[22px] space-y-2">
        <Datepicker todoId={id} initialDate={new Date(date)} />
        <InputDescription todoId={id} initialDescription={description} />
        <Stickers todoId={id} categories={categories} />
      </AccordionContent>
    </AccordionItem>
  );
}
