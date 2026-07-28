import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowLeft, Tag, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CartDrawerProps {
  onNavigateCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigateCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartShippingFee,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setIsValidating(true);
    setCouponError('');

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput, subtotal: cartSubtotal })
      });
      const data = await res.json();
      if (data.success) {
        applyCoupon(data.code, data.discountAmount);
        setCouponInput('');
      } else {
        setCouponError(data.message || 'کد تخفیف نامعتبر است');
      }
    } catch (err) {
      setCouponError('خطا در بررسی کد تخفیف');
    } finally {
      setIsValidating(false);
    }
  };

  const freeShippingThreshold = 3000000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: '0%' }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">سبد خرید شما</h3>
                <span className="text-xs text-slate-500">{cart.length} عنوان کالا</span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-3 bg-amber-50 border-b border-amber-200/60 text-xs text-amber-900 space-y-1.5">
            <div className="flex items-center justify-between font-semibold">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>
                  {remainingForFreeShipping > 0
                    ? `فقط ${remainingForFreeShipping.toLocaleString('fa-IR')} تومان تا ارسال رایگان`
                    : 'تبریک! ارسال سفارش شما کاملا رایگان است 🎉'}
                </span>
              </div>
              <span>{Math.round(freeShippingProgress)}٪</span>
            </div>
            <div className="w-full h-2 bg-amber-200/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
            {cart.length > 0 ? (
              cart.map(item => (
                <div key={item.product.id} className="pt-3 first:pt-0 flex gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0 bg-slate-50"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight">
                        {item.product.title}
                      </h4>
                      {item.selectedOption && (
                        <span className="text-[11px] text-sky-600 font-medium block mt-0.5">
                          {item.selectedOption}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-left">
                        <span className="text-xs font-black text-slate-900 block">
                          {(item.product.price * item.quantity).toLocaleString('fa-IR')} تومان
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-slate-600">سبد خرید شما خالی است</p>
                <p className="text-xs text-slate-400">می‌توانید از بخش فروشگاه کالاها را اضافه نمایید.</p>
              </div>
            )}
          </div>

          {/* Coupon Code Section */}
          {cart.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200/80 space-y-3">
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span>کد تخفیف {appliedCoupon.code} فعال است</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-red-600 hover:underline font-bold cursor-pointer"
                  >
                    حذف
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      placeholder="کد تخفیف (مثلا: AMOUZCO2026)"
                      className="bg-white text-xs border border-slate-200 rounded-xl px-3 py-2 flex-1 outline-none focus:border-sky-500"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={isValidating}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isValidating ? '...' : 'اعمال'}
                    </button>
                  </div>
                  {couponError && <p className="text-[11px] text-red-500 mt-1">{couponError}</p>}
                </div>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs pt-2 border-t border-slate-200">
                <div className="flex justify-between text-slate-600">
                  <span>مجموع کالاها:</span>
                  <span className="font-bold">{cartSubtotal.toLocaleString('fa-IR')} تومان</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>تخفیف:</span>
                    <span>- {cartDiscount.toLocaleString('fa-IR')} تومان</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>هزینه ارسال:</span>
                  <span className="font-bold">
                    {cartShippingFee === 0 ? 'رایگان' : `${cartShippingFee.toLocaleString('fa-IR')} تومان`}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="text-sky-600 text-base">{cartTotal.toLocaleString('fa-IR')} تومان</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onNavigateCheckout();
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <span>تکمیل خرید و انتخاب درگاه پرداخت</span>
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
