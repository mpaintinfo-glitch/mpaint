import { useState, useEffect, useRef } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router"
import * as Dialog from "@radix-ui/react-dialog"
import "../imports/styles.css"
import sfondo from "../imports/sfondo.png"
import logoWhite from "../imports/mpain_logo_white.png"
import imgPaintBooth from "../imports/PHOTO-2026-08-11-15-47-32.jpg"
import imgBodywork from "../imports/mpaint.jpg"
import dropSplash from "../imports/drop-splash.png"
import QuoteFunnel from "./components/QuoteFunnel"
import Home from "./pages/Home"
import Services from "./pages/Services"
import Contact from "./pages/Contact"
import ServicePage from "./pages/ServicePage"
import type { ServiceId } from "./data/services"

const IMG_SVC_L = imgPaintBooth
const IMG_SVC_R = imgBodywork

const LANGS = [
  { code: "et", label: "Eesti" },
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
] as const

const LANG_BADGE = { en: "ENG", et: "EST", ru: "RUS" } as const

const STRINGS = {
  en: {
    nav: { home: "Home", services: "Services", booking: "Our work", contact: "Contact", bookNow: "Book now" },
    ribbon: { rust: "Rust removal", dent: "Dent removal", polish: "Polishing", parts: "Replacing parts" },
    hero: {
      titleLead: "Your car,",
      titleGrad: "repainted perfectly.",
      leadPre: "Car painting and bodywork in",
      leadCity: "Tallinn",
      ctaEstimate: "Get an estimate",
      ctaWork: "See our work",
    },
    home: {
      whatTitle: "What we do",
      whatSub: "Tap any service to send it straight into the quote form.",
      paintTitle: "Car painting",
      paintDesc: "Full resprays and single panels in our own paint booth.",
      bodyTitle: "Welding & bodywork",
      bodyDesc: "Sheet metal repair and structural bodywork for all vehicles.",
      pick: "Get an estimate",
      seeAll: "See all services",
      seoTitle: "Car painting and bodywork in Tallinn",
      seoP1: "Mpaint carries out car painting and bodywork in Tallinn. We handle both individual body panels and larger painting and restoration jobs.",
      seoP2: "Our services include car painting, panel painting, paint damage repair, dent removal, rust damage repair, welding, body repair and polishing.",
      seoP3: "Surfaces to be painted are prepared beforehand according to their condition. If needed, we remove rust and old damaged paint, repair the body surface, and prepare the panel for priming and painting. The paint is matched to the car's colour code and existing paint tone.",
      seoP4: "We work on passenger cars and commercial vehicles, taking on both smaller panel repairs and larger bodywork jobs.",
      whyTitle: "Mpaint's car painting and bodywork services",
      why: [
        "car painting",
        "panel painting",
        "bumper painting and repair",
        "scratch and paint damage repair",
        "dent removal",
        "rust damage repair",
        "body and welding work",
        "surface preparation for painting",
        "car polishing",
        "major body restoration work",
      ],
      seoClosing: "If your car's body or paintwork needs repair, get in touch and describe the work you need.",
    },
    services: {
      h1: "Car painting and bodywork services in Tallinn",
      paintTitle: "Car painting",
      paintDesc: "Full resprays and single panels in our own filtered paint booth.",
      bodyTitle: "Welding & bodywork",
      bodyDesc: "Sheet metal repair and structural bodywork for all vehicle types.",
      pick: "Get an estimate",
      cta: "Get an estimate",
      callUs: "Or call us: +372 58-100-810",
      backToServices: "← All services",
      seoTitle: "How car painting works at Mpaint",
      seoP1: "Every repaint starts with an assessment of the damage and a read of your car's factory colour code. We prepare and sand the panel, apply primer, then spray base coat and lacquer inside a dedicated paint booth where filtered air and controlled temperature keep dust out of the finish.",
      seoP2: "We paint single panels as well as full cars. Painting one door, bumper or wing is usually enough after a parking scrape, while corrosion or accident damage across several panels is better handled as a larger job. If the paint on your car has faded unevenly, we blend into the neighbouring panels so the repair does not stand out.",
      seoP3: "Alongside painting we handle welding and sheet metal repair, rust removal and anti-corrosion treatment, spotter dent pulling, body and headlight polishing, and replacement of body parts. If your repair goes through insurance, we can help with the paperwork.",
    },
    booking: {
      h1: "Send a photo. Get a price.",
      pt1: "Quick response",
      pt2: "Price and timeline together",
      pt3: "We handle the insurer",
      step: "Step",
      of3: "/ 3",
      step1Label: "1 · Vehicle",
      vehicle: { sedan: "Sedan / hatchback", suv: "SUV / crossover", van: "Van / commercial" },
      continue: "Continue",
      step2Label: "2 · Services",
      services: { paint: "Full painting", panel: "Panel painting", body: "Bodywork", dent: "Dent removal", rust: "Rust removal", polish: "Polishing", insurance: "Insurance case" },
      back: "Back",
      step3Label: "3 · Your details",
      dropText: "Add a photo of the damage",
      placeholderName: "Name",
      placeholderPhone: "Phone",
      placeholderCar: "Car make, model, year",
      submit: "Submit request",
      fnote: "We reply as soon as we can, on working days.",
      faqTitle: "Common questions",
      faq: [
        { q: "How much does it cost to paint a car?", a: "The price depends on how many panels are involved, the condition of the surface underneath and the type of paint. Send a photo of the damage and we will quote the actual job rather than a guess." },
        { q: "How long does the car stay at the workshop?", a: "A single panel is usually a couple of days including preparation, painting and curing. Larger jobs involving bodywork or several panels take longer." },
        { q: "Will the new paint match the rest of the car?", a: "We work from your factory colour code and blend into the surrounding panels where needed. On older cars the original paint has usually faded, so blending is what makes the repair invisible." },
        { q: "Do you work with insurance companies?", a: "Yes. If your repair goes through insurance, we can help you prepare the paperwork for the claim." },
        { q: "Can you remove a dent without repainting?", a: "Often yes. If the paint surface is not broken we can pull the dent with a spotter and leave the original paint intact, which is faster and cheaper than refinishing the panel." },
      ],
    },
    contact: {
      eyebrow: "Find us",
      h1: "Find us in Tallinn",
      callUs: "Call us",
      whatsapp: "WhatsApp",
      whatsappValue: "Message us",
      email: "Email",
      address: "Address",
      addressValue: "Tallinn, Estonia",
      monFri: "Mon – Fri",
      hours: "9:00 – 19:00",
      saturday: "Saturday",
      byAgreement: "By agreement",
      sunday: "Sunday",
      closed: "Closed",
      mapNote: "Google Maps embed here",
      mapTitle: "Mpaint workshop location on Google Maps",
      mapCta: "View full map",
      seoTitle: "Getting to the workshop",
      seoP1: "Our workshop is in Tallinn and we serve drivers from across Harju county. You are welcome to come by during opening hours to have damage looked at in person, though sending a photo first usually saves you a trip.",
      seoP2: "We speak Estonian, Russian and English. Phone and WhatsApp are the quickest way to reach us during the working day, and email is best if you want to attach several photos or an insurance case number.",
      hoursTitle: "Opening hours",
      hoursP: "Monday to Friday from 9:00 to 19:00. Saturday by agreement, so call ahead. Closed on Sunday.",
    },
    footer: { copyright: "© 2026 MPAINT OÜ", address: "Magasini tn 31, 10138 Tallinn", regCode: "Registration code 14939293" },
    fab: { call: "Call us", whatsapp: "WhatsApp", email: "Email us", estimate: "Get an estimate", ariaContact: "Contact" },
    emailModal: {
      eyebrow: "Get in touch",
      title: "Send us a message",
      desc: "We reply as soon as we can, on working days.",
      placeholderName: "Your name",
      placeholderEmail: "Email address",
      placeholderPhone: "Phone (optional)",
      placeholderMessage: "Describe the damage or what you need — a photo helps too.",
      uploadLabel: "Add photos (optional)",
      uploadHint: "PNG or JPG, up to 5 photos",
      removePhoto: "Remove photo",
      submit: "Send message",
      fnote: "We handle your details with care and never share them with third parties.",
      thankYou: "Thank you",
      successDescPre: "Your message has reached us. We will review it and reply to",
      successDescPost: "as soon as we can, on working days.",
      hurryPre: "In a hurry? Call or WhatsApp us directly at",
      backToSite: "Back to the site",
      ariaClose: "Close",
    },
    aria: { openMenu: "Open menu" },
  },
  et: {
    nav: { home: "Avaleht", services: "Teenused", booking: "Tehtud tööd", contact: "Kontakt", bookNow: "Broneeri" },
    ribbon: { rust: "Roostetõrje", dent: "Mõlkide eemaldamine", polish: "Poleerimine", parts: "Osade vahetus" },
    hero: {
      titleLead: "Sinu auto,",
      titleGrad: "täiuslikult värvitud.",
      leadPre: "Autode värvimine ja keretööd",
      leadCity: "Tallinnas",
      ctaEstimate: "Küsi hinnapakkumist",
      ctaWork: "Vaata meie töid",
    },
    home: {
      whatTitle: "Mida me teeme",
      whatSub: "Puuduta mõnda teenust, et see kohe hinnapäringu vormi lisada.",
      paintTitle: "Autovärvimine",
      paintDesc: "Täisvärvimised ja üksikud paneelid meie enda värvikambris.",
      bodyTitle: "Keevitus ja kerekojatööd",
      bodyDesc: "Plekitööd ja kere kandekonstruktsiooni remont kõikidele sõidukitele.",
      pick: "Küsi hinnapakkumist",
      seeAll: "Vaata kõiki teenuseid",
      seoTitle: "Autovärvimine ja keretööd Tallinnas",
      seoP1: "Mpaint teostab autovärvimist ja keretöid Tallinnas. Tegeleme nii üksikute keredetailide kui ka suuremate värvimis- ja taastamistöödega.",
      seoP2: "Meie teenuste hulka kuuluvad autode värvimine, detailide värvimine, värvikahjustuste parandamine, mõlkide eemaldamine, roostekahjustuste remont, keevitustööd, kereparandus ja poleerimine.",
      seoP3: "Värvitavad pinnad valmistatakse enne värvimist ette vastavalt nende seisukorrale. Vajadusel eemaldame rooste ja vana kahjustatud värvikihi, parandame kerepinna ning valmistame detaili kruntimiseks ja värvimiseks ette. Värv valitakse auto värvikoodi ja olemasoleva värvitooni järgi.",
      seoP4: "Teostame töid sõiduautodele ja tarbesõidukitele ning võtame vastu nii väiksemaid keredetailide parandusi kui ka mahukamaid keretöid.",
      whyTitle: "Mpainti autovärvimise ja keretööde teenused",
      why: [
        "autovärvimine",
        "keredetailide värvimine",
        "stangede värvimine ja parandamine",
        "kriimustuste ja värvikahjustuste parandamine",
        "mõlkide eemaldamine",
        "roostekahjustuste remont",
        "kere- ja keevitustööd",
        "detailide ettevalmistus värvimiseks",
        "auto poleerimine",
        "suuremad kere taastamistööd",
      ],
      seoClosing: "Kui auto kere või värvkate vajab parandamist, võta meiega ühendust ja kirjelda soovitud tööd.",
    },
    services: {
      h1: "Autovärvimise ja kerekoja teenused Tallinnas",
      paintTitle: "Autovärvimine",
      paintDesc: "Täisvärvimised ja üksikud paneelid meie enda filtreeritud värvikambris.",
      bodyTitle: "Keevitus ja kerekojatööd",
      bodyDesc: "Plekitööd ja kere kandekonstruktsiooni remont kõikidele sõidukitüüpidele.",
      pick: "Küsi hinnapakkumist",
      cta: "Küsi hinnapakkumist",
      callUs: "Või helista meile: +372 58-100-810",
      backToServices: "← Kõik teenused",
      seoTitle: "Kuidas autovärvimine Mpaintis käib",
      seoP1: "Iga värvimistöö algab kahjustuse hindamisest ja auto tehase värvikoodi lugemisest. Valmistame paneeli ette ja lihvime selle, kanname peale grundi ning seejärel pihustame põhi- ja lakikihi spetsiaalses värvikambris, kus filtreeritud õhk ja kontrollitud temperatuur hoiavad tolmu pinnast eemal.",
      seoP2: "Värvime nii üksikuid paneele kui ka terveid autosid. Ühe ukse, pumperi või tiiva värvimisest piisab tavaliselt pärast parklakriimu, samas kui korrosioon või avariikahjustus mitmel paneelil sobib paremini suurema tööna teostada. Kui auto värv on ebaühtlaselt pleekinud, sobitame selle naaberpaneelidega, et remont ei paistaks silma.",
      seoP3: "Lisaks värvimisele teeme keevitust ja plekitöid, roostetõrjet ja korrosioonikaitset, mõlkide väljatõmbamist spotteriga, kere ja esitulede poleerimist ning kereosade vahetust. Kui remont käib kindlustuse kaudu, aitame paberimajandusega.",
    },
    booking: {
      h1: "Saada foto. Saad hinna.",
      pt1: "Kiire vastus",
      pt2: "Hind ja ajakava koos",
      pt3: "Suhtleme kindlustusega sinu eest",
      step: "Samm",
      of3: "/ 3",
      step1Label: "1 · Sõiduk",
      vehicle: { sedan: "Sedaan / luukpära", suv: "Maastur / crossover", van: "Kaubik / tarbesõiduk" },
      continue: "Jätka",
      step2Label: "2 · Teenused",
      services: { paint: "Täisvärvimine", panel: "Paneeli värvimine", body: "Kerekojatööd", dent: "Mõlkide eemaldamine", rust: "Roostetõrje", polish: "Poleerimine", insurance: "Kindlustusjuhtum" },
      back: "Tagasi",
      step3Label: "3 · Sinu andmed",
      dropText: "Lisa foto kahjustusest",
      placeholderName: "Nimi",
      placeholderPhone: "Telefon",
      placeholderCar: "Auto mark, mudel, aasta",
      submit: "Saada päring",
      fnote: "Vastame niipea kui saame, tööpäevadel.",
      faqTitle: "Korduma kippuvad küsimused",
      faq: [
        { q: "Kui palju maksab auto värvimine?", a: "Hind sõltub sellest, mitu paneeli on kaasatud, aluspinna seisukorrast ja värvi tüübist. Saada foto kahjustusest ja pakume tegeliku hinna, mitte oletuse." },
        { q: "Kui kaua auto töökojas seisab?", a: "Üks paneel võtab tavaliselt paar päeva, sealhulgas ettevalmistus, värvimine ja kuivamine. Suuremad tööd kerekoja remondi või mitme paneeliga võtavad kauem aega." },
        { q: "Kas uus värv sobib ülejäänud autoga kokku?", a: "Lähtume sinu auto tehase värvikoodist ja sobitame vajadusel naaberpaneelidega. Vanematel autodel on originaalvärv tavaliselt pleekinud, seega sobitamine ongi see, mis teeb remondi märkamatuks." },
        { q: "Kas teete koostööd kindlustusfirmadega?", a: "Jah, aitame kahjunõude paberimajandusega, kui remont käib kindlustuse kaudu." },
        { q: "Kas mõlgi saab eemaldada ilma värvimata?", a: "Tihtipeale jah. Kui värvipind pole katki, saame mõlgi spotteriga välja tõmmata ja originaalvärvi puutumata jätta, mis on kiirem ja odavam kui paneeli ülevärvimine." },
      ],
    },
    contact: {
      eyebrow: "Leia meid",
      h1: "Leia meid Tallinnas",
      callUs: "Helista meile",
      whatsapp: "WhatsApp",
      whatsappValue: "Kirjuta meile",
      email: "E-post",
      address: "Aadress",
      addressValue: "Tallinn, Eesti",
      monFri: "E – R",
      hours: "9:00 – 19:00",
      saturday: "Laupäev",
      byAgreement: "Kokkuleppel",
      sunday: "Pühapäev",
      closed: "Suletud",
      mapNote: "Google Mapsi kaart siin",
      mapTitle: "Mpaint töökoja asukoht Google Mapsil",
      mapCta: "Vaata täissuurust kaarti",
      seoTitle: "Töökotta jõudmine",
      seoP1: "Meie töökoda asub Tallinnas ja teenindame juhte kogu Harjumaalt. Oled oodatud lahtiolekuaegadel läbi astuma, et kahjustust kohapeal näidata, kuigi foto saatmine ette hoiab tavaliselt sõidu ära.",
      seoP2: "Räägime eesti, vene ja inglise keelt. Telefon ja WhatsApp on kiireim viis meiega tööpäeva jooksul ühendust saada, e-post sobib kõige paremini, kui soovid lisada mitu fotot või kindlustusjuhtumi numbri.",
      hoursTitle: "Lahtiolekuajad",
      hoursP: "Esmaspäevast reedeni kell 9:00–19:00. Laupäeviti kokkuleppel, helista ette. Pühapäeviti suletud.",
    },
    footer: { copyright: "© 2026 MPAINT OÜ", address: "Magasini tn 31, 10138 Tallinn", regCode: "Registrikood 14939293" },
    fab: { call: "Helista meile", whatsapp: "WhatsApp", email: "Kirjuta meile", estimate: "Küsi hinnapakkumist", ariaContact: "Kontakt" },
    emailModal: {
      eyebrow: "Võta ühendust",
      title: "Saada meile sõnum",
      desc: "Vastame niipea kui saame, tööpäevadel.",
      placeholderName: "Sinu nimi",
      placeholderEmail: "E-posti aadress",
      placeholderPhone: "Telefon (valikuline)",
      placeholderMessage: "Kirjelda kahjustust või mida vajad — foto aitab samuti.",
      uploadLabel: "Lisa fotod (valikuline)",
      uploadHint: "PNG või JPG, kuni 5 fotot",
      removePhoto: "Eemalda foto",
      submit: "Saada sõnum",
      fnote: "Käsitleme sinu andmeid hoolikalt ega jaga neid kolmandate osapooltega.",
      thankYou: "Aitäh",
      successDescPre: "Sinu sõnum jõudis meieni. Vaatame selle üle ja vastame aadressile",
      successDescPost: "niipea kui saame, tööpäevadel.",
      hurryPre: "Kiire? Helista või kirjuta meile otse WhatsAppis:",
      backToSite: "Tagasi lehele",
      ariaClose: "Sulge",
    },
    aria: { openMenu: "Ava menüü" },
  },
  ru: {
    nav: { home: "Главная", services: "Услуги", booking: "Наши работы", contact: "Контакты", bookNow: "Забронировать" },
    ribbon: { rust: "Удаление ржавчины", dent: "Удаление вмятин", polish: "Полировка", parts: "Замена деталей" },
    hero: {
      titleLead: "Ваш автомобиль,",
      titleGrad: "перекрашен безупречно.",
      leadPre: "Покраска и кузовной ремонт автомобилей в",
      leadCity: "Таллинне",
      ctaEstimate: "Отправить запрос",
      ctaWork: "Посмотреть наши работы",
    },
    home: {
      whatTitle: "Что мы делаем",
      whatSub: "Нажмите на услугу, чтобы сразу добавить её в форму запроса.",
      paintTitle: "Покраска автомобиля",
      paintDesc: "Полная перекраска и покраска отдельных панелей в нашей собственной покрасочной камере.",
      bodyTitle: "Сварка и кузовные работы",
      bodyDesc: "Ремонт листового металла и несущих конструкций кузова для любых автомобилей.",
      pick: "Отправить запрос",
      seeAll: "Смотреть все услуги",
      seoTitle: "Покраска и кузовной ремонт автомобилей в Таллинне",
      seoP1: "Mpaint выполняет покраску автомобилей и кузовные работы в Таллинне. Мы занимаемся как ремонтом отдельных кузовных деталей, так и более крупными покрасочными и восстановительными работами.",
      seoP2: "В наши услуги входят покраска автомобилей, покраска деталей, устранение повреждений лакокрасочного покрытия, удаление вмятин, ремонт повреждений от ржавчины, сварочные работы, кузовной ремонт и полировка.",
      seoP3: "Поверхности перед покраской готовятся в соответствии с их состоянием. При необходимости мы удаляем ржавчину и старое повреждённое покрытие, ремонтируем кузовную поверхность и готовим деталь к грунтовке и покраске. Краска подбирается по коду цвета автомобиля и существующему оттенку.",
      seoP4: "Мы выполняем работы для легковых и коммерческих автомобилей, беремся как за небольшой ремонт кузовных деталей, так и за более объёмные кузовные работы.",
      whyTitle: "Услуги Mpaint по покраске и кузовному ремонту",
      why: [
        "покраска автомобиля",
        "покраска деталей",
        "покраска и ремонт бамперов",
        "устранение царапин и повреждений лакокрасочного покрытия",
        "удаление вмятин",
        "ремонт повреждений от ржавчины",
        "кузовные и сварочные работы",
        "подготовка деталей к покраске",
        "полировка автомобиля",
        "крупные кузовные восстановительные работы",
      ],
      seoClosing: "Если кузову или лакокрасочному покрытию вашего автомобиля нужен ремонт, свяжитесь с нами и опишите нужную работу.",
    },
    services: {
      h1: "Услуги покраски и кузовного ремонта автомобилей в Таллинне",
      paintTitle: "Покраска автомобиля",
      paintDesc: "Полная перекраска и покраска отдельных панелей в нашей собственной камере с фильтрацией воздуха.",
      bodyTitle: "Сварка и кузовные работы",
      bodyDesc: "Ремонт листового металла и несущих конструкций кузова для всех типов автомобилей.",
      pick: "Отправить запрос",
      cta: "Отправить запрос",
      callUs: "Или позвоните нам: +372 58-100-810",
      backToServices: "← Все услуги",
      seoTitle: "Как проходит покраска автомобиля в Mpaint",
      seoP1: "Каждая покраска начинается с оценки повреждения и считывания заводского кода цвета вашего автомобиля. Мы готовим и шлифуем панель, наносим грунт, затем распыляем базовое покрытие и лак в специальной покрасочной камере, где фильтрованный воздух и контролируемая температура не дают пыли попасть в покрытие.",
      seoP2: "Мы красим как отдельные панели, так и целые автомобили. Покраски одной двери, бампера или крыла обычно достаточно после царапины на парковке, тогда как коррозия или аварийные повреждения на нескольких панелях лучше решать как более крупную работу. Если краска на вашем автомобиле выцвела неравномерно, мы делаем плавный переход на соседние панели, чтобы ремонт не бросался в глаза.",
      seoP3: "Помимо покраски мы занимаемся сваркой и ремонтом листового металла, удалением ржавчины и антикоррозийной обработкой, вытягиванием вмятин без покраски, полировкой кузова и фар, а также заменой кузовных деталей. Если ремонт проходит через страховку, мы поможем с оформлением документов.",
    },
    booking: {
      h1: "Пришлите фото. Получите цену.",
      pt1: "Быстрый ответ",
      pt2: "Цена и сроки вместе",
      pt3: "Мы общаемся со страховой за вас",
      step: "Шаг",
      of3: "/ 3",
      step1Label: "1 · Автомобиль",
      vehicle: { sedan: "Седан / хэтчбек", suv: "Внедорожник / кроссовер", van: "Фургон / коммерческий" },
      continue: "Продолжить",
      step2Label: "2 · Услуги",
      services: { paint: "Полная покраска", panel: "Покраска панели", body: "Кузовные работы", dent: "Удаление вмятин", rust: "Удаление ржавчины", polish: "Полировка", insurance: "Страховой случай" },
      back: "Назад",
      step3Label: "3 · Ваши данные",
      dropText: "Добавьте фото повреждения",
      placeholderName: "Имя",
      placeholderPhone: "Телефон",
      placeholderCar: "Марка, модель, год автомобиля",
      submit: "Отправить заявку",
      fnote: "Мы ответим, как только сможем, в рабочие дни.",
      faqTitle: "Частые вопросы",
      faq: [
        { q: "Сколько стоит покраска автомобиля?", a: "Цена зависит от количества задействованных панелей, состояния поверхности под ними и типа краски. Пришлите фото повреждения, и мы дадим реальную цену, а не приблизительную оценку." },
        { q: "Сколько времени автомобиль проведёт в мастерской?", a: "Одна панель обычно занимает пару дней, включая подготовку, покраску и сушку. Более крупные работы, связанные с кузовным ремонтом или несколькими панелями, занимают больше времени." },
        { q: "Будет ли новая краска соответствовать остальному кузову?", a: "Мы работаем по заводскому коду цвета вашего автомобиля и при необходимости делаем плавный переход на соседние панели. На старых автомобилях оригинальная краска обычно выцветает, поэтому именно плавный переход делает ремонт незаметным." },
        { q: "Вы работаете со страховыми компаниями?", a: "Да, мы поможем с оформлением документов, если ремонт проходит через страховку." },
        { q: "Можно ли убрать вмятину без покраски?", a: "Часто да. Если лакокрасочное покрытие не повреждено, мы можем вытянуть вмятину с помощью выпрямителя (spotter) и оставить оригинальную краску нетронутой, что быстрее и дешевле, чем перекраска панели." },
      ],
    },
    contact: {
      eyebrow: "Найти нас",
      h1: "Найдите нас в Таллинне",
      callUs: "Позвоните нам",
      whatsapp: "WhatsApp",
      whatsappValue: "Написать нам",
      email: "Email",
      address: "Адрес",
      addressValue: "Таллинн, Эстония",
      monFri: "Пн – Пт",
      hours: "9:00 – 19:00",
      saturday: "Суббота",
      byAgreement: "По договорённости",
      sunday: "Воскресенье",
      closed: "Закрыто",
      mapNote: "Здесь встроена карта Google Maps",
      mapTitle: "Расположение мастерской Mpaint на Google Картах",
      mapCta: "Открыть карту",
      seoTitle: "Как добраться до мастерской",
      seoP1: "Наша мастерская находится в Таллинне, и мы обслуживаем водителей со всего уезда Харью. Вы можете заехать в часы работы, чтобы показать повреждение лично, хотя отправка фото заранее обычно избавляет от лишней поездки.",
      seoP2: "Мы говорим по-эстонски, по-русски и по-английски. Телефон и WhatsApp — самый быстрый способ связаться с нами в течение рабочего дня, а email лучше всего подходит, если вы хотите приложить несколько фото или номер страхового случая.",
      hoursTitle: "Часы работы",
      hoursP: "С понедельника по пятницу с 9:00 до 19:00. По субботам по договорённости, звоните заранее. По воскресеньям закрыто.",
    },
    footer: { copyright: "© 2026 MPAINT OÜ", address: "Magasini tn 31, 10138 Tallinn", regCode: "Регистрационный код 14939293" },
    fab: { call: "Позвонить нам", whatsapp: "WhatsApp", email: "Написать нам", estimate: "Отправить запрос", ariaContact: "Контакт" },
    emailModal: {
      eyebrow: "Свяжитесь с нами",
      title: "Отправьте нам сообщение",
      desc: "Мы ответим, как только сможем, в рабочие дни.",
      placeholderName: "Ваше имя",
      placeholderEmail: "Адрес электронной почты",
      placeholderPhone: "Телефон (необязательно)",
      placeholderMessage: "Опишите повреждение или что вам нужно — фото тоже поможет.",
      uploadLabel: "Добавьте фото (необязательно)",
      uploadHint: "PNG или JPG, до 5 фото",
      removePhoto: "Удалить фото",
      submit: "Отправить сообщение",
      fnote: "Мы бережно относимся к вашим данным и никогда не передаём их третьим лицам.",
      thankYou: "Спасибо",
      successDescPre: "Ваше сообщение получено. Мы рассмотрим его и ответим на",
      successDescPost: "как только сможем, в рабочие дни.",
      hurryPre: "Срочно? Звоните или пишите нам напрямую в WhatsApp:",
      backToSite: "Вернуться на сайт",
      ariaClose: "Закрыть",
    },
    aria: { openMenu: "Открыть меню" },
  },
} as const

type Lang = keyof typeof STRINGS

export default function App() {
  const [lang, setLang] = useState<Lang>("et")
  const [langOpen, setLangOpen] = useState(false)
  const [fabOpen, setFabOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [quotePreset, setQuotePreset] = useState<ServiceId | null>(null)
  const [emailOpen, setEmailOpen] = useState(false)
  const [emailForm, setEmailForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [emailSent, setEmailSent] = useState(false)
  const [emailPhotos, setEmailPhotos] = useState<{ file: File; url: string }[]>([])
  const MAX_EMAIL_PHOTOS = 5

  const t = STRINGS[lang]
  const navigate = useNavigate()
  const location = useLocation()
  const hasFooterSplash = location.pathname === "/" || location.pathname === "/services"

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailSent(true)
  }

  const handleEmailOpenChange = (open: boolean) => {
    setEmailOpen(open)
    if (!open) {
      setTimeout(() => {
        setEmailSent(false)
        setEmailForm({ name: "", email: "", phone: "", message: "" })
        setEmailPhotos(prev => { prev.forEach(p => URL.revokeObjectURL(p.url)); return [] })
      }, 300)
    }
  }

  const openEmail = () => { setEmailOpen(true); setFabOpen(false) }
  const emailFileInputRef = useRef<HTMLInputElement>(null)

  const addEmailPhotos = (files: FileList | null) => {
    if (!files) return
    const incoming = Array.from(files)
      .filter(f => f.type.startsWith("image/"))
      .slice(0, MAX_EMAIL_PHOTOS - emailPhotos.length)
      .map(file => ({ file, url: URL.createObjectURL(file) }))
    setEmailPhotos(prev => [...prev, ...incoming])
  }

  const removeEmailPhoto = (index: number) => {
    setEmailPhotos(prev => {
      const target = prev[index]
      if (target) URL.revokeObjectURL(target.url)
      return prev.filter((_, i) => i !== index)
    })
  }
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // scroll to top + close the mobile drawer on every route change (matches
  // the old go()'s behaviour, now driven by the router instead of page state)
  useEffect(() => {
    setNavOpen(false)
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [location.pathname])

  const openQuote = (presetService?: ServiceId) => {
    setQuotePreset(presetService ?? null)
    setQuoteOpen(true)
    setNavOpen(false)
    setFabOpen(false)
  }
  const closeQuote = () => setQuoteOpen(false)

  const onNavClick = (p: "home" | "services" | "booking" | "contact") => {
    if (p === "booking") { openQuote(); return }
    setNavOpen(false)
    navigate(p === "home" ? "/" : "/" + p)
  }

  const isNavActive = (p: "home" | "services" | "booking" | "contact") => {
    if (p === "home") return location.pathname === "/"
    if (p === "services") return location.pathname.startsWith("/services")
    if (p === "contact") return location.pathname === "/contact"
    return false
  }

  return (
    <div data-lang={lang}>
      {/* ── COPY TEXT CENTERING + EMAIL MODAL ── */}
      <style>{`
        .seo-block { text-align: center; }
        .seo-block ul { list-style: none; padding: 0; margin-left: 0; }
        .seo-block li { padding-left: 0; }

        /* Remove the drip-strip paint mask — it was causing square top corners */
        .svc-band { mask: none !important; -webkit-mask: none !important; }

        @media (min-width: 761px) {

          /* Reduce card height + tighten padding/gap so everything from the
             title down to "Or call us +372…" fits in the first desktop viewport.
             !important overrides the matching inline styles without touching JSX */
          .svc-cta-zone .svc-half  { height: 320px; }
          .svc-cta-zone .svc-block { margin-top: 0.5rem; }
          .svc-cta-zone            { padding-top: 3.5rem !important; padding-bottom: 1.25rem !important; gap: 1rem !important; }

          /* Contact: breathing room from header + space to panel */
          .contact-main-sec { padding-top: 3.5rem; padding-bottom: 2.5rem; }
          .contact-panel-wrap { margin-top: 2.5rem; }
        }

        .email-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,.68);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 500;
          animation: em-fade .22s ease;
        }
        .email-dialog {
          position: fixed; left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          width: min(520px, 92vw);
          max-height: 90dvh;
          overflow-y: auto;
          background: var(--card-2);
          border: 1px solid rgba(var(--overlay-rgb),.10);
          border-radius: var(--r-card);
          padding: clamp(1.75rem, 5vw, 2.5rem);
          z-index: 501;
          color: var(--white);
          animation: em-up .28s cubic-bezier(.22,1,.36,1);
        }
        .email-dialog[data-state="closed"] {
          animation: em-down .18s ease forwards;
        }
        .email-close {
          position: absolute; top: 1rem; right: 1rem;
          width: 36px; height: 36px;
          border-radius: var(--r-circle);
          border: 1px solid rgba(var(--overlay-rgb),.14);
          background: none; color: var(--low); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: border-color .18s, color .18s;
          flex-shrink: 0;
        }
        .email-close:hover { border-color: rgba(var(--overlay-rgb),.38); color: var(--white); }
        .email-textarea {
          resize: vertical; min-height: 100px;
          line-height: 1.65; padding-top: .5rem;
        }
        .email-success-icon {
          width: 60px; height: 60px; border-radius: 50%;
          background: var(--grad-btn);
          margin: 0 auto 1.5rem;
          display: flex; align-items: center; justify-content: center;
        }
        .upload-label {
          font-size: 10.5px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase;
          color: #A1A1AA; margin-bottom: .6rem;
        }
        .upload-thumbs {
          display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: .6rem;
        }
        .upload-thumb {
          position: relative; width: 56px; height: 56px; border-radius: 10px;
          overflow: hidden; border: 1px solid rgba(var(--overlay-rgb),.14); flex-shrink: 0;
        }
        .upload-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .upload-thumb-remove {
          position: absolute; top: 2px; right: 2px; width: 16px; height: 16px;
          border-radius: 50%; border: none; background: rgba(0,0,0,.65); color: #fff;
          display: flex; align-items: center; justify-content: center; cursor: pointer;
          transition: background .15s;
        }
        .upload-thumb-remove:hover { background: rgba(0,0,0,.85); }
        .upload-drop {
          border: 1px dashed rgba(var(--overlay-rgb),.2); border-radius: var(--r-card);
          padding: .85rem 1rem; text-align: center; color: #A1A1AA; font-weight: 500;
          font-size: 12.5px; cursor: pointer; transition: border-color .18s, color .18s;
        }
        .upload-drop:hover { border-color: var(--pink); color: var(--white); }
        @keyframes em-fade { from { opacity:0 } to { opacity:1 } }
        @keyframes em-up   { from { opacity:0; transform:translate(-50%,-46%) } to { opacity:1; transform:translate(-50%,-50%) } }
        @keyframes em-down { from { opacity:1 } to { opacity:0 } }
      `}</style>

      {/* ── SVG SPRITE ── */}
      <svg style={{ display: "none" }}>
        <symbol id="i-spray" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 8h6v13H9zM12 8V4M12 4h5M15 6h3M15 2h3M6 12h3M6 16h3" />
          <circle cx="4" cy="12" r=".6" fill="currentColor" stroke="none" />
          <circle cx="4" cy="16" r=".6" fill="currentColor" stroke="none" />
        </symbol>
        <symbol id="i-weld" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 20l7-7M10 13l4-4M14 9l3-3a2.5 2.5 0 013.5 3.5l-3 3M14 9l4 4" />
          <path d="M5 5l1.5 1.5M8 3l.8 2M3 8l2 .8" />
        </symbol>
        <symbol id="i-polish" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 17c2-5 6-8 11-9M4 17h9M13 17c3 0 5-2 5-5" />
          <path d="M12 3v3M18 4l-1.5 2.5M21 9l-2.5 1" />
          <circle cx="8" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" />
        </symbol>
        <symbol id="i-rust" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" />
          <path d="M9 11l2 2 4-4" />
        </symbol>
        <symbol id="i-dent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9c3.5 0 4 4 9 4s5.5-4 9-4" />
          <path d="M3 15c3.5 0 4 2 9 2s5.5-2 9-2" />
          <circle cx="12" cy="12" r="1.5" />
        </symbol>
        <symbol id="i-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
          <path d="M14 3v5h5M9 13h6M9 17h4" />
        </symbol>
        <symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </symbol>
        <symbol id="i-wa" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.4 8.4 0 01-12.4 7.4L3 21l2.2-5.4A8.4 8.4 0 1121 11.5z" />
          <path d="M8.6 9.2c0 3.2 2.6 5.8 5.8 5.8l1.2-1.4-2-1-1 .8a5.6 5.6 0 01-2.4-2.4l.8-1-1-2z" />
        </symbol>
        <symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 6 10-6" />
        </symbol>
        <symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.2a2 2 0 012.1-.5c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z" />
        </symbol>
        <symbol id="i-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </symbol>
        <symbol id="i-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </symbol>
        <symbol id="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
        </symbol>
        <symbol id="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.5 14.3A8.5 8.5 0 1110 3.3a6.7 6.7 0 0010.5 11z" />
        </symbol>
        <symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </symbol>
        <symbol id="i-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z" />
          <path d="M9 12l2 2 4-4" />
        </symbol>
        <symbol id="i-cert" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="9" r="6" /><path d="M9 14.5L7.5 21l4.5-2.4 4.5 2.4-1.5-6.5" />
        </symbol>
        <symbol id="i-star" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.5-5.9-3.3-5.9 3.3 1.3-6.5-4.9-4.6 6.6-.8z" />
        </symbol>
      </svg>

      {/* ── HEADER ── */}
      <header className={`header${navOpen ? " nav-open" : ""}`}>
        <div className="container nav">
          <a className="logo" onClick={() => onNavClick("home")} style={{ cursor: "pointer" }}>
            <img
              src={logoWhite}
              alt="Mpaint"
              style={{
                height: "48px",
                width: "auto",
                maxWidth: "160px",
                objectFit: "contain",
                objectPosition: "left center",
              }}
            />
          </a>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={navOpen}
            aria-controls="navMenu"
            aria-label={t.aria.openMenu}
            onClick={() => setNavOpen(o => !o)}
          >
            <svg><use href="#i-menu" /></svg>
          </button>

          <ul className="nav-links" id="navMenu">
            {(["home", "services", "booking", "contact"] as const).map(p => (
              <li key={p}>
                <a
                  className={p !== "booking" && isNavActive(p) ? "active" : ""}
                  onClick={() => onNavClick(p)}
                  style={{ cursor: "pointer" }}
                >
                  {t.nav[p]}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <div className={`lang${langOpen ? " open" : ""}`} ref={langRef}>
              <button className="lang-btn" onClick={() => setLangOpen(o => !o)}>
                <span>{LANG_BADGE[lang]}</span>
                <svg><use href="#i-chev" /></svg>
              </button>
              <div className="lang-menu">
                {LANGS.map(l => (
                  <button
                    key={l.code}
                    className={lang === l.code ? "on" : ""}
                    onClick={() => { setLang(l.code); setLangOpen(false) }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <a className="btn btn-fill btn-sm" onClick={() => openQuote()} style={{ cursor: "pointer" }}>
              {t.nav.bookNow}
            </a>
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home t={t} sfondo={sfondo} imgSvcL={IMG_SVC_L} imgSvcR={IMG_SVC_R} openQuote={openQuote} />} />
          <Route path="/services" element={<Services t={t} imgSvcL={IMG_SVC_L} imgSvcR={IMG_SVC_R} openQuote={openQuote} />} />
          <Route
            path="/services/:slug"
            element={
              <ServicePage
                lang={lang}
                ctaLabel={t.services.pick}
                backLabel={t.services.backToServices}
                onGetEstimate={openQuote}
              />
            }
          />
          <Route path="/contact" element={<Contact t={t} openEmail={openEmail} />} />
        </Routes>
      </main>

      {/* ── FOOTER ── */}
      <footer className={hasFooterSplash ? "footer-has-splash" : ""}>
        {hasFooterSplash && (
          <img src={dropSplash} alt="" aria-hidden="true" className="bottom-splash-accent" />
        )}
        <div className="container f-in">
          <img
            src={logoWhite}
            alt="Mpaint"
            style={{
              height: "44px",
              width: "auto",
              maxWidth: "160px",
              objectFit: "contain",
              objectPosition: "left center",
              opacity: 0.75,
            }}
          />
          <div className="f-nav">
            {(["home", "services", "booking", "contact"] as const).map(p => (
              <a key={p} onClick={() => onNavClick(p)} style={{ cursor: "pointer" }}>
                {t.nav[p]}
              </a>
            ))}
          </div>
          <span>{t.footer.address} · {t.footer.regCode}</span>
          <span>{t.footer.copyright}</span>
        </div>
      </footer>

      {/* ── FLOATING CONTACT ── */}
      <div className={`fab-wrap${fabOpen ? " open" : ""}`}>
        <div className="fab-menu">
          <a className="fab-item" href="tel:+37258100810">
            <span className="fi"><svg><use href="#i-phone" /></svg></span>
            <b>{t.fab.call}</b>
          </a>
          <a className="fab-item" href="https://wa.me/37258100810" target="_blank" rel="noopener">
            <span className="fi"><svg><use href="#i-wa" /></svg></span>
            <b>{t.fab.whatsapp}</b>
          </a>
          <a className="fab-item" onClick={openEmail} style={{ cursor: "pointer" }}>
            <span className="fi"><svg><use href="#i-mail" /></svg></span>
            <b>{t.fab.email}</b>
          </a>
          <a className="fab-item" onClick={() => openQuote()} style={{ cursor: "pointer" }}>
            <span className="fi"><svg><use href="#i-doc" /></svg></span>
            <b>{t.fab.estimate}</b>
          </a>
        </div>
        <button className="fab" aria-label={t.fab.ariaContact} onClick={() => setFabOpen(o => !o)}>
          <svg className="ic-phone"><use href="#i-phone" /></svg>
          <svg className="ic-close"><use href="#i-close" /></svg>
        </button>
      </div>

      {/* ── EMAIL MODAL ── */}
      <Dialog.Root open={emailOpen} onOpenChange={handleEmailOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="email-overlay" />
          <Dialog.Content className="email-dialog">
            <Dialog.Close className="email-close" aria-label={t.emailModal.ariaClose}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </Dialog.Close>

            {!emailSent ? (
              <>
                <div className="center" style={{ marginBottom: "1.5rem" }}>
                  <div className="eyebrow">{t.emailModal.eyebrow}</div>
                  <Dialog.Title style={{ fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 700, color: "var(--white)", margin: 0 }}>
                    {t.emailModal.title}
                  </Dialog.Title>
                  <Dialog.Description style={{ color: "var(--med)", marginTop: "0.4rem", fontSize: "15px", fontWeight: 300 }}>
                    {t.emailModal.desc}
                  </Dialog.Description>
                </div>

                <form onSubmit={handleEmailSubmit}>
                  <div className="f2" style={{ marginBottom: "1rem" }}>
                    <input
                      className="inp" type="text" placeholder={t.emailModal.placeholderName} required
                      value={emailForm.name}
                      onChange={e => setEmailForm(f => ({ ...f, name: e.target.value }))}
                    />
                    <input
                      className="inp" type="email" placeholder={t.emailModal.placeholderEmail} required
                      value={emailForm.email}
                      onChange={e => setEmailForm(f => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                  <div className="field-block">
                    <input
                      className="inp" type="tel" placeholder={t.emailModal.placeholderPhone}
                      value={emailForm.phone}
                      onChange={e => setEmailForm(f => ({ ...f, phone: e.target.value }))}
                    />
                  </div>

                  <div className="field-block upload-block" style={{ marginTop: "1.25rem" }}>
                    <div className="upload-label">{t.emailModal.uploadLabel}</div>
                    <input
                      ref={emailFileInputRef}
                      type="file" accept="image/*" multiple
                      style={{ display: "none" }}
                      onChange={e => { addEmailPhotos(e.target.files); e.target.value = "" }}
                    />
                    {emailPhotos.length > 0 && (
                      <div className="upload-thumbs">
                        {emailPhotos.map((p, i) => (
                          <div className="upload-thumb" key={p.url}>
                            <img src={p.url} alt="" />
                            <button
                              type="button" className="upload-thumb-remove"
                              aria-label={t.emailModal.removePhoto}
                              onClick={() => removeEmailPhoto(i)}
                            >
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                <path d="M18 6L6 18M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {emailPhotos.length < MAX_EMAIL_PHOTOS && (
                      <div
                        className="upload-drop"
                        onClick={() => emailFileInputRef.current?.click()}
                        role="button" tabIndex={0}
                        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") emailFileInputRef.current?.click() }}
                      >
                        <span>{t.emailModal.uploadHint}</span>
                      </div>
                    )}
                  </div>

                  <div className="field-block" style={{ marginTop: "1rem" }}>
                    <textarea
                      className="inp email-textarea" placeholder={t.emailModal.placeholderMessage} required rows={4}
                      value={emailForm.message}
                      onChange={e => setEmailForm(f => ({ ...f, message: e.target.value }))}
                    />
                  </div>
                  <button className="btn btn-fill btn-full" style={{ marginTop: "1.5rem" }} type="submit">
                    {t.emailModal.submit}
                  </button>
                  <div className="fnote">{t.emailModal.fnote}</div>
                </form>
              </>
            ) : (
              <div className="center" style={{ padding: "2rem 0 1rem" }}>
                <div className="email-success-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <Dialog.Title style={{ fontSize: "clamp(20px, 2.8vw, 26px)", fontWeight: 700, color: "var(--white)", margin: "0 0 0.75rem" }}>
                  {t.emailModal.thankYou}{emailForm.name ? `, ${emailForm.name.split(" ")[0]}` : ""}!
                </Dialog.Title>
                <Dialog.Description style={{ color: "var(--med)", fontSize: "15px", fontWeight: 300, lineHeight: 1.7, maxWidth: "36ch", margin: "0 auto" }}>
                  {t.emailModal.successDescPre} <strong style={{ color: "var(--white)", fontWeight: 500 }}>{emailForm.email}</strong> {t.emailModal.successDescPost}
                </Dialog.Description>
                <p style={{ color: "var(--low)", fontSize: "13px", marginTop: "1rem", lineHeight: 1.6 }}>
                  {t.emailModal.hurryPre} <a href="tel:+37258100810" style={{ color: "var(--med)" }}>+372 58-100-810</a>.
                </p>
                <button
                  className="btn btn-line"
                  style={{ marginTop: "2rem" }}
                  onClick={() => handleEmailOpenChange(false)}
                >
                  {t.emailModal.backToSite}
                </button>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* ── QUOTE FUNNEL (2-step, focused light mode) ── */}
      <QuoteFunnel open={quoteOpen} onClose={closeQuote} initialService={quotePreset} lang={lang} />
    </div>
  )
}
