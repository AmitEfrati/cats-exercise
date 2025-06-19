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

    const removeMouse = useCallback((catId: number, mouseId: number) => {
        setCats((prevCats) =>
            prevCats.map((cat) => 
                cat.id === catId
                    ? {
                        ...cat,
                        mice: cat.mice?.filter((mouse) => mouse.id !== mouseId),
                    }
                    : cat
            )
        );
    }, []);  
    
    return { 
        state: { cats },
        actions: { setCats, addCat, removeMouse }
    };
}

export const [CatsProvider, useCatsContext] = createContext(useCats);