import { formatDateWithDayName } from "@/lib/dateHelper";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ChatDayDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: string;
  className?: string;
  variant?: "default" | "destructive";
}

export function ChatDayDivider({
  date = "2021-09-06",
  className,
  variant = "default",
  ...props
}: ChatDayDividerProps) {
  const formattedDate = formatDateWithDayName(new Date(date));

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
        {formattedDate}
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
