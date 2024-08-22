"use client";

import { TodoCategory } from "@/schemas/todo";
import { Badge } from "./badge";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { TODO_CATEGORY_COLOR } from "@/lib/constant";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useTask } from "@/context/TaskContext";
import { AnimatePresence } from "framer-motion";

interface StickersProps {
  todoId: string;
  categories: TodoCategory[];
}

export function Stickers({ todoId, categories }: StickersProps) {
  const categoriesOption = Object.values(TodoCategory);

  const { handleOnChangeCategory } = useTask();

  async function handleUpdateCategory(category: TodoCategory) {
    try {
      if (!category) return;
      const newCategories = categories.includes(category)
        ? categories.filter((c) => c !== category)
        : [...categories, category];
      const response = await fetch(`/api/todo/${todoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categories: newCategories }),
      });
      if (!response.ok) {
        throw new Error("Failed to update category");
      }
      handleOnChangeCategory(todoId, newCategories);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }

  return (
    <div className="flex gap-[18px] py-1 items-start">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"icon"} className="px-0 size-[20px] py-4 mr-1">
            <Icons.bookmark
              className={cn(
                "w-[18px] h-[18px] fill-foreground transition-all",
                categories.length > 0 && "fill-primary"
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <div className="flex flex-col gap-[11px]">
            {categoriesOption.map((category, index) => (
              <Badge
                key={index}
                label={category}
                className={`${TODO_CATEGORY_COLOR[category]} text-xs ${
                  categories.includes(category) && "border border-primary"
                } cursor-pointer`}
                onClick={() => handleUpdateCategory(category)}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <div className="flex gap-[10px] item-center flex-wrap">
        <AnimatePresence>
          {categories.map((category, index) => (
            <Badge
              key={index}
              label={category}
              className={TODO_CATEGORY_COLOR[category]}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
