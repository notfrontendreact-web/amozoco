import React from 'react';
import { HeroSlider } from '../components/sliders/HeroSlider';
import { CategoryStorySlider } from '../components/sliders/CategoryStorySlider';
import { SpecialOfferSlider } from '../components/sliders/SpecialOfferSlider';
import { ProductCarouselSlider } from '../components/sliders/ProductCarouselSlider';
import { BrandLogoSlider } from '../components/sliders/BrandLogoSlider';
import { VideoShowcaseSlider } from '../components/sliders/VideoShowcaseSlider';
import { TestimonialSlider } from '../components/sliders/TestimonialSlider';
import { PRODUCTS, CATEGORIES, HERO_SLIDES, BRANDS, VIDEO_SHOWCASES, TESTIMONIALS } from '../data/mockData';
import { ArrowLeft, Bot, MonitorPlay, Printer, ShieldCheck, Truck, Clock, Headphones, Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const newArrivals = PRODUCTS.filter(p => p.isNewArrival || p.stock > 10);
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller || p.rating >= 4.7);

  const handleSelectCategory = (slug: string) => {
    if (slug) {
      onNavigate(`/shop?category=${slug}`);
    } else {
      onNavigate('/shop');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-2 space-y-8">
      {/* 1. Hero Main Slider */}
      <HeroSlider slides={HERO_SLIDES} onNavigate={onNavigate} />

      {/* 2. Instagram-Style Stories Categories Slider */}
      <CategoryStorySlider
        categories={CATEGORIES}
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. Flash Sale / Special Offer Countdown Slider */}
      <SpecialOfferSlider
        products={PRODUCTS}
        onNavigateProduct={id => onNavigate(`/product/${id}`)}
      />

      {/* 4. Two Column Promo Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
        <div 
          onClick={() => onNavigate('/shop?category=رباتیک-و-الکترونیک')}
          className="relative rounded-3xl overflow-hidden min-h-[200px] bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-6 text-white border border-blue-800/40 shadow-md group cursor-pointer flex flex-col justify-between"
        >
          <div className="relative z-10 space-y-2 max-w-xs">
            <span className="text-xs font-bold text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
              تخفیف ویژه جشنواره
            </span>
            <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors">
              کیت‌های جامع رباتیک و کدنویسی آموزکو
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              شامل برد آردوینو، سنسورهای کاربردی و کتاب آموزشی ۱۲۰ صفحه‌ای
            </p>
          </div>
          <div className="relative z-10 pt-4 flex items-center gap-2 text-xs font-bold text-amber-400">
            <span>بررسی و خرید</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </div>
          <img
            src="https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=600&q=80"
            alt="Robotics"
            referrerPolicy="no-referrer"
            className="absolute top-0 left-0 w-1/2 h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div 
          onClick={() => onNavigate('/shop?category=تجهیزات-آموزشی')}
          className="relative rounded-3xl overflow-hidden min-h-[200px] bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-6 text-white border border-emerald-800/40 shadow-md group cursor-pointer flex flex-col justify-between"
        >
          <div className="relative z-10 space-y-2 max-w-xs">
            <span className="text-xs font-bold text-emerald-300 bg-emerald-400/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
              ویژه مدارس و دانشگاه‌ها
            </span>
            <h3 className="text-xl font-black text-white group-hover:text-emerald-300 transition-colors">
              هوشمندسازی کلاس درس و بردهای لمسی 4K
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              نمایشگرهای لمسی هوشمند با سیستم عامل اندروید و ویندوز
            </p>
          </div>
          <div className="relative z-10 pt-4 flex items-center gap-2 text-xs font-bold text-emerald-400">
            <span>درخواست پیش فاکتور سازمانی</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </div>
          <img
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80"
            alt="Smart Board"
            referrerPolicy="no-referrer"
            className="absolute top-0 left-0 w-1/2 h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* 5. New Arrivals Carousel Slider */}
      <ProductCarouselSlider
        title="جدیدترین تجهیزات و محصولات آموزکو"
        subtitle="تازه رسیده به انبار مرکزی آموزکو"
        badge="جدیدترین‌ها"
        badgeBg="bg-amber-100 text-amber-900"
        products={newArrivals}
        onNavigateProduct={id => onNavigate(`/product/${id}`)}
        onSeeAll={() => onNavigate('/shop?sortBy=newest')}
      />

      {/* 6. Video Showcase Slider */}
      <VideoShowcaseSlider videos={VIDEO_SHOWCASES} />

      {/* 7. Three Column Feature Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
        <div 
          onClick={() => onNavigate('/shop?category=پرینتر-سه-بعدی')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-sky-400 transition-all cursor-pointer flex items-center gap-4 group"
        >
          <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <Printer className="w-7 h-7" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-sky-600 transition-colors">
              پرینتر و اسکنر ۳D
            </h4>
            <p className="text-xs text-slate-500 mt-1">انی‌کیوبیک، فیلامنت PLA و رزین</p>
          </div>
        </div>

        <div 
          onClick={() => onNavigate('/shop?category=ابزارآلات-دقیق')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-amber-400 transition-all cursor-pointer flex items-center gap-4 group"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <MonitorPlay className="w-7 h-7" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-amber-600 transition-colors">
              ابزار سنجش و اندازه گیری
            </h4>
            <p className="text-xs text-slate-500 mt-1">اسیلوسکوپ ریگول و منبع تغذیه</p>
          </div>
        </div>

        <div 
          onClick={() => onNavigate('/shop?category=رباتیک-و-الکترونیک')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:border-emerald-400 transition-all cursor-pointer flex items-center gap-4 group"
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors">
              رباتیک و هوش مصنوعی
            </h4>
            <p className="text-xs text-slate-500 mt-1">بازوی ۶ درجه آزادی و رستبری پای ۵</p>
          </div>
        </div>
      </div>

      {/* 8. Best Sellers Carousel Slider */}
      <ProductCarouselSlider
        title="پرفروش‌ترین کالاها و تجهیزات آموزکو"
        subtitle="انتخاب اول دانشگاه‌ها و مراکز آموزشی"
        badge="پرفروش‌ترین"
        badgeBg="bg-rose-100 text-rose-800"
        products={bestSellers}
        onNavigateProduct={id => onNavigate(`/product/${id}`)}
        onSeeAll={() => onNavigate('/shop?sortBy=popular')}
      />

      {/* 9. Brand Logo Carousel */}
      <BrandLogoSlider brands={BRANDS} />

      {/* 10. Customer Testimonials Slider */}
      <TestimonialSlider testimonials={TESTIMONIALS} />
    </div>
  );
};
