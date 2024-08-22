"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import Loader from "./loader";
import { InboxContent } from "./inbox-content";
import { SearchChat } from "./search-chat";
import { useQuery } from "@tanstack/react-query";
import { useInbox } from "@/context/InboxContext";
import { useEffect } from "react";

interface InboxProps extends MotionProps {}

const fetchData = async () => {
  const response = await fetch("api/chat");
  if (!response.ok) {
    throw new Error(
      `Error fetching data: ${response.status} ${response.statusText}`
    );
  }
  return await response.json();
};

export function Inbox({ ...props }: InboxProps) {
  const { setChats } = useInbox();

  const { data, isSuccess, error, isPending } = useQuery({
    queryKey: ["chats"],
    queryFn: fetchData,
  });

  useEffect(() => {
    if (isSuccess) {
      if (localStorage.getItem("chats") === null) {
        setChats(data.data || []);
      } else {
        const storedChats = JSON.parse(localStorage.getItem("chats") || "[]");
        setChats(storedChats);
      }
    }
  }, [data, setChats, isSuccess]);

  return (
    <motion.div
      {...props}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-white w-full h-[80%] max-h-dvh min-[1920px]:]:h-[737px] overflow-y-auto absolute bottom-[110px] rounded-[6px] pb-6 origin-bottom-right"
      )}
    >
      <SearchChat />
      {isPending ? (
        <div className="flex justify-center items-center my-auto h-[80%]">
          <Loader text={"Loading Chats..."} />
        </div>
      ) : (
        <div className="px-4 md:px-8 h-[80%] relative">
          {error ? (
            <p className="text-center">{error.message}</p>
          ) : (
            <InboxContent />
          )}
        </div>
      )}
    </motion.div>
  );
}
