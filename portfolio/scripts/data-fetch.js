export async function fetchData() {
    try {
        const response = await fetch('./data/projects.json');
        if (!response.ok) throw new Error('Network error');
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}