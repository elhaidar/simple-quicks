"use client";

import { GroupItem } from "./group-item";
import { useInbox } from "@/context/InboxContext";

export function InboxContent() {
  const { setSelectedRoom } = useInbox();

  return (
    <div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} onClick={() => setSelectedRoom(i.toString())}>
          <GroupItem />
          <hr className="border-border" />
        </div>
      ))}
    </div>
  );
}
