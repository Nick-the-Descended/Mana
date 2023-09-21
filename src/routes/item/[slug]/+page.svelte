<script>
    import {page} from "$app/stores";
    import {language} from "$lib/stores.ts";

    let images = ["", "", ""];
    let description;
    $: path = $page.url.pathname;
    $: {
        if ($page.url.pathname) {
            images = Array.from({length: 3}, (_, i) => `/data/items/${path.split('/')[2]}/00${i + 1}.webp`);
            description = fetchDescription();
        }
    }
    let selectedIndex = 0;
    $: selectedImage = images[0];

    let lines = ['pirosmani', 'otskheli', 'our', 'maps']

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
            const response = await fetch(`/data/items/${path.split('/')[2]}/desc.json`);
            if (!response.ok) {
                throw new Error(`Failed to fetch`);
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    function getName(line, lan) {
        let mapped = {
            'pirosmani': 'ფიროსმანი',
            'otskheli': 'ოცხელი',
            'our': 'ჩვენი დიზაინი',
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
</script>

<div class="flex-grow w-full pl-16 pr-16">
    <div class="grid-cols-2 pt-14">
        <!-- second nav -->
        <div class="w-full">
            <ul class="flex flex-row content-start list-none text-2xl">
                {#each lines as line, index}
                    <li class={`mr-2.5`}>
                        <a href={"/scarves/" + line}>{getName(line, $language)}</a>
                        {#if index !== lines.length - 1}
                            {' |'}
                        {/if}
                    </li>
                {/each}
            </ul>
        </div>

        <!-- container -->
        <div class="center-wrap flex pt-16 justify-between">
            <!-- image selector and preview -->
            <div class="parent pr-10">
                {#each images as image, index}
                    <div class="image-border {`div${index + 1} ${selectedIndex === index ? 'selected' : ''}`}"
                         role="img"
                         on:click={() => {
                     selectedImage = image;
                     selectedIndex = index;
                    }}>
                        <img class="image bg-gray-200" width="150" height="150" src={image} alt={`Failed to load ${index + 1}`}>
                    </div>
                {/each}
                <div class="div4">
                    <img class="image bg-gray-200" width="1000" height="1000" src={selectedImage}
                         alt="Failed to load selected image">
                </div>
            </div>

            <!-- info and checkout -->
            <div class="info-wrap flex flex-col justify-start flex-grow pl-32 pr-10">
                <div class="pb-5">
                    {#await description}
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
                    {:catch err}
                        <p>Failed loading</p>
                    {/await}
                </div>
<!--                <div class="pt-6 pb-10 flex flex-row justify-start space-x-2.5">-->
<!--                    <button class="border-green-300 bg-green-300 border-4 rounded w-16 h-16 flex items-center content-center justify-center">-->
<!--                        share-->
<!--                    </button>-->
<!--                    <button disabled-->
<!--                            class="border-green-200 bg-green-200 border-4 rounded w-64 h-16 flex items-center content-center justify-center text-2xl font-bold">-->
<!--                        Add To Cart-->
<!--                    </button>-->
<!--                    <div class="flex flex-col justify-between ">-->
<!--                        <button class="h-7 w-7 border-2 rounded border-green-300 bg-green-300"-->
<!--                                on:click={() => counter++}>+-->
<!--                        </button>-->
<!--                        <button class="h-7 w-7 border-2 rounded border-green-300 bg-green-300"-->
<!--                                on:click={() => counter&#45;&#45;}>- -->
<!--                        </button>-->
<!--                    </div>-->
<!--                    <div class="border-2 flex justify-center items-center w-16 h-16 rounded text-3xl">{counter}</div>-->
<!--                </div>-->
                <div>
                    {#await description}
                        <p>Loading Description</p>
                    {:then desc}
                        <ul class="list-disc pl-6">
                            {#each ($language === "EN" ? desc["descriptionEn"] : desc["descriptionGeo"]) as item}
                                <li class="text-xl">{getDescription(item, $language)}</li>
                            {/each}
                        </ul>
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
        /*.parent {*/
        /*    margin: auto;*/
        /*}*/
    }
    .image-border{
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