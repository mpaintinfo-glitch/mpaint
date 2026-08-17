import { useEffect, useRef, useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import "./quote-funnel.css"

type Lang = "en" | "et" | "ru"
type ServiceId = "paint" | "body" | "dent" | "rust" | "polish" | "insurance" | "other"

// every service listed on the Services page, in the same order (paint + body
// cards, then the rust/dent/polish/insurance ribbon); "other" is offered
// separately as a small secondary chip, not a full card
const SERVICE_IDS: Exclude<ServiceId, "other">[] = ["paint", "body", "dent", "rust", "polish", "insurance"]
const SERVICE_ICON: Record<Exclude<ServiceId, "other">, string> = {
  paint: "i-spray",
  body: "i-weld",
  dent: "i-dent",
  rust: "i-rust",
  polish: "i-polish",
  insurance: "i-doc",
}

const STRINGS: Record<Lang, {
  step: string
  step1Title: string
  step2Title: string
  services: Record<Exclude<ServiceId, "other">, string>
  notSure: string
  carPlaceholder: string
  continueLabel: string
  back: string
  submit: string
  dropText: string
  removePhoto: string
  namePh: string
  phonePh: string
  notesLabel: string
  notesPh: string
  disclaimer: string
  close: string
  successTitle: string
  successDesc: string
  done: string
}> = {
  en: {
    step: "STEP",
    step1Title: "1 · Vehicle & Service",
    step2Title: "2 · Contact, Photos & Notes",
    services: { paint: "Car painting", body: "Welding & bodywork", dent: "Dent removal", rust: "Rust removal", polish: "Polishing", insurance: "Insurance cases" },
    notSure: "Not sure?",
    carPlaceholder: "Car make, model, year",
    continueLabel: "Continue",
    back: "Back",
    submit: "Submit request",
    dropText: "Add a photo of the damage",
    removePhoto: "Remove photo",
    namePh: "Name",
    phonePh: "Phone",
    notesLabel: "Optional: Tell us more about the work needed…",
    notesPh: "e.g., specific paint color codes, specific restoration desires, insurance company info, etc.",
    disclaimer: "We reply within 24 hours on working days.",
    close: "Close",
    successTitle: "Thank you!",
    successDesc: "Your request has been received. We'll get back to you within 24 hours on working days.",
    done: "Done",
  },
  et: {
    step: "SAMM",
    step1Title: "1 · Sõiduk ja teenus",
    step2Title: "2 · Kontakt, fotod ja märkused",
    services: { paint: "Autovärvimine", body: "Keevitus ja kerekojatööd", dent: "Mõlkide eemaldamine", rust: "Roostetõrje", polish: "Poleerimine", insurance: "Kindlustusjuhtumid" },
    notSure: "Pole kindel?",
    carPlaceholder: "Auto mark, mudel, aasta",
    continueLabel: "Jätka",
    back: "Tagasi",
    submit: "Saada päring",
    dropText: "Lisa foto kahjustusest",
    removePhoto: "Eemalda foto",
    namePh: "Nimi",
    phonePh: "Telefon",
    notesLabel: "Valikuline: räägi lähemalt vajaminevast tööst…",
    notesPh: "nt värvi koodid, konkreetsed restaureerimissoovid, kindlustusseltsi info jne.",
    disclaimer: "Vastame 24 tunni jooksul tööpäevadel.",
    close: "Sulge",
    successTitle: "Aitäh!",
    successDesc: "Sinu päring on vastu võetud. Võtame sinuga ühendust 24 tunni jooksul tööpäevadel.",
    done: "Valmis",
  },
  ru: {
    step: "ШАГ",
    step1Title: "1 · Автомобиль и услуга",
    step2Title: "2 · Контакты, фото и заметки",
    services: { paint: "Покраска автомобиля", body: "Сварка и кузовные работы", dent: "Удаление вмятин", rust: "Удаление ржавчины", polish: "Полировка", insurance: "Страховые случаи" },
    notSure: "Не уверены?",
    carPlaceholder: "Марка, модель, год автомобиля",
    continueLabel: "Продолжить",
    back: "Назад",
    submit: "Отправить заявку",
    dropText: "Добавьте фото повреждения",
    removePhoto: "Удалить фото",
    namePh: "Имя",
    phonePh: "Телефон",
    notesLabel: "Необязательно: расскажите подробнее о нужной работе…",
    notesPh: "например, коды цвета краски, пожелания по реставрации, данные страховой компании и т.д.",
    disclaimer: "Мы отвечаем в течение 24 часов в рабочие дни.",
    close: "Закрыть",
    successTitle: "Спасибо!",
    successDesc: "Ваша заявка получена. Мы свяжемся с вами в течение 24 часов в рабочие дни.",
    done: "Готово",
  },
}

function Icon({ id }: { id: string }) {
  return <svg><use href={`#${id}`} /></svg>
}

export default function QuoteFunnel({
  open, onClose, initialService, lang,
}: {
  open: boolean
  onClose: () => void
  initialService?: ServiceId | null
  lang: Lang
}) {
  const t = STRINGS[lang]
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState<"fwd" | "bwd">("fwd")
  const [services, setServices] = useState<Set<ServiceId>>(new Set())
  const [carInfo, setCarInfo] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [sent, setSent] = useState(false)
  const [photos, setPhotos] = useState<{ file: File; url: string }[]>([])
  const photoInputRef = useRef<HTMLInputElement>(null)
  const MAX_PHOTOS = 5

  useEffect(() => {
    if (open) {
      setStep(0)
      setDir("fwd")
      setServices(initialService ? new Set([initialService]) : new Set())
      setCarInfo("")
      setName("")
      setPhone("")
      setNotes("")
      setSent(false)
      setPhotos(prev => { prev.forEach(p => URL.revokeObjectURL(p.url)); return [] })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialService])

  const toggleService = (id: ServiceId) =>
    setServices(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const addPhotos = (files: FileList | null) => {
    if (!files) return
    const incoming = Array.from(files)
      .filter(f => f.type.startsWith("image/"))
      .slice(0, MAX_PHOTOS - photos.length)
      .map(file => ({ file, url: URL.createObjectURL(file) }))
    setPhotos(prev => [...prev, ...incoming])
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => {
      const target = prev[index]
      if (target) URL.revokeObjectURL(target.url)
      return prev.filter((_, i) => i !== index)
    })
  }

  const goStep = (n: number) => {
    setDir(n > step ? "fwd" : "bwd")
    setStep(n)
  }

  const handleOpenChange = (o: boolean) => {
    if (!o) onClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="qf-overlay" />
        <Dialog.Content className="qf-root qf-content" aria-describedby={undefined}>
          <Dialog.Title style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
            {t.step1Title}
          </Dialog.Title>

          <div className="qf-scroll">
          {!sent && (
            <div className="qf-header">
              <div className="qf-header-top">
                <span className="qf-steplabel">{t.step} {step + 1} / 2</span>
                <Dialog.Close className="qf-close" aria-label={t.close}>
                  <Icon id="i-close" />
                </Dialog.Close>
              </div>
              <div className="qf-progress">
                <span className={step >= 0 ? "active" : ""}><i /></span>
                <span className={step >= 1 ? "active" : ""}><i /></span>
              </div>
              <div className="qf-title">{step === 0 ? t.step1Title : t.step2Title}</div>
            </div>
          )}

          <div className="qf-body">
            {sent ? (
              <div className="qf-success">
                <div className="qf-success-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3>{t.successTitle}</h3>
                <p>{t.successDesc}</p>
                <button className="qf-btn qf-btn-primary" onClick={onClose} type="button">{t.done}</button>
              </div>
            ) : step === 0 ? (
              <div key="step0" className={`qf-step qf-step-${dir}`}>
                <div className="qf-cards-head">
                  <button
                    type="button"
                    className={`qf-chip-other${services.has("other") ? " selected" : ""}`}
                    onClick={() => toggleService("other")}
                  >
                    {t.notSure}
                  </button>
                </div>
                <div className="qf-cards">
                  {SERVICE_IDS.map(id => (
                    <button
                      key={id}
                      type="button"
                      className={`qf-card${services.has(id) ? " selected" : ""}`}
                      onClick={() => toggleService(id)}
                    >
                      <span className="qf-card-icon"><Icon id={SERVICE_ICON[id]} /></span>
                      <span className="qf-card-label">{t.services[id]}</span>
                    </button>
                  ))}
                </div>
                <div className="qf-field-block">
                  <input
                    className="qf-input" type="text" placeholder={t.carPlaceholder}
                    value={carInfo} onChange={e => setCarInfo(e.target.value)}
                  />
                </div>
                <div className="qf-actions">
                  <button
                    className="qf-btn qf-btn-primary" type="button"
                    disabled={services.size === 0}
                    style={services.size ? undefined : { opacity: .45, cursor: "not-allowed" }}
                    onClick={() => services.size > 0 && goStep(1)}
                  >
                    {t.continueLabel}
                  </button>
                </div>
              </div>
            ) : (
              <form key="step1" className={`qf-step qf-step-${dir}`} onSubmit={handleSubmit}>
                <input
                  ref={photoInputRef}
                  type="file" accept="image/*" multiple
                  style={{ display: "none" }}
                  onChange={e => { addPhotos(e.target.files); e.target.value = "" }}
                />
                {photos.length > 0 && (
                  <div className="qf-thumbs">
                    {photos.map((p, i) => (
                      <div className="qf-thumb" key={p.url}>
                        <img src={p.url} alt="" />
                        <button
                          type="button" className="qf-thumb-remove"
                          aria-label={t.removePhoto}
                          onClick={() => removePhoto(i)}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {photos.length < MAX_PHOTOS && (
                  <div
                    className="qf-drop"
                    onClick={() => photoInputRef.current?.click()}
                    role="button" tabIndex={0}
                    onKeyDown={e => { if (e.key === "Enter" || e.key === " ") photoInputRef.current?.click() }}
                  >
                    {t.dropText}
                  </div>
                )}
                <div className="qf-row">
                  <div className="qf-field-block">
                    <input className="qf-input" type="text" placeholder={t.namePh} required value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div className="qf-field-block">
                    <input className="qf-input" type="tel" placeholder={t.phonePh} required value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                </div>
                <div className="qf-field-block">
                  <label className="qf-field-label">{t.notesLabel}</label>
                  <textarea
                    className="qf-textarea" placeholder={t.notesPh} rows={3}
                    value={notes} onChange={e => setNotes(e.target.value)}
                  />
                </div>
                <div className="qf-disclaimer">{t.disclaimer}</div>
                <div className="qf-actions" style={{ marginTop: ".85rem" }}>
                  <button className="qf-btn qf-btn-secondary" type="button" onClick={() => goStep(0)}>{t.back}</button>
                  <button className="qf-btn qf-btn-primary" type="submit">{t.submit}</button>
                </div>
              </form>
            )}
          </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
