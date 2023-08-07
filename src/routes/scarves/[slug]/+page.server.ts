import type { Load } from '@sveltejs/kit';

interface DataProps {
    data: Record<string, any>;
}

export const load: Load = async (): Promise<{ props: DataProps } | { status: number; error: Error }> => {
    // List of all possible slugs (or filenames without the .json extension)
    const slugs = ['pirosmani', 'otskheli', 'our', 'maps']; // Adjust this list as needed

    try {
        let data: Record<string, any> = {};

        for (const slug of slugs) {
            const module = await import(`../../../data/${slug}.json`);
            data[slug] = module.default;
        }

        return {
            props: {
                data
            }
        };
    } catch (err) {
        console.error(`Failed to load data`, err);
        return {
            status: 404,
            error: new Error('Not found')
        };
    }
};
