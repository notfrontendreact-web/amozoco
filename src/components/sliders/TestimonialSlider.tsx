import React, { useState } from 'react';
import { Star, Quote, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ testimonials }) => {
  const [index, setIndex] = useState(0);

  const current = testimonials[index] || testimonials[0];

  const next = () => setIndex(prev => (prev + 1) % testimonials.length);
  const prev = () => setIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="w-full bg-slate-100 rounded-3xl p-6 md:p-8 my-6 border border-slate-200/80 shadow-sm relative">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side Quote */}
        <div className="md:w-1/3 text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold mb-3">
            <Quote className="w-4 h-4 text-amber-500" />
            <span>نظرات خریداران و اساتید</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-snug">
            چرا دانشگاه‌ها و مراکز آموزشی آموزکو را انتخاب می‌کنند؟
          </h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            بیش از ۸۵۰ دانشگاه، آزمایشگاه صنعتی و مدرسه‌ در سراسر کشور از تجهیزات آموزشی و قطعات تخصصی آموزکو استفاده می‌کنند.
          </p>
        </div>

        {/* Right Side Testimonial Card */}
        <div className="md:w-2/3 bg-white rounded-2xl p-6 shadow-md border border-slate-200/60 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={current.avatar}
                alt={current.author}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-400"
              />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm md:text-base flex items-center gap-1.5">
                  <span>{current.author}</span>
                  <CheckCircle className="w-4 h-4 text-sky-500" />
                </h4>
                <p className="text-xs text-slate-500">{current.role} - {current.company}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
          </div>

          <p className="text-slate-700 text-sm md:text-base leading-relaxed italic mb-4">
            "{current.text}"
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
            <div>
              <span className="font-bold text-slate-700">محصول خریداری شده: </span>
              <span className="text-sky-600">{current.purchasedProduct}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={prev}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
