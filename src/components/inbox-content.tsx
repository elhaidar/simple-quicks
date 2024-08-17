"use client";

import { sortChatsByLatestMessage } from "@/lib/chatHelper";
import { GroupItem } from "./group-item";
import { useInbox } from "@/context/InboxContext";

export function InboxContent() {
  const { setSelectedRoom, chats } = useInbox();

  const sortedChats = sortChatsByLatestMessage(chats);

  if (!chats || chats.length === 0) {
    return <p className="text-center">Inbox is empty</p>;
  }

  return (
    <div>
      {sortedChats.map((item, index) => (
        <div key={item.chatId} onClick={() => setSelectedRoom(item.chatId)}>
          <GroupItem data={item} index={index % sortedChats.length} />
          <hr className="border-border" />
        </div>
      ))}
    </div>
  );
}
