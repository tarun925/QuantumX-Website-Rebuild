'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {projects,projectCategories,services,industries,markets} from './portfolio';

const slugify = (value) => value.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const title = (value='') => value.split('-').map(word=>word[0]?.toUpperCase()+word.slice(1)).join(' ');
const email = 'info@quantumx.one';

function Button({href='/contact',children='Get in Touch',light=false}) {
  return <Link className={`pill ${light?'light':''}`} href={href}>{children}<span>↗</span></Link>;
}
function Header({dark=false}) {
  const [open,setOpen] = useState(false);
  return <>
    <header className={`header ${dark?'header-dark':''}`}>
      <Link href="/" className="brand quantum-brand" aria-label="QuantumX home"><img src="/assets/quantum-logo.svg" alt="QuantumX"/></Link>
      <nav className="desktop-nav" aria-label="Main navigation"><Link href="/projects">Projects</Link><Link href="/industries">Industries</Link><Link href="/services">Services</Link></nav>
      <button className={`hamburger ${open?'active':''}`} aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}><i/><i/><i/></button>
    </header>
    {open&&<div className="menu"><div className="menu-links">{['About','Projects','Services','Industries','Contact'].map(item=><Link key={item} href={`/${slugify(item)}`} onClick={()=>setOpen(false)}>{item}<span>↗</span></Link>)}</div><div className="menu-side"><p>Have a project in mind?</p><a href={`mailto:${email}`}>{email} ↗</a><small>CHENNAI · INDIA · NORTH AMERICA · EUROPE · MIDDLE EAST · ASIA-PACIFIC</small></div></div>}
  </>;
}
function Footer() {
  return <>
    <section className="cta"><p>Ready when you are</p><h2>Let’s build<br/><em>what’s next.</em></h2><Button light/></section>
    <footer><div className="footer-top"><div><p className="eyebrow">QUANTUMX</p><h3>Growth, managed as<br/>one connected system.</h3><p>Strategy · Creative · Performance · Technology · Data · AI</p></div><div><p className="eyebrow">Write to us</p><a href={`mailto:${email}`}>{email} ↗</a><p>+91 9789960251</p></div><div><p className="eyebrow">Where we work</p><p>Chennai HQ<br/>Across India<br/>North America<br/>Europe<br/>Middle East<br/>Asia-Pacific</p></div></div><div className="footer-bottom"><Link href="/" className="footer-logo" aria-label="QuantumX home"><img src="/assets/quantum-logo.svg" alt="QuantumX"/></Link><div><span>CHENNAI, INDIA</span><span>© 2026 QUANTUMX</span></div></div></footer>
  </>;
}
function ProjectVisual({project}) {
  return project.image?<img className="project-image" src={project.image} alt={`${project.name} portfolio visual`}/>:<div className={`project-typographic project-${project.slug}`}><span>{project.sector}</span><strong>{project.name}</strong><small>{project.impact||project.category}</small></div>;
}
function ProjectCard({project,compact=false}) {
  return <Link href={`/projects/${project.slug}`} className={`project-card ${compact?'compact':''}`}>
    <div className="project-meta"><h3>{project.name}</h3><p>{project.description}</p><span className="project-link">View Project ↗</span></div>
    <ProjectVisual project={project}/>
    <div className="compact-caption"><h3>{project.name}</h3><p>{project.category} ↗</p></div>
  </Link>;
}
const clientLogos = [
  {name:'ASET College', src:'/assets/client-logos/aset.png', className:'client-logo-aset'},
  {name:'Snitch', src:'/assets/client-logos/snitch.png'},
  {name:'GoFloaters', src:'/assets/client-logos/gofloaters.png'},
  {name:'Milky Mist', src:'/assets/client-logos/milky-mist.jpg', className:'client-logo-milky'},
  {name:'Chettinad Cement', src:'/assets/client-logos/chettinad.png'},
];
function ClientLogos() {
  return <div className="logo-strip quantum-logo-strip" aria-label="Selected brands">
    {clientLogos.map(logo => <span key={logo.name} className={`client-logo ${logo.className || ''}`}>
      <img src={logo.src} alt={logo.name}/>{logo.className === 'client-logo-aset' && <img className="aset-dark-word" src={logo.src} alt="" aria-hidden="true"/>}
    </span>)}
  </div>;
}
function Home() {
  const [faq,setFaq]=useState(-1);
  const questions=[['What does QuantumX do?','We connect strategy, creative, performance marketing, digital experience, CRM, data and AI into one growth system.'],['Which industries do you work with?','Our portfolio spans consumer brands, technology, education, hospitality, B2B, industrial businesses and real estate.'],['Where does QuantumX work?','We are based in Chennai and serve clients across India, North America, Europe, the Middle East and Asia-Pacific.']];
  return <><Header/><main>
    <section className="hero"><div className="hero-copy"><p className="muted">Strategy · Creative · Performance · Technology · Data · AI</p><h1>Growth, managed as<br/><strong>one connected system<span>.</span></strong></h1><p className="hero-description">QuantumX connects brand building, demand generation, digital experience and measurable performance to help businesses grow.</p><div className="hero-actions"><Button/><Link className="text-link" href="/projects">See our Work</Link></div></div><img className="donut" src="/assets/donut.avif" alt=""/></section>
    <ClientLogos/>
    <section className="work-section"><div className="section-intro"><h2><span>Selected work</span><br/>built for growth</h2><p>From identity and campaigns to websites, funnels and connected digital experiences.</p></div><div className="featured-projects">{projects.filter(project=>project.featured).map(project=><ProjectCard key={project.slug} project={project}/>)}</div><div className="work-end"><h3>Explore more of the brands and experiences we have worked on.</h3><Button href="/projects">View all Projects</Button></div></section>
    <section className="testimonial quantum-results"><p className="eyebrow">OUR RESULTS</p><blockquote>One team. Connected capabilities. <em>Measurable growth.</em></blockquote><div className="result-grid"><div><strong>70+</strong><span>Brands served</span></div><div><strong>118+</strong><span>Projects delivered</span></div><div><strong>7+</strong><span>Markets reached</span></div></div></section>
    <section className="services-home"><div className="section-intro"><h2>From first idea<br/><em>to measurable impact.</em></h2><p>Seven capabilities working together across the full growth journey.</p></div><div className="service-list">{services.map((service,index)=><Link key={service} href={`/services/${slugify(service)}`}><span>0{index+1}</span><h3>{service}</h3><span>↗</span></Link>)}</div></section>
    <section className="latest"><div className="section-intro"><h2>More from<br/><em>our portfolio</em></h2><Link className="text-link" href="/projects">View all projects ↗</Link></div><div className="latest-grid">{projects.slice(4,7).map(project=><Link href={`/projects/${project.slug}`} key={project.slug}><ProjectVisual project={project}/><p>{project.category}</p><h3>{project.name} ↗</h3></Link>)}</div></section>
    <section className="faq"><h2>Questions we get asked.<br/><em>A lot.</em></h2><div>{questions.map(([question,answer],index)=><div className="faq-item" key={question}><button onClick={()=>setFaq(faq===index?-1:index)} aria-expanded={faq===index}>{question}<span>{faq===index?'−':'+'}</span></button>{faq===index&&<p>{answer}</p>}</div>)}</div></section>
  </main><Footer/></>;
}
function Projects() {
  const [filter,setFilter]=useState('All');
  const visible=filter==='All'?projects:projects.filter(project=>project.category===filter);
  return <><Header dark/><main className="dark-page"><div className="page-hero projects-hero"><h1>CRAFTED<br/><em>for</em> GROWTH</h1><p>Identity, campaigns, digital experiences and connected marketing systems for brands across industries.</p><div className="filters" aria-label="Filter projects">{projectCategories.map(category=><button key={category} className={filter===category?'selected':''} onClick={()=>setFilter(category)} aria-pressed={filter===category}>{category}</button>)}</div></div><div className="project-grid">{visible.map(project=><ProjectCard compact key={project.slug} project={project}/>)}</div></main><Footer/></>;
}
function ProjectDetail({project}) {
  const related=projects.filter(item=>item.slug!==project.slug).slice(0,2);
  return <><Header dark/><main className="dark-page generic"><section className="generic-hero"><p className="eyebrow"><Link href="/projects">PROJECTS</Link> / {project.category.toUpperCase()}</p><h1>{project.name}<span>.</span></h1><div className="generic-sub"><p>{project.description}</p><span className="detail-sector">{project.sector}</span></div></section><div className="detail-visual"><ProjectVisual project={project}/></div><section className="generic-content"><div><p className="eyebrow">THE WORK</p><h2>{project.challenge?'The challenge':'The project'}</h2></div><p>{project.challenge||project.description}</p></section>{project.solution&&<section className="generic-content"><div><p className="eyebrow">QUANTUMX SOLUTION</p><h2>Connected thinking.<br/><em>Focused execution.</em></h2></div><p>{project.solution}</p></section>}{project.impact&&<section className="impact-section"><p className="eyebrow">BUSINESS IMPACT</p><strong>{project.impact}</strong><p>{project.impactNote}</p></section>}{project.gallery?.length>0&&<div className="detail-gallery">{project.gallery.map((image,index)=><img key={image} src={image} alt={`${project.name} visual ${index+1}`}/>)}</div>}<div className="related"><h2>More selected work<span>.</span></h2><div className="project-grid">{related.map(item=><ProjectCard compact key={item.slug} project={item}/>)}</div></div></main><Footer/></>;
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
