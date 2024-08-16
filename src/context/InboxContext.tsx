"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface InboxContextType {
  selectedRoom: string | null;
  setSelectedRoom: React.Dispatch<React.SetStateAction<string | null>>;
}

const InboxContext = createContext<InboxContextType | undefined>(undefined);

export const InboxProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>("");

  return (
    <InboxContext.Provider value={{ selectedRoom, setSelectedRoom }}>
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
