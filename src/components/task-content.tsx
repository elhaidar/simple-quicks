import { TaskFilterPopover } from "./task-filter-popover";
import { TaskItem } from "./task-item";
import { Accordion } from "./ui/accordion";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";

export function TaskContent() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <TaskFilterPopover />
        <Button className="font-bold">New Task</Button>
      </div>
      <ScrollArea>
        <Popover>
          <Accordion type="multiple">
            <div className="flex gap-[22.5px] border-b">
              <Checkbox className="mt-[24px]" />
              <TaskItem value="item1" />
              <PopoverContent>TES</PopoverContent>
            </div>
          </Accordion>
        </Popover>
      </ScrollArea>
    </div>
  );
}
