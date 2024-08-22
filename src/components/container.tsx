"use client";

import { useMenu } from "@/context/MenuContext";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Inbox } from "./inbox";
import { Task } from "./task";
import { ChatRoom } from "./chat-room";
import { useInbox } from "@/context/InboxContext";
import { Chat } from "@/schemas/chat";
import { Todo } from "@/schemas/todo";

interface ContainerProps {
  chats: Chat[];
  todos: Todo[];
}

export function Container() {
  const { menu } = useMenu();
  const { selectedRoom, setSelectedRoom } = useInbox();

  useEffect(() => {
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
          <Inbox key={menu} />
        )
      ) : menu === "task" ? (
        <Task key={menu} />
      ) : null}
    </AnimatePresence>
  );
}
