import type { Load } from '@sveltejs/kit';

interface DataProps {
    data: Record<string, any>;
}

export const load: Load = async (): Promise<{ props: DataProps } | { status: number; error: Error }> => {
    try {
        let data: Record<string, any> = {};


        console.log("\n\n")
        const module = await import(`../../data/sale.json`);
        data['sale'] = module.default;


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
