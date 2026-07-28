import React, { useState } from 'react';
import { 
  Star, ShoppingBag, Heart, ShieldCheck, Truck, Check, Eye, 
  RotateCcw, Sparkles, ChevronLeft, ArrowRight, ThumbsUp, MessageSquare 
} from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/product/ProductCard';

interface ProductDetailPageProps {
  productId: string;
  onNavigateProduct: (productId: string) => void;
  onNavigateBack: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onNavigateProduct,
  onNavigateBack
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const product = PRODUCTS.find(p => p.id === productId || p.slug === productId) || PRODUCTS[0];

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'specs' | 'description' | 'reviews'>('description');
  const [quantity, setQuantity] = useState(1);

  const images = product.images?.length ? product.images : [product.image];
  const relatedProducts = PRODUCTS.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Breadcrumb & Back */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <button onClick={onNavigateBack} className="hover:text-sky-600 font-bold flex items-center gap-1 cursor-pointer">
            <ArrowRight className="w-4 h-4" />
            <span>بازگشت</span>
          </button>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-slate-900 font-bold line-clamp-1">{product.title}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Gallery Slider Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 relative group">
            <img
              src={images[activeImgIndex]}
              alt={product.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.discountPercent && (
              <span className="absolute top-4 right-4 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-md">
                {product.discountPercent}٪ تخفیف
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isInWishlist(product.id) ? 'bg-red-50 text-red-500' : 'bg-white/80 hover:bg-white text-slate-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500' : ''}`} />
            </button>
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImgIndex === idx ? 'border-sky-600 ring-2 ring-sky-600/20 scale-105' : 'border-slate-200 opacity-70'
                  }`}
                >
                  <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Column */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="text-xs text-slate-400">شناسه کالا: {product.sku}</span>
            </div>

            <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-snug">
              {product.title}
            </h1>
            {product.titleEn && (
              <p className="text-xs text-slate-400 font-mono mt-1">{product.titleEn}</p>
            )}

            <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span>({product.reviewsCount} دیدگاه تایید شده)</span>
              </div>
              <span>•</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <Check className="w-4 h-4" /> موجود در انبار مرکزی ({product.stock} عدد)
              </span>
            </div>
          </div>

          <p className="text-xs md:text-sm text-slate-600 leading-relaxed text-justify">
            {product.shortDescription}
          </p>

          {/* Product Options */}
          {product.options && product.options.map((opt, i) => (
            <div key={i} className="space-y-2">
              <label className="text-xs font-extrabold text-slate-800">{opt.name}:</label>
              <div className="flex flex-wrap gap-2.5">
                {opt.values.map(val => (
                  <button
                    key={val}
                    onClick={() => setSelectedOption(val)}
                    className={`text-xs px-4 py-2 rounded-xl border transition-all cursor-pointer font-bold ${
                      selectedOption === val
                        ? 'border-sky-600 bg-sky-50 text-sky-700 shadow-sm'
                        : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Pricing & Add to Cart */}
          <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">قیمت نهایی آموزکو:</span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {product.originalPrice.toLocaleString('fa-IR')} تومان
                  </span>
                )}
                <div className="text-2xl font-black text-slate-900 flex items-baseline gap-1">
                  <span>{product.price.toLocaleString('fa-IR')}</span>
                  <span className="text-xs font-normal text-slate-500">تومان</span>
                </div>
              </div>

              {/* Quantity counter */}
              <div className="flex items-center border border-slate-200 rounded-xl bg-white overflow-hidden p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => addToCart(product, quantity, undefined, selectedOption)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>افزودن به سبد خرید</span>
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="p-2 bg-slate-50 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <span className="font-bold block">گارانتی ۱۸ ماهه</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <Truck className="w-5 h-5 text-sky-600 mx-auto mb-1" />
              <span className="font-bold block">تحویل ۲۴ ساعته</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl">
              <RotateCcw className="w-5 h-5 text-amber-600 mx-auto mb-1" />
              <span className="font-bold block">۷ روز ضمانت بازگشت</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specs, Full Description, Reviews */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 cursor-pointer ${activeTab === 'description' ? 'border-b-2 border-sky-600 text-sky-600 font-black' : 'text-slate-500'}`}
          >
            توضیحات و خصوصیات کامل
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 cursor-pointer ${activeTab === 'specs' ? 'border-b-2 border-sky-600 text-sky-600 font-black' : 'text-slate-500'}`}
          >
            جدول مشخصات فنی
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 cursor-pointer ${activeTab === 'reviews' ? 'border-b-2 border-sky-600 text-sky-600 font-black' : 'text-slate-500'}`}
          >
            دیدگاه خریداران ({product.reviewsCount})
          </button>
        </div>

        {activeTab === 'description' && (
          <div className="text-xs md:text-sm text-slate-700 leading-relaxed space-y-3">
            <p>{product.fullDescription}</p>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
            {product.specs.map((spec, i) => (
              <div key={i} className="grid grid-cols-12 p-3.5 text-xs odd:bg-slate-50">
                <span className="col-span-4 font-bold text-slate-800">{spec.title}</span>
                <span className="col-span-8 text-slate-600">{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-xs">نظر خود را ثبت کنید</h4>
                <p className="text-[11px] text-slate-500">تجربه استفاده از این کالا را با دیگر خریداران آموزکو به اشتراک بگذارید.</p>
              </div>
              <button className="bg-sky-600 text-white font-bold text-xs px-4 py-2 rounded-xl">
                ثبت دیدگاه جدید
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-black text-slate-900 text-lg">محصولات مرتبط و مشابه</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} onNavigateProduct={onNavigateProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
