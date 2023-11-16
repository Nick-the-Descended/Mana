<script>
    import {page} from "$app/stores";
    import {language} from "$lib/stores.ts";
    import {getStorage, ref, getDownloadURL} from "firebase/storage";

    const storage = getStorage();

    export let allItems = $page.data.props.data;
    let scarfItems = [];

    $: path = $page.url.pathname;

    $: activeClass = (p) => path === p ? 'underline' : '';
    $:{
        if (path) {
            scarfItems = allItems['sale'];
            if (!isIterable(scarfItems)){
                scarfItems = [];
            }
        }
    }

    function isIterable(obj) {
        return obj != null && typeof obj[Symbol.iterator] === 'function';
    }

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
    <div class="p-12 image-grid content-center justify-around">
        {#each scarfItems as scarf}
            {#await getDownloadURL(ref(storage, scarf.imgSrc))}
                <div class="pl-3 pr-3 pb-20 justify-center">
                    <img src="" width="300" height="300" alt="">
                    <p class="w-full flex content-center justify-center">Loading...</p>
                </div>
            {:then img}
                <a href={scarf.href}
                   class="border-1 bg-gray-100 rounded pl-3 pr-3 mb-20 justify-center transform transition-transform duration-300 hover:scale-110">
                    <img src={img} width="300" height="300" alt={scarf.alt}>
                </a>
            {/await}
        {/each}
    </div>
</div>

<style>
    @media (max-width: 640px) {
        .phone-wrap{
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: space-evenly;
        }
    }

    .image-grid {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, 300px);
    }
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