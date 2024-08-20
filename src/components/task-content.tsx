"use client";

import { useTask } from "@/context/TaskContext";
import { TaskFilterPopover } from "./task-filter-popover";
import { TaskItem } from "./task-item";
import { Accordion } from "./ui/accordion";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { sortTodosByDate } from "@/lib/taskHelper";
import { useState } from "react";

export function TaskContent() {
  const { todos, handleOnChangeCompleted } = useTask();

  const sortedTodos = sortTodosByDate(todos);

  return (
    <div>
      <div className="flex justify-between items-center">
        <TaskFilterPopover />
        <Button className="font-bold">New Task</Button>
      </div>
      <ScrollArea>
        <Accordion type="multiple">
          {sortedTodos.map((todo) => (
            <div key={todo.id} className="flex gap-[22.5px] border-b">
              <Popover key={todo.id}>
                <Checkbox
                  className="mt-[24px]"
                  checked={todo.completed}
                  onCheckedChange={() => handleOnChangeCompleted(todo.id)}
                />
                <TaskItem todo={todo} />
                <PopoverContent>{todo.description}</PopoverContent>
              </Popover>
            </div>
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  );
}
