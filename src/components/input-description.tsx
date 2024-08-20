import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { Editable } from "./editable";
import { Textarea } from "./ui/textarea";
import { useRef, useState } from "react";

interface InputDescriptionProps {
  initialDescription?: string;
}

export function InputDescription({
  initialDescription,
}: InputDescriptionProps) {
  const [description, setDescription] = useState<string>(
    initialDescription || ""
  );

  const childRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex gap-[18px] py-1">
      <Icons.edit
        className={cn(
          "w-4 h-4 mr-[6px] transition-all",
          description ? "fill-primary" : "fill-foreground"
        )}
      />
      <Editable
        childRef={childRef}
        placeholder="No description"
        text={description}
        type="textarea"
      >
        <Textarea
          className="w-full p-2"
          ref={childRef}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </Editable>
    </div>
  );
}
