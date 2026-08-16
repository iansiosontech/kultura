"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { allStations } from "@/lib/transitLines";

const STORAGE_KEY = "kultura-transit-visited-v3";

type VisitedContextType = {
  visited: string[];
  total: number;
  isVisited: (id: string) => boolean;
  markVisited: (id: string) => void;
  hydrated: boolean;
};

const VisitedContext = createContext<VisitedContextType | null>(null);

export function VisitedProvider({ children }: { children: ReactNode }) {
  const [visited, setVisited] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as string[];
        const validIds = new Set<string>(allStations.map((s) => s.id));
        setVisited(parsed.filter((id) => validIds.has(id)));
      }
    } catch {
      // ignore corrupt/missing storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
    } catch {
      // storage unavailable — fail silently
    }
  }, [visited, hydrated]);

  const markVisited = (id: string) => {
    setVisited((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const value = useMemo<VisitedContextType>(
    () => ({
      visited,
      total: allStations.length,
      isVisited: (id: string) => visited.includes(id),
      markVisited,
      hydrated,
    }),
    [visited, hydrated]
  );

  return (
    <VisitedContext.Provider value={value}>
      {children}
    </VisitedContext.Provider>
  );
}

export function useVisited() {
  const ctx = useContext(VisitedContext);
  if (!ctx) {
    throw new Error("useVisited must be used within a VisitedProvider");
  }
  return ctx;
}