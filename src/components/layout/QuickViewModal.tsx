import React, { useState } from 'react';
import { X, Star, ShoppingBag, ShieldCheck, Truck, Check, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const images = product.images?.length ? product.images : [product.image];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 relative shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Gallery */}
          <div className="md:col-span-5 space-y-3">
            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 relative">
              <img
                src={images[activeImageIndex]}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-sky-600 scale-105' : 'border-slate-200 opacity-70'
                    }`}
                  >
                    <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md">
                {product.category}
              </span>
              <h2 className="text-lg md:text-xl font-black text-slate-900 mt-2 leading-snug">
                {product.title}
              </h2>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span>({product.reviewsCount} دیدگاه)</span>
                </div>
                <span>•</span>
                <span>کد کالا: {product.sku}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              {product.shortDescription}
            </p>

            {/* Price Box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="block text-xs text-slate-400">قیمت آموزکو:</span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {product.originalPrice.toLocaleString('fa-IR')}
                  </span>
                )}
                <div className="text-xl font-black text-slate-900 flex items-baseline gap-1">
                  <span>{product.price.toLocaleString('fa-IR')}</span>
                  <span className="text-xs font-normal text-slate-500">تومان</span>
                </div>
              </div>

              <div className="text-left text-xs text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl">
                <Check className="w-4 h-4" />
                <span>موجود در انبار ({product.stock} عدد)</span>
              </div>
            </div>

            {/* Options */}
            {product.options && product.options.map((opt, i) => (
              <div key={i} className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">{opt.name}:</label>
                <div className="flex flex-wrap gap-2">
                  {opt.values.map(val => (
                    <button
                      key={val}
                      onClick={() => setSelectedOption(val)}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        selectedOption === val
                          ? 'border-sky-600 bg-sky-50 text-sky-700 font-bold'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Add to Cart Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  addToCart(product, 1, undefined, selectedOption);
                  setQuickViewProduct(null);
                }}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-black text-sm shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>افزودن سریع به سبد خرید</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-colors cursor-pointer ${
                  isInWishlist(product.id) ? 'border-red-300 bg-red-50 text-red-500' : 'border-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
