import React from 'react';
import { 
  Phone, Mail, MapPin, ShieldCheck, Truck, Clock, Headphones, 
  ChevronLeft, Award, Sparkles, Send 
} from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-12 pb-6 border-t-4 border-amber-500">
      {/* Top Features / Badges Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-10 border-b border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">ارسال سریع سراسری</h4>
              <p className="text-xs text-slate-400 mt-0.5">پست پیشتاز و تیپاکس روزانه</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">تضمین اصالت آموزکو</h4>
              <p className="text-xs text-slate-400 mt-0.5">ضمانت بازگشت وجه تا ۷ روز</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">پشتیبانی مهندسی</h4>
              <p className="text-xs text-slate-400 mt-0.5">مشاوره فنی راه‌اندازی پروژه‌ها</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">گارانتی تعویض کالا</h4>
              <p className="text-xs text-slate-400 mt-0.5">۱۸ ماه گارانتی طلایی آموزکو</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        {/* Column 1: About Amouzco */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-lg">
              AM
            </div>
            <span className="text-xl font-black text-white">فروشگاه آنلاین آموزکو</span>
          </div>

          <p className="text-xs leading-relaxed text-slate-400 text-justify">
            شرکت آموزکو با بیش از یک دهه سابقه درخشان در زمینه تامین و عرضه تجهیزات پیشرفته آموزشی، کیت‌های رباتیک و کدنویسی، بردهای هوشمند لمسی، پرینترهای سه بعدی و ابزار دقیق سنجش، افتخار همکاری با بیش از ۸۵۰ دانشگاه و مرکز آموزشی سراسر کشور را دارد.
          </p>

          <div className="space-y-2 text-xs text-slate-300 pt-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>دفتر مرکزی: تهران، میدان ولیعصر، خیابان کریمخان، پلاک ۱۴۲</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sky-400 shrink-0" />
              <span>تلفن تماس: ۰۲۱-۸۸۹۹۴۴۰۰ (۱۰ خط ویژه)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>پست الکترونیک: info@amouzco.com</span>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-black text-white text-sm border-r-2 border-amber-500 pr-2">
            دسترسی سریع
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <button onClick={() => onNavigate('/')} className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer">
                <ChevronLeft className="w-3 h-3" /> صفحه اصلی
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/shop')} className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer">
                <ChevronLeft className="w-3 h-3" /> فروشگاه آنلاین
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/contact')} className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer">
                <ChevronLeft className="w-3 h-3" /> ارتباط با ما
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/about')} className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer">
                <ChevronLeft className="w-3 h-3" /> درباره ما
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/track-order')} className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer">
                <ChevronLeft className="w-3 h-3" /> پیگیری سفارش
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="font-black text-white text-sm border-r-2 border-sky-500 pr-2">
            دسته‌بندی‌های محبوب
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <button onClick={() => onNavigate('/shop?category=رباتیک-و-الکترونیک')} className="hover:text-sky-400 transition-colors flex items-center gap-1 cursor-pointer">
                <ChevronLeft className="w-3 h-3" /> کیت‌های آردوینو و رباتیک
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/shop?category=تجهیزات-آموزشی')} className="hover:text-sky-400 transition-colors flex items-center gap-1 cursor-pointer">
                <ChevronLeft className="w-3 h-3" /> بردهای لمسی و پروژکتور
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/shop?category=پرینتر-سه-بعدی')} className="hover:text-sky-400 transition-colors flex items-center gap-1 cursor-pointer">
                <ChevronLeft className="w-3 h-3" /> پرینترهای ۳D و فیلامنت
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('/shop?category=ابزارآلات-دقیق')} className="hover:text-sky-400 transition-colors flex items-center gap-1 cursor-pointer">
                <ChevronLeft className="w-3 h-3" /> اسیلوسکوپ و منبع تغذیه
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter & Trust Seals */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="font-black text-white text-sm border-r-2 border-emerald-500 pr-2">
            عضویت در خبرنامه آموزکو
          </h4>
          <p className="text-xs text-slate-400">
            از جدیدترین تخفیف‌های شگفت‌انگیز و دوره‌های آموزش رایگان باخبر شوید.
          </p>

          <div className="flex items-center bg-slate-800 rounded-xl p-1.5 border border-slate-700">
            <input
              type="email"
              placeholder="ایمیل یا شماره موبایل..."
              className="bg-transparent text-xs text-white placeholder-slate-500 px-3 py-1.5 outline-none flex-1"
            />
            <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-2 rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer">
              <span>عضویت</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Simulated Trust Seals (ENAMAD / Samandehi) */}
          <div className="pt-2">
            <span className="block text-[11px] text-slate-400 mb-2">نمادهای اعتماد الکترونیکی:</span>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white rounded-xl p-2 flex flex-col items-center justify-center border border-slate-700 text-[9px] font-bold text-slate-800 text-center">
                <ShieldCheck className="w-6 h-6 text-emerald-600 mb-0.5" />
                <span>نماد اعتماد</span>
                <span className="text-[8px] text-slate-500">دو ستاره</span>
              </div>
              <div className="w-16 h-16 bg-white rounded-xl p-2 flex flex-col items-center justify-center border border-slate-700 text-[9px] font-bold text-slate-800 text-center">
                <Award className="w-6 h-6 text-sky-600 mb-0.5" />
                <span>نشان ملی</span>
                <span className="text-[8px] text-slate-500">ثبت رسانه</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© ۱۴۰۴ تمامی حقوق مادی و معنوی این وب‌سایت متعلق به «فروشگاه آنلاین آموزکو» می‌باشد.</p>
      </div>
    </footer>
  );
};
