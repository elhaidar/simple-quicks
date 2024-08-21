"use client";

import { useTask } from "@/context/TaskContext";
import { TaskFilterPopover } from "./task-filter-popover";
import { Accordion } from "./ui/accordion";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { sortTodosByDate } from "@/lib/taskHelper";
import { AnimatePresence } from "framer-motion";
import { TaskItemWrapper } from "./task-item-wrapper";
import { Todo } from "@/schemas/todo";
import { useState } from "react";

export function TaskContent() {
  const [valueCollapsed, setValueCollapsed] = useState<string[]>([]);

  const { todos, addTask } = useTask();

  const sortedTodos = sortTodosByDate(todos);

  async function handleAddTask() {
    try {
      const newTask: Todo = {
        id:
          (
            todos.reduce((acc, curr) => Math.max(acc, parseInt(curr.id)), 0) + 1
          )?.toString() || "1",
        title: "",
        description: "",
        date: "",
        completed: false,
        categories: [],
      };
      const res = await fetch(`/api/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (!res.ok) throw new Error("Error adding task");
      addTask(newTask);
      setValueCollapsed([...valueCollapsed, newTask.id]);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <TaskFilterPopover />
        <Button className="font-bold" onClick={handleAddTask}>
          New Task
        </Button>
      </div>
      <ScrollArea>
        <Accordion
          type="multiple"
          value={valueCollapsed}
          onValueChange={(value) => setValueCollapsed(value)}
        >
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
