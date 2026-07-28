import React, { useState } from 'react';
import { 
  Search, Truck, CheckCircle2, PackageCheck, Clock, 
  MapPin, AlertCircle, ShieldCheck, FileText 
} from 'lucide-react';
import { Order } from '../types';

export const OrderTrackPage: React.FC = () => {
  const [trackInput, setTrackInput] = useState('AMZ-88412');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');

  const handleSearchOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackInput.trim()) return;

    setIsSearching(true);
    setError('');

    try {
      const res = await fetch(`/api/orders/${trackInput.trim()}`);
      if (res.ok) {
        const data = await res.json();
        setSearchedOrder(data);
      } else {
        setError('سفارشی با این شماره یا کد پیگیری یافت نشد.');
        setSearchedOrder(null);
      }
    } catch (err) {
      setError('خطا در جستجوی سفارش.');
    } finally {
      setIsSearching(false);
    }
  };

  const steps = [
    { title: 'ثبت سفارش و پرداخت آنلاین', done: true, icon: CheckCircle2 },
    { title: 'تایید نهایی و آماده‌سازی در انبار', done: true, icon: PackageCheck },
    { title: 'بسته‌بندی و تحویل به پست پیشتاز', done: true, icon: Truck },
    { title: 'تحویل به تحویل‌گیرنده', done: false, icon: MapPin }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Search Bar Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 text-white shadow-xl text-center space-y-4">
        <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mx-auto border border-amber-400/30">
          <Truck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black">سامانه پیگیری آنلاین سفارشات آموزکو</h1>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          شماره سفارش (مانند AMZ-88412) یا کد پیگیری خرید خود را وارد نمایید تا وضعیت لحظه‌ای مرسوله پستی را مشاهده کنید.
        </p>

        <form onSubmit={handleSearchOrder} className="max-w-md mx-auto flex gap-2 pt-2">
          <input
            type="text"
            value={trackInput}
            onChange={e => setTrackInput(e.target.value)}
            placeholder="کد پیگیری یا شماره سفارش..."
            className="w-full bg-white text-slate-900 text-xs rounded-2xl px-4 py-3 border outline-none font-bold placeholder-slate-400"
          />
          <button
            type="submit"
            disabled={isSearching}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-5 py-3 rounded-2xl shrink-0 transition-colors cursor-pointer"
          >
            {isSearching ? 'در حال جستجو...' : 'استعلام'}
          </button>
        </form>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs font-bold text-red-800 text-center">
          {error}
        </div>
      )}

      {/* Order Status Display */}
      {searchedOrder && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs text-slate-400 block">شماره سفارش:</span>
              <span className="font-mono font-black text-slate-900 text-base">{searchedOrder.orderNumber}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">کد رهگیری پستی:</span>
              <span className="font-mono font-bold text-sky-600 text-sm">{searchedOrder.trackingCode || '2026884129'}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">کد تراکنش شاپرک:</span>
              <span className="font-mono font-bold text-emerald-600 text-sm">{searchedOrder.referenceCode || 'SHP-998412501'}</span>
            </div>
          </div>

          {/* Timeline steps */}
          <div className="py-4">
            <h3 className="text-xs font-bold text-slate-400 mb-6">مراحل پردازش و ارسال سفارش:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
              {steps.map((st, i) => {
                const Icon = st.icon;
                return (
                  <div key={i} className="flex flex-col items-center text-center space-y-2">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-md ${
                      st.done ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-bold ${st.done ? 'text-slate-900' : 'text-slate-400'}`}>
                      {st.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Address & Items */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs text-slate-700">
            <h4 className="font-extrabold text-slate-900 text-sm">مشخصات گیرنده و مقصد ارسال:</h4>
            <p><span className="font-bold">تحویل گیرنده:</span> {searchedOrder.address.fullName} ({searchedOrder.address.phone})</p>
            <p><span className="font-bold">نشانی تحویل:</span> {searchedOrder.address.province}، {searchedOrder.address.city}، {searchedOrder.address.address}</p>
          </div>
        </div>
      )}
    </div>
  );
};
