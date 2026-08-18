import { Fragment } from "react"
import { useNavigate } from "react-router"
import { RIBBON_IDS, SERVICE_SLUGS } from "../data/services"

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export default function Services({
  t, imgSvcL, imgSvcR, openQuote,
}: {
  t: any
  imgSvcL: string
  imgSvcR: string
  openQuote: () => void
}) {
  const navigate = useNavigate()

  return (
    <div className="page on">
      <section
        className="sec svc-cta-zone"
        style={{
          minHeight: "calc(100svh - var(--nav-h))",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <div className="container center" style={{ maxWidth: 820 }}>
          <h1>{t.services.h1}</h1>
        </div>

        <div className="container">
          <div className="svc-block">
            <div className="svc-band">
              <a className="svc-half" onClick={() => navigate("/services/" + SERVICE_SLUGS.paint)} style={{ cursor: "pointer" }}>
                <img src={imgSvcL} alt="Car painting booth" />
                <div className="svc-half-tint" />
                <div className="svc-half-info">
                  <h3>{t.services.paintTitle}</h3>
                  <p>{t.services.paintDesc}</p>
                  <span className="pick">{t.services.pick} <Arrow /></span>
                </div>
              </a>
              <a className="svc-half" onClick={() => navigate("/services/" + SERVICE_SLUGS.body)} style={{ cursor: "pointer" }}>
                <img src={imgSvcR} alt="Body repair work" />
                <div className="svc-half-tint" />
                <div className="svc-half-info">
                  <h3>{t.services.bodyTitle}</h3>
                  <p>{t.services.bodyDesc}</p>
                  <span className="pick">{t.services.pick} <Arrow /></span>
                </div>
              </a>
            </div>
            <div
              className="svc-ribbon"
              style={{ gridTemplateColumns: "repeat(4,1fr)", background: "linear-gradient(100deg,#E0007A 0%,#8B3FD8 100%)" }}
            >
              {RIBBON_IDS.map(id => (
                <a key={id} className="svc-seg" onClick={() => navigate("/services/" + SERVICE_SLUGS[id])} style={{ cursor: "pointer" }}>
                  <span>{t.ribbon[id]}</span>
                  <Arrow />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="container center" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
          <a className="btn btn-fill btn-lg" onClick={() => openQuote()} style={{ cursor: "pointer" }}>
            {t.services.cta}
          </a>
          <a className="hero-secondary" href="tel:+37258100810">
            {t.services.callUs}
          </a>
        </div>

      </section>
      <section className="sec seo-content-section">
        <div className="container seo-block seo-block--first">
          <h2>{t.services.seoTitle}</h2>
          <p>{t.services.seoP1}</p>
          <p>{t.services.seoP2}</p>
          <p>{t.services.seoP3}</p>
        </div>
      </section>
      <section className="sec">
        <div className="container seo-block seo-block--first">
          <h2>{t.booking.faqTitle}</h2>
          {t.booking.faq.map((item: { q: string; a: string }, i: number) => (
            <Fragment key={i}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </Fragment>
          ))}
        </div>
      </section>
    </div>
  )
}
