import { Icons } from "./icons";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function GroupItem() {
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
          <h3 className="font-bold text-primary">109220-Naturalization</h3>
          <time className="text-sm" dateTime="02/06/2021 10:45">
            02/06/2021 10:45
          </time>
        </div>
        <p className="font-bold text-sm">Cameron Phillips :</p>
        <p className="text-sm">Please check this out!</p>
      </div>
      <div className="w-[10px] h-[10px] bg-destructive rounded-full absolute right-0 bottom-10" />
    </div>
  );
}
