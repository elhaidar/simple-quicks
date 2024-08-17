import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";

interface BubbleChatProps {
  variant?: "left" | "right";
  color?: string;
}

export function BubbleChat({ variant = "left", color }: BubbleChatProps) {
  return (
    <div
      className={cn("flex flex-col gap-1", variant === "right" && "items-end")}
    >
      <p
        className={cn(
          "text-sm font-bold text-chats-1-foreground",
          variant === "right" && "text-right text-chats-2-foreground",
          color && `text-${color}-foreground`
        )}
      >
        Mary Hilda
      </p>
      <div
        className={cn("flex gap-2", variant === "right" && "flex-row-reverse")}
      >
        <div
          className={cn(
            "p-[10px] bg-chats-1 rounded-md max-w-[518px]",
            variant === "right" && "bg-chats-2",
            color && `bg-${color}`
          )}
        >
          <p className="text-sm mb-1">
            Lorem ipsum dolor sit amet, consectetur
          </p>
          <time className="text-xs">19:00</time>
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
