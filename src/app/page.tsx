import { Container } from "@/components/container";
import { FloatingButtons } from "@/components/floating-buttons";
import { SectionWrapper } from "@/components/section-wrapper";
import { InboxProvider } from "@/context/InboxContext";
import { MenuProvider } from "@/context/MenuContext";
import { TaskProvider } from "@/context/TaskContext";
import { Suspense } from "react";
import Loading from "./loading";

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

async function getTodos() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`,
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

async function getAllData() {
  const [chats, todos] = await Promise.all([getChats(), getTodos()]);
  return { chats, todos };
}

export default async function Home() {
  const { chats, todos } = await getAllData();

  return (
    <Suspense fallback={<Loading />}>
      <main className="flex-1 max-w-[734px] ml-auto px-[32px] py-[24px] h-screen">
        <MenuProvider>
          <SectionWrapper>
            <InboxProvider>
              <TaskProvider>
                <Container chats={chats} todos={todos} />
              </TaskProvider>
            </InboxProvider>
            <FloatingButtons />
          </SectionWrapper>
        </MenuProvider>
      </main>
    </Suspense>
  );
}
