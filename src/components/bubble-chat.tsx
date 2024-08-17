import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Message } from "@/schemas/chat";
import { USER_ID } from "@/lib/constant";

interface BubbleChatProps {
  variant?: "left" | "right";
  color?: string;
  message: Message;
}

export function BubbleChat({
  variant = "left",
  color,
  message,
}: BubbleChatProps) {
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h24",
  });

  return (
    <div
      className={cn("flex flex-col gap-1", variant === "right" && "items-end")}
    >
      <p
        className={cn(
          "text-sm font-bold text-chats-1-foreground",
          variant === "right" && "text-right text-chats-3-foreground",
          color && `text-${color}-foreground`
        )}
      >
        {variant === "right" ? "You" : message.senderName}
      </p>
      <div
        className={cn("flex gap-2", variant === "right" && "flex-row-reverse")}
      >
        <div
          className={cn(
            "p-[10px] bg-chats-1 rounded-md max-w-[518px]",
            variant === "right" && "bg-chats-3",
            color && `bg-${color}`
          )}
        >
          <p className="text-sm mb-1">{message.content}</p>
          <time className="text-xs">{time}</time>
        </div>
        <Popover>
          <PopoverTrigger
            asChild
            className={cn(
              "sticky",
              variant === "left"
                ? "left-[50%] right-auto"
                : "right-[50%] left-auto"
            )}
          >
            <Button variant="icon" size="icon16">
              <Ellipsis />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[126px] p-0 border-border-secondary">
            <div className="flex flex-col items-start rounded-none">
              {message.senderId === USER_ID && (
                <Button
                  className={cn(
                    "text-base text-primary w-full flex justify-start border-b-[1px] border-border-secondary",
                    variant === "left" && "hidden"
                  )}
                  variant="ghost-secondary"
                  size="sm"
                >
                  Edit
                </Button>
              )}
              <Button
                className="text-base text-destructive w-full flex justify-start"
                variant="ghost-secondary"
                size="sm"
              >
                Delete
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
