import { MICE_URL } from "./urls";

export const deleteMouseApi = async (id: number): Promise<void> => {
    const response = await fetch(`${MICE_URL}/${id}`, {
        method: 'DELETE',
    });

    const result = (await response.json()) as { ok: boolean };

    if (!result.ok) {
        throw new Error('Server failed to delete mouse');
    }
}