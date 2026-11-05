"use client";

import { useEffect } from "react";
import { playClick } from "@/lib/sfx";

// Plays a soft click sound on every button/link press, app-wide, via one
// delegated listener instead of touching every button's own onClick.
export default function SfxProvider() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("button, a")) playClick();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
