import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { PRODUCTS, CATEGORIES, HERO_SLIDES, BRANDS, VIDEO_SHOWCASES, TESTIMONIALS, MOCK_COUPONS } from './src/data/mockData';
import { Order, AddressInfo, CartItem } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for orders and messages
const ordersStore = new Map<string, Order>();
const contactMessagesStore: any[] = [];

// Seed initial demo orders
const initialDemoOrder: Order = {
  id: 'ord-demo-1',
  orderNumber: 'AMZ-88412',
  items: [
    {
      product: PRODUCTS[0],
      quantity: 1,
      selectedOption: 'معمولی (همراه کتاب)'
    }
  ],
  subtotal: 1850000,
  discount: 0,
  shippingFee: 0,
  total: 1850000,
  address: {
    fullName: 'علی محمدی',
    phone: '09123456789',
    province: 'تهران',
    city: 'تهران',
    postalCode: '1417853111',
    address: 'خیابان انقلاب، خیابان ۱۵ خرداد، پلاک ۱۲۴'
  },
  paymentMethod: 'bank_gateway',
  bankName: 'بانک سامان (شاپرک)',
  paymentStatus: 'paid',
  referenceCode: 'SHP-998412501',
  trackingCode: '2026884129',
  createdAt: new Date().toISOString()
};
ordersStore.set(initialDemoOrder.id, initialDemoOrder);

// API Routes
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', storeName: 'Amouzco Online Store API', serverTime: new Date() });
});

// GET /api/products
app.get('/api/products', (req, res) => {
  const { category, brand, minPrice, maxPrice, search, inStock, sortBy } = req.query;

  let filtered = [...PRODUCTS];

  if (category) {
    filtered = filtered.filter(p => p.categorySlug === category || p.category === category);
  }

  if (brand) {
    filtered = filtered.filter(p => p.brand === brand);
  }

  if (search) {
    const q = String(search).toLowerCase();
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (minPrice) {
    filtered = filtered.filter(p => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= Number(maxPrice));
  }

  if (inStock === 'true') {
    filtered = filtered.filter(p => p.stock > 0);
  }

  // Sorting
  if (sortBy === 'price_asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'newest') {
    filtered.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else {
    // Default popular
    filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
  }

  res.json({
    total: filtered.length,
    products: filtered
  });
});

// GET /api/products/:id
app.get('/api/products/:id', (req, res) => {
  const product = PRODUCTS.find(p => p.id === req.params.id || p.slug === req.params.id);
  if (!product) {
    res.status(404).json({ error: 'محصول یافت نشد' });
    return;
  }
  res.json(product);
});

// GET /api/categories
app.get('/api/categories', (_req, res) => {
  res.json(CATEGORIES);
});

// GET /api/sliders
app.get('/api/sliders', (_req, res) => {
  res.json({
    hero: HERO_SLIDES,
    brands: BRANDS,
    videoShowcases: VIDEO_SHOWCASES,
    testimonials: TESTIMONIALS
  });
});

// POST /api/coupons/validate
app.post('/api/coupons/validate', (req, res) => {
  const { code, subtotal } = req.body;
  const coupon = MOCK_COUPONS.find(c => c.code.toUpperCase() === String(code).trim().toUpperCase());
  
  if (!coupon) {
    res.status(404).json({ success: false, message: 'کد تخفیف نامعتبر است' });
    return;
  }

  if (subtotal < coupon.minPurchaseToman) {
    res.status(400).json({ 
      success: false, 
      message: `حداقل مبلغ خرید برای اعمال این کد ${coupon.minPurchaseToman.toLocaleString('fa-IR')} تومان می‌باشد.` 
    });
    return;
  }

  let calculatedDiscount = Math.round((subtotal * coupon.discountPercent) / 100);
  if (calculatedDiscount > coupon.maxDiscountToman) {
    calculatedDiscount = coupon.maxDiscountToman;
  }

  res.json({
    success: true,
    discountAmount: calculatedDiscount,
    code: coupon.code,
    message: `کد تخفیف ${coupon.discountPercent}٪ با موفقیت اعمال شد.`
  });
});

// POST /api/orders (Create order)
app.post('/api/orders', (req, res) => {
  const { items, address, paymentMethod, bankName, couponCode, discountAmount } = req.body;

  if (!items || !items.length || !address) {
    res.status(400).json({ error: 'اطلاعات سفارش ناقص است' });
    return;
  }

  let subtotal = 0;
  const processedItems: CartItem[] = items.map((item: any) => {
    const p = PRODUCTS.find(prod => prod.id === item.product.id) || item.product;
    const itemTotal = p.price * item.quantity;
    subtotal += itemTotal;
    return {
      product: p,
      quantity: item.quantity,
      selectedColor: item.selectedColor,
      selectedOption: item.selectedOption
    };
  });

  const discount = Number(discountAmount) || 0;
  const shippingFee = subtotal > 3000000 ? 0 : 75000; // Free shipping over 3M Toman
  const total = Math.max(0, subtotal - discount + shippingFee);

  const orderId = 'ord-' + Date.now();
  const orderNumber = 'AMZ-' + Math.floor(10000 + Math.random() * 90000);
  const trackingCode = String(Math.floor(1000000000 + Math.random() * 9000000000));

  const newOrder: Order = {
    id: orderId,
    orderNumber,
    items: processedItems,
    subtotal,
    discount,
    shippingFee,
    total,
    address,
    paymentMethod: paymentMethod || 'bank_gateway',
    bankName: bankName || 'درگاه پرداخت شاپرک (بانک سامان / ملت)',
    paymentStatus: 'pending',
    trackingCode,
    createdAt: new Date().toISOString()
  };

  ordersStore.set(orderId, newOrder);

  res.json({
    success: true,
    order: newOrder,
    paymentGatewayUrl: `/payment-gateway/${orderId}`
  });
});

// GET /api/orders/:id
app.get('/api/orders/:id', (req, res) => {
  const order = ordersStore.get(req.params.id) || Array.from(ordersStore.values()).find(o => o.orderNumber === req.params.id || o.trackingCode === req.params.id);
  if (!order) {
    res.status(404).json({ error: 'سفارش یافت نشد' });
    return;
  }
  res.json(order);
});

// GET /api/payment/gateways
app.get('/api/payment/gateways', (_req, res) => {
  res.json({
    activeGateways: [
      { id: 'saman', name: 'درگاه پرداخت الکترونیک سامان (SEP)', merchantId: '10884120', active: true, fee: '0%' },
      { id: 'mellat', name: 'درگاه به پرداخت ملت (BPM)', merchantId: '4992810', active: true, fee: '0%' },
      { id: 'pasargad', name: 'درگاه پرداخت پاسارگاد (PEP)', merchantId: '884102', active: true, fee: '0%' },
      { id: 'zarinpal', name: 'زرین‌پال (ZarinPal IPG)', merchantId: '00000000-0000-0000-0000-000000000000', active: true, fee: '0%' }
    ]
  });
});

// POST /api/payment/request (Initialize Node.js Payment Gateway Session)
app.post('/api/payment/request', (req, res) => {
  const { orderId, bankName } = req.body;
  const order = ordersStore.get(orderId);

  if (!order) {
    res.status(404).json({ success: false, error: 'سفارش یافت نشد' });
    return;
  }

  const authority = 'A' + String(Date.now()).padStart(12, '0') + Math.floor(1000 + Math.random() * 9000);
  
  res.json({
    success: true,
    status: 100,
    authority,
    amount: order.total,
    merchantName: 'فروشگاه آموزکو (تجهیزات آموزشی و رباتیک)',
    gatewayUrl: `/payment-gateway/${orderId}?authority=${authority}`,
    message: 'جلسه درگاه آنلاین بانکی با موفقیت ایجاد گردید.'
  });
});

// POST /api/payment/verify (Bank Payment Gateway callback handler)
app.post('/api/payment/verify', (req, res) => {
  const { orderId, cardNumber, success, authority } = req.body;

  const order = ordersStore.get(orderId);
  if (!order) {
    res.status(404).json({ error: 'سفارش مورد نظر یافت نشد' });
    return;
  }

  if (success !== false) {
    const refCode = 'SHP-' + Math.floor(100000000 + Math.random() * 900000000);
    order.paymentStatus = 'paid';
    order.referenceCode = refCode;
    ordersStore.set(orderId, order);

    res.json({
      success: true,
      status: 100,
      order,
      authority: authority || 'A00000000000000000000000000088412093',
      referenceCode: refCode,
      message: 'تراکنش با موفقیت توسط شبکه شاپرک تایید و ثبت گردید.'
    });
  } else {
    order.paymentStatus = 'failed';
    ordersStore.set(orderId, order);
    res.status(400).json({
      success: false,
      status: -22,
      order,
      message: 'تراکنش توسط کاربر لغو شد یا اطلاعات کارت نادرست است.'
    });
  }
});

// POST /api/contact
app.post('/api/contact', (req, res) => {
  const { name, phone, email, subject, message } = req.body;
  if (!name || !phone || !message) {
    res.status(400).json({ error: 'لطفا تمامی فیلدهای ضروری را تکمیل نمایید.' });
    return;
  }

  const ticketId = 'TCK-' + Math.floor(1000 + Math.random() * 9000);
  contactMessagesStore.push({
    ticketId,
    name,
    phone,
    email,
    subject,
    message,
    date: new Date().toISOString()
  });

  res.json({
    success: true,
    ticketId,
    message: `پیام شما با موفقیت ثبت شد. کد پیگیری درخواست شما: ${ticketId}`
  });
});

async function startServer() {
  try {
    // Vite integration
    if (process.env.NODE_ENV !== 'production') {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa'
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Amouzco E-Commerce Server running on http://0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();
