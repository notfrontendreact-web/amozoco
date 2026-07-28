import React from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingBag, Eye, Heart, Check } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onNavigateProduct: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigateProduct }) => {
  const { addToCart, setQuickViewProduct, toggleWishlist, isInWishlist, cart } = useCart();
  const inCart = cart.some(item => item.product.id === product.id);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-sky-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full relative"
    >
      {/* Badges Overlay */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1 items-start">
        {product.discountPercent && (
          <span className="bg-red-500 text-white font-bold text-[11px] px-2 py-0.5 rounded-full shadow-sm">
            {product.discountPercent}٪ تخفیف
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-emerald-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-sm">
            جدید
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product)}
        className={`absolute top-3 left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
          isInWishlist(product.id)
            ? 'bg-red-50 text-red-500'
            : 'bg-slate-100/80 hover:bg-red-50 text-slate-400 hover:text-red-500'
        }`}
        aria-label="Wishlist"
      >
        <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-500' : ''}`} />
      </button>

      {/* Product Thumbnail */}
      <div
        onClick={() => onNavigateProduct(product.id)}
        className="relative aspect-4/3 rounded-xl overflow-hidden mb-3 bg-slate-50 cursor-pointer group-hover:bg-sky-50/50 transition-colors"
      >
        <img
          src={product.image}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="text-sky-600 font-semibold">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3
            onClick={() => onNavigateProduct(product.id)}
            className="text-sm font-bold text-slate-800 hover:text-sky-600 line-clamp-2 leading-snug cursor-pointer transition-colors"
          >
            {product.title}
          </h3>
        </div>

        {/* Price & Cart Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            {product.originalPrice && (
              <span className="block text-[11px] text-slate-400 line-through">
                {product.originalPrice.toLocaleString('fa-IR')}
              </span>
            )}
            <div className="text-sm md:text-base font-black text-slate-900 flex items-baseline gap-1">
              <span>{product.price.toLocaleString('fa-IR')}</span>
              <span className="text-[10px] font-normal text-slate-500">تومان</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setQuickViewProduct(product)}
              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              title="مشاهده سریع"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={() => addToCart(product, 1)}
              className={`h-8 px-2.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                inCart
                  ? 'bg-emerald-600 text-white'
                  : 'bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20'
              }`}
            >
              {inCart ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>در سبد</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>خرید</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
