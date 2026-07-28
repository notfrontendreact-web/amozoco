import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Filter, Grid, List, Search, RotateCcw, ChevronDown, Check, 
  Sparkles, SlidersHorizontal, CheckSquare, Square, X, Layers, LayoutGrid, ArrowLeft
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, BRANDS } from '../data/mockData';
import { Product, FilterState, Category } from '../types';
import { ProductCard } from '../components/product/ProductCard';

interface ShopPageProps {
  initialCategory?: string;
  onNavigateProduct: (productId: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ initialCategory, onNavigateProduct }) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: initialCategory || '',
    brand: '',
    minPrice: 0,
    maxPrice: 200000000,
    inStockOnly: false,
    hasDiscountOnly: false,
    sortBy: 'popular'
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [groupByCategoryMode, setGroupByCategoryMode] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setFilters(prev => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  // Selected Category Object
  const selectedCategoryObj = CATEGORIES.find(c => c.slug === filters.category || c.name === filters.category);

  // Filter logic
  let filteredProducts = PRODUCTS.filter(p => {
    if (filters.category && p.categorySlug !== filters.category && p.category !== filters.category) {
      return false;
    }
    if (filters.brand && p.brand !== filters.brand) {
      return false;
    }
    if (filters.inStockOnly && p.stock <= 0) {
      return false;
    }
    if (filters.hasDiscountOnly && (!p.discountPercent || p.discountPercent <= 0)) {
      return false;
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matches = p.title.toLowerCase().includes(q) || 
                      p.shortDescription.toLowerCase().includes(q) || 
                      p.tags.some(t => t.toLowerCase().includes(q));
      if (!matches) return false;
    }
    if (p.price < filters.minPrice || p.price > filters.maxPrice) {
      return false;
    }
    return true;
  });

  // Sorting
  if (filters.sortBy === 'price_asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === 'price_desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (filters.sortBy === 'newest') {
    filteredProducts.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
  } else if (filters.sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      brand: '',
      minPrice: 0,
      maxPrice: 200000000,
      inStockOnly: false,
      hasDiscountOnly: false,
      sortBy: 'popular'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Page Header Breadcrumb */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span>آموزکو</span>
            <span>/</span>
            <span className="text-sky-600 font-bold">فروشگاه آنلاین</span>
            {selectedCategoryObj && (
              <>
                <span>/</span>
                <span className="text-slate-700 font-extrabold">{selectedCategoryObj.name}</span>
              </>
            )}
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            {selectedCategoryObj ? `محصولات دسته‌بندی ${selectedCategoryObj.name}` : 'فروشگاه تجهیزات آموزشی، رباتیک و ابزار دقیق'}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setGroupByCategoryMode(!groupByCategoryMode)}
            className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
              groupByCategoryMode 
                ? 'bg-amber-500 text-slate-950 shadow-sm' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{groupByCategoryMode ? 'نمایش ساده لیست' : 'نمایش تفکیکی دسته‌بندی‌ها'}</span>
          </button>

          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>فیلترها</span>
          </button>
        </div>
      </div>

      {/* Categories Visual Bar */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2 text-xs font-black text-slate-800">
            <LayoutGrid className="w-4 h-4 text-sky-600" />
            <span>دسته‌بندی‌های اصلی فروشگاه</span>
          </div>
          {filters.category && (
            <button 
              onClick={() => setFilters({ ...filters, category: '' })}
              className="text-xs text-sky-600 hover:underline font-bold cursor-pointer"
            >
              مشاهده همه دسته‌ها
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 pt-1">
          <button
            onClick={() => setFilters({ ...filters, category: '' })}
            className={`shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
              !filters.category 
                ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105' 
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <div className="w-7 h-7 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-black">
              ★
            </div>
            <span>همه محصولات ({PRODUCTS.length})</span>
          </button>

          {CATEGORIES.map(c => {
            const isSelected = filters.category === c.slug || filters.category === c.name;
            const categoryProductsCount = PRODUCTS.filter(p => p.categorySlug === c.slug || p.category === c.name).length;
            return (
              <button
                key={c.id}
                onClick={() => setFilters({ ...filters, category: c.slug })}
                className={`shrink-0 flex items-center gap-3 px-3.5 py-2 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/20 scale-105' 
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <img 
                  src={c.image} 
                  alt={c.name} 
                  className="w-8 h-8 rounded-xl object-cover border border-slate-200"
                />
                <div className="text-right">
                  <div className="line-clamp-1">{c.name}</div>
                  <div className={`text-[10px] ${isSelected ? 'text-sky-100' : 'text-slate-400'}`}>
                    {categoryProductsCount > 0 ? `${categoryProductsCount} محصول` : `${c.itemCount} کالا`}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Banner Header (If Category Selected) */}
      {selectedCategoryObj && (
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-6 md:p-8 border border-slate-800 shadow-lg">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${selectedCategoryObj.image})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />
          
          <div className="relative z-10 space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-sky-500/20 border border-sky-500/30 text-sky-300 px-3 py-1 rounded-full text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>دسته‌بندی تخصصی آموزکو</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">{selectedCategoryObj.name}</h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              ارائه انواع تجهیزات اصیل، دارای پشتیبانی فنی آموزکو و تضمین بهترین قیمت بازار.
            </p>

            {/* Subcategories Pills */}
            {selectedCategoryObj.subcategories && selectedCategoryObj.subcategories.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-2 items-center">
                <span className="text-xs text-slate-400 font-bold ml-1">زیردسته‌ها:</span>
                {selectedCategoryObj.subcategories.map(sub => (
                  <button
                    key={sub.slug}
                    onClick={() => setFilters({ ...filters, search: sub.name })}
                    className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1 rounded-xl transition-colors cursor-pointer border border-white/10"
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sidebar Filters (Desktop) */}
        <div className="hidden lg:block lg:col-span-3 space-y-5 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
              <Filter className="w-4 h-4 text-sky-600" />
              <span>فیلترهای پیشرفته</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-sky-600 hover:text-sky-700 font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>بازنشانی</span>
            </button>
          </div>

          {/* Search in Shop */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">جستجو در محصولات:</label>
            <div className="relative">
              <input
                type="text"
                value={filters.search}
                onChange={e => setFilters({ ...filters, search: e.target.value })}
                placeholder="نام کالا، پارت نامبر..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 pr-9 text-xs outline-none focus:border-sky-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            </div>
          </div>

          {/* Categories Sidebar Filter */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-extrabold text-slate-800 block">دسته‌بندی‌ها:</label>
            <div className="space-y-1 max-h-56 overflow-y-auto no-scrollbar">
              <button
                onClick={() => setFilters({ ...filters, category: '' })}
                className={`w-full text-right text-xs py-2 px-2.5 rounded-xl font-bold transition-colors cursor-pointer flex items-center justify-between ${
                  !filters.category ? 'bg-sky-50 text-sky-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>• همه دسته‌ها</span>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md">{PRODUCTS.length}</span>
              </button>
              {CATEGORIES.map(c => {
                const count = PRODUCTS.filter(p => p.categorySlug === c.slug || p.category === c.name).length;
                return (
                  <button
                    key={c.id}
                    onClick={() => setFilters({ ...filters, category: c.slug })}
                    className={`w-full text-right text-xs py-2 px-2.5 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                      filters.category === c.slug ? 'bg-sky-50 text-sky-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="line-clamp-1">• {c.name}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md shrink-0">{count > 0 ? count : c.itemCount}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-extrabold text-slate-800 block">برند و سازنده:</label>
            <div className="space-y-1">
              <button
                onClick={() => setFilters({ ...filters, brand: '' })}
                className={`w-full text-right text-xs py-1.5 px-2 rounded-lg font-bold transition-colors cursor-pointer ${
                  !filters.brand ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                • همه برندها
              </button>
              {BRANDS.map(b => (
                <button
                  key={b.id}
                  onClick={() => setFilters({ ...filters, brand: b.name })}
                  className={`w-full text-right text-xs py-1.5 px-2 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                    filters.brand === b.name ? 'bg-amber-50 text-amber-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>• {b.name}</span>
                  <span className="text-[10px] text-slate-400">{b.productsCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => setFilters({ ...filters, inStockOnly: !filters.inStockOnly })}
              className="w-full flex items-center justify-between py-2 text-xs font-bold text-slate-700 cursor-pointer"
            >
              <span>فقط کالاهای موجود</span>
              <div className={`w-10 h-5 rounded-full p-0.5 transition-colors ${filters.inStockOnly ? 'bg-sky-600' : 'bg-slate-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${filters.inStockOnly ? '-translate-x-5' : 'translate-x-0'}`} />
              </div>
            </button>

            <button
              onClick={() => setFilters({ ...filters, hasDiscountOnly: !filters.hasDiscountOnly })}
              className="w-full flex items-center justify-between py-2 text-xs font-bold text-slate-700 cursor-pointer"
            >
              <span>فقط کالاهای تخفیف‌دار</span>
              <div className={`w-10 h-5 rounded-full p-0.5 transition-colors ${filters.hasDiscountOnly ? 'bg-red-500' : 'bg-slate-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${filters.hasDiscountOnly ? '-translate-x-5' : 'translate-x-0'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Main Products Content */}
        <div className="lg:col-span-9 space-y-5">
          {/* Controls Bar: Sort & View Toggle */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs font-bold">
              <span className="text-slate-400 shrink-0">مرتب‌سازی:</span>
              <button
                onClick={() => setFilters({ ...filters, sortBy: 'popular' })}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                  filters.sortBy === 'popular' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                پربازدیدترین
              </button>
              <button
                onClick={() => setFilters({ ...filters, sortBy: 'newest' })}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                  filters.sortBy === 'newest' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                جدیدترین
              </button>
              <button
                onClick={() => setFilters({ ...filters, sortBy: 'price_asc' })}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                  filters.sortBy === 'price_asc' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                ارزان‌ترین
              </button>
              <button
                onClick={() => setFilters({ ...filters, sortBy: 'price_desc' })}
                className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                  filters.sortBy === 'price_desc' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                گران‌ترین
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-bold">{filteredProducts.length} محصول</span>
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden p-0.5 bg-slate-50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-400'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-sky-600' : 'text-slate-400'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Badges */}
          {(filters.category || filters.brand || filters.inStockOnly || filters.hasDiscountOnly || filters.search) && (
            <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-3 rounded-2xl text-xs">
              <span className="text-slate-500 font-bold">فیلترهای فعال:</span>
              {filters.category && (
                <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-sky-700 font-bold flex items-center gap-1">
                  دسته‌بندی: {selectedCategoryObj ? selectedCategoryObj.name : filters.category}
                  <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setFilters({ ...filters, category: '' })} />
                </span>
              )}
              {filters.brand && (
                <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-amber-700 font-bold flex items-center gap-1">
                  برند: {filters.brand}
                  <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setFilters({ ...filters, brand: '' })} />
                </span>
              )}
              {filters.inStockOnly && (
                <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-emerald-700 font-bold flex items-center gap-1">
                  فقط موجود
                  <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setFilters({ ...filters, inStockOnly: false })} />
                </span>
              )}
              {filters.search && (
                <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-purple-700 font-bold flex items-center gap-1">
                  عبارت: {filters.search}
                  <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setFilters({ ...filters, search: '' })} />
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-red-600 font-bold hover:underline mr-auto cursor-pointer"
              >
                پاک کردن همه
              </button>
            </div>
          )}

          {/* Product Layout: Grouped by Category vs Normal List */}
          {groupByCategoryMode && !filters.category && !filters.search ? (
            <div className="space-y-10">
              {CATEGORIES.map(cat => {
                const catProducts = PRODUCTS.filter(p => p.categorySlug === cat.slug || p.category === cat.name);
                if (catProducts.length === 0) return null;

                return (
                  <div key={cat.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        <img src={cat.image} alt={cat.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
                        <div>
                          <h3 className="font-black text-slate-900 text-base">{cat.name}</h3>
                          <span className="text-xs text-slate-400 font-bold">{catProducts.length} محصول اختصاصی</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setFilters({ ...filters, category: cat.slug })}
                        className="text-xs text-sky-600 hover:text-sky-700 font-extrabold flex items-center gap-1 bg-sky-50 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                      >
                        <span>مشاهده همه محصولات این دسته</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {catProducts.slice(0, 3).map(p => (
                        <ProductCard key={p.id} product={p} onNavigateProduct={onNavigateProduct} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5' : 'space-y-4'}>
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p} onNavigateProduct={onNavigateProduct} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <Search className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-extrabold text-slate-800 text-lg">هیچ کالایی با فیلترهای انتخابی یافت نشد</h3>
              <p className="text-xs text-slate-500">لطفا فیلترها را تغییر داده یا بازنشانی کنید.</p>
              <button
                onClick={resetFilters}
                className="bg-sky-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-sky-700 transition-colors cursor-pointer"
              >
                مشاهده همه محصولات
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

