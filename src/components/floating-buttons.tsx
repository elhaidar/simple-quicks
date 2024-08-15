"use client";

import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { useState } from "react";

export function FloatingButtons() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  return (
    <nav
      className={cn(
        "flex items-end gap-6 absolute bottom-[27px] right-[34px]",
        selected === "task" && "flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "mb-[2px] transition-all opacity-100",
          isOpen ? "" : "translate-x-[172px] opacity-0 -z-10"
        )}
      >
        <p
          className={cn(
            "text-xs mb-3 text-center font-bold transition-all scale-0",
            !selected && "scale-100"
          )}
        >
          Task
        </p>
        <Button
          variant={"indicator1"}
          className={cn(
            "relative rounded-full transition-all active:transform active:translate-x-4 active:shadow-button-clicked",
            selected === "task" &&
              "transform translate-x-4 shadow-button-clicked"
          )}
          size={selected === "task" ? "icon" : "icon2"}
          onClick={() => setSelected(selected === "task" ? "" : "task")}
        >
          <Icons.reader className="w-6 h-6" />
        </Button>
      </div>
      <div
        className={cn(
          "mb-[2px] transition-all opacity-100",
          isOpen ? "" : "translate-x-[87px] opacity-0 -z-10"
        )}
      >
        <p
          className={cn(
            "text-xs mb-3 text-center font-bold transition-all scale-0",
            !selected && "scale-100"
          )}
        >
          Inbox
        </p>
        <Button
          variant={"indicator2"}
          className={cn(
            "relative rounded-full transition-all active:transform active:translate-x-4 active:shadow-button-clicked",
            selected === "inbox" &&
              "transform translate-x-4 shadow-button-clicked"
          )}
          size={selected === "inbox" ? "icon" : "icon2"}
          onClick={() => setSelected(selected === "inbox" ? "" : "inbox")}
        >
          <Icons.message className="w-6 h-6" />
        </Button>
      </div>
      <Button
        className={cn(
          "font-bold rounded-full transition-all",
          !selected ? "flex" : "scale-0 w-0 h-0"
        )}
        size={"icon"}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icons.lightning className="w-12 h-12" />
      </Button>
    </nav>
  );
}
