"use client";

import { USER_ID } from "@/lib/constant";
import { Chat, Message } from "@/schemas/chat";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface InboxContextType {
  selectedRoom: string | null;
  setSelectedRoom: React.Dispatch<React.SetStateAction<string | null>>;
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  editMessage: Message | null;
  setEditMessage: React.Dispatch<React.SetStateAction<Message | null>>;
  replyMessage: Message | null;
  setReplyMessage: React.Dispatch<React.SetStateAction<Message | null>>;
  addMessage(
    chatId: string,
    message: string,
    repliedToMessageId?: string
  ): void;
  updateMessage(chatId: string, messageId: string, message: string): void;
  deleteMessage(chatId: string, messageId: string): void;
}

const InboxContext = createContext<InboxContextType | undefined>(undefined);

export const InboxProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [search, setSearch] = useState<string>("");
  const [editMessage, setEditMessage] = useState<Message | null>(null);
  const [replyMessage, setReplyMessage] = useState<Message | null>(null);

  function addMessage(
    chatId: string,
    message: string,
    repliedToMessageId?: string
  ) {
    const updatedChats = chats.map((chat) => {
      if (chat.chatId === chatId) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            repliedToMessageId
              ? {
                  messageId: `msg_${
                    (
                      chat.messages.reduce(
                        (acc, curr) =>
                          Math.max(acc, parseInt(curr.messageId.split("_")[1])),
                        1
                      ) + 1
                    )?.toString() || "1"
                  }`,
                  senderId: USER_ID,
                  senderName: "John Doe",
                  content: message,
                  timestamp: new Date().toISOString(),
                  isRead: true,
                  isEdited: false,
                  repliedToMessageId,
                }
              : {
                  messageId: `msg_${
                    (
                      chat.messages.reduce(
                        (acc, curr) =>
                          Math.max(acc, parseInt(curr.messageId.split("_")[1])),
                        1
                      ) + 1
                    )?.toString() || "1"
                  }`,
                  senderId: USER_ID,
                  senderName: "John Doe",
                  content: message,
                  timestamp: new Date().toISOString(),
                  isRead: true,
                  isEdited: false,
                },
          ],
        };
      }
      return chat;
    });

    setChats(updatedChats);
  }

  function updateMessage(chatId: string, messageId: string, message: string) {
    const updatedChats = chats.map((chat) => {
      if (chat.chatId === chatId) {
        return {
          ...chat,
          messages: chat.messages.map((msg) => {
            if (msg.messageId === messageId) {
              return {
                ...msg,
                content: message,
                isEdited: true,
              };
            }
            return msg;
          }),
        };
      }
      return chat;
    });

    setChats(updatedChats);
  }

  function deleteMessage(chatId: string, messageId: string) {
    const updatedChats = chats.map((chat) => {
      if (chat.chatId === chatId) {
        return {
          ...chat,
          messages: chat.messages.filter(
            (message) => message.messageId !== messageId
          ),
        };
      }
      return chat;
    });

    setChats(updatedChats);
  }

  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem("chats", JSON.stringify(chats));
    }
  }, [chats]);

  return (
    <InboxContext.Provider
      value={{
        selectedRoom,
        setSelectedRoom,
        chats,
        setChats,
        search,
        setSearch,
        editMessage,
        setEditMessage,
        replyMessage,
        setReplyMessage,
        addMessage,
        updateMessage,
        deleteMessage,
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
