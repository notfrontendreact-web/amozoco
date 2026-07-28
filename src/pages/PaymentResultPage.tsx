import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, XCircle, Printer, ArrowLeft, 
  ShoppingBag, ShieldCheck, Truck, Copy 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface PaymentResultPageProps {
  success: boolean;
  referenceCode?: string;
  onNavigateHome: () => void;
  onNavigateTrack: () => void;
}

export const PaymentResultPage: React.FC<PaymentResultPageProps> = ({
  success,
  referenceCode,
  onNavigateHome,
  onNavigateTrack
}) => {
  const { clearCart } = useCart();

  useEffect(() => {
    if (success) {
      clearCart();
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [success]);

  const nowString = new Date().toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {success ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6 text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              پرداخت با موفقیت انجام شد
            </span>
            <h1 className="text-2xl font-black text-slate-900 pt-2">
              سفارش شما در آموزکو با موفقیت ثبت گردید
            </h1>
            <p className="text-xs text-slate-500">
              رسید تراکنش بانکی و رسید خرید برای شما صادر شد. کالاها به زودی جهت ارسال آماده می‌شوند.
            </p>
          </div>

          {/* Reference Info Card */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 text-right max-w-lg mx-auto">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">کد پیگیری شاپرک:</span>
              <span className="font-mono font-black text-slate-900 text-sm">{referenceCode || 'SHP-88412903'}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">کد رهگیری پستی مرسوله:</span>
              <span className="font-mono font-black text-sky-600 text-sm">2026884129</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">زمان پرداخت:</span>
              <span className="font-bold text-slate-800">{nowString}</span>
            </div>
            <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-200">
              <span className="text-slate-500">وضعیت سفارش:</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> تایید شده و در حال پردازش انبار
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-5 py-3 rounded-2xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>چاپ فاکتور خرید</span>
            </button>

            <button
              onClick={onNavigateTrack}
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-5 py-3 rounded-2xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Truck className="w-4 h-4" />
              <span>پیگیری وضعیت مرسوله</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-5 py-3 rounded-2xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>بازگشت به صفحه اصلی</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6 text-center">
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <XCircle className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
              تراکنش ناموفق بود
            </span>
            <h1 className="text-2xl font-black text-slate-900 pt-2">
              پرداخت درگاه آنلاین تایید نشد
            </h1>
            <p className="text-xs text-slate-500">
              تراکنش توسط کاربر لغو گردید یا اطلاعات کارت بانکی نادرست بود. هیچ وجهی از حساب شما کسر نشده است.
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={onNavigateHome}
              className="bg-slate-900 text-white font-bold text-xs px-6 py-3 rounded-2xl cursor-pointer"
            >
              بازگشت به فروشگاه
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
