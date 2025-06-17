import { useState, useEffect, useCallback, useRef } from "react";
import { fetchCatsApi } from "../api/cats.api";
import type { TCat } from "../context/cats.context";

export function useDebouncedCats(
  searchCatName: string,
  searchMouseName: string,
  debounceDelay: number = 300
): { cats: TCat[]; searchCatsAndMice: () => void } {
  const [cats, setCats] = useState<TCat[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const searchCatsAndMice = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (abortRef.current) abortRef.current.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    timerRef.current = setTimeout(async () => {
      try {
        const fetchedCats = await fetchCatsApi(searchCatName, searchMouseName);
        setCats(fetchedCats);
      } catch (error: any) {
        if (error.name === "AbortError") return;
        console.error("Error fetching cats:", error);
        setCats([]);
      }
    }, debounceDelay);
  }, [searchCatName, searchMouseName, debounceDelay]);

  useEffect(() => {
    searchCatsAndMice();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [searchCatsAndMice]);

  return { cats, searchCatsAndMice };
}
