"use client";

import { useMenu } from "@/context/MenuContext";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Inbox } from "./inbox";
import { Task } from "./task";
import { ChatRoom } from "./chat-room";
import { useInbox } from "@/context/InboxContext";
import { Chat } from "@/schemas/chat";

interface ContainerProps {
  chats: Chat[];
  initialLoading: boolean;
}

export function Container({ chats, initialLoading }: ContainerProps) {
  const { menu } = useMenu();
  const { setChats } = useInbox();
  const { selectedRoom, setSelectedRoom } = useInbox();
  const [isLoading, setIsLoading] = useState(initialLoading);

  useEffect(() => {
    setChats(chats);
  }, [chats, setChats]);

  useEffect(() => {
    if (menu) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1000);
    } else {
      setIsLoading(true);
    }

    return () => {
      setSelectedRoom(null);
    };
  }, [menu, setSelectedRoom]);

  return (
    <AnimatePresence>
      {menu && menu === "inbox" ? (
        selectedRoom ? (
          <ChatRoom />
        ) : (
          <Inbox key={menu} isLoading={isLoading} />
        )
      ) : menu === "task" ? (
        <Task isLoading={isLoading} key={menu} />
      ) : null}
    </AnimatePresence>
  );
}
