"use client";

import { useMenu } from "@/context/MenuContext";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Icons } from "./icons";
import Loader from "./loader";

export function Container() {
  const { menu } = useMenu();

  return (
    <div
      className={cn(
        "bg-white w-full h-[80%] max-h-dvh md:h-[737px] overflow-y-auto absolute bottom-[110px] rounded-[6px] px-8 py-6 transition-all scale-0 origin-bottom-right",
        menu && "scale-100"
      )}
    >
      <div className="flex justify-between items-center relative">
        <Input
          type="text"
          placeholder="Search"
          className="px-16 placeholder:text-foreground"
        />
        <Icons.search className="fill-foreground absolute right-16" />
      </div>
      <div className="flex justify-center items-center my-auto -mt-8 h-full">
        <Loader text="Loading Chats..." />
      </div>
    </div>
  );
}
