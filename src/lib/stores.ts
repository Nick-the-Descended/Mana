import {writable} from 'svelte/store';

// interface LoadInput {
//     cookies: {
//         get: (name: string) => string | undefined;
//         set: (name: string, value: string, options: { path: string }) => void;
//     };
// }
//
// interface LoadOutput {
//     lastUsedLanguage?: string;
// }
//
// export function load({ cookies }: LoadInput): LoadOutput {
//     const lastUsedLanguage = cookies.get('lastUsedLanguage') || 'EN';
//
//     cookies.set('lastUsedLanguage', lastUsedLanguage, { path: '/' });
//
//     return {
//         lastUsedLanguage
//     };
// }

const initialLanguage = getCookie('lastUsedLanguage') || 'EN';
export const language = writable(initialLanguage);

function getCookie(name: string): string | undefined {
    if (import.meta.env.SSR) return undefined;

    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop()?.split(";").shift();
}

// Subscribe to changes to update the cookie
if (!import.meta.env.SSR) {
    language.subscribe(value => {
        document.cookie = `lastUsedLanguage=${value}; path=/`;
    });
}