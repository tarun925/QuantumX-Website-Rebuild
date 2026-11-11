'use client';

import {useEffect, useRef} from 'react';
import Link from 'next/link';

const partnerLogos = [
  {name:'ASET College',src:'/assets/client-logos/aset.png'},
  {name:'Snitch',src:'/assets/client-logos/snitch.png'},
  {name:'GoFloaters',src:'/assets/client-logos/gofloaters.png'},
  {name:'Milky Mist',src:'/assets/client-logos/milky-mist.jpg'},
  {name:'Chettinad Cement',src:'/assets/client-logos/chettinad.png'},
  {name:'SRM Institute',src:'/assets/client-logos/partners/srm-institute.webp'},
  {name:'Hyatt Regency',src:'/assets/client-logos/partners/hyatt-regency.webp'},
  {name:'Ashok Leyland',src:'/assets/client-logos/partners/ashok-leyland.webp'},
];
const principles = [
  {number:'01',title:'Think clearly',detail:'Strategy with purpose',tone:'cream'},
  {number:'02',title:'Make it matter',detail:'Creative that connects',tone:'orange'},
  {number:'03',title:'Build for people',detail:'Technology with care',tone:'lilac'},
  {number:'04',title:'Grow together',detail:'Progress as a team',tone:'lime'},
];
const team = [{name:'Tarun Kumar',role:'Founder & CEO'},...Array.from({length:9},()=>({name:'Team member',role:'Name & role to be added'}))];

export default function AboutPage({ContactButtonContents}) {
  const root=useRef(null);
  useEffect(()=>{
    const container=root.current;
    if(!container)return;
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    const opening=container.querySelector('.about-hero');
    const story=container.querySelector('.about-story');
    const split=container.querySelector('.about-split-wrap');
    let frame=null;
    const clamp=value=>Math.max(0,Math.min(1,value));
    const update=()=>{
      frame=null;
      if(motion.matches){
        opening?.style.setProperty('--about-hero-fade','0');
        story?.style.setProperty('--about-drift','0px');
        split?.style.removeProperty('--about-split-x');
        split?.style.removeProperty('--about-split-y');
        split?.style.removeProperty('--about-split-rotation');
        return;
      }
      if(opening){
        const rect=opening.getBoundingClientRect();
        const progress=clamp((window.innerHeight-rect.bottom)/Math.min(window.innerHeight*.5,450));
        opening.style.setProperty('--about-hero-fade',String(progress));
      }
      if(story){
        const rect=story.getBoundingClientRect();
        const progress=clamp((window.innerHeight*.85-rect.top)/(window.innerHeight*.8));
        story.style.setProperty('--about-drift',`${(1-progress)*Math.min(window.innerWidth*.1,120)}px`);
      }
      if(split){
        const rect=split.getBoundingClientRect();
        const travel=Math.max(1,rect.height-window.innerHeight);
        const progress=clamp(-rect.top/travel);
        const eased=progress*progress*(3-2*progress);
        split.style.setProperty('--about-split-x',`${eased*Math.min(window.innerWidth*.21,250)}px`);
        split.style.setProperty('--about-split-y',`${eased*Math.min(window.innerHeight*.20,165)}px`);
        split.style.setProperty('--about-split-rotation',`${eased*7}deg`);
      }
    };
    const schedule=()=>{if(frame===null)frame=requestAnimationFrame(update)};
    const revealItems=container.querySelectorAll('.about-person');
    let revealObserver;
    if(!motion.matches && 'IntersectionObserver' in window){
      revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('about-person-visible');revealObserver.unobserve(entry.target)}}),{threshold:.08});
      container.classList.add('about-motion-ready');
      revealItems.forEach(item=>revealObserver.observe(item));
    }
    update();
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    motion.addEventListener('change',schedule);
    return ()=>{window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);motion.removeEventListener('change',schedule);revealObserver?.disconnect();container.classList.remove('about-motion-ready');if(frame!==null)cancelAnimationFrame(frame)};
  },[]);
  return <main className="about-page" ref={root}>
    <section className="about-hero">
      <div className="about-hero-inner">
        <div className="about-hero-top"><p>ABOUT QUANTUMX</p><p>CHENNAI, INDIA <span aria-hidden="true">↗</span></p></div>
        <div className="about-hero-layout"><div className="about-hero-copy"><p className="about-overline">STRATEGY · CREATIVITY · TECHNOLOGY</p><h1>Good ideas.<br/><span>Better</span> together<span className="about-dot">.</span></h1><p className="about-hero-description">We’re a team of thinkers, makers and problem solvers connecting the dots between brands, technology and growth.</p><Link className="pill contact-motion" href="/contact"><ContactButtonContents/></Link></div>
          <div className="about-hero-art" aria-hidden="true"><div className="about-art-ring"><div className="about-art-center"><img src="/assets/quantum-logo-white.svg" alt=""/><small>IDEAS IN MOTION</small></div></div><div className="about-sticker about-sticker-years"><strong>05</strong><span>YEARS<br/>IN MOTION</span></div><div className="about-sticker about-sticker-build"><span>MADE OF</span><strong>good<br/>ideas ✦</strong></div><div className="about-art-spark">✦</div><div className="about-art-caption">HUMAN-LED <span>↗</span><br/>BUILT TO CONNECT</div></div>
        </div><div className="about-scroll-cue"><span>SCROLL TO EXPLORE</span><span aria-hidden="true">↓</span></div>
      </div>
    </section>
    <div className="about-dark">
      <section className="about-story"><div className="about-container"><p className="about-label">A LITTLE ABOUT US <span>✦</span></p><div className="about-story-heading"><div className="about-story-line about-story-left">A better way</div><div className="about-story-line about-story-right"><span>to build.</span></div></div><div className="about-story-bottom"><p>We believe growth happens when the right ideas, people and capabilities come together. QuantumX brings strategy, creativity, performance and technology into one connected system.</p><Link href="/projects" className="about-outline-link">Explore our work <span aria-hidden="true">↗</span></Link></div></div></section>
      <section className="about-numbers"><div className="about-container"><div className="about-section-heading"><div><p className="about-label">OUR JOURNEY SO FAR <span>✦</span></p><h2>Small team.<br/><span>Big picture.</span></h2></div><p>Five years of bringing ideas to life, building partnerships and making meaningful work together.</p></div><div className="about-stat-grid"><div><strong>05<span>✦</span></strong><p>Years of QuantumX</p></div><div><strong>10<span>+</span></strong><p>People on our team</p></div><div><strong>118<span>+</span></strong><p>Projects delivered</p></div><div><strong>07<span>✦</span></strong><p>Industries explored</p></div></div></div><div className="about-partners"><div className="about-container"><p className="about-label">SOME OF THE BRANDS WE’VE WORKED WITH</p></div><div className="about-partner-window"><div className="about-partner-track">{[0,1].map(copy=><div className="about-partner-group" key={copy} aria-hidden={copy===1?'true':undefined}>{partnerLogos.map(logo=><div className="about-logo-sticker" key={logo.name}><img src={logo.src} alt={copy===0?logo.name:''}/></div>)}</div>)}</div></div></div></section>
      <section className="about-split-wrap" aria-labelledby="about-split-title"><div className="about-split-sticky"><div className="about-split-head"><p className="about-label">WHAT DRIVES US <span>✦</span></p><h2 id="about-split-title"><span>Different ideas.</span><br/><em>One direction.</em></h2><p>Good work comes from connecting different ways of thinking.</p></div><div className="about-split-cards">{principles.map((card,index)=><article className={`about-split-card about-card-${index} about-card-${card.tone}`} key={card.title}><span>{card.number} / 04</span><div className="about-card-mark" aria-hidden="true">✦</div><div><h3>{card.title}</h3><p>{card.detail}</p></div></article>)}</div></div></section>
      <section className="about-recognition"><div className="about-container about-recognition-inner"><div><p className="about-label">RECOGNITION <span>✦</span></p><h2>Good work<br/><span>speaks for itself.</span></h2></div><div className="about-recognition-note"><span aria-hidden="true">✦</span><p>Our recognition and milestones will be shared here.</p><Link href="/projects">Explore the work ↗</Link></div></div></section>
    </div>
    <section className="about-team"><div className="about-container"><div className="about-team-intro"><div><p className="about-label">MEET THE PEOPLE <span>✦</span></p><h2>Made by<br/><span>people.</span></h2></div><p>Behind every idea is a group of people bringing different perspectives together. Meet the team making things happen at QuantumX.</p></div><div className="about-team-grid">{team.map((person,index)=><article className="about-person" style={{'--about-person-delay':`${(index%5)*60}ms`}} key={index}><div className={`about-person-image about-person-tone-${index%4}`}><div className="about-person-shape" aria-hidden="true"><span/><i/></div><small>PHOTO TO BE ADDED</small><span className="about-person-mark" aria-hidden="true">✦</span></div><div className="about-person-caption"><h3>{person.name}</h3><p>{person.role}</p></div></article>)}</div><div className="about-team-footer"><p>10+ people. Different perspectives.<br/><strong>One connected team.</strong></p><a href="mailto:careers@quantumx.one" className="about-outline-link">Work with us <span aria-hidden="true">↗</span></a></div></div></section>
    <section className="about-culture"><div className="about-container"><div className="about-section-heading"><div><p className="about-label">LIFE AT QUANTUMX <span>✦</span></p><h2>Curious minds.<br/><span>Shared momentum.</span></h2></div><p>We make space for different ideas, open conversations and the kind of collaboration that moves good work forward.</p></div><div className="about-culture-grid"><article><span>01 / THE PEOPLE</span><h3>Better together.</h3><p>Different perspectives make the work stronger.</p></article><article><span>02 / THE PROCESS</span><h3>Always curious.</h3><p>Ask questions. Explore possibilities. Keep learning.</p></article><article><span>03 / THE WORK</span><h3>Made with care.</h3><p>Thoughtful details add up to meaningful experiences.</p></article></div></div></section>
    <section className="about-soundtrack"><div className="about-container about-soundtrack-inner"><div><p className="about-label">THE QUANTUMX SOUNDTRACK <span>✦</span></p><h2>Good work.<br/><span>Good energy.</span></h2><p>Every team has a soundtrack. Ours is coming soon.</p></div><div className="about-playlist" aria-label="QuantumX playlist coming soon"><div className="about-playlist-art" aria-hidden="true"><span>Q✦</span></div><div><p>THE QUANTUMX PLAYLIST</p><h3>Sounds like<br/>a good idea.</h3><small>PLAYLIST COMING SOON</small></div><div className="about-playlist-waves" aria-hidden="true"><i/><i/><i/><i/><i/></div></div></div></section>
    <section className="about-final-cta"><div className="about-container"><p className="about-label">LET’S MAKE SOMETHING <span>✦</span></p><h2>Have an idea?<br/><span>Let’s build it.</span></h2><Link className="pill contact-motion" href="/contact"><ContactButtonContents/></Link></div></section>
  </main>;
}
