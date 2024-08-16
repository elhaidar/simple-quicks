import { Container } from "@/components/container";
import { FloatingButtons } from "@/components/floating-buttons";
import { MenuProvider } from "@/context/MenuContext";

export default function Home() {
  return (
    <MenuProvider>
      <section className="w-full h-full relative">
        <Container />
        <FloatingButtons />
      </section>
    </MenuProvider>
  );
}
