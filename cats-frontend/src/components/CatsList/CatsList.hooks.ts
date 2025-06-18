import { useCallback, useEffect, useRef } from "react";
import { fetchCatsApi } from "../../api/cats.api";
import { useCatsContext } from "../../context/cats.context";

export function useDebouncedCats(
  searchCatName: string,
  searchMouseName: string,
  debounceDelay: number = 300
) {
  const {
    actions: { setCats },
  } = useCatsContext();
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
  }, [searchCatName, searchMouseName, debounceDelay, setCats]);

  useEffect(() => {
    searchCatsAndMice();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [searchCatsAndMice]);

  return { searchCatsAndMice };
}

