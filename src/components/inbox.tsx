"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import { Input } from "./ui/input";
import { Icons } from "./icons";
import Loader from "./loader";
import { InboxContent } from "./inbox-content";

interface InboxProps extends MotionProps {
  isLoading: boolean;
}

export function Inbox({ isLoading, ...props }: InboxProps) {
  return (
    <motion.div
      {...props}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-white w-full h-[80%] max-h-dvh md:h-[737px] overflow-y-auto absolute bottom-[110px] rounded-[6px] pb-6 origin-bottom-right"
      )}
    >
      <div className="flex justify-between items-center bg-white z-[10] sticky top-0 py-6 px-8">
        <Input
          type="text"
          placeholder="Search"
          className="px-16 placeholder:text-foreground"
        />
        <Icons.search className="fill-foreground absolute right-16" />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center my-auto -mt-8 h-full">
          <Loader text={"Loading Chats..."} />
        </div>
      ) : (
        <div className="px-8">
          <InboxContent />
        </div>
      )}
    </motion.div>
  );
}
