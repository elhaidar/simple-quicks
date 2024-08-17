"use client";

import { useInbox } from "@/context/InboxContext";
import { Icons } from "./icons";
import { Input } from "./ui/input";

export function SearchChat() {
  const { search, setSearch } = useInbox();

  return (
    <div className="flex justify-between items-center bg-white z-[10] sticky top-0 py-6 px-4 md:px-8">
      <Input
        type="text"
        placeholder="Search"
        className="px-8 md:px-16 placeholder:text-foreground"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <Icons.search className="fill-foreground absolute right-12 md:right-16" />
    </div>
  );
}
