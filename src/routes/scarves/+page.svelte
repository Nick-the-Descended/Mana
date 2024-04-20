<script>
    import {language} from "$lib/stores.ts";
    import {getStorage, ref, getDownloadURL} from "firebase/storage";

    const storage = getStorage();

    let scarfLines = [
        {
            href: "/scarves/pirosmani",
            imgSrc: "/scarves/pirosmani.webp",
            alt: "pirosmani",
            textEn: "pirosmani",
            textGeo: "ფიროსმანი"
        },
        {
            href: "/scarves/otskheli",
            imgSrc: "/scarves/otskheli.webp",
            alt: "otskheli",
            textEn: "otskheli",
            textGeo: "ოცხელი"
        },
        {
            href: "/scarves/our",
            imgSrc: "/scarves/our_design.webp",
            alt: "our",
            textEn: "mana art",
            textGeo: "მანას არტი"
        },
        {
            href: "/scarves/maps",
            imgSrc: "/scarves/maps.webp",
            alt: "maps",
            textEn: "maps",
            textGeo: "რუკები"
        },
    ];
</script>

<div class="phone-wrap pl-16 pr-16 flex-grow flex flex-col w-full">
    <div class="pt-10 flex justify-center">
        <h1 class="font-semibold">{$language === 'EN' ? 'SCARVES' : 'შარფები'}</h1>
    </div>
    <div class="flex flex-wrap pt-10 grid-cols-4 justify-center items-center">
        {#each scarfLines as scarf}
            {#await getDownloadURL(ref(storage, scarf.imgSrc))}
                <div class="p-3">
                    <div class="flex flex-grow justify-center items-center">
                        <img src="" width="300" height="300" alt="">
                    </div>
                    <p class="pt-2 font-semibold w-full flex content-center justify-center">
                        Loading...
                    </p>
                </div>
            {:then img}
                <a href={scarf.href} class="p-3">
                    <div class="border-1 bg-gray-100 rounded flex flex-grow justify-center items-center">
                        <img class="transition-all duration-200 hover:scale-105" src={img} alt={scarf.alt}>
                    </div>
                    <p class="pt-2 font-semibold w-full flex content-center justify-center">
                        {$language === 'EN' ? scarf.textEn.toUpperCase() : scarf.textGeo}
                    </p>
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
        }
    }

    .w-full.flex.content-center.justify-center {
        letter-spacing: 0.1em; /* Adjust the value to increase or decrease the spacing */
    }

    h1 {
        font-size: 28px;
    }
</style>