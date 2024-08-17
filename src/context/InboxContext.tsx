"use client";

import { Chat } from "@/schemas/chat";
import { createContext, ReactNode, useContext, useState } from "react";

interface InboxContextType {
  selectedRoom: string | null;
  setSelectedRoom: React.Dispatch<React.SetStateAction<string | null>>;
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const InboxContext = createContext<InboxContextType | undefined>(undefined);

export const InboxProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [search, setSearch] = useState<string>("");

  return (
    <InboxContext.Provider
      value={{
        selectedRoom,
        setSelectedRoom,
        chats,
        setChats,
        search,
        setSearch,
      }}
    >
      {children}
    </InboxContext.Provider>
  );
};

export const useInbox = () => {
  const context = useContext(InboxContext);
  if (!context) {
    throw new Error("useInbox must be used within a InboxProvider");
  }
  return context;
};
