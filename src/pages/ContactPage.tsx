import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Send, MessageSquare, 
  HelpCircle, CheckCircle2, Building, ShieldCheck, ChevronDown 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'مشاوره خرید و پیش‌فاکتور',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string; ticketId?: string } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitResult({ success: true, message: data.message, ticketId: data.ticketId });
        setFormData({ name: '', phone: '', email: '', subject: 'مشاوره خرید و پیش‌فاکتور', message: '' });
      } else {
        setSubmitResult({ success: false, message: data.error || 'خطا در ثبت پیام' });
      }
    } catch (err) {
      setSubmitResult({ success: false, message: 'خطا در ارتباط با سرور' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'نحوه ثبت سفارش سازمانی و اخذ پیش‌فاکتور رسمی چگونه است؟',
      a: 'برای سفارش‌های عمده دانشگاه‌ها، مدارس و شرکت‌ها، می‌توانید پس از انتخاب کالاها در فرم تماس یا تماس مستقیم با داخلی ۱۰۲ درخواست پیش‌فاکتور رسمی با ارزش افزوده ثبت نمایید.'
    },
    {
      q: 'کالاها چقدر طول می‌کشد به دست من برسند؟',
      a: 'سفارش‌های تهران همان روز با پیک اختصاصی یا اسنپ ارسال می‌شوند. سفارش‌های سایر استان‌ها با پست پیشتاز یا تیپاکس ظرف ۲۴ تا ۴۸ ساعت کاری تحویل داده می‌شوند.'
    },
    {
      q: 'آیا تجهیزات آموزکو شامل گارانتی تعویض می‌شوند؟',
      a: 'بله، تمامی قطعات اصلی و بردهای هوشمند شامل ۱۲ تا ۲۴ ماه گارانتی طلایی آموزکو و ۷ روز ضمانت بازگشت بی‌قیدوشرط می‌باشند.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Page Title Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden border border-indigo-900/50">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            ارتباط مستقیم با آموزکو
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            راه‌های ارتباطی و تماس با آموزکو
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            تیم کارشناسان فنی و مهندسان آموزکو در تمامی روزهای کاری آماده پاسخگویی، مشاوره تخصصی خرید و پشتیبانی پروژه‌های شما هستند.
          </p>
        </div>
      </div>

      {/* Directory & Phone Extensions Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-sm">واحد فروش و مشاوره</h3>
          <p className="text-xs text-slate-500">مشاوره تخصصی انتخاب کیت‌ها</p>
          <span className="block text-sky-600 font-extrabold text-sm pt-1">۰۲۱-۸۸۹۹۴۴۰۰ (داخلی ۱۰۱)</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-sm">واحد پشتیبانی فنی</h3>
          <p className="text-xs text-slate-500">راهنمایی راه‌اندازی و گارانتی</p>
          <span className="block text-amber-600 font-extrabold text-sm pt-1">۰۲۱-۸۸۹۹۴۴۰۰ (داخلی ۱۰۲)</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
            <Building className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-sm">فروش سازمانی و دانشگاه‌ها</h3>
          <p className="text-xs text-slate-500">صدور پیش‌فاکتور با ارزش افزوده</p>
          <span className="block text-emerald-600 font-extrabold text-sm pt-1">۰۲۱-۸۸۹۹۴۴۰۰ (داخلی ۱۰۳)</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-sm">ساعات کاری دفاتر</h3>
          <p className="text-xs text-slate-500">شنبه تا چهارشنبه: ۹:۰۰ تا ۱۸:۰۰</p>
          <span className="block text-purple-600 font-extrabold text-sm pt-1">پنج‌شنبه: ۹:۰۰ تا ۱۳:۰۰</span>
        </div>
      </div>

      {/* Main Grid: Contact Form & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-sky-600" />
              <span>ارسال پیام یا درخواست مشاوره</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              فرم زیر را تکمیل کنید تا کارشناسان ما کمتر از ۲ ساعت کاری با شما تماس بگیرند.
            </p>
          </div>

          {submitResult && (
            <div className={`p-4 rounded-2xl text-xs font-bold ${submitResult.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              {submitResult.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">نام و نام خانوادگی *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثلا: علی رضایی"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">شماره تماس (موبایل) *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="09121234567"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">ایمیل</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">موضوع درخواست</label>
                <select
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-sky-500"
                >
                  <option value="مشاوره خرید و پیش‌فاکتور">مشاوره خرید و پیش‌فاکتور</option>
                  <option value="پشتیبانی فنی و راه اندازی">پشتیبانی فنی و راه اندازی</option>
                  <option value="پیگیری سفارش خریده شده">پیگیری سفارش خریده شده</option>
                  <option value="پیشنهادات و انتقادات">پیشنهادات و انتقادات</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">متن پیام یا لیست کالاها *</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="لطفا توضیحات یا سوالات خود را بنویسید..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs outline-none focus:border-sky-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-black text-sm shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'در حال ارسال پیام...' : 'ارسال نهایی پیام'}</span>
            </button>
          </form>
        </div>

        {/* Branch Offices & Map Simulation */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base border-r-2 border-amber-500 pr-2">
              نشانی دفاتر آموزکو
            </h3>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5">
                <span className="font-bold text-slate-900 text-sm block text-sky-600">دفتر مرکزی (تهران):</span>
                <p>میدان ولیعصر، خیابان کریمخان زند، خیابان به آفرین، پلاک ۱۴۲، طبقه ۳، واحد ۳۰۲</p>
                <p className="text-slate-400">کد پستی: ۱۴۱۷۸۵۳۱۱۱</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5">
                <span className="font-bold text-slate-900 text-sm block text-amber-600">شعبه اصفهان:</span>
                <p>خیابان چهارباغ بالا، مجتمع تجاری کوثر، طبقه اول، واحد ۱۱۸</p>
                <p className="text-slate-400">تلفن: ۰۳۱-۳۶۶۴۲۰۰۰</p>
              </div>
            </div>
          </div>

          {/* Map Image Placeholder */}
          <div className="bg-slate-900 rounded-3xl p-4 text-white border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold flex items-center gap-1">
                <MapPin className="w-4 h-4 text-red-500" /> موقعیت مکانی روی نقشه
              </span>
              <span className="text-slate-400">Tehran 35.7152° N, 51.4043° E</span>
            </div>
            <div className="aspect-16/9 rounded-2xl overflow-hidden relative bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                alt="Tehran Map"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-red-600 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-1 animate-bounce">
                  <MapPin className="w-4 h-4" />
                  <span>دفتر مرکزی آموزکو</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-sky-600" />
          <span>سوالات متداول مشتریان</span>
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-right p-4 font-bold text-sm text-slate-800 bg-slate-50 hover:bg-sky-50 flex items-center justify-between cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180 text-sky-600' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
