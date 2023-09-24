import type {Load} from '@sveltejs/kit';
import {child, get, getDatabase, ref} from "firebase/database";

interface DataProps {
    data: Record<string, any>;
}

export const load: Load = async (): Promise<{ props: DataProps } | { status: number; error: Error }> => {
    let data: Record<string, any> = {};

    const dbRef = ref(getDatabase());
    let snapshot = await get(child(dbRef, `data/sale`));

    if (snapshot.exists()) {
        data['sale'] = snapshot.val();
    }
    return {
        props: {
            data
        }
    };
};
