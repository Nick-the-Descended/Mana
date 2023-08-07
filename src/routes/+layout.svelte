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
                <div class="space-x-4 font-semibold">
                    <a href="/scarves" class={activeClass('/scarves')}>{$language === 'EN' ? 'SCARVES' : 'შარფები'}</a>
                    <!--                    <a href="/gifts" class={activeClass('/gifts')}>GIFTS</a>-->
                    <a href="/sale" class={activeClass('/sale')}>{$language === 'EN' ? 'SALE' : 'ფასდაკლება'}</a>
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

    <div class="pb-5 pt-5 bg-gray-200">
        <!--        <div class="flex justify-center">-->
        <!--            <p class="border-t border-black w-2/5"></p>-->
        <!--        </div>-->
        <footer class="flex items-center justify-center">
            <ul class="text-center space-x-4 pt-5 pb-5 flex flex-row">
                <li class="inline-block"><a href="mailto:info.mana.scarf@gmail.com">info.mana.scarf@gmail.com</a>
                </li>
                <li class="flex space-x-4">
                    <a href="https://www.instagram.com/mana_scarf_mana/" target="_blank" rel="noopener noreferrer">
                        <img src="/insta.svg" alt="Instagram" class="h-6 w-auto">
                    </a>
                </li>
                <li>
                    <a href="https://www.facebook.com/MaNaScarves" target="_blank" rel="noopener noreferrer">
                        <img src="/fb.svg" alt="Facebook" class="h-6 w-auto">
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
</style>