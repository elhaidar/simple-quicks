import { Container } from "@/components/container";
import { FloatingButtons } from "@/components/floating-buttons";
import { SectionWrapper } from "@/components/section-wrapper";
import { InboxProvider } from "@/context/InboxContext";
import { MenuProvider } from "@/context/MenuContext";

export default function Home() {
  return (
    <MenuProvider>
      <SectionWrapper>
        <InboxProvider>
          <Container />
        </InboxProvider>
        <FloatingButtons />
      </SectionWrapper>
    </MenuProvider>
  );
}
