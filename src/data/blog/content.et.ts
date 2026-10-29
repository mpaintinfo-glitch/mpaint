import type { ArticleContent } from "./types";
import type { ArticleId } from "../blog";

export const content_et: Record<ArticleId, ArticleContent> = {
  paintingCost: {
    title: "Kui palju maksab auto värvimine Eestis?",
    description:
      "Mis mõjutab autovärvimise hinda: detailide arv, värvitüüp, ettevalmistustööd ja auto seisukord. Mpainti kinnitatud alghinnad Tallinnas.",
    excerpt: "Autovärvimise hind sõltub mitmest tegurist. Vaatame, mis täpselt hinda mõjutab ja millised on meie kinnitatud alghinnad.",
    intro: [
      "Autovärvimise hinda küsitakse meilt peaaegu iga päev, aga ühest vastust pole olemas. Üksiku detaili värvimine ja terve auto täisvärvimine on hinnalt väga erinevad tööd ning ka kahe sarnase kahjustuse parandus võib maksta erinevalt, olenevalt sellest, mis värvitooniga on tegu ja kui palju ettevalmistustööd vaja on.",
    ],
    sections: [
      {
        heading: "Mis hinda kõige rohkem mõjutab",
        paragraphs: [
          "Suurim hinnategur on värvitava pinna suurus ja detailide arv. Ühe ukse või stange värvimine on hoopis teine töö kui terve auto täisvärvimine. Viimane tähendab kogu auto lahtivõtmist ja kokkupanekut, mis võtab suurema osa ajast, mitte värvi kuivamine.",
          "Teine suur tegur on värvitüüp. Tavaline ühevärviline toon on odavaim variant. Metallik-toonid on kallimad, kuna nõuavad täpsemat värvisegu, ning pärlmutter-toonid on kallimad veelgi, sest need vajavad kahte eraldi värvikihti õige sügavuse saavutamiseks.",
          "Kolmas tegur on ettevalmistus: kas pind on lihtsalt puhastada ja lihvida, või on vaja enne roostet eemaldada, mõlke välja tõmmata või kahjustatud detaile vahetada. Mida rohkem ettevalmistustööd, seda kõrgem on lõpphind.",
        ],
      },
      {
        heading: "Meie kinnitatud alghinnad",
        paragraphs: [
          "Mpaintis maksab ühe elemendi, näiteks ukse, stange või tiiva, värvimine alates 250 eurost. Kapoti või katuse värvimine, mis on suuremad ja keerukamad pinnad, algab 450 eurost. Roostekahjustuse puhastus ja töötlus algab 50 eurost, olenevalt kahjustuse ulatusest, sügavusest ja ligipääsetavusest. Täpne hind selgub alati pärast kahjustuse nägemist.",
        ],
      },
      {
        heading: "Miks hind võib esialgsest hinnangust erineda",
        paragraphs: [
          "Kui hindamine toimub ainult fotode põhjal, võib tegelik kahjustuse ulatus avaneda alles siis, kui auto on töökojas. Kriimustuse all võib peituda sügavam mõlk või varjatud rooste, mis fotolt ei paista. Seetõttu anname lõpliku hinnapakkumise alati pärast auto nägemist.",
        ],
      },
      {
        heading: "Kuidas hinda mõistlikult hoida",
        paragraphs: [
          "Kui kahjustus on väike ja värvikiht terve, tasub kõigepealt kaaluda poleerimist: see on odavam kui värvimine ja sobib pindmiste kriimustuste puhul. Kui aga kriimustus ulatub värvikihist läbi, poleerimine tulemust ei anna ja ala tuleb värvida.",
        ],
      },
    ],
    faq: [
      { q: "Kas hinnapakkumise küsimine on tasuta?", a: "Jah, hinnapakkumise küsimine ei maksa midagi." },
      {
        q: "Kas odavam on värvida ainult kahjustatud koht või terve detail?",
        a: "Tavaliselt värvitakse terve detail, näiteks terve uks, et toon ja läige oleksid ühtlased ja sobituksid naaberpaneelidega. Ainult kahjustatud koha värvimine jätab enamasti nähtava piiri.",
      },
    ],
  },

  scratchRepair: {
    title: "Kuidas aru saada, kas auto kriimustus vajab värvimist?",
    description: "Mitte iga kriimustus ei vaja värvimist. Siin on, kuidas ise hinnata kriimustuse sügavust ja millal piisab poleerimisest.",
    excerpt: "Pindmine kriimustus ja värvikihini ulatuv kahjustus vajavad täiesti erinevat lahendust. Vaatame, kuidas neid ise eristada.",
    intro: [
      "Autol on tavaliselt kolm kihti: krunt, värv ja pealmine läikiv kattekiht ehk lakk. See, kui sügavale kriimustus nendest kihtidest ulatub, otsustab, kas piisab poleerimisest või on vaja värvida.",
    ],
    sections: [
      {
        heading: "Lihtne viis kriimustust ise kontrollida",
        paragraphs: [
          "Käi kriimustusel küünega õrnalt üle. Kui küüs kriimustuse sisse kinni ei jää ja kriimustus on peaaegu nähtamatu, kui pind on märg, on tõenäoliselt tegu pindmise lakikahjustusega. Kui küüs jääb selgelt kriimustuse sisse ja all paistab erinev värv, on kriimustus tõenäoliselt värvikihist läbi ulatunud.",
          "Vaata ka kriimustuse värvi. Kui kriimustuse sees on näha valget või halli tooni, on tegu plasti- või krundikihiga. Kui näed metalli läiget, on kriimustus jõudnud kere metallini. Sellisel juhul on oht ka roostele ja värvimine on vajalik kiiremini.",
        ],
      },
      {
        heading: "Millal piisab poleerimisest",
        paragraphs: [
          "Kui kriimustus on ainult lakikihis ja värvikiht ise on terve, eemaldab poleerimine kriimustuse enamasti täielikult. See on odavam ja kiirem lahendus kui värvimine.",
        ],
      },
      {
        heading: "Millal on vaja värvida",
        paragraphs: [
          "Kui kriimustus ulatub värvikihist läbi kuni krundi või metallini, poleerimine tulemust ei anna: kriimustus jääb nähtavaks ja paljastunud metall hakkab roostetama. Sellisel juhul tuleb detail üle värvida. Enamasti värvitakse terve detail, mitte ainult kriimustatud koht, et toon jääks ühtlaseks.",
        ],
      },
      {
        heading: "Mida mitte teha",
        paragraphs: [
          "Interneti nõuanded, nagu hambapasta või küünelakieemaldi kriimustuse peitmiseks, ei paranda värvikihti. Need võivad pindmist kriimustust ajutiselt vähem nähtavaks muuta, aga värvikihist läbi ulatuvat kahjustust need ei lahenda ja võivad pinda hoopis rohkem kahjustada.",
        ],
      },
    ],
    faq: [
      {
        q: "Kas kriimustust saab parandada ilma detaili üle värvimata?",
        a: "Mõnikord küll. Kui kriimustus on pindmine ja värvikiht terve, piisab tihti poleerimisest. Kui kriimustus ulatub värvikihist läbi või metallini, on vaja värvida.",
      },
      { q: "Kas kõiki kriimustusi saab poleerimisega eemaldada?", a: "Ei. Poleerimine toimib ainult pindmiste kriimustuste puhul. Sügavamad kriimustused vajavad värvimist." },
    ],
  },

  accidentFirstSteps: {
    title: "Mida teha, kui auto sai avariis kahjustada?",
    description: "Esimesed sammud pärast liiklusõnnetust: ohutus, kahjustuse dokumenteerimine ja millal auto ei tohi enam sõita.",
    excerpt: "Avarii järel on oluline tegutseda õiges järjekorras. Siin on praktiline juhend esimesteks sammudeks.",
    intro: [
      "Avarii järel on esimene prioriteet ohutus, mitte auto seisukord. Kui keegi on viga saanud, helista kiirabisse. Kui kõik on terved ja auto on jätkuvalt sõidutee peal, liiguta see võimalusel ohutusse kohta ja lülita ohutuled sisse.",
    ],
    sections: [
      {
        heading: "Dokumenteeri kahjustus",
        paragraphs: [
          "Enne auto liigutamist, kui see on ohutu, tee fotod kahjustusest mitmest nurgast. See on kasulik nii kindlustuse jaoks kui ka remonditöökojale esmase hinnangu andmiseks. Pildista nii lähedalt, kahjustuse detailid, kui kaugemalt, terve auto küljevaade.",
        ],
      },
      {
        heading: "Millal auto ei tohi enam sõita",
        paragraphs: [
          "Mõned kahjustused on silmaga nähtavad, aga paljud ohtlikud kahjustused ei pruugi väljastpoolt paista. Kui pärast kokkupõrget on rooliseade raskem liikuda, auto tõmbab sõidu ajal ühele poole, kuuled pidurdades ebatavalist heli, või mõni kere- või plastidetail on lahti ja võib sõidu ajal eralduda, ei tohi autoga enam sõita. Sellisel juhul on mõistlik auto transportida töökotta, mitte sõita ise.",
        ],
      },
      {
        heading: "Miks mõni kahjustus väljast ei paista",
        paragraphs: [
          "Kokkupõrke jõud ei kandu alati ainult nähtavasse kohta. Löök võib kahjustada kandekonstruktsiooni, joondust või sisemisi kinnitusi, isegi kui väliselt paistab ainult kriimustus või väike mõlk. Seetõttu on tugevama kokkupõrke korral mõistlik lasta auto füüsiliselt üle vaadata, mitte hinnata kahjustust ainult fotode põhjal.",
        ],
      },
      {
        heading: "Millal piisab fotodest ja millal on vaja füüsilist ülevaatust",
        paragraphs: [
          "Väiksemate kosmeetiliste kahjustuste, näiteks kriimustuste ja väikeste mõlkide, puhul ilma nähtava struktuurse kahjustuseta piisab esmaseks hinnanguks tavaliselt headest fotodest. Suurema avarii, kandekonstruktsiooni kahjustuse kahtluse või sõiduki liikumatuse korral on vaja autot füüsiliselt näha, et anda täpne hinnapakkumine ja tuvastada kogu kahjustuse ulatus.",
        ],
      },
      {
        heading: "Järgmine samm",
        paragraphs: [
          "Kui oled kahjustuse dokumenteerinud ja otsustanud, kas auto on sõidukorras, saad võtta ühendust remonditöökojaga. Loe lähemalt, kuidas Mpaint avariijärgseid keretöid teeb ja kuidas toimetada sõiduk töökotta, kui see ei ole sõidukorras.",
        ],
      },
    ],
    faq: [
      {
        q: "Kas tohin avarii järel ise autoga sõita?",
        a: "Ainult siis, kui auto on kindlalt sõidukorras: rool, pidurid ja valgustus töötavad korralikult ning kere- või plastidetailid ei ole lahti. Kahtluse korral on turvalisem lasta auto transportida.",
      },
    ],
  },

  rustRepair: {
    title: "Kas roostes auto keredetaili saab veel parandada?",
    description: "Pindmine rooste ja läbiroostetanud metall vajavad erinevat lahendust. Vaatame, millal saab detaili veel parandada ja millal on vaja vahetust.",
    excerpt: "Rooste ei tähenda alati, et detail tuleb välja vahetada. Siin on, millest sõltub, kas parandus on veel mõistlik.",
    intro: [
      "Rooste teke sõltub sellest, kui kaugele korrosioon on metalli sisse jõudnud. Pindmine rooste on peaaegu alati parandatav, aga läbiroostetanud metall vajab juba teistsugust lähenemist.",
    ],
    sections: [
      {
        heading: "Pindmine rooste versus läbiroostetanud metall",
        paragraphs: [
          "Pindmine rooste tähendab, et korrosioon on jõudnud ainult metalli pinnakihti, kahjustamata selle tugevust. Selline rooste eemaldatakse, metall puhastatakse ja töödeldakse happega, et eemaldada ka nähtamatu korrosioon, ning kaetakse seejärel mitmekihilise kruntimisega enne värvimist. Läbiroostetanud metall tähendab, et korrosioon on söönud metalli läbi. Sellisel juhul ei ole lihtsalt puhastamisest ja kruntimisest enam kasu, sest metall ise on kaotanud oma tugevuse.",
        ],
      },
      {
        heading: "Millal on parandus mõistlik",
        paragraphs: [
          "Kui rooste on avastatud varakult ja piirdub pinnaga, on parandus peaaegu alati mõistlik ja oluliselt odavam kui detaili vahetus. Mida varem rooste märgatakse, seda väiksem on ka parandatav ala.",
        ],
      },
      {
        heading: "Millal tasub kaaluda vahetust",
        paragraphs: [
          "Kui korrosioon on jõudnud nii kaugele, et metall on läbi roostetanud või kaotanud oma kandevõime, soovitame tavaliselt detaili vahetust, mitte parandust: paigatud läbiroostetanud metall ei anna püsivat tulemust ja rooste tuleb tavaliselt tagasi.",
        ],
      },
      {
        heading: "Mis põhjustab roostet Eesti oludes",
        paragraphs: [
          "Eesti talvine teekattesool kiirendab rooste teket oluliselt, eriti kui värvikiht on juba kahjustatud mõne kriimustuse või kivitäke tõttu, mis jätab metalli soola ja niiskuse kätte. Seetõttu tasub väiksemad värvikahjustused parandada kiiresti, enne kui need jõuavad roosteks areneda.",
        ],
      },
      {
        heading: "Kuidas edaspidi roostet ennetada",
        paragraphs: [
          "Uuematele autodele pakume ka ennetavat roostekaitset, mis on mõistlik investeering just arvestades Eesti talviseid teeolusid.",
        ],
      },
    ],
    faq: [
      { q: "Kuidas toimub roostekahjustuse remont?", a: "Eemaldame kahjustatud ala, parandame vajadusel metalli ning valmistame pinna uuesti värvimiseks ette." },
      {
        q: "Kas roostes detaili saab alati parandada?",
        a: "Mitte alati. Tugevalt kahjustatud või läbiroostetanud detail võib vajada osalist või täielikku vahetust.",
      },
    ],
  },

  bumperRepair: {
    title: "Stange parandamine või vahetamine: kumb on mõistlikum?",
    description: "Mõranenud või deformeerunud stange ei vaja alati vahetust. Vaatame, millest sõltub, kas parandus või vahetus on mõistlikum valik.",
    excerpt: "Plaststange kahjustus tundub tihti hullem kui see tegelikult on. Siin on, kuidas otsustada paranduse ja vahetuse vahel.",
    intro: [
      "Enamik tänapäeva autode stangedest on valmistatud plastist, mis on kujundatud teatud määral löögi energiat neelama. Väiksem kokkupõrge jätab seetõttu tihti nähtava kahjustuse, ilma et stange struktuur oleks tegelikult tõsiselt kannatada saanud.",
    ],
    sections: [
      {
        heading: "Millised kahjustused on tavaliselt parandatavad",
        paragraphs: [
          "Praod, kriimustused, väiksemad deformatsioonid ja kinnituspunktide ümbruses olevad väiksemad kahjustused on tavaliselt parandatavad. Parandus hõlmab plasti sulatamist või liimimist praokohas, pinna tasandamist ning seejärel värvimist. Plaststange värvimine nõuab tavapärasest veidi erinevat ettevalmistust, kuna plasti pind vajab sobivat aluskrunti, et värv korralikult kinnituks.",
        ],
      },
      {
        heading: "Millal on vahetus mõistlikum",
        paragraphs: [
          "Kui stange on tugevasti deformeerunud, kinnituspunktid on murdunud, või kahjustus on nii ulatuslik, et parandatud ala poleks enam struktuurselt usaldusväärne, on vahetus mõistlikum valik. Samuti, kui parandustööde maht läheneb uue või kasutatud stange hinnale, ei pruugi parandus enam rahaliselt mõistlik olla.",
        ],
      },
      {
        heading: "Mis mõjutab otsust",
        paragraphs: [
          "Otsus sõltub kahjustuse asukohast ja ulatusest, stange materjalist ja sellest, kas kahjustus on puhtalt kosmeetiline või mõjutab ka kinnitust. Kui stange taga asuvad andurid, näiteks parkimisanduri või kaamera omad, on samuti kahjustatud, tuleb nende seisukorda eraldi hinnata.",
        ],
      },
      {
        heading: "Mida oodata parandustöö puhul",
        paragraphs: [
          "Esmalt hindame kahjustuse ulatust ja otsustame, kas parandus on mõistlik. Parandusvõimaluse korral sobitatakse värv auto tehase värvikoodi järgi ning stange värvitakse meie oma tolmuvabas kambris. Üksiku detaili, näiteks stange, värvimine on alates 250 eurost.",
        ],
      },
    ],
    faq: [
      { q: "Kas plaststangesid saab parandada ja värvida?", a: "Jah. Võimalus sõltub prao, deformatsiooni ja muu kahjustuse ulatusest." },
      {
        q: "Kas parandatud stange näeb sama hea välja kui uus?",
        a: "Korralikult teostatud parandus ja värvitooni sobitus annab visuaalselt ühtlase tulemuse. Tugevama deformatsiooni korral tasub kaaluda vahetust.",
      },
    ],
  },

  paintingProcess: {
    title: "Kuidas toimub auto värvimine?",
    description: "Auto värvimine samm-sammult: ettevalmistus, värvitooni sobitamine, värvimine tolmuvabas kambris ja viimistlus.",
    excerpt: "Hea värvitulemus sõltub suuresti ettevalmistusest. Vaatame, mis täpselt värvimisprotsessi käigus toimub.",
    intro: [
      "Hea värvitulemus ei teki ainult värvipritsist. Enamik tööst ja ajast kulub tegelikult ettevalmistusele ja järeltöötlusele, mitte värvi enda pealekandmisele.",
    ],
    sections: [
      {
        heading: "1. Kahjustuse hindamine ja ettevalmistus",
        paragraphs: [
          "Enne värvimist hinnatakse kahjustuse ulatust, keredetaili seisukorda ja olemasolevat värvkatet. Vajadusel eemaldatakse rooste, parandatakse mõlgid ja pind valmistatakse ette lihvimise, kruntimise ja muude eeltöödega.",
        ],
      },
      {
        heading: "2. Värvitooni sobitamine",
        paragraphs: [
          "Värv valitakse auto tehase värvikoodi ja olemasoleva värvitooni järgi. Kasutatakse erinevaid kvaliteetseid värvibrände, eelistades täpset värvitooni sobitust ühele kindlale tootjale. Keerulisematel juhtudel tehakse enne täisvärvimist spektrofotomeetriga testvärving, et kontrollida tooni täpsust.",
        ],
      },
      {
        heading: "3. Metallik- ja pärlmutter-toonid",
        paragraphs: [
          "Metallik- ja pärlmutter-toonid nõuavad rohkem tööd kui tavaline ühevärviline toon. Pärlmutter vajab kahte eraldi värvikihti, et saavutada õige sügavus ja läige, mistõttu on see ka kallim valik.",
        ],
      },
      {
        heading: "4. Värvimine tolmuvabas kambris",
        paragraphs: [
          "Värvimine toimub filtreeritud, tolmuvabas värvikambris, et pind saaks ühtlase ja sileda viimistluse ilma õhus hõljuvate osakesteta. See kehtib nii üksikute detailide kui ka terve auto värvimisel.",
        ],
      },
      {
        heading: "5. Sobitamine naaberpaneelidega",
        paragraphs: [
          "Kui värvitakse ainult üks detail, tuleb uus värv sobitada ümbritsevate pleekinud paneelidega, et üleminek jääks sujuv ega oleks silmaga eristatav.",
        ],
      },
      {
        heading: "Kui kaua see aega võtab",
        paragraphs: [
          "Ühe detaili värvimine võtab keskmiselt 3-4 päeva, täisvärvimine üle kuu. Suurema osa ajast võtab auto lahtivõtmine ja kokkupanek, mitte värvi kuivamine.",
        ],
      },
    ],
    faq: [
      { q: "Kas värvite ka terveid autosid?", a: "Jah, teostame nii üksikute detailide kui ka suuremate pindade ja kogu auto värvimist." },
      { q: "Mida tehakse enne värvimist?", a: "Pind puhastatakse, lihvitakse, parandatakse ja krunditakse vastavalt selle seisukorrale." },
    ],
  },
};
