'use client';

import { useState, useEffect, useRef } from 'react';

interface WorkGalleryProps {
  images: string[];
}

export const WorkGallery = ({ images }: WorkGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(1000);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragRef = useRef({ active: false, startX: 0 });

  const getImageSrc = (index: number) => {
    if (!images.length) return '';
    return images[((index % images.length) + images.length) % images.length];
  };

  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setActiveIndex(prev => prev + 1);
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragRef.current = { active: true, startX: e.clientX };
    setDragOffset(0);
    stopAutoPlay();
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    setDragOffset(e.clientX - dragRef.current.startX);
  };

  const handlePointerUp = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;

    if (dragOffset < -100) {
      setActiveIndex(prev => prev + 1);
    } else if (dragOffset > 100) {
      setActiveIndex(prev => prev - 1);
    }

    setDragOffset(0);
    startAutoPlay();
  };

  const visibleIndices = Array.from({ length: 5 }, (_, i) => activeIndex - 2 + i);

  const getSlideStyle = (index: number): React.CSSProperties => {
    const offset = index - activeIndex + dragOffset / 600;
    const absOffset = Math.abs(offset);
    const scale = Math.max(0.85, 1 - absOffset * 0.15);
    const opacity = Math.max(0, 1 - absOffset * 0.4);
    const zIndex = Math.max(0, 10 - Math.round(absOffset * 10));
    const yShift = absOffset * 4;

    return {
      left: `${50 + offset * 70}%`,
      top: '50%',
      transform: `translate(-50%, calc(-50% + ${yShift}%)) scale(${scale})`,
      opacity: opacity < 0.1 ? 0 : opacity,
      zIndex,
      willChange: 'left, transform, opacity',
      transition: dragRef.current.active
        ? 'none'
        : 'left 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out',
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative margin-top w-full h-[90dvh] overflow-hidden flex-center cursor-grab active:cursor-grabbing select-none touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {visibleIndices.map((index) => (
        <div
          key={index}
          className="absolute w-[65%] h-[85%]"
          style={getSlideStyle(index)}
        >
          <img
            src={getImageSrc(index)}
            alt="Gallery item"
            className="w-full h-full object-cover rounded-3xl shadow-2xl pointer-events-none"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
};
