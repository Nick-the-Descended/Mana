<script>
    import "../app.css";
    import {page} from '$app/stores';

    import {language} from "$lib/stores.ts";

    $: path = $page.url.pathname;

    $: activeClass = (p) => path === p ? 'underline' : '';
</script>

<div class="flex flex-col justify-between min-h-screen top-0 pt-0">
    <div class="pl-16 pr-16 squash">
        <nav class="p-6 pt-16 pb-0">
            <div class="ml-0 mr-0 container flex justify-between items-center">

                <!-- Logo -->
                <a href="/">
                    <img src="/logo.svg" alt="Logo" class="h-9 w-auto">
                </a>

                <!-- Nav Links -->
                <div class="space-x-10 font-medium">
                    <a href="/scarves"
                       class={activeClass('/scarves')}>{$language === 'EN' ? 'SCARVES' : 'შარფები'}</a>
                    <a href="/sale"
                       class={activeClass('/sale')}>{$language === 'EN' ? 'SALE' : 'ფასდაკლება'}</a>
                    <a href="/about"
                       class={activeClass('/about')}>{$language === 'EN' ? 'ABOUT US' : 'ჩვენს შესახებ'}</a>
                </div>

                <!-- Language Switcher and cart -->
                <div class="flex flex-row">
                    <a class="pr-0.5" href="/">
                        <img src="/shopping_bag.svg" alt="shopping_bag" class="h-6 w-auto">
                    </a>
                    <select bind:value={$language} class="border-2 rounded">
                        <option value="EN">EN</option>
                        <option value="GEO">GEO</option>
                    </select>
                </div>
            </div>
        </nav>

        <div class="pt-0 flex justify-center">
            <p class="border-t border-black w-full"></p>
        </div>
    </div>

    <div class="squash flex-grow">
        <slot class="flex-grow"/>
    </div>

    <div class="footer-wrap pb-5 pt-5 bg-gray-200">
        <footer class="flex items-center justify-center">
            <ul class="text-center space-x-4 pt-5 pb-5 flex flex-row">
                <li class="inline-block"><a href="mailto:info.mana.scarf@gmail.com">info.mana.scarf@gmail.com</a>
                </li>
                <li class="flex space-x-4">
                    <a href="https://www.instagram.com/mana_scarf_mana/" target="_blank" rel="noopener noreferrer">
                        <img src="/insta.svg" height="18" width="auto" alt="Instagram" class="">
                    </a>
                </li>
                <li>
                    <a href="https://www.facebook.com/MaNaScarves" target="_blank" rel="noopener noreferrer">
                        <img src="/fb.svg" height="18" width="auto" alt="Facebook" class="">
                    </a>
                </li>
            </ul>
        </footer>
    </div>
</div>

<style lang="postcss">
    .squash {
        margin: 0 14rem 1rem 14rem;
    }

    @media (max-width: 640px) {
        .footer-wrap {
            display: none;
        }
    }
</style>