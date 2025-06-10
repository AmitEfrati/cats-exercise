import { TCat } from '../state/cats.store';

export const CATS_URL = 'http://localhost:3001/cats';

export const fetchCatsApi = async (): Promise<TCat[]> => {
    const response = await fetch(CATS_URL);
    if (!response.ok) {
        throw new Error(`Error fetching cats: ${response.statusText}`);
    }
    return response.json();
}