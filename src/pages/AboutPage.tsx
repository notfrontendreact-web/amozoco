import React from 'react';
import { 
  Award, ShieldCheck, Users, Building, Target, Sparkles, 
  CheckCircle, Globe, Lightbulb, Star, ArrowLeft 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const stats = [
    { label: 'سال سابقه تخصصی', value: '+۱۲', icon: Building },
    { label: 'دانشگاه و مرکز طرف قرارداد', value: '+۸۵۰', icon: Users },
    { label: 'تجهیزات ارسالی فعال', value: '+۴۵,۰۰۰', icon: Award },
    { label: 'رضایت خریداران', value: '۹۹.۴٪', icon: ShieldCheck }
  ];

  const values = [
    {
      title: 'تضمین اصالت قطعات',
      desc: 'تمامی قطعات، سنسورها و تجهیزات هوشمندسازی به‌طور مستقیم از برندهای معتبر جهانی تامین و وارد می‌شوند.',
      icon: ShieldCheck
    },
    {
      title: 'پشتیبانی تخصصی مهندسی',
      desc: 'تیم پشتیبانی آموزکو متشکل از فارغ‌التحصیلان برجسته دانشگاه‌های برتر کشور پاسخگوی سوالات فنی شماست.',
      icon: Lightbulb
    },
    {
      title: 'آموزش گام به گام',
      desc: 'در کنار تمامی کیت‌ها، کتابچه راهنمای فارسی، کدهای منبع و دوره‌های ویدئویی راه‌اندازی ارائه می‌شود.',
      icon: Target
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 md:p-14 text-white shadow-xl relative overflow-hidden border border-indigo-900/50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              داستان آموزکو
            </span>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              پیشگام در هوشمندسازی و تامین تجهیزات آموزشی در ایران
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed text-justify">
              شرکت آموزکو فعالیت خود را از سال ۱۳۹۲ با هدف توسعه فناوری‌های نوین آموزشی، کیت‌های رباتیک و سیستم‌های هوشمندسازی مدارس و دانشگاه‌ها آغاز نمود. امروزه آموزکو به عنوان بزرگترین مرجع تخصصی تامین بردهای لمسی، پرینترهای سه بعدی و تجهیزات آزمایشگاهی الکترونیک شناخته می‌شود.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Amouzco Team"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center space-y-2 hover:border-sky-400 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto">
                <Icon className="w-6 h-6" />
              </div>
              <span className="block text-3xl font-black text-slate-900 font-mono">{s.value}</span>
              <span className="block text-xs font-bold text-slate-500">{s.label}</span>
            </div>
          );
        })}
      </div>

      {/* Core Values Section */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
            ارزش‌های بنیادین
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            چرا آموزکو قابل اعتمادترین انتخاب است؟
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">{v.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed text-justify">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-sky-900 to-indigo-950 text-white rounded-3xl p-8 space-y-3 shadow-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-400/20 text-sky-300 text-xs font-bold">
            <Target className="w-4 h-4" /> ماموریت آموزکو
          </div>
          <h3 className="text-xl font-black">دسترسی همگانی به ابزارهای مدرن یادگیری</h3>
          <p className="text-xs text-slate-300 leading-relaxed text-justify">
            تلاش بی‌وقفه ما برای رفع نیازهای علمی دانش‌آموزان و پژوهشگران با ارائه باکیفیت‌ترین کیت‌های آموزشی با مناسب‌ترین قیمت در سراسر کشور.
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-900 to-stone-900 text-white rounded-3xl p-8 space-y-3 shadow-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">
            <Globe className="w-4 h-4" /> چشم‌انداز آینده
          </div>
          <h3 className="text-xl font-black">بزرگترین هاب فناوری آموزشی در خاورمیانه</h3>
          <p className="text-xs text-slate-300 leading-relaxed text-justify">
            توسعه پلتفرم‌های تعاملی، تولید محتوای آموزشی تخصصی و بومی‌سازی سخت‌افزارهای رباتیک و هوش مصنوعی با استانداردهای بین‌المللی.
          </p>
        </div>
      </div>
    </div>
  );
};
