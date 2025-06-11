import { TCat } from '../state/cats.store';

export const CATS_URL = 'http://localhost:3001/cats';

export const fetchCatsApi = async (
    name?: string,
    mouseName?: string
): Promise<TCat[]> => {
    const url = new URL(CATS_URL);

    if(name) {
        url.searchParams.append('name', name);
    }
    if(mouseName) {
        url.searchParams.append('mouseName', mouseName);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
        throw new Error(`Error fetching cats: ${response.statusText}`);
    }
    return await response.json();
}