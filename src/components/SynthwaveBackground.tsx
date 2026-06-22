import React, { useEffect, useRef } from 'react';

export default function SynthwaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let W = 0, H = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resizeCanvas() {
      W = window.innerWidth;
      H = window.innerHeight;
      if (canvas) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.55,
      r: Math.random() * 1.2 + 0.2,
      tw: Math.random() * Math.PI * 2,
    }));

    function makeMountains(seed: number, amp: number, count: number) {
      const pts = [];
      for (let i = 0; i <= count; i++) {
        const n = Math.sin(i * 0.7 + seed) * 0.5 + Math.sin(i * 1.9 + seed * 1.3) * 0.3 + Math.sin(i * 0.31 + seed * 2.1) * 0.6;
        pts.push((n + 1.2) * amp);
      }
      return pts;
    }

    const mountainsBack = makeMountains(1.2, 0.10, 24);
    const mountainsFront = makeMountains(3.7, 0.16, 28);

    const FOV_SCALE = 1.0, EYE = 1.0, Z_NEAR = 0.6, Z_FAR = 24, SPACING = 1.6, SPEED = 4.0;
    function project(x: number, z: number, horizonY: number) {
      const k = (EYE * FOV_SCALE) / z;
      const sx = W / 2 + x * k * (W / 2);
      const sy = horizonY + EYE * k * (H / 2);
      return [sx, sy];
    }

    let lastTime = performance.now();
    let scrollPos = 0;

    function drawSynthwave(now: number) {
      if (!ctx || !canvas) return;
      
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      scrollPos += dt * SPEED;

      const horizonY = H * 0.55;
      const sky = ctx.createLinearGradient(0, 0, 0, horizonY);
      sky.addColorStop(0, "#0a0014"); sky.addColorStop(0.55, "#1a0033"); sky.addColorStop(1, "#3a0a4a");
      ctx.fillStyle = sky; ctx.fillRect(0, 0, W, horizonY);

      const floor = ctx.createLinearGradient(0, horizonY, 0, H);
      floor.addColorStop(0, "#1a0033"); floor.addColorStop(0.4, "#0d0020"); floor.addColorStop(1, "#06000f");
      ctx.fillStyle = floor; ctx.fillRect(0, horizonY, W, H - horizonY);

      ctx.save();
      for (const s of stars) {
        s.tw += dt * 4;
        ctx.globalAlpha = 0.55 + Math.sin(s.tw) * 0.4;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath(); ctx.arc(s.x * W, s.y * horizonY, s.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();

      const sunR = Math.min(W, H) * 0.18;
      const sunCX = W / 2, sunCY = horizonY - sunR * 0.55;
      const sunGrad = ctx.createLinearGradient(0, sunCY - sunR, 0, sunCY + sunR);
      sunGrad.addColorStop(0, "#ffe04a"); sunGrad.addColorStop(0.55, "#ff5fa2"); sunGrad.addColorStop(1, "#ff2bd6");

      ctx.save();
      const glow = ctx.createRadialGradient(sunCX, sunCY, sunR * 0.3, sunCX, sunCY, sunR * 2.2);
      glow.addColorStop(0, "rgba(255,113,206,0.55)"); glow.addColorStop(1, "rgba(255,113,206,0)");
      ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
      ctx.beginPath(); ctx.arc(sunCX, sunCY, sunR, 0, Math.PI * 2); ctx.clip();
      ctx.fillStyle = sunGrad; ctx.fillRect(sunCX - sunR, sunCY - sunR, sunR * 2, sunR * 2);
      ctx.fillStyle = "#0a0014";
      for (let i = 0; i < 14; i++) {
        const t = i / 14, y = sunCY - sunR + t * sunR * 2, thickness = 1 + t * t * 9;
        if (Math.floor((t * 14 + now * 0.0008)) % 2 === 0) ctx.fillRect(sunCX - sunR, y, sunR * 2, thickness);
      }
      ctx.restore();

      function drawMountains(pts: number[], color: string, baseScale: number) {
        if (!ctx) return;
        ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(0, horizonY);
        for (let i = 0; i < pts.length; i++) ctx.lineTo((i / (pts.length - 1)) * W, horizonY - pts[i] * H * baseScale);
        ctx.lineTo(W, horizonY); ctx.closePath(); ctx.fill();
      }
      drawMountains(mountainsBack, "#2a0a3d", 1.0); drawMountains(mountainsFront, "#15052a", 1.0);

      ctx.save();
      const offset = scrollPos % SPACING;
      ctx.lineWidth = 1.4;
      for (let i = 0; i < 60; i++) {
        const z = Z_NEAR + i * SPACING - offset;
        if (z > Z_FAR) break;
        const fade = 1 - (z - Z_NEAR) / (Z_FAR - Z_NEAR);
        if (fade <= 0) continue;
        const [, sy] = project(0, z, horizonY);
        const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
        lineGrad.addColorStop(0, `rgba(34, 240, 255, 0)`); lineGrad.addColorStop(0.5, `rgba(255, 43, 214, ${0.9 * fade})`); lineGrad.addColorStop(1, `rgba(34, 240, 255, 0)`);
        ctx.strokeStyle = lineGrad; ctx.shadowColor = "#ff2bd6"; ctx.shadowBlur = 8 * fade;
        ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(W, sy); ctx.stroke();
      }
      ctx.shadowBlur = 6;
      for (let i = -10; i <= 10; i++) {
        const [x1, y1] = project(i * SPACING, Z_NEAR, horizonY), [x2, y2] = project(i * SPACING, Z_FAR, horizonY);
        const grad = ctx.createLinearGradient(x2, y2, x1, y1);
        grad.addColorStop(0, "rgba(34, 240, 255, 0)"); grad.addColorStop(0.4, "rgba(34, 240, 255, 0.5)"); grad.addColorStop(1, "rgba(255, 43, 214, 1)");
        ctx.strokeStyle = grad; ctx.shadowColor = "#22f0ff";
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      }
      ctx.restore();
      
      animationFrameId = requestAnimationFrame(drawSynthwave);
    }

    animationFrameId = requestAnimationFrame(drawSynthwave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="bg-canvas" className="fixed inset-0 -z-[3] block"></canvas>
      <div 
        className="fixed inset-0 -z-[2] pointer-events-none mix-blend-screen" 
        style={{
          background: 'repeating-linear-gradient(to bottom, rgba(255, 113, 206, 0.05) 0px, rgba(255, 113, 206, 0.05) 1px, transparent 1px, transparent 3px)'
        }}
      ></div>
    </>
  );
}
