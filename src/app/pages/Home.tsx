import { useNavigate } from "react-router"
import { RIBBON_IDS, SERVICE_SLUGS } from "../data/services"

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export default function Home({
  t, sfondo, imgSvcL, imgSvcR, openQuote,
}: {
  t: any
  sfondo: string
  imgSvcL: string
  imgSvcR: string
  openQuote: () => void
}) {
  const navigate = useNavigate()

  return (
    <div className="page page-home on">
      <section
        className="hero relative w-full"
        style={{
          paddingTop: "28px",
          paddingBottom: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "hidden",
        }}
      >

        <div className="container hero-inner text-center" style={{ zIndex: 10 }}>
          <h1>
            {t.hero.titleLead}{" "}
            <span className="grad">{t.hero.titleGrad}</span>
          </h1>
        </div>

        <div className="hero-art w-full" style={{ flexShrink: 0 }}>
          <img
            src={sfondo}
            alt="MPAINT car painting workshop in Tallinn"
            className="hero-sfondo"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              maxHeight: "50vh",
              objectFit: "cover",
              objectPosition: "center 60%",
            }}
          />
        </div>

        {/* Lead + CTAs */}
        <div
          className="container hero-lower flex flex-col items-center"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            zIndex: 10,
          }}
        >
          <p className="lead" style={{ textAlign: "center", margin: 0 }}>
            {t.hero.leadPre} <strong style={{ color: "var(--white)", fontWeight: 700 }}>{t.hero.leadCity}</strong>.
          </p>
          <div className="hero-btns flex gap-4" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <a className="btn btn-fill btn-lg text-[#944ba2]" onClick={() => openQuote()} style={{ cursor: "pointer" }}>
              {t.hero.ctaEstimate}
            </a>
            <a className="btn btn-call btn-lg" onClick={() => navigate("/services")} style={{ cursor: "pointer" }}>
              {t.hero.ctaWork}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="hero-scroll-indicator"
          style={{
            opacity: 0.6,
            pointerEvents: "none",
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <style>{`
            @keyframes subtle-bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(8px); }
            }
          `}</style>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ animation: "subtle-bounce 2s infinite ease-in-out" }}
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      <section className="sec">
        <div className="container center">
          <h2>{t.home.whatTitle}</h2>
          <p className="sub">{t.home.whatSub}</p>
        </div>
        <div className="container">
          <div className="svc-block">
            <div className="svc-band">
              <a className="svc-half" onClick={() => navigate("/services/" + SERVICE_SLUGS.paint)} style={{ cursor: "pointer" }}>
                <img src={imgSvcL} alt="Car painting" />
                <div className="svc-half-tint" />
                <div className="svc-half-info">
                  <h3>{t.home.paintTitle}</h3>
                  <p>{t.home.paintDesc}</p>
                  <span className="pick">{t.home.pick} <Arrow /></span>
                </div>
              </a>
              <a className="svc-half" onClick={() => navigate("/services/" + SERVICE_SLUGS.body)} style={{ cursor: "pointer" }}>
                <img src={imgSvcR} alt="Welding and bodywork" />
                <div className="svc-half-tint" />
                <div className="svc-half-info">
                  <h3>{t.home.bodyTitle}</h3>
                  <p>{t.home.bodyDesc}</p>
                  <span className="pick">{t.home.pick} <Arrow /></span>
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
        <div className="container center section-cta">
          <a className="btn btn-line" onClick={() => navigate("/services")} style={{ cursor: "pointer" }}>
            {t.home.seeAll}
          </a>
        </div>
      </section>

      <section className="sec section-compact seo-content-section">
        <div className="container seo-block seo-block--first">
          <h2>{t.home.seoTitle}</h2>
          <p>{t.home.seoP1}</p>
          <p>{t.home.seoP2}</p>
          <p>{t.home.seoP3}</p>
        </div>
        <div className="container seo-block">
          <h3>{t.home.whyTitle}</h3>
          <ul>
            {t.home.why.map((item: string, i: number) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </section>
    </div>
  )
}
