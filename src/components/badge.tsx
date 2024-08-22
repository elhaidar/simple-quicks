import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";

interface BadgeProps extends HTMLMotionProps<"span"> {
  label: string;
  className?: string;
}

export function Badge({ label, className, ...props }: BadgeProps) {
  return (
    <motion.span
      className={cn(
        "px-3 py-2 bg-stickers-1 text-sm rounded-md font-bold",
        className
      )}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      {...props}
    >
      {label}
    </motion.span>
  );
}
