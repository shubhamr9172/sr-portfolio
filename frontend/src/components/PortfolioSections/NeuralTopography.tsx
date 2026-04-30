import React, { useRef, useEffect, useState } from 'react';

export default function NeuralTopography() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spacing = 45; // Moved outside for accessibility in HUD

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const points: Point[] = [];
    const particles: Particle[] = [];
    const rows = Math.floor(height / spacing) + 1;
    const cols = Math.floor(width / spacing) + 1;

    class Point {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      z: number = 0;
      targetZ: number = 0;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
      }

      update(mouseX: number, mouseY: number, time: number) {
        const dx = this.baseX - mouseX;
        const dy = this.baseY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 250;

        const wave = Math.sin(this.baseX * 0.01 + time * 0.002) * Math.cos(this.baseY * 0.01 + time * 0.002) * 25;
        
        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          this.targetZ = force * 60 + wave;
        } else {
          this.targetZ = wave;
        }

        this.z += (this.targetZ - this.z) * 0.1;
      }
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 2 + 1;
        this.color = `rgba(251, 191, 36, ${Math.random() * 0.5 + 0.2})`;
      }

      update(mouseX: number, mouseY: number) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 300) {
          const force = (300 - dist) / 3000;
          this.vx += dx * force;
          this.vy += dy * force;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95;
        this.vy *= 0.95;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        points.push(new Point(c * spacing, r * spacing));
      }
    }

    for (let i = 0; i < 40; i++) {
      particles.push(new Particle());
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.15)';
      ctx.lineWidth = 1;

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const p = points[r * cols + c];
          p.update(mouseX, mouseY, time);
          const screenX = p.baseX + (p.z * 0.4);
          const screenY = p.baseY - (p.z * 0.4);
          if (c === 0) ctx.moveTo(screenX, screenY);
          else ctx.lineTo(screenX, screenY);
        }
        ctx.stroke();
      }

      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const p = points[r * cols + c];
          const screenX = p.baseX + (p.z * 0.4);
          const screenY = p.baseY - (p.z * 0.4);
          if (r === 0) ctx.moveTo(screenX, screenY);
          else ctx.lineTo(screenX, screenY);
        }
        ctx.stroke();
      }

      particles.forEach(p => {
        p.update(mouseX, mouseY);
        p.draw(ctx);
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.strokeStyle = `rgba(251, 191, 36, ${(150 - dist) / 300})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      });

      points.forEach(p => {
        if (p.z > 20) {
          const screenX = p.baseX + (p.z * 0.4);
          const screenY = p.baseY - (p.z * 0.4);
          const alpha = (p.z / 60);
          ctx.fillStyle = `rgba(251, 191, 36, ${alpha})`;
          ctx.beginPath();
          ctx.arc(screenX, screenY, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (Math.random() > 0.98) {
        ctx.fillStyle = 'rgba(251, 191, 36, 0.05)';
        ctx.fillRect(0, Math.random() * height, width, 2);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-[550px] bg-zinc-950/40 rounded-3xl border border-zinc-800/50 overflow-hidden group shadow-2xl backdrop-blur-xl">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block"
      />
      
      <div className="absolute top-6 left-6 font-mono text-[9px] text-gold/50 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gold animate-ping rounded-full" />
          <span className="tracking-[0.2em]">VECTOR_SPACE_MONITOR</span>
        </div>
        <div className="flex flex-col opacity-60">
          <div>DATA_POINTS: {Math.floor(1000 / spacing) * Math.floor(1000 / spacing)}</div>
          <div>FLUID_INTEL: ACTIVE</div>
          <div>NEURAL_LOAD: 14.2%</div>
        </div>
      </div>

      <div className="absolute top-6 right-6 font-mono text-[9px] text-gold/50 text-right pointer-events-none">
        <div className="opacity-80">LATENT_DIM: 1536</div>
        <div className="opacity-60 uppercase">Shubham_Reddy // Systems</div>
      </div>

      <div className="absolute bottom-6 left-6 font-mono text-[9px] text-gold/30 pointer-events-none max-w-[200px]">
        [ MANUAL_OVERRIDE_ENABLED ]
        <br />
        SCANNING_FOR_RAG_FRAGMENTS...
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-black/80 backdrop-blur-md border border-gold/20 px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 scale-90 group-hover:scale-100">
          <div className="text-gold font-mono text-[10px] tracking-[0.4em] uppercase">Distort Reality</div>
        </div>
      </div>
    </div>
  );
}

