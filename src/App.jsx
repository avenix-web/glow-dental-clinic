import { useState, useEffect, useRef } from "react";

const WHATSAPP_URL =
  "https://wa.me/919776655134?text=Hello%20Glow%20Dental%20Clinic,%20I%20would%20like%20to%20book%20an%20appointment.";
const PHONE = "tel:+919776655134";
const MAPS_EMBED =
  "https://www.google.com/maps?q=Glow+Dental+Clinic+Bhubaneswar&output=embed";

const NAV_LINKS = ["Home", "About", "Services", "Reviews", "Contact"];

const SERVICES = [
  {
    icon: "🦷",
    title: "Dental Cleaning",
    desc: "Professional scaling and polishing to remove plaque, tartar, and stains for a healthier, brighter smile.",
  },
  {
    icon: "🔬",
    title: "Root Canal Treatment",
    desc: "Gentle, painless RCT using modern rotary instruments to save your natural tooth and eliminate infection.",
  },
  {
    icon: "✨",
    title: "Teeth Whitening",
    desc: "Advanced LED-activated whitening that lightens your smile up to 8 shades in a single visit.",
  },
  {
    icon: "😁",
    title: "Braces & Aligners",
    desc: "Metal, ceramic braces and clear aligners for a perfectly aligned, confident smile at any age.",
  },
  {
    icon: "🏆",
    title: "Dental Implants",
    desc: "Titanium implants that look, feel, and function exactly like natural teeth — a lifetime solution.",
  },
  {
    icon: "💎",
    title: "Cosmetic Dentistry",
    desc: "Veneers, bonding, contouring and smile makeovers tailored to give you your dream smile.",
  },
];

const REVIEWS = [
  {
    name: "Smruti Ranjan Mallick",
    avatar: "S",
    rating: 5,
    text: "Best dental experience I've ever had. Painless procedure and top-notch care. The staff is incredibly warm and the clinic is spotlessly clean.",
  },
  {
    name: "Bibek Jena",
    avatar: "B",
    rating: 5,
    text: "Doctors are very professional and caring. Highly recommend Glow Dental to anyone looking for quality dental care in Bhubaneswar.",
  },
];

const ACCESSIBILITY = [
  { icon: "♿", label: "Wheelchair Accessible Entrance" },
  { icon: "🪑", label: "Accessible Seating" },
  { icon: "🚻", label: "Accessible Restroom" },
  { icon: "🅿️", label: "Free Parking Available" },
];

function useScrollSpy() {
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const handler = () => {
      const sections = NAV_LINKS.map((id) =>
        document.getElementById(id.toLowerCase())
      );
      const scrollY = window.scrollY + 100;
      sections.forEach((sec) => {
        if (sec && sec.offsetTop <= scrollY) setActive(sec.id.charAt(0).toUpperCase() + sec.id.slice(1));
      });
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Stars({ n = 5 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} style={{ color: "#f59e0b", fontSize: 16 }}>★</span>
      ))}
    </div>
  );
}

export default function GlowDentalClinic() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const [heroRef, heroVisible] = useInView(0.1);
  const [aboutRef, aboutVisible] = useInView(0.1);
  const [servicesRef, servicesVisible] = useInView(0.05);
  const [reviewsRef, reviewsVisible] = useInView(0.1);
  const [ctaRef, ctaVisible] = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: #f8fdfe; color: #1a2e35; }

        :root {
          --cyan: #06b6d4;
          --teal: #0d9488;
          --teal-dark: #0f766e;
          --cyan-light: #cffafe;
          --sky: #e0f7fa;
          --white: #ffffff;
          --text: #1a2e35;
          --muted: #64748b;
          --card-bg: #ffffff;
          --border: rgba(6,182,212,0.15);
        }

        /* Navbar */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: all 0.3s ease;
          padding: 0 1.5rem;
        }
        .navbar.scrolled {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          box-shadow: 0 1px 24px rgba(6,182,212,0.12);
        }
        .navbar-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          height: 70px;
        }
        .logo {
          font-family: 'Sora', sans-serif; font-weight: 800; font-size: 1.4rem;
          background: linear-gradient(135deg, #06b6d4, #0d9488);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          letter-spacing: -0.3px; cursor: pointer; text-decoration: none;
        }
        .logo span { display: inline-block; }
        .nav-links { display: flex; gap: 0.25rem; list-style: none; }
        .nav-links a {
          font-size: 0.9rem; font-weight: 500; color: var(--muted);
          padding: 0.4rem 0.85rem; border-radius: 999px;
          text-decoration: none; cursor: pointer;
          transition: all 0.2s; display: block;
        }
        .nav-links a:hover, .nav-links a.active { color: var(--teal); background: rgba(6,182,212,0.08); }
        .btn-primary {
          background: linear-gradient(135deg, #06b6d4, #0d9488);
          color: #fff; font-weight: 600; font-size: 0.9rem;
          padding: 0.55rem 1.25rem; border-radius: 999px;
          border: none; cursor: pointer; text-decoration: none;
          display: inline-flex; align-items: center; gap: 0.4rem;
          transition: all 0.25s; box-shadow: 0 4px 14px rgba(6,182,212,0.35);
          white-space: nowrap;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(6,182,212,0.45); }
        .btn-secondary {
          background: #fff; color: var(--teal); font-weight: 600; font-size: 0.9rem;
          padding: 0.55rem 1.25rem; border-radius: 999px;
          border: 2px solid var(--cyan); cursor: pointer; text-decoration: none;
          display: inline-flex; align-items: center; gap: 0.4rem;
          transition: all 0.25s;
        }
        .btn-secondary:hover { background: var(--sky); transform: translateY(-2px); }
        .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 0.25rem; }

        /* Hero */
        #home {
          min-height: 100vh; display: flex; align-items: center;
          background: linear-gradient(145deg, #f0fdfe 0%, #e0f7fa 40%, #ccfbf1 100%);
          padding-top: 70px; overflow: hidden; position: relative;
        }
        #home::before {
          content: ''; position: absolute; top: -100px; right: -100px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        #home::after {
          content: ''; position: absolute; bottom: -80px; left: -80px;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(13,148,136,0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-inner {
          max-width: 1200px; margin: 0 auto; padding: 4rem 1.5rem;
          display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(6,182,212,0.12); border: 1px solid rgba(6,182,212,0.3);
          color: var(--teal); font-size: 0.8rem; font-weight: 600;
          padding: 0.35rem 0.9rem; border-radius: 999px; margin-bottom: 1.25rem;
        }
        .hero-title {
          font-family: 'Sora', sans-serif; font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 800; line-height: 1.15; margin-bottom: 1.25rem; color: var(--text);
        }
        .hero-title .gradient-text {
          background: linear-gradient(135deg, #06b6d4, #0d9488);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .hero-desc { font-size: 1.05rem; color: var(--muted); line-height: 1.7; margin-bottom: 2rem; max-width: 480px; }
        .hero-btns { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .hero-stats {
          display: flex; gap: 2rem; margin-top: 2.5rem; flex-wrap: wrap;
        }
        .stat { display: flex; flex-direction: column; }
        .stat-num { font-family: 'Sora', sans-serif; font-size: 1.6rem; font-weight: 800; color: var(--teal); }
        .stat-label { font-size: 0.78rem; color: var(--muted); font-weight: 500; }

        /* Hero visual */
        .hero-visual {
          position: relative; display: flex; justify-content: center; align-items: center;
        }
        .hero-img-wrap {
          width: 100%; max-width: 480px; aspect-ratio: 4/3;
          border-radius: 2rem; overflow: hidden;
          box-shadow: 0 25px 60px rgba(6,182,212,0.2);
          position: relative;
        }
        .hero-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .hero-float-card {
          position: absolute; background: #fff;
          border-radius: 1rem; padding: 0.75rem 1rem;
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          display: flex; align-items: center; gap: 0.6rem;
          font-size: 0.82rem; font-weight: 600; color: var(--text);
          animation: float 3s ease-in-out infinite;
        }
        .hero-float-card.left { bottom: 2rem; left: -1.5rem; }
        .hero-float-card.top { top: 2rem; right: -1rem; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        /* Section common */
        section { padding: 5rem 1.5rem; }
        .section-inner { max-width: 1200px; margin: 0 auto; }
        .section-tag {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: rgba(6,182,212,0.08); border: 1px solid rgba(6,182,212,0.2);
          color: var(--teal); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em;
          padding: 0.3rem 0.85rem; border-radius: 999px; margin-bottom: 1rem; text-transform: uppercase;
        }
        .section-title {
          font-family: 'Sora', sans-serif; font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 800; line-height: 1.2; color: var(--text); margin-bottom: 0.85rem;
        }
        .section-sub { font-size: 1rem; color: var(--muted); line-height: 1.7; max-width: 560px; }

        /* About */
        #about { background: #fff; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5rem; align-items: center; }
        .about-img {
          border-radius: 1.5rem; overflow: hidden;
          box-shadow: 0 20px 50px rgba(6,182,212,0.15);
          aspect-ratio: 4/3;
        }
        .about-img img { width: 100%; height: 100%; object-fit: cover; }
        .about-text .section-sub { max-width: 100%; margin-bottom: 2rem; }
        .access-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .access-card {
          display: flex; align-items: center; gap: 0.65rem;
          background: var(--sky); border-radius: 0.75rem; padding: 0.7rem 0.9rem;
          font-size: 0.85rem; font-weight: 500; color: var(--text);
          transition: all 0.2s;
        }
        .access-card:hover { background: rgba(6,182,212,0.12); transform: translateX(3px); }
        .access-card span:first-child { font-size: 1.3rem; }

        /* Services */
        #services { background: linear-gradient(180deg, #f8fdfe 0%, #e8faf9 100%); }
        .services-header { text-align: center; margin-bottom: 3rem; }
        .services-header .section-sub { margin: 0 auto; }
        .services-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem;
        }
        .service-card {
          background: #fff; border-radius: 1.25rem; padding: 1.75rem;
          border: 1px solid var(--border);
          box-shadow: 0 4px 20px rgba(6,182,212,0.07);
          transition: all 0.3s; cursor: default;
        }
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 35px rgba(6,182,212,0.16);
          border-color: rgba(6,182,212,0.3);
        }
        .service-icon {
          width: 52px; height: 52px; border-radius: 0.9rem;
          background: linear-gradient(135deg, rgba(6,182,212,0.12), rgba(13,148,136,0.12));
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; margin-bottom: 1rem;
        }
        .service-title { font-family: 'Sora', sans-serif; font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text); }
        .service-desc { font-size: 0.875rem; color: var(--muted); line-height: 1.6; }

        /* Reviews */
        #reviews { background: #fff; }
        .reviews-header { text-align: center; margin-bottom: 3rem; }
        .reviews-header .section-sub { margin: 0 auto; }
        .reviews-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .review-card {
          background: linear-gradient(135deg, #f8fdfe, #f0fdfa);
          border-radius: 1.25rem; padding: 1.75rem;
          border: 1px solid rgba(6,182,212,0.12);
          box-shadow: 0 4px 20px rgba(6,182,212,0.07);
          position: relative; overflow: hidden;
          transition: all 0.3s;
        }
        .review-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(6,182,212,0.15); }
        .review-card::before {
          content: '"'; position: absolute; top: -10px; right: 1.25rem;
          font-size: 6rem; color: rgba(6,182,212,0.08);
          font-family: 'Sora', sans-serif; font-weight: 900; line-height: 1;
        }
        .review-text { font-size: 0.95rem; color: var(--text); line-height: 1.7; margin-bottom: 1.25rem; }
        .reviewer { display: flex; align-items: center; gap: 0.75rem; }
        .avatar {
          width: 42px; height: 42px; border-radius: 50%;
          background: linear-gradient(135deg, #06b6d4, #0d9488);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-weight: 700; font-size: 1rem; font-family: 'Sora', sans-serif;
          flex-shrink: 0;
        }
        .reviewer-name { font-weight: 700; font-size: 0.9rem; color: var(--text); }

        /* CTA section */
        #contact {
          background: linear-gradient(135deg, #0d9488 0%, #06b6d4 50%, #0891b2 100%);
          text-align: center; position: relative; overflow: hidden;
        }
        #contact::before {
          content: ''; position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1.5' fill='white' fill-opacity='0.07'/%3E%3C/svg%3E") repeat;
        }
        .cta-inner { position: relative; z-index: 1; }
        .cta-title {
          font-family: 'Sora', sans-serif; font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 800; color: #fff; margin-bottom: 1rem;
        }
        .cta-sub { font-size: 1.05rem; color: rgba(255,255,255,0.85); margin-bottom: 2rem; }
        .btn-white {
          background: #fff; color: var(--teal-dark); font-weight: 700; font-size: 1rem;
          padding: 0.85rem 2rem; border-radius: 999px;
          border: none; cursor: pointer; text-decoration: none;
          display: inline-flex; align-items: center; gap: 0.5rem;
          transition: all 0.25s; box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
        .btn-white:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }

        /* Map */
        .map-section { background: #f8fdfe; padding: 5rem 1.5rem; }
        .map-header { text-align: center; margin-bottom: 2.5rem; }
        .map-wrap {
          max-width: 900px; margin: 0 auto;
          border-radius: 1.5rem; overflow: hidden;
          box-shadow: 0 16px 45px rgba(6,182,212,0.15);
          border: 3px solid rgba(6,182,212,0.2);
        }
        .map-wrap iframe { display: block; }

        /* Footer */
        footer { background: #0f1f24; color: #94a3b8; padding: 3rem 1.5rem 2rem; }
        .footer-inner { max-width: 1200px; margin: 0 auto; }
        .footer-top {
          display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem;
          padding-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.07);
          margin-bottom: 1.75rem;
        }
        .footer-logo {
          font-family: 'Sora', sans-serif; font-weight: 800; font-size: 1.4rem;
          background: linear-gradient(135deg, #06b6d4, #0d9488);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          margin-bottom: 0.75rem;
        }
        .footer-desc { font-size: 0.875rem; line-height: 1.7; color: #64748b; max-width: 280px; }
        .footer-col h4 { font-size: 0.85rem; font-weight: 700; color: #e2e8f0; margin-bottom: 1rem; letter-spacing: 0.06em; text-transform: uppercase; }
        .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
        .footer-col ul li { font-size: 0.875rem; color: #64748b; }
        .footer-btns { display: flex; flex-direction: column; gap: 0.6rem; }
        .footer-btn {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.85rem; font-weight: 600; padding: 0.6rem 1rem; border-radius: 0.6rem;
          text-decoration: none; transition: all 0.2s; cursor: pointer;
        }
        .footer-btn.call { background: rgba(6,182,212,0.1); color: #06b6d4; border: 1px solid rgba(6,182,212,0.2); }
        .footer-btn.call:hover { background: rgba(6,182,212,0.18); }
        .footer-btn.wa { background: rgba(37,211,102,0.1); color: #25d366; border: 1px solid rgba(37,211,102,0.2); }
        .footer-btn.wa:hover { background: rgba(37,211,102,0.18); }
        .footer-bottom { text-align: center; font-size: 0.78rem; color: #374151; }

        /* Floating WA */
        .float-wa {
          position: fixed; bottom: 1.75rem; right: 1.75rem; z-index: 200;
          width: 58px; height: 58px; border-radius: 50%;
          background: #25d366; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.6rem; text-decoration: none;
          box-shadow: 0 6px 24px rgba(37,211,102,0.45);
          animation: pulse-wa 2.5s infinite;
          transition: transform 0.2s;
        }
        .float-wa:hover { transform: scale(1.1); }
        @keyframes pulse-wa {
          0%,100%{box-shadow:0 6px 24px rgba(37,211,102,0.45)}
          50%{box-shadow:0 6px 36px rgba(37,211,102,0.7)}
        }

        /* Fade-in animation */
        .fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        .fade-up-d1 { transition-delay: 0.1s; }
        .fade-up-d2 { transition-delay: 0.2s; }
        .fade-up-d3 { transition-delay: 0.3s; }
        .fade-up-d4 { transition-delay: 0.4s; }
        .fade-up-d5 { transition-delay: 0.5s; }
        .fade-up-d6 { transition-delay: 0.6s; }

        /* Mobile menu */
        .mobile-menu {
          position: fixed; top: 70px; left: 0; right: 0; z-index: 99;
          background: rgba(255,255,255,0.97); backdrop-filter: blur(20px);
          padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 0.5rem;
          box-shadow: 0 12px 30px rgba(6,182,212,0.1);
          transform: translateY(-120%); opacity: 0;
          transition: all 0.3s;
        }
        .mobile-menu.open { transform: translateY(0); opacity: 1; }
        .mobile-menu a {
          font-size: 1rem; font-weight: 500; color: var(--muted);
          padding: 0.65rem 0.9rem; border-radius: 0.5rem; text-decoration: none;
          transition: all 0.2s;
        }
        .mobile-menu a:hover { background: var(--sky); color: var(--teal); }
        .mobile-menu .btn-primary { text-align: center; justify-content: center; }

        /* Responsive */
        @media (max-width: 900px) {
          .nav-links, .navbar .btn-primary { display: none; }
          .hamburger { display: flex; flex-direction: column; gap: 5px; }
          .hamburger span { display: block; width: 22px; height: 2px; background: var(--teal); border-radius: 2px; transition: all 0.3s; }
          .hero-inner { grid-template-columns: 1fr; text-align: center; }
          .hero-desc { margin: 0 auto 2rem; }
          .hero-btns { justify-content: center; }
          .hero-stats { justify-content: center; }
          .hero-visual { display: none; }
          .about-grid { grid-template-columns: 1fr; }
          .about-img { display: none; }
          .services-grid { grid-template-columns: 1fr 1fr; }
          .reviews-grid { grid-template-columns: 1fr; }
          .footer-top { grid-template-columns: 1fr; gap: 2rem; }
        }
        @media (max-width: 600px) {
          .services-grid { grid-template-columns: 1fr; }
          .access-grid { grid-template-columns: 1fr; }
          section { padding: 3.5rem 1.25rem; }
          .hero-inner { padding: 3rem 1.25rem; }
        }
      `}</style>

      {/* Navbar */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="navbar-inner">
          <span className="logo" onClick={() => scrollTo("home")}>
            🦷 Glow Dental
          </span>
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <a
                  className={activeSection === l ? "active" : ""}
                  onClick={() => scrollTo(l)}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            📅 Book Now
          </a>
          <button className="hamburger" onClick={() => setMenuOpen((p) => !p)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <a key={l} onClick={() => scrollTo(l)}>{l}</a>
        ))}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
          📅 Book Now
        </a>
      </div>

      {/* Hero */}
      <section id="home">
        <div className="hero-inner" ref={heroRef}>
          <div>
            <div className={`fade-up${heroVisible ? " visible" : ""}`}>
              <div className="hero-badge">
                <span>⭐</span> Trusted Dental Care in Bhubaneswar
              </div>
            </div>
            <h1 className={`hero-title fade-up fade-up-d1${heroVisible ? " visible" : ""}`}>
              Brighten Your Smile<br />
              With <span className="gradient-text">Expert Dental</span> Care
            </h1>
            <p className={`hero-desc fade-up fade-up-d2${heroVisible ? " visible" : ""}`}>
              At Glow Dental Clinic, we combine advanced technology with compassionate care
              to give you a smile you'll love. From routine check-ups to complete smile makeovers —
              we're with you every step.
            </p>
            <div className={`hero-btns fade-up fade-up-d3${heroVisible ? " visible" : ""}`}>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                💬 Book Appointment
              </a>
              <a href={PHONE} className="btn-secondary">
                📞 Call Now
              </a>
            </div>
            <div className={`hero-stats fade-up fade-up-d4${heroVisible ? " visible" : ""}`}>
              <div className="stat"><span className="stat-num">2000+</span><span className="stat-label">Happy Patients</span></div>
              <div className="stat"><span className="stat-num">5★</span><span className="stat-label">Google Rating</span></div>
              <div className="stat"><span className="stat-num">10+</span><span className="stat-label">Years Experience</span></div>
            </div>
          </div>

          <div className={`hero-visual fade-up fade-up-d2${heroVisible ? " visible" : ""}`}>
            <div className="hero-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80"
                alt="Modern dental clinic"
              />
            </div>
            <div className="hero-float-card left">
              <span>✅</span> Painless Treatment
            </div>
            <div className="hero-float-card top">
              <span>🏥</span> Modern Equipment
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about">
        <div className="section-inner about-grid" ref={aboutRef}>
          <div className={`about-img fade-up${aboutVisible ? " visible" : ""}`}>
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
              alt="Dental clinic interior"
            />
          </div>
          <div className={`about-text fade-up fade-up-d2${aboutVisible ? " visible" : ""}`}>
            <div className="section-tag">🏥 About Us</div>
            <h2 className="section-title">Your Comfort Is Our Priority</h2>
            <p className="section-sub">
              Glow Dental Clinic is Bhubaneswar's premier destination for comprehensive dental care.
              Our experienced team of dental professionals uses the latest technology to deliver
              painless, precise, and personalized treatments in a warm, welcoming environment.
              We believe every patient deserves a healthy, beautiful smile — and we're committed to making that a reality.
            </p>
            <div className="access-grid">
              {ACCESSIBILITY.map((a) => (
                <div className="access-card" key={a.label}>
                  <span>{a.icon}</span>
                  <span>{a.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services">
        <div className="section-inner" ref={servicesRef}>
          <div className="services-header">
            <div className="section-tag">🦷 Our Services</div>
            <h2 className="section-title">Comprehensive Dental Care</h2>
            <p className="section-sub">
              From preventive care to advanced cosmetic procedures, we offer a complete range of dental treatments.
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className={`service-card fade-up fade-up-d${Math.min(i + 1, 6)}${servicesVisible ? " visible" : ""}`}
              >
                <div className="service-icon">{s.icon}</div>
                <div className="service-title">{s.title}</div>
                <div className="service-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews">
        <div className="section-inner" ref={reviewsRef}>
          <div className="reviews-header">
            <div className="section-tag">💬 Testimonials</div>
            <h2 className="section-title">What Our Patients Say</h2>
            <p className="section-sub">
              Real stories from real patients who trusted us with their smiles.
            </p>
          </div>
          <div className="reviews-grid">
            {REVIEWS.map((r, i) => (
              <div
                key={r.name}
                className={`review-card fade-up fade-up-d${i + 1}${reviewsVisible ? " visible" : ""}`}
              >
                <Stars />
                <p className="review-text" style={{ marginTop: "0.85rem" }}>"{r.text}"</p>
                <div className="reviewer">
                  <div className="avatar">{r.avatar}</div>
                  <div>
                    <div className="reviewer-name">{r.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>Verified Patient</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact">
        <div className="section-inner cta-inner" ref={ctaRef}>
          <div className={`fade-up${ctaVisible ? " visible" : ""}`}>
            <div className="section-tag" style={{ color: "rgba(255,255,255,0.85)", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)" }}>
              📅 Book Today
            </div>
          </div>
          <h2 className={`cta-title fade-up fade-up-d1${ctaVisible ? " visible" : ""}`}>
            Ready to Transform<br />Your Smile?
          </h2>
          <p className={`cta-sub fade-up fade-up-d2${ctaVisible ? " visible" : ""}`}>
            Book your appointment in seconds via WhatsApp. No waiting, no hassle.
          </p>
          <div className={`fade-up fade-up-d3${ctaVisible ? " visible" : ""}`}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-white">
              <span>💬</span> Book Appointment on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Map */}
      <div className="map-section">
        <div className="map-header">
          <div className="section-tag" style={{ margin: "0 auto 0.75rem" }}>📍 Find Us</div>
          <h2 className="section-title" style={{ textAlign: "center" }}>Visit Our Clinic</h2>
          <p style={{ textAlign: "center", color: "var(--muted)", fontSize: "0.95rem" }}>
            Glow Dental Clinic, Bhubaneswar, Odisha, India
          </p>
        </div>
        <div className="map-wrap">
          <iframe
            src={MAPS_EMBED}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Glow Dental Clinic Location"
          />
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-logo">🦷 Glow Dental Clinic</div>
              <p className="footer-desc">
                Premium dental care in the heart of Bhubaneswar. Your smile is our passion
                — trust us to keep it glowing.
              </p>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li>📞 +91 97766 55134</li>
                <li>💬 WhatsApp Available</li>
                <li>📍 Bhubaneswar, Odisha</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Quick Actions</h4>
              <div className="footer-btns">
                <a href={PHONE} className="footer-btn call">📞 Call Clinic</a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="footer-btn wa">
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} Glow Dental Clinic, Bhubaneswar. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="float-wa"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        💬
      </a>
    </>
  );
}