'use client';
import {useEffect,useRef} from 'react';

// A small orthographic globe keeps the animation lightweight on phones.
export default function ServicesGlobe(){
  const canvas=useRef(null);
  useEffect(()=>{
    const el=canvas.current,ctx=el.getContext('2d'),reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
    const image=new Image(); image.src='/assets/services-earth.jpg';
    let frame=0,last=0,angle=1.35,visible=true,loaded=false,texture,tw,th;
    const size=320, radius=144, center=160;
    const points=[[80.27,13.08],[-74,40.7],[-0.13,51.5],[55.27,25.2],[103.8,1.3],[151.2,-33.9],[139.7,35.7]];
    const project=([lng,lat])=>{const lon=lng*Math.PI/180-angle, phi=lat*Math.PI/180;return {x:center+radius*Math.cos(phi)*Math.sin(lon),y:center-radius*Math.sin(phi),z:Math.cos(phi)*Math.cos(lon)}};
    const draw=(time=0)=>{
      frame=0;if(!loaded||!visible)return;
      if(!reduce.matches && time-last<45){frame=requestAnimationFrame(draw);return}
      const dt=last?Math.min(time-last,100):0; last=time;if(!reduce.matches)angle+=dt*.000035;
      const pixels=ctx.createImageData(size,size), data=pixels.data;
      for(let y=0;y<size;y++)for(let x=0;x<size;x++){
        const nx=(x-center)/radius,ny=(center-y)/radius,rr=nx*nx+ny*ny;if(rr>=1)continue;
        const z=Math.sqrt(1-rr),lat=Math.asin(ny),lon=Math.atan2(nx,z)+angle;
        const u=((lon/(2*Math.PI)+.5)%1+1)%1,v=.5-lat/Math.PI,ti=(Math.min(th-1,Math.floor(v*th))*tw+Math.floor(u*tw))*4;
        const r=texture[ti],g=texture[ti+1],bl=texture[ti+2],land=Math.max(0,Math.min(1,(r-bl+28)/65));
        const light=.32+.68*Math.max(0,Math.min(1,z*.7+nx*.3+.2)),detail=(r*.3+g*.55+bl*.15)/255;
        const i=(y*size+x)*4;data[i]=(12+land*(75+detail*160))*light;data[i+1]=(15+land*(32+detail*85))*light;data[i+2]=(22+land*(10+detail*25))*light;data[i+3]=255;
      }
      ctx.clearRect(0,0,size,size);ctx.putImageData(pixels,0,0);
      const rim=ctx.createRadialGradient(center,center,radius*.88,center,center,radius*1.04);rim.addColorStop(0,'transparent');rim.addColorStop(.75,'rgba(242,113,24,.16)');rim.addColorStop(1,'transparent');ctx.fillStyle=rim;ctx.beginPath();ctx.arc(center,center,radius*1.04,0,Math.PI*2);ctx.fill();
      const projected=points.map(project), origin=projected[0].z>0?projected[0]:projected.reduce((best,p)=>p.z>best.z?p:best);ctx.save();ctx.beginPath();ctx.arc(center,center,radius,0,Math.PI*2);ctx.clip();
      projected.forEach((target,index)=>{if(target===origin||target.z<=0)return;ctx.beginPath();ctx.moveTo(origin.x,origin.y);ctx.quadraticCurveTo((origin.x+target.x)/2,(origin.y+target.y)/2-20-Math.abs(target.x-origin.x)*.16,target.x,target.y);ctx.setLineDash([]);ctx.strokeStyle='rgba(255,183,94,.38)';ctx.lineWidth=1;ctx.stroke();ctx.setLineDash([2,4]);ctx.lineDashOffset=reduce.matches?0:-(time*.015+index*5);ctx.strokeStyle='rgba(255,226,173,.95)';ctx.lineWidth=1.2;ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='#ffd08a';ctx.shadowColor='#ff8b20';ctx.shadowBlur=7;ctx.beginPath();ctx.arc(target.x,target.y,2,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0});
      if(origin.z>0){ctx.fillStyle='#fff0c6';ctx.shadowColor='#ff941e';ctx.shadowBlur=10;ctx.beginPath();ctx.arc(origin.x,origin.y,3,0,Math.PI*2);ctx.fill()}ctx.restore();
      if(!reduce.matches)frame=requestAnimationFrame(draw);
    };
    image.onload=()=>{const temp=document.createElement('canvas');tw=image.naturalWidth;th=image.naturalHeight;temp.width=tw;temp.height=th;const c=temp.getContext('2d',{willReadFrequently:true});c.drawImage(image,0,0);texture=c.getImageData(0,0,tw,th).data;loaded=true;draw()};
    const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&loaded&&!frame){last=0;draw()}else if(!visible&&frame){cancelAnimationFrame(frame);frame=0}},{rootMargin:'100px'});observer.observe(el);
    const motion=()=>{if(frame)cancelAnimationFrame(frame);frame=0;last=0;draw()};reduce.addEventListener('change',motion);
    return()=>{image.onload=null;observer.disconnect();reduce.removeEventListener('change',motion);if(frame)cancelAnimationFrame(frame)};
  },[]);
  return <canvas ref={canvas} width="320" height="320" className="services-earth" aria-label="A rotating globe showing connections between regions" role="img"/>;
}
