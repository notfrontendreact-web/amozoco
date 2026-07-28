import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, Sparkles, ArrowLeft } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../product/ProductCard';

interface ProductCarouselSliderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeBg?: string;
  products: Product[];
  onNavigateProduct: (productId: string) => void;
  onSeeAll?: () => void;
}

export const ProductCarouselSlider: React.FC<ProductCarouselSliderProps> = ({
  title,
  subtitle,
  badge,
  badgeBg = 'bg-sky-100 text-sky-800',
  products,
  onNavigateProduct,
  onSeeAll
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl p-5 md:p-7 shadow-sm border border-slate-200/80 my-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {badge && (
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${badgeBg}`}>
                {badge}
              </span>
            )}
            <span className="text-xs text-slate-500 font-medium">{subtitle || 'تضمین کیفیت و اصالت کالا'}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {onSeeAll && (
            <button
              onClick={onSeeAll}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <span>مشاهده همه</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleScroll('right')}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous Products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('left')}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next Products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-5 overflow-x-auto no-scrollbar scroll-smooth py-2"
      >
        {products.map(product => (
          <div key={product.id} className="min-w-[260px] max-w-[280px]">
            <ProductCard product={product} onNavigateProduct={onNavigateProduct} />
          </div>
        ))}
      </div>
    </div>
  );
};
