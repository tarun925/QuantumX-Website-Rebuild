'use client';

import {useEffect, useState} from 'react';
import './hero-quantum-node.css';

const capabilities = [
  {name: 'Strategy', icon: 'strategy', x: 360, y: 62, path: 'M360 94 C360 170 305 273 360 388'},
  {name: 'Creative', icon: 'creative', x: 550, y: 135, path: 'M525 155 C487 185 438 257 374 380'},
  {name: 'Performance', icon: 'performance', x: 634, y: 285, path: 'M602 285 L560 285 L510 327 L435 327 L379 382'},
  {name: 'Technology', icon: 'technology', x: 550, y: 496, path: 'M524 479 L490 461 L457 461 L399 411'},
  {name: 'Data', icon: 'data', x: 360, y: 585, path: 'M360 553 L360 515 L360 414'},
  {name: 'AI', icon: 'ai', x: 170, y: 496, path: 'M196 479 L230 461 L263 461 L321 411'},
  {name: 'Branding', icon: 'branding', x: 86, y: 285, path: 'M118 285 L160 285 L210 327 L285 327 L341 382'},
  {name: 'Automation', icon: 'automation', x: 170, y: 135, path: 'M195 155 C233 185 282 257 346 380'},
];

// Longer circuit branches extend from the chip in both directions.
const circuitBranches = [
  {path: 'M316 343 L286 326 L286 304 L261 290 L261 258 L236 243 L236 214', end: [236, 214], junction: [261, 290]},
  {path: 'M290 353 L255 334 L255 310 L220 290 L194 290 L165 274 L165 243 L135 225', end: [135, 225], junction: [194, 290]},
  {path: 'M250 379 L220 363 L220 347 L185 328 L165 328 L140 342 L117 342', end: [117, 342], junction: [185, 328]},
  {path: 'M225 402 L195 385 L174 385 L146 401 L111 401 L88 414 L67 414', end: [67, 414], junction: [146, 401]},
  {path: 'M248 425 L220 441 L220 456 L185 475 L152 475 L133 486 L101 486', end: [101, 486], junction: [152, 475]},
  {path: 'M308 468 L279 484 L279 506 L247 524 L247 546 L224 559 L205 559', end: [205, 559], junction: [247, 524]},
];

// The X is taken from the QuantumX logo, rather than a generic multiplication sign.
const brandMark = 'M333.199 27.121 L325.543 34.777 C309.594 45.051 303.754 45.043 287.785 34.746 L280.426 27.386 L279.457 28.355 L286.895 35.793 C297.129 51.691 297.117 57.539 286.863 73.457 L281.277 79.043 L282.246 80.012 L287.832 74.426 C303.75 64.172 309.597 64.164 325.496 74.395 L332.797 81.695 L333.766 80.727 L326.543 73.504 C316.25 57.535 316.238 51.695 326.511 35.746 L334.172 28.09 Z';

function CapabilityIcon({name}) {
  const shared = {fill: 'none', stroke: 'currentColor', strokeWidth: 2.1, strokeLinecap: 'round', strokeLinejoin: 'round'};
  switch (name) {
    case 'strategy': return <g {...shared}><circle r="14"/><circle r="8.5"/><circle r="3"/></g>;
    case 'creative': return <g {...shared}><path d="M-12-13 L8-7 L13 6 L5 14 L-8 9 Z"/><path d="M-12-13 L1 0 M5 14 L14 5"/><circle cx="3" cy="1" r="3"/></g>;
    case 'performance': return <g {...shared}><path d="M-14 10 L-5 1 L1 6 L13-7"/><path d="M5-7 H13 V1"/></g>;
    case 'technology': return <g {...shared}><rect x="-10" y="-10" width="20" height="20" rx="3"/><rect x="-4" y="-4" width="8" height="8" rx="1"/><path d="M-15-5 H-10 M-15 5 H-10 M10-5 H15 M10 5 H15 M-5-15 V-10 M5-15 V-10 M-5 10 V15 M5 10 V15"/></g>;
    case 'data': return <g {...shared}><path d="M-12 12 V4 M0 12 V-12 M12 12 V-4"/><path d="M-16 15 H16" opacity=".45"/></g>;
    case 'ai': return <g {...shared}><path d="M0-14 C1-6 5-2 13 0 C5 2 1 6 0 14 C-1 6-5 2-13 0 C-5-2-1-6 0-14 Z"/><path d="M11-12 V-6 M8-9 H14"/></g>;
    case 'branding': return <g {...shared}><path d="M0-14 L13-6 V7 L0 15 L-13 7 V-6 Z"/><path d="M-13-6 L0 2 L13-6 M0 2 V15"/></g>;
    case 'automation': return <g {...shared}><path d="M-12-3 A12 12 0 0 1 9-9 L12-6 M12 3 A12 12 0 0 1-9 9 L-12 6"/><path d="M12-13 V-6 H5 M-12 13 V6 H-5"/><circle r="3"/></g>;
    default: return null;
  }
}

export default function HeroQuantumNode() {
  // The logo gets its own turn, then each capability takes the center for three seconds.
  const [turn, setTurn] = useState(0);
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    const updateMotion = () => {
      window.clearInterval(timer);
      if (reducedMotion.matches) {
        setTurn(0);
        return;
      }
      timer = window.setInterval(() => {
        if (document.visibilityState === 'visible') setTurn(value => (value + 1) % (capabilities.length + 1));
      }, 3000);
    };
    updateMotion();
    reducedMotion.addEventListener('change', updateMotion);
    return () => {
      window.clearInterval(timer);
      reducedMotion.removeEventListener('change', updateMotion);
    };
  }, []);

  return <div className="hero-quantum-node" role="img" aria-label="An animated QuantumX chip connects strategy, creative, performance, technology, data, AI, branding and automation into one system.">
    <svg className="qnode-art" viewBox="0 0 720 640" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="qnode-ambient"><stop stopColor="#f6a74b" stopOpacity=".25"/><stop offset=".5" stopColor="#f8bd78" stopOpacity=".09"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></radialGradient>
        <radialGradient id="qnode-center-glow"><stop stopColor="#ffbf69" stopOpacity=".8"/><stop offset=".3" stopColor="#e98515" stopOpacity=".23"/><stop offset="1" stopColor="#e98515" stopOpacity="0"/></radialGradient>
        <linearGradient id="qnode-top" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#48423f"/><stop offset=".4" stopColor="#191919"/><stop offset="1" stopColor="#090909"/></linearGradient>
        <linearGradient id="qnode-side" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#282828"/><stop offset="1" stopColor="#090909"/></linearGradient>
        <linearGradient id="qnode-core" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffc475"/><stop offset=".5" stopColor="#ee921d"/><stop offset="1" stopColor="#b95a00"/></linearGradient>
        <filter id="qnode-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="qnode-shadow" x="-50%" y="-150%" width="200%" height="400%"><feGaussianBlur stdDeviation="14"/></filter>
      </defs>

      <circle cx="360" cy="340" r="300" fill="url(#qnode-ambient)"/>
      <g className="qnode-network">
        {capabilities.map((capability, index) => <g key={capability.name}>
          <path d={capability.path} className="qnode-wire"/>
          <path d={capability.path} className="qnode-energy" pathLength="100" strokeDasharray="5 95" style={{animationDelay: `${-index * 0.38}s`, animationDirection: index % 2 ? 'reverse' : 'normal'}}/>
        </g>)}
      </g>

      <g className="qnode-board">
        <ellipse cx="360" cy="474" rx="175" ry="49" fill="#b45e08" opacity=".18" filter="url(#qnode-shadow)"/>
        {[0, 1].map(side => <g key={side} transform={side ? 'translate(720 0) scale(-1 1)' : undefined}>
          {circuitBranches.map((branch, index) => <g key={branch.path}>
            <path d={branch.path} className="qnode-branch-wire"/>
            <circle cx={branch.junction[0]} cy={branch.junction[1]} r="2.3" className="qnode-branch-junction"/>
            <circle cx={branch.end[0]} cy={branch.end[1]} r="7" className="qnode-branch-halo" style={{animationDelay: `${-(side * circuitBranches.length + index) * 0.27}s`}}/>
            <circle cx={branch.end[0]} cy={branch.end[1]} r="3" className="qnode-branch-junction"/>
          </g>)}
          <g className="qnode-branch-pulses">
            {circuitBranches.map((branch, index) => <path key={branch.path} d={branch.path} className="qnode-branch-energy" pathLength="100" strokeDasharray="8 42" style={{animationDelay: `${-(side * circuitBranches.length + index) * 0.31}s`, animationDirection: (side + index) % 2 ? 'reverse' : 'normal'}}/>)}
          </g>
        </g>)}
        <path d="M147 390 L335 288 Q360 275 385 288 L573 390 Q590 399 573 409 L385 511 Q360 524 335 511 L147 409 Q130 399 147 390Z" fill="none" stroke="#b76a18" strokeWidth="1.4" strokeDasharray="7 8" opacity=".25"/>
        <path d="M180 392 L340 306 Q360 295 380 306 L540 392 Q555 400 540 408 L380 494 Q360 505 340 494 L180 408 Q165 400 180 392Z" fill="none" stroke="#a4a09c" strokeWidth="2" opacity=".55"/>
        <g className="qnode-circuit" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M208 354 L171 334 L171 318 L129 295 M231 339 L231 319 L187 295 M512 354 L549 334 L549 318 L591 295 M489 339 L489 319 L533 295"/>
          <path d="M207 431 L170 450 L170 466 L130 488 M232 446 L232 465 L186 490 M513 431 L550 450 L550 466 L590 488 M488 446 L488 465 L534 490"/>
          <path d="M275 305 L248 290 L215 290 M445 305 L472 290 L505 290 M275 488 L246 504 L215 504 M445 488 L474 504 L505 504"/>
        </g>
        <g fill="#cf7714" opacity=".8"><circle cx="129" cy="295" r="3"/><circle cx="591" cy="295" r="3"/><circle cx="130" cy="488" r="3"/><circle cx="590" cy="488" r="3"/><circle cx="215" cy="290" r="3"/><circle cx="505" cy="290" r="3"/><circle cx="215" cy="504" r="3"/><circle cx="505" cy="504" r="3"/></g>
        <path d="M215 393 L215 422 Q215 431 225 436 L345 501 Q360 509 375 501 L495 436 Q505 431 505 422 L505 393 L374 465 Q360 473 346 465 L225 400 Q215 396 215 393Z" fill="url(#qnode-side)" stroke="#4b4846" strokeWidth="1.5"/>
        <path d="M225 385 L346 319 Q360 311 374 319 L495 385 Q509 393 495 401 L374 466 Q360 474 346 466 L225 401 Q211 393 225 385Z" fill="url(#qnode-top)" stroke="#6c625a" strokeWidth="1.5"/>
        <path d="M242 385 L349 327 Q360 321 371 327 L478 385 Q491 392 478 399 L371 457 Q360 463 349 457 L242 399 Q229 392 242 385Z" fill="none" stroke="#f29a31" opacity=".2"/>
        {Array.from({length: 7}, (_, row) => Array.from({length: 7}, (_, col) => {
          if (row >= 2 && row <= 4 && col >= 2 && col <= 4) return null;
          return <circle key={`${row}-${col}`} cx={360 + (col - row) * 17} cy={392 + (col + row - 6) * 9.2} r="2.7" fill={(row + col) % 3 === 0 ? '#ffbe5b' : '#d2760c'} opacity=".9"/>;
        }))}
        <circle cx="360" cy="392" r="76" fill="url(#qnode-center-glow)" className="qnode-core-glow"/>
        <path d="M360 365 L408 391 L360 417 L312 391Z" fill="#d07610" opacity=".4" filter="url(#qnode-glow)"/>
        <path d="M360 368 L403 391 L360 414 L317 391Z" fill="url(#qnode-core)"/>
        <path d="M360 375 L389 391 L360 407 L331 391Z" fill="#ffcb79" opacity=".75"/>
        <path d={brandMark} transform="translate(360 391) scale(.34) translate(-306.8 -54.4)" fill="#a65400"/>
      </g>

      <g className={`qnode-brand ${turn === 0 ? 'is-visible' : ''}`}>
        <circle cx="360" cy="224" r="65" fill="url(#qnode-center-glow)"/>
        <path d={brandMark} transform="translate(360 224) scale(.9) translate(-306.8 -54.4)" fill="#df7c0c" filter="url(#qnode-glow)"/>
      </g>
      <path d="M360 270 L360 343" className="qnode-center-beam"/>

      {capabilities.map((capability, index) => {
        const active = turn === index + 1;
        return <g key={capability.name} className={`qnode-position ${active ? 'is-active' : ''}`} style={{transform: `translate(${active ? 360 : capability.x}px, ${active ? 224 : capability.y}px)`}}>
          <g className="qnode-floating" style={{animationDelay: `${-index * 0.45}s`}}>
            <circle r="38" className="qnode-node-glow"/>
            <circle r="31" className="qnode-node-ring"/>
            <CapabilityIcon name={capability.icon}/>
            <text x="0" y="52" textAnchor="middle" className="qnode-label">{capability.name}</text>
          </g>
        </g>;
      })}
    </svg>
  </div>;
}
