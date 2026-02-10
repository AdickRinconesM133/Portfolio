'use client';

import { useState, useEffect, useRef } from 'react';
import type { GalleryItem } from '@/app/data/works';
import { ScrollCardReveal } from '@/app/components';

interface WorkGalleryProps {
  slug: string;
}

export const WorkGallery = ({ slug }: WorkGalleryProps) => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(1000);
  const [dragOffset, setDragOffset] = useState(0);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragRef = useRef({ active: false, startX: 0 });
  const dragDistanceRef = useRef(0);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch(`/api/gallery?folder=${encodeURIComponent(slug)}`);
        const data: { items?: GalleryItem[] } = await res.json();
        if (data.items) setItems(data.items);
      } catch (err) {
        console.error('Error fetching gallery:', err);
      }
    }
    fetchGallery();
  }, [slug]);

  const getItem = (index: number): GalleryItem | undefined => {
    if (!items.length) return undefined;
    return items[((index % items.length) + items.length) % items.length];
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
    if (items.length > 0) startAutoPlay();
    return stopAutoPlay;
  }, [items]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (index === activeIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    dragRef.current = { active: true, startX: e.clientX };
    dragDistanceRef.current = 0;
    setDragOffset(0);
    stopAutoPlay();
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const offset = e.clientX - dragRef.current.startX;
    setDragOffset(offset);
    dragDistanceRef.current = Math.abs(offset);
  };

  const handlePointerUp = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;

    if (dragOffset < -100) {
      setActiveIndex(prev => prev + 1);
    } else if (dragOffset > 100) {
      setActiveIndex(prev => prev - 1);
    } else if (dragDistanceRef.current < 10) {
      const item = getItem(activeIndex);
      if (item) {
        setSelectedItem(item);
        stopAutoPlay();
        setDragOffset(0);
        return;
      }
    }

    setDragOffset(0);
    startAutoPlay();
  };

  const setVideoRef = (index: number, el: HTMLVideoElement | null) => {
    if (el) {
      videoRefs.current.set(index, el);
    } else {
      videoRefs.current.delete(index);
    }
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    startAutoPlay();
  };

  useEffect(() => {
    if (!selectedItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
        startAutoPlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  const visibleIndices = Array.from({ length: 5 }, (_, i) => activeIndex - 2 + i);

  const getSlideStyle = (index: number): React.CSSProperties => {
    const dragDivisor = typeof window !== 'undefined' ? window.innerWidth * 0.4 : 600;
    const offset = index - activeIndex + dragOffset / dragDivisor;
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

  const renderItem = (item: GalleryItem, index: number) => {
    if (item.type === 'video') {
      return (
        <video
          ref={(el) => setVideoRef(index, el)}
          className="w-full h-full object-contain md:object-cover rounded-3xl shadow-2xl pointer-events-none"
          muted
          autoPlay={index === activeIndex}
          loop
          playsInline
          draggable={false}
        >
          <source src={item.url} />
        </video>
      );
    }

    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={item.url}
        alt="Gallery item"
        className="w-full h-full object-contain md:object-cover rounded-3xl shadow-2xl pointer-events-none"
        draggable={false}
      />
    );
  };

  if (!items.length) return null;

  return (
    <>
      <ScrollCardReveal start="top 95%" end="top 65%">
        <div
          ref={containerRef}
          className="relative margin-top w-full h-[60lvh] md:h-[90lvh] overflow-hidden flex-center md:cursor-grab md:active:cursor-grabbing select-none md:touch-none pb-[15lvh] lg:pb-0"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* eslint-disable-next-line react-hooks/refs */}
          {visibleIndices.map((index) => {
            const item = getItem(index);
            if (!item) return null;

            return (
              <div
                key={index}
                className="absolute w-[85%] md:w-[65%] h-[85%]"
                style={getSlideStyle(index)}
              >
                {renderItem(item, index)}
              </div>
            );
          })}
        </div>
      </ScrollCardReveal>

      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery lightbox"
          className="fixed inset-0 z-[110] p-2 md:p-[2dvw] cursor-pointer"
          onClick={closeLightbox}
        >
          <div className="w-full h-full rounded-[24px] bg-background/40 backdrop-blur-2xl flex-center overflow-hidden">
            {selectedItem.type === 'video' ? (
              <video
                className="w-full h-full object-contain"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={selectedItem.url} />
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={selectedItem.url}
                alt="Gallery item fullscreen"
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
