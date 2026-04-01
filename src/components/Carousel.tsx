import { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  title: string;
  images: string[];
}

export default function Carousel({ title, images }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-[#1b1b1b]">{title}</h3>
          <div className="w-12 h-1 bg-[#b60059] rounded-full"></div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
            aria-label="Próximo"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((src, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.02 }}
            className="flex-shrink-0 w-64 md:w-72 aspect-[4/5] rounded-xl overflow-hidden shadow-md snap-start bg-gray-100"
          >
            <img 
              src={src} 
              alt={`${title} ${index + 1}`} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
