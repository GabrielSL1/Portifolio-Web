'use client';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { getRelativeTimeString } from './../../../../utils/get-relative-time';

export type Tech = {
  icon: ReactNode;
  name: string;
  startDate: string;
};

type KnowTechProps = {
  techs: Tech[];
};

export const KnowTechs = ({ techs }: KnowTechProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const GAP = 16;

  const getCardsPerView = () => (window.innerWidth < 640 ? 1 : 3);

  const calculateSlideWidth = (containerWidth: number) => {
    const perView = getCardsPerView();
    return (containerWidth - GAP * (perView - 1)) / perView;
  };

  const [slideWidth, setSlideWidth] = useState(0);
  const [sidePadding, setSidePadding] = useState(0);

  useEffect(() => {
    const updateSizes = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      const sw = calculateSlideWidth(width);
      const pad = (width - sw) / 2;
      setSlideWidth(sw);
      setSidePadding(pad);
      setActiveIndex(prev => Math.min(prev, techs.length - getCardsPerView()));
    };
    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, [techs.length]);

  const nextSlide = () => setActiveIndex(prev => Math.min(prev + 1, techs.length - getCardsPerView()));
  const prevSlide = () => setActiveIndex(prev => Math.max(prev - 1, 0));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [techs.length]);

  let startX: number;
  let isDragging = false;
  const onTouchStart = (e: React.TouchEvent) => { startX = e.touches[0].clientX; isDragging = true; };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - startX;
    if (delta > 50) { prevSlide(); isDragging = false; }
    if (delta < -50) { nextSlide(); isDragging = false; }
  };
  const onTouchEnd = () => { isDragging = false; };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-visible py-8">
      {/* Setas de navegação */}
      <button
        onClick={prevSlide}
        disabled={activeIndex === 0}
        className={`absolute left-[-64px] top-1/2 transform -translate-y-1/2 z-20 bg-gray-800/80 text-white rounded-full p-3 transition-opacity ${activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-100'}`}
      >⟨</button>
      <button
        onClick={nextSlide}
        disabled={activeIndex >= techs.length - getCardsPerView()}
        className={`absolute right-[-64px] top-1/2 transform -translate-y-1/2 z-20 bg-gray-800/80 text-white rounded-full p-3 transition-opacity ${activeIndex >= techs.length - getCardsPerView() ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-100'}`}
      >⟩</button>

      {/* Carrossel centralizado */}
      <div
        className="overflow-hidden"
        ref={containerRef}
        style={{ paddingLeft: sidePadding, paddingRight: sidePadding }}
      >
        <div
          className="flex items-center transition-transform duration-500"
          style={{ transform: `translateX(-${activeIndex * (slideWidth + GAP)}px)` }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {techs.map((tech, index) => {
            const relativeTime = getRelativeTimeString(new Date(tech.startDate), 'pt-BR').replace('há', '');
            const offset = index - activeIndex;
            const scale = offset === 0 ? 1 : 0.85;
            const rotateY = offset * 10;
            const opacity = offset === 0 ? 1 : 0.6;

            return (
              <div
                key={tech.name}
                className="flex-shrink-0 p-6 bg-gray-800 text-white rounded-2xl shadow-xl flex flex-col justify-center"
                style={{
                  width: slideWidth,
                  transform: `perspective(800px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  transition: 'all 0.5s ease',
                  marginRight: `${GAP}px`,
                }}
              >
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-xl truncate">{tech.name}</p>
                  {tech.icon}
                </div>
                <span className="text-sm text-gray-300">{relativeTime} de experiência</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center mt-4 space-x-2">
        {techs.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-3 h-3 rounded-full ${idx === activeIndex ? 'bg-white' : 'bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  );
};
