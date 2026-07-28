import React, { useState } from 'react';
import { 
  Search, ShoppingBag, Heart, Phone, MapPin, 
  Menu, X, ChevronDown, Sparkles, Truck, ShieldCheck, 
  HelpCircle, Info, Bot, MonitorPlay, Printer, Cpu, CircuitBoard,
  User, ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CATEGORIES, PRODUCTS } from '../../data/mockData';
import { Product } from '../../types';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const { cartCount, wishlist, setIsCartOpen, setQuickViewProduct } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  // Live search suggestions
  const searchResults: Product[] = searchQuery.trim()
    ? PRODUCTS.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleSelectSearchResult = (product: Product) => {
    setSearchQuery('');
    setIsSearchFocused(false);
    onNavigate(`/product/${product.id}`);
  };

  const navLinks = [
    { label: 'صفحه اصلی', path: '/' },
    { label: 'فروشگاه آنلاین', path: '/shop' },
    { label: 'ارتباط با ما', path: '/contact' },
    { label: 'درباره ما', path: '/about' },
    { label: 'پیگیری سفارش', path: '/track-order' }
  ];

  return (
    <header className="w-full bg-white sticky top-0 z-40 border-b border-slate-200 shadow-sm">
      {/* Top Ticker / Marquee Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 overflow-hidden relative border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold shrink-0">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
            <span>آموزکو: مرجع تخصصی تجهیزات آموزشی، رباتیک و ابزار دقیق</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-slate-300 font-medium">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-sky-400" />
              <span>ارسال رایگان برای خریدهای بالای ۳ میلیون تومان</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>۷ روز ضمانت بازگشت بی‌قیدوشرط</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Phone className="w-3.5 h-3.5" />
              <span>مشاوره تلفنی: ۰۲۱-۸۸۹۹۴۴۰۰</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3.5">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div 
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-sky-600 to-indigo-700 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                AM
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                  آمــوزکــو
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Amouzco Store
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-2xl relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="جستجو در بین +۱۰۰۰ کیت رباتیک، برد هوشمند، پرینتر سه بعدی..."
                className="w-full bg-slate-100/80 focus:bg-white text-slate-800 placeholder-slate-400 text-sm rounded-2xl pr-11 pl-4 py-3 border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all outline-none"
              />
              <Search className="w-5 h-5 text-slate-400 absolute right-4 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Autosuggest Dropdown */}
            {isSearchFocused && searchQuery.trim() !== '' && (
              <div className="absolute top-full right-0 left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 divide-y divide-slate-100">
                <div className="pb-2 text-xs font-bold text-slate-400 px-2 flex justify-between">
                  <span>نتایج پیشنهادی آموزکو</span>
                  <span>{searchResults.length} مورد</span>
                </div>
                {searchResults.length > 0 ? (
                  searchResults.map(p => (
                    <div
                      key={p.id}
                      onMouseDown={() => handleSelectSearchResult(p)}
                      className="py-2.5 px-2 hover:bg-sky-50/80 rounded-xl flex items-center gap-3 cursor-pointer transition-colors"
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-cover rounded-lg border border-slate-200"
                      />
                      <div className="flex-1">
                        <span className="text-xs text-sky-600 font-semibold">{p.category}</span>
                        <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{p.title}</h4>
                        <span className="text-xs font-black text-slate-900 mt-0.5 block">
                          {p.price.toLocaleString('fa-IR')} تومان
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center text-xs text-slate-500">
                    محصولی متناسب با عبارت «{searchQuery}» یافت نشد.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons: Cart, Wishlist, Contact info */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onNavigate('/contact')}
              className="hidden lg:flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4 text-sky-600" />
              <span>ارتباط فوری</span>
            </button>

            <button
              onClick={() => onNavigate('/shop')}
              className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer relative"
              title="علاقه‌مندی‌ها"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center border-2 border-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-2xl font-bold shadow-md shadow-sky-600/20 transition-all hover:scale-105 cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-amber-400 text-slate-950 rounded-full text-[11px] font-black flex items-center justify-center border-2 border-slate-900">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-black">سبد خرید</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="جستجو در محصولات آموزکو..."
              className="w-full bg-slate-100 text-slate-800 text-xs rounded-xl pr-10 pl-4 py-2.5 border border-slate-200 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Navigation Links & Mega Menu Bar */}
      <div className="bg-slate-50 border-t border-slate-200/80 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <nav className="flex items-center gap-1 text-sm font-bold text-slate-700">
            {/* Mega Menu Toggle */}
            <div 
              className="relative py-3 px-3"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button className="flex items-center gap-2 text-sky-700 hover:text-sky-800 font-extrabold bg-sky-100/80 px-3.5 py-1.5 rounded-xl cursor-pointer">
                <Menu className="w-4 h-4" />
                <span>دسته‌بندی کلی محصولات</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Mega Menu Dropdown */}
              {isMegaMenuOpen && (
                <div className="absolute top-full right-0 w-[720px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 z-50 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
                  {CATEGORIES.slice(0, 6).map(cat => (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setIsMegaMenuOpen(false);
                        onNavigate(`/shop?category=${cat.slug}`);
                      }}
                      className="group p-3 rounded-xl hover:bg-sky-50/80 transition-colors cursor-pointer border border-transparent hover:border-sky-200"
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                          <Bot className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-xs group-hover:text-sky-600 transition-colors">
                          {cat.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        شامل {cat.itemCount} کالا و کیت تخصصی
                      </p>
                      {cat.subcategories && (
                        <div className="mt-2 space-y-1">
                          {cat.subcategories.map((sub, i) => (
                            <span key={i} className="block text-[11px] text-slate-600 hover:text-sky-600">
                              • {sub.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Nav links */}
            {navLinks.map(link => {
              const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => onNavigate(link.path)}
                  className={`py-3 px-3.5 transition-colors cursor-pointer relative ${
                    isActive ? 'text-sky-600 font-black' : 'hover:text-sky-600 text-slate-700'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 right-3 left-3 h-0.5 bg-sky-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
            <button
              onClick={() => onNavigate('/contact')}
              className="hover:text-sky-600 flex items-center gap-1 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>دفتر مرکزی: تهران، میدان ولیعصر</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end">
          <div className="w-4/5 max-w-xs bg-white h-full p-5 overflow-y-auto flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center">
                    AM
                  </div>
                  <span className="font-black text-slate-900">آموزکو</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-2">
                {navLinks.map(link => (
                  <button
                    key={link.path}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onNavigate(link.path);
                    }}
                    className={`w-full text-right py-2.5 px-3 rounded-xl font-bold text-sm transition-colors cursor-pointer ${
                      currentPath === link.path ? 'bg-sky-50 text-sky-600' : 'text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="block text-xs font-bold text-slate-400 mb-2">دسته‌بندی‌های سریع</span>
                <div className="space-y-1">
                  {CATEGORIES.slice(0, 5).map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onNavigate(`/shop?category=${cat.slug}`);
                      }}
                      className="w-full text-right text-xs py-2 px-2 text-slate-600 hover:text-sky-600 block"
                    >
                      • {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2">
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <Phone className="w-4 h-4 text-sky-600" />
                <span>پشتیبانی: ۰۲۱-۸۸۹۹۴۴۰۰</span>
              </div>
              <p>ساعات کاری: شنبه تا چهارشنبه ۹ تا ۱۸</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
