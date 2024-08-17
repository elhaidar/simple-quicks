"use client";

import { sortChatsByLatestMessage } from "@/lib/chatHelper";
import { GroupItem } from "./group-item";
import { useInbox } from "@/context/InboxContext";
import { PersonalChatItem } from "./personal-chat-item";
import { useMemo } from "react";
import { USER_ID } from "@/lib/constant";

export function InboxContent() {
  const { setSelectedRoom, chats, search } = useInbox();

  const sortedChats = sortChatsByLatestMessage(chats);

  const searchedChats = useMemo(() => {
    if (!search) {
      return sortedChats;
    }

    return sortedChats.filter((chat) => {
      if (chat.type === "group") {
        return chat?.groupName?.toLowerCase().includes(search.toLowerCase());
      } else if (chat.type === "personal") {
        return chat.participants.some(
          (participant) =>
            participant.userId !== USER_ID &&
            participant.displayName.toLowerCase().includes(search.toLowerCase())
        );
      }
    });
  }, [search, sortedChats]);

  if (!searchedChats || searchedChats.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-center">No chats found</p>
      </div>
    );
  }

  return (
    <div>
      {searchedChats.map((item, index) => {
        if (item.type === "group") {
          return (
            <div key={item.chatId} onClick={() => setSelectedRoom(item.chatId)}>
              <GroupItem data={item} index={index % sortedChats.length} />
              <hr className="border-border" />
            </div>
          );
        } else if (item.type === "personal") {
          return (
            <div key={item.chatId} onClick={() => setSelectedRoom(item.chatId)}>
              <PersonalChatItem
                data={item}
                index={index % sortedChats.length}
              />
              <hr className="border-border" />
            </div>
          );
        }
      })}
    </div>
  );
}
