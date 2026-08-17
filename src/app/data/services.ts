import photoPaint from "../../imports/svc-painting.png"
import photoBody from "../../imports/svc-bodywork.png"
import photoDent from "../../imports/svc-dent.png"
import photoRust from "../../imports/svc-rust.png"
import photoPolish from "../../imports/svc-polishing.png"
import photoParts from "../../imports/svc-parts.png"

export type Lang = "en" | "et" | "ru"
export type ServiceId = "paint" | "body" | "dent" | "rust" | "polish" | "parts"

export interface ServiceContent {
  id: ServiceId
  slug: string
  icon: string
  photo: string
  h1: string
  tagline: string
  bullets: string[]
}

export const SERVICE_SLUGS: Record<ServiceId, string> = {
  paint: "painting",
  body: "bodywork",
  dent: "dent-removal",
  rust: "rust-removal",
  polish: "polishing",
  parts: "parts-replacement",
}

export const SERVICE_ORDER: ServiceId[] = ["paint", "body", "dent", "rust", "polish", "parts"]

// the 4-item ribbon shown under the paint/body cards on Home & Services
export const RIBBON_IDS: ServiceId[] = ["rust", "dent", "polish", "parts"]

const ICONS: Record<ServiceId, string> = {
  paint: "i-spray",
  body: "i-weld",
  dent: "i-dent",
  rust: "i-rust",
  polish: "i-polish",
  parts: "i-doc",
}

// real workshop photos, one per service (sourced from the previous mpaint.ee site)
const PHOTOS: Record<ServiceId, string> = {
  paint: photoPaint,
  body: photoBody,
  dent: photoDent,
  rust: photoRust,
  polish: photoPolish,
  parts: photoParts,
}

const COPY: Record<Lang, Record<ServiceId, { h1: string; tagline: string; bullets: string[] }>> = {
  en: {
    paint: {
      h1: "Car painting",
      tagline: "Full resprays and single panels, painted in our own filtered booth.",
      bullets: [
        "Factory colour-code matching",
        "Full car or single-panel jobs",
        "Dust-free finish in our own booth",
        "Blending into faded neighbouring panels",
      ],
    },
    body: {
      h1: "Welding & bodywork",
      tagline: "Structural repair and sheet-metal work for any make or model.",
      bullets: [
        "Sheet-metal & structural repair",
        "Damaged panel replacement",
        "Quality materials, modern equipment",
        "Long-lasting repairs, not quick patches",
      ],
    },
    dent: {
      h1: "Dent removal",
      tagline: "Paintless spotter repair — faster and cheaper than replacing the panel.",
      bullets: [
        "No repainting needed in most cases",
        "Cheaper than a full panel swap",
        "Free diagnosis if a dent's too deep for spotter repair",
        "Works on all vehicle types",
      ],
    },
    rust: {
      h1: "Rust removal",
      tagline: "Stop corrosion before it spreads — cleaned, treated, and protected.",
      bullets: [
        "Full cleaning & treatment of the affected area",
        "Prevents rust from coming back",
        "Stops further metal damage",
        "Often paired with a colour-matched respray",
      ],
    },
    polish: {
      h1: "Body & headlight polishing",
      tagline: "Removes light scratches and restores headlight clarity.",
      bullets: [
        "Minor scratch & swirl removal",
        "Headlight clarity restoration",
        "Better visibility & safety at night",
        "All makes and models",
      ],
    },
    parts: {
      h1: "Replacing parts",
      tagline: "Damaged or worn parts found, sourced, and fitted.",
      bullets: [
        "Full diagnosis before any work starts",
        "New or used parts, your choice",
        "Used parts available to save money",
        "Competitive pricing",
      ],
    },
  },
  et: {
    paint: {
      h1: "Autovärvimine",
      tagline: "Täisvärvimised ja üksikud paneelid meie enda filtreeritud värvikambris.",
      bullets: [
        "Tehase värvikoodi sobitamine",
        "Kogu auto või üksikute paneelide värvimine",
        "Tolmuvaba viimistlus meie oma kambris",
        "Sobitamine pleekinud naaberpaneelidega",
      ],
    },
    body: {
      h1: "Keevitus ja kerekojatööd",
      tagline: "Kandekonstruktsiooni remont ja plekitööd kõikidele markidele ja mudelitele.",
      bullets: [
        "Plekitööd ja kandekonstruktsiooni remont",
        "Kahjustatud paneelide asendamine",
        "Kvaliteetsed materjalid, kaasaegne varustus",
        "Püsivad remondid, mitte kiirlapid",
      ],
    },
    dent: {
      h1: "Mõlkide eemaldamine",
      tagline: "Spotteriga mõlkide eemaldamine ilma värvimata — kiirem ja odavam kui paneeli vahetus.",
      bullets: [
        "Enamasti pole ümbervärvimist vaja",
        "Odavam kui täispaneeli vahetus",
        "Tasuta hindamine, kui mõlk on spotteriga eemaldamiseks liiga sügav",
        "Sobib kõikidele sõidukitüüpidele",
      ],
    },
    rust: {
      h1: "Roostetõrje",
      tagline: "Peatame korrosiooni enne levikut — puhastame, töötleme ja kaitseme.",
      bullets: [
        "Kahjustatud ala täielik puhastus ja töötlus",
        "Takistab rooste taastekkimist",
        "Peatab metalli edasise kahjustumise",
        "Sageli koos värvikoodile vastava värvimisega",
      ],
    },
    polish: {
      h1: "Kere ja esitulede poleerimine",
      tagline: "Eemaldab kergeid kriimustusi ja taastab esitulede selguse.",
      bullets: [
        "Väiksemate kriimustuste eemaldamine",
        "Esitulede selguse taastamine",
        "Parem nähtavus ja ohutus pimedas",
        "Kõik margid ja mudelid",
      ],
    },
    parts: {
      h1: "Osade vahetus",
      tagline: "Leiame, hangime ja paigaldame kahjustatud või kulunud osad.",
      bullets: [
        "Täielik hindamine enne töö algust",
        "Uued või kasutatud osad, sinu valik",
        "Kasutatud osad raha kokkuhoiuks",
        "Konkurentsivõimeline hind",
      ],
    },
  },
  ru: {
    paint: {
      h1: "Покраска автомобиля",
      tagline: "Полная перекраска и покраска отдельных панелей в нашей собственной камере с фильтрацией воздуха.",
      bullets: [
        "Подбор заводского кода цвета",
        "Покраска всего автомобиля или отдельных панелей",
        "Финиш без пыли в нашей камере",
        "Плавный переход на выцветшие соседние панели",
      ],
    },
    body: {
      h1: "Сварка и кузовные работы",
      tagline: "Ремонт несущих конструкций и работы по листовому металлу для любой марки и модели.",
      bullets: [
        "Ремонт листового металла и несущих конструкций",
        "Замена повреждённых панелей",
        "Качественные материалы, современное оборудование",
        "Долговечный ремонт, а не быстрая заплатка",
      ],
    },
    dent: {
      h1: "Удаление вмятин",
      tagline: "Беспокрасочный ремонт вмятин спотером — быстрее и дешевле, чем замена панели.",
      bullets: [
        "В большинстве случаев без перекраски",
        "Дешевле полной замены панели",
        "Бесплатная диагностика, если вмятина слишком глубокая для спотера",
        "Подходит для всех типов автомобилей",
      ],
    },
    rust: {
      h1: "Удаление ржавчины",
      tagline: "Останавливаем коррозию до того, как она распространится — очистка, обработка, защита.",
      bullets: [
        "Полная очистка и обработка повреждённого участка",
        "Предотвращает повторное появление ржавчины",
        "Останавливает дальнейшее повреждение металла",
        "Часто сочетается с подбором цвета и подкраской",
      ],
    },
    polish: {
      h1: "Полировка кузова и фар",
      tagline: "Удаляет мелкие царапины и восстанавливает прозрачность фар.",
      bullets: [
        "Удаление мелких царапин и потёртостей",
        "Восстановление прозрачности фар",
        "Лучшая видимость и безопасность в темноте",
        "Все марки и модели",
      ],
    },
    parts: {
      h1: "Замена деталей",
      tagline: "Находим, заказываем и устанавливаем повреждённые или изношенные детали.",
      bullets: [
        "Полная диагностика перед началом работ",
        "Новые или б/у детали — на ваш выбор",
        "Б/у детали для экономии бюджета",
        "Конкурентные цены",
      ],
    },
  },
}

export function getServiceContent(lang: Lang, id: ServiceId): ServiceContent {
  return { id, slug: SERVICE_SLUGS[id], icon: ICONS[id], photo: PHOTOS[id], ...COPY[lang][id] }
}

export function getServiceBySlug(slug: string): ServiceId | undefined {
  return (Object.keys(SERVICE_SLUGS) as ServiceId[]).find(id => SERVICE_SLUGS[id] === slug)
}
