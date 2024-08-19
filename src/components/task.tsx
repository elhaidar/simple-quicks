"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import Loader from "./loader";
import { TaskContent } from "./task-content";

interface TaskProps extends MotionProps {
  isLoading: boolean;
}

export function Task({ isLoading, ...props }: TaskProps) {
  return (
    <motion.div
      {...props}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-white w-full h-[80%] max-h-dvh md:h-[737px] overflow-y-auto absolute bottom-[110px] rounded-[6px] py-6 origin-bottom-right"
      )}
    >
      {isLoading ? (
        <div className="flex justify-center items-center my-auto h-full">
          <Loader text={"Loading Task List..."} />
        </div>
      ) : (
        <div className="px-4 md:px-8 h-[80%] relative">
          <TaskContent />
        </div>
      )}
    </motion.div>
  );
}
