import { cn } from "@/lib/utils";

interface ChatDayDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  datetime?: string;
  className?: string;
  variant?: "default" | "destructive";
}

export function ChatDayDivider({
  datetime = "Today June 09, 2021",
  className,
  variant = "default",
  ...props
}: ChatDayDividerProps) {
  return (
    <div
      className={cn("flex justify-center items-center my-3", className)}
      {...props}
    >
      <div
        className={cn(
          "bg-foreground h-px w-full",
          variant === "destructive" && "bg-destructive"
        )}
      ></div>
      <div
        className={cn(
          "mx-6 font-bold min-w-fit",
          variant === "destructive" && "text-destructive"
        )}
      >
        {datetime}
      </div>
      <div
        className={cn(
          "bg-foreground h-px w-full",
          variant === "destructive" && "bg-destructive"
        )}
      ></div>
    </div>
  );
}
