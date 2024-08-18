import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Message } from "@/schemas/chat";
import { useInbox } from "@/context/InboxContext";
import { cn } from "@/lib/utils";

interface PreviewMessageBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  message: Message;
  isReplying?: boolean;
  className?: string;
}

export function PreviewMessageBox({
  message,
  isReplying,
  className,
}: PreviewMessageBoxProps) {
  const { setEditMessage } = useInbox();

  return (
    <div
      className={cn(
        "bg-secondary-2 pt-[15px] pb-8 px-[17px] rounded-lg border-[1px] border-border w-full absolute bottom-8 -z-[0]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="font-bold text-sm">
          {isReplying ? `Reply to ${message.senderName}` : "Edit message"}
        </p>
        <Button
          type="button"
          variant={"icon"}
          size={"icon16"}
          onClick={() => {
            setEditMessage(null);
          }}
        >
          <X />
        </Button>
      </div>
      <p className="text-sm mt-1 max-w-[500px]">{message.content}</p>
    </div>
  );
}
