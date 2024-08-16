import { Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function BubbleChat() {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-bold text-chats-1-foreground">Mary Hilda</p>
      <div className="flex gap-2">
        <div className="p-[10px] bg-chats-1 rounded-md max-w-[518px]">
          <p className="text-sm mb-1">
            Hello Obaidullah, I will be your case advisor for case #029290. I
            have assigned some homework for you to fill. Please keep up with the
            due dates. Should you have any questions, you can message me
            anytime. Thanks.
          </p>
          <time className="text-xs">19:00</time>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="icon" size="icon16">
              <Ellipsis />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[126px] p-0 border-border-secondary">
            <div className="flex flex-col items-start rounded-none">
              <Button
                className="text-base text-primary w-full flex justify-start border-b-[1px] border-border-secondary"
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
