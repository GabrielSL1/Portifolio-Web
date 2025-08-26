'use client';
import { ReactNode, useState, useLayoutEffect, useRef } from 'react';
import { getRelativeTimeString } from './../../../../utils/get-relative-time';

type Tech = {
  icon: ReactNode;
  name: string;
  startDate: string;
  color?: string;
  backgroundColor?: string;
};

type KnowTechProps = {
  techs: Tech[];
};

export const KnowTechs = ({ techs }: KnowTechProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Breakpoints + gap dinâmico
  const getCardsPerView = () => {
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 768) return 2;
    return 3;
  };
  const getGap = () => (window.innerWidth < 640 ? 8 : 16);

  const [slideWidth, setSlideWidth] = useState(0);
  const [sidePadding, setSidePadding] = useState(0);

  // Calcular largura de slide e padding correto
  useLayoutEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const gap = getGap();
      const perView = getCardsPerView();
      const totalWidth = containerRef.current.offsetWidth;

      // largura de cada card
      const sw = (totalWidth - gap * (perView - 1)) / perView;
      setSlideWidth(sw);

      // largura do grupo visível
      const groupW = perView * sw + gap * (perView - 1);
      // padding para centralizar o grupo
      const pad = (totalWidth - groupW) / 2;
      setSidePadding(pad);

      // ajustar índice se estourar
      setActiveIndex(prev => Math.min(prev, techs.length - perView));
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [techs.length]);

  const next = () => setActiveIndex(i => Math.min(i + 1, techs.length - getCardsPerView()));
  const prev = () => setActiveIndex(i => Math.max(i - 1, 0));

  // teclado
  useLayoutEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [techs.length]);

  // touch
  let startX = 0;
  let dragging = false;
  const onStart = (e: React.TouchEvent) => { startX = e.touches[0].clientX; dragging = true; };
  const onMove = (e: React.TouchEvent) => {
    if (!dragging) return;
    const delta = e.touches[0].clientX - startX;
    if (delta > 50) { prev(); dragging = false; }
    if (delta < -50) { next(); dragging = false; }
  };
  const onEnd = () => { dragging = false; };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-visible py-8 md:768px lg: 1024px xl:1280px sm:'640px" >
      <button
        onClick={prev}
        disabled={activeIndex === 0}
        className={`absolute left-[-48px] top-1/2 transform -translate-y-1/2 z-20 bg-gray-800/80 text-white rounded-full p-2 transition-opacity ${activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-100'}`}
      >⟨</button>
      <button
        onClick={next}
        disabled={activeIndex >= techs.length - getCardsPerView()}
        className={`absolute right-[-48px] top-1/2 transform -translate-y-1/2 z-20 bg-gray-800/80 text-white rounded-full p-2 transition-opacity ${activeIndex >= techs.length - getCardsPerView() ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-100'}`}
      >⟩</button>

      <div
        ref={containerRef}
        className="overflow-hidden"
        style={{ paddingLeft: sidePadding, paddingRight: sidePadding }}
      >
        <div
          className="flex items-center transition-transform duration-500"
          style={{ transform: `translateX(-${activeIndex * (slideWidth + getGap())}px)` }}
          onTouchStart={onStart}
          onTouchMove={onMove}
          onTouchEnd={onEnd}
        >
          {techs.map((tech, idx) => {
            const rel = getRelativeTimeString(new Date(tech.startDate), 'pt-BR').replace('há', '');
            const offset = idx - activeIndex;
            const scale = offset === 0 ? 1 : 0.85;
            const rotateY = offset * 10;
            const opacity = offset === 0 ? 1 : 0.6;

            return (
              <div
                key={`${tech.name}-${idx}`}
                className="flex-shrink-0 p-6 rounded-2xl shadow-xl flex flex-col justify-center"
                style={{
                  width: slideWidth,
                  transform: `perspective(800px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  transition: 'all 0.5s ease',
                  marginRight: `${getGap()}px`,
                  backgroundColor: tech.backgroundColor || '#1F2937',
                  color: tech.color || '#FFFFFF',
                }}
              >
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-xl truncate">{tech.name}</p>
                  {tech.icon}
                </div>
                <span className="text-sm text-gray-300">{rel} de experiência</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {techs.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-3 h-3 rounded-full ${i === activeIndex ? 'bg-white' : 'bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  );
};
