import React from 'react';
import { motion } from 'motion/react';
import { Category } from '../../types';
import { Bot, MonitorPlay, Printer, Cpu, CircuitBoard, Laptop, BookOpen, Network, Sparkles } from 'lucide-react';

interface CategoryStorySliderProps {
  categories: Category[];
  activeCategory?: string;
  onSelectCategory: (categorySlug: string) => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Bot': return <Bot className="w-5 h-5" />;
    case 'MonitorPlay': return <MonitorPlay className="w-5 h-5" />;
    case 'Printer': return <Printer className="w-5 h-5" />;
    case 'Cpu': return <Cpu className="w-5 h-5" />;
    case 'CircuitBoard': return <CircuitBoard className="w-5 h-5" />;
    case 'Laptop': return <Laptop className="w-5 h-5" />;
    case 'BookOpen': return <BookOpen className="w-5 h-5" />;
    case 'Network': return <Network className="w-5 h-5" />;
    default: return <Sparkles className="w-5 h-5" />;
  }
};

export const CategoryStorySlider: React.FC<CategoryStorySliderProps> = ({
  categories,
  activeCategory,
  onSelectCategory
}) => {
  return (
    <div className="w-full bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-200/80 my-4">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping" />
          <h2 className="text-base font-bold text-slate-800">دسته‌بندی‌های داغ آموزکو</h2>
        </div>
        <span className="text-xs text-slate-500">برای مشاهده فیلتر کلیک کنید</span>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2 px-1">
        {/* "All" button */}
        <button
          onClick={() => onSelectCategory('')}
          className="flex flex-col items-center gap-2 min-w-[76px] group cursor-pointer"
        >
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center p-0.5 transition-all duration-300 ${
              !activeCategory
                ? 'bg-gradient-to-tr from-amber-500 via-rose-500 to-sky-500 p-1 shadow-lg scale-105'
                : 'border-2 border-dashed border-slate-300 hover:border-amber-400'
            }`}
          >
            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-white">
              <Sparkles className="w-7 h-7 text-amber-400" />
            </div>
          </div>
          <span className={`text-xs font-medium text-center line-clamp-1 ${!activeCategory ? 'text-amber-600 font-bold' : 'text-slate-700'}`}>
            همه دسته‌ها
          </span>
        </button>

        {/* Stories List */}
        {categories.map(cat => {
          const isActive = activeCategory === cat.slug;
          return (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectCategory(cat.slug)}
              className="flex flex-col items-center gap-2 min-w-[76px] group cursor-pointer"
            >
              <div
                className={`relative w-16 h-16 rounded-full flex items-center justify-center p-0.5 transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-tr from-amber-500 via-sky-500 to-indigo-600 shadow-md scale-105'
                    : cat.hasStory
                    ? 'bg-gradient-to-tr from-sky-400 to-emerald-400 group-hover:from-amber-400 group-hover:to-rose-400'
                    : 'bg-slate-200'
                }`}
              >
                <div className="w-full h-full bg-white rounded-full p-0.5 overflow-hidden relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-0 right-0 left-0 bg-slate-900/70 text-white flex items-center justify-center p-0.5">
                    {getCategoryIcon(cat.icon)}
                  </div>
                </div>

                {cat.hasStory && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[9px] text-white font-bold">
                    ★
                  </span>
                )}
              </div>

              <span
                className={`text-xs font-medium text-center max-w-[85px] leading-tight line-clamp-2 ${
                  isActive ? 'text-sky-600 font-extrabold' : 'text-slate-700 group-hover:text-sky-600'
                }`}
              >
                {cat.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
