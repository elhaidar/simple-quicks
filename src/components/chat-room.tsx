"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import Loader from "./loader";
import { useEffect, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "./ui/button";
import { useInbox } from "@/context/InboxContext";

interface TaskProps extends MotionProps {}

export function ChatRoom({ ...props }: TaskProps) {
  const [isLoading, setIsLoading] = useState(true);

  const { setSelectedRoom } = useInbox();

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
        "bg-white w-full h-[80%] max-h-dvh md:h-[737px] overflow-y-auto absolute bottom-[110px] rounded-[6px] py-5 origin-bottom-right"
      )}
    >
      <div className="flex gap-4 items-center px-6">
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
        <Button className="ml-auto" variant={"icon"} size={"icon24"}>
          <X />
        </Button>
      </div>
      <hr className="border-[1px] border-secondary my-4" />
      {isLoading ? (
        <div className="flex justify-center items-center my-auto h-full -mt-12">
          <Loader text={"Loading Chats..."} />
        </div>
      ) : (
        <div>Content goes here...</div> // Replace this with your actual content
      )}
    </motion.div>
  );
}
