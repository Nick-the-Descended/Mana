import type {Load} from '@sveltejs/kit';
import {getDatabase, ref, child, get} from "firebase/database";

interface DataProps {
    data: Record<string, any>;
}

export const load: Load = async (): Promise<{ props: DataProps } | { status: number; error: Error }> => {
    const slugs = ['pirosmani', 'otskheli', 'our', 'maps'];
    let data: Record<string, any> = {};

    const dbRef = ref(getDatabase());
    let snapshot = await get(child(dbRef, `data`));

    if (snapshot.exists()) {
        const parsed = snapshot.val();

        for (const key in parsed) {
            data[key] = parsed[key];
        }
    }

    return {
        props: {
            data
        }
    };
};
