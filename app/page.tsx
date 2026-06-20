'use client';

import { motion, useScroll, useTransform, useMotionValue, useInView, animate, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect, ReactNode } from 'react';
import Lenis from 'lenis';
import {
  ChevronsDown,
  Gauge,
  Zap,
  Weight,
  Settings,
  Car,
  Maximize,
  ArrowRight,
  ShieldCheck,
  Cpu,
  MonitorPlay,
  Crosshair,
  Timer,
  MoveHorizontal
} from 'lucide-react';
import Image from 'next/image';

// Magnetic Button Wrapper
function MagneticButton({ children, className }: { children: ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated Counter
function Counter({ value, isDecimal = false, delay = 0 }: { value: number, isDecimal?: boolean, delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        animate(0, value, {
          duration: 2.5,
          ease: [0.16, 1, 0.3, 1],
          onUpdate(latest) {
            if (ref.current) {
              ref.current.textContent = isDecimal ? latest.toFixed(1) : Math.round(latest).toString();
            }
          }
        });
      }, delay * 1000);
    }
  }, [inView, value, isDecimal, delay]);

  return <span ref={ref}>0</span>;
}

const specs = [
  { icon: Zap, label: "Power", value: "710 BHP @ 7500rpm" },
  { icon: Gauge, label: "Torque", value: "770 Nm @ 5500rpm" },
  { icon: Timer, label: "0-100 km/h", value: "2.9 Seconds" },
  { icon: Maximize, label: "Top Speed", value: "341 km/h" },
  { icon: Weight, label: "Kerb Weight", value: "1,419 kg" },
  { icon: Settings, label: "Transmission", value: "7-Speed Dual-Clutch" },
];

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const { scrollYProgress } = useScroll();

  return (
    <main ref={containerRef} className="bg-base text-text min-h-screen overflow-hidden selection:bg-primary/30">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left shadow-[0_0_15px_rgba(255,99,33,0.8)]"
        style={{ scaleX: scrollYProgress }} 
      />
      <div className="fixed inset-0 z-[-2] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-base to-base" />
      <HeroSection />
      <OverviewSection />
      <PerformanceSection />
      <Viewer360Section />
      <TechSpecsSection />
      <InteriorSection />
      <CarouselSection />
      <PricingSection />
      <FooterCTA />
    </main>
  );
}

function HeroSection() {
  const { scrollYProgress } = useScroll();
  const yPart = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);

  const titleChars = "MCLAREN".split("");

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y: yPart, opacity, scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-base z-10" />
        <div className="absolute inset-0 bg-base/30 z-10 mix-blend-multiply" />
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover scale-105"
          poster="https://images.unsplash.com/photo-1618845014902-601c3c9bd6eb?q=80&w=3540&auto=format&fit=crop"
        >
          <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <span className="uppercase tracking-[0.5em] text-primary text-xs md:text-sm font-bold mb-6 block drop-shadow-[0_0_15px_rgba(255,99,33,0.5)]">
            Uncompromised Performance
          </span>
        </motion.div>
        
        <div className="relative">
          <motion.div 
            className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          />
          <h1 className="font-display italic text-4xl sm:text-6xl md:text-8xl lg:text-[11rem] font-light tracking-tighter text-text drop-shadow-2xl mb-6 relative flex gap-2 sm:gap-4 overflow-hidden justify-center items-center">
            <span className="flex">
              {titleChars.map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 120, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 + (i * 0.05) }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <motion.span 
              className="opacity-80 inline-block text-transparent bg-clip-text bg-gradient-to-r from-text to-text/30"
              initial={{ opacity: 0, x: -50, filter: 'blur(20px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1 }}
            >
              720S
            </motion.span>
          </h1>
        </div>

        <motion.p
          className="text-base md:text-xl text-text/60 max-w-2xl font-light tracking-widest leading-relaxed mt-4"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
        >
          Carbon-fibre engineering meets futuristic design. The definitive mid-engine supercar experience.
        </motion.p>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-8 h-12 border rounded-full flex justify-center p-2 border-white/20 glass pointer-events-auto cursor-pointer hover:border-primary/50 transition-colors">
            <motion.div 
              animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }} 
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-primary rounded-full drop-shadow-[0_0_5px_rgba(255,99,33,0.8)]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function OverviewSection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section ref={container} className="py-24 md:py-40 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
      >
        <div className="md:pr-10">
          <h2 className="font-display italic font-light text-4xl md:text-6xl mb-6 md:mb-8 tracking-tight">Form Follows <br/><span className="text-primary neon-glow font-bold">Function.</span></h2>
          <p className="text-text/60 text-base md:text-xl font-light leading-relaxed mb-8 md:mb-10 tracking-wide">
            The McLaren 720S is a masterpiece of aerodynamic engineering and lightweight construction. Built around the Carbon Fibre Monocage II, it delivers extreme performance combined with visceral driving engagement that defies expectations. Every curve and line is sculpted to manipulate the air, maximizing downforce and minimizing drag.
          </p>
          <MagneticButton className="inline-block">
            <div className="flex items-center gap-4 text-sm uppercase tracking-[0.2em] font-bold text-text group cursor-pointer px-8 py-4 rounded-full border border-white/10 glass hover:bg-white/5 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,99,33,0.2)]">
              <span>Discover Design</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 text-primary" />
            </div>
          </MagneticButton>
        </div>
        
        <motion.div style={{ y }} className="relative h-[400px] md:h-[600px] w-full overflow-hidden group glass rounded-[40px] border-white/10 p-2">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
          <div className="relative w-full h-full rounded-[30px] overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=3540&q=80" 
              alt="McLaren 720S Angle" 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function PerformanceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isInView && audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.play().catch(() => {
        // Handle playback prevented by browser
        console.log("Audio play prevented by browser policy");
      });
    }
  }, [isInView]);

  const highlights = [
    { value: 710, unit: "BHP", label: "Maximum Power", isDecimal: false },
    { value: 2.9, unit: "s", label: "0-100 km/h", isDecimal: true },
    { value: 341, unit: "km/h", label: "Top Speed", isDecimal: false }
  ];

  return (
    <section ref={ref} className="py-24 md:py-40 relative overflow-hidden">
      <audio 
        ref={audioRef} 
        src="https://actions.google.com/sounds/v1/transportation/car_revving_up.ogg" 
        preload="auto" 
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="text-center mb-24 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-primary" />
            <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase drop-shadow-[0_0_8px_rgba(255,99,33,0.8)]">Telemetry</span>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-primary" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display italic font-light text-4xl md:text-8xl tracking-tight text-text"
          >
            Apex Performance.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-16">
          {highlights.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.2 }}
              className="relative group text-center"
            >
              <div className="absolute inset-x-8 -inset-y-4 bg-primary/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-2xl rounded-[40px] -z-10 border border-white/10 opacity-70 group-hover:opacity-100 group-hover:border-primary/30 transition-all duration-500 shadow-2xl" />
              <div className="p-12 rounded-[40px] relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="flex items-baseline justify-center gap-2 mb-4 relative z-10">
                  <span className="font-display text-5xl lg:text-8xl font-light italic text-text tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    <Counter value={item.value} isDecimal={item.isDecimal} delay={index * 0.2} />
                  </span>
                  <span className="text-lg md:text-xl text-primary font-bold opacity-90 tracking-widest">{item.unit}</span>
                </div>
                <p className="text-text/50 uppercase tracking-[0.4em] font-bold text-[10px] relative z-10">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Viewer360Section() {
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-500, 500], [-45, 45]);
  const [isDragging, setIsDragging] = useState(false);
  const [activeColor, setActiveColor] = useState('papaya');

  const colorConfig = {
    'papaya': { name: 'Papaya Spark', hex: '#FF6321', filter: 'hue-rotate(0deg)' },
    'paris': { name: 'Paris Blue', hex: '#1D4ED8', filter: 'hue-rotate(210deg) saturate(1.8) brightness(0.9)' },
    'mantis': { name: 'Mantis Green', hex: '#22C55E', filter: 'hue-rotate(120deg) saturate(1.8)' },
    'amethyst': { name: 'Amethyst Black', hex: '#4C1D95', filter: 'hue-rotate(280deg) saturate(1.4) brightness(0.8)' },
    'silica': { name: 'Silica White', hex: '#F1F5F9', filter: 'grayscale(100%) brightness(1.7)' },
  };

  return (
    <section className="py-24 md:py-40 relative bg-base">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent -z-10" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
             <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-white/30" />
             <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">Interactive</span>
             <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-white/30" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display italic font-light text-text text-4xl md:text-7xl tracking-tight mb-4 md:mb-6"
          >
            360° Vision.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-text/50 font-light max-w-xl text-base md:text-lg tracking-wide"
          >
            Explore the aerodynamic profile of the 720S. Drag to inspect and select options to configure your own.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[40px] glass overflow-hidden flex items-center justify-center cursor-ew-resize group shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent z-0 opacity-50 transition-colors duration-700" style={{ '--tw-gradient-from': `${colorConfig[activeColor as keyof typeof colorConfig].hex}1A` } as React.CSSProperties} />
          
          <div className="absolute inset-0 perspective-[1200px] flex items-center justify-center w-full h-full pointer-events-none">
            <motion.div 
              style={{ rotateY }} 
              className="relative z-10 w-full h-[80%] max-w-5xl transition-transform"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent z-10" />
              <div 
                className="absolute inset-0 transition-all duration-700 ease-in-out"
                style={{ filter: colorConfig[activeColor as keyof typeof colorConfig].filter }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=3540&q=80"
                  alt="McLaren 720S 360 View"
                  fill
                  className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="absolute inset-0 z-20"
            drag="x"
            dragConstraints={{ left: -300, right: 300 }}
            dragElastic={0.1}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            style={{ x }}
          />

          <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 px-8 py-4 rounded-full bg-base/60 backdrop-blur-xl border border-white/10 transition-opacity duration-300 pointer-events-none shadow-2xl ${isDragging ? 'opacity-0' : 'opacity-100'}`}>
            <MoveHorizontal className="text-primary w-5 h-5 animate-pulse" />
            <span className="text-text font-bold text-xs uppercase tracking-[0.2em]">Hold and Drag</span>
          </div>

          {/* Color Configurator UI */}
          <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2 md:gap-4 p-2 md:p-4 rounded-3xl bg-base/40 backdrop-blur-md border border-white/10 pointer-events-auto">
            {Object.entries(colorConfig).map(([id, config]) => (
              <button 
                key={id}
                onClick={() => setActiveColor(id)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-300 relative group overflow-hidden ${
                  activeColor === id ? 'border-white scale-125 shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'border-black hover:border-white/50 hover:scale-110'
                }`}
                aria-label={`Select ${config.name}`}
              >
                <span className="absolute inset-0 rounded-full" style={{ backgroundColor: config.hex }} />
                <span className="absolute right-12 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-base/80 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-text whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {config.name}
                </span>
              </button>
            ))}
          </div>

          {/* Current Selection Label */}
          <div className="absolute top-4 left-4 md:top-8 md:left-8 z-30 pointer-events-none">
             <div className="glass px-4 py-2 rounded-xl flex flex-col gap-1 border border-white/10">
                <span className="text-[9px] font-bold tracking-widest uppercase text-text/50">Exterior Paint</span>
                <span className="text-sm font-light tracking-wide text-text flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colorConfig[activeColor as keyof typeof colorConfig].hex }} />
                   {colorConfig[activeColor as keyof typeof colorConfig].name}
                </span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TechSpecsSection() {
  return (
    <section className="py-24 md:py-40 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-20 flex flex-col gap-6"
      >
        <div className="flex items-center gap-4">
          <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">Specifications</span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent max-w-md" />
        </div>
        <h2 className="font-display italic font-light text-text text-4xl md:text-7xl">Technical Precision</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {specs.map((spec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, rotateX: -20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group relative glass rounded-3xl p-8 hover:bg-white/5 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-700" />
            
            <div className="relative z-10 flex flex-col items-start gap-8">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(255,99,33,0.2)] transition-all duration-500">
                <spec.icon className="w-8 h-8 text-text/40 group-hover:text-primary transition-colors duration-500" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-primary text-xs uppercase tracking-[0.2em] font-bold">{spec.label}</p>
                <p className="text-text text-lg md:text-xl font-light tracking-wide">{spec.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className="mt-16 p-10 glass rounded-[30px] flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent z-0" />
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-display italic font-light text-text mb-4 flex items-center gap-2 md:gap-4">
            <Car className="text-primary w-6 h-6 md:w-8 md:h-8" /> 
            Drivetrain & Chassis
          </h3>
          <p className="text-text/60 text-base md:text-lg max-w-2xl leading-relaxed font-light tracking-wide">
            Rear-wheel drive with limited slip differential. Adaptive damping via Proactive Chassis Control II ensures supreme handling on both road and track.
          </p>
        </div>
        <div className="relative z-10 px-8 py-4 rounded-2xl glass border border-white/10 text-text text-sm font-mono tracking-widest whitespace-nowrap hidden lg:block shadow-xl">
          DIM: 4,543 x 2,059 x 1,196 MM
        </div>
      </motion.div>
    </section>
  );
}

function InteriorSection() {
  const features = [
    { icon: MonitorPlay, title: "Folding Driver Display", desc: "Transforms for Track Mode, focusing purely on essential telemetry." },
    { icon: Crosshair, title: "Active Dynamics", desc: "Toggle seamlessly between Comfort, Sport, and Track modes." },
    { icon: Cpu, title: "Central Infotainment", desc: "Portrait-oriented touchscreen hub for navigation, media, and vehicle settings." },
    { icon: ShieldCheck, title: "Driver-Centric Purity", desc: "Wrapped in premium Alcantara and leather, eliminating distraction." },
  ];

  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={container} className="py-24 md:py-40 relative bg-base overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-5 gap-12 md:gap-20 items-center">
          
          <div className="lg:col-span-2 order-2 lg:order-1 relative z-20">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display italic text-4xl md:text-6xl font-light mb-6 md:mb-8 tracking-tight drop-shadow-2xl"
            >
              The cockpit,<br/><span className="text-primary neon-glow">uncluttered.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-text/60 text-base md:text-xl font-light leading-relaxed mb-10 md:mb-16 tracking-wide"
            >
              The interior of the 720S is a perfect symbiosis of luxury and performance. Every element falls naturally to hand, designed to keep your focus entirely on the apex ahead.
            </motion.p>
            
            <div className="space-y-10">
              {features.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.2 + (idx * 0.1), ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-6 group cursor-default"
                >
                  <div className="p-4 rounded-2xl glass border-white/10 text-text/40 group-hover:text-primary group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(255,99,33,0.3)] transition-all duration-500 h-fit">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="pt-1">
                    <h4 className="text-text font-bold text-xs uppercase tracking-[0.2em] mb-2">{item.title}</h4>
                    <p className="text-text/50 text-[15px] font-light leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div style={{ y }} className="lg:col-span-3 order-1 lg:order-2 h-[400px] md:h-[600px] lg:h-[800px] relative rounded-[40px] overflow-hidden glass p-3 border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-base via-base/20 to-transparent z-10 lg:hidden" />
            <div className="relative w-full h-full rounded-[30px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=3540&auto=format&fit=crop"
                alt="McLaren Interior"
                fill
                className="object-cover transition-transform duration-[2000ms] hover:scale-[1.05]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent opacity-80" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function CarouselSection() {
  const [index, setIndex] = useState(0);

  const images = [
    { src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=3540&q=80", alt: "Studio Shot" },
    { src: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=3540&q=80", alt: "Rear Profile" },
    { src: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=3540&q=80", alt: "Front Profile" },
    { src: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=3540&q=80", alt: "Dynamic Profile" }
  ];

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipeVelocity = Math.abs(velocity.x);
    if (offset.x < -100 || (velocity.x < -500 && swipeVelocity > 50)) {
      setIndex((prev) => Math.min(prev + 1, images.length - 1));
    } else if (offset.x > 100 || (velocity.x > 500 && swipeVelocity > 50)) {
      setIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-base">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.02] via-transparent to-transparent -z-10" />
      
      <div className="text-center mb-12 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-4">
           <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
           <span className="text-primary font-mono text-[10px] tracking-widest uppercase">Gallery</span>
           <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/20" />
        </div>
        <h2 className="font-display italic font-light text-text text-3xl md:text-6xl tracking-tight mb-4 drop-shadow-lg">
          Visual Symphony.
        </h2>
      </div>

      <div className="relative w-full max-w-[100vw] overflow-hidden flex items-center min-h-[40vh] md:min-h-[70vh] cursor-grab active:cursor-grabbing px-4 md:px-12">
        <motion.div
           animate={{ x: `-${index * 100}%` }}
           transition={{ type: "spring", stiffness: 300, damping: 30 }}
           className="flex w-full h-[50vh] md:h-[70vh]"
           drag="x"
           dragConstraints={{ left: 0, right: 0 }}
           dragElastic={0.2}
           onDragEnd={handleDragEnd}
           style={{ touchAction: "none" }}
        >
          {images.map((img, i) => (
             <div key={i} className="flex-[0_0_100%] h-full relative px-2">
               <div className="w-full h-full relative rounded-[40px] overflow-hidden glass border border-white/5 group hover:border-white/10 transition-colors duration-500 shadow-2xl">
                 <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                    referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 md:p-12 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                   <h3 className="text-2xl md:text-3xl font-display italic font-light tracking-wide text-white drop-shadow-md relative translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.alt}</h3>
                 </div>
               </div>
             </div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-12">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === i ? "bg-primary w-12 shadow-[0_0_15px_rgba(255,99,33,0.8)]" : "bg-white/20 w-4 hover:bg-white/50 hover:w-6"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function PricingSection() {
  const tiers = [
    {
      name: "Pre-Owned",
      price: "₹3.23 Cr+",
      desc: "Subject to condition & mileage",
      features: ["Verified McLaren history", "Thorough inspection", "Immediate delivery"],
      highlight: false
    },
    {
      name: "Coupe",
      price: "₹4.40 Cr+",
      desc: "Starting price ex-showroom",
      features: ["Carbon Fibre Monocage II", "Fixed rigid roof", "Purest aero profile"],
      highlight: true
    },
    {
      name: "Spider",
      price: "₹4.77 Cr+",
      desc: "Starting price ex-showroom",
      features: ["Carbon Fibre Monocage II-S", "Retractable hard top", "Open-air exhilaration"],
      highlight: false
    }
  ];

  return (
    <section className="py-24 md:py-40 relative">
      <div className="absolute inset-0 bg-base -z-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-base to-base -z-10" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="text-center mb-24 flex flex-col items-center">
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="flex items-center gap-4 mb-6"
           >
             <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-white/30" />
             <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">Pricing Models</span>
             <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-white/30" />
           </motion.div>
           <motion.h2 
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display italic font-light text-4xl md:text-7xl mb-4 md:mb-6 text-text"
          >
            Own the Apex.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-text/50 text-base md:text-xl font-light tracking-wide max-w-[250px] md:max-w-none mx-auto"
          >
            Explore ownership configurations for the Indian market.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, idx) => (
             <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10 }}
              className={`p-10 glass rounded-3xl relative overflow-hidden flex flex-col border transition-colors duration-500 ${
                tier.highlight 
                  ? 'border-primary/40 shadow-[0_40px_80px_rgba(255,99,33,0.15)] bg-white/[0.03]' 
                  : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />
              )}
              
              <div className="mb-10">
                <p className="text-text/40 text-xs uppercase tracking-[0.2em] font-bold mb-4">{tier.name}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="font-display italic text-3xl md:text-4xl lg:text-5xl font-light text-text tracking-tight">{tier.price}</h3>
                </div>
                <p className="text-text/50 text-sm mt-4 font-light tracking-wide">{tier.desc}</p>
              </div>

              <ul className="space-y-6 mb-12 flex-grow">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-4 text-text/80 text-sm font-light tracking-wide">
                    <div className={`w-2 h-2 rounded-full ${tier.highlight ? 'bg-primary shadow-[0_0_10px_rgba(255,99,33,0.8)]' : 'bg-white/20'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <MagneticButton>
                <button className={`w-full py-5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-xl ${
                  tier.highlight 
                    ? 'bg-primary text-black hover:bg-orange-500 shadow-[0_0_20px_rgba(255,99,33,0.3)]' 
                    : 'bg-transparent text-text border border-white/20 hover:bg-white/5'
                }`}>
                  Enquire Now
                </button>
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  return (
    <section className="relative py-24 md:py-40 overflow-hidden border-t border-white/10 bg-base">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-base to-base z-0 pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display italic text-4xl md:text-8xl font-light tracking-tighter mb-8 md:mb-12 text-text"
        >
          Ready to experience the <br className="md:hidden" /><span className="neon-glow text-primary font-bold">extraordinary?</span>
        </motion.h2>
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
           className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16"
        >
          <MagneticButton>
            <button className="px-10 py-5 rounded-full bg-primary text-black font-bold tracking-[0.2em] uppercase text-xs transition-shadow duration-500 shadow-[0_0_30px_rgba(255,99,33,0.3)] hover:shadow-[0_0_50px_rgba(255,99,33,0.6)]">
              Configure Your 720S
            </button>
          </MagneticButton>
          <MagneticButton>
            <button onClick={() => setIsModalOpen(true)} className="px-10 py-5 rounded-full bg-transparent text-text font-bold tracking-[0.2em] uppercase text-xs border border-white/20 hover:bg-white/10 transition-colors glass">
              Contact Dealership
            </button>
          </MagneticButton>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass bg-base/80 border border-white/10 rounded-3xl p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(255,99,33,0.1)] text-left"
            >
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="absolute top-6 right-6 text-text/50 hover:text-text transition-colors"
                aria-label="Close modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <div className="mb-8">
                <span className="text-primary font-mono text-[10px] tracking-widest uppercase mb-2 block">Direct Access</span>
                <h3 className="font-display italic text-3xl font-light text-text mb-2 tracking-tight">Request Contact</h3>
                <p className="text-text/60 text-sm font-light tracking-wide">Enter your details below. A McLaren specialist will reach out to you shortly.</p>
              </div>
              
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-text/50 font-bold mb-2 block">Full Name</label>
                  <input type="text" required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-text focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all shadow-inner" placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-text/50 font-bold mb-2 block">Email Address</label>
                  <input type="email" required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-text focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all shadow-inner" placeholder="Enter your email" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.2em] text-text/50 font-bold mb-2 block">Phone Number</label>
                  <input type="tel" required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-text focus:outline-none focus:border-primary/50 focus:bg-white/5 transition-all shadow-inner" placeholder="+91 00000 00000" />
                </div>
                <button type="submit" className="mt-4 w-full py-4 rounded-xl bg-primary text-black font-bold tracking-[0.2em] uppercase text-[11px] transition-all hover:bg-orange-500 shadow-[0_0_20px_rgba(255,99,33,0.3)] hover:shadow-[0_0_30px_rgba(255,99,33,0.5)]">
                  Submit Request
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-4 rounded-full glass bg-base/90 border border-primary/30 shadow-[0_0_30px_rgba(255,99,33,0.2)]"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-text font-light text-sm tracking-wide">Request received. A specialist will contact you soon.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
