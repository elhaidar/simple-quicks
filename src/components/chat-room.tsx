"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import Loader from "./loader";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowLeft, X } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { useInbox } from "@/context/InboxContext";
import { ChatRoomContent } from "./chat-room-content";
import { useMenu } from "@/context/MenuContext";
import { Input } from "./ui/input";

interface TaskProps extends MotionProps {}

export function ChatRoom({ ...props }: TaskProps) {
  // const [isLoading, setIsLoading] = useState(true);

  const { setSelectedRoom } = useInbox();
  const { setMenu } = useMenu();

  // useEffect(() => {
  //   setTimeout(() => setIsLoading(false), 1000);
  // }, []);

  return (
    <motion.div
      {...props}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-white w-full h-[80%] max-h-dvh md:h-[737px] overflow-y-auto absolute bottom-[110px] rounded-[6px] origin-bottom-right"
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
      {/* {isLoading ? (
        <div className="flex justify-center items-center my-auto h-full -mt-24">
          <Loader text={"Loading Chats..."} />
        </div>
      ) : ( */}
      <div className="flex flex-col px-6 py-2 w-full">
        <ChatRoomContent />
      </div>
      {/* )} */}
      <div className="sticky bottom-0 w-full">
        <div className="flex flex-col items-center mb-3">
          <Button
            className={cn(
              buttonVariants({ variant: "primary" }),
              "px-[12px] py-[8px]"
            )}
          >
            New Message <ArrowDown className="ml-2 w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 w-full bg-white pb-5 px-6">
          <Input
            type="text"
            placeholder="Type a new message"
            className="text-sm py-5 font-bold"
          />
          <Button type="submit" className="px-5">
            Send
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
