"use client";

import { useMenu } from "@/context/MenuContext";
import { useEffect, useRef } from "react";

interface SectionWrapperProps {
  children: React.ReactNode;
}

export function SectionWrapper({ children }: SectionWrapperProps) {
  const { setMenu } = useMenu();
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sectionRef.current &&
        !sectionRef.current.contains(event.target as Node)
      ) {
        setMenu(""); // Set menu to empty string if clicked outside the section
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setMenu]);

  return (
    <section ref={sectionRef} className="w-full h-full relative">
      {children}
    </section>
  );
}
