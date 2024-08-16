"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import Loader from "./loader";
import { useEffect, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "./ui/button";
import { useInbox } from "@/context/InboxContext";
import { ChatRoomContent } from "./chat-room-content";
import { useMenu } from "@/context/MenuContext";

interface TaskProps extends MotionProps {}

export function ChatRoom({ ...props }: TaskProps) {
  const [isLoading, setIsLoading] = useState(true);

  const { setSelectedRoom } = useInbox();
  const { setMenu } = useMenu();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <motion.div
      {...props}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-white w-full h-[80%] max-h-dvh md:h-[737px] overflow-y-auto absolute bottom-[110px] rounded-[6px] pb-5 origin-bottom-right"
      )}
    >
      <div className="flex gap-4 items-center px-6 bg-white z-[10] sticky top-0 py-5 border-b-[2px] border-secondary">
        <Button
          variant={"icon"}
          size={"icon24"}
          onClick={() => setSelectedRoom(null)}
        >
          <ArrowLeft />
        </Button>
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-primary">
            I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]
          </h3>
          <p className="text-xs font-bold">3 Participants</p>
        </div>
        <Button
          className="ml-auto"
          variant={"icon"}
          size={"icon24"}
          onClick={() => setMenu("")}
        >
          <X />
        </Button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center my-auto h-full -mt-12">
          <Loader text={"Loading Chats..."} />
        </div>
      ) : (
        <ChatRoomContent />
      )}
    </motion.div>
  );
}
