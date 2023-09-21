<script>
    import {page} from "$app/stores";
    import {language} from "$lib/stores.ts";

    export let allItems = $page.data.props.data;
    let scarfItems = [];

    $: path = $page.url.pathname;

    $: activeClass = (p) => path === p ? 'underline' : '';
    $:{
        if (path) {
            scarfItems = allItems['sale'];
        }
    }

    scarfItems = scarfItems ? scarfItems : [];

    function getText(scarf, lan) {
        let text = lan === 'EN' ? scarf.textEn : scarf.textGeo;
        if (!text) {
            return "Error loading text"
        }

        text = lan === 'EN' ? text.toUpperCase() : text;

        // shorten it to 25 long
        if (text.length > 25) {
            text = text.substring(0, 22) + "..."
        }

        return text
    }

</script>

<div class="flex-grow flex justify-center h-full w-full">
    <div class="p-12 grid content-center grid-cols-4">
        {#each scarfItems as scarf}
            {#await scarf.imgSrc}
                <div class="pl-3 pr-3 pb-20 justify-center">
                    <img src="" width="300" height="300" alt="">
                    <p class="w-full flex content-center justify-center">Loading...</p>
                </div>
            {:then base64}
                <a href={scarf.href}
                   class="pl-3 pr-3 pb-20 justify-center transform transition-transform duration-300 hover:scale-110">
                    <img src={scarf.imgSrc} width="300" height="300" alt={scarf.alt}>
                </a>
            {/await}
        {/each}
    </div>
</div>

<style>
    ul {
        list-style: none;
        display: flex;
    }

    ul li {
        margin-right: 10px;
    }

    ul li:last-child {
        margin-right: 0;
    }

    ul li:not(:last-child):after {
        content: " |";
    }
</style>