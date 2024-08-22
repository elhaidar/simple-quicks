"use client";

import { useMenu } from "@/context/MenuContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
}

export function SectionWrapper({ children }: SectionWrapperProps) {
  const { setMenu } = useMenu();
  const sectionRef = useRef<HTMLElement | null>(null);

  const queryClient = new QueryClient();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sectionRef.current &&
        !sectionRef.current.contains(event.target as Node)
      ) {
        setMenu("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setMenu]);

  return (
    <QueryClientProvider client={queryClient}>
      <section ref={sectionRef} className="w-full h-full relative">
        {children}
      </section>
    </QueryClientProvider>
  );
}
