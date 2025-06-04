import { useEffect, useState } from "react";
import createContainer from 'constate';

export type TMouse = {
    id?: number;
    name: string;
};

export type TCat = {
    id?: number;
    firstName: string;
    lastName: string;
    image: string;
    description: string;
    mice: TMouse[];
};

const CATS_URL = 'http://localhost:3001/cats';

function useCats() {
    const [cats, setCats] = useState<TCat[]>([]);

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const response = await fetch(CATS_URL);
                const data = await response.json();
                setCats(data);
            } catch(error) {
                console.error('Error fetching cats:', error)
            }
        };
        fetchCats();
    },[])

    const addCat = (cat: TCat) => {
        setCats((prev) => [...prev, cat])
    };

    return { cats, setCats, addCat };
}

const [CatsProvider, useCatsContainer] = createContainer(useCats)

export { CatsProvider, useCatsContainer}