<script>
    import {language} from "$lib/stores.ts";

    let en_paragraphs = [
        "MaNa is a new Georgian brand creating unique designs on scarves. MaNa guarantees quality, taste, simplicity, and excellent service.",
        "United under the brand name MaNa two friends - Tbilisi Art Academy graduates Maya Jikia (Textile & Jewellery Designer) and Natalia Mujirishvili (Graphic Designer) - creating scarves with the unique design.",
        "The mission of “MaNa” is to introduce Georgia and Georgian Painters to the world, and give you a chance to keep a small souvenir as a reminder of their artwork."
    ]
    let geo_paragraphs = [
        "MaNa არის ახალი საქართველოს ბრენდი, რომელიც შექმნის უნიკალურ დიზაინებს შარფებზე. MaNa გარანტირებს ხარისხს, გემოს, სიმპლიციტეტს და საკმაოდ კარგ სერვისს.",
        "ერთად შეერთება MaNa ბრენდის ქვეყანაში ორი მეგობარი - თბილისის ხელოვნები ხალამის სახელმწიფო აკადემიის მხარდაჭერის მცირე სენიორება მაია ჯიყია (ტექსტილის და სამოქალაქო დიზაინერი) და ნატალია მუჯირიშვილი (გრაფიკური დიზაინერი) - შარფების შექმნა უნიკალურ დიზაინებით.",
        "“MaNa”-ის მისია არის წარმოადგენს საქართველოს და ქართველ მხატვარებს მსოფლიო საზღვართველებში და გამოსცადებს შეენ შეიძლებოდეს შენახო პატარა სუვენირს მათი ხელოვნების გამოხმაურების შემდეგ."
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