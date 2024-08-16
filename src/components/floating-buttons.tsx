"use client";

import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { useState } from "react";
import { useMenu } from "@/context/MenuContext";

export function FloatingButtons() {
  const [isOpen, setIsOpen] = useState(false);
  const { menu, setMenu } = useMenu();

  return (
    <nav
      className={cn(
        "flex items-end gap-6 transition-all absolute bottom-0 right-0 text-white"
      )}
    >
      <div
        className={cn(
          "flex gap-6 transition-all transform",
          menu === "task" && "flex-row-reverse"
        )}
      >
        <div
          className={cn(
            "mb-[2px] transition-all opacity-100",
            isOpen ? "" : "translate-x-[170px] opacity-0 -z-10"
          )}
          onClick={() => setMenu(menu === "task" ? "" : "task")}
        >
          <p
            className={cn(
              "text-xs mb-3 text-center font-bold transition-all scale-0",
              !menu && "scale-100"
            )}
          >
            Task
          </p>
          <Button
            variant={"indicator1"}
            className={cn(
              "relative rounded-full transition-all active:transform active:translate-x-4 active:shadow-button-clicked",
              menu === "task"
                ? "transform translate-x-4 shadow-button-clicked"
                : "bg-white/95"
            )}
            size={menu === "task" ? "icon" : "icon2"}
          >
            <Icons.reader
              className={cn(
                "w-6 h-6 fill-indicator1",
                menu === "task" && "fill-white"
              )}
            />
          </Button>
        </div>
        <div
          className={cn(
            "mb-[2px] transition-all opacity-100",
            isOpen ? "" : "translate-x-[87px] opacity-0 -z-10"
          )}
          onClick={() => setMenu(menu === "inbox" ? "" : "inbox")}
        >
          <p
            className={cn(
              "text-xs mb-3 text-center font-bold transition-all scale-0",
              !menu && "scale-100"
            )}
          >
            Inbox
          </p>
          <Button
            variant={"indicator2"}
            className={cn(
              "relative rounded-full transition-all active:transform active:translate-x-4 active:shadow-button-clicked",
              menu === "inbox"
                ? "transform translate-x-4 shadow-button-clicked"
                : "bg-white/95"
            )}
            size={menu === "inbox" ? "icon" : "icon2"}
          >
            <Icons.message
              className={cn(
                "w-6 h-6 fill-indicator2",
                menu === "inbox" && "fill-white"
              )}
            />
          </Button>
        </div>
      </div>
      <Button
        className={cn(
          "font-bold rounded-full transition-all z-10",
          !menu ? "flex" : "scale-0 w-0 h-0"
        )}
        size={"icon"}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icons.lightning className="w-12 h-12" />
      </Button>
    </nav>
  );
}
