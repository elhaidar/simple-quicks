"use client";

import { useMenu } from "@/context/MenuContext";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Inbox } from "./inbox";
import { Task } from "./task";
import { ChatRoom } from "./chat-room";
import { useInbox } from "@/context/InboxContext";

export function Container() {
  const { menu } = useMenu();
  const { selectedRoom, setSelectedRoom } = useInbox();
  const [isLoading, setIsLoading] = useState(true);

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
  }, [menu]);

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
