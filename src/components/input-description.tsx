import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { Editable } from "./editable";
import { Textarea } from "./ui/textarea";
import { useEffect, useRef, useState } from "react";
import { useTask } from "@/context/TaskContext";

interface InputDescriptionProps {
  initialDescription?: string;
  todoId: string;
}

export function InputDescription({
  todoId,
  initialDescription,
}: InputDescriptionProps) {
  const [description, setDescription] = useState<string>(
    initialDescription || ""
  );
  const [editedDescription, setEditedDescription] = useState<string>(
    initialDescription || ""
  );

  const childRef = useRef<HTMLTextAreaElement>(null);

  const { handleOnChangeDescription } = useTask();

  async function handleUpdateDescription() {
    try {
      if (!todoId || description === initialDescription) return;
      const payload = {
        description,
      };
      const res = await fetch(`/api/todo/${todoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error updating description");
      handleOnChangeDescription(todoId, description);
    } catch (err) {
      if (err instanceof Error) {
        setDescription(initialDescription || "");
        setEditedDescription(initialDescription || "");
        console.error(err.message);
      }
    }
  }

  useEffect(() => {
    if (description !== initialDescription) {
      handleUpdateDescription();
    }
  }, [description]);

  return (
    <div className="flex gap-[18px] py-1">
      <Icons.edit
        className={cn(
          "w-4 h-4 mr-[6px] transition-all",
          editedDescription ? "fill-primary" : "fill-foreground"
        )}
      />
      <Editable
        childRef={childRef}
        placeholder="No description"
        text={editedDescription}
        type="textarea"
      >
        <Textarea
          className="w-full p-2"
          ref={childRef}
          name="description"
          onChange={(e) => setEditedDescription(e.target.value)}
          value={editedDescription}
          onBlur={() => setDescription(editedDescription)}
        />
      </Editable>
    </div>
  );
}
