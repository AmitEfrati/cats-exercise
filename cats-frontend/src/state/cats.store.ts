import { useCallback, useState } from "react";
import createContext from 'constate';

import { fetchCatsApi } from "../api/cats.api";

export type TMouse = {
    id?: number;
    name: string;
};

export type TCat = {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
    description: string;
    mice?: TMouse[];
};


function useCats() {
    const [cats, setCats] = useState<TCat[]>([]);

    const fetchCats = useCallback(async () => {

        try {           
            const data = await fetchCatsApi();
            setCats(data)
        } catch (error) {
            console.error('Error fetching cats:', error);
        }
    }, [])

    const addCat = useCallback((cat: TCat) => {
        setCats((prev) => [...prev, cat])
    }, []) 
    

    return { 
        state: { cats },
        actions: { setCats, addCat, fetchCats }
    };
}

const [CatsProvider, useCatsContext] = createContext(useCats)

export { CatsProvider, useCatsContext }