'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import Capabilities from './capabilities';
import AboutPage from './about-page';
import HeroQuantumNode from './hero-quantum-node';
import {privacyPolicyContent} from './privacy-policy-content';
import {termsContent} from './terms-content';
import {industryContent} from './industry-content';
import {blogArticles} from './blog-content';
import {projects,projectCategories,projectMatchesCategory,services,industries,markets} from './portfolio';

const slugify = (value) => value.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const title = (value='') => value.split('-').map(word=>word[0]?.toUpperCase()+word.slice(1)).join(' ');
const email = 'growth@quantumx1.in';

function ContactButtonContents() {
  return <><span className="cta-word-window"><span className="cta-word-track"><span>Get in touch</span><span aria-hidden="true">Get in touch</span></span></span><span className="cta-arrow-window" aria-hidden="true"><span className="cta-arrow-track"><span>↗</span><span>↗</span></span></span></>;
}
function Button({href='/contact',children='Get in Touch',light=false}) {
  return <Link className={`pill ${light?'light':''} ${href==='/contact'?'contact-motion':''}`} href={href}>{href==='/contact'?<ContactButtonContents/>:<>{children}<span>↗</span></>}</Link>;
}
function ProjectCTA() {
  return <div className="project-cta-wrap"><div className="project-cta"><span>Let’s build something</span><Link href="/contact" className="contact-motion"><ContactButtonContents/></Link></div></div>;
}
function FloatingProjectCTA() {
  const [visible,setVisible] = useState(false);
  useEffect(() => {
    let frame;
    const update = () => {
      const projectSummary = document.querySelector('.work-end');
      const header = document.querySelector('.header');
      const headerBottom = header ? header.getBoundingClientRect().bottom : 0;
      const triggerLine = Math.max(headerBottom, Math.min(window.innerHeight * .4, 320));
      setVisible(Boolean(projectSummary && projectSummary.getBoundingClientRect().bottom <= triggerLine));
      frame = null;
    };
    const schedule = () => { if (frame == null) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    return () => { window.removeEventListener('scroll',schedule); window.removeEventListener('resize',schedule); if(frame != null) cancelAnimationFrame(frame); };
  }, []);
  return visible ? <div className="floating-project-cta"><div className="project-cta"><span>Let’s build something</span><Link href="/contact" className="contact-motion"><ContactButtonContents/></Link></div></div> : null;
}
const testimonialBrands = [
  {name:'ASET College',logo:'/assets/client-logos/aset.png',className:'leader-brand-aset',photo:'/assets/testimonials/aset.jpg',person:'Mohammed Rizwan',role:'Founder & CEO',quote:`QuantumX strengthened ASET's digital presence through connected platforms, development and marketing.`},
  {name:'Snitch',logo:'/assets/client-logos/snitch.png',photo:'/assets/testimonials/snitch.jpg',person:'Manish Thanvi',role:'Head of Brand',quote:`Their proactive team built 40+ marketing funnels and unlocked new growth opportunities.`},
  {name:'GoFloaters',logo:'/assets/client-logos/gofloaters.png',className:'leader-brand-gofloaters',photo:'/assets/testimonials/gofloaters.jpg',person:'Shyam Sundar',role:'Founder',quote:`The team delivered development, performance marketing and omnichannel outreach with impressive speed.`},
  {name:'Milky Mist',logo:'/assets/client-logos/milky-mist.jpg',className:'leader-brand-milky',photo:'/assets/testimonials/milky-mist.jpg',person:'Mitthra Senthilnathan',role:'Brand Manager',quote:`A team that understood our creative requirements and translated them into engaging content.`},
];
function Testimonials() {
  const track = useRef(null);
  const [edges,setEdges] = useState({previous:false,next:false});
  const updateEdges = () => {
    const element = track.current;
    if (element) setEdges({previous:element.scrollLeft > 2,next:element.scrollLeft + element.clientWidth < element.scrollWidth - 2});
  };
  useEffect(() => {
    const frame = requestAnimationFrame(updateEdges);
    window.addEventListener('resize',updateEdges);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize',updateEdges); };
  }, []);
  const move = direction => {
    const element = track.current;
    const card = element?.querySelector('.leader-card');
    if (!element || !card) return;
    const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
    element.scrollBy({left:direction * (card.getBoundingClientRect().width + gap),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  };
  return <section className="leaders-section" aria-labelledby="leaders-heading">
    <h2 id="leaders-heading">Hear from Industry Leaders</h2>
    <div className="leaders-track" ref={track} onScroll={updateEdges} tabIndex={0} role="region" aria-label="Client testimonials">
      {testimonialBrands.map(brand => <article className="leader-card" key={brand.name}>
        <div><div className={`leader-avatar ${brand.name === 'ASET College' ? 'leader-avatar-aset' : ''}`}><img src={brand.photo} alt={brand.person} loading="lazy" decoding="async"/></div>
          <h3>{brand.person}</h3><p className="leader-role">{brand.role}</p><p className="leader-quote">“{brand.quote}”</p></div>
        <div className={`leader-brand-logo ${brand.className || ''}`}><img src={brand.logo} alt={brand.name} loading="lazy" decoding="async"/>{brand.className === 'leader-brand-gofloaters' && <img className="leader-brand-artwork" src={brand.logo} alt="" aria-hidden="true" loading="lazy" decoding="async"/>}</div>
      </article>)}
    </div>
    <div className="leaders-controls"><button type="button" onClick={()=>move(-1)} disabled={!edges.previous} aria-label="Previous testimonials">←</button><button type="button" onClick={()=>move(1)} disabled={!edges.next} aria-label="Next testimonials">→</button></div>
  </section>;
}
function Header({dark=false,workDark=false,newsLight=false,glassOnScroll=false,showContact=false,aboutPage=false,glassAlways=false}) {
  const [open,setOpen] = useState(false);
  const [navDark,setNavDark] = useState(dark);
  const [navGlass,setNavGlass] = useState(glassAlways);
  const [aboutLight,setAboutLight] = useState(false);
  useEffect(() => {
    let frame;
    const update = () => {
      const line = 41;
      const crossesLine = element => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= line && rect.bottom > line;
      };
      const work = document.querySelector('.work-section');
      const lastProject = document.querySelector('.featured-projects .project-card:last-child');
      const capabilities = document.querySelector('.capabilities-section');
      const headerHeight = document.querySelector('.header')?.getBoundingClientRect().height || 82;
      setNavGlass(Boolean(glassAlways || (glassOnScroll && window.scrollY > 24) || (lastProject && capabilities && lastProject.getBoundingClientRect().top <= headerHeight + 72 && capabilities.getBoundingClientRect().bottom > line)));
      const news = document.querySelector('.quantum-news');
      const lightAbout = crossesLine(document.querySelector('.about-white-zone')) || (aboutPage && crossesLine(document.querySelector('.newsletter-section')));
      const darkAboutSection = [...document.querySelectorAll('.about-team, .about-culture, .about-final-cta')].some(crossesLine);
      setAboutLight(lightAbout);
      const isDark = (crossesLine(news) && !newsLight) || crossesLine(document.querySelector('main.dark-page, main.industries-page, main.blog-page, main.blog-article-page')) ||
        crossesLine(document.querySelector('.services-intro')) || crossesLine(document.querySelector('.services-catalog')) || crossesLine(document.querySelector('.services-end')) ||
        crossesLine(document.querySelector('.about-hero')) || (crossesLine(document.querySelector('.about-dark')) && !lightAbout) || darkAboutSection ||
        crossesLine(document.querySelector('.cta:not(.newsletter-section)')) || crossesLine(document.querySelector('footer')) ||
        crossesLine(document.querySelector('.leaders-section')) || crossesLine(document.querySelector('.capabilities-section')) ||
        (workDark && crossesLine(work));
      setNavDark(Boolean(isDark));
      frame = null;
    };
    const schedule = () => { if (frame == null) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    return () => { window.removeEventListener('scroll',schedule); window.removeEventListener('resize',schedule); if(frame != null) cancelAnimationFrame(frame); };
  }, [dark,workDark,newsLight,glassOnScroll,aboutPage,glassAlways]);
  return <>
    <header className={`header ${navDark?'header-dark':''} ${navGlass?'header-glass':''} ${aboutPage?'header-about':''} ${aboutPage && aboutLight?'header-about-light':''}`}>
      <Link href="/" className="brand quantum-brand" aria-label="QuantumX home"><img src={navDark || open ? "/assets/quantum-logo-white.svg" : "/assets/quantum-logo.svg"} alt="QuantumX"/></Link>
      <nav className="desktop-nav" aria-label="Main navigation"><Link href="/projects">Projects</Link><Link href="/industries">Industries</Link><Link href="/services">Services</Link></nav>
      {showContact && <Link href="/contact" className="header-contact contact-motion" onClick={()=>setOpen(false)}><ContactButtonContents/></Link>}
    <button className={`hamburger ${open?'active':''}`} aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}><i/><i/><i/></button>
    </header>
    {open&&<div className="menu"><div className="menu-links">{['About','Projects','Services','Industries','Blogs','Contact'].map(item=><Link key={item} href={`/${slugify(item)}`} onClick={()=>setOpen(false)}>{item}<span>↗</span></Link>)}</div><div className="menu-side"><p>Have a project in mind?</p><a href={`mailto:${email}`}>{email} ↗</a><small>CHENNAI · INDIA · NORTH AMERICA · EUROPE · MIDDLE EAST · ASIA-PACIFIC</small></div></div>}
  </>;
}
const formspreeEndpoint = 'https://formspree.io/f/mljbewdd';
function useFormspree(formName) {
  const [status,setStatus] = useState('idle');
  const pending = useRef(false);
  const submit = async event => {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set('form_name', formName);
    data.set('page_url', window.location.href);
    setStatus('sending');
    try {
      const response = await fetch(formspreeEndpoint, {method:'POST', body:data, headers:{Accept:'application/json'}});
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      setStatus('success');
    } catch { setStatus('error'); }
    finally { pending.current = false; }
  };
  return {status,submit};
}
function Footer() {
  const {status,submit} = useFormspree('Newsletter signup');
  return <>
    <section className="cta newsletter-section" aria-labelledby="newsletter-heading">
      <h2 id="newsletter-heading">Trusted by <em>20+ global companies.</em></h2>
      <form className="newsletter-form" onSubmit={submit}><label htmlFor="newsletter-email">Sign up for our newsletter</label><div className="newsletter-fields"><input id="newsletter-email" type="email" autoComplete="email" inputMode="email" placeholder="Enter email address" name="email" required/><button type="submit" disabled={status==='sending'}>{status==='sending'?'Sending…':'Subscribe'} <span aria-hidden="true">↗</span></button></div>{status==='success' && <p role="status">Thank you for subscribing.</p>}{status==='error' && <p role="alert">Unable to subscribe. Please try again.</p>}</form>
    </section>
    <footer className="quantum-footer"><div className="footer-contact-grid"><div className="footer-talk"><p className="eyebrow">LET’S CONNECT</p><h2>Talk to us<span>.</span></h2><p>Have an idea? We’d love to hear from you.</p></div><div className="footer-contact"><div><p className="eyebrow">BUSINESS &amp; COLLABORATIONS</p><a href="mailto:growth@quantumx1.in">growth@quantumx1.in ↗</a></div><div><p className="eyebrow">CAREERS</p><a href="mailto:growth@quantumx1.in">growth@quantumx1.in ↗</a></div></div><div className="footer-presence"><p className="eyebrow">OUR PRESENCE</p><h3>Chennai, India</h3><p>No. 40 North Road,<br/>West C.I.T Nagar, Nandanam,<br/>Chennai - 600035</p><p>Working with brands across India and around the world.</p></div></div>
      <div className="footer-bottom quantum-footer-bottom"><div className="footer-identity"><div className="footer-socials" aria-label="Social media"><span className="footer-social" aria-label="Instagram profile coming soon" title="Instagram profile coming soon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg></span><a className="footer-social" href="https://www.linkedin.com/company/quantumx1/" target="_blank" rel="noopener noreferrer" aria-label="QuantumX on LinkedIn (opens in a new tab)" title="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.1 3A2.1 2.1 0 1 0 5.1 7.2 2.1 2.1 0 0 0 5.1 3ZM3.3 8.8h3.6V21H3.3V8.8Zm5.8 0h3.4v1.7h.1a3.8 3.8 0 0 1 3.4-1.9c3.7 0 4.4 2.4 4.4 5.5V21h-3.6v-6.1c0-1.5 0-3.3-2-3.3s-2.1 1.6-2.1 3.2V21H9.1V8.8Z"/></svg></a></div></div><div className="footer-legal"><div className="footer-legal-links"><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms-conditions">Terms &amp; conditions</Link></div><p>© 2026 QuantumX. All rights reserved.</p></div></div>
    </footer>
  </>;
}
function projectThumbnail(project) {
  return project.featured ? `/assets/home-mockups/${project.slug}.webp` : project.listingImage || project.homepageImage || project.image;
}
function ProjectVisual({project,eager=false}) {
  return project.image?<img className="project-image" src={project.image} alt={`${project.name} portfolio visual`} loading={eager?'eager':'lazy'} decoding="async"/>:<div className={`project-typographic project-${project.slug}`}><span>{project.sector}</span><strong>{project.name}</strong><small>{project.impact||project.category}</small></div>;
}
function ProjectCard({project,compact=false,homepage=false}) {
  return <Link href={`/projects/${project.slug}`} className={`project-card ${compact?'compact':''} project-card-${project.slug}`}>
    <div className="project-meta"><h3>{project.name}</h3><p>{project.description}</p><span className="project-link">View Project ↗</span></div>
    <ProjectVisual project={{...project, image:homepage ? `/assets/home-mockups/${project.slug}.webp` : projectThumbnail(project)}}/>
    <div className="compact-caption"><h3>{project.name}</h3><p>{project.category} ↗</p></div>
  </Link>;
}
const clientLogoGroups = [
  [
    {name:'ASET College',src:'/assets/client-logos/aset.png',className:'client-logo-aset'},
    {name:'Snitch',src:'/assets/client-logos/snitch.png'},
    {name:'GoFloaters',src:'/assets/client-logos/gofloaters.png',className:'client-logo-gofloaters'},
    {name:'Milky Mist',src:'/assets/client-logos/milky-mist.jpg',className:'client-logo-milky'},
    {name:'Chettinad Cement',src:'/assets/client-logos/chettinad.png'},
  ],
  [
    {name:'SRM Institute of Science and Technology',src:'/assets/client-logos/partners/srm-institute.webp'},
    {name:'Hyatt Regency',src:'/assets/client-logos/partners/hyatt-regency.webp'},
    {name:'Ashok Leyland',src:'/assets/client-logos/partners/ashok-leyland.webp'},
    {name:'Radisson Blu',src:'/assets/client-logos/partners/radisson-blu.svg'},
    {name:'Living Structures',src:'/assets/client-logos/partners/living-structures.webp'},
  ],
  [
    {name:'Healthsoft',src:'/assets/client-logos/partners/healthsoft.webp'},
    {name:'Zayn Studios',src:'/assets/client-logos/partners/zayn-studios.webp'},
    {name:'Sakura',src:'/assets/client-logos/partners/sakura.png'},
    {name:'TOPX',src:'/assets/client-logos/partners/topx.webp'},
    {name:'Authoringminds',src:'/assets/client-logos/partners/authoringminds.webp',className:'client-logo-authoring'},
  ],
  [
    {name:'Axis',src:'/assets/client-logos/partners/axis.webp'},
    {name:'The Artment',src:'/assets/client-logos/partners/the-artment.webp'},
    {name:'Lakmé Academy',src:'/assets/client-logos/partners/lakme-academy.webp'},
    {name:'Salt and Cure',src:'/assets/client-logos/partners/salt-and-cure.webp'},
    {name:'BDM',src:'/assets/client-logos/partners/bdm.webp',className:'client-logo-bdm'},
  ],
  [
    {name:'Aurenor Salon',src:'/assets/client-logos/partners/aurenor.webp'},
    {name:'Maa Naturals',src:'/assets/client-logos/partners/maa-naturals.webp'},
    {name:'Universal Bridge Logistics',src:'/assets/client-logos/partners/universal-bridge.webp'},
    {name:'Infec Services',src:'/assets/client-logos/partners/infec.webp'},
    {name:'Zellify',src:'/assets/client-logos/partners/zellify.webp'},
  ],
];
const mobileClientLogos = clientLogoGroups.flat();
const mobileClientLogoGroups = Array.from({length:Math.ceil(mobileClientLogos.length/4)},(_,group)=>Array.from({length:4},(_,index)=>mobileClientLogos[(group*4+index)%mobileClientLogos.length]));
function ClientLogos() {
  const [group,setGroup] = useState(0);
  const [mobile,setMobile] = useState(false);
  useEffect(() => {
    const media=window.matchMedia('(max-width: 767px)');
    const update=()=>{setMobile(media.matches);setGroup(0)};
    update(); media.addEventListener('change',update);
    return ()=>media.removeEventListener('change',update);
  }, []);
  const groups=mobile?mobileClientLogoGroups:clientLogoGroups;
  useEffect(() => {
    const timer = setInterval(() => setGroup(current => (current + 1) % groups.length), 5600);
    return () => clearInterval(timer);
  }, [groups]);
  return <section className="client-logo-section" aria-label="Selected client brands">
    <div className="logo-strip quantum-logo-strip" role="group" aria-label={`Brand group ${group % groups.length + 1} of ${groups.length}`}>
      {groups[group % groups.length].map((logo,index) => <span key={`${group}-${logo.name}`} className={`client-logo ${logo.className || ''}`} style={{'--logo-index':index}}>
        {logo.placeholder ? <span className="client-logo-placeholder" aria-label={`${logo.name} logo placeholder`}>{logo.name}</span> : <><img src={logo.src} alt={logo.name}/>{logo.className === 'client-logo-aset' && <img className="aset-dark-word" src={logo.src} alt="" aria-hidden="true"/>}{logo.className === 'client-logo-bdm' && <img className="bdm-colored-icon" src={logo.src} alt="" aria-hidden="true"/>}</>}
      </span>)}
    </div>
  </section>;
}

function Home() {
  const [faq,setFaq]=useState(-1);
  const [workDark,setWorkDark]=useState(false);
  const [newsLight,setNewsLight]=useState(false);
  useEffect(() => {
    let frame;
    const update = () => {
      const firstProject = document.querySelector('.featured-projects .project-card');
      const section = document.querySelector('.work-section');
      if (firstProject && section) setWorkDark(firstProject.getBoundingClientRect().top <= (window.innerWidth <= 767 ? 130 : 160) && section.getBoundingClientRect().bottom > 0);
      frame = null;
    };
    const schedule = () => { if (frame == null) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    return () => { window.removeEventListener('scroll',schedule); window.removeEventListener('resize',schedule); if(frame != null) cancelAnimationFrame(frame); };
  }, []);
  useEffect(() => {
    const firstStory = document.querySelector('.quantum-news-row[href^="/projects/aset-college"]');
    if (!firstStory) return;
    let frame, timer, revealed = false;
    const update = () => {
      const entered = firstStory.getBoundingClientRect().top <= window.innerHeight * .9;
      if (entered && !revealed && timer == null) {
        timer = setTimeout(() => { timer = null; revealed = true; setNewsLight(true); }, 500);
      } else if (!entered) {
        if (timer != null) { clearTimeout(timer); timer = null; }
        if (revealed) { revealed = false; setNewsLight(false); }
      }
      frame = null;
    };
    const schedule = () => { if (frame == null) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    return () => { window.removeEventListener('scroll',schedule); window.removeEventListener('resize',schedule); if (frame != null) cancelAnimationFrame(frame); if (timer != null) clearTimeout(timer); };
  }, []);
  const questions=[
  [
    "What solutions does QuantumX deliver worldwide?",
    "QuantumX delivers end-to-end digital solutions across branding, UI/UX, product design, software and SaaS development, enterprise solutions, performance marketing, and advertising. From strategy and prototyping to development and deployment, we combine creative expertise with AI-powered workflows to drive measurable business outcomes."
  ],
  [
    "What is Agentic Integration Design, and does QuantumX offer it?",
    "Agentic Integration Design focuses on building AI-powered systems where intelligent agents automate workflows and execute repetitive tasks. We design both the user-facing interfaces and backend integrations, enabling seamless human-AI collaboration with transparency, control, scalability, and measurable efficiency."
  ],
  [
    "Which industries does QuantumX serve?",
    "We work with enterprises, high-growth startups, and emerging businesses across 7+ industries, including SaaS, automotive, manufacturing, telecom, professional services, MSMEs, and consumer platforms. Our solutions are tailored to each industry's business objectives, user behaviour, and operational requirements."
  ],
  [
    "How does QuantumX evaluate the impact of its design solutions?",
    "We measure success through meaningful business and user metrics, including engagement, conversion rates, task completion, retention, and product performance. Every design decision is aligned with measurable objectives to ensure a tangible impact on business growth and user experience."
  ],
  [
    "What are the typical timelines for design, development, or marketing projects?",
    "Timelines depend on project scope, complexity, and business requirements. Focused design, development, and marketing engagements typically take 8–12 weeks, while larger enterprise platforms and end-to-end digital transformations may require 16–20+ weeks."
  ]
];
  return <><Header workDark={workDark} newsLight={newsLight}/><main>
    <section className="hero"><div className="hero-copy"><p className="muted">Strategy · Creative · Performance · Technology · Data · AI</p><h1>Growth, managed as<br/><strong>one connected system<span>.</span></strong></h1><p className="hero-description">QuantumX connects brand building, demand generation, digital experience and measurable performance to help businesses grow.</p><div className="hero-actions"><Button/><Link className="text-link" href="/projects">See our Work</Link></div></div><HeroQuantumNode/></section>
    <ClientLogos/>
    <section className={`work-section ${workDark ? 'work-dark' : ''}`}><div className="section-intro"><h2><span>Selected work</span><br/>built for growth</h2><p>From identity and campaigns to websites, funnels and connected digital experiences.</p></div><div className="featured-projects">{projects.filter(project=>project.featured).map(project=><ProjectCard key={project.slug} project={project} homepage/>)}</div><div className="work-end"><h3>Explore more of the brands and experiences we have worked on.</h3><Button href="/projects">View all Projects</Button></div></section>
    <Testimonials/>
    <Capabilities/>
    <section className="quantum-news" data-theme={newsLight ? 'light' : 'dark'} aria-labelledby="quantum-news-title"><h2 id="quantum-news-title">Latest at <span>QuantumX</span></h2><div className="quantum-news-columns"><div className="quantum-news-list">
      <Link href="/projects/aset-college" className="quantum-news-row"><img src={projectThumbnail(projects.find(project=>project.slug==='aset-college'))} alt="" loading="lazy" decoding="async"/><div><p>ASET COLLEGE CASE STUDY</p><h3>Explore the connected digital journey behind ASET College’s growth. <span>↗</span></h3></div></Link>
      <Link href="/projects/zellify" className="quantum-news-row"><img src={projectThumbnail(projects.find(project=>project.slug==='zellify'))} alt="" loading="lazy" decoding="async"/><div><p>ZELLIFY CASE STUDY</p><h3>A conversion-focused digital experience built for a growing product. <span>↗</span></h3></div></Link>
      {blogArticles.slice(0,2).map((article,index)=><Link href={`/blogs/${article.slug}`} className="quantum-news-row" key={article.slug}><div className={`news-placeholder ${index===1?'news-placeholder-light':''}`} aria-hidden="true">{index===0?'✦':<>Q<span>✦</span></>}</div><div><p>{index===0?'TRENDS & INSIGHTS':'QUANTUMX BLOG'} · {article.readTime}</p><h3>{article.title} <span>↗</span></h3></div></Link>)}
    </div><aside className="quantum-recognition" aria-label="Reviews and recognition"><h3>Reviews &amp; recognition</h3><div className="recognition-grid"><div><span aria-hidden="true">✦</span><p>Client reviews</p><small>Coming soon</small></div><div><span aria-hidden="true">☆</span><p>Ratings</p><small>Coming soon</small></div><div><span aria-hidden="true">↗</span><p>Awards &amp; recognition</p><small>Coming soon</small></div><div><span aria-hidden="true">Q</span><p>QuantumX updates</p><small>Coming soon</small></div></div></aside></div></section>
    <section className="latest"><div className="section-intro"><h2>More from<br/><em>our portfolio</em></h2><Link className="text-link" href="/projects">View all projects ↗</Link></div><div className="latest-grid">{projects.slice(4,7).map(project=><Link href={`/projects/${project.slug}`} key={project.slug}><div className="latest-image-wrap"><ProjectVisual project={{...project, image:projectThumbnail(project)}}/></div><p>{project.category}</p><h3>{project.name} ↗</h3></Link>)}</div></section>
    <section className="faq"><h2>Questions we get asked.<br/><em>A lot.</em></h2><div>{questions.map(([question,answer],index)=><div className="faq-item" key={question}><button onClick={()=>setFaq(faq===index?-1:index)} aria-expanded={faq===index}>{question}<span>{faq===index?'−':'+'}</span></button>{faq===index&&<p>{answer}</p>}</div>)}</div></section>
  </main><Footer/><FloatingProjectCTA/></>;
}
function Projects() {
  const [filter,setFilter]=useState('All / Enterprise');
  const visible=projects.filter(project=>projectMatchesCategory(project,filter));
  return <><Header dark showContact/><main className="dark-page projects-page"><div className="page-hero projects-hero"><h1>CRAFTED<br/><em>for</em> GROWTH</h1><p>Identity, campaigns, digital experiences and connected marketing systems for brands across industries.</p><div className="filters" aria-label="Filter projects">{projectCategories.map(category=><button key={category} className={filter===category?'selected':''} onClick={()=>setFilter(category)} aria-pressed={filter===category}>{category}</button>)}</div></div><div className="project-grid">{visible.map(project=><ProjectCard compact key={project.slug} project={project}/>)}</div><ProjectCTA/></main><Footer/></>;
}
const caseProcess = ['Discovery & research','Visual exploration','Wireframing','Visual design','Prototyping','Development & launch','Marketing & optimisation'];
function CaseMediaPlaceholder({label,wide=false}) {
  return <div className={`case-media-placeholder ${wide?'case-media-wide':''}`}><span aria-hidden="true">✦</span><p>{label}</p></div>;
}
function CaseImage({src,alt,caption}) {
  return <figure className="case-proof-image"><img src={src} alt={alt} loading="lazy"/>{caption && <figcaption>{caption}</figcaption>}</figure>;
}
function ProjectDetail({project}) {
  const main = useRef(null);
  const details = project.caseStudy || {};
  const related = projects.filter(item=>item.slug!==project.slug).slice(0,2);
  const work = details.work || [
    {title:'Visual exploration',description:'Project-specific visual explorations and creative direction will be added here.',media:'Visual explorations to be added'},
    {title:'Design & development',description:'Design, prototyping and implementation details will be added as the case study is completed.',media:'Designs and project screenshots to be added'},
    {title:'Outcomes & evidence',description:'Results, examples and supporting evidence will be added when available.',media:'Project proof and results to be added'},
  ];
  useEffect(() => {
    const element = main.current;
    if (!element || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = element.querySelectorAll('[data-case-reveal]');
    const observer = new IntersectionObserver(entries => entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('case-in-view');observer.unobserve(entry.target)}}),{threshold:.08});
    element.classList.add('case-motion-ready');
    targets.forEach(target=>observer.observe(target));
    return () => {observer.disconnect();element.classList.remove('case-motion-ready')};
  }, [project.slug]);
  return <><Header dark showContact/><main ref={main} className="dark-page case-project">
    <section className="case-hero"><p className="case-back"><Link href="/projects">← All projects</Link></p><h1>{project.name}<span>.</span></h1><div className="case-focus"><span>Project focus</span><p>{project.category} <span>+</span> {project.sector}</p></div></section>
    <div className="case-hero-media"><ProjectVisual project={project.caseHeroImage ? {...project, image:project.caseHeroImage} : project} eager/></div>
    <section className="case-collaboration case-section" data-case-reveal><div className="case-collab-copy"><h2><span>The</span> collaboration</h2><p>{details.collaboration || project.description}</p>{details.collaboration && <p>{project.description}</p>}</div><dl className="case-facts"><div><dt>Industry</dt><dd>{project.sector}</dd></div><div><dt>Platform</dt><dd>{details.platform || 'To be added'}</dd></div><div><dt>Services</dt><dd>{details.services || project.category}</dd></div><div><dt>Website / app</dt><dd>{details.url?<a href={details.url} target="_blank" rel="noreferrer">Visit website ↗</a>:<span className="case-pending">Link to be added</span>}</dd></div></dl></section>
    <section className="case-problem case-section" data-case-reveal><p className="case-eyebrow">THE CHALLENGE</p><div className="case-split"><h2>Problem <span>definition.</span></h2><p>{details.challenge || project.challenge || 'Project challenge and goals will be added here.'}</p></div></section>
    {(details.process === undefined || details.process.length > 0) && <section className="case-process case-section" data-case-reveal><div><p className="case-eyebrow">HOW WE WORK</p><h2>The process<br/><span>we follow.</span></h2>{details.process === undefined && <p className="case-muted">A flexible framework. Project-specific process details and examples can be added here.</p>}</div><ol>{(details.process || caseProcess).map((step,index)=><li key={step}><span>{String(index+1).padStart(2,'0')}</span>{step}</li>)}</ol></section>}
    <section className="case-work case-section"><div className="case-work-intro" data-case-reveal><p className="case-eyebrow">THE WORK</p><h2>Opportunities<br/><span>and execution.</span></h2><p>Explore the work behind the project, from the first ideas to the finished experience.</p></div><div className="case-work-list">{work.map((item,index)=><article className="case-work-item" key={item.title} data-case-reveal><div className="case-work-copy"><span className="case-number">{String(index+1).padStart(2,'0')}</span><h3>{item.title}</h3><p>{item.description}</p></div>{item.image ? <CaseImage src={item.image} alt={item.imageAlt} caption={item.imageCaption}/> : <CaseMediaPlaceholder label={item.media}/>}</article>)}</div></section>
    <section className="case-experience case-section" data-case-reveal><p className="case-eyebrow">THE EXPERIENCE</p><div className="case-split"><h2>What we <span>created.</span></h2><div>{details.experience && <h3 className="case-experience-title">Connected thinking. Focused execution.</h3>}<p>{details.experience || project.solution || project.description}</p></div></div><div className="case-gallery">{details.experienceImages ? details.experienceImages.map(image=><CaseImage key={image.src} {...image}/>) : <>{project.gallery?.filter(image=>image!==project.image).slice(0,2).map((image,index)=><div className="case-gallery-image" key={image}><img src={image} alt={`${project.name} project visual ${index+1}`} loading="lazy"/></div>)}<CaseMediaPlaceholder label="Screenshots and visual designs to be added"/><CaseMediaPlaceholder label="Prototypes and project details to be added"/></>}</div></section>
    <section className="case-impact case-section" data-case-reveal><p className="case-eyebrow">THE IMPACT</p><div className="case-split"><h2>Results <span>that matter.</span></h2><div>{project.impact?<><strong>{project.impact}</strong><p>{project.impactNote || 'Project outcomes.'}</p></>:<p>Project results and supporting evidence will be added here.</p>}</div></div>{details.impactImage && <div className="case-impact-visual"><CaseImage {...details.impactImage}/></div>}{details.closingImage ? <div className="case-impact-visual"><CaseImage {...details.closingImage}/></div> : <CaseMediaPlaceholder label="Results and supporting proof to be added" wide/>}</section>
    <div className="case-related related" data-case-reveal><div className="case-related-heading"><h2>Related <span>projects.</span></h2><Link href="/projects">View all projects ↗</Link></div><div className="project-grid">{related.map(item=><ProjectCard compact key={item.slug} project={item}/>)}</div></div>
  </main><Footer/></>;
}
function Contact() {
  const {status,submit}=useFormspree('Contact enquiry');
  const [contactMode,setContactMode]=useState('enquiry');
  const bookingUrl='https://cal.com/quantumx/30min';
  return <><Header showContact/><main className="contact-page contact-page-new">
    <section className="contact-content" aria-label="Contact QuantumX"><div className="contact-switch" role="group" aria-label="How would you like to connect?"><button type="button" aria-pressed={contactMode==='call'} className={contactMode==='call'?'active':''} onClick={()=>setContactMode('call')}>Book a 30 min call</button><button type="button" aria-pressed={contactMode==='enquiry'} className={contactMode==='enquiry'?'active':''} onClick={()=>setContactMode('enquiry')}>Send an enquiry</button></div>
      {contactMode==='call'?<div className="contact-call-panel"><iframe title="Book a 30 minute call with QuantumX" src={`${bookingUrl}?embed=true`} loading="lazy" allow="payment"/><p>If the calendar does not load, <a href={bookingUrl} target="_blank" rel="noopener noreferrer">open booking in a new tab ↗</a>.</p></div>:
      <form className="contact-enquiry-form" onSubmit={submit}>{status==='success'?<div className="form-success"><h2>Thank you.</h2><p>Your enquiry has been sent. We’ll be in touch soon.</p></div>:<><div className="contact-fields"><label>Your name <span aria-hidden="true">*</span><input required name="name" autoComplete="name" placeholder="Enter your name"/></label><label>Organisation name <span aria-hidden="true">*</span><input required name="company" autoComplete="organization" placeholder="Enter your organisation name"/></label><label>Work email <span aria-hidden="true">*</span><input required type="email" name="email" autoComplete="email" inputMode="email" placeholder="example@org.com"/></label><label>Contact number <span aria-hidden="true">*</span><input required type="tel" name="phone" autoComplete="tel" placeholder="Your contact number"/></label><label className="contact-message">How can we help? <small>(optional)</small><textarea name="message" placeholder="Describe your project"/></label></div><fieldset className="contact-source"><legend>How did you get to know about us? <span aria-hidden="true">*</span></legend><div className="contact-source-options">{['AI','Google','Social','Referral','Other'].map(source=><label key={source}><input type="radio" name="heard_from" value={source} required/><span>{source}</span></label>)}</div></fieldset><div className="contact-actions"><p>We’ll only use your details to respond to your enquiry.</p><button className="contact-submit" type="submit" disabled={status==='sending'}>{status==='sending'?'Sending…':'Submit enquiry'} <span aria-hidden="true">↗</span></button></div>{status==='error' && <p className="contact-error" role="alert">Unable to send your enquiry. Please try again.</p>}</>}</form>}
    </section>
  </main><Footer/></>;
}
function Generic({path}) {
  const [family,detail]=path;
  const name=title(detail||family);
  const list=family==='services'?services:family==='industries'?industries:[];
  const headline=family==='services'?'Seven connected capabilities':family==='industries'?'Growth across industries':family==='about'?'Growth is a system':name;
  return <><Header dark showContact={family==='services'}/><main className="dark-page generic"><section className="generic-hero"><p className="eyebrow">QUANTUMX / {family.toUpperCase()}</p><h1>{detail?name:headline}<span>.</span></h1><div className="generic-sub"><p>{family==='about'?'A growth and marketing company built to connect strategy, creativity, media, technology, data and AI.':'The right mix of strategy, creative, channels and technology changes with every audience and objective.'}</p><Button/></div></section><section className="generic-content"><div><p className="eyebrow">HOW WE WORK</p><h2>One connected system.</h2></div><p>We start with the customer and the growth problem, then connect the capabilities needed to build demand, turn attention into action and improve results over time.</p></section>{list.length>0&&<div className="generic-list">{list.map((item,index)=><Link key={item} href={`/${family}/${slugify(item)}`}><span>0{index+1}</span><h2>{item}</h2><span>↗</span></Link>)}</div>}{family==='about'&&<div className="generic-list">{markets.map((market,index)=><div className="presence-row" key={market}><span>0{index+1}</span><h2>{market}</h2></div>)}</div>}<div className="related"><h2>Selected work<span>.</span></h2><div className="project-grid">{projects.slice(0,2).map(project=><ProjectCard compact key={project.slug} project={project}/>)}</div></div></main><Footer/></>;
}
const serviceOverview = [
  {title:'Strategy',summary:'A practical direction for growth, built around your business, your audience and the connections between them.',items:['Research & discovery','Growth strategy','Customer journeys']},
  {title:'Creative',summary:'Distinctive identities and creative experiences that help brands communicate clearly and stay consistent across every touchpoint.',items:['Brand identity','Campaign creative','Content & design']},
  {title:'Performance Marketing',summary:'Turn channels into measurable growth with campaigns, conversion-focused funnels and continuous optimisation.',items:['Paid media','Lead generation','Campaign optimisation']},
  {title:'B2B Growth',summary:'Connect positioning, outreach and digital experiences to help businesses reach the right decision-makers.',items:['B2B positioning','Demand generation','Sales journeys']},
  {title:'Digital Experience',summary:'Design and develop useful digital platforms, from customer-facing websites to connected applications and products.',items:['UI / UX design','Web applications','Digital platforms']},
  {title:'CRM & Automation',summary:'Connect customer data and workflows to make follow-ups, operations and interactions more seamless.',items:['CRM workflows','Agentic AI','Process automation']},
  {title:'Data & Analytics',summary:'Bring information together to understand performance, identify opportunities and guide better decisions.',items:['Measurement','Reporting','Performance insights']},
];
function ServiceCounters() {
  const [progress,setProgress]=useState(1);
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    let frame, timer, observer, started=false;
    setProgress(0);
    const start=()=>{
      if(started)return;
      started=true;
      observer?.disconnect();
      const begin=performance.now();
      const tick=now=>{const elapsed=Math.min((now-begin)/1800,1);setProgress(1-Math.pow(1-elapsed,3));if(elapsed<1)frame=requestAnimationFrame(tick)};
      frame=requestAnimationFrame(tick);
    };
    timer=setTimeout(()=>{
      if(!document.querySelector('.loader')){start();return}
      observer=new MutationObserver(()=>{if(!document.querySelector('.loader'))start()});
      observer.observe(document.body,{childList:true,subtree:true});
    },100);
    return ()=>{clearTimeout(timer);observer?.disconnect();if(frame!=null)cancelAnimationFrame(frame)};
  },[]);
  return <div className="services-facts">{[{value:118,suffix:'+',label:'Projects'},{value:7,suffix:'',label:'Industries'},{value:6,suffix:'+',label:'Years of experience'}].map(({value,suffix,label})=><div key={label}><strong aria-label={`${value}${suffix}`}><span aria-hidden="true">{Math.floor(value*progress)}{suffix}</span></strong><span>{label}</span></div>)}</div>;
}
function ServicesOverview() {
  const [active,setActive]=useState(0);
  useEffect(()=>{const nodes=document.querySelectorAll('[data-service-section]');if(!('IntersectionObserver' in window))return;const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setActive(Number(entry.target.dataset.serviceSection))}),{rootMargin:'-20% 0px -65% 0px',threshold:0});nodes.forEach(node=>observer.observe(node));return ()=>observer.disconnect()},[]);
  return <><Header dark glassAlways showContact/><main className="services-page"><section className="services-intro"><div className="services-intro-content"><nav className="services-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Services</span></nav><p className="services-eyebrow">QUANTUMX / SERVICES</p><h1>Connected thinking.<br/><span>Built for growth.</span></h1><p className="services-lede">Strategy, creativity and technology work better together. We connect the capabilities your business needs to move forward.</p><div className="services-intro-bottom"><ServiceCounters/><Button/></div></div><div className="services-globe" aria-hidden="true"><img src="/assets/services-globe.webp" alt=""/><svg viewBox="0 0 1000 562" preserveAspectRatio="none"><g className="globe-routes-base"><path d="M486 442 Q365 260 185 366"/><path d="M486 442 Q440 255 338 335"/><path d="M486 442 Q590 255 720 350"/><path d="M486 442 Q670 295 875 390"/><path d="M486 442 Q565 330 624 445"/></g><g className="globe-routes"><path d="M486 442 Q365 260 185 366"/><path d="M486 442 Q440 255 338 335"/><path d="M486 442 Q590 255 720 350"/><path d="M486 442 Q670 295 875 390"/><path d="M486 442 Q565 330 624 445"/></g><g className="globe-nodes"><circle cx="486" cy="442" r="5"/><circle cx="185" cy="366" r="3"/><circle cx="338" cy="335" r="3"/><circle cx="720" cy="350" r="3"/><circle cx="875" cy="390" r="3"/><circle cx="624" cy="445" r="3"/></g></svg></div></section><section className="services-catalog"><div className="services-catalog-heading"><p className="services-eyebrow">OUR CAPABILITIES</p><h2>One connected<br/><span>system.</span></h2><p>From first idea to ongoing growth, explore the services that bring your business ambitions together.</p></div><div className="services-catalog-layout"><nav className="services-index" aria-label="Jump to a service">{serviceOverview.map((item,index)=><a href={`#service-${index+1}`} key={item.title} className={active===index?'active':''} aria-current={active===index?'true':undefined}><span>{String(index+1).padStart(2,'0')}</span><span className="services-index-name">{item.title}</span></a>)}</nav><div className="services-rows">{serviceOverview.map((item,index)=><article className="services-row" id={`service-${index+1}`} data-service-section={index} key={item.title}><p className="services-row-number">{String(index+1).padStart(2,'0')} / {String(serviceOverview.length).padStart(2,'0')}</p><Link href={`/services/${slugify(item.title)}`} className="services-row-title"><h3>{item.title}</h3><span aria-hidden="true">↗</span></Link><p>{item.summary}</p><ul>{item.items.map(detail=><li key={detail}>{detail}</li>)}</ul><Link className="services-row-link" href={`/services/${slugify(item.title)}`}>Explore {item.title} <span aria-hidden="true">↗</span></Link></article>)}</div></div></section><section className="services-end"><p className="services-eyebrow">LET’S BUILD WHAT’S NEXT</p><h2>Ready to connect<br/><span>the dots?</span></h2><p>Tell us what you’re building. Together, we’ll shape the right approach for your next stage of growth.</p><Button/></section></main><Footer/></>;
}
function IndustryOverviewStats() {
  const ref=useRef(null);
  const [progress,setProgress]=useState(1);
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    setProgress(0);
    let frame,timer,visibilityObserver,loaderObserver,started=false;
    const start=()=>{
      if(started)return;
      started=true;visibilityObserver?.disconnect();loaderObserver?.disconnect();
      const begin=performance.now();
      const tick=now=>{const elapsed=Math.min((now-begin)/1800,1);setProgress(1-Math.pow(1-elapsed,3));if(elapsed<1)frame=requestAnimationFrame(tick)};
      frame=requestAnimationFrame(tick);
    };
    const whenVisible=()=>{timer=setTimeout(()=>{if(!document.querySelector('.loader')){start();return}loaderObserver=new MutationObserver(()=>{if(!document.querySelector('.loader'))start()});loaderObserver.observe(document.body,{childList:true,subtree:true})},100)};
    if('IntersectionObserver' in window){visibilityObserver=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){visibilityObserver.disconnect();whenVisible()}},{threshold:.2});visibilityObserver.observe(ref.current)}else whenVisible();
    return ()=>{clearTimeout(timer);visibilityObserver?.disconnect();loaderObserver?.disconnect();if(frame!=null)cancelAnimationFrame(frame)};
  },[]);
  const stats=[{value:7,suffix:'',pad:true,label:'Industries explored'},{value:6,suffix:'+',label:'Years of QuantumX experience'},{value:30,suffix:'+',label:'Industry capability areas'}];
  return <div className="industry-stats" ref={ref}>{stats.map(({value,suffix,pad,label})=>{const display=String(Math.floor(value*progress)).padStart(pad?2:1,'0')+suffix;return <div key={label}><strong aria-label={`${pad?String(value).padStart(2,'0'):value}${suffix}`}><span aria-hidden="true">{display}</span></strong><span>{label}</span></div>})}</div>;
}
function IndustryOverview() {
  return <><Header dark showContact/><main className="industries-page"><section className="industry-hero"><p className="industry-kicker">INDUSTRIES / QUANTUMX</p><h1>Industry insight.<br/><span>Digital execution.</span><br/>Measurable growth.</h1><p>Every industry has its own customers, challenges and definition of growth. We bring strategy, creative, technology and performance together to help businesses move forward.</p><IndustryOverviewStats/></section><section className="industry-index"><div className="industry-section-head"><p className="industry-kicker">OUR INDUSTRIES</p><h2>Different industries.<br/><span>Connected thinking.</span></h2></div><p className="industry-estimate-note">Project counts below are an illustrative allocation of 118 projects across industries, pending verification.</p><div className="industry-list">{industryContent.map(industry=><article className="industry-overview-card" key={industry.slug}><div className="industry-overview-copy"><h3>{industry.name}</h3><p>{industry.intro}</p></div><dl className="industry-metrics">{[['Projects (illustrative)',industry.projectCount],['Clients',industry.clientCount],['Client rating',industry.rating]].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value ?? <span className="industry-metric-pending">To be confirmed</span>}</dd></div>)}</dl><Link className="industry-more" href={`/industries/${industry.slug}`}>Know more <span aria-hidden="true">↗</span></Link></article>)}</div></section><section className="industry-contact"><p className="industry-kicker">LET’S BUILD WHAT’S NEXT</p><h2>Have a different<br/><span>challenge in mind?</span></h2><p>We start by understanding your business, customers and goals. Let’s explore what comes next together.</p><Button/></section></main><Footer/></>;
}
function IndustryDetail({industry}) {
  const index=industryContent.indexOf(industry);
  return <><Header dark showContact/><main className="industries-page"><section className="industry-hero industry-detail-hero"><Link className="industry-back" href="/industries">← All industries</Link><p className="industry-kicker">INDUSTRY {String(index+1).padStart(2,'0')}</p><h1>{industry.name}<span>.</span></h1><p>{industry.intro}</p><div className="industry-stats"><div><strong>6+</strong><span>Years of QuantumX experience</span></div><div><strong>05</strong><span>Industry challenges explored</span></div><div><strong>07</strong><span>Capability areas</span></div></div></section><section className="industry-section industry-understanding"><div><p className="industry-kicker">UNDERSTANDING THE INDUSTRY</p><h2>Built around<br/><span>your business.</span></h2></div><p>{industry.understanding}</p></section><section className="industry-section industry-challenges"><div className="industry-section-head"><p className="industry-kicker">THE CHALLENGES</p><h2>What businesses<br/><span>are navigating.</span></h2></div><div className="industry-challenge-grid">{industry.challenges.map((challenge,i)=><article key={challenge}><span>{String(i+1).padStart(2,'0')}</span><p>{challenge}</p></article>)}</div></section><section className="industry-section industry-understanding"><div><p className="industry-kicker">HOW QUANTUMX HELPS</p><h2>One connected<br/><span>approach.</span></h2></div><p>{industry.approach}</p></section><section className="industry-section industry-capabilities"><div className="industry-section-head"><p className="industry-kicker">OUR CAPABILITIES</p><h2>Solutions shaped<br/><span>for your industry.</span></h2></div><div className="industry-capability-list">{industry.capabilities.map((capability,i)=><div key={capability}><span>{String(i+1).padStart(2,'0')}</span><h3>{capability}</h3><span aria-hidden="true">↗</span></div>)}</div></section><section className="industry-contact"><p className="industry-kicker">LET’S BUILD WHAT’S NEXT</p><h2>Ready to move<br/><span>forward?</span></h2><p>Tell us what your business needs next, and let’s build a connected path to growth.</p><Button/></section></main><Footer/></>;
}
const blogTopics = blogArticles;
const blogCategories = ['All', 'UI/UX', 'Branding', 'Growth', 'Technology', 'AI'];
const publishedArticles = blogArticles;
function Blogs() {
  const [current,setCurrent]=useState(0);
  const [paused,setPaused]=useState(false);
  const [hovered,setHovered]=useState(false);
  const [query,setQuery]=useState('');
  const [category,setCategory]=useState('All');
  useEffect(()=>{
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    const update=()=>{clearInterval(timer);if(!paused && !hovered && !motion.matches) timer=setInterval(()=>setCurrent(value=>(value+1)%blogTopics.length),5000)};
    update();motion.addEventListener('change',update);
    return ()=>{clearInterval(timer);motion.removeEventListener('change',update)};
  },[paused,hovered]);
  const visible=publishedArticles.filter(article=>(category==='All'||article.categories.includes(category)) && `${article.title} ${article.excerpt} ${article.categories.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <><Header dark glassOnScroll showContact/><main className="blog-page"><section className="blog-intro"><nav className="blog-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Blogs</span></nav><div className="blog-hero-heading"><div><p className="eyebrow">THE QUANTUMX JOURNAL</p><h1>Ideas for<br/><span>what’s next.</span></h1></div><p>Perspectives on brands, technology, digital experiences and growth.</p></div><div className="blog-carousel" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} aria-label="Featured articles"><div className="blog-carousel-window"><div className="blog-carousel-track" style={{transform:`translateX(${current * 100}%)`}}>{blogTopics.map((item,index)=><div className="blog-feature blog-slide" key={item.slug} aria-hidden={index!==current} inert={index!==current ? true : undefined}><div className={`blog-feature-art blog-art-${item.className}`} aria-hidden="true"><span>Q<span>✦</span></span><i/></div><div className="blog-feature-copy"><p className="blog-feature-label">FEATURED ARTICLE <span> / {String(index+1).padStart(2,'0')}</span></p><p className="blog-feature-category">{item.categories[0]} · {item.readTime}</p><h2><Link href={`/blogs/${item.slug}`}>{item.title}</Link></h2><p>{item.excerpt}</p><p className="blog-author">{item.author} · Founder &amp; CEO</p><Link className="blog-read-link" href={`/blogs/${item.slug}`}>Read article ↗</Link></div></div>)}</div></div><div className="blog-carousel-controls"><button type="button" aria-label="Previous article" onClick={()=>setCurrent((current+blogTopics.length-1)%blogTopics.length)}>←</button><span aria-live="polite">{String(current+1).padStart(2,'0')} / {String(blogTopics.length).padStart(2,'0')}</span><button type="button" aria-label="Next article" onClick={()=>setCurrent((current+1)%blogTopics.length)}>→</button><button type="button" className="blog-pause" onClick={()=>setPaused(value=>!value)} aria-label={paused?'Resume carousel':'Pause carousel'}>{paused?'Play':'Pause'}</button></div></div></section><section className="blog-library" aria-labelledby="blog-library-title"><div className="blog-library-heading"><div><p className="eyebrow">EXPLORE THE JOURNAL</p><h2 id="blog-library-title">Fresh thinking<span>.</span></h2></div><p>Explore stories and insights from the QuantumX team.</p></div><div className="blog-tools"><label className="blog-search"><span className="sr-only">Search blog articles</span><span aria-hidden="true">⌕</span><input type="search" placeholder="Search articles" value={query} onChange={event=>setQuery(event.target.value)}/></label><div className="blog-filters" aria-label="Filter blog articles by topic">{blogCategories.map(item=><button type="button" key={item} className={category===item?'active':''} aria-pressed={category===item} onClick={()=>setCategory(item)}>{item}</button>)}</div></div>{visible.length ? <div className="blog-article-grid">{visible.map(article=><Link className="blog-article-card" key={article.slug} href={`/blogs/${article.slug}`}><div className={`blog-card-art blog-art-${article.className}`} aria-hidden="true"><span>Q<span>✦</span></span></div><div className="blog-card-copy"><p>{article.categories[0]} · {article.readTime}</p><h3>{article.title}</h3><span>{article.author}<small>Founder &amp; CEO</small></span></div><span className="blog-card-arrow" aria-hidden="true">↗</span></Link>)}</div> : <div className="blog-empty-state" role="status"><span aria-hidden="true">✦</span><h3>{publishedArticles.length===0?'Stories are coming soon.':'No articles found.'}</h3><p>{publishedArticles.length===0?'Our journal is taking shape. Check back for ideas and insights from the QuantumX team.':'Try another search or choose a different topic.'}</p>{(query || category!=='All') && <button type="button" onClick={()=>{setQuery('');setCategory('All')}}>Clear filters ↗</button>}</div>}</section></main><Footer/></>;
}
const blogArticleExtras = {
  'from-car-configurator-to-purchase': {summary:['A configurator helps buyers explore options and understand their choices.','Clear pricing, availability and next steps connect that exploration to a purchase.','Saved choices can help create continuity across digital and in-person interactions.'],faqs:[{question:'What is a car configurator?',answer:'A car configurator lets people explore a vehicle by selecting options such as trim, colours and features.'},{question:'How can a configurator support the buying journey?',answer:'It can connect a shopper’s choices to useful next steps, such as saving a configuration, requesting a test drive or contacting a dealer.'},{question:'What information should a configurator make clear?',answer:'Where available, customers should be able to understand how choices affect price, availability and the next steps in their purchase.'}]},
  'designing-saas-onboarding-for-adoption': {summary:['Start onboarding with the user’s goal and a clear first outcome.','Guide users through relevant steps without overwhelming them.','Use feedback and product data to improve the experience over time.'],faqs:[{question:'What is SaaS onboarding?',answer:'SaaS onboarding helps new users set up and begin using a software product to achieve a useful outcome.'},{question:'What makes onboarding effective?',answer:'Relevant guidance, a clear first action and a manageable number of steps can help users build confidence.'},{question:'How can teams improve onboarding?',answer:'Teams can combine user feedback with product analytics to identify friction and improve important steps in the journey.'}]},
};
function BlogArticle({article}) {
  const extras=blogArticleExtras[article.slug];
  return <><Header dark glassOnScroll showContact/><main className="blog-article-page"><article><header className="blog-article-hero"><nav className="blog-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blogs">Blogs</Link><span aria-hidden="true">/</span><span>{article.categories[0]}</span></nav><p className="industry-kicker">{article.categories.join(' / ')} · {article.readTime}</p><h1>{article.title}</h1><p className="blog-article-excerpt">{article.excerpt}</p><p className="blog-article-byline">By {article.author}</p></header><div className={`blog-article-banner blog-art-${article.className}`} aria-hidden="true"><span>Q<span>✦</span></span></div><div className="blog-article-layout"><aside className="blog-article-sidebar" aria-label="Article details and contents"><div className="blog-article-meta"><div><span>Published</span><strong>{article.published || 'Not yet provided'}</strong></div><div><span>Last updated</span><strong>{article.updated || 'Not yet provided'}</strong></div><div><span>Read time</span><strong>{article.readTime}</strong></div></div><details className="blog-toc" open><summary>Table of contents</summary><nav aria-label="Table of contents"><ol>{article.sections.map((section,index)=><li key={section.title}><a href={`#article-section-${index+1}`}>{section.title}</a></li>)}<li><a href="#article-faqs">Frequently asked questions</a></li></ol></nav></details></aside><div className="blog-article-body">{article.sections.map((section,index)=><section key={section.title} id={`article-section-${index+1}`}><h2>{section.title}</h2>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</section>)}<section id="article-faqs" className="blog-article-faqs"><h2>Frequently asked questions</h2>{extras.faqs.map(faq=><details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section><Link className="blog-back-link" href="/blogs">← Back to all articles</Link></div><aside className="blog-article-summary" aria-label="Article summary"><p className="industry-kicker">IN THIS ARTICLE</p><h2>At a glance<span>.</span></h2><ul>{extras.summary.map(item=><li key={item}>{item}</li>)}</ul></aside></div><section className="blog-article-cta"><p className="industry-kicker">LET’S BUILD SOMETHING</p><h2>Ready to make<br/><span>what’s next?</span></h2><p>Bring your ideas, challenges and goals. Let’s create something together.</p><Button/></section></article></main><Footer/></>;
}
function PrivacyPolicy() {
  return <><Header/><main className="privacy-page"><div className="privacy-inner"><nav className="privacy-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Privacy policy</span></nav><h1>Our Privacy Policy<span>.</span></h1><p className="privacy-notice"><strong>Draft for review.</strong> This policy contains items that require confirmation before publication.</p><div className="privacy-content"><p className="privacy-updated">Last updated: 11 November 2026</p>{privacyPolicyContent.map((block,index)=>{
    if (block.type === 'heading') return <h2 key={index}>{block.text}</h2>;
    if (block.type === 'subheading') return <h3 key={index}>{block.text}</h3>;
    if (block.type === 'list') return <ul key={index}>{block.items.map((item,i)=><li key={i}>{item}</li>)}</ul>;
    if (block.type === 'table') return <div className="privacy-table-wrap" key={index}><table><tbody>{block.rows.map((row,i)=><tr key={i}>{row.map((cell,j)=>i===0 && row.length===3 ? <th key={j} scope="col">{cell}</th> : <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;
    return <p key={index}>{block.text}</p>;
  })}</div></div></main><Footer/></>;
}
function TermsConditions() {
  return <><Header/><main className="privacy-page"><div className="privacy-inner"><nav className="privacy-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>Terms &amp; conditions</span></nav><h1>Terms &amp; Conditions<span>.</span></h1><p className="privacy-notice"><strong>Draft for review.</strong> These terms require review before publication.</p><div className="privacy-content"><p className="privacy-updated">Last updated: 11 November 2026</p>{termsContent.map((block,index)=>{
    if (block.type === 'heading') return <h2 key={index}>{block.text}</h2>;
    if (block.type === 'subheading') return <h3 key={index}>{block.text}</h3>;
    if (block.type === 'list') return <ul key={index}>{block.items.map((item,i)=><li key={i}>{item}</li>)}</ul>;
    if (block.type === 'table') return <div className="privacy-table-wrap" key={index}><table><tbody>{block.rows.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;
    return <p key={index}>{block.text}</p>;
  })}</div></div></main><Footer/></>;
}
export default function Site({path}) {
  useEffect(()=>{window.scrollTo(0,0)},[path.join('/')]);
  const blogArticle=path[0]==='blogs'&&path[1]?blogArticles.find(item=>item.slug===path[1]):null;
  const project=path[0]==='projects'&&path[1]?projects.find(item=>item.slug===path[1]):null;
  const industry=path[0]==='industries'&&path[1]?industryContent.find(item=>item.slug===path[1]):null;
  return <>{path.length===0?<Home/>:project?<ProjectDetail project={project}/>:path[0]==='projects'?<Projects/>:path[0]==='services'&&!path[1]?<ServicesOverview/>:industry?<IndustryDetail industry={industry}/>:path[0]==='industries'&&!path[1]?<IndustryOverview/>:path[0]==='about'&&!path[1]?<><Header aboutPage glassOnScroll showContact/><AboutPage ContactButtonContents={ContactButtonContents}/><Footer/></>:path[0]==='contact'?<Contact/>:blogArticle?<BlogArticle article={blogArticle}/>:path[0]==='blogs'?<Blogs/>:path[0]==='privacy-policy'?<PrivacyPolicy/>:path[0]==='terms-conditions'?<TermsConditions/>:<Generic path={path}/>}</>;
}
