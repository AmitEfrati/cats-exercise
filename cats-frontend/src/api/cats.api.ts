import type { TCat } from '../context/cats.context';

export const CATS_URL = 'http://localhost:3001/cats';

export const fetchCatsApi = async (
    name?: string,
    mouseName?: string
): Promise<TCat[]> => {
    const url = new URL(CATS_URL);

    if(name) url.searchParams.append('name', name);
    if(mouseName) url.searchParams.append('mouseName', mouseName);
    
    const response = await fetch(url.toString());
    return response.json();
}

export const createCatApi = async (catPayLoad: Omit<TCat, 'id'>): Promise<TCat> => {
    const response = await fetch(CATS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(catPayLoad),
    });

    return response.json();
};