<script>
    import {page} from "$app/stores";
    import {language} from "$lib/stores.ts";
    import {getDatabase, ref as dbRef, child, get} from "firebase/database";
    import {getStorage, ref as imRef, getDownloadURL} from "firebase/storage";

    const storage = getStorage();
    const db = getDatabase();

    $: images = ["", "", ""];
    $: description = {
        "descriptionEn": [
            "Loading...", ""
        ],
        "descriptionGeo": [
            "იტვირთება...",
            ""
        ],
        "titleEn": "Loading...",
        "titleGeo": "იტვირთება..."
    };

    async function waitForName() {
        return await $page.url.pathname
    }

    $: path = waitForName();

    $: {
        if (path && typeof path === 'string' && path[0] !== '[') {

                fetchImages()
                fetchDescription();
        }
    }

    async function fetchImages() {
        let newImages = ["", "", ""]
        for (let i = 0; i < 3; i++) {
            newImages[i] = await getDownloadURL(imRef(storage, `/data/items/${(await path).split('/')[2]}/00${i + 1}.webp`));
        }
        images = newImages
        return newImages
    }

    let selectedIndex = 0;
    $: selectedImage = images[0];

    let lines = ['pirosmani', 'otskheli', 'cacti...', 'maps']

    let counter = 1;
    $: {
        if (counter < 1) {
            counter = 1
        } else if (counter > 9) {
            counter = 9
        }
    }

    async function fetchDescription() {
        try {
            const db_reference = dbRef(db)
            let snapshot = await get(child(db_reference, `static/data/items/${(await path).split('/')[2]}`));

            if (snapshot.exists())
                return snapshot.val();

        } catch (error) {
            console.error(error);
            return [];
        }
    }

    function getName(line, lan) {
        let mapped = {
            'pirosmani': 'ფიროსმანი',
            'otskheli': 'ოცხელი',
            'cacti...': 'კაკტუსი...',
            'maps': 'რუკები'
        }
        if (lan === 'EN') {
            return line.toUpperCase()
        }
        return mapped[line]
    }

    function getDescription(item, lan) {
        return item.split(':').join(': ')
    }

    function getLine(line) {
        return line === "cacti..." ? "our" : line;
    }

    let screenSize;
</script>
<svelte:window bind:innerWidth={screenSize}/>

<div class="flex-grow w-full pl-16 pr-16 phone-no-pad phone-main-wrap">
    <div class="grid-cols-2 pt-14 phone-no-pad">
        <!-- second nav -->
        <!--        <div class="w-full phone-hidden">-->
        <!--            <ul class="flex flex-row content-start list-none text-2xl">-->
        <!--                {#each lines as line, index}-->
        <!--                    <li class={`mr-2.5`}>-->
        <!--                        <a href={"/scarves/" + getLine(line)}>{getName(line, $language)}</a>-->
        <!--                        {#if index !== lines.length - 1}-->
        <!--                            {' |'}-->
        <!--                        {/if}-->
        <!--                    </li>-->
        <!--                {/each}-->
        <!--            </ul>-->
        <!--        </div>-->

        <!-- container -->
        <div class="center-wrap flex pt-16 justify-between phone-image-container">
            {#await fetchImages()}
                <div class="parent1 pr-10">
                    {#each ["", "", ""] as image, index}
                        <div class="image-border {`div_${index + 1} ${selectedIndex === index ? '_selected' : ''}`}"
                             role="img"
                             on:click={() => {
                     selectedImage = image;
                     selectedIndex = index;
                    }}>
                            <img class="small-image image bg-gray-200" width="150" height="150" src={image}
                                 alt={`Failed to load ${index + 1}`}>
                        </div>
                    {/each}
                    <div class="div_4">
                        <img class="big-image image bg-gray-200" width="1000" height="1000" src={selectedImage}
                             alt="Failed to load selected image">
                    </div>
                </div>
            {:then images}
                {#if screenSize && screenSize < 800}
                    <!-- image selector and preview -->
                    <div class="parent1 pr-10">
                        {#each images as image, index}
                            <div class="image-border {`div_${index + 1} ${selectedIndex === index ? '_selected' : ''}`}"
                                 role="img"
                                 on:click={() => {
                     selectedImage = image;
                     selectedIndex = index;
                    }}>
                                <img class="small-image image bg-gray-200" width="150" height="150" src={image}
                                     alt={`Failed to load ${index + 1}`}>
                            </div>
                        {/each}
                        <div class="div_4">
                            <img class="big-image image bg-gray-200" width="1000" height="1000" src={selectedImage}
                                 alt="Failed to load selected image">
                        </div>
                    </div>
                {:else }
                    <!-- image selector and preview -->
                    <div class="parent pr-10">
                        {#each images as image, index}
                            <div class="image-border {`div${index + 1} ${selectedIndex === index ? 'selected' : ''}`}"
                                 role="img"
                                 on:click={() => {
                                     selectedImage = image;
                                     selectedIndex = index;
                                    }}>
                                <img class="small-image image bg-gray-200" width="150" height="150" src={image}
                                     alt={`Failed to load ${index + 1}`}>
                            </div>
                        {/each}
                        <div class="div4">
                            <img class="big-image image bg-gray-200" width="1000" height="1000" src={selectedImage}
                                 alt="Failed to load selected image">
                        </div>
                    </div>
                {/if}
            {/await}
            <!-- info and checkout -->
            <div class="info-wrap flex flex-col justify-start flex-grow pl-32 pr-10">
                <div class="pb-5">
                    {#await fetchDescription()}
                        <h1 class="text-5xl font-bold pb-0.5">
                            Loading...
                        </h1>
                        <h2 class="text-4xl pb-0.5">
                            Loading...
                        </h2>
                        <p class="text-2xl font-semibold">Loading...</p>
                    {:then desc}
                        <h1 class="text-4xl font-bold pb-6">
                            {$language === "EN" ? desc["titleEn"] : desc["titleGeo"]}
                        </h1>
                        {#if desc['price'] !== 65}
                            <div class="font-semibold ">
                                <div class="text-2xl inline-block font-light line-through">
                                    65
                                </div>
                                <div class="text-2xl inline-block text-red-600">
                                    {desc['price']} {$language === "EN" ? 'GEL' : '₾'}
                                </div>
                            </div>
                        {:else }
                            <p class="text-2xl font-semibold">
                                {desc['price']} {$language === "EN" ? 'GEL' : '₾'}
                            </p>
                        {/if}
                        <div>
                            <ul class="list-disc pl-6">
                                {#each ($language === "EN" ? desc["descriptionEn"] : desc["descriptionGeo"]) as item}
                                    <li class="text-xl">{getDescription(item, $language)}</li>
                                {/each}
                            </ul>
                        </div>
                    {:catch err}
                        <p>Failed loading</p>
                    {/await}
                </div>
            </div>
        </div>
    </div>
</div>


<style lang="postcss">
    @media (max-width: 1700px) {
        .center-wrap {
            display: flex;
            flex-direction: column;
            gap: 30px;
        }

        .info-wrap {
            padding: 15px 0 40px 10px;
        }
    }

    @media (max-width: 700px) {
        .small-image {
            width: 100px;
            height: 100px;
        }

        .big-image {
            height: 300px;
            width: 300px;
        }

        .phone-image-container {
            padding-top: 0;
        }

        .phone-no-pad {
            padding: 0;
        }

        .phone-hidden {
            display: none;
        }

        .phone-main-wrap {
            /*padding: 0;*/
        }

        .center-wrap {
            display: flex;
            flex-direction: column;
            gap: 30px;
            align-items: center;
        }


        .parent1 {
            display: grid;
            grid-template-columns: repeat(3, 100px);
            grid-template-rows: repeat(4, 100px);
            row-gap: 2px;
            padding: 5px;
        }

        ._selected {
            border: 1px solid #007BFF; /* Blue border for the selected image */
            box-sizing: border-box;
        }

        .div_1 {
            grid-area: 4 / 1 / 5 / 2;
        }

        .div_2 {
            grid-area: 4 / 2 / 5 / 3;
        }

        .div_3 {
            grid-area: 4 / 3 / 5 / 4;
        }

        .div_4 {
            grid-area: 1 / 1 / 4 / 4;
        }

        /*.parent {*/
        /*    margin: auto;*/
        /*}*/
    }

    .image-border {
        /*border: solid #9ca3af 1px;*/
        /*background: #d9d9d9;*/
    }

    .parent {
        display: grid;
        grid-template-columns: repeat(4, 150px);
        grid-template-rows: repeat(3, 150px);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
    }

    .div1 {
        grid-area: 1 / 1 / 2 / 2;
    }

    .div2 {
        grid-area: 2 / 1 / 3 / 2;
    }

    .div3 {
        grid-area: 3 / 1 / 4 / 2;
    }

    .div4 {
        grid-area: 1 / 2 / 4 / 5;
    }

    .selected {
        border: 3px solid #007BFF; /* Blue border for the selected image */
        box-sizing: border-box; /* To keep the dimensions consistent */
    }
</style>