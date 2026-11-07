import type { StaticImageData } from "next/image";
import {
  mercedesCFrontBefore,
  mercedesCFrontAfter,
  bmwE90RearDoorBefore,
  bmwE90RearDoorAfter,
  mercedesW204RearLightBefore,
  mercedesW204RearLightAfter,
} from "../assets";
import type { ServiceId } from "./services";
import { slugsForLocale as serviceSlugsForLocale } from "./services";

export type LocalizedText = { et: string; ru: string; en: string };

// The repair categories a case study can belong to. Mirrors ServiceId for
// the six core services, plus "bumper" and "minorDamage" for the two
// dedicated sub-pages (/bumper-painting, /minor-damage) that aren't their
// own ServiceId. categoryHref() below resolves each to its actual page.
export type CaseStudyCategory = ServiceId | "bumper" | "minorDamage";

export type CaseStudyImage = {
  image: StaticImageData;
  alt: LocalizedText;
};

export type CaseStudy = {
  /** Stable, unique identifier - never reused, independent of slug. */
  id: string;
  /** Localized URL slugs, ASCII-only, matching the site's existing slug convention (RU reuses ET, like services/articles). */
  slug: { et: string; en: string };
  /** Gate for whether this entry is live anywhere - page, gallery, sitemap, nav. */
  published: boolean;
  category: CaseStudyCategory;
  title: LocalizedText;
  /** Short summary for the gallery card and meta description. */
  description: LocalizedText;
  vehicle?: { make?: string; model?: string };
  /**
   * Actual damage, in the customer's or technician's own terms - not
   * invented. Required (not just present but meaningfully descriptive -
   * see MIN_MEANINGFUL_LENGTH): a title and two photos alone are not
   * enough to publish a project, see isPublishable() below.
   */
  damage: LocalizedText;
  before: CaseStudyImage;
  after: CaseStudyImage;
  /** Extra photos beyond the main before/after pair, if any exist. */
  additionalPhotos?: CaseStudyImage[];
  /** Longer lead-in for the detail page hero (paragraphs separated by a blank line); falls back to `description` when omitted. */
  intro?: LocalizedText;
  /** Search-result title/description when they should differ from `title`/`description`. The title is used as-is (no site suffix added). */
  seo?: { title: LocalizedText; description: LocalizedText };
  /** What was actually done - only include what's verified from the job record. Required, same reasoning as damage. */
  workPerformed: LocalizedText;
  /** What the photos show after the work - only what is visible, never an unverified claim. */
  result?: LocalizedText;
  /** Short, honest guidance for someone with similar damage. */
  considerations?: LocalizedText;
  /** Ordered process steps, only if the actual job record supports them. */
  process?: LocalizedText[];
  /** Materials or methods, only when verified for this specific job. */
  materials?: LocalizedText;
  /** ISO date (YYYY-MM-DD), only if the completion date is actually known. */
  completedDate?: string;
  /** Working days the job actually took, only if recorded. */
  durationDays?: number;
  /** ISO date; defaults to completedDate if omitted. */
  lastModified?: string;
};

// A project only becomes indexable once it has a real, descriptive
// account of the damage and the work performed - not just because
// `published` is true and it has a title and two images. Guards against
// a thin entry slipping onto the live site by accident; genuinely short
// but real text (e.g. "Ukse pisikriimustus" is too short, a full
// sentence or two is not) is what this is meant to require.
const MIN_MEANINGFUL_LENGTH = 15;

function isMeaningful(text: LocalizedText): boolean {
  return (["et", "ru", "en"] as const).every((l) => text[l].trim().length >= MIN_MEANINGFUL_LENGTH);
}

/** Whether a case study has enough real content to actually go live - the gate publishedCaseStudies() enforces, exported so it can also be used for authoring-time checks. */
export function isPublishable(c: CaseStudy): boolean {
  return c.published && isMeaningful(c.damage) && isMeaningful(c.workPerformed);
}

export function publishedCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.filter(isPublishable);
}

export function caseStudySlug(c: CaseStudy, locale: string): string {
  return locale === "en" ? c.slug.en : c.slug.et;
}

export function getCaseStudyBySlug(locale: string, slug: string): CaseStudy | undefined {
  return publishedCaseStudies().find((c) => caseStudySlug(c, locale) === slug);
}

export function caseStudiesByCategory(category: CaseStudyCategory): CaseStudy[] {
  return publishedCaseStudies().filter((c) => c.category === category);
}

/** Categories that actually have at least one published case study - the only ones the gallery filter UI should ever show. */
export function publishedCategories(): CaseStudyCategory[] {
  const seen = new Set<CaseStudyCategory>();
  for (const c of publishedCaseStudies()) seen.add(c.category);
  return Array.from(seen);
}

/** Resolves a category to the real page it should link to. */
export function categoryHref(category: CaseStudyCategory, locale: string) {
  if (category === "bumper") return { pathname: "/bumper-painting" } as const;
  if (category === "minorDamage") return { pathname: "/minor-damage" } as const;
  const slugs = serviceSlugsForLocale(locale);
  return { pathname: "/services/[slug]", params: { slug: slugs[category] } } as const;
}

/** For the quote-funnel preselect, which only knows the six core ServiceIds - bumper/minorDamage map to the closest real service (paint). */
export function categoryToServiceId(category: CaseStudyCategory): ServiceId {
  if (category === "bumper" || category === "minorDamage") return "paint";
  return category;
}

// Real before/after photos from actual completed Mpaint jobs only - no
// placeholder, stock, or invented entries. Every other part of the
// portfolio (route, sitemap entry, nav link, structured data) stays
// switched off automatically if this ever goes back to empty; see
// work/page.tsx, work/[slug]/page.tsx, Header.tsx and sitemap.ts, which
// all gate on publishedCaseStudies().
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "mercedes-c-class-w204-front-grille",
    slug: { et: "mercedes-c-esiosa-taastamine", en: "mercedes-c-front-restoration" },
    published: true,
    category: "body",
    vehicle: { make: "Mercedes-Benz", model: "C-Class (W204)" },
    title: {
      et: "Mercedes-Benz C-klassi esiosa taastamine Tallinnas",
      ru: "Восстановление передней части Mercedes-Benz C-класса в Таллинне",
      en: "Mercedes-Benz C-Class front-end restoration in Tallinn",
    },
    description: {
      et: "Mercedes-Benz C-klassi esiosas oli kahjustunud esivõre piirkond. Pärast tööde teostamist on esiosa taas terviklik ja korrektse välimusega.",
      ru: "У Mercedes-Benz C-класса была повреждена область передней решётки. После выполнения работ передняя часть снова выглядит целостно и аккуратно.",
      en: "This Mercedes-Benz C-Class had a damaged front grille area. After the work was completed, the front end looks whole and properly finished again.",
    },
    damage: {
      et: "Enne töid oli Mercedes-Benz C-klassi esivõre piirkond nähtavalt kahjustunud. Esiosa keskosa ei olnud terviklik ning auto esivaade vajas korrastamist.",
      ru: "До начала работ область передней решётки Mercedes-Benz C-класса была заметно повреждена. Центральная часть переда не была целостной, и внешний вид передней части автомобиля требовал приведения в порядок.",
      en: "Before the work, the front grille area of this Mercedes-Benz C-Class was visibly damaged. The centre of the front end wasn't intact, and the car's front view needed sorting out.",
    },
    before: {
      image: mercedesCFrontBefore,
      alt: {
        et: "Mercedes-Benz C-klassi esiosa enne töid, kahjustunud esivõre piirkond",
        ru: "Передняя часть Mercedes-Benz C-класса до работ, повреждённая область передней решётки",
        en: "Mercedes-Benz C-Class front end before the work, damaged front grille area",
      },
    },
    after: {
      image: mercedesCFrontAfter,
      alt: {
        et: "Mercedes-Benz C-klassi esiosa pärast töid, taastatud esivõre piirkond",
        ru: "Передняя часть Mercedes-Benz C-класса после работ, восстановленная область передней решётки",
        en: "Mercedes-Benz C-Class front end after the work, restored front grille area",
      },
    },
    workPerformed: {
      et: "Töö käigus taastati esivõre piirkonna välimus ning esiosa viidi tagasi korrektse ja tervikliku üldmuljeni.",
      ru: "В ходе работ был восстановлен внешний вид области передней решётки, и передняя часть автомобиля снова приобрела аккуратный и целостный вид.",
      en: "The work restored the appearance of the front grille area, bringing the front end back to a correct, complete overall look.",
    },
    process: [
      {
        et: "Kahjustuse ülevaatus.",
        ru: "Осмотр повреждения.",
        en: "Inspecting the damage.",
      },
      {
        et: "Esiosa detailide olukorra korrastamine.",
        ru: "Приведение в порядок деталей передней части.",
        en: "Sorting out the condition of the front-end parts.",
      },
      {
        et: "Pärast tööde lõpetamist oli esivõre piirkond taas korrektne ja visuaalselt terviklik.",
        ru: "После завершения работ область передней решётки снова стала аккуратной и визуально целостной.",
        en: "Once the work was finished, the grille area was correct and visually whole again.",
      },
    ],
  },
  {
    id: "bmw-e90-rear-door-scratches",
    slug: { et: "bmw-e90-tagaukse-kriimustuste-eemaldamine", en: "bmw-e90-rear-door-scratch-repair" },
    published: true,
    category: "minorDamage",
    vehicle: { make: "BMW", model: "3 Series (E90)" },
    title: {
      et: "BMW 3. seeria tagaukse kriimustuste eemaldamine Tallinnas",
      ru: "Устранение царапин на задней двери BMW 3 серии в Таллинне",
      en: "BMW 3 Series rear door scratch removal in Tallinn",
    },
    description: {
      et: "Tumesinise BMW 3. seeria tagauksel olid nähtavad pikad kriimustused. Pärast tööde teostamist ei ole varasemad kriimustused enam nähtavad ning ukse värvipind on ühtlasema välimusega.",
      ru: "На задней двери тёмно-синего BMW 3 серии были заметны длинные царапины. После выполнения работ прежние царапины больше не видны, а лакокрасочное покрытие двери выглядит более ровным.",
      en: "The rear door of this dark-blue BMW 3 Series had visible long scratches. After the work, the earlier scratches are no longer visible and the door's paint surface looks more even.",
    },
    damage: {
      et: "BMW tagaukse värvipinnal oli mitu horisontaalset kriimustust, mis paistsid selgelt ukse keskosas ja alumisel poolel.",
      ru: "На лакокрасочном покрытии задней двери BMW было несколько горизонтальных царапин, чётко заметных в средней и нижней части двери.",
      en: "The paint on the BMW's rear door had several horizontal scratches, clearly visible across the middle and lower part of the door.",
    },
    before: {
      image: bmwE90RearDoorBefore,
      alt: {
        et: "BMW 3. seeria tagauks enne töid, ukse keskosas ja alumisel poolel on nähtavad horisontaalsed kriimustused",
        ru: "Задняя дверь BMW 3 серии до работ, в средней и нижней части видны горизонтальные царапины",
        en: "BMW 3 Series rear door before the work, with horizontal scratches visible across the middle and lower part",
      },
    },
    after: {
      image: bmwE90RearDoorAfter,
      alt: {
        et: "BMW 3. seeria tagauks pärast töid, varasemad kriimustused ei ole fotol enam nähtavad",
        ru: "Задняя дверь BMW 3 серии после работ, прежние царапины на фото больше не видны",
        en: "BMW 3 Series rear door after the work, the earlier scratches no longer visible in the photo",
      },
    },
    workPerformed: {
      et: "Tööde käigus korrastati kahjustunud tagaukse värvipinna välimus.",
      ru: "В ходе работ был приведён в порядок внешний вид повреждённого лакокрасочного покрытия задней двери.",
      en: "During the work, the appearance of the damaged rear door paint surface was put right.",
    },
    process: [
      {
        et: "Pärast tööde teostamist ei ole varasemad kriimustused fotol enam eristatavad ning tagaukse pind näeb ühtlane välja.",
        ru: "После выполнения работ прежние царапины на фото больше не различимы, а поверхность задней двери выглядит ровной.",
        en: "After the work, the earlier scratches can no longer be made out in the photo, and the rear door surface looks even.",
      },
    ],
  },
  {
    id: "mercedes-c-class-w204-rear-light",
    slug: { et: "mercedes-c-klassi-tagatule-taastamine", en: "mercedes-c-class-rear-light-restoration" },
    published: true,
    // The closest existing service for a body/exterior part; "parts" (replacing parts) is deliberately not used, since replacement was never confirmed.
    category: "body",
    vehicle: { make: "Mercedes-Benz", model: "C-Class (W204) 4MATIC, white" },
    title: {
      et: "Mercedes-Benz C-klassi tagatule kahjustuse kõrvaldamine",
      ru: "Устранение повреждения заднего фонаря Mercedes-Benz C-класса",
      en: "Mercedes-Benz C-Class rear light damage repair",
    },
    seo: {
      title: {
        et: "Mercedes-Benz C-klassi tagatule taastamine | Mpaint Tallinn",
        ru: "Восстановление заднего фонаря Mercedes C-класса | Mpaint Таллин",
        en: "Mercedes C-Class rear light restoration | Mpaint Tallinn",
      },
      description: {
        et: "Vaata Mercedes-Benz C-klassi kahjustunud tagatule seisukorda enne ja pärast töid. Ehtsad fotod Mpainti tehtud töödest Tallinnas.",
        ru: "Посмотрите, как выглядел повреждённый задний фонарь Mercedes-Benz C-класса до и после работ. Настоящие фото работ Mpaint в Таллине.",
        en: "See the condition of a damaged Mercedes-Benz C-Class rear light before and after the work. Real photos of jobs done by Mpaint in Tallinn.",
      },
    },
    description: {
      et: "Valge Mercedes-Benz C-klassi (W204) tagatule väliskate oli pragunenud ja kahjustunud. Pärast tööde teostamist on tagatuli taas tervikliku ja korrektse välimusega.",
      ru: "У белого Mercedes-Benz C-класса (W204) был повреждён внешний рассеиватель заднего фонаря. После работ фонарь снова выглядит целостно и аккуратно.",
      en: "The outer lens of this white Mercedes-Benz C-Class (W204) rear light was cracked and damaged. After the work, the rear light looks whole and properly finished again.",
    },
    intro: {
      et: "Mpainti tehtud tööde näide: valge Mercedes-Benz C-klassi (W204) tagatule välimuse taastamine. Enne tööde teostamist oli tagatule välimine kate nähtavalt pragunenud ja kahjustunud ning osa tule pinnast oli kaetud teibiga.\n\nPärast tööde teostamist on tagatuli taas tervikliku ja korrektse välimusega. Fotode võrdlus näitab kahjustunud piirkonna seisukorda enne ja pärast.",
      ru: "Пример работы Mpaint: восстановление внешнего вида заднего фонаря белого Mercedes-Benz C-класса (W204). До работ внешний рассеиватель фонаря был заметно треснут и повреждён, а часть поверхности была заклеена скотчем.\n\nПосле работ задний фонарь снова выглядит целостно и аккуратно. Сравнение фотографий показывает состояние повреждённой области до и после.",
      en: "An example of Mpaint's work: restoring the appearance of the rear light on a white Mercedes-Benz C-Class (W204). Before the work, the light's outer cover was visibly cracked and damaged, and part of its surface was covered with tape.\n\nAfter the work, the rear light looks whole and properly finished again. The photo comparison shows the condition of the damaged area before and after.",
    },
    damage: {
      et: "Tagatule väliskattel olid nähtavad praod ja pinnakahjustused. Kahjustatud piirkonnas oli kasutatud teipi ning tule punased ja läbipaistvad osad olid kulunud välimusega.\n\nSellise kahjustuse korral tuleb hinnata tule seisukorda ja valida sobiv lahendus. Täpne parandamise või asendamise vajadus sõltub kahjustuse ulatusest.",
      ru: "На внешнем рассеивателе заднего фонаря были видны трещины и повреждения поверхности. В повреждённой области использовался скотч, а красные и прозрачные участки фонаря выглядели изношенными.\n\nПри таком повреждении нужно оценить состояние фонаря и выбрать подходящее решение. Нужен ли ремонт или замена, зависит от масштаба повреждения.",
      en: "The outer cover of the rear light had visible cracks and surface damage. Tape had been used over the damaged area, and the red and clear sections of the light looked worn.\n\nWith damage like this, the condition of the light has to be assessed and a suitable solution chosen. Whether it needs repair or replacement depends on how extensive the damage is.",
    },
    before: {
      image: mercedesW204RearLightBefore,
      alt: {
        et: "Mercedes-Benz C-klassi W204 tagatuli enne töid: kahjustunud ja kulunud väliskate, tule pinnal teip ja teibiga kinnitatud metallriba",
        ru: "Задний фонарь Mercedes-Benz C-класса W204 до работ: повреждённый и изношенный рассеиватель, на поверхности скотч и металлическая пластина, закреплённая скотчем",
        en: "Mercedes-Benz C-Class W204 rear light before the work: damaged, worn outer cover with tape and a metal strip taped on the surface",
      },
    },
    after: {
      image: mercedesW204RearLightAfter,
      alt: {
        et: "Valge Mercedes-Benz C-klassi W204 tagatuli pärast töid: terviklik tulekomplekt, selged punased ja läbipaistvad osad, teipi ei ole",
        ru: "Задний фонарь белого Mercedes-Benz C-класса W204 после работ: целый фонарь, чёткие красные и прозрачные участки, скотча нет",
        en: "Rear light of the white Mercedes-Benz C-Class W204 after the work: intact light assembly, clear red and transparent sections, no tape",
      },
    },
    workPerformed: {
      et: "Selle projekti käigus korrastati Mercedes-Benz C-klassi kahjustunud tagatule piirkond, mille tulemusel taastati tule terviklik välisilme.\n\nFotodel on näha enne töid kahjustunud tagatuli ja pärast töid korrektse välimusega tulekomplekt. Täpne töömeetod ei ole dokumenteeritud, seega ei väida me siin, et tulekomplekt vahetati või lääts parandati.",
      ru: "В рамках этого проекта была приведена в порядок повреждённая область заднего фонаря Mercedes-Benz C-класса, и фонарю вернули целостный внешний вид.\n\nНа фотографиях виден повреждённый задний фонарь до работ и фонарь в аккуратном состоянии после. Точный метод работы не задокументирован, поэтому мы не утверждаем, что фонарь заменили или отремонтировали рассеиватель.",
      en: "In this project, the damaged rear light area of the Mercedes-Benz C-Class was put right, restoring the light's complete outward appearance.\n\nThe photos show the damaged rear light before the work and a properly finished light assembly after it. The exact method hasn't been documented, so we don't claim here that the light was replaced or that its lens was repaired.",
    },
    result: {
      et: "Pärast tööde teostamist ei ole varasemad nähtavad praod ja teibiga kaetud kahjustused enam näha. Tagatule välisilme on ühtlasem ning detail sobitub visuaalselt auto kerega.",
      ru: "После работ прежние заметные трещины и повреждения, закрытые скотчем, больше не видны. Внешний вид заднего фонаря стал ровнее, а деталь визуально гармонично сочетается с кузовом автомобиля.",
      en: "After the work, the earlier visible cracks and the tape-covered damage can no longer be seen. The rear light looks more even and sits visually in line with the car body.",
    },
    considerations: {
      et: "Kui auto tagatule kate on pragunenud, tasub lasta kahjustuse ulatus üle vaadata. Väliselt nähtavad praod ei näita alati, kas kahjustatud on ka kinnitused, korpus või elektrilised osad.\n\nSobiv lahendus sõltub kahjustuse iseloomust ja detaili seisukorrast.\n\nMpaintiga saab ühendust võtta sõiduki kere- ja välisdetailidega seotud tööde hindamiseks.",
      ru: "Если рассеиватель заднего фонаря треснул, стоит показать автомобиль специалисту и оценить масштаб повреждения. Видимые снаружи трещины не всегда говорят о том, затронуты ли также крепления, корпус или электрические элементы.\n\nПодходящее решение зависит от характера повреждения и состояния детали.\n\nС Mpaint можно связаться, чтобы оценить работы, связанные с кузовом и внешними деталями автомобиля.",
      en: "If the cover of a car's rear light is cracked, it's worth having the extent of the damage checked. Cracks visible on the outside don't always show whether the mounting points, housing or electrical parts are also affected.\n\nThe right solution depends on the nature of the damage and the condition of the part.\n\nYou can contact Mpaint to have work on your vehicle's bodywork and exterior parts assessed.",
    },
  },
];
