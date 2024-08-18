import { Container } from "@/components/container";
import { FloatingButtons } from "@/components/floating-buttons";
import { SectionWrapper } from "@/components/section-wrapper";
import { InboxProvider } from "@/context/InboxContext";
import { MenuProvider } from "@/context/MenuContext";

async function getChats() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`,
      {
        cache: "no-store",
        method: "GET",
      }
    );
    const { data } = await response.json();
    return data;
  } catch (err) {
    return [];
  }
}

export default async function Home() {
  const chats = await getChats();

  return (
    <MenuProvider>
      <SectionWrapper>
        <InboxProvider>
          <Container chats={chats} />
        </InboxProvider>
        <FloatingButtons />
      </SectionWrapper>
    </MenuProvider>
  );
}
