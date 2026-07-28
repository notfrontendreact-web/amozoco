import { Product, Category, HeroSlide, Brand, VideoShowcase, Testimonial } from '../types';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    title: 'تجهیزات پیشرفته هوشمندسازی مدارس و دانشگاه‌ها',
    subtitle: 'مجموعه کامل نمایشگرهای لمسی، برد هوشمند و ویدئو پروژکتورهای تخصصی آموزشی',
    badge: 'پیشنهاد ویژه سال ۱۴۰۴',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
    buttonText: 'مشاهده محصولات آموزشی',
    buttonLink: '/shop?category=تجهیزات-آموزشی',
    bgGradient: 'from-blue-900 via-indigo-900 to-slate-900',
    textColor: 'text-white',
    discountBadge: 'تا ۳۵٪ تخفیف سازمان‌ها'
  },
  {
    id: 'slide-2',
    title: 'پک‌های تخصصی رباتیک و هوش مصنوعی آموزکو',
    subtitle: 'از مبتدی تا پیشرفته - همراه با دوره ویدئویی رایگان و پشتیبانی فنی اختصاصی',
    badge: 'پرفروش‌ترین‌های ماه',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    buttonText: 'خرید کیت رباتیک',
    buttonLink: '/shop?category=رباتیک-و-الکترونیک',
    bgGradient: 'from-amber-900 via-orange-950 to-stone-900',
    textColor: 'text-white',
    discountBadge: 'ارسال رایگان سراسری'
  },
  {
    id: 'slide-3',
    title: 'پرینترهای سه بعدی صنعتی و آزمایشگاهی',
    subtitle: 'دقت میکرونی، بدنه فلزی یکپارچه و قابلیت چاپ انواع فیلامنت‌های تخصصی',
    badge: 'تضمین اصالت و گارانتی ۱۸ ماهه',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    buttonText: 'بررسی و مقایسه مدلهای ۳D',
    buttonLink: '/shop?category=پرینتر-سه-بعدی',
    bgGradient: 'from-emerald-900 via-teal-950 to-slate-900',
    textColor: 'text-white',
    discountBadge: 'ضمانت بازگشت ۷ روزه'
  },
  {
    id: 'slide-4',
    title: 'تجهیزات اندازه گیری و آزمایشگاه الکترونیک',
    subtitle: 'اسیلوسکوپ، منبع تغذیه متغیر، مولتی متر دیجیتال و هویه‌های هوشمند',
    badge: 'برندهای مطرح جهانی',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    buttonText: 'ورود به فروشگاه ابزار',
    buttonLink: '/shop?category=ابزارآلات-دقیق',
    bgGradient: 'from-purple-950 via-slate-900 to-indigo-950',
    textColor: 'text-white',
    discountBadge: 'قیمت رقابتی عمده'
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'کیت‌های رباتیک و کدنویسی',
    slug: 'رباتیک-و-الکترونیک',
    icon: 'Bot',
    image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=300&q=80',
    itemCount: 142,
    hasStory: true,
    subcategories: [
      { name: 'آردوینو و سنسورها', slug: 'arduino' },
      { name: 'رستبری پای', slug: 'raspberry' },
      { name: 'کیت مکانیک ربات', slug: 'robot-mechanics' }
    ]
  },
  {
    id: 'cat-2',
    name: 'تجهیزات و برد هوشمند',
    slug: 'تجهیزات-آموزشی',
    icon: 'MonitorPlay',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=300&q=80',
    itemCount: 89,
    hasStory: true,
    subcategories: [
      { name: 'ویدئو پروژکتور', slug: 'projectors' },
      { name: 'نمایشگر لمسی interactive', slug: 'touch-screens' },
      { name: 'قلم هوشمند', slug: 'smart-pens' }
    ]
  },
  {
    id: 'cat-3',
    name: 'پرینتر سه بعدی و اسکنر',
    slug: 'پرینتر-سه-بعدی',
    icon: 'Printer',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=300&q=80',
    itemCount: 64,
    hasStory: true,
    subcategories: [
      { name: 'فیلامنت PLA و ABS', slug: 'filaments' },
      { name: 'رزین انی کیوبیک', slug: 'resins' },
      { name: 'قطعات یدکی نازل و نازل حرارتی', slug: 'printer-parts' }
    ]
  },
  {
    id: 'cat-4',
    name: 'ابزار سنجش و اندازه گیری',
    slug: 'ابزارآلات-دقیق',
    icon: 'Cpu',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=300&q=80',
    itemCount: 210,
    hasStory: true,
    subcategories: [
      { name: 'اسیلوسکوپ دیجیتال', slug: 'oscilloscope' },
      { name: 'منبع تغذیه', slug: 'power-supply' },
      { name: 'مولتی‌متر و کلمپ متر', slug: 'multimeter' }
    ]
  },
  {
    id: 'cat-5',
    name: 'میکروکنترلر و قطعات مجزا',
    slug: 'قطعات-الکترونیکی',
    icon: 'CircuitBoard',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=300&q=80',
    itemCount: 540,
    hasStory: true,
    subcategories: [
      { name: 'تراشه‌های ARM و STM32', slug: 'stm32' },
      { name: 'ماژول شبکه و وای‌فای', slug: 'wifi-modules' },
      { name: 'موتور استپر و سروو', slug: 'motors' }
    ]
  },
  {
    id: 'cat-6',
    name: 'لپ‌تاپ و سیستم‌های مهندسی',
    slug: 'سیستم‌های-محاسباتی',
    icon: 'Laptop',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80',
    itemCount: 78,
    hasStory: false,
    subcategories: [
      { name: 'لپ‌تاپ‌های رندرینگ', slug: 'rendering-laptops' },
      { name: 'مینی پی‌سی صنعتی', slug: 'mini-pc' }
    ]
  },
  {
    id: 'cat-7',
    name: 'کتاب‌های تخصصی و فلش‌کارت',
    slug: 'کتاب-و-آموزش',
    icon: 'BookOpen',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=300&q=80',
    itemCount: 115,
    hasStory: false
  },
  {
    id: 'cat-8',
    name: 'تجهیزات شبکه و سرور آزمایشگاه',
    slug: 'شبکه',
    icon: 'Network',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=300&q=80',
    itemCount: 95,
    hasStory: false
  }
];

export const PRODUCTS: Product[] = [
  // --- category: رباتیک-و-الکترونیک ---
  {
    id: 'amz-101',
    title: 'کیت پیشرفته آردوینو آموزکو مدل Super Starter V4 (همراه کتاب راهنما)',
    titleEn: 'Amouzco Arduino Super Starter Kit V4',
    slug: 'arduino-super-starter-kit-v4',
    price: 1850000,
    originalPrice: 2450000,
    discountPercent: 24,
    rating: 4.8,
    reviewsCount: 46,
    image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'کیت‌های رباتیک و کدنویسی',
    categorySlug: 'رباتیک-و-الکترونیک',
    brand: 'Amouzco Robotics',
    stock: 14,
    isSpecialOffer: true,
    specialOfferEndTime: new Date(Date.now() + 18 * 3600 * 1000).toISOString(),
    isBestSeller: true,
    isFeatured: true,
    shortDescription: 'کیت جامع شامل برد Arduino Uno R3 اصل، ۵۵ قطعه سنسور کاربردی، موتور سروو، نمایشگر LCD و دفترچه پروژه ۱۲۰ صفحه‌ای فارسی.',
    fullDescription: 'کیت پیشرفته آموزکو طراحی شده برای دانش‌آموزان، دانشجویان و علاقه‌مندان به دنیای الکترونیک و برنامه‌نویسی. این کیت شامل تمامی قطعات ضروری از جمله سنسور دما، رطوبت، اولتراسونیک، موتور پله‌ای، ماژول بلوتوث، صفحه کلید ۴x۴ و ده‌ها قطعه پاسیو به همراه کتاب آموزشی گام به گام فارسی می‌باشد.',
    specs: [
      { title: 'برد اصلی', value: 'Arduino Uno R3 Microcontroller' },
      { title: 'تعداد قطعات', value: '+۵۵ قلم شامل انواع سنسور و ماژول' },
      { title: 'دفترچه آموزشی', value: 'دفترچه رنگی ۱۲۰ صفحه فارسی + لینک دانلود کدها' },
      { title: 'گارانتی', value: '۱۲ ماه تعویض قطعات آموزکو' }
    ],
    options: [
      { name: 'پک آموزشی', values: ['معمولی (همراه کتاب)', 'پلاس (کتاب + ۱۰ ساعت ویدئو)'] }
    ],
    tags: ['آردوینو', 'رباتیک', 'کیت آموزشی', 'الکترونیک', 'برنامه‌نویسی'],
    sku: 'AMZ-ARD-101'
  },
  {
    id: 'amz-105',
    title: 'کیت بازوی رباتیک صنعتی ۶ درجه آزادی آموزکو مدل ArmBot Pro',
    titleEn: 'Amouzco ArmBot Pro 6-DOF Robotic Arm Kit',
    slug: 'armbot-pro-6dof-robot-kit',
    price: 9400000,
    originalPrice: 11200000,
    discountPercent: 16,
    rating: 4.6,
    reviewsCount: 15,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'کیت‌های رباتیک و کدنویسی',
    categorySlug: 'رباتیک-و-الکترونیک',
    brand: 'Amouzco Robotics',
    stock: 8,
    isNewArrival: true,
    shortDescription: 'بازوی رباتیک با سرووموتورهای تمام فلزی دیجیتال، کنترلر بی سیم و قابلیت یادگیری حرکات (Motion Record).',
    fullDescription: 'کیت بازوی مکانیکی ArmBot Pro طراحی شده برای یادگیری کینماتیک رباتیک صنعتی و برنامه‌نویسی پایتون و C++. شاسی آلومینیومی مستحکم با برش لیزری دقیق، گرپیر فلزی پنوماتیک-سروو و کنترل گرافیکی هوشمند.',
    specs: [
      { title: 'درجه آزادی', value: '۶ محور حرکت مستقل (6-DOF)' },
      { title: 'نوع موتور', value: '۶ عدد سرووموتور دیجیتال فلزی ۲۰ کیلوگرم' },
      { title: 'کنترلر', value: 'ESP32 Wi-Fi / Bluetooth Master Board' },
      { title: 'نرم‌افزار', value: 'اپلیکیشن اندروید/ویندوز + پشتیبانی ROS' }
    ],
    tags: ['بازوی رباتیک', 'رباتیک', 'آلومینیوم', 'آموزشی', 'سروو موتور'],
    sku: 'AMZ-ARM-601'
  },
  {
    id: 'amz-109',
    title: 'ربات مسیریاب و تعقیب خط هوشمند آموزکو مدل LineBot Pro',
    titleEn: 'Amouzco LineBot Pro Smart Line Tracking Robot',
    slug: 'amouzco-linebot-pro',
    price: 2450000,
    originalPrice: 2900000,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 32,
    image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=800&q=80'],
    category: 'کیت‌های رباتیک و کدنویسی',
    categorySlug: 'رباتیک-و-الکترونیک',
    brand: 'Amouzco Robotics',
    stock: 19,
    isBestSeller: true,
    shortDescription: 'ربات مسیریاب ۸ سنسوره با درایور موتور قدرتمند، شاسی پلکسی گلاس و کنترلر هوشمند مناسب مسابقات رباتیک.',
    fullDescription: 'ربات تعقیب خط حرفه‌ای آموزکو ویژه دانش‌آموزان و مسابقات رباتیک کشوری. مجهز به سنسورهای مادون قرمز با دقت بالا، سیستم کنترل الگوریتم PID برای دور زدن نرم پیچ‌ها و باتری لیتیومی قابل شارژ.',
    specs: [
      { title: 'سنسورها', value: '۸ کانال مادون قرمز مجزا' },
      { title: 'کنترلر', value: 'Arduino Nano V3' },
      { title: 'منبع تغذیه', value: 'باتری لیتیومی ۷.۴ ولت ۱۲۰۰ میلی‌آمپر' }
    ],
    tags: ['ربات تعقیب خط', 'مسابقات رباتیک', 'سنسور', 'آردوینو'],
    sku: 'AMZ-ROB-109'
  },
  {
    id: 'amz-110',
    title: 'کیت هوش مصنوعی و بینایی ماشین AI Vision Kit بر پایه ESP32-S3',
    titleEn: 'Amouzco ESP32-S3 AI Vision Kit',
    slug: 'esp32-s3-ai-vision-kit',
    price: 3900000,
    originalPrice: 4600000,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 28,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80'],
    category: 'کیت‌های رباتیک و کدنویسی',
    categorySlug: 'رباتیک-و-الکترونیک',
    brand: 'Amouzco Robotics',
    stock: 12,
    isNewArrival: true,
    shortDescription: 'کیت پردازش تصویر و تشخیص چهره بدون نیاز به اینترنت مجهز به دوربین OV2640 و صفحه نمایش ۱.۴۷ اینچ رنگی.',
    fullDescription: 'آموزش عملی بینایی ماشین و هوش مصنوعی با برد ESP32-S3. قابلیت تشخیص چهره، تشخیص رنگ، تشخیص شیء و ارسال استریم ویدیو روی پروتکل شبکه.',
    specs: [
      { title: 'پردازنده', value: 'ESP32-S3 Dual-Core 240MHz' },
      { title: 'دوربین', value: 'OV2640 2MP HD Camera' },
      { title: 'نمایشگر', value: '1.47" Color IPS Screen' }
    ],
    tags: ['هوش مصنوعی', 'بینایی ماشین', 'ESP32', 'دوربین'],
    sku: 'AMZ-AI-110'
  },

  // --- category: تجهیزات-آموزشی ---
  {
    id: 'amz-102',
    title: 'ویدئو پروژکتور هوشمند آموزشی اپسون مدل EB-FH52 Full HD',
    titleEn: 'Epson EB-FH52 Full HD Smart Projector',
    slug: 'epson-eb-fh52-projector',
    price: 48500000,
    originalPrice: 53000000,
    discountPercent: 8,
    rating: 4.9,
    reviewsCount: 19,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'تجهیزات و برد هوشمند',
    categorySlug: 'تجهیزات-آموزشی',
    brand: 'Epson',
    stock: 6,
    isSpecialOffer: true,
    specialOfferEndTime: new Date(Date.now() + 12 * 3600 * 1000).toISOString(),
    isBestSeller: true,
    isFeatured: true,
    shortDescription: 'پروژکتور ۴۰۰۰ لومنس فول اچ‌دی با وای‌فای داخلی، بلندگوی ۱۶ وات و طول عمر لامپ ۱۲,۰۰۰ ساعت مناسب سالن‌های همایش و کلاس درس.',
    fullDescription: 'دستگاه اپسون EB-FH52 ایده‌آل‌ترین گزینه برای هوشمندسازی مدارس، دانشگاه‌ها و سالن‌های کنفرانس. بهره‌مندی از تکنولوژی 3LCD باعث ایجاد تصاویر بسیار زنده، باکیفیت و بدون فشار به چشم مخاطب می‌شود.',
    specs: [
      { title: 'رزولوشن', value: '1920x1080 Full HD' },
      { title: 'شدت روشنایی', value: '4000 ANSI Lumens' },
      { title: 'کنتراست', value: '16,000:1' }
    ],
    tags: ['پروژکتور', 'اپسون', 'هوشمندسازی', 'مدرسه'],
    sku: 'AMZ-EPS-52'
  },
  {
    id: 'amz-107',
    title: 'برد هوشمند لمسی ۸۶ اینچ آموزکو TouchBoard 4K با ویندوز و اندروید',
    titleEn: 'Amouzco Interactive Flat Panel 86 Inch 4K Dual OS',
    slug: 'amouzco-interactive-board-86inch',
    price: 185000000,
    originalPrice: 210000000,
    discountPercent: 12,
    rating: 5.0,
    reviewsCount: 12,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'تجهیزات و برد هوشمند',
    categorySlug: 'تجهیزات-آموزشی',
    brand: 'Amouzco Smart',
    stock: 3,
    isFeatured: true,
    shortDescription: 'نمایشگر ۸۶ اینچ لمسی ۲۰ نقطه همزمان، کیفیت 4K UHD، شیشه ضد بازتاب، سیستم عامل دوگانه و قلم مغناطیسی.',
    fullDescription: 'کامل‌ترین راه‌حل هوشمندسازی مدرن برای سازمان‌ها، مدارس و دانشگاه‌ها. مجهز به پنل LG اصلی با طول عمر ۵۰,۰۰۰ ساعت و نرم‌افزارهای تخته سفید اختصاصی.',
    specs: [
      { title: 'اندازه تصویر', value: '86 اینچ Ultra HD 4K' },
      { title: 'تکنولوژی لمس', value: 'مادون قرمز (IR) ۲۰ نقطه همزمان' }
    ],
    tags: ['برد هوشمند', 'نمایشگر لمسی', 'آموزکو'],
    sku: 'AMZ-TBR-86'
  },
  {
    id: 'amz-112',
    title: 'میکروسکوپ دیجیتال آزمایشگاهی سه چشمی ۱۶۰۰X مدل Optima Pro',
    titleEn: 'Optima Pro 1600X Trinocular Digital Microscope',
    slug: 'optima-pro-1600x-microscope',
    price: 18900000,
    originalPrice: 22000000,
    discountPercent: 14,
    rating: 4.8,
    reviewsCount: 17,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'],
    category: 'تجهیزات و برد هوشمند',
    categorySlug: 'تجهیزات-آموزشی',
    brand: 'Optima',
    stock: 7,
    isBestSeller: true,
    shortDescription: 'میکروسکوپ تخصصی زیست‌شناسی و الکترونیک با دوربین ۵ مگاپیکسل، خروجی USB/HDMI و بزرگنمایی ۱۶۰۰ برابر.',
    fullDescription: 'میکروسکوپ حرفه‌ای سه چشمی اپتیما با لنزهای آکروماتیک کیفیت بالا، عدسی‌های چشمی WF10X و WF20X، نوردهی قابل تنظیم LED و اتصال مستقیم به رایانه و پروژکتور.',
    specs: [
      { title: 'بزرگنمایی', value: '40X - 1600X' },
      { title: 'دوربین', value: '5.0 Megapixel CMOS HD' }
    ],
    tags: ['میکروسکوپ', 'آزمایشگاه', 'تجهیزات آموزشی'],
    sku: 'AMZ-MIC-112'
  },
  {
    id: 'amz-113',
    title: 'ویدئو پروژکتور جیبی و قابل حمل شیائومی Wanbo T2 Max Full HD',
    titleEn: 'Xiaomi Wanbo T2 Max Portable Smart Projector',
    slug: 'xiaomi-wanbo-t2-max-projector',
    price: 8900000,
    originalPrice: 10500000,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 39,
    image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80'],
    category: 'تجهیزات و برد هوشمند',
    categorySlug: 'تجهیزات-آموزشی',
    brand: 'Epson',
    stock: 14,
    isNewArrival: true,
    shortDescription: 'پروژکتور قابل حمل ۴۵۰ ANSI لومنس با سیستم عامل اندروید ۹، وای‌فای دوبانده و فوکوس برقی اتوماتیک.',
    fullDescription: 'پروژکتور سبک و قابل حمل وانبو T2 Max ساخت شیائومی با رزولوشن واقعی 1080p. مناسب اساتید، معلمان و جلسات سیار.',
    specs: [
      { title: 'رزولوشن', value: '1920x1080 Full HD' },
      { title: 'وزن', value: '1.1 کیلوگرم' }
    ],
    tags: ['پروژکتور جیبی', 'شیائومی', 'قابل حمل'],
    sku: 'AMZ-XIA-T2M'
  },

  // --- category: پرینتر-سه-بعدی ---
  {
    id: 'amz-103',
    title: 'پرینتر سه بعدی انی‌کیوبیک مدل Kobra 2 Pro سرعت بالا',
    titleEn: 'Anycubic Kobra 2 Pro High-Speed 3D Printer',
    slug: 'anycubic-kobra-2-pro',
    price: 26900000,
    originalPrice: 31000000,
    discountPercent: 13,
    rating: 4.7,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'پرینتر سه بعدی و اسکنر',
    categorySlug: 'پرینتر-سه-بعدی',
    brand: 'Anycubic',
    stock: 9,
    isSpecialOffer: true,
    specialOfferEndTime: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    isNewArrival: true,
    isFeatured: true,
    shortDescription: 'سرعت چاپ بی نظیر ۵۰۰ میلی‌متر بر ثانیه، اتوتراز هوشمند LeviQ 2.0 و اکسترودر دایرکت درایو مجهز به پردازنده ۴ هسته‌ای.',
    fullDescription: 'پرینتر Anycubic Kobra 2 Pro انقلابی در پرینت سه بعدی. سرعت واقعی چاپ ۵ برابر مدل‌های معمولی بدون افت کیفیت.',
    specs: [
      { title: 'حداکثر سرعت چاپ', value: '500 mm/s' },
      { title: 'ابعاد پرینت', value: '220 x 220 x 250 mm' }
    ],
    tags: ['پرینتر سه بعدی', 'انی کیوبیک', 'Kobra', 'چاپ سریع'],
    sku: 'AMZ-ANY-K2P'
  },
  {
    id: 'amz-115',
    title: 'پرینتر رزینی انی‌کیوبیک مدل Photon Mono M5s 12K دقت بالا',
    titleEn: 'Anycubic Photon Mono M5s 12K Resin 3D Printer',
    slug: 'anycubic-photon-mono-m5s-12k',
    price: 34500000,
    originalPrice: 39000000,
    discountPercent: 11,
    rating: 4.9,
    reviewsCount: 24,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
    category: 'پرینتر سه بعدی و اسکنر',
    categorySlug: 'پرینتر-سه-بعدی',
    brand: 'Anycubic',
    stock: 5,
    isBestSeller: true,
    shortDescription: 'صفحه نمایش ۱۰.۱ اینچ monochrome با رزولوشن 12K (11520x5120)، بدون نیاز به تراز دستی دستی و تشخیص هوشمند خطا.',
    fullDescription: 'پرینتر رزینی صنعتی Photon Mono M5s با دقت فوق‌العاده ۱۹ میکرون. مناسب برای جواهرسازی، دندانپزشکی و قطعات مینیاتوری.',
    specs: [
      { title: 'رزولوشن نمایشگر', value: '12K (11520 x 5120 pixels)' },
      { title: 'دقت محور XY', value: '19 x 24 microns' }
    ],
    tags: ['پرینتر رزینی', '12K', 'انی کیوبیک', 'دقت بالا'],
    sku: 'AMZ-ANY-M5S'
  },
  {
    id: 'amz-116',
    title: 'اسکنر سه بعدی لیزری دستی کریالیتی مدل CR-Scan Ferret SE',
    titleEn: 'Creality CR-Scan Ferret SE Handheld 3D Scanner',
    slug: 'creality-cr-scan-ferret-se',
    price: 21500000,
    originalPrice: 24800000,
    discountPercent: 13,
    rating: 4.6,
    reviewsCount: 18,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80'],
    category: 'پرینتر سه بعدی و اسکنر',
    categorySlug: 'پرینتر-سه-بعدی',
    brand: 'Anycubic',
    stock: 6,
    isNewArrival: true,
    shortDescription: 'اسکنر ۳D سبک وزنی با دقت ۰.۱ میلی‌متر، اسکن رنگی ۲۴ بیت و قابلیت اتصال به گوشی همراه و رایانه.',
    fullDescription: 'اسکنر ۳D کرئالیتی مدل Ferret SE امکان اسکن سریع قطعات صنعتی، مجسمه‌ها و چهره انسان را با دقت بالای ۰.۱ میلی‌متر فراهم می‌کند.',
    specs: [
      { title: 'دقت اسکن', value: '0.1 mm' },
      { title: 'سرعت اسکن', value: '30 fps' }
    ],
    tags: ['اسکنر سه بعدی', 'کریالیتی', 'مهندسی معکوس'],
    sku: 'AMZ-CRL-FSE'
  },
  {
    id: 'amz-117',
    title: 'پک ۵ عددی فیلامنت PLA پلاس ۱.۷۵ میلی‌متر eSUN (وزن ۵ کیلوگرم)',
    titleEn: 'eSUN PLA+ Filament 1.75mm 1kg Pack of 5',
    slug: 'esun-pla-plus-filament-5pack',
    price: 3850000,
    originalPrice: 4500000,
    discountPercent: 14,
    rating: 4.8,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'],
    category: 'پرینتر سه بعدی و اسکنر',
    categorySlug: 'پرینتر-سه-بعدی',
    brand: 'Anycubic',
    stock: 25,
    isBestSeller: true,
    shortDescription: 'فیلامنت اصلی eSUN در ۵ رنگ متنوع با چسبندگی عالی لایه‌ها، بدون تاب‌دیدگی و نازل‌گرفتگی.',
    fullDescription: 'با کیفیت‌ترین فیلامنت PLA+ در بازار جهانی. چقرمگی ۱۰ برابر بیشتر از PLA معمولی مناسب پرینت کارهای مقاومت بالا.',
    specs: [
      { title: 'قطر فیلامنت', value: '1.75 mm (تلرانس ±0.03mm)' },
      { title: 'دمای نازل', value: '205°C - 225°C' }
    ],
    tags: ['فیلامنت', 'PLA+', 'eSUN', 'مواد مصرفی 3D'],
    sku: 'AMZ-ESN-PLA5'
  },

  // --- category: ابزارآلات-دقیق ---
  {
    id: 'amz-104',
    title: 'اسیلوسکوپ دیجیتال دو کاناله ریگول مدل DS1102Z-E ۱۰۰ مگاهرتز',
    titleEn: 'Rigol DS1102Z-E 100MHz Digital Oscilloscope',
    slug: 'rigol-ds1102ze-oscilloscope',
    price: 21800000,
    originalPrice: 23500000,
    discountPercent: 7,
    rating: 4.9,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
    category: 'ابزار سنجش و اندازه گیری',
    categorySlug: 'ابزارآلات-دقیق',
    brand: 'Rigol',
    stock: 5,
    isBestSeller: true,
    shortDescription: 'پهنای باند ۱۰۰ مگاهرتز، سرعت نمونه‌برداری ۱ GSa/s، صفحه نمایش ۷ اینچ رنگی HD و حافظه عمق ۲۴ مگاپوینت.',
    fullDescription: 'دستگاه اسیلوسکوپ حرفه‌ای Rigol DS1102Z-E انتخاب اول مهندسان الکترونیک، آزمایشگاه‌های دانشگاهی و مراکز تعمیرات تخصصی.',
    specs: [
      { title: 'پهنای باند', value: '100 MHz' },
      { title: 'تعداد کانال', value: '۲ کانال آنالوگ' }
    ],
    tags: ['اسیلوسکوپ', 'ریگول', 'Rigol', 'آزمایشگاه'],
    sku: 'AMZ-RGL-102'
  },
  {
    id: 'amz-108',
    title: 'منبع تغذیه متغیر دیجیتال 30V 5A مدل RXN-305D برند رایتران',
    titleEn: 'RXN-305D Variable DC Power Supply 30V 5A',
    slug: 'rxn-305d-power-supply',
    price: 3650000,
    originalPrice: 4100000,
    discountPercent: 11,
    rating: 4.5,
    reviewsCount: 29,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
    category: 'ابزار سنجش و اندازه گیری',
    categorySlug: 'ابزارآلات-دقیق',
    brand: 'Raytran',
    stock: 18,
    isBestSeller: true,
    shortDescription: 'ولتاژ خروجی ۰ تا ۳۰ ولت مستقیم، جریان ۰ تا ۵ آمپر، نمایشگر LED چهار رقمی و سیستم حفاظت قطعی.',
    fullDescription: 'منبع تغذیه آزمایشگاهی پرکاربرد با پایداری ولتاژ بالا و نویز پایین خروجی.',
    specs: [
      { title: 'ولتاژ خروجی', value: '0 - 30 Volts DC' },
      { title: 'جریان خروجی', value: '0 - 5 Amperes DC' }
    ],
    tags: ['منبع تغذیه', 'آزمایشگاه', 'تعمیرات'],
    sku: 'AMZ-PWR-305'
  },
  {
    id: 'amz-119',
    title: 'مولتی متر دیجیتال اتورنج فلوک مدل Fluke 17B Plus اصلی',
    titleEn: 'Fluke 17B+ Digital Multimeter Original',
    slug: 'fluke-17b-plus-multimeter',
    price: 8900000,
    originalPrice: 9800000,
    discountPercent: 9,
    rating: 4.9,
    reviewsCount: 41,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
    category: 'ابزار سنجش و اندازه گیری',
    categorySlug: 'ابزارآلات-دقیق',
    brand: 'Rigol',
    stock: 12,
    isBestSeller: true,
    shortDescription: 'اندازه‌گیری ولتاژ تا ۱۰۰۰ ولت، دما، فرکانس، خازن و مقاومت با استانداردهای ایمنی CAT III 600V.',
    fullDescription: 'مولتی‌متر فوق‌العاده باکیفیت Fluke 17B+ ساخت کمپانی فلوک آمریکا. بدنه مقاوم در برابر ضربه و افتادن با فیوزهای حفاظتی نوری.',
    specs: [
      { title: 'ولتاژ AC/DC', value: '0 - 1000 Volts' },
      { title: 'اندازه گیری دما', value: '-40°C to 400°C' }
    ],
    tags: ['مولتی متر', 'فلوک', 'Fluke', 'ابزار دقیق'],
    sku: 'AMZ-FLK-17B'
  },
  {
    id: 'amz-120',
    title: 'هویه هوشمند لحیم کاری دیجیتال T12 OLED با گرمایش ۵ ثانیه‌ای',
    titleEn: 'T12 OLED Smart Digital Soldering Station',
    slug: 't12-oled-soldering-station',
    price: 2350000,
    originalPrice: 2800000,
    discountPercent: 16,
    rating: 4.8,
    reviewsCount: 63,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80'],
    category: 'ابزار سنجش و اندازه گیری',
    categorySlug: 'ابزارآلات-دقیق',
    brand: 'Raytran',
    stock: 20,
    isNewArrival: true,
    shortDescription: 'توان ۷۲ وات، داغ شدن سریع ظرف ۵ ثانیه، صفحه نمایش OLED، سنسور خواب هوشمند (Sleep Mode).',
    fullDescription: 'دستگاه هویه دیجیتال T12 ایده‌آل‌ترین ابزار لحیم‌کاری SMD و مونتاژ قطعات حساس الکترونیکی با کنترل دقیق دما از ۲۰۰ تا ۴۸۰ درجه سانتی‌گراد.',
    specs: [
      { title: 'توان خروجی', value: '72 Watts' },
      { title: 'محدوده دما', value: '200°C - 480°C' }
    ],
    tags: ['هویه', 'لحیم کاری', 'T12', 'تعمیرات بورد'],
    sku: 'AMZ-SOL-T12'
  },

  // --- category: قطعات-الکترونیکی ---
  {
    id: 'amz-106',
    title: 'کیت برد توسعه رستبری پای ۵ نسخه ۸ گیگابایت RAM همراه فن هوشمند',
    titleEn: 'Raspberry Pi 5 8GB Complete Kit with Active Cooler',
    slug: 'raspberry-pi-5-8gb-kit',
    price: 7850000,
    originalPrice: 8500000,
    discountPercent: 8,
    rating: 4.9,
    reviewsCount: 58,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'],
    category: 'میکروکنترلر و قطعات مجزا',
    categorySlug: 'قطعات-الکترونیکی',
    brand: 'Raspberry Pi',
    stock: 22,
    isBestSeller: true,
    shortDescription: 'پردازنده ۴ هسته‌ای ۲٫۴ گیگاهرتز Cortex-A76، حافظه ۸ گیگ LPDDR4X، خروجی dual 4K و درگاه PCIe توسعه.',
    fullDescription: 'نسخه نسل پنجم برد محبوب Raspberry Pi با پردازش ۲ تا ۳ برابر سریع‌تر از نسل قبل.',
    specs: [
      { title: 'پردازنده', value: 'Broadcom BCM2712 Quad-core 2.4GHz' },
      { title: 'حافظه رم', value: '8GB LPDDR4X-4267' }
    ],
    tags: ['رستبری پای', 'Raspberry Pi 5', 'مینی کامپیوتر'],
    sku: 'AMZ-RPI-58G'
  },
  {
    id: 'amz-122',
    title: 'برد توسعه ESP32-CAM مجهز به دوربین ۲ مگاپیکسل OV2640 و وای‌فای',
    titleEn: 'ESP32-CAM WiFi + Bluetooth Board with OV2640 Camera',
    slug: 'esp32-cam-board-ov2640',
    price: 450000,
    originalPrice: 580000,
    discountPercent: 22,
    rating: 4.7,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'],
    category: 'میکروکنترلر و قطعات مجزا',
    categorySlug: 'قطعات-الکترونیکی',
    brand: 'Raspberry Pi',
    stock: 45,
    isBestSeller: true,
    shortDescription: 'ماژول اقتصادی وای‌فای و بلوتوث با پردازنده ۳۲ بیتی، دوربین HD و کارت‌خوان MicroSD.',
    fullDescription: 'برد ESP32-CAM ایده‌آل برای پروژه‌های دوربین‌های مراقبتی بی‌سیم، تشخیص چهره و استریم تصویر روی وب‌سرویس.',
    specs: [
      { title: 'پردازنده', value: '32-bit Dual Core 160/240 MHz' },
      { title: 'اتصالات', value: 'Wi-Fi 802.11 b/g/n + Bluetooth 4.2' }
    ],
    tags: ['ESP32', 'دوربین', 'وای فای', 'اینترنت اشیاء'],
    sku: 'AMZ-ESP-CAM'
  },
  {
    id: 'amz-123',
    title: 'پک سنسور ۳۷ عددی کامل 37in1 ویژه آردوینو و رستبری پای',
    titleEn: '37 in 1 Sensor Module Kit for Arduino',
    slug: '37-in-1-sensor-kit-arduino',
    price: 1250000,
    originalPrice: 1550000,
    discountPercent: 19,
    rating: 4.8,
    reviewsCount: 71,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'],
    category: 'میکروکنترلر و قطعات مجزا',
    categorySlug: 'قطعات-الکترونیکی',
    brand: 'Arduino',
    stock: 30,
    isBestSeller: true,
    shortDescription: 'مجموعه ۳۷ سنسور کاربردی از جمله سنسور شعله، صدا، لرزش، مغناطیس، لیزر، جوی‌استیک و دما.',
    fullDescription: 'کامل‌ترین مجموعه سنسورهای مجزا برای یادگیری و ساخت انواع مدارات هوشمند با آردوینو و رستبری پای.',
    specs: [
      { title: 'تعداد سنسور', value: '۳۷ قلم ماژول مختلف' }
    ],
    tags: ['سنسور', 'پک سنسور', 'آردوینو'],
    sku: 'AMZ-SEN-371'
  },
  {
    id: 'amz-124',
    title: 'سرووموتور دیجیتال ۲۰ کیلوگرم فلزی مدل MG996R (بسته ۴ عددی)',
    titleEn: 'MG996R Metal Gear Digital Servo 20kg Pack of 4',
    slug: 'mg996r-servo-motor-4pack',
    price: 1480000,
    originalPrice: 1750000,
    discountPercent: 15,
    rating: 4.6,
    reviewsCount: 34,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'],
    category: 'میکروکنترلر و قطعات مجزا',
    categorySlug: 'قطعات-الکترونیکی',
    brand: 'Amouzco Robotics',
    stock: 18,
    isNewArrival: true,
    shortDescription: 'گشتاور ۱۱ کیلوگرم در سانتی‌متر، چرخ‌دنده‌های برنجی فلزی و بلبرینگ دوگانه با زاویه چرخش ۱۸۰ درجه.',
    fullDescription: 'سرووموتورهای MG996R گزینه عالی برای بازوی رباتیک، ربات‌های انسان‌نما و ماشین‌های کنترلی.',
    specs: [
      { title: 'گشتاور', value: '11 kg/cm @ 6V' },
      { title: 'نوع چرخ‌دنده', value: 'تمام فلزی (Metal Gears)' }
    ],
    tags: ['سروو موتور', 'MG996R', 'چرخ دنده فلزی'],
    sku: 'AMZ-SRV-996'
  },

  // --- category: سیستم‌های-محاسباتی ---
  {
    id: 'amz-126',
    title: 'لپ‌تاپ مهندسی لنوو ThinkPad P16s پردازنده Core i7 رم 32GB',
    titleEn: 'Lenovo ThinkPad P16s Gen 2 Intel Core i7 32GB RAM',
    slug: 'lenovo-thinkpad-p16s-i7-32gb',
    price: 89000000,
    originalPrice: 96000000,
    discountPercent: 7,
    rating: 4.9,
    reviewsCount: 14,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'],
    category: 'لپ‌تاپ و سیستم‌های مهندسی',
    categorySlug: 'سیستم‌های-محاسباتی',
    brand: 'Amouzco Smart',
    stock: 4,
    isFeatured: true,
    shortDescription: 'پردازنده Core i7 13700H، حافظه ۳۲ گیگابایت DDR5، حافظه ۱ ترابایت NVMe SSD و کارت گرافیک RTX A500.',
    fullDescription: 'لپ‌تاپ ورک‌استیشن لنوو ThinkPad P16s طراحی شده برای نرم‌افزارهای مهندسی مانند SolidWorks، Altium Designer، MATLAB و رندرینگ صنعتی.',
    specs: [
      { title: 'پردازنده', value: 'Intel Core i7-13700H' },
      { title: 'حافظه رم', value: '32GB DDR5 5600MHz' },
      { title: 'گرافیک', value: 'NVIDIA RTX A500 4GB GDDR6' }
    ],
    tags: ['لپ تاپ', 'لنوو', 'ThinkPad', 'مهندسی'],
    sku: 'AMZ-LNV-P16'
  },
  {
    id: 'amz-127',
    title: 'مینی پی‌سی صنعتی و پردازشی مدل Intel NUC 13 Pro Core i5',
    titleEn: 'Intel NUC 13 Pro Mini PC Kit Core i5',
    slug: 'intel-nuc-13-pro-i5',
    price: 29500000,
    originalPrice: 33000000,
    discountPercent: 11,
    rating: 4.8,
    reviewsCount: 23,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'],
    category: 'لپ‌تاپ و سیستم‌های مهندسی',
    categorySlug: 'سیستم‌های-محاسباتی',
    brand: 'Amouzco Smart',
    stock: 8,
    isBestSeller: true,
    shortDescription: 'پردازنده ۱۲ هسته‌ای Core i5 1340P، پشتیبانی از ۶۴ گیگ رم و ۴ خروجی تصویر همزمان 4K.',
    fullDescription: 'کیس بسیار کوچک و فوق‌العاده قدرتمند اینتل مناسب برای کنترل خطوط تولید، سرورهای محلی آزمایشگاه و سیستم‌های هوشمندسازی.',
    specs: [
      { title: 'پردازنده', value: 'Intel Core i5-1340P 12-Cores' },
      { title: 'پورت‌ها', value: '2x Thunderbolt 4 / 2x HDMI 2.1' }
    ],
    tags: ['مینی پی سی', 'Intel NUC', 'کیس کوچک'],
    sku: 'AMZ-NUC-13I5'
  },
  {
    id: 'amz-128',
    title: 'کیس قدرتمند پردازش هوش مصنوعی آموزکو مدل AI Workstation RTX 4080',
    titleEn: 'Amouzco AI Workstation RTX 4080 Super',
    slug: 'amouzco-ai-workstation-rtx4080',
    price: 198000000,
    originalPrice: 220000000,
    discountPercent: 10,
    rating: 5.0,
    reviewsCount: 8,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'],
    category: 'لپ‌تاپ و سیستم‌های مهندسی',
    categorySlug: 'سیستم‌های-محاسباتی',
    brand: 'Amouzco Smart',
    stock: 2,
    isNewArrival: true,
    shortDescription: 'پردازنده Core i9 14900K، کارت گرافیک RTX 4080 Super 16GB، رم ۶۴ گیگابایت DDR5 و خنک کننده مایع 360mm.',
    fullDescription: 'سیستم پردازش سنگین یادگیری عمیق (Deep Learning) و مدل‌های زبانی محلی به همراه نصب پیش‌فرض PyTorch و CUDA.',
    specs: [
      { title: 'کارت گرافیک', value: 'NVIDIA GeForce RTX 4080 Super 16GB' },
      { title: 'حافظه رم', value: '64GB DDR5 6000MHz Corsair' }
    ],
    tags: ['کیس هوش مصنوعی', 'RTX 4080', 'پردازش سنگین'],
    sku: 'AMZ-PC-AI4080'
  },

  // --- category: کتاب-و-آموزش ---
  {
    id: 'amz-130',
    title: 'کتاب مرجع برنامه‌نویسی میکروکنترلرهای ARM و STM32 به زبان C (همراه DVD)',
    titleEn: 'ARM STM32 Microcontroller Programming C Reference Book',
    slug: 'stm32-arm-c-programming-book',
    price: 320000,
    originalPrice: 420000,
    discountPercent: 24,
    rating: 4.9,
    reviewsCount: 65,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'],
    category: 'کتاب‌های تخصصی و فلش‌کارت',
    categorySlug: 'کتاب-و-آموزش',
    brand: 'Amouzco Robotics',
    stock: 50,
    isBestSeller: true,
    shortDescription: 'کتاب ۵۴۰ صفحه‌ای تمام رنگی شامل آموزش پروژه‌محور STM32F103 با نرم‌افزارهای STM32CubeMX و Keil.',
    fullDescription: 'کامل‌ترین مرجع یادگیری میکروکنترلرهای ۳۲ بیتی ARM به زبان ساده همراه با مثال‌های عملی راه اندازی سنسورها، نمایشگر گرافیکی و پورت ارتباطی CAN و USB.',
    specs: [
      { title: 'تعداد صفحات', value: '۵۴۰ صفحه رنگی' },
      { title: 'تالیف', value: 'دکتر علیرضا رضایی (استاد دانشگاه)' }
    ],
    tags: ['کتاب آموزشی', 'STM32', 'ARM', 'برنامه‌نویسی C'],
    sku: 'AMZ-BK-STM'
  },
  {
    id: 'amz-131',
    title: 'مجموعه فلش کارت‌های آموزشی قطعه‌شناسی و تست مدارات الکترونیک (۱۵۰ کارت)',
    titleEn: 'Electronics Component Identification Flash Cards Set',
    slug: 'electronics-components-flashcards',
    price: 240000,
    originalPrice: 300000,
    discountPercent: 20,
    rating: 4.8,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'],
    category: 'کتاب‌های تخصصی و فلش‌کارت',
    categorySlug: 'کتاب-و-آموزش',
    brand: 'Amouzco Robotics',
    stock: 40,
    isBestSeller: true,
    shortDescription: 'فلش‌کارت‌های گلاسه لمینت شده شامل تصویر واقعی قطعات، علائم نقشه الکترونیک و نحوه تست با مولتی‌متر.',
    fullDescription: 'بهترین ابزار کمک آموزشی برای دانش‌آموزان فنی‌وحرفه‌ای و دانشجویان مهندسی برق.',
    specs: [
      { title: 'تعداد کارت', value: '۱۵۰ فلش کارت تصویری دو رو' }
    ],
    tags: ['فلش کارت', 'الکترونیک', 'قطعه شناسی'],
    sku: 'AMZ-FC-150'
  },
  {
    id: 'amz-132',
    title: 'کتاب راهنمای جامع اینترنت اشیاء (IoT) و خانه هوشمند با ESP32',
    titleEn: 'Comprehensive IoT Smart Home with ESP32 Book',
    slug: 'iot-smart-home-esp32-book',
    price: 380000,
    originalPrice: 450000,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'],
    category: 'کتاب‌های تخصصی و فلش‌کارت',
    categorySlug: 'کتاب-و-آموزش',
    brand: 'Amouzco Robotics',
    stock: 35,
    isNewArrival: true,
    shortDescription: 'آموزش پروژه‌محور ساخت خانه هوشمند، پروتکل MQTT، اتصال به سرورهای ابر و اپلیکیشن موبایل.',
    fullDescription: 'راهنمای کامل کاربردی اینترنت اشیاء برای مهندسان برق و نرم‌افزار.',
    specs: [
      { title: 'تعداد صفحات', value: '۴۲۰ صفحه' }
    ],
    tags: ['کتاب IoT', 'اینترنت اشیاء', 'ESP32'],
    sku: 'AMZ-BK-IOT'
  },

  // --- category: شبکه ---
  {
    id: 'amz-134',
    title: 'سوئیچ شبکه ۲۴ پورت مدیریتی سیسکو مدل WS-C2960X-24PS-L اصلی',
    titleEn: 'Cisco Catalyst 2960-X 24 Port PoE+ Switch',
    slug: 'cisco-catalyst-2960x-24ps-l',
    price: 42500000,
    originalPrice: 48000000,
    discountPercent: 11,
    rating: 4.9,
    reviewsCount: 16,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'],
    category: 'تجهیزات شبکه و سرور آزمایشگاه',
    categorySlug: 'شبکه',
    brand: 'Amouzco Smart',
    stock: 6,
    isBestSeller: true,
    shortDescription: '۲۴ پورت گیگابیت با توان +PoE ۳۷۰ وات و ۴ پورت آپلینک SFP یک گیگابیت مناسب آزمایشگاه‌ها و شبکه مدارس.',
    fullDescription: 'سوئیچ قدرتمند لایه ۲ سیسکو سری 2960X با قابلیت استک، مدیریت هوشمند پهنای باند و امنیت شبکه بالا.',
    specs: [
      { title: 'تعداد پورت', value: '24 Gigabit Ethernet PoE+ Ports' },
      { title: 'توان PoE', value: '370 Watts total' }
    ],
    tags: ['سیسکو', 'سوئیچ شبکه', 'Cisco 2960X'],
    sku: 'AMZ-CSC-2960'
  },
  {
    id: 'amz-135',
    title: 'روتر اکسس پوینت قدرتمند میکروتیک مدل hAP ac3 مجهز به ۵ پورت گیگابیت',
    titleEn: 'MikroTik hAP ac3 Dual-Band Routerboard',
    slug: 'mikrotik-hap-ac3-routerboard',
    price: 6800000,
    originalPrice: 7500000,
    discountPercent: 9,
    rating: 4.8,
    reviewsCount: 29,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'],
    category: 'تجهیزات شبکه و سرور آزمایشگاه',
    categorySlug: 'شبکه',
    brand: 'Amouzco Smart',
    stock: 14,
    isBestSeller: true,
    shortDescription: 'وای‌فای دوبانده ۵GHz و ۲.۴GHz، سیستم عامل RouterOS لایسنس ۴ و آنتن‌های خارجی پرقدرت.',
    fullDescription: 'روتر همه فن حریف میکروتیک hAP ac3 با پردازنده ۴ هسته‌ای برای فایروال شبکه، اکانتینگ کاربر و هات‌اسپات.',
    specs: [
      { title: 'پردازنده', value: 'Quad-Core 716 MHz CPU' },
      { title: 'سیستم عامل', value: 'RouterOS Level 4' }
    ],
    tags: ['میکروتیک', 'روتر', 'شبکه', 'MikroTik'],
    sku: 'AMZ-MKT-HAC3'
  },
  {
    id: 'amz-136',
    title: 'مودم روتر ۴G/LTE صنعتی یورونت مجهز به ۲ آنتن خارجی و پورت LAN',
    titleEn: 'Euronet 4G LTE Industrial Cellular Router',
    slug: 'euronet-4g-lte-industrial-router',
    price: 3950000,
    originalPrice: 4600000,
    discountPercent: 14,
    rating: 4.7,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'],
    category: 'تجهیزات شبکه و سرور آزمایشگاه',
    categorySlug: 'شبکه',
    brand: 'Amouzco Smart',
    stock: 18,
    isNewArrival: true,
    shortDescription: 'پشتیبانی از تمامی سیم‌کارت‌های کشور (همراه اول، ایرانسل، رایتل)، سرعت ۱۵۰ مگابیت و بدنه فلزی مقاوم.',
    fullDescription: 'مودم سیم‌کارتی صنعتی عالی برای ارسال داده‌های دوربین‌های مداربسته، پروژه‌های اینترنت اشیاء و مدارس روستایی.',
    specs: [
      { title: 'سرعت دانلود', value: 'Up to 150 Mbps LTE' }
    ],
    tags: ['مودم 4G', 'سیم کارتی', 'شبکه صنعتی'],
    sku: 'AMZ-MOD-4G'
  }
];


export const BRANDS: Brand[] = [
  { id: 'b-1', name: 'آموزکو رباتیکس', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80', productsCount: 45 },
  { id: 'b-2', name: 'Arduino', logo: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=200&q=80', productsCount: 88 },
  { id: 'b-3', name: 'Raspberry Pi', logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=200&q=80', productsCount: 34 },
  { id: 'b-4', name: 'Anycubic', logo: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=200&q=80', productsCount: 29 },
  { id: 'b-5', name: 'Epson', logo: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=200&q=80', productsCount: 19 },
  { id: 'b-6', name: 'Rigol', logo: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=200&q=80', productsCount: 22 }
];

export const VIDEO_SHOWCASES: VideoShowcase[] = [
  {
    id: 'v-1',
    title: 'جعبه گشایی و راه اندازی کیت آردوینو Super Starter آموزکو',
    duration: '۱۴:۳۵',
    views: '۱۲,۴۰۰',
    thumbnail: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=600&q=80',
    instructor: 'مهندس رضا صادقی (مدیر فنی آموزکو)',
    category: 'آموزش ویدئویی',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 'v-2',
    title: 'تست سرعت واقعی پرینتر سه بعدی Anycubic Kobra 2 Pro',
    duration: '۰۸:۵۰',
    views: '۱۹,۸۰۰',
    thumbnail: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80',
    instructor: 'دکتر علیرضا محمدی',
    category: 'بررسی تخصصی',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 'v-3',
    title: 'چگونه یک کلاس درس را با برد لمسی و پروژکتور آموزکو هوشمند کنیم؟',
    duration: '۲۲:۱۰',
    views: '۳۵,۱۰۰',
    thumbnail: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
    instructor: 'تیم راهکارهای سازمانی آموزکو',
    category: 'راهنمای هوشمندسازی',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'دکتر محمدحسین نوری',
    role: 'استاد دانشگاه صنعتی شریف',
    company: 'دانشکده برق و کامپیوتر',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    text: 'تجهیزات آزمایشگاه رباتیک دانشگاه را از آموزکو تهیه کردیم. اصالت کالاها، ارسال بسیار سریع و پشتیبانی فنی بی‌نظیر مهندسان آموزکو ما را شگفت‌زده کرد.',
    rating: 5,
    purchasedProduct: 'برد هوشمند لمسی ۸۶ اینچ و اسیلوسکوپ‌های Rigol'
  },
  {
    id: 't-2',
    author: 'مهندس مریم کاظمی',
    role: 'مدیر فناوری دبیرستان استعدادهای درخشان',
    company: 'سمپاد اصفهان',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    text: 'کیت‌های رباتیک و کدنویسی آموزکو تحولی در اشتیاق دانش‌آموزان ما ایجاد کرد. کتاب راهنمای فارسی با کیفیت بالا چاپ شده و پاسخگویی تلفنی عالی است.',
    rating: 5,
    purchasedProduct: 'کیت آردوینو Super Starter V4 (۴۰ عدد)'
  },
  {
    id: 't-3',
    author: 'مهندس امیرحسین امینی',
    role: 'بنیان‌گذار استارتاپ ساخت پروتیپ',
    company: 'پارک علم و فناوری',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    text: 'پرینتر سه بعدی Kobra 2 Pro را با بهترین قیمت ایران از آموزکو خریدم. همان روز ثبت سفارش کدهای رهگیری ارسال شد و ضمانت‌نامه کتبی هم دریافت کردم.',
    rating: 5,
    purchasedProduct: 'پرینتر سه بعدی Anycubic Kobra 2 Pro'
  }
];

export const MOCK_COUPONS = [
  { code: 'AMOUZCO2026', discountPercent: 10, maxDiscountToman: 500000, minPurchaseToman: 1000000 },
  { code: 'WELCOME100', discountPercent: 15, maxDiscountToman: 300000, minPurchaseToman: 500000 },
  { code: 'NOROOZ1404', discountPercent: 20, maxDiscountToman: 1000000, minPurchaseToman: 2000000 }
];
