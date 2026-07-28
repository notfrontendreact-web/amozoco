import React, { useState, useEffect } from 'react';
import { 
  CreditCard, ShieldCheck, Lock, ArrowRight, RefreshCw, 
  HelpCircle, CheckCircle, AlertTriangle 
} from 'lucide-react';
import { Order } from '../types';

interface BankGatewayPageProps {
  orderId: string;
  onPaymentComplete: (success: boolean, refCode?: string) => void;
}

export const BankGatewayPage: React.FC<BankGatewayPageProps> = ({
  orderId,
  onPaymentComplete
}) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // Card Form State
  const [cardNumber, setCardNumber] = useState('6037997812345678');
  const [cvv2, setCvv2] = useState('482');
  const [expMonth, setExpMonth] = useState('08');
  const [expYear, setExpYear] = useState('06');
  const [otpCode, setOtpCode] = useState('894120');

  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(120);
  const [isProcessing, setIsProcessing] = useState(false);
  const [portalTimer, setPortalTimer] = useState(600); // 10 minutes session

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [orderId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPortalTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let timer: any;
    if (otpSent && otpTimer > 0) {
      timer = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, otpTimer]);

  const handleRequestOtp = () => {
    setOtpSent(true);
    setOtpTimer(120);
    setOtpCode(String(Math.floor(100000 + Math.random() * 900000)));
  };

  const handlePaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cvv2 || !otpCode) return;

    setIsProcessing(true);

    try {
      const res = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          cardNumber,
          success: true
        })
      });

      const data = await res.json();
      if (data.success) {
        onPaymentComplete(true, data.referenceCode);
      } else {
        onPaymentComplete(false);
      }
    } catch (err) {
      onPaymentComplete(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    onPaymentComplete(false);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-600 font-bold text-sm">
        در حال اتصال به درگاه شاپرک...
      </div>
    );
  }

  const formatCardNum = (num: string) => {
    return num.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 font-sans dir-rtl">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Shaparak Header Bar */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white p-4 md:p-6 rounded-3xl shadow-lg border border-blue-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl p-1 flex items-center justify-center font-black text-blue-900 text-xl shadow-md">
              SHP
            </div>
            <div>
              <h1 className="font-black text-lg md:text-xl text-amber-300">
                درگاه پرداخت اینترنتی شاپرک (شبکه الکترونیکی پرداخت کارت)
              </h1>
              <p className="text-xs text-blue-200">
                اتصال امن به درگاه رسمی بانک سامان / آموزکو
              </p>
            </div>
          </div>

          <div className="bg-slate-950/60 px-4 py-2 rounded-2xl border border-white/20 text-xs font-mono text-amber-300 flex items-center gap-2">
            <ClockIcon />
            <span>زمان باقی‌مانده جلسه: {Math.floor(portalTimer / 60)}:{String(portalTimer % 60).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Merchant & Order Bar */}
        {order && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block">پذیرنده:</span>
              <span className="font-extrabold text-slate-900">فروشگاه آنلاین آموزکو</span>
            </div>
            <div>
              <span className="text-slate-400 block">شماره سفارش:</span>
              <span className="font-extrabold text-slate-900 font-mono">{order.orderNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 block">شماره ترمینال:</span>
              <span className="font-extrabold text-slate-900 font-mono">88412093</span>
            </div>
            <div>
              <span className="text-slate-400 block">مبلغ قابل پرداخت:</span>
              <span className="font-black text-sky-600 text-sm">{order.total.toLocaleString('fa-IR')} تومان</span>
            </div>
          </div>
        )}

        {/* Card Entry Form Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 font-black text-slate-900 text-base">
              <CreditCard className="w-5 h-5 text-sky-600" />
              <span>اطلاعات کارت بانکی عضوی از شتاب</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> اتصال SSL ۲۵۶ بیتی
            </span>
          </div>

          <form onSubmit={handlePaySubmit} className="space-y-5">
            {/* Card Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">شماره کارت ۱۶ رقمی *</label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={19}
                  required
                  value={formatCardNum(cardNumber)}
                  onChange={e => setCardNumber(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-mono font-bold tracking-widest text-slate-900 outline-none focus:border-sky-500 focus:bg-white text-center"
                  placeholder="6037 - 9974 - 0000 - 0000"
                />
                <CreditCard className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              </div>
            </div>

            {/* CVV2 & Expiry Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">شماره شناسایی دوم (CVV2) *</label>
                <input
                  type="password"
                  maxLength={4}
                  required
                  value={cvv2}
                  onChange={e => setCvv2(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-mono font-bold text-center outline-none focus:border-sky-500"
                  placeholder="3 یا 4 رقم"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">تاریخ انقضای کارت (ماه / سال) *</label>
                <div className="flex gap-2">
                  <select
                    value={expMonth}
                    onChange={e => setExpMonth(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-2xl px-3 py-3 text-xs font-bold text-center outline-none flex-1"
                  >
                    {['01','02','03','04','05','06','07','08','09','10','11','12'].map(m => (
                      <option key={m} value={m}>ماه {m}</option>
                    ))}
                  </select>
                  <select
                    value={expYear}
                    onChange={e => setExpYear(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-2xl px-3 py-3 text-xs font-bold text-center outline-none flex-1"
                  >
                    {['04','05','06','07','08','09','10'].map(y => (
                      <option key={y} value={y}>سال ۱۴{y}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Dynamic Password OTP */}
            <div className="space-y-1.5 bg-sky-50/60 p-4 rounded-2xl border border-sky-100">
              <label className="text-xs font-bold text-slate-800 block">رمز دوم پویا (ایستای بانکی) *</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  required
                  value={otpCode}
                  onChange={e => setOtpCode(e.target.value)}
                  placeholder="کد ۶ رقمی دریافتی از پیامک"
                  className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs font-mono font-bold outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-3 rounded-2xl shrink-0 transition-colors cursor-pointer"
                >
                  {otpSent ? `دریافت مجدد (${otpTimer}s)` : 'دریافت رمز پویا'}
                </button>
              </div>
              {otpSent && (
                <p className="text-[11px] text-emerald-700 font-bold mt-1">
                  کد رمز پویا آزمایشی شما: <span className="font-mono text-sm">{otpCode}</span> (خودکار تکمیل شد)
                </p>
              )}
            </div>

            {/* Form Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                type="submit"
                disabled={isProcessing}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
              >
                <CheckCircle className="w-5 h-5" />
                <span>{isProcessing ? 'در حال تایید نهایی تراکنش...' : 'پرداخت نهایی و ثبت سفارش'}</span>
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="py-4 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                انصراف و بازگشت
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function ClockIcon() {
  return <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />;
}
