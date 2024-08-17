import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import { Input } from "./ui/input";
import { Icons } from "./icons";
import Loader from "./loader";
import { InboxContent } from "./inbox-content";
import { SearchChat } from "./search-chat";

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
      <SearchChat />
      {isLoading ? (
        <div className="flex justify-center items-center my-auto h-[80%]">
          <Loader text={"Loading Chats..."} />
        </div>
      ) : (
        <div className="px-4 md:px-8 h-[80%]">
          <InboxContent />
        </div>
      )}
    </motion.div>
  );
}
