import { Container } from "@/components/container";
import { FloatingButtons } from "@/components/floating-buttons";
import { SectionWrapper } from "@/components/section-wrapper";
import { InboxProvider } from "@/context/InboxContext";
import { MenuProvider } from "@/context/MenuContext";

let isLoading = true;

async function getChats() {
  const response = await fetch("http://localhost:3001/chats", {
    cache: "no-store",
  });
  const data = await response.json();
  isLoading = false;
  return data;
}

export default async function Home() {
  const chats = await getChats();

  return (
    <MenuProvider>
      <SectionWrapper>
        <InboxProvider>
          <Container chats={chats} initialLoading={isLoading} />
        </InboxProvider>
        <FloatingButtons />
      </SectionWrapper>
    </MenuProvider>
  );
}
