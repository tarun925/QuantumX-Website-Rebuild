'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import Capabilities from './capabilities';
import {projects,projectCategories,projectMatchesCategory,services,industries,markets} from './portfolio';

const slugify = (value) => value.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const title = (value='') => value.split('-').map(word=>word[0]?.toUpperCase()+word.slice(1)).join(' ');
const email = 'info@quantumx.one';

function Button({href='/contact',children='Get in Touch',light=false}) {
  return <Link className={`pill ${light?'light':''}`} href={href}>{children}<span>↗</span></Link>;
}
function ProjectCTA() {
  return <div className="project-cta-wrap"><div className="project-cta"><span>Let’s build something</span><Link href="/contact">Get in touch <span aria-hidden="true">↗</span></Link></div></div>;
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
  return visible ? <div className="floating-project-cta"><div className="project-cta"><span>Let’s build something</span><Link href="/contact">Get in touch <span aria-hidden="true">↗</span></Link></div></div> : null;
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
        <div><div className={`leader-avatar ${brand.name === 'ASET College' ? 'leader-avatar-aset' : ''}`}><img src={brand.photo} alt={brand.person}/></div>
          <h3>{brand.person}</h3><p className="leader-role">{brand.role}</p><p className="leader-quote">“{brand.quote}”</p></div>
        <div className={`leader-brand-logo ${brand.className || ''}`}><img src={brand.logo} alt={brand.name}/>{brand.className === 'leader-brand-gofloaters' && <img className="leader-brand-artwork" src={brand.logo} alt="" aria-hidden="true"/>}</div>
      </article>)}
    </div>
    <div className="leaders-controls"><button type="button" onClick={()=>move(-1)} disabled={!edges.previous} aria-label="Previous testimonials">←</button><button type="button" onClick={()=>move(1)} disabled={!edges.next} aria-label="Next testimonials">→</button></div>
  </section>;
}
function Header({dark=false,workDark=false,newsLight=false}) {
  const [open,setOpen] = useState(false);
  const [navDark,setNavDark] = useState(dark);
  const [navGlass,setNavGlass] = useState(false);
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
      setNavGlass(Boolean(lastProject && capabilities && lastProject.getBoundingClientRect().top <= headerHeight + 72 && capabilities.getBoundingClientRect().bottom > line));
      const news = document.querySelector('.quantum-news');
      const isDark = (crossesLine(news) && !newsLight) || crossesLine(document.querySelector('main.dark-page')) ||
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
  }, [dark,workDark,newsLight]);
  return <>
    <header className={`header ${navDark?'header-dark':''} ${navGlass?'header-glass':''}`}>
      <Link href="/" className="brand quantum-brand" aria-label="QuantumX home"><img src={navDark || open ? "/assets/quantum-logo-white.svg" : "/assets/quantum-logo.svg"} alt="QuantumX"/></Link>
      <nav className="desktop-nav" aria-label="Main navigation"><Link href="/projects">Projects</Link><Link href="/industries">Industries</Link><Link href="/services">Services</Link></nav>
      <button className={`hamburger ${open?'active':''}`} aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}><i/><i/><i/></button>
    </header>
    {open&&<div className="menu"><div className="menu-links">{['About','Projects','Services','Industries','Contact'].map(item=><Link key={item} href={`/${slugify(item)}`} onClick={()=>setOpen(false)}>{item}<span>↗</span></Link>)}</div><div className="menu-side"><p>Have a project in mind?</p><a href={`mailto:${email}`}>{email} ↗</a><small>CHENNAI · INDIA · NORTH AMERICA · EUROPE · MIDDLE EAST · ASIA-PACIFIC</small></div></div>}
  </>;
}
function Footer() {
  const [newsletterEmail,setNewsletterEmail] = useState('');
  const subscribe = event => {
    event.preventDefault();
    const subject = encodeURIComponent('QuantumX newsletter signup');
    const body = encodeURIComponent(`Please add ${newsletterEmail} to the QuantumX newsletter.`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };
  return <>
    <section className="cta newsletter-section" aria-labelledby="newsletter-heading">
      <h2 id="newsletter-heading">Trusted by <em>100+ global companies.</em></h2>
      <form className="newsletter-form" onSubmit={subscribe}><label htmlFor="newsletter-email">Sign up for our newsletter</label><div className="newsletter-fields"><input id="newsletter-email" type="email" placeholder="Enter email address" value={newsletterEmail} onChange={event=>setNewsletterEmail(event.target.value)} required/><button type="submit">Subscribe <span aria-hidden="true">↗</span></button></div></form>
    </section>
    <footer className="quantum-footer"><div className="footer-contact-grid"><div className="footer-talk"><p className="eyebrow">LET’S CONNECT</p><h2>Talk to us<span>.</span></h2><p>Have an idea? We’d love to hear from you.</p></div><div className="footer-contact"><div><p className="eyebrow">BUSINESS &amp; COLLABORATIONS</p><a href="mailto:info@quantumx.one">info@quantumx.one ↗</a></div><div><p className="eyebrow">CAREERS</p><a href="mailto:careers@quantumx.one">careers@quantumx.one ↗</a></div></div><div className="footer-presence"><p className="eyebrow">OUR PRESENCE</p><h3>Chennai, India</h3><p>No. 40 North Road,<br/>West C.I.T Nagar, Nandanam,<br/>Chennai - 600035</p><p>Working with brands across India and around the world.</p></div></div>
      <div className="footer-bottom quantum-footer-bottom"><div className="footer-identity"><div className="footer-socials" aria-label="Social profiles to be added"><span className="footer-social" aria-label="Instagram profile coming soon" title="Instagram profile coming soon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg></span><span className="footer-social" aria-label="LinkedIn profile coming soon" title="LinkedIn profile coming soon"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.1 3A2.1 2.1 0 1 0 5.1 7.2 2.1 2.1 0 0 0 5.1 3ZM3.3 8.8h3.6V21H3.3V8.8Zm5.8 0h3.4v1.7h.1a3.8 3.8 0 0 1 3.4-1.9c3.7 0 4.4 2.4 4.4 5.5V21h-3.6v-6.1c0-1.5 0-3.3-2-3.3s-2.1 1.6-2.1 3.2V21H9.1V8.8Z"/></svg></span></div></div><div className="footer-legal"><div className="footer-legal-links"><span title="Policy to be added">Privacy policy</span><span title="Terms to be added">Terms &amp; conditions</span></div><p>© 2026 QuantumX. All rights reserved.</p></div></div>
    </footer>
  </>;
}
function ProjectVisual({project}) {
  return project.image?<img className="project-image" src={project.image} alt={`${project.name} portfolio visual`}/>:<div className={`project-typographic project-${project.slug}`}><span>{project.sector}</span><strong>{project.name}</strong><small>{project.impact||project.category}</small></div>;
}
function ProjectCard({project,compact=false,homepage=false,listing=false}) {
  return <Link href={`/projects/${project.slug}`} className={`project-card ${compact?'compact':''} project-card-${project.slug}`}>
    <div className="project-meta"><h3>{project.name}</h3><p>{project.description}</p><span className="project-link">View Project ↗</span></div>
    <ProjectVisual project={(homepage || (listing && ['snitch', 'gofloaters'].includes(project.slug))) && project.homepageImage ? {...project, image:project.homepageImage} : project}/>
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
function ClientLogos() {
  const [group,setGroup] = useState(0);
  const [paused,setPaused] = useState(false);
  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    const reset = () => {
      clearInterval(timer);
      if (!paused && !motion.matches) timer = setInterval(() => setGroup(current => (current + 1) % clientLogoGroups.length), 4300);
    };
    reset();
    motion.addEventListener('change',reset);
    return () => { clearInterval(timer); motion.removeEventListener('change',reset); };
  }, [paused]);
  return <section className="client-logo-section" aria-label="Selected client brands" data-paused={paused ? 'true' : 'false'} onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocusCapture={()=>setPaused(true)} onBlurCapture={event=>{if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);}}>
    <div className="logo-strip quantum-logo-strip" role="group" aria-label={`Brand group ${group + 1} of ${clientLogoGroups.length}`}>
      {clientLogoGroups[group].map((logo,index) => <span key={`${group}-${logo.name}`} className={`client-logo ${logo.className || ''}`} style={{'--logo-index':index}}>
        {logo.placeholder ? <span className="client-logo-placeholder" aria-label={`${logo.name} logo placeholder`}>{logo.name}</span> : <><img src={logo.src} alt={logo.name}/>{logo.className === 'client-logo-aset' && <img className="aset-dark-word" src={logo.src} alt="" aria-hidden="true"/>}{logo.className === 'client-logo-bdm' && <img className="bdm-colored-icon" src={logo.src} alt="" aria-hidden="true"/>}</>}
      </span>)}
    </div>
    <div className="client-logo-controls" aria-label="Choose a brand group">{clientLogoGroups.map((_,index)=><button type="button" key={index} className={group === index ? 'active' : ''} onClick={()=>setGroup(index)} aria-label={`Show brand group ${index + 1}`} aria-pressed={group === index}/>)}</div>
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
    <section className="hero"><div className="hero-copy"><p className="muted">Strategy · Creative · Performance · Technology · Data · AI</p><h1>Growth, managed as<br/><strong>one connected system<span>.</span></strong></h1><p className="hero-description">QuantumX connects brand building, demand generation, digital experience and measurable performance to help businesses grow.</p><div className="hero-actions"><Button/><Link className="text-link" href="/projects">See our Work</Link></div></div><img className="donut" src="/assets/donut.avif" alt=""/></section>
    <ClientLogos/>
    <section className={`work-section ${workDark ? 'work-dark' : ''}`}><div className="section-intro"><h2><span>Selected work</span><br/>built for growth</h2><p>From identity and campaigns to websites, funnels and connected digital experiences.</p></div><div className="featured-projects">{projects.filter(project=>project.featured).map(project=><ProjectCard key={project.slug} project={project} homepage/>)}</div><div className="work-end"><h3>Explore more of the brands and experiences we have worked on.</h3><Button href="/projects">View all Projects</Button></div></section>
    <Testimonials/>
    <Capabilities/>
    <section className="quantum-news" data-theme={newsLight ? 'light' : 'dark'} aria-labelledby="quantum-news-title"><h2 id="quantum-news-title">Latest at <span>QuantumX</span></h2><div className="quantum-news-columns"><div className="quantum-news-list">
      <Link href="/projects/aset-college" className="quantum-news-row"><img src="/assets/portfolio/aset/homepage-thumbnail.png" alt=""/><div><p>ASET COLLEGE CASE STUDY</p><h3>Explore the connected digital journey behind ASET College’s growth. <span>↗</span></h3></div></Link>
      <Link href="/projects/zellify" className="quantum-news-row"><img src="/assets/portfolio/zellify-desktop.png" alt=""/><div><p>ZELLIFY CASE STUDY</p><h3>A conversion-focused digital experience built for a growing product. <span>↗</span></h3></div></Link>
      <div className="quantum-news-row"><div className="news-placeholder" aria-hidden="true">✦</div><div><p>TRENDS &amp; INSIGHTS <span>• COMING SOON</span></p><h3>Ideas and perspectives on building brands and digital experiences.</h3></div></div>
      <div className="quantum-news-row"><div className="news-placeholder news-placeholder-light" aria-hidden="true">Q<span>✦</span></div><div><p>QUANTUMX BLOG <span>• COMING SOON</span></p><h3>News, stories and updates from the QuantumX team.</h3></div></div>
    </div><aside className="quantum-recognition" aria-label="Reviews and recognition"><h3>Reviews &amp; recognition</h3><div className="recognition-grid"><div><span aria-hidden="true">✦</span><p>Client reviews</p><small>Coming soon</small></div><div><span aria-hidden="true">☆</span><p>Ratings</p><small>Coming soon</small></div><div><span aria-hidden="true">↗</span><p>Awards &amp; recognition</p><small>Coming soon</small></div><div><span aria-hidden="true">Q</span><p>QuantumX updates</p><small>Coming soon</small></div></div></aside></div></section>
    <section className="latest"><div className="section-intro"><h2>More from<br/><em>our portfolio</em></h2><Link className="text-link" href="/projects">View all projects ↗</Link></div><div className="latest-grid">{projects.slice(4,7).map(project=><Link href={`/projects/${project.slug}`} key={project.slug}><div className="latest-image-wrap"><ProjectVisual project={project}/></div><p>{project.category}</p><h3>{project.name} ↗</h3></Link>)}</div></section>
    <section className="faq"><h2>Questions we get asked.<br/><em>A lot.</em></h2><div>{questions.map(([question,answer],index)=><div className="faq-item" key={question}><button onClick={()=>setFaq(faq===index?-1:index)} aria-expanded={faq===index}>{question}<span>{faq===index?'−':'+'}</span></button>{faq===index&&<p>{answer}</p>}</div>)}</div></section>
  </main><Footer/><FloatingProjectCTA/></>;
}
function Projects() {
  const [filter,setFilter]=useState('All / Enterprise');
  const visible=projects.filter(project=>projectMatchesCategory(project,filter));
  return <><Header dark/><main className="dark-page projects-page"><div className="page-hero projects-hero"><h1>CRAFTED<br/><em>for</em> GROWTH</h1><p>Identity, campaigns, digital experiences and connected marketing systems for brands across industries.</p><div className="filters" aria-label="Filter projects">{projectCategories.map(category=><button key={category} className={filter===category?'selected':''} onClick={()=>setFilter(category)} aria-pressed={filter===category}>{category}</button>)}</div></div><div className="project-grid">{visible.map(project=><ProjectCard compact listing key={project.slug} project={project}/>)}</div><ProjectCTA/></main><Footer/></>;
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
  return <><Header dark/><main ref={main} className="dark-page case-project">
    <section className="case-hero"><p className="case-back"><Link href="/projects">← All projects</Link></p><h1>{project.name}<span>.</span></h1><div className="case-focus"><span>Project focus</span><p>{project.category} <span>+</span> {project.sector}</p></div></section>
    <div className={`case-hero-media${project.slug === 'aset-college' ? ' case-hero-media-aset' : ''}`}><ProjectVisual project={project.caseHeroImage ? {...project, image:project.caseHeroImage} : project}/></div>
    <section className="case-collaboration case-section" data-case-reveal><div className="case-collab-copy"><h2><span>The</span> collaboration</h2><p>{details.collaboration || project.description}</p>{details.collaboration && <p>{project.description}</p>}</div><dl className="case-facts"><div><dt>Industry</dt><dd>{project.sector}</dd></div><div><dt>Platform</dt><dd>{details.platform || 'To be added'}</dd></div><div><dt>Services</dt><dd>{details.services || project.category}</dd></div><div><dt>Website / app</dt><dd>{details.url?<a href={details.url} target="_blank" rel="noreferrer">Visit website ↗</a>:<span className="case-pending">Link to be added</span>}</dd></div></dl></section>
    <section className="case-problem case-section" data-case-reveal><p className="case-eyebrow">THE CHALLENGE</p><div className="case-split"><h2>Problem <span>definition.</span></h2><p>{details.challenge || project.challenge || 'Project challenge and goals will be added here.'}</p></div></section>
    <section className="case-process case-section" data-case-reveal><div><p className="case-eyebrow">HOW WE WORK</p><h2>The process<br/><span>we follow.</span></h2><p className="case-muted">A flexible framework. Project-specific process details and examples can be added here.</p></div><ol>{caseProcess.map((step,index)=><li key={step}><span>{String(index+1).padStart(2,'0')}</span>{step}</li>)}</ol></section>
    <section className="case-work case-section"><div className="case-work-intro" data-case-reveal><p className="case-eyebrow">THE WORK</p><h2>Opportunities<br/><span>and execution.</span></h2><p>Explore the work behind the project, from the first ideas to the finished experience.</p></div><div className="case-work-list">{work.map((item,index)=><article className="case-work-item" key={item.title} data-case-reveal><div className="case-work-copy"><span className="case-number">{String(index+1).padStart(2,'0')}</span><h3>{item.title}</h3><p>{item.description}</p></div>{item.image ? <CaseImage src={item.image} alt={item.imageAlt} caption={item.imageCaption}/> : <CaseMediaPlaceholder label={item.media}/>}</article>)}</div></section>
    <section className="case-experience case-section" data-case-reveal><p className="case-eyebrow">THE EXPERIENCE</p><div className="case-split"><h2>What we <span>created.</span></h2><div>{details.experience && <h3 className="case-experience-title">Connected thinking. Focused execution.</h3>}<p>{details.experience || project.solution || project.description}</p></div></div><div className="case-gallery">{details.experienceImages ? details.experienceImages.map(image=><CaseImage key={image.src} {...image}/>) : <>{project.gallery?.filter(image=>image!==project.image).slice(0,2).map((image,index)=><div className="case-gallery-image" key={image}><img src={image} alt={`${project.name} project visual ${index+1}`} loading="lazy"/></div>)}<CaseMediaPlaceholder label="Screenshots and visual designs to be added"/><CaseMediaPlaceholder label="Prototypes and project details to be added"/></>}</div></section>
    <section className="case-impact case-section" data-case-reveal><p className="case-eyebrow">THE IMPACT</p><div className="case-split"><h2>Results <span>that matter.</span></h2><div>{project.impact?<><strong>{project.impact}</strong><p>{project.impactNote || 'Project outcomes.'}</p></>:<p>Project results and supporting evidence will be added here.</p>}</div></div>{details.impactImage && <div className="case-impact-visual"><CaseImage {...details.impactImage}/></div>}{details.closingImage ? <div className="case-impact-visual"><CaseImage {...details.closingImage}/></div> : <CaseMediaPlaceholder label="Results and supporting proof to be added" wide/>}</section>
    <div className="case-related related" data-case-reveal><div className="case-related-heading"><h2>Related <span>projects.</span></h2><Link href="/projects">View all projects ↗</Link></div><div className="project-grid">{related.map(item=><ProjectCard compact key={item.slug} project={item}/>)}</div></div>
  </main><Footer/></>;
}
function Contact() {
  const [sent,setSent]=useState(false);
  return <><Header/><main className="contact-page"><div><p className="eyebrow">LET'S TALK</p><h1>Let’s build<br/><em>what’s next</em><span>.</span></h1><p>Tell us what you are working towards. We would welcome an introductory conversation about your growth objectives.</p><a href={`mailto:${email}`}>{email} ↗</a><p>+91 9789960251</p></div><form onSubmit={event=>{event.preventDefault();setSent(true)}}>{sent?<div className="form-success"><h2>Thank you.</h2><p>This local demo does not send submissions. Please email {email} directly.</p></div>:<><label>Your name<input required placeholder="Name"/></label><label>Email address<input required type="email" placeholder="Email"/></label><label>Company<input placeholder="Company"/></label><label>Tell us about your project<textarea required placeholder="Your message"/></label><button className="pill">Prepare inquiry <span>↗</span></button></>}</form></main><Footer/></>;
}
function Generic({path}) {
  const [family,detail]=path;
  const name=title(detail||family);
  const list=family==='services'?services:family==='industries'?industries:[];
  const headline=family==='services'?'Seven connected capabilities':family==='industries'?'Growth across industries':family==='about'?'Growth is a system':name;
  return <><Header dark/><main className="dark-page generic"><section className="generic-hero"><p className="eyebrow">QUANTUMX / {family.toUpperCase()}</p><h1>{detail?name:headline}<span>.</span></h1><div className="generic-sub"><p>{family==='about'?'A growth and marketing company built to connect strategy, creativity, media, technology, data and AI.':'The right mix of strategy, creative, channels and technology changes with every audience and objective.'}</p><Button/></div></section><section className="generic-content"><div><p className="eyebrow">HOW WE WORK</p><h2>One connected system.</h2></div><p>We start with the customer and the growth problem, then connect the capabilities needed to build demand, turn attention into action and improve results over time.</p></section>{list.length>0&&<div className="generic-list">{list.map((item,index)=><Link key={item} href={`/${family}/${slugify(item)}`}><span>0{index+1}</span><h2>{item}</h2><span>↗</span></Link>)}</div>}{family==='about'&&<div className="generic-list">{markets.map((market,index)=><div className="presence-row" key={market}><span>0{index+1}</span><h2>{market}</h2></div>)}</div>}<div className="related"><h2>Selected work<span>.</span></h2><div className="project-grid">{projects.slice(0,2).map(project=><ProjectCard compact key={project.slug} project={project}/>)}</div></div></main><Footer/></>;
}
export default function Site({path}) {
  useEffect(()=>{window.scrollTo(0,0)},[path.join('/')]);
  const project=path[0]==='projects'&&path[1]?projects.find(item=>item.slug===path[1]):null;
  return <>{path.length===0?<Home/>:project?<ProjectDetail project={project}/>:path[0]==='projects'?<Projects/>:path[0]==='contact'?<Contact/>:<Generic path={path}/>}</>;
}
