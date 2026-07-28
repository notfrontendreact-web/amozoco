import React from 'react';
import { Brand } from '../../types';

interface BrandLogoSliderProps {
  brands: Brand[];
}

export const BrandLogoSlider: React.FC<BrandLogoSliderProps> = ({ brands }) => {
  return (
    <div className="w-full bg-slate-900 rounded-2xl p-5 my-6 text-white border border-slate-800 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm md:text-base font-bold text-slate-200">
          برندها و نمایندگی‌های رسمی آموزکو
        </h3>
        <span className="text-xs text-slate-400">تضمین تامین مستقیم قطعات اورجینال</span>
      </div>

      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-2">
        {brands.map(brand => (
          <div
            key={brand.id}
            className="flex-shrink-0 flex items-center gap-3 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl px-4 py-2.5 transition-all hover:border-amber-500/50 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg overflow-hidden bg-white p-1">
              <img
                src={brand.logo}
                alt={brand.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-200 group-hover:text-amber-400 transition-colors">
                {brand.name}
              </span>
              <span className="block text-[10px] text-slate-400">
                {brand.productsCount} محصول
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
