export const deleteMouseApi = async (id: number): Promise<void> => {
    const response = await fetch(`http://localhost:3001/mice/${id}`, {
        method: 'DELETE',
    });
    
    //not sure if needed here
    if (!response.ok) {
        throw new Error(`Error deleting mouse: ${response.statusText}`);
    }
}