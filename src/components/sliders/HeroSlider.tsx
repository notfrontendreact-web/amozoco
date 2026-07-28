import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, ArrowLeft, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { HeroSlide } from '../../types';

interface HeroSliderProps {
  slides: HeroSlide[];
  onNavigate?: (path: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ slides, onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const slide = slides[currentIndex] || slides[0];

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % slides.length);
  };

  return (
    <div 
      className="relative w-full overflow-hidden rounded-3xl bg-slate-900 shadow-2xl my-4 border border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`relative min-h-[360px] md:min-h-[460px] lg:min-h-[500px] flex items-center bg-gradient-to-r ${slide.bgGradient} p-6 md:p-12 text-white overflow-hidden`}
        >
          {/* Background Decorative Pattern & Light effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_70%)] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full z-10 max-w-7xl mx-auto">
            {/* Text Side */}
            <div className="lg:col-span-7 space-y-4 md:space-y-6 text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs md:text-sm font-medium backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>{slide.badge}</span>
                {slide.discountBadge && (
                  <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full mr-2">
                    {slide.discountBadge}
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight text-white tracking-tight">
                {slide.title}
              </h1>

              <p className="text-slate-300 text-sm md:text-lg leading-relaxed font-light max-w-2xl">
                {slide.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate && onNavigate(slide.buttonLink)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>{slide.buttonText}</span>
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="hidden sm:flex items-center gap-4 text-xs text-slate-300 border-r border-slate-700/60 pr-4 mr-2">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>تضمین اصالت آموزکو</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>تحویل ۲۴ ساعته</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <div className="relative w-full max-w-md aspect-4/3 md:aspect-16/10 lg:aspect-4/3 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
                <img
                  src={slide.image}
                  alt={slide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  آماده ارسال از انبار مرکزی
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <button
        onClick={handlePrev}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-950/60 hover:bg-slate-950/90 border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 cursor-pointer shadow-lg"
        aria-label="Previous Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-slate-950/60 hover:bg-slate-950/90 border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-110 cursor-pointer shadow-lg"
        aria-label="Next Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-4 right-1/2 translate-x-1/2 z-20 flex items-center gap-2 bg-slate-950/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              idx === currentIndex ? 'w-8 bg-amber-400' : 'w-2.5 bg-slate-600 hover:bg-slate-400'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
