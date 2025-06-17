import { useCallback, useEffect } from "react";
import { fetchCatsApi } from "../api/cats.api";
import { useCatsContext } from "../context/cats.context";

export function useFetchCats(
  name?: string,
  mouseName?: string
): () => Promise<void> {
  const {
    actions: { setCats },
  } = useCatsContext();

  const load = useCallback(async () => {
    try {
      const data = await fetchCatsApi(name, mouseName);
      setCats(data);
    } catch (err) {
      console.error("Error loading cats", err);
    }
  }, [name, mouseName, setCats]);

  useEffect(() => {
    load();
  }, [load]);

  return load;
}
