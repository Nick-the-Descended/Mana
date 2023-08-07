<script>
    import {language} from "$lib/stores.ts";

    let images = ["https://random.imagecdn.app/800/800", "https://random.imagecdn.app/800/801", "https://random.imagecdn.app/800/802"]
    let selectedImage = images[0];
    let selectedIndex = 0;

    let description = ["this is great", "even better", "very cool"]

    let lines = ['pirosmani', 'otskheli', 'our work', 'maps']

    let counter = 1;
    $: {
        if (counter < 1){
            counter = 1
        }
        else if (counter > 9){
            counter = 9
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
</script>

<div class="flex-grow w-full pl-16 pr-16">
    <div class="grid-cols-2 pt-14">
        <!-- second nav -->
        <div class="w-full">
            <ul class="flex flex-row content-start list-none text-2xl">
                {#each lines as line, index}
                    <li class={`mr-2.5`}>
                        <a href={"/scarves/" + line}>{getName(line, $language)}</a>
                        {#if index !== description.length}
                            {' |'}
                        {/if}
                    </li>
                {/each}
            </ul>
        </div>

        <!-- container -->
        <div class="flex flex-row pt-16 justify-between">
            <!-- image selector and preview -->
            <div class="parent pr-10">
                {#each images as image, index}
                    <div class={`div${index + 1} ${selectedIndex === index ? 'selected' : ''}`}
                         on:click={() => {
                     selectedImage = image;
                     selectedIndex = index;
                }}>
                        <img class="image" src={image} alt={`some alt${index + 1}`}>
                    </div>
                {/each}
                <div class="div4">
                    <img class="image" src={selectedImage} alt="selected image">
                </div>
            </div>

            <!-- info and checkout -->
            <div class="flex flex-col justify-start flex-grow pl-32 pr-10">
                <div class="pb-5">
                    <h1 class="text-5xl font-bold pb-0.5">
                        Best Artist
                    </h1>
                    <h2 class="text-4xl pb-0.5">
                        Great Title
                    </h2>
                    <p class="text-2xl font-semibold">price in $</p>
                </div>
                <div class="pt-10 pb-10 flex flex-row justify-start space-x-2.5">
                    <button class="border-green-300 bg-green-300 border-4 rounded w-16 h-16 flex items-center content-center justify-center">share</button>
                    <button class="border-green-300 bg-green-300 border-4 rounded w-64 h-16 flex items-center content-center justify-center text-2xl font-bold">Add To Cart</button>
                    <div class="flex flex-col justify-between ">
                        <button class="h-7 w-7 border-2 rounded border-green-300 bg-green-300" on:click={() => counter++}>+</button>
                        <button class="h-7 w-7 border-2 rounded border-green-300 bg-green-300" on:click={() => counter--}>-</button>
                    </div>
                    <div class="border-2 flex justify-center items-center w-16 h-16 rounded text-3xl">{counter}</div>
                </div>
                <div>
                    <ul class="list-disc pl-6">
                        {#each description as item}
                            <li class="text-xl">{item}</li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>


<style lang="postcss">
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
        border: 3px solid #007BFF;  /* Blue border for the selected image */
        box-sizing: border-box;     /* To keep the dimensions consistent */
    }
</style>