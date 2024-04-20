<script>
    import {page} from "$app/stores";
    import {language} from "$lib/stores.ts";
    import {getStorage, ref, getDownloadURL} from "firebase/storage";

    const storage = getStorage();

    export let allItems = $page.data.props.data;
    let scarfItems = [];

    $: path = $page.url.pathname;

    $: activeClass = (p) => {
        if (path === 'our') {
            return p.endsWith('art')
        }

        return path === p ? 'underline' : '';
    }

    $:{
        if (path) {
            scarfItems = allItems[path.toString().split('/')[2]];
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

    let lines = ['pirosmani', 'otskheli', 'mana art', 'maps']

    function getName(line, lan) {
        let mapped = {
            'pirosmani': 'ფიროსმანი',
            'otskheli': 'ოცხელი',
            'mana art': 'მანას არტი',
            'maps': 'რუკები'
        }
        if (lan === 'EN') {
            return line.toUpperCase()
        }
        return mapped[line]
    }

    function getLine(line) {
        return line === "mana art" ? "our" : line;
    }

</script>

<div class="phone-wrap pl-16">
    <ul class="flex flex-row">
        {#each lines as line}
            <li>
                <a class={activeClass("/scarves/" + getLine(line))}
                   href={"/scarves/" + getLine(line)}>{getName(line, $language)}</a>
            </li>
        {/each}
    </ul>
</div>
<div class="flex-grow flex justify-center h-full w-full">
    <div class="p-12 image-grid content-center justify-around">
        {#each scarfItems as scarf}
            {#await getDownloadURL(ref(storage, scarf.imgSrc))}
                <div class="mb-20 border-2 rounded justify-center">
                    <img src="" width="300" height="300" alt="">
                    <p class="w-full flex content-center justify-center">Loading...</p>
                </div>
            {:then img}
                <a href={scarf.href}
                   class="mb-20 border-1 bg-gray-100 rounded justify-center transform transition-transform duration-300 hover:scale-110">
                    <img src={img} width="300" height="300" alt={scarf.alt}>
                    <!--                    <p class="w-full flex content-center justify-center">{getText(scarf, $language)}</p>-->
                </a>
            {/await}
        {/each}
    </div>
</div>

<style>
    @media (max-width: 640px) {
        .phone-wrap {
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