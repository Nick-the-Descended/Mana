<script>
    import {language} from "$lib/stores.ts";

    let en_paragraphs = [
        "MaNa is a new Georgian brand creating unique designs on scarves. MaNa guarantees quality, taste, simplicity, and excellent service.",
        "United under the brand name MaNa two friends - Tbilisi Art Academy graduates Maya Jikia (Textile & Jewellery Designer) and Natalia Mujirishvili (Graphic Designer) - creating scarves with the unique design.",
        "The mission of “MaNa” is to introduce Georgia and Georgian Painters to the world, and give you a chance to keep a small souvenir as a reminder of their artwork."
    ]
    let geo_paragraphs = [
        "„მანა“ ქართული ბრენდია რომელიც გთავაზობთ შარფებს გამორჩეული დიზაინით. \n" +
        "ყველა დიზაინი  მანას მიერ არის შექმნილი, მათ შორის  არის ქართველი მხატვრების: ნიკო ფიროსმანისა და პეტრე ოცხელის ნამუშევრებიც, რომლებიც მანამ შარფებს მოარგო და ყველა მსურველს მისცა საშუალება ჩვენი ქვეყნის ეს  საგანძური თავადაც ეტარებინათ.\n",
        "ამ ნამუშევრებით, მანა ცდილობს პოპულარიზაცია გაუწიოს საქართველოს ხელოვნებას და იგი ფართო საზოგადოებას გააცნოს. სწორედ ამის მაგალითია, დანიაში, ლუიზიანას თანამედროვე ხელოვნების მუზეუმში გამართულ ნიკო ფიროსმანის გამოფენის პარალელურად, მუზეუმის მაღაზიაში წარმოდგენილი მანას შარფები, შექმნილი ფიროსმანის ნახატებით, რამაც დიდი მოწონება დაიმსახურა და მალევე გაიყიდა.\n" +
        "\n",
        "რატომ MaNa?\n",
        "მანა გახლავთ ორი სახელის კომბინაცია, ორი ადამიანის, რომლებმაც იგი შექმნეს.\n" +
        "Ma - მაიკო  ჯიქია-არტისტი, ტექსტილის დიზაინი (თბილისის სამხატვრი აკადემია, ქსოვილების დიზაინის ფაკულტეტი) ასევე მუშაობს ტიხრულ მინანქარზე პროფესიონალურ დონეზე.\n" +
        "Na - ნატალია  მუჯირიშვილი - გრაფიკოს - დიზაინერი (სამხატვრო აკადემია, გრაფიკული დიზაინი)."
    ]

    $: paragraphs = $language === 'EN' ? en_paragraphs : geo_paragraphs;
</script>


<div class="flex flex-grow flex-col justify-between items-center">
    <div class="text-3xl pt-8 pb-12">{$language === 'EN' ? 'ABOUT US' : 'ჩვენს შესახებ'}</div>
    <div class="w-1/2 flex flex-col justify-center items-center space-y-4 pb-8">
        {#each paragraphs as par}
            <p>{par}</p>
        {/each}
    </div>
    <div class="pt-12 pb-8">
        <img class="image" height="300" width="900" src='/main_cover.webp' alt='alt'>
    </div>
</div>