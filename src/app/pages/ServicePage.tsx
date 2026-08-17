import { Link, Navigate, useParams } from "react-router"
import { getServiceBySlug, getServiceContent, type Lang, type ServiceId } from "../data/services"
import dropA from "../../imports/svc-drop-a.png"
import dropB from "../../imports/svc-drop-b.png"

function Icon({ id }: { id: string }) {
  return <svg><use href={`#${id}`} /></svg>
}

export default function ServicePage({
  lang, ctaLabel, backLabel, onGetEstimate,
}: {
  lang: Lang
  ctaLabel: string
  backLabel: string
  onGetEstimate: (id: ServiceId) => void
}) {
  const { slug } = useParams<{ slug: string }>()
  const id = slug ? getServiceBySlug(slug) : undefined

  if (!id) return <Navigate to="/services" replace />

  const svc = getServiceContent(lang, id)

  return (
    <div className="page on">
      <section
        className="sec svc-page-sec"
        style={{
          minHeight: "calc(100svh - var(--nav-h))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <img src={dropA} alt="" className="svc-page-drop svc-page-drop-a" aria-hidden="true" />
        <img src={dropB} alt="" className="svc-page-drop svc-page-drop-b" aria-hidden="true" />
        <div className="container" style={{ maxWidth: 900 }}>
          <Link to="/services" className="link svc-page-back">
            {backLabel}
          </Link>
          <div className="svc-page-layout">
            <h1 className="svc-page-title">{svc.h1}</h1>
            <div className="svc-page-photo">
              <img src={svc.photo} alt="" />
            </div>
            <div className="svc-page-desc">
              <p className="sub">{svc.tagline}</p>
              <ul className="svc-checklist">
                {svc.bullets.map((b, i) => (
                  <li key={i}>
                    <Icon id="i-check" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="svc-page-actions">
              <a className="btn btn-fill btn-lg" onClick={() => onGetEstimate(id)} style={{ cursor: "pointer" }}>
                {ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
