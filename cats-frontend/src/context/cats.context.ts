import { useCallback, useState } from "react";
import createContext from 'constate';

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

    const addCat = useCallback((cat: TCat) => {
        setCats((prev) => [...prev, cat])
    }, []) 
    
    return { 
        state: { cats },
        actions: { setCats, addCat }
    };
}

export const [CatsProvider, useCatsContext] = createContext(useCats);