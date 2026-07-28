import React, { useState } from 'react';
import { 
  ShoppingBag, ShieldCheck, Truck, CreditCard, ArrowLeft, 
  MapPin, User, Phone, Check, Tag 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutPageProps {
  onNavigateBankGateway: (orderId: string) => void;
  onNavigateShop: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onNavigateBankGateway,
  onNavigateShop
}) => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShippingFee,
    cartTotal,
    appliedCoupon,
    shippingAddress,
    setShippingAddress
  } = useCart();

  const [addressForm, setAddressForm] = useState(shippingAddress);
  const [selectedBank, setSelectedBank] = useState('بانک سامان (درگاه شاپرک)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto" />
        <h2 className="text-xl font-black text-slate-900">سبد خرید شما خالی است</h2>
        <p className="text-xs text-slate-500">برای ثبت سفارش ابتدا کالاهای مورد نظر خود را به سبد اضافه نمایید.</p>
        <button
          onClick={onNavigateShop}
          className="bg-sky-600 text-white font-bold text-xs px-6 py-3 rounded-2xl hover:bg-sky-700 transition-colors cursor-pointer"
        >
          ورود به فروشگاه آنلاین
        </button>
      </div>
    );
  }

  const handleCreateOrder = async () => {
    if (!addressForm.fullName || !addressForm.phone || !addressForm.address || !addressForm.postalCode) {
      setErrorMsg('لطفا تمامی اطلاعات گیرنده و نشانی پستی را تکمیل کنید.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      setShippingAddress(addressForm);

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          address: addressForm,
          paymentMethod: 'bank_gateway',
          bankName: selectedBank,
          couponCode: appliedCoupon?.code,
          discountAmount: cartDiscount
        })
      });

      const data = await res.json();
      if (data.success && data.order) {
        // Request payment authority token from Node.js backend
        await fetch('/api/payment/request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: data.order.id,
            bankName: selectedBank
          })
        });

        onNavigateBankGateway(data.order.id);
      } else {
        setErrorMsg(data.error || 'خطا در ثبت سفارش در سرور نودجی‌اس');
      }
    } catch (err) {
      setErrorMsg('خطا در برقراری ارتباط با سرور.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const banks = [
    { name: 'بانک سامان (درگاه شاپرک)', logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=100&q=80' },
    { name: 'بانک ملت (درگاه شاپرک)', logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=100&q=80' },
    { name: 'بانک پاسارگاد (درگاه شاپرک)', logo: 'https://images.unsplash.com/photo-1556742049-0a67d1656a8d?auto=format&fit=crop&w=100&q=80' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          تکمیل آدرس و انتخاب درگاه پرداخت
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          اطلاعات گیرنده را وارد کرده و درگاه بانکی دلخواه جهت اتصال به شاپرک را انتخاب نمایید.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs font-bold text-red-800">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Address & Bank selection */}
        <div className="lg:col-span-7 space-y-6">
          {/* Address Form */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2 border-r-2 border-sky-600 pr-2">
              <MapPin className="w-5 h-5 text-sky-600" />
              <span>مشخصات و نشانی دقیق تحویل‌گیرنده</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">نام و نام خانوادگی تحویل‌گیرنده *</label>
                <input
                  type="text"
                  required
                  value={addressForm.fullName}
                  onChange={e => setAddressForm({ ...addressForm, fullName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">شماره موبایل گیرنده *</label>
                <input
                  type="tel"
                  required
                  value={addressForm.phone}
                  onChange={e => setAddressForm({ ...addressForm, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">استان *</label>
                <input
                  type="text"
                  required
                  value={addressForm.province}
                  onChange={e => setAddressForm({ ...addressForm, province: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">شهر *</label>
                <input
                  type="text"
                  required
                  value={addressForm.city}
                  onChange={e => setAddressForm({ ...addressForm, city: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">کد پستی ۱۰ رقمی *</label>
                <input
                  type="text"
                  required
                  value={addressForm.postalCode}
                  onChange={e => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">آدرس کامل پستی *</label>
              <textarea
                required
                rows={2}
                value={addressForm.address}
                onChange={e => setAddressForm({ ...addressForm, address: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Bank Selection */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2 border-r-2 border-amber-500 pr-2">
              <CreditCard className="w-5 h-5 text-amber-500" />
              <span>انتخاب درگاه آنلاین بانکی (شبکه رسمی شاپرک)</span>
            </h3>

            <div className="space-y-3">
              {banks.map((b, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedBank(b.name)}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    selectedBank === b.name
                      ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedBank === b.name ? 'border-amber-600 bg-amber-500' : 'border-slate-300'}`}>
                      {selectedBank === b.name && <Check className="w-3 h-3 text-slate-950 font-black" />}
                    </div>
                    <span className="font-extrabold text-xs text-slate-900">{b.name}</span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-lg">
                    شاپرک الکترونیک
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Pay */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5 sticky top-24">
          <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
            خلاصه سفارش و فاکتور نهایی
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar divide-y divide-slate-100">
            {cart.map(item => (
              <div key={item.product.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 max-w-[200px]">
                  <img src={item.product.image} alt="" referrerPolicy="no-referrer" className="w-10 h-10 object-cover rounded-lg border" />
                  <div>
                    <span className="font-bold text-slate-800 line-clamp-1">{item.product.title}</span>
                    <span className="text-[11px] text-slate-400">{item.quantity} عدد</span>
                  </div>
                </div>
                <span className="font-black text-slate-900">
                  {(item.product.price * item.quantity).toLocaleString('fa-IR')} تومان
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs pt-3 border-t border-slate-100 text-slate-600">
            <div className="flex justify-between">
              <span>مبلغ کالاها:</span>
              <span className="font-bold">{cartSubtotal.toLocaleString('fa-IR')} تومان</span>
            </div>

            {cartDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>تخفیف:</span>
                <span>- {cartDiscount.toLocaleString('fa-IR')} تومان</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>هزینه ارسال پستی:</span>
              <span className="font-bold">{cartShippingFee === 0 ? 'رایگان' : `${cartShippingFee.toLocaleString('fa-IR')} تومان`}</span>
            </div>

            <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-200">
              <span>مبلغ قابل پرداخت:</span>
              <span className="text-amber-600">{cartTotal.toLocaleString('fa-IR')} تومان</span>
            </div>
          </div>

          <button
            onClick={handleCreateOrder}
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
          >
            <CreditCard className="w-5 h-5" />
            <span>{isSubmitting ? 'در حال انقـال به درگاه شاپرک...' : 'پرداخت آنلاین و اتصال به درگاه بانک'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
