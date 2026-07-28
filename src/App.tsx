import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { QuickViewModal } from './components/layout/QuickViewModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { BankGatewayPage } from './pages/BankGatewayPage';
import { PaymentResultPage } from './pages/PaymentResultPage';
import { OrderTrackPage } from './pages/OrderTrackPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname || '/');
  const [bankGatewayOrderId, setBankGatewayOrderId] = useState<string | null>(null);
  const [paymentResult, setPaymentResult] = useState<{ success: boolean; refCode?: string } | null>(null);

  // Sync route on popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const parseRoute = () => {
    // Decode URI path for Persian characters (e.g. /ارتباط, /درباره, /فروشگاه)
    const decodedPath = decodeURIComponent(currentPath);

    if (decodedPath.startsWith('/payment-gateway/')) {
      const orderId = decodedPath.replace('/payment-gateway/', '');
      return (
        <BankGatewayPage
          orderId={orderId}
          onPaymentComplete={(success, refCode) => {
            setPaymentResult({ success, refCode });
            navigate('/payment-result');
          }}
        />
      );
    }

    if (decodedPath === '/payment-result') {
      return (
        <PaymentResultPage
          success={paymentResult?.success ?? true}
          referenceCode={paymentResult?.refCode}
          onNavigateHome={() => navigate('/')}
          onNavigateTrack={() => navigate('/track-order')}
        />
      );
    }

    if (decodedPath.startsWith('/product/')) {
      const productId = decodedPath.replace('/product/', '');
      return (
        <ProductDetailPage
          productId={productId}
          onNavigateProduct={id => navigate(`/product/${id}`)}
          onNavigateBack={() => navigate('/shop')}
        />
      );
    }

    if (decodedPath === '/checkout') {
      return (
        <CheckoutPage
          onNavigateBankGateway={orderId => {
            setBankGatewayOrderId(orderId);
            navigate(`/payment-gateway/${orderId}`);
          }}
          onNavigateShop={() => navigate('/shop')}
        />
      );
    }

    if (decodedPath === '/shop' || decodedPath === '/فروشگاه' || decodedPath.startsWith('/shop?')) {
      // Extract category from URL params if present
      const urlParams = new URLSearchParams(window.location.search);
      const cat = urlParams.get('category') || '';
      return (
        <ShopPage
          initialCategory={cat}
          onNavigateProduct={id => navigate(`/product/${id}`)}
        />
      );
    }

    if (decodedPath === '/contact' || decodedPath === '/ارتباط') {
      return <ContactPage />;
    }

    if (decodedPath === '/about' || decodedPath === '/درباره') {
      return <AboutPage />;
    }

    if (decodedPath === '/track-order') {
      return <OrderTrackPage />;
    }

    // Default Home Page
    return <HomePage onNavigate={navigate} />;
  };

  const isBankPortalView = currentPath.startsWith('/payment-gateway/');

  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans selection:bg-amber-500 selection:text-white">
        {!isBankPortalView && (
          <Header currentPath={currentPath} onNavigate={navigate} />
        )}

        <main className="flex-1">
          {parseRoute()}
        </main>

        {!isBankPortalView && (
          <Footer onNavigate={navigate} />
        )}

        {/* Global Cart Slide-over Drawer */}
        <CartDrawer onNavigateCheckout={() => navigate('/checkout')} />

        {/* Global Quick View Product Modal */}
        <QuickViewModal />
      </div>
    </CartProvider>
  );
}
