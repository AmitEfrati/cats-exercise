import type { TCat } from '../context/cats.context';
import { CATS_URL } from './urls';

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

  const newCat = (await response.json()) as TCat;
  return newCat;
};