import { Navigate, useParams } from "react-router"
import { getServiceBySlug, getServiceContent, type Lang, type ServiceId } from "../data/services"

function Icon({ id }: { id: string }) {
  return <svg><use href={`#${id}`} /></svg>
}

export default function ServicePage({
  lang, ctaLabel, callUsLabel, onGetEstimate,
}: {
  lang: Lang
  ctaLabel: string
  callUsLabel: string
  onGetEstimate: (id: ServiceId) => void
}) {
  const { slug } = useParams<{ slug: string }>()
  const id = slug ? getServiceBySlug(slug) : undefined

  if (!id) return <Navigate to="/services" replace />

  const svc = getServiceContent(lang, id)

  return (
    <div className="page on">
      <section
        className="sec"
        style={{
          minHeight: "calc(100svh - var(--nav-h))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="container center" style={{ maxWidth: 620 }}>
          <div className="svc-page-icon">
            <Icon id={svc.icon} />
          </div>
          <h1>{svc.h1}</h1>
          <p className="sub">{svc.tagline}</p>
          <ul className="svc-checklist">
            {svc.bullets.map((b, i) => (
              <li key={i}>
                <Icon id="i-check" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="hero-btns" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <a className="btn btn-fill btn-lg" onClick={() => onGetEstimate(id)} style={{ cursor: "pointer" }}>
              {ctaLabel}
            </a>
          </div>
          <a className="hero-secondary" href="tel:+37258100810">
            {callUsLabel}
          </a>
        </div>
      </section>
    </div>
  )
}
