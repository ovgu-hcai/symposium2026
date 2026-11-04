import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight, CalendarDays, ChevronDown, Clock3, ExternalLink, Globe,
  Linkedin, Mail, MapPin, Menu, Sparkles, Twitter, UserRound, X
} from "lucide-react";
import "./styles.css";

const speakers = [
  {
    id: 1,
    name: "Prof. Dr. Christian Hansen",
    role: "Professor and Director, Virtual and Augmented Reality Group · OVGU",
    talk: "Talk title TBA",
    date: "Date and time TBA",
    confirmed: true,
    image: "./images/speakers/christian-hansen.jpg",
    profile: "https://www.var.ovgu.de/lab_member/prof-dr-christian-hansen/",
    bio: "Christian Hansen researches virtual and augmented reality, human–machine interaction, medical visualization, and immersive systems for clinical environments."
  },
  {
    id: 2,
    name: "Dr. Danny Schott",
    role: "Senior Researcher, Virtual and Augmented Reality Group · OVGU",
    talk: "Talk title TBA",
    date: "Date and time TBA",
    confirmed: true,
    image: "./images/speakers/danny-schott.webp",
    profile: "https://www.var.ovgu.de/lab_member/dr-danny-schott/",
    bio: "Danny Schott is an interdisciplinary researcher working at the intersection of interaction design, mixed reality, intelligent systems, and human–computer interaction."
  },
  {
    id: 3,
    name: "Prof. Dr. rer. nat. Christoph Hoeschen",
    role: "Head of the Chair of Medical Systems Technology · OVGU",
    talk: "Talk title to be announced",
    date: "8 December 2026 · Time TBA",
    confirmed: true,
    image: "./images/speakers/christoph-hoeschen.jpg",
    profile: "https://www.lms.ovgu.de/lms/en/Group+Members/Head+of+the+group/Prof_+Dr_+rer_+nat_+Christoph+Hoeschen-p-40.html",
    bio: "Christoph Hoeschen is Professor of Medical Systems Technology at Otto von Guericke University Magdeburg. His research spans medical imaging, radiation protection, diagnostic technologies, and intelligent methods for improving healthcare systems."
  },
  {
    id: 4,
    name: "Dr. Fabio Cavaliere",
    role: "Senior Researcher · Achucarro Basque Center for Neuroscience",
    talk: "Talk title TBA",
    date: "7 December 2026 · Time TBA",
    confirmed: true,
    image: "./images/speakers/fabio-cavaliere.jpg",
    profile: "https://research.science.eus/investigadores/190893/detalle?lang=en",
    bio: "Fabio Cavaliere researches brain pathologies and neurodegeneration, including Parkinson’s disease, cerebral ischemia, astrocyte biology, and human brain models."
  },
  {
    id: 5,
    name: "Prof. Dr. med. Peter Mertens",
    role: "Director, University Clinic for Kidney and Hypertension Diseases · University Hospital Magdeburg",
    talk: "Talk title TBA",
    date: "7 December 2026 · 16:00",
    confirmed: true,
    image: "./images/speakers/peter-mertens.jpg",
    profile: "https://www.ovgu.de/Mertens.html",
    bio: "Peter Mertens is a physician and researcher in nephrology and hypertension whose work includes kidney disease, digital medicine, telemedicine, mobile health, and artificial intelligence."
  },
  {
    id: 6,
    name: "Dipl.-Inf. Lars Dornheim",
    role: "Founder · Dornheim Medical Images GmbH",
    talk: "Talk title TBA",
    date: "Date and time TBA",
    confirmed: true,
    image: "./images/speakers/lars-dornheim.webp",
    profile: "https://www.dornheim.tech/en/about.html",
    bio: "Lars Dornheim is a computer scientist and entrepreneur working on medical image analysis, artificial intelligence, 3D visualization, and medical software."
  },
  {
    id: 7,
    name: "Prof. Dr. Luca Simeoni",
    role: "Research Group Leader, Institute of Molecular and Clinical Immunology · OVGU",
    talk: "Talk title TBA",
    date: "8 December 2026 · Time TBA",
    confirmed: true,
    image: "./images/speakers/luca-simeoni.png",
    profile: "https://forschung-sachsen-anhalt.de/pl/simeoni-82434",
    bio: "Luca Simeoni researches the molecular mechanisms governing immune-cell signalling and activation, with a particular focus on T-cell biology and immune regulation."
  },
  {
    id: 8,
    name: "Prof. Dr. Michael Bosnjak",
    role: "Head, Psychological Research Methods · Trier University",
    talk: "Talk title TBA",
    date: "7 December 2026 · Time TBA",
    confirmed: true,
    image: "./images/speakers/michael-bosnjak.png",
    profile: "https://www.uni-trier.de/universitaet/fachbereiche-faecher/fachbereich-i/faecher-und-institute/psychologie/professuren/abt-psych-methodenlehre/team/prof-dr-michael-bosnjak",
    bio: "Michael Bosnjak researches psychological methodology, survey research, research synthesis, AI-supported inference, open science, and consumer psychology."
  }
];

const schedule = [
  {
    day: "Day 01", date: "7 December 2026", weekday: "Monday",
    items: [
      { time: "13:00 – 14:00", type: "session", title: "Welcome", speaker: "Speaker TBA" },
      { time: "TBA", type: "talk", title: "Talk title TBA", speaker: "Dr. Fabio Cavaliere" },
      { time: "TBA", type: "talk", title: "Talk title TBA", speaker: "Prof. Dr. Michael Bosnjak" },
      { time: "15:00 – 15:30", type: "break", title: "Coffee Break" },
      { time: "16:00", type: "talk", title: "Talk title TBA", speaker: "Prof. Dr. med. Peter Mertens" },
      { time: "18:30", type: "special", title: "Meet and Greet", speaker: "Innovation Xperience Incubator" }
    ]
  },
  {
    day: "Day 02", date: "8 December 2026", weekday: "Tuesday",
    items: [
      { time: "08:00 – 09:00", type: "break", title: "Welcome Coffee" },
      { time: "TBA", type: "talk", title: "Talk title TBA", speaker: "Prof. Dr. rer. nat. Christoph Hoeschen" },
      { time: "TBA", type: "talk", title: "Talk title TBA", speaker: "Prof. Dr. Luca Simeoni" },
      { time: "11:00 – 13:00", type: "break", title: "Lunch Break" },
      { time: "13:00 – 14:00", type: "talk", title: "Talk title TBA", speaker: "Speaker TBA" },
      { time: "14:00 – 15:00", type: "talk", title: "Talk title TBA", speaker: "Speaker TBA" },
      { time: "15:00 – 15:30", type: "break", title: "Coffee Break" },
      { time: "15:30 – 16:30", type: "session", title: "Panel Discussion", speaker: "Panellists TBA" },
      { time: "16:30", type: "special", title: "Closing Session", speaker: "Details TBA" }
    ]
  }
];

const organisers = [
  { group: "General Chair", name: "Prof. Dr.-Ing. Ernesto William De Luca", role: "Head, Human-Centred Artificial Intelligence Research Group", image: "./images/organisers/ernesto.jpg", email: "ernesto.deluca@ovgu.de", website: "https://ernestodeluca.eu/cv" },
  { group: "Local Organising Committee", name: "M.Sc. Het Darshan Mehta", role: "PhD Researcher · HCAI, OVGU", image: "./images/organisers/het.jpeg", email: "het.mehta@ovgu.de", website: "https://hetmehta.eu/" },
  { group: "Local Organising Committee", name: "M.Sc. Iveta Jaroscakova", role: "Innovation Experience Incubator Coordinator", image: "./images/organisers/iveta.jpeg", email: "iveta.jaroscakova@ovgu.de", website: "https://www.hcai.ovgu.de/" },
  { group: "Staff", name: "B.Sc. Gavin Rony Correia", role: "", image: "./images/organisers/gavin.jpeg", email: "gavin.correia@gei.de", website: "https://www.hcai.ovgu.de/" },
  { group: "Staff", name: "B.Sc. Shivnandini Ravikumar Chinnannvar", role: "", image: "./images/organisers/shivnandini.jpeg", email: "shivnandini.chinnannvar@gei.de", website: "https://www.hcai.ovgu.de/" },
  { group: "Staff", name: "B.Sc. Yashashwini Sidramappa Awate", role: "", image: "./images/organisers/yashashwini-awate.jpg", email: "yashashwini.awate@st.ovgu.de", website: "https://de.linkedin.com/in/yashashwini-awate-b2abb4227" }
];

const topics = ["Responsible AI", "Explainable AI", "Bias & Fairness", "Legal AI", "Personalised Interfaces", "Information Ethics", "Privacy & Safety", "Human-Centred AI"];

function AuroraCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frame, width, height, particles = [];
    const resize = () => {
      width = canvas.width = window.innerWidth * Math.min(devicePixelRatio, 2);
      height = canvas.height = window.innerHeight * Math.min(devicePixelRatio, 2);
      ctx.scale(Math.min(devicePixelRatio, 2), Math.min(devicePixelRatio, 2));
      particles = Array.from({ length: Math.min(65, Math.floor(innerWidth / 18)) }, () => ({
        x: Math.random() * innerWidth, y: Math.random() * innerHeight,
        z: Math.random() * 1.2 + .25, r: Math.random() * 1.4 + .3
      }));
    };
    const render = (t = 0) => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      particles.forEach((p, i) => {
        p.y -= .035 * p.z;
        p.x += Math.sin(t * .00025 + i) * .025;
        if (p.y < -10) p.y = innerHeight + 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(173,216,255,${.12 + p.z * .18})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(render);
    };
    resize(); render();
    addEventListener("resize", resize);
    return () => { cancelAnimationFrame(frame); removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}

function HeroDepth() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const move = ({ clientX, clientY }) => {
      const x = (clientX / innerWidth - .5) * 2;
      const y = (clientY / innerHeight - .5) * 2;
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
    };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, []);
  return (
    <div ref={ref} className="hero-depth" aria-hidden="true">
      <div className="depth-halo halo-one" />
      <div className="depth-halo halo-two" />
      <div className="depth-ring ring-one" />
      <div className="depth-ring ring-two" />
      <div className="light-ribbon ribbon-one" />
      <div className="light-ribbon ribbon-two" />
    </div>
  );
}

const FadeIn = ({ children, className = "", delay = 0 }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: .75, delay, ease: [.16, 1, .3, 1] }}>{children}</motion.div>
);

const pageHref = page => `#/${page === "home" ? "" : page}`;

function Header({ page }) {
  const [open, setOpen] = useState(false);
  const links = [["home", "Home"], ["speakers", "Speakers"], ["schedule", "Schedule"], ["organisers", "Organisers"]];
  return (
    <header className="nav-shell">
      <nav className="nav glass">
        <a className="brand" href="#/" aria-label="HCAI home">
          <span className="brand-mark"><i /><i /><i /></span>
          <span>HCAI <b>2026</b></span>
        </a>
        <div className={`nav-links ${open ? "open" : ""}`}>
          {links.map(([route, label]) => <a className={page === route ? "active" : ""} key={route} href={pageHref(route)} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-cta" href="https://forms.gle/2ajqTr4CAzZLPVUR9" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Register <ArrowRight size={15} /></a>
        </div>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <HeroDepth />
      <div className="orb orb-a" /><div className="orb orb-b" /><div className="orb orb-c" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-inner hero-identity">
        <motion.div className="hero-lockup" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [.16, 1, .3, 1] }}>
          <div className="hero-overline"><span /> Human-centred artificial intelligence <span /></div>
          <div className="hcai-word" aria-label="HCAI">
            <span>HC</span><span className="ai-word">AI</span>
          </div>
          <div className="symposium-line"><span>Symposium</span><b>2026</b></div>
          <p>Where people, intelligence, and possibility meet.</p>
        </motion.div>

        <motion.div className="magdeburg-scene" initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: 1.15, ease: [.16, 1, .3, 1] }} aria-hidden="true">
          <div className="scene-moon"><i /><i /><i /></div>
          <svg viewBox="0 0 1200 275" role="img">
            <defs>
              <linearGradient id="cityFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#7de7e2" stopOpacity=".22" />
                <stop offset="1" stopColor="#7569ff" stopOpacity=".03" />
              </linearGradient>
              <linearGradient id="cityStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#7188ff" />
                <stop offset=".48" stopColor="#aafcf3" />
                <stop offset="1" stopColor="#a477ff" />
              </linearGradient>
              <filter id="cityGlow"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <g className="city-back" fill="url(#cityFill)" stroke="url(#cityStroke)" strokeWidth="1.4">
              <path d="M0 238V205h45v-24h39v28h37v-45h25v-28h23v70h37v-18h30v50z"/>
              <path d="M982 238v-50h37v-24h21v-54h19v54h25v24h38v-35h22v35h56v50z"/>
            </g>
            <g className="cathedral" fill="url(#cityFill)" stroke="url(#cityStroke)" strokeWidth="1.6" filter="url(#cityGlow)">
              <path d="M245 238V101h24V64l17-48 17 48v37h26V58l17-48 17 48v43h23v137z"/>
              <path d="M269 101V71h34v30m26 0V66h34v35M279 75h14m46-3h14"/>
              <path d="M286 16v48m60-54v48M281 43h10m60-6h-10"/>
              <path d="M386 238V129l53-27 55 27v109M386 132h108M412 119v119m55-119v119"/>
              <path d="M267 238h227M302 238v-95h54v95M319 143v95m20-95v95"/>
              <circle cx="329" cy="121" r="9"/><path d="M329 112v18m-9-9h18"/>
            </g>
            <g className="campus" fill="url(#cityFill)" stroke="url(#cityStroke)" strokeWidth="1.35">
              <path d="M494 238v-61h102v61m-90-61v-24h77v24m-62-24v-24h47v24"/>
              <path d="M596 238v-80h74v80m12 0v-105h25v105m-17-105V91h9v42"/>
              <path d="M707 238v-51h90l18 18v33m-105-34h91"/>
              <path d="M815 238v-78h40v78m9 0v-111h18v111m-9-111V95h5v32"/>
              <path d="M882 238v-66h96v66m-82-66v-29h65v29"/>
            </g>
            <g className="bridge" fill="none" stroke="url(#cityStroke)" strokeWidth="2">
              <path d="M42 244h1116M94 244v-44h1012v44M94 203c157 0 147 41 285 41s173-41 323-41 174 41 404 41"/>
              <path d="M128 202v42m80-36v36m80-17v17m80-1v1m80-19v19m80-37v37m80-41v41m80-34v34m80-14v14m80-1v1m80-20v20m80-38v38m80-43v43"/>
            </g>
            <path className="river-line" d="M0 256c120-19 205 15 330 0s230 16 367 0 281 17 503-2" fill="none" stroke="url(#cityStroke)" strokeWidth="1.2"/>
          </svg>
          <div className="scene-label"><span>Magdeburg</span><i />52.1205° N</div>
        </motion.div>

        <motion.div className="event-strip glass hero-event-strip" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .75, duration: .8 }}>
          <div><CalendarDays /><span><small>Save the date</small>7—8 Dec 2026</span></div>
          <i />
          <div><MapPin /><span><small>Meet us in</small>Magdeburg, Germany</span></div>
          <a className="hero-register" href="https://forms.gle/2ajqTr4CAzZLPVUR9" target="_blank" rel="noopener noreferrer">Register <ArrowRight size={15} /></a>
        </motion.div>
      </div>
      <div className="scroll-cue"><span /> Scroll to discover</div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <FadeIn className="section-intro">
          <span className="kicker">01 · About the symposium</span>
          <h2>Better AI begins with<br /><em>human questions.</em></h2>
        </FadeIn>
        <div className="about-layout">
          <FadeIn className="about-copy">
            <p className="large-copy">HCAI@OVGU unites experts from academia and industry to explore how intelligent technology can remain transparent, fair, safe, and deeply human.</p>
            <p>Hosted by the Human-Centred Artificial Intelligence Research Group at Otto von Guericke University Magdeburg, the symposium creates space for ideas across computer science, psychology, sociology, law, medicine, and business.</p>
          </FadeIn>
          <FadeIn className="topic-cloud glass" delay={.15}>
            <div className="cloud-orbit"><span>H</span><span>C</span><span>A</span><span>I</span><b>◎</b></div>
            <div className="topic-list">{topics.map((topic, i) => <span key={topic} style={{ "--i": i }}>{topic}</span>)}</div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const partners = [
    { name: "Human-Centred Artificial Intelligence, OVGU", href: "https://www.hcai.ovgu.de/", image: "./images/partners/hcai.png" },
    { name: "Otto von Guericke University Magdeburg", href: "https://www.ovgu.de/", image: "./images/partners/ovgu.png" },
    { name: "Experimentelle Fabrik Magdeburg", href: "https://www.exfa.de/", image: "./images/partners/experimentelle-fabrik.png" },
    { name: "Investitionsbank Sachsen-Anhalt", href: "https://www.ib-sachsen-anhalt.de/de/", image: "./images/partners/investitionsbank.png" }
  ];
  return (
    <section className="partner-band" aria-label="Partners and supporters">
      <div className="container">
        <FadeIn className="partner-shell glass">
          <div className="partner-heading"><span>Hosted and supported by</span><i /></div>
          <div className="partner-grid">
            {partners.map(partner => <a className="partner-logo" href={partner.href} target="_blank" rel="noreferrer" aria-label={partner.name} key={partner.name}><img src={partner.image} alt={partner.name} loading="lazy" /></a>)}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Impressum() {
  return (
    <section className="section inner-page-section legal-section">
      <div className="container legal-container">
        <FadeIn className="section-intro">
          <span className="kicker">Legal notice</span>
          <h2>Impressum</h2>
        </FadeIn>
        <FadeIn className="legal-card glass" delay={.08}>
          <h3>Angaben gemäß § 5 DDG und § 18 MStV</h3>
          <p><strong>Otto-von-Guericke-Universität Magdeburg</strong><br />Körperschaft des öffentlichen Rechts<br />Universitätsplatz 2<br />39106 Magdeburg<br />Deutschland</p>
          <h3>Vertretungsberechtigt</h3>
          <p>Die Otto-von-Guericke-Universität Magdeburg wird vertreten durch den Rektor:<br /><strong>Prof. Dr.-Ing. Jens Strackeljan</strong></p>
          <h3>Kontakt</h3>
          <p>Telefon: <a href="tel:+493916701">+49 391 67-01</a><br />E-Mail: <a href="mailto:rektor@ovgu.de">rektor@ovgu.de</a><br />Internet: <a href="https://www.ovgu.de/" target="_blank" rel="noreferrer">www.ovgu.de</a></p>
          <h3>Redaktionell verantwortlich</h3>
          <p><strong>M.Sc. Het Darshan Mehta</strong><br />Human-Centred Artificial Intelligence Research Group<br />Otto-von-Guericke-Universität Magdeburg<br />Universitätsplatz 2<br />39106 Magdeburg<br />E-Mail: <a href="mailto:het.mehta@ovgu.de">het.mehta@ovgu.de</a></p>
          <h3>Zuständige Aufsichtsbehörde</h3>
          <p>Ministerium für Wissenschaft, Energie, Klimaschutz und Umwelt des Landes Sachsen-Anhalt<br />Leipziger Straße 58<br />39112 Magdeburg<br />E-Mail: <a href="mailto:poststelle@mwu.sachsen-anhalt.de">poststelle@mwu.sachsen-anhalt.de</a></p>
          <h3>Umsatzsteuer-Identifikationsnummer</h3>
          <p>DE 139 238 413</p>
          <h3>Haftung für externe Links</h3>
          <p>Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte die Otto-von-Guericke-Universität Magdeburg keinen Einfluss hat. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.</p>
          <p className="legal-source">Weitere rechtliche Informationen finden Sie im <a href="https://www.ovgu.de/Impressum.html" target="_blank" rel="noreferrer">zentralen Impressum der OVGU</a>.</p>
        </FadeIn>
      </div>
    </section>
  );
}

function Speakers() {
  return (
    <section className="section inner-page-section speakers-section">
      <div className="container">
        <FadeIn className="section-intro row">
          <div><span className="kicker">2026 speakers</span><h2>Meet the voices<br /><em>shaping the conversation.</em></h2></div>
          <p>Meet the confirmed speakers joining HCAI Symposium 2026. Additional voices and talk details will be announced soon.</p>
        </FadeIn>
        <div className="speaker-grid">
          {speakers.map((speaker, i) => (
            <FadeIn key={speaker.id} className={`speaker-card glass ${speaker.confirmed ? "confirmed-card" : "tba-card"} ${speaker.image ? "has-photo" : "no-photo"}`} delay={(i % 2) * .06}>
              <div className={`speaker-avatar ${speaker.image ? "speaker-photo" : "tba-avatar"}`}>{speaker.image ? <img src={speaker.image} alt={speaker.name} loading="lazy" /> : <UserRound size={48} />}<div className="avatar-shine" /></div>
              <div className="speaker-info">
                <span className="speaker-number">0{i + 1}</span><h3>{speaker.name}</h3><p>{speaker.role}</p>
                {speaker.date && <div className="speaker-date"><CalendarDays size={13} />{speaker.date}</div>}
                {speaker.bio && <p className="speaker-bio">{speaker.bio}</p>}
                <div className="talk-title">{speaker.talk}</div>
                {speaker.profile && <a className="speaker-profile" href={speaker.profile} target="_blank" rel="noreferrer">Official profile <ExternalLink size={13} /></a>}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section className="section inner-page-section schedule-section">
      <div className="container">
        <FadeIn className="schedule-page-head">
          <div><span className="kicker">2026 programme</span><h2>Two days.<br /><em>One shared future.</em></h2></div>
          <p>The programme framework is ready. Speaker names and talk details will be announced as they are confirmed.</p>
        </FadeIn>
        <div className="schedule-days">
          {schedule.map((day, dayIndex) => <FadeIn className="schedule-day glass" key={day.day} delay={dayIndex * .1}>
            <div className="schedule-day-head"><div><small>{day.day} · {day.weekday}</small><h3>{day.date}</h3></div><CalendarDays /></div>
            <div className="schedule-list">
              {day.items.map((item, index) => <div className={`schedule-item ${item.type}`} key={`${day.day}-${index}`}>
                <time>{item.time}</time>
                <div><h4>{item.title}</h4>{item.speaker && <p>{item.speaker}</p>}</div>
              </div>)}
            </div>
          </FadeIn>)}
        </div>
      </div>
    </section>
  );
}

function Organisers() {
  const groups = [...new Set(organisers.map(person => person.group))];
  return (
    <section className="section inner-page-section organisers-section">
      <div className="container">
        <FadeIn className="section-intro row">
          <div><span className="kicker">Behind the symposium</span><h2>Meet the team<br /><em>making it happen.</em></h2></div>
          <p>The HCAI Symposium is organised by the Human-Centred Artificial Intelligence Research Group at OVGU Magdeburg.</p>
        </FadeIn>
        {groups.map(group => <div className="organiser-group" key={group}>
          <div className="group-heading"><span>{group}</span><i /></div>
          <div className="organiser-grid">
            {organisers.filter(person => person.group === group).map((person, index) =>
              <FadeIn className="organiser-card glass" key={person.name} delay={index * .07}>
                <div className="organiser-photo"><img src={person.image} alt={person.name} loading="lazy" /></div>
                <div className="organiser-info"><h3>{person.name}</h3>{person.role && <p>{person.role}</p>}<div className="organiser-links"><a href={`mailto:${person.email}`}><Mail size={14} />{person.email}</a><a href={person.website} target="_blank" rel="noreferrer"><Globe size={14} />Profile</a></div></div>
              </FadeIn>
            )}
          </div>
        </div>)}
      </div>
    </section>
  );
}

function Venue() {
  return (
    <section id="venue" className="section venue-section">
      <div className="container venue-grid">
        <FadeIn className="venue-visual">
          <div className="map-grid" /><div className="map-glow" />
          <div className="pin"><span><MapPin /></span><i /></div>
          <div className="location-card glass"><small>52.1404° N · 11.6447° E</small><strong>Experimentelle Fabrik</strong><span>Sandtorstraße 23 · Magdeburg</span></div>
        </FadeIn>
        <FadeIn className="venue-copy" delay={.12}>
          <span className="kicker">04 · The place</span>
          <h2>Ideas need<br /><em>room to meet.</em></h2>
          <p>Join us at the Experimentelle Fabrik—an innovation landmark beside the Elbe and at the heart of Otto von Guericke University’s research campus.</p>
          <a className="text-link" href="https://maps.google.com/?q=Sandtorstr.+23,+39106+Magdeburg" target="_blank" rel="noreferrer">Open in Maps <ExternalLink size={16} /></a>
          <div className="help-card glass"><span className="help-icon"><Mail /></span><div><small>Need help?</small><h3>Contact Het Darshan Mehta</h3><a href="mailto:het.mehta@ovgu.de">het.mehta@ovgu.de <ArrowRight size={14} /></a></div></div>
        </FadeIn>
      </div>
    </section>
  );
}

function Registration() {
  return (
    <section id="registration" className="section registration">
      <div className="container">
        <FadeIn className="registration-card glass">
          <div className="reg-orb" />
          <span className="kicker">HCAI Symposium 2026</span>
          <h2>Be part of what<br />comes <em>next.</em></h2>
          <p>Seats are limited. Register your interest and join the conversation shaping a more human future for artificial intelligence.</p>
          <a className="button light" href="https://forms.gle/2ajqTr4CAzZLPVUR9" target="_blank" rel="noopener noreferrer">Register your interest <ArrowRight size={18} /></a>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container footer-top">
        <div><a className="brand footer-brand" href="#/"><span className="brand-mark"><i /><i /><i /></span><span>HCAI <b>2026</b></span></a><p>Human-Centred Artificial Intelligence<br />Research Group · OVGU Magdeburg</p></div>
        <div className="footer-links"><div><small>Explore</small><a href="#/">Home</a><a href="#/speakers">Speakers</a><a href="#/schedule">Schedule</a><a href="#/organisers">Organisers</a><a href="#/impressum">Impressum</a></div><div><small>Need help?</small><a href="mailto:het.mehta@ovgu.de">Het Darshan Mehta</a><a href="mailto:het.mehta@ovgu.de">het.mehta@ovgu.de</a></div></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 HCAI Research Group, Otto von Guericke University Magdeburg.</span><div><a href="#" aria-label="Twitter"><Twitter size={17} /></a><a href="#" aria-label="LinkedIn"><Linkedin size={17} /></a></div></div>
    </footer>
  );
}

function useRoute() {
  const read = () => (location.hash.replace(/^#\/?/, "").split("?")[0] || "home");
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const change = () => { const next = read(); setRoute(next === "register" ? "home" : next); if (next === "register") setTimeout(() => document.getElementById("registration")?.scrollIntoView(), 60); else scrollTo(0, 0); };
    addEventListener("hashchange", change); change();
    return () => removeEventListener("hashchange", change);
  }, []);
  return route;
}

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const page = useRoute();
  const content = page === "speakers" ? <Speakers /> : page === "schedule" ? <Schedule /> : page === "organisers" ? <Organisers /> : page === "impressum" ? <Impressum /> : <><Hero /><About /><Venue /><Registration /><Partners /></>;
  return <>
    <motion.div className="scroll-progress" style={{ scaleX }} />
    <AuroraCanvas /><div className="noise" />
    <Header page={page} /><main>{content}</main><Footer />
  </>;
}

createRoot(document.getElementById("root")).render(<App />);
