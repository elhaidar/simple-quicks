import { Todo } from "@/schemas/todo";
import { motion } from "framer-motion";
import { Popover, PopoverContent } from "./ui/popover";
import { Checkbox } from "./ui/checkbox";
import { TaskItem } from "./task-item";
import { Button } from "./ui/button";
import { useTask } from "@/context/TaskContext";
import { useEffect, useState } from "react";

interface TaskItemWrapperProps {
  todo: Todo;
}

export function TaskItemWrapper({ todo }: TaskItemWrapperProps) {
  const { handleOnChangeCompleted, deleteTask } = useTask();

  const [editedCompleted, setEditedCompleted] = useState(todo.completed);
  const [isOpen, setIsOpen] = useState(false);

  async function handleUpdateCompleted() {
    try {
      if (!todo.id || editedCompleted === todo.completed) return;
      const payload = {
        completed: editedCompleted,
      };
      const res = await fetch(`/api/todo/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error updating completed status");
      handleOnChangeCompleted(todo.id);
    } catch (err) {
      if (err instanceof Error) {
        setEditedCompleted(todo.completed);
        console.error(err.message);
      }
    }
  }

  async function handleDelete() {
    try {
      if (!todo.id) return;
      const res = await fetch(`/api/todo/${todo.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error delete task");
      deleteTask(todo.id);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    } finally {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    if (editedCompleted !== todo.completed) {
      handleUpdateCompleted();
    }
  }, [editedCompleted]);

  return (
    <motion.div
      key={todo.id}
      className="flex gap-[22.5px] border-b transition-all"
      exit={{ opacity: 0, scale: 0 }}
    >
      <Popover key={todo.id} open={isOpen}>
        <Checkbox
          className="mt-[24px]"
          checked={editedCompleted}
          onCheckedChange={() => setEditedCompleted(!editedCompleted)}
        />
        <TaskItem todo={todo} setIsOpen={setIsOpen} />
        <PopoverContent
          className="w-[126px] p-0 border-border-secondary"
          align="end"
        >
          <Button
            className="text-base text-destructive w-full flex justify-start"
            variant="ghost-secondary"
            size="sm"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </motion.div>
  );
}
