'use client';
import {useEffect,useRef} from 'react';
import Link from 'next/link';

const capabilities = [
  {title:'Performance Marketing', href:'/services/performance-marketing', description:'Turn attention into measurable growth with campaigns, funnels and continuous optimisation.', visual:'performance'},
  {title:'Branding', href:'/services/creative', description:'Create a distinctive brand identity and voice, tailored to resonate with your specific audience.', visual:'branding'},
  {title:'Development', href:'/services/digital-experience', description:'Develop scalable SaaS platforms, web applications and mobile apps tailored to your business.', visual:'website'},
  {title:'Agentic AI', href:'/services', description:'Build your own AI agent systems to automate repetitive tasks, streamline workflows and deliver scalable, seamless experiences.', visual:'product'},
  {title:'Research & Strategy', href:'/services/strategy', description:'Research your business and audience to build a tailored strategy that connects teams, channels and systems for practical growth.', visual:'strategy'},
];

function Visual({type}) {
  return <div className={`capability-art art-${type}`} aria-hidden="true">
    {type === 'performance' && <div className="art-chart"><i/><i/><i/><i/><i/><span>↗</span></div>}
    {type === 'branding' && <div className="art-brand"><i/><i/><i/><i/><span>✦</span></div>}
    {type === 'website' && <div className="art-browser"><div><i/><i/><i/></div><span/><b/><b/><em>↗</em></div>}
    {type === 'product' && <div className="art-product"><i/><i/><i/><span>✦</span></div>}
    {type === 'strategy' && <div className="art-strategy"><i/><i/><i/><i/><span>✦</span></div>}
  </div>;
}

export default function Capabilities() {
  const section = useRef(null);
  const viewport = useRef(null);
  const track = useRef(null);
  useEffect(() => {
    const container = section.current, windowEl = viewport.current, trackEl = track.current;
    const media = window.matchMedia('(prefers-reduced-motion: no-preference)');
    let frame = null, distance = 0;
    const update = () => {
      frame = null;
      if (!media.matches || !distance) return;
      const rect = container.getBoundingClientRect();
      const range = container.offsetHeight - container.querySelector('.capabilities-sticky').offsetHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, range)));
      trackEl.style.transform = `translate3d(${-distance * progress}px,0,0)`;
    };
    const schedule = () => { if (frame === null) frame = requestAnimationFrame(update); };
    const measure = () => {
      if (media.matches) {
        const wasReady = container.hasAttribute('data-scroll-ready');
        if (!wasReady) windowEl.scrollLeft = 0;
        container.setAttribute('data-scroll-ready','true');
        const nextDistance = Math.max(0, trackEl.scrollWidth - windowEl.clientWidth);
        if (distance !== nextDistance || !wasReady) {
          distance = nextDistance;
          container.style.setProperty('--scroll-distance', `${distance}px`);
        }
        if (!distance) container.removeAttribute('data-scroll-ready');
      } else {
        distance = 0;
        container.removeAttribute('data-scroll-ready');
        trackEl.style.transform = '';
      }
      schedule();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(windowEl);
    window.addEventListener('resize',measure);
    window.addEventListener('scroll',schedule,{passive:true});
    media.addEventListener('change',measure);
    measure();
    return () => {observer.disconnect(); window.removeEventListener('resize',measure); window.removeEventListener('scroll',schedule); media.removeEventListener('change',measure); if (frame !== null) cancelAnimationFrame(frame);};
  }, []);
  const move = direction => {
    const card = track.current?.querySelector('.capability-card');
    if (card) viewport.current.scrollBy({left:direction * (card.offsetWidth + 24),behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  };
  return <section className="capabilities-section" ref={section} aria-labelledby="capabilities-title">
    <div className="capabilities-sticky">
      <div className="capabilities-heading"><h2 id="capabilities-title"><span>Human-led.</span><br/>AI-accelerated.</h2><p>From strategy to digital experiences, we bring together the capabilities that help ambitious brands grow.</p></div>
      <div className="capabilities-viewport" ref={viewport} tabIndex={0} role="region" aria-label="Our capabilities">
        <div className="capabilities-track" ref={track}>{capabilities.map((item,index)=><Link className="capability-card" href={item.href} key={item.title}>
          <div className="capability-card-top"><h3>{item.title}</h3><span aria-hidden="true">↗</span></div><p>{item.description}</p><Visual type={item.visual}/><span className="capability-number">0{index+1} / 05</span>
        </Link>)}</div>
      </div>
      <div className="capabilities-controls"><button type="button" onClick={()=>move(-1)} aria-label="Previous capability">←</button><button type="button" onClick={()=>move(1)} aria-label="Next capability">→</button></div>
    </div>
  </section>;
}
