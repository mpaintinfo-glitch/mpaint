import dropBanner from "../../imports/drop-banner.png"

export default function Contact({
  t, openEmail,
}: {
  t: any
  openEmail: () => void
}) {
  return (
    <div className="page on">
      <section className="sec contact-main-sec" style={{ minHeight: "calc(100svh - var(--nav-h))" }}>
        <img src={dropBanner} alt="" aria-hidden="true" className="page-top-drip" />
        <div className="container center">
          <h1>{t.contact.h1}</h1>
        </div>
        <div className="container contact-panel-wrap">
          <div className="panel" style={{ padding: "1.5rem 2rem" }}>
            <div className="c-actions">
              <a className="ca" href="tel:+37258100810">
                <span className="ic"><svg><use href="#i-phone" /></svg></span>
                <span><small>{t.contact.callUs}</small><b>+372 58-100-810</b></span>
              </a>
              <a className="ca" href="https://wa.me/37258100810" target="_blank" rel="noopener">
                <span className="ic"><svg><use href="#i-wa" /></svg></span>
                <span><small>{t.contact.whatsapp}</small><b>{t.contact.whatsappValue}</b></span>
              </a>
              <a className="ca" onClick={openEmail} style={{ cursor: "pointer" }}>
                <span className="ic"><svg><use href="#i-mail" /></svg></span>
                <span><small>{t.contact.email}</small><b>info@mpaint.ee</b></span>
              </a>
            </div>
            <div className="contact-grid" style={{ marginTop: "1.25rem" }}>
              <ul className="c-list">
                <li><span>{t.contact.address}</span><b>{t.contact.addressValue}</b></li>
                <li><span>{t.contact.monFri}</span><b>{t.contact.hours}</b></li>
                <li><span>{t.contact.saturday}</span><b>{t.contact.byAgreement}</b></li>
                <li><span>{t.contact.sunday}</span><span className="muted">{t.contact.closed}</span></li>
              </ul>
              <a
                className="map"
                href="https://www.google.com/maps/d/u/0/viewer?mid=1AMfWsWKEnTSOeom7WzBO-gVjE_9qaY0&ll=59.422193400000005%2C24.75835850000001&z=17"
                target="_blank"
                rel="noopener"
                aria-label={t.contact.mapTitle}
                style={{ width: "192px", height: "192px", flexShrink: 0, margin: "0 auto" }}
              >
                <iframe
                  className="map-frame"
                  src="https://www.google.com/maps/d/embed?mid=1AMfWsWKEnTSOeom7WzBO-gVjE_9qaY0&ll=59.4221934%2C24.7583585&z=17"
                  title={t.contact.mapTitle}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  tabIndex={-1}
                />
                <span className="map-veil">{t.contact.mapCta}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="sec seo-content-section">
        <div className="container seo-block seo-block--first">
          <h2>{t.contact.seoTitle}</h2>
          <p>{t.contact.seoP1}</p>
          <p>{t.contact.seoP2}</p>
          <h3>{t.contact.hoursTitle}</h3>
          <p>{t.contact.hoursP}</p>
        </div>
      </section>
    </div>
  )
}
