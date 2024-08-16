import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Loader = ({ className, text }: { className?: string; text: string }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <Loader2
        className={cn("h-16 w-16 text-[#c4c4c4] animate-spin", className)}
      />
      <p className="text-sm font-bold">{text}</p>
    </div>
  );
};

export default Loader;
