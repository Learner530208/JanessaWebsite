import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Brush,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Code2,
  Github,
  Image as ImageIcon,
  Layers3,
  Mail,
  MapPin,
  Medal,
  Menu,
  MonitorCog,
  Palette,
  PanelTop,
  PencilRuler,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  X,
} from "lucide-react";

const ASSET_ROOT = "/assets/portfolio";
const asset = (filename: string) => `${ASSET_ROOT}/${filename}`;

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "family", label: "My Family" },
  { id: "friends", label: "My Friends" },
] as const;

type SectionId = (typeof navItems)[number]["id"];

// Every supplied original is referenced by its original filename and extension.
export const portfolioAssets = {
  portrait: { filename: "Grad Pic.jpg", source: asset("Grad Pic.jpg") },
  aboutPhoto: { filename: "Photo shoot.jpg", source: asset("Photo shoot.jpg") },
  logos: {
    bontocCentral: { filename: "BCS.jpg", source: asset("BCS.jpg"), initials: "BCS" },
    mpgchs: { filename: "MPG.jpg", source: asset("MPG.jpg"), initials: "MPG" },
    university: { filename: "UC.jpg", source: asset("UC.jpg"), initials: "UC" },
  },
  family: {
    main: { filename: "Main Family.jpg", source: asset("Main Family.jpg") },
    father: { filename: "My Father.jpg", source: asset("My Father.jpg") },
    mother: { filename: "My Mother.jpg", source: asset("My Mother.jpg") },
    firstChild: { filename: "1st child.jpg", source: asset("1st child.jpg") },
    secondChild: { filename: "2nd child.jpg", source: asset("2nd child.jpg") },
    thirdChild: { filename: "3rd child.jpg", source: asset("3rd child.jpg") },
  },
  friends: [
    { filename: "G1.jpg", source: asset("G1.jpg") },
    { filename: "G2.jpg", source: asset("G2.jpg") },
    { filename: "G3.jpg", source: asset("G3.jpg") },
  ],
};

const contactConfig = [
  { label: "Email", value: "janessamae1.santos@gmail.com", icon: Mail, href: "mailto:janessamae1.santos@gmail.com", external: false },
  { label: "GitHub", value: "Learner530208", icon: Github, href: "https://github.com/Learner530208", external: true },
] as const;

const education = [
  {
    title: "Bontoc Central School",
    level: "Elementary education",
    period: "Science class",
    copy: "Participated in academic and artistic competitions, with recognition in mathematics and art-related events.",
    logo: portfolioAssets.logos.bontocCentral,
    icon: BookOpen,
    current: false,
  },
  {
    title: "Mountain Province General Comprehensive High School",
    level: "Junior high school",
    period: "Leadership & recognition",
    copy: "Explored mathematics, science, technology, publication, and the arts. Served as Math Club Vice President and received regional recognitions.",
    logo: portfolioAssets.logos.mpgchs,
    icon: Trophy,
    current: false,
  },
  {
    title: "Mountain Province General Comprehensive High School",
    level: "Senior high school · STEM",
    period: "Technology spark",
    copy: "Continued academic and extracurricular participation. A group network security project opened the door to software development.",
    logo: portfolioAssets.logos.mpgchs,
    icon: ShieldCheck,
    current: false,
  },
  {
    title: "University of the Cordilleras",
    level: "Computer Science · First year",
    period: "Started May 19, 2026",
    copy: "College of Information Technology and Computer Science (CITCS). The current chapter: learning, building, and finding a direction in tech.",
    logo: portfolioAssets.logos.university,
    icon: MonitorCog,
    current: true,
  },
] as const;

type AchievementCategory = "Academic" | "Extracurricular" | "Competitions" | "Leadership";

const achievements: Record<AchievementCategory, { title: string; meta: string; copy: string; icon: typeof Trophy }[]> = {
  Academic: [
    { title: "Second Place — MTAP-DepEd Math Challenge (MMC)", meta: "Award: Second Place · Division Level · Elementary", copy: "A mathematics distinction from the elementary stage of my academic journey.", icon: Trophy },
    { title: "Civil Service Examination (CSE) National Math Challenge", meta: "Recognition: Received recognition · Junior High School", copy: "A continued interest in mathematics and challenge-based learning.", icon: Medal },
    { title: "Mathematical and Computational Science", meta: "Recognition: Regional-Level Recognition · Senior High School", copy: "A senior high school academic distinction connected to computational thinking and research.", icon: Code2 },
  ],
  Extracurricular: [
    { title: "Modern Dance Competition", meta: "Regional Recognition · Junior High School", copy: "A brief record of participation in performance and movement beyond regular academics.", icon: Sparkles },
    { title: "Collaborative Desktop Publishing", meta: "Regional Recognition · Junior & Senior High School", copy: "A publication and creative collaboration spanning two academic stages.", icon: Layers3 },
    { title: "School Press Conference — Editorial Cartooning", meta: "Participation and Regional Award · Elementary", copy: "A concise extracurricular reference; the complete competition record appears under Competitions.", icon: PencilRuler },
    { title: "Art and School Activities", meta: "Throughout my academic journey", copy: "Participation in various artistic and school activities throughout my academic journey.", icon: Brush },
  ],
  Competitions: [
    { title: "Philippine-Spanish Friendship Day Art Competition", meta: "Regional Award · Elementary", copy: "A regional art competition from the elementary stage.", icon: Palette },
    { title: "School Press Conference — Editorial Cartooning", meta: "Regional Award · Elementary", copy: "A publication competition focused on visual storytelling and editorial cartooning.", icon: PencilRuler },
    { title: "Robotic Research", meta: "Research Title: Automated Solar Powered Plant Watering Device · Regional Award · Junior High School", copy: "A research experience connecting making, systems, and technology.", icon: MonitorCog },
    { title: "Collaborative Desktop Publishing", meta: "Regional Recognition · Junior & Senior High School", copy: "One complete competition record covering both academic stages.", icon: Layers3 },
    { title: "Modern Dance Competition", meta: "Regional Recognition · Junior High School", copy: "A regional performance recognition from junior high school.", icon: Sparkles },
    { title: "Poster-Making Competitions", meta: "Regional Recognition and Medals · Junior & Senior High School", copy: "Visual communication practiced through composition, color, and intent.", icon: ImageIcon },
    { title: "Impromptu Speech Competitions", meta: "Medals · Senior High School", copy: "Thinking on the spot and finding the right words under pressure.", icon: CircleHelp },
    { title: "Mathematical and Computational Science Research", meta: "Regional-Level Recognition · Senior High School", copy: "Research Title: Python Based Botnet Activity Detector for Network Captures Evaluated by A Confusion Matrix with Its Performance Metrics", icon: ShieldCheck },
  ],
  Leadership: [
    { title: "Math Club Vice President", meta: "Position: Vice President · Organization: Math Club · Junior High School", copy: "Leadership experience during junior high school.", icon: Users },
    { title: "Math Club Vice President", meta: "Position: Vice President · Organization: Math Club · Senior High School", copy: "Leadership experience during senior high school.", icon: Users },
  ],
};

const familyMembers = [
  { name: "Jerry Santos", relationship: "My Father", caption: "My biggest motivation in life.", asset: portfolioAssets.family.father },
  { name: "Evangeline Santos", relationship: "My Mother", caption: "My number one supporter.", asset: portfolioAssets.family.mother },
  { name: "Chrisha DeLuta", relationship: "Our First Child", caption: "Our most adventurous sibling. A proud seawoman.", asset: portfolioAssets.family.firstChild },
  { name: "Janry Santos", relationship: "Our Second Child", caption: "My one and only brother. A strong Navy SEAL.", asset: portfolioAssets.family.secondChild },
  { name: "Imee Santos", relationship: "Our Third Child", caption: "My most serious sibling. A proud civil engineer.", asset: portfolioAssets.family.thirdChild },
] as const;

const familyDisplayOptions = [
  { name: "My Family", relationship: "Our family", caption: "The people who make home feel like home.", asset: portfolioAssets.family.main },
  ...familyMembers,
] as const;

const friendNames = [
  "Reba Somngi",
  "Vien Maravilla",
  "Rhaine Balabag",
  "Besha Carillo",
  "Rowan Dogwe",
  "Marco Sarmiento",
  "Mark Salcedo",
  "Daveen Peneranda",
  "Dwight Wal",
  "Jewel Camit",
] as const;

function SectionKicker({ index, label, eyebrow }: { index: string; label: string; eyebrow?: string }) {
  return <div className="section-kicker"><span className="kicker-index">{index}</span><span>{label}</span>{eyebrow && <span className="kicker-note">{eyebrow}</span>}</div>;
}

function HomeSection({ goTo }: { goTo: (id: SectionId) => void }) {
  return <section className="portfolio-section home-section" aria-labelledby="home-title">
    <div className="hero-copy">
      <h1 id="home-title">Hello, I&apos;m <span>Janessa Mae B. Santos.</span></h1>
      <p className="hero-subtitle">Computer Science Student <i /> Aspiring Game Developer</p>
      <p className="hero-description">I&apos;m passionate about exploring the intersection of creativity and technology. From painting and drawing to discovering the possibilities of software development, I enjoy turning ideas into something meaningful. My ambition is to create immersive gaming experiences, particularly horror games that leave a lasting impression on their players.</p>
      <button className="button-primary" onClick={() => goTo("about")}><span>Explore My Portfolio</span><ArrowUpRight size={16} /></button>
      <div className="hero-footnote"><span>Based in Bontoc</span><span className="footnote-separator">/</span><span>Building a first chapter</span></div>
    </div>
    <div className="hero-visual-wrap">
      <div className="hero-visual-frame photo-only-frame"><img className="hero-portrait" src={portfolioAssets.portrait.source} alt="Janessa Mae B. Santos graduation portrait" /></div>
    </div>
  </section>;
}

function AboutSection() {
  return <section className="portfolio-section" aria-labelledby="about-title">
    <div className="section-heading-row">
      <div><SectionKicker index="02" label="About me" eyebrow="the person behind the ideas" /><h2 id="about-title">Curious by nature.<br /><em>Creative by choice.</em></h2></div>
      <div className="heading-aside"><MapPin size={15} /><span>Bontoc → University of the Cordilleras</span></div>
    </div>
    <div className="about-grid about-revision-grid">
      <div className="about-photo-side"><div className="about-photo-frame"><img src={portfolioAssets.aboutPhoto.source} alt="Janessa Mae B. Santos photo shoot portrait" /></div><div className="about-photo-caption"><span>Photo shoot</span><span>01 / 01</span></div></div>
      <div className="about-story">
        <p className="lead-copy">Hi! I&apos;m Janessa Mae B. Santos, currently a first-year Computer Science student at the University of the Cordilleras.</p>
        <p>My academic journey began at Bontoc Central School, where I belonged to the Science class. Throughout my studies, I developed a strong interest in both academics and creative pursuits, participating in various competitions involving mathematics, art, publication, and technology.</p>
        <p>During my junior and senior high school years at Mountain Province General Comprehensive High School, I continued exploring these interests through academic competitions, leadership activities, and artistic events.</p>
        <p>Although my STEM strand did not include formal programming classes, a group network security project during senior high school sparked my interest in technology and software development. After taking a summer break due to family matters, I am now beginning a new chapter in university with renewed motivation and enthusiasm.</p>
        <p>Outside academics, I enjoy painting, drawing, and playing video games. These interests allow me to explore my creativity and provide inspiration for the kind of experiences I hope to create in the future.</p>
        <div className="about-facts"><span><b>18</b><small>years old</small></span><span><b>May 31</b><small>birthday</small></span><span><b>2026</b><small>university start</small></span></div>
      </div>
    </div>
  </section>;
}

function LogoMark({ logo }: { logo: { initials: string; source: string } }) {
  return <img className="logo-mark uploaded-logo" src={logo.source} alt={`${logo.initials} school logo`} />;
}

function EducationSection() {
  return <section className="portfolio-section" aria-labelledby="education-title">
    <div className="section-heading-row compact-heading"><div><SectionKicker index="03" label="Educational attainment" eyebrow="where the foundation was built" /><h2 id="education-title">Four chapters.<br /><em>One direction.</em></h2></div><p className="section-summary">A path through mathematics, art, technology, and the first steps into computer science.</p></div>
    <div className="education-grid">{education.map(({ title, level, period, copy, logo, icon: Icon, current }) => <article key={`${title}-${level}`} className={`education-card ${current ? "current" : ""}`}><div className="education-top"><LogoMark logo={logo} /><span className="education-period">{period}</span></div><div className="education-content"><span className="card-label">{level}</span><h3>{title}</h3><p>{copy}</p></div><div className="education-icon"><Icon size={16} /></div>{current && <span className="current-badge">CURRENT</span>}</article>)}</div>
  </section>;
}

function AchievementsSection() {
  const categories = Object.keys(achievements) as AchievementCategory[];
  const [category, setCategory] = useState<AchievementCategory>("Academic");
  const [page, setPage] = useState(0);
  const pageSize = 4;
  const items = achievements[category];
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const visible = items.slice(page * pageSize, page * pageSize + pageSize);
  useEffect(() => setPage(0), [category]);

  return <section className="portfolio-section" aria-labelledby="achievements-title">
    <div className="section-heading-row compact-heading achievement-heading"><div><SectionKicker index="04" label="Achievements" eyebrow="small wins, lasting signals" /><h2 id="achievements-title">Proof of <em>practice.</em></h2></div></div>
    <div className="achievement-tabs" role="tablist" aria-label="Achievement categories">{categories.map((item) => <button key={item} id={`tab-${item}`} role="tab" aria-controls="achievement-panel" aria-selected={category === item} tabIndex={category === item ? 0 : -1} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
    <div className="achievement-grid" id="achievement-panel" role="tabpanel" aria-live="polite" aria-labelledby={`tab-${category}`} key={category}>{visible.map(({ title, meta, copy, icon: Icon }, index) => <article className="achievement-card" key={`${title}-${meta}`}><div className="achievement-card-top"><div className="achievement-icon"><Icon size={16} /></div><span>0{index + 1}</span></div><h3>{title}</h3><p className="achievement-meta">{meta}</p><p className="achievement-copy">{copy}</p></article>)}</div>
    <div className="pagination"><span>{category} / {String(page + 1).padStart(2, "0")} <i>of</i> {String(pageCount).padStart(2, "0")}</span><div><button aria-label="Previous achievements page" disabled={page === 0} onClick={() => setPage((current) => Math.max(0, current - 1))}><ChevronLeft size={16} /></button><button aria-label="Next achievements page" disabled={page >= pageCount - 1} onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}><ChevronRight size={16} /></button></div></div>
  </section>;
}

function FamilySection() {
  const [selected, setSelected] = useState(0);
  const selectedFamily = familyDisplayOptions[selected];
  return <section className="portfolio-section" aria-labelledby="family-title">
    <div className="section-heading-row compact-heading"><div><SectionKicker index="05" label="My family" eyebrow="the warmest part of the archive" /><h2 id="family-title">People who make<br /><em>home feel like home.</em></h2></div><p className="section-summary">Select a memory to bring its photograph and story into focus.</p></div>
    <div className="family-layout"><div className="family-main" key={selectedFamily.name}><img className="family-photo" src={selectedFamily.asset.source} alt={`${selectedFamily.name} photograph`} /><div className="family-caption"><span>{selectedFamily.name}</span><span>{selectedFamily.asset.filename}</span></div><div className="family-display-copy"><span>{selectedFamily.relationship}</span><p>{selectedFamily.caption}</p></div></div><div className="family-members"><div className="member-list">{familyDisplayOptions.map((item, index) => <button key={item.name} className={`member-button ${selected === index ? "active" : ""}`} onClick={() => setSelected(index)} aria-pressed={selected === index}><img className="member-thumb" src={item.asset.source} alt="" /><span><b>{item.name}</b><small>{item.relationship}</small></span><ChevronRight size={15} /></button>)}</div></div></div>
  </section>;
}

function FriendsSection() {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [selectedName, setSelectedName] = useState(0);
  const go = (delta: number) => setSelectedPhoto((current) => (current + delta + portfolioAssets.friends.length) % portfolioAssets.friends.length);
  const photo = portfolioAssets.friends[selectedPhoto];
  return <section className="portfolio-section" aria-labelledby="friends-title">
    <div className="section-heading-row compact-heading"><div><SectionKicker index="06" label="My friends" eyebrow="the group-photo scrapbook" /><h2 id="friends-title">Good people,<br /><em>good memories.</em></h2></div><p className="section-summary">Three group photographs, with the people who make the memories worth keeping.</p></div>
    <div className="friends-layout"><div className="scrapbook-frame"><div className="scrapbook-tape" /><img className="friend-photo" src={photo.source} alt={`Friends group photograph ${selectedPhoto + 1}`} /><div className="scrapbook-caption"><span>Group photograph {selectedPhoto + 1} / 3</span><strong>{photo.filename}</strong></div><div className="gallery-controls"><button aria-label="Previous group photograph" onClick={() => go(-1)}><ChevronLeft size={17} /></button><span>navigate group photos</span><button aria-label="Next group photograph" onClick={() => go(1)}><ChevronRight size={17} /></button></div></div><div className="friends-list"><div className="friends-list-label"><span>the circle</span><span>10 names</span></div>{friendNames.map((name, index) => <button key={name} className={`friend-button ${selectedName === index ? "active" : ""}`} onClick={() => setSelectedName(index)}><span className="friend-index">{String(index + 1).padStart(2, "0")}</span><span>{name}</span></button>)}</div></div>
  </section>;
}

function ContactOverlay({ onClose }: { onClose: () => void }) {
  return <div className="overlay-backdrop" role="presentation" onClick={onClose}><div className="contact-panel" role="dialog" aria-modal="true" aria-labelledby="contact-title" onClick={(event) => event.stopPropagation()}><button className="icon-button panel-close" aria-label="Close contact panel" onClick={onClose}><X size={17} /></button><SectionKicker index="∞" label="Contact" eyebrow="reach out" /><h2 id="contact-title">Let&apos;s make<br /><em>something meaningful.</em></h2><p>For conversations about ideas, projects, and the next chapter, you can find me here.</p><div className="contact-list">{contactConfig.map(({ label, value, icon: Icon, href, external }) => <div className="contact-row" key={label}><span className="contact-icon"><Icon size={16} /></span><span><small>{label}</small>{external ? <a className="contact-value" href={href} target="_blank" rel="noreferrer">{value}</a> : <a className="contact-value" href={href}>{value}</a>}</span><CircleHelp size={14} /></div>)}</div></div></div>;
}

function LoadingScreen() {
  return <div className="loading-screen" role="status" aria-live="polite" aria-label="Loading portfolio"><div className="ripple-loader"><span /><span /><span /><b>J</b></div><p>opening the archive</p></div>;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [isLoading, setIsLoading] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const contactTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handlePointer = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
      }
    };
    window.addEventListener("pointermove", handlePointer);
    return () => window.removeEventListener("pointermove", handlePointer);
  }, []);

  useEffect(() => {
    if (!contactOpen) return;
    const panel = document.querySelector<HTMLElement>(".contact-panel");
    const focusable = panel?.querySelector<HTMLElement>("button, [contenteditable='true']");
    focusable?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setContactOpen(false);
        return;
      }
      if (event.key === "Tab" && panel) {
        const elements = Array.from(panel.querySelectorAll<HTMLElement>("button, [contenteditable='true']"));
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      contactTriggerRef.current?.focus();
    };
  }, [contactOpen]);

  const goTo = (section: SectionId) => { setActiveSection(section); setMobileNavOpen(false); };
  const sectionContent = useMemo<Record<SectionId, ReactNode>>(() => ({ home: <HomeSection goTo={goTo} />, about: <AboutSection />, education: <EducationSection />, achievements: <AchievementsSection />, family: <FamilySection />, friends: <FriendsSection /> }), []);

  return <div className="portfolio-app">
    {isLoading && <LoadingScreen />}
    <div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="ambient ambient-three" /><div className="cursor-glow" />
    <header className="site-nav"><div className="wordmark" onClick={() => goTo("home")} role="button" tabIndex={0} aria-label="Go to home" onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); goTo("home"); } }}><span className="wordmark-mark">J</span><span className="wordmark-text">JMB<span>.</span></span></div><button className="mobile-menu-toggle icon-button" aria-label="Toggle navigation" aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen((open) => !open)}>{mobileNavOpen ? <X size={19} /> : <Menu size={19} />}</button><nav className={`nav-links ${mobileNavOpen ? "open" : ""}`} aria-label="Primary navigation">{navItems.map((item) => <button key={item.id} className={activeSection === item.id ? "active" : ""} onClick={() => goTo(item.id)}>{item.label}</button>)}<button ref={contactTriggerRef} className="contact-trigger" onClick={() => { setContactOpen(true); setMobileNavOpen(false); }}><Mail size={14} /> Contact</button></nav></header>
    <main className="main-stage">{navItems.map((item) => <div key={item.id} className={`section-slot ${activeSection === item.id ? "active" : ""}`} aria-hidden={activeSection !== item.id}>{sectionContent[item.id]}</div>)}</main>
    <div className="status-bar"><span><span className="status-dot" /> available for new ideas</span><span className="status-right">scroll-free portfolio <span>/</span> {String(navItems.findIndex((item) => item.id === activeSection) + 1).padStart(2, "0")} of 06</span></div>
    {contactOpen && <ContactOverlay onClose={() => setContactOpen(false)} />}
  </div>;
}
