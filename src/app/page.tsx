import { Container } from "@/components/container";
import { FloatingButtons } from "@/components/floating-buttons";
import { SectionWrapper } from "@/components/section-wrapper";
import { InboxProvider } from "@/context/InboxContext";
import { MenuProvider } from "@/context/MenuContext";
import { TaskProvider } from "@/context/TaskContext";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <Suspense fallback={<Loading />}>
      <main className="flex-1 max-w-[734px] ml-auto px-[32px] py-[24px] h-screen">
        <MenuProvider>
          <SectionWrapper>
            <InboxProvider>
              <TaskProvider>
                <Container />
              </TaskProvider>
            </InboxProvider>
            <FloatingButtons />
          </SectionWrapper>
        </MenuProvider>
      </main>
    </Suspense>
  );
}
