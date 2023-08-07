<script>
    import {page} from "$app/stores";
    import {language} from "$lib/stores.ts";

    export let allItems = $page.data.props.data;
    let scarfItems = [];

    $: path = $page.url.pathname;

    $: activeClass = (p) => path === p ? 'underline' : '';
    $:{
        if(path){
            scarfItems = allItems[path.toString().split('/')[2]];
        }
    }
    scarfItems = scarfItems ? scarfItems : [];
    function getText(scarf) {
        let text = scarf.text.toUpperCase()

        // shorten it to 25 long
        if (scarf.text.toUpperCase().length > 25) {
            text = text.substring(0, 22) + "..."
        }

        return text
    }

    let lines = ['pirosmani', 'otskheli', 'our', 'maps']
    function getName(line, lan){
        let mapped = {
            'pirosmani' :'ფიროსმანი',
            'otskheli': 'ოცხელი',
            'our':'ჩვენი დიზაინი',
            'maps':'რუკები'
        }
        if (lan === 'EN'){
            return line.toUpperCase()
        }
        return mapped[line]
    }

</script>

<div class="pl-16">
    <ul class="flex flex-row">
        {#each lines as line}
            <li>
                <a class={activeClass("/scarves/" + line)} href={"/scarves/" + line}>{getName(line, $language)}</a>
            </li>
        {/each}
    </ul>
</div>
<div class="flex-grow flex justify-center h-full w-full">
    <div class="p-12 grid content-center grid-cols-4">
        {#each scarfItems as scarf}
            <a href={scarf.href}
               class="pl-3 pr-3 pb-20 justify-center transform transition-transform duration-300 hover:scale-110">
                <img src={scarf.imgSrc} alt={scarf.alt}>
                <p class="w-full flex content-center justify-center">{getText(scarf)}</p>
            </a>
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