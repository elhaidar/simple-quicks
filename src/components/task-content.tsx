"use client";

import { useTask } from "@/context/TaskContext";
import { TaskFilterPopover } from "./task-filter-popover";
import { Accordion } from "./ui/accordion";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { sortTodosByDate } from "@/lib/taskHelper";
import { AnimatePresence } from "framer-motion";
import { TaskItemWrapper } from "./task-item-wrapper";

export function TaskContent() {
  const { todos } = useTask();

  const sortedTodos = sortTodosByDate(todos);

  return (
    <div>
      <div className="flex justify-between items-center">
        <TaskFilterPopover />
        <Button className="font-bold">New Task</Button>
      </div>
      <ScrollArea>
        <Accordion type="multiple">
          <AnimatePresence>
            {sortedTodos.map((todo) => (
              <TaskItemWrapper key={todo.id} todo={todo} />
            ))}
          </AnimatePresence>
        </Accordion>
      </ScrollArea>
    </div>
  );
}
