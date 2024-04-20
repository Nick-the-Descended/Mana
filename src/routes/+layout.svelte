<script>
    import {initializeApp} from "firebase/app";
    import {getDatabase} from "firebase/database";
    import {getStorage} from "firebase/storage";
    import "../app.css";
    import {page} from '$app/stores';
    import {language} from "$lib/stores.ts";

    // can be moved to env
    const PROJECT_ID = 'mana-scarf'
    const DATABASE_NAME = 'mana-scarf-default-rtdb'

    const firebaseConfig = {
        authDomain: `${PROJECT_ID}.firebaseapp.com`,
        databaseURL: `https://${DATABASE_NAME}.firebaseio.com`,
        projectId: `${PROJECT_ID}`,
        storageBucket: `${PROJECT_ID}.appspot.com`
    };

    const app1 = initializeApp(firebaseConfig);

    const database = getDatabase(app1);
    const storage = getStorage(app1);


    $: path = $page.url.pathname;

    $: activeClass = (p) => path === p ? 'underline' : '';

    let screenSize;
    let screenWidth = calculateValue()

    function calculateValue() {
        if (screenSize <= 1300) {
            return 0.1;
        } else if (screenSize >= 2000) {
            return 12;
        } else {
            const t = (screenSize - 1300) / (2000 - 1300);
            return t * 12;
        }
    }
</script>
<svelte:window bind:innerWidth={screenSize}/>

<div class="flex flex-col justify-between min-h-screen top-0 pt-0"
     style='--screenSize:{calculateValue(screenSize) || 1400};'>
    <div class="phone-nav-wrap pl-16 pr-16 dynamic">
        <nav class="phone-nav p-6 pt-16 pb-0">
            <div class="phone-flex ml-0 mr-0 container flex justify-between items-center">

                <!-- Logo -->

                <a class="phone-logo" href="/">
                    <img src="/logo.svg" alt="Logo" class="h-9 w-auto">
                </a>
                <div class="phone-show flex flex-row">
                    <select bind:value={$language} class="rounded">
                        <option value="EN">EN</option>
                        <option value="GEO">GEO</option>
                    </select>
                </div>

                <!-- Nav Links -->
                <div class="phone-links space-x-10 font-medium">
                    <a href="/scarves"
                       class={activeClass('/scarves')}>{$language === 'EN' ? 'SCARVES' : 'შარფები'}</a>
                    <a href="/about"
                       class={activeClass('/about')}>{$language === 'EN' ? 'ABOUT US' : 'ჩვენს შესახებ'}</a>
                </div>

                <!-- Language Switcher and cart -->
                <div class="phone-hide flex flex-row">
                    <select bind:value={$language} class="rounded">
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

    <div class="squash flex-grow dynamic">
        <slot class="flex-grow"/>
    </div>

    <div class="footer-wrap pb-5 pt-5 bg-gray-200">
        <footer class="flex items-center justify-center">
            <ul class="text-center space-x-4 pt-5 pb-5 flex flex-row">
                <li class="flex flex-col">
                    <a href="tel:+995599173222">+995 599 17 32 22</a>
                </li>
                <li class="flex flex-col">
                    <a href="mailto:info.mana.scarf@gmail.com">info.mana.scarf@gmail.com</a>
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
    .dynamic {
        margin: 0 calc(var(--screenSize) * 1vw) 1rem calc(var(--screenSize) * 1vw) !important;
    }

    .phone-show {
        display: none;
    }

    @media (max-width: 700px) {

        .phone-links {
            width: 100%;
            display: flex;
            justify-content: space-evenly;
        }

        .phone-logo {
            /*padding-bottom: 15px;*/
        }

        .phone-hide {
            display: none;
        }

        .phone-show {
            display: inline-block;
        }

        .phone-flex {
            flex-wrap: wrap;
            gap: 25px;
        }

        .phone-nav {
            padding: 20px 10px 15px 10px;
        }

        .phone-nav-wrap {
            padding: 0;
        }
    }
</style>