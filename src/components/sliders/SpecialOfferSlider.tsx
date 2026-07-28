import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flame, Timer, ShoppingBag, Eye, Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface SpecialOfferSliderProps {
  products: Product[];
  onNavigateProduct: (productId: string) => void;
}

export const SpecialOfferSlider: React.FC<SpecialOfferSliderProps> = ({ products, onNavigateProduct }) => {
  const { addToCart, setQuickViewProduct, toggleWishlist, isInWishlist } = useCart();
  const specialProducts = products.filter(p => p.isSpecialOffer);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 42, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  if (!specialProducts.length) return null;

  return (
    <div className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 rounded-3xl p-5 md:p-7 shadow-xl my-6 text-white relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-6 border-b border-white/15 pb-4">
        {/* Left Side: Header Title & Timer */}
        <div className="lg:col-span-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Flame className="w-7 h-7 text-amber-300 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  فرصت محدود
                </span>
                <span className="text-xs text-rose-100 font-medium">تخفیف‌های استثنایی آموزکو</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white mt-0.5">
                پیشنهادهای شگفت‌انگیز روز
              </h2>
            </div>
          </div>

          {/* Timer Box */}
          <div className="flex items-center gap-2 bg-slate-950/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <Timer className="w-5 h-5 text-amber-400" />
            <div className="flex items-center gap-1 font-mono text-base md:text-lg font-bold">
              <span className="bg-white/20 px-2 py-0.5 rounded-md min-w-[32px] text-center">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-md min-w-[32px] text-center">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md min-w-[32px] text-center font-black">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="lg:col-span-4 flex items-center justify-end gap-2">
          <button
            onClick={() => handleScroll('right')}
            className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
            aria-label="Previous"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll('left')}
            className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
            aria-label="Next"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Slider Items */}
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-5 overflow-x-auto no-scrollbar scroll-smooth py-2"
      >
        {specialProducts.map(product => {
          const discountVal = product.discountPercent || 15;
          const soldPercentage = Math.min(85, Math.floor(((20 - product.stock) / 20) * 100));

          return (
            <motion.div
              key={product.id}
              whileHover={{ y: -4 }}
              className="min-w-[270px] max-w-[290px] bg-white rounded-2xl text-slate-800 p-4 shadow-lg border border-slate-100 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Discount Tag */}
              <div className="absolute top-3 right-3 z-10 bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-full shadow-md animate-pulse">
                {discountVal}٪ تخفیف
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-3 left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isInWishlist(product.id)
                    ? 'bg-red-50 text-red-600'
                    : 'bg-slate-100/80 hover:bg-red-50 text-slate-500 hover:text-red-500'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-600' : ''}`} />
              </button>

              {/* Product Image */}
              <div
                onClick={() => onNavigateProduct(product.id)}
                className="relative aspect-4/3 rounded-xl overflow-hidden mb-3 bg-slate-50 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Title & Info */}
              <div>
                <span className="text-[11px] text-sky-600 font-semibold bg-sky-50 px-2 py-0.5 rounded-md">
                  {product.category}
                </span>

                <h3
                  onClick={() => onNavigateProduct(product.id)}
                  className="text-sm font-bold text-slate-800 hover:text-sky-600 line-clamp-2 mt-2 leading-snug cursor-pointer transition-colors"
                >
                  {product.title}
                </h3>

                {/* Star rating */}
                <div className="flex items-center gap-1 mt-2 text-xs text-amber-500 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 text-[11px]">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Stock Progress Bar */}
              <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold text-slate-600">
                  <span>فقط {product.stock} عدد در انبار</span>
                  <span className="text-red-600 font-extrabold">{soldPercentage}٪ فروش رفته</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full"
                    style={{ width: `${soldPercentage}%` }}
                  />
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  {product.originalPrice && (
                    <span className="block text-xs text-slate-400 line-through">
                      {product.originalPrice.toLocaleString('fa-IR')}
                    </span>
                  )}
                  <div className="text-base font-black text-slate-900 flex items-baseline gap-1">
                    <span>{product.price.toLocaleString('fa-IR')}</span>
                    <span className="text-[11px] font-normal text-slate-500">تومان</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                    title="مشاهده سریع"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="w-9 h-9 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center justify-center shadow-md font-bold transition-all hover:scale-105 cursor-pointer"
                    title="افزودن به سبد خرید"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
