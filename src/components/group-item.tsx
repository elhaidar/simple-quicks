import { Chat } from "@/schemas/chat";
import { Icons } from "./icons";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { findLatestMessage, findUndreadMessage } from "@/lib/chatHelper";
import { cn } from "@/lib/utils";
import { USER_ID } from "@/lib/constant";
import { formatDate } from "@/lib/dateHelper";

interface GroupItemProps {
  data: Chat;
  index: number;
}

export function GroupItem({ data, index }: GroupItemProps) {
  const latestMessage = findLatestMessage(data.messages);
  const anyUnreadMessages = findUndreadMessage(data.messages);

  return (
    <div className="flex gap-4 py-[22px] relative cursor-pointer hover:bg-primary/5">
      <div className="flex">
        <Avatar className={"w-[34px] h-[34px] bg-secondary"}>
          <AvatarFallback>
            <Icons.person className="w-4 h-4 fill-foreground" />
          </AvatarFallback>
        </Avatar>
        <Avatar className="-ml-4 w-[34px] h-[34px] bg-primary">
          <AvatarFallback>
            <Icons.person className="w-4 h-4 fill-white" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div>
        <div className="flex items-center gap-4">
          <h3 className="font-bold text-primary">{data?.groupName || "-"}</h3>
          <time className="text-sm" dateTime={latestMessage?.timestamp}>
            {latestMessage?.timestamp
              ? formatDate(latestMessage.timestamp)
              : "-"}
          </time>
        </div>
        <p className="font-bold text-sm">{`${
          latestMessage?.senderId === USER_ID
            ? "You"
            : latestMessage?.senderName || "Unknown"
        } :`}</p>
        <p className="text-sm">{latestMessage?.content || "-"}</p>
      </div>
      {anyUnreadMessages && (
        <div
          className={cn(
            `w-[10px] h-[10px] rounded-full absolute right-0 bottom-10`,
            index + 1 === 1 && "bg-indicators-3",
            index + 1 === 2 && "bg-indicators-4",
            index + 1 === 3 && "bg-indicators-1",
            index + 1 === 4 && "bg-indicators-2"
          )}
        />
      )}
    </div>
  );
}
